const PASSWORD_HASH = "cb1a6f4a13a4bc5b26bd2f631802c7cc304ac466bfb881b713c0f89c33f46b15";
const ALLOWED_ORIGINS = new Set([
  "https://cs.drops-sustainability.eu",
  "https://dropscasestudies.pages.dev",
  "https://dropscasestudies.mztjvntwqx.workers.dev",
]);

function json(data, status = 200, origin = "") {
  const headers = new Headers({
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
  });
  applyCors(headers, origin);
  return new Response(JSON.stringify(data), { status, headers });
}

function applyCors(headers, origin) {
  if (origin && ALLOWED_ORIGINS.has(origin)) {
    headers.set("access-control-allow-origin", origin);
    headers.set("vary", "Origin");
  }
  headers.set("access-control-allow-methods", "GET,POST,OPTIONS");
  headers.set("access-control-allow-headers", "content-type");
}

async function sha256Hex(value) {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

async function readJson(kv, key, fallback) {
  const value = await kv.get(key, "json");
  return value || fallback;
}

async function writeJson(kv, key, value) {
  await kv.put(key, JSON.stringify(value));
}

async function listAll(kv, prefix) {
  let cursor = undefined;
  const keys = [];

  do {
    const page = await kv.list({ prefix, cursor, limit: 1000 });
    keys.push(...page.keys.map((entry) => entry.name));
    cursor = page.list_complete ? undefined : page.cursor;
  } while (cursor);

  return keys;
}

function createSummary() {
  return {
    uniqueClients: 0,
    totalViews: 0,
    studyViews: 0,
    completions: 0,
    lastEventAt: "",
  };
}

function createDay(date) {
  return {
    date,
    uniqueClients: 0,
    totalViews: 0,
    studyViews: 0,
    completions: 0,
    lastEventAt: "",
  };
}

function createOriginAggregate(label, key = "") {
  return {
    key,
    label,
    uniqueClients: 0,
    totalViews: 0,
    studyViews: 0,
    completions: 0,
    lastEventAt: "",
  };
}

function getCountryCode(request) {
  const code =
    request &&
    request.cf &&
    typeof request.cf.country === "string"
      ? request.cf.country.trim().toUpperCase()
      : "";
  return code || "Unknown";
}

function normalizeReferrer(payload) {
  const fallback = {
    key: "direct",
    label: "Direct / no referrer",
  };
  const raw =
    payload && typeof payload.referrer === "string" ? payload.referrer.trim() : "";
  if (!raw) {
    return fallback;
  }

  try {
    const referrerUrl = new URL(raw);
    const currentUrl =
      payload && typeof payload.href === "string" && payload.href
        ? new URL(payload.href)
        : null;
    const sameHost = currentUrl && referrerUrl.host === currentUrl.host;
    const label = sameHost
      ? `${referrerUrl.hostname}${referrerUrl.pathname}`
      : referrerUrl.hostname;

    return {
      key: encodeURIComponent(label.toLowerCase()),
      label,
    };
  } catch (error) {
    const trimmed = raw.slice(0, 140);
    return {
      key: encodeURIComponent(trimmed.toLowerCase()),
      label: trimmed,
    };
  }
}

async function handleTrack(request, env, origin) {
  const payload = await request.json().catch(() => null);
  if (!payload || !payload.type || !payload.clientId) {
    return json({ error: "Invalid analytics payload." }, 400, origin);
  }

  const now = new Date().toISOString();
  const day = now.slice(0, 10);
  const type = payload.type;
  const isView = type === "cards_view" || type === "study_view";
  const isStudyView = type === "study_view";
  const isCompletion = type === "study_complete";
  const countryCode = getCountryCode(request);
  const referrer = normalizeReferrer(payload);

  if (!isView && !isCompletion) {
    return json({ error: "Unsupported event type." }, 400, origin);
  }

  const clientKey = `client:${payload.clientId}`;
  const dayClientKey = `day-client:${day}:${payload.clientId}`;
  const [seenClient, seenToday] = await Promise.all([
    env.ANALYTICS_KV.get(clientKey),
    env.ANALYTICS_KV.get(dayClientKey),
  ]);

  if (!seenClient) {
    await env.ANALYTICS_KV.put(clientKey, now);
  }
  if (!seenToday) {
    await env.ANALYTICS_KV.put(dayClientKey, now, {
      expirationTtl: 60 * 60 * 24 * 45,
    });
  }

  const summary = await readJson(env.ANALYTICS_KV, "summary", createSummary());
  if (!seenClient) {
    summary.uniqueClients += 1;
  }
  if (isView) {
    summary.totalViews += 1;
  }
  if (isStudyView) {
    summary.studyViews += 1;
  }
  if (isCompletion) {
    summary.completions += 1;
  }
  summary.lastEventAt = now;
  await writeJson(env.ANALYTICS_KV, "summary", summary);

  const dayKey = `day:${day}`;
  const daySummary = await readJson(env.ANALYTICS_KV, dayKey, createDay(day));
  if (!seenToday) {
    daySummary.uniqueClients += 1;
  }
  if (isView) {
    daySummary.totalViews += 1;
  }
  if (isStudyView) {
    daySummary.studyViews += 1;
  }
  if (isCompletion) {
    daySummary.completions += 1;
  }
  daySummary.lastEventAt = now;
  await writeJson(env.ANALYTICS_KV, dayKey, daySummary);

  const countryClientKey = `country-client:${countryCode}:${payload.clientId}`;
  const seenCountryClient = await env.ANALYTICS_KV.get(countryClientKey);
  if (!seenCountryClient) {
    await env.ANALYTICS_KV.put(countryClientKey, now);
  }

  const countryKey = `country:${countryCode}`;
  const countrySummary = await readJson(
    env.ANALYTICS_KV,
    countryKey,
    createOriginAggregate(countryCode, countryCode)
  );
  if (!seenCountryClient) {
    countrySummary.uniqueClients += 1;
  }
  if (isView) {
    countrySummary.totalViews += 1;
  }
  if (isStudyView) {
    countrySummary.studyViews += 1;
  }
  if (isCompletion) {
    countrySummary.completions += 1;
  }
  countrySummary.lastEventAt = now;
  await writeJson(env.ANALYTICS_KV, countryKey, countrySummary);

  const countryIndex = await readJson(env.ANALYTICS_KV, "country-index", {});
  countryIndex[countryCode] = countrySummary;
  await writeJson(env.ANALYTICS_KV, "country-index", countryIndex);

  const referrerClientKey = `referrer-client:${referrer.key}:${payload.clientId}`;
  const seenReferrerClient = await env.ANALYTICS_KV.get(referrerClientKey);
  if (!seenReferrerClient) {
    await env.ANALYTICS_KV.put(referrerClientKey, now);
  }

  const referrerKey = `referrer:${referrer.key}`;
  const referrerSummary = await readJson(
    env.ANALYTICS_KV,
    referrerKey,
    createOriginAggregate(referrer.label, referrer.key)
  );
  referrerSummary.key = referrer.key;
  referrerSummary.label = referrer.label;
  if (!seenReferrerClient) {
    referrerSummary.uniqueClients += 1;
  }
  if (isView) {
    referrerSummary.totalViews += 1;
  }
  if (isStudyView) {
    referrerSummary.studyViews += 1;
  }
  if (isCompletion) {
    referrerSummary.completions += 1;
  }
  referrerSummary.lastEventAt = now;
  await writeJson(env.ANALYTICS_KV, referrerKey, referrerSummary);

  const referrerIndex = await readJson(env.ANALYTICS_KV, "referrer-index", {});
  referrerIndex[referrer.key] = referrerSummary;
  await writeJson(env.ANALYTICS_KV, "referrer-index", referrerIndex);

  if (payload.studyId) {
    const studyKey = `study:${payload.studyId}`;
    const studySummary = await readJson(env.ANALYTICS_KV, studyKey, {
      studyId: payload.studyId,
      title: payload.studyTitle || payload.studyId,
      topicKey: payload.topicKey || "",
      country: payload.country || "",
      views: 0,
      completions: 0,
      lastEventAt: "",
    });

    if (payload.studyTitle) {
      studySummary.title = payload.studyTitle;
    }
    if (payload.topicKey) {
      studySummary.topicKey = payload.topicKey;
    }
    if (payload.country) {
      studySummary.country = payload.country;
    }
    if (isStudyView) {
      studySummary.views += 1;
    }
    if (isCompletion) {
      studySummary.completions += 1;
    }
    studySummary.lastEventAt = now;
    await writeJson(env.ANALYTICS_KV, studyKey, studySummary);

    const studyIndex = await readJson(env.ANALYTICS_KV, "study-index", {});
    studyIndex[payload.studyId] = studySummary;
    await writeJson(env.ANALYTICS_KV, "study-index", studyIndex);
  }

  return json({ ok: true }, 200, origin);
}

async function handleReport(request, env, origin) {
  const body = await request.json().catch(() => null);
  const password = body && typeof body.password === "string" ? body.password : "";
  const hash = await sha256Hex(password);
  if (hash !== PASSWORD_HASH) {
    return json({ error: "Invalid password." }, 401, origin);
  }

  const summary = await readJson(env.ANALYTICS_KV, "summary", createSummary());
  const todayKey = `day:${new Date().toISOString().slice(0, 10)}`;
  const [todaySummary, dayKeys, studyKeys, studyIndex, countryIndex, referrerIndex] =
    await Promise.all([
    env.ANALYTICS_KV.get(todayKey, "json"),
    listAll(env.ANALYTICS_KV, "day:"),
    listAll(env.ANALYTICS_KV, "study:"),
    env.ANALYTICS_KV.get("study-index", "json"),
    env.ANALYTICS_KV.get("country-index", "json"),
    env.ANALYTICS_KV.get("referrer-index", "json"),
  ]);

  const daySet = new Set(dayKeys);
  if (todaySummary) {
    daySet.add(todayKey);
  }

  const days = (
    await Promise.all(
      Array.from(daySet).map((key) => env.ANALYTICS_KV.get(key, "json"))
    )
  )
    .filter(Boolean)
    .sort((a, b) => String(b.date).localeCompare(String(a.date)))
    .slice(0, 30);

  const indexedStudies = studyIndex && typeof studyIndex === "object"
    ? Object.values(studyIndex)
    : [];

  const listedStudies = await Promise.all(
    studyKeys.map((key) => env.ANALYTICS_KV.get(key, "json"))
  );

  const studyMap = new Map();
  indexedStudies.concat(listedStudies).forEach((entry) => {
    if (entry && entry.studyId) {
      studyMap.set(entry.studyId, entry);
    }
  });

  const studies = Array.from(studyMap.values())
    .filter(Boolean)
    .sort(
      (a, b) =>
        (b.views || 0) - (a.views || 0) ||
        (b.completions || 0) - (a.completions || 0)
    )
    .slice(0, 30);

  const countries = (countryIndex && typeof countryIndex === "object"
    ? Object.values(countryIndex)
    : []
  )
    .filter(Boolean)
    .sort(
      (a, b) =>
        (b.uniqueClients || 0) - (a.uniqueClients || 0) ||
        (b.totalViews || 0) - (a.totalViews || 0)
    )
    .slice(0, 30);

  const referrers = (referrerIndex && typeof referrerIndex === "object"
    ? Object.values(referrerIndex)
    : []
  )
    .filter(Boolean)
    .sort(
      (a, b) =>
        (b.uniqueClients || 0) - (a.uniqueClients || 0) ||
        (b.totalViews || 0) - (a.totalViews || 0)
    )
    .slice(0, 30);

  return json({ summary, days, studies, countries, referrers }, 200, origin);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = request.headers.get("Origin") || "";

    if (request.method === "OPTIONS") {
      const headers = new Headers();
      applyCors(headers, origin);
      return new Response(null, { status: 204, headers });
    }

    if (url.pathname === "/track" && request.method === "POST") {
      return handleTrack(request, env, origin);
    }

    if (url.pathname === "/report" && request.method === "POST") {
      return handleReport(request, env, origin);
    }

    if (url.pathname === "/health") {
      return json({ ok: true, service: "drops-cs-analytics" }, 200, origin);
    }

    return json({ ok: true, service: "drops-cs-analytics" }, 200, origin);
  },
};
