(function () {
  const ADMIN_PASSWORD_KEY = "drops-cs-admin-password";
  const ANALYTICS_ENDPOINT = "https://drops-cs-analytics.mztjvntwqx.workers.dev";

  function getStoredPassword() {
    try {
      return window.sessionStorage.getItem(ADMIN_PASSWORD_KEY) || "";
    } catch (error) {
      return "";
    }
  }

  function setStoredPassword(password) {
    try {
      if (password) {
        window.sessionStorage.setItem(ADMIN_PASSWORD_KEY, password);
      } else {
        window.sessionStorage.removeItem(ADMIN_PASSWORD_KEY);
      }
    } catch (error) {
      return null;
    }
    return null;
  }

  function formatTimestamp(value) {
    if (!value) {
      return "No activity yet";
    }
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return value;
    }
    return `Last updated ${date.toLocaleString()}`;
  }

  function number(value) {
    return new Intl.NumberFormat("en-US").format(value || 0);
  }

  function regionName(code) {
    if (!code || code === "Unknown") {
      return "Unknown";
    }

    try {
      const display = new Intl.DisplayNames(["en"], { type: "region" });
      return display.of(code) || code;
    } catch (error) {
      return code;
    }
  }

  function createStatCard(label, value) {
    const article = document.createElement("article");
    article.className = "panel panel-soft admin-stat-card";
    article.innerHTML = `
      <div class="admin-stat-label">${label}</div>
      <div class="admin-stat-value">${number(value)}</div>
    `;
    return article;
  }

  function appendCells(row, values) {
    values.forEach((value) => {
      const cell = document.createElement("td");
      cell.textContent = value;
      row.appendChild(cell);
    });
  }

  async function loadReport(password) {
    const response = await window.fetch(`${ANALYTICS_ENDPOINT}/report`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      body: JSON.stringify({ password }),
    });

    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      const message = payload && payload.error ? payload.error : "Unable to load analytics.";
      throw new Error(message);
    }
    return payload;
  }

  function renderDashboard(report) {
    const statsGrid = document.getElementById("admin-stats-grid");
    const dailyBody = document.getElementById("admin-daily-body");
    const studiesBody = document.getElementById("admin-studies-body");
    const countriesBody = document.getElementById("admin-countries-body");
    const referrersBody = document.getElementById("admin-referrers-body");
    const lastUpdated = document.getElementById("admin-last-updated");

    statsGrid.innerHTML = "";
    statsGrid.appendChild(createStatCard("Unique browsers", report.summary.uniqueClients));
    statsGrid.appendChild(createStatCard("Total page views", report.summary.totalViews));
    statsGrid.appendChild(createStatCard("Study opens", report.summary.studyViews));
    statsGrid.appendChild(createStatCard("Completed studies", report.summary.completions));
    lastUpdated.textContent = formatTimestamp(report.summary.lastEventAt);

    dailyBody.innerHTML = "";
    const daily = Array.isArray(report.days) ? report.days : [];
    if (!daily.length) {
      dailyBody.innerHTML = '<tr><td colspan="5">No activity recorded yet.</td></tr>';
    } else {
      daily.forEach((entry) => {
        const row = document.createElement("tr");
        appendCells(row, [
          String(entry.date || ""),
          number(entry.totalViews),
          number(entry.uniqueClients),
          number(entry.studyViews),
          number(entry.completions),
        ]);
        dailyBody.appendChild(row);
      });
    }

    studiesBody.innerHTML = "";
    const studies = Array.isArray(report.studies) ? report.studies : [];
    if (!studies.length) {
      studiesBody.innerHTML = '<tr><td colspan="3">No study activity recorded yet.</td></tr>';
    } else {
      studies.forEach((entry) => {
        const row = document.createElement("tr");
        appendCells(row, [
          String(entry.title || entry.studyId || "Unknown"),
          number(entry.views),
          number(entry.completions),
        ]);
        studiesBody.appendChild(row);
      });
    }

    countriesBody.innerHTML = "";
    const countries = Array.isArray(report.countries) ? report.countries : [];
    if (!countries.length) {
      countriesBody.innerHTML = '<tr><td colspan="4">No country data recorded yet.</td></tr>';
    } else {
      countries.forEach((entry) => {
        const row = document.createElement("tr");
        appendCells(row, [
          regionName(entry.key || entry.label),
          number(entry.uniqueClients),
          number(entry.totalViews),
          number(entry.studyViews),
        ]);
        countriesBody.appendChild(row);
      });
    }

    referrersBody.innerHTML = "";
    const referrers = Array.isArray(report.referrers) ? report.referrers : [];
    if (!referrers.length) {
      referrersBody.innerHTML = '<tr><td colspan="4">No referrer data recorded yet.</td></tr>';
    } else {
      referrers.forEach((entry) => {
        const row = document.createElement("tr");
        appendCells(row, [
          String(entry.label || entry.key || "Unknown"),
          number(entry.uniqueClients),
          number(entry.totalViews),
          number(entry.studyViews),
        ]);
        referrersBody.appendChild(row);
      });
    }
  }

  async function refreshDashboard(password) {
    const loginPanel = document.getElementById("admin-login-panel");
    const dashboard = document.getElementById("admin-dashboard");
    const error = document.getElementById("admin-error");

    error.classList.add("hidden");
    error.textContent = "";

    try {
      const report = await loadReport(password);
      setStoredPassword(password);
      loginPanel.classList.add("hidden");
      dashboard.classList.remove("hidden");
      renderDashboard(report);
    } catch (loadError) {
      dashboard.classList.add("hidden");
      loginPanel.classList.remove("hidden");
      error.textContent = loadError.message;
      error.classList.remove("hidden");
      throw loadError;
    }
  }

  function init() {
    const loginForm = document.getElementById("admin-login-form");
    const passwordInput = document.getElementById("admin-password");
    const refreshButton = document.getElementById("admin-refresh-button");
    const logoutButton = document.getElementById("admin-logout-button");

    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const password = passwordInput.value.trim();
      if (!password) {
        return;
      }
      try {
        await refreshDashboard(password);
      } catch (error) {
        passwordInput.focus();
      }
    });

    refreshButton.addEventListener("click", () => {
      const password = getStoredPassword();
      if (!password) {
        return;
      }
      refreshDashboard(password).catch(() => null);
    });

    logoutButton.addEventListener("click", () => {
      setStoredPassword("");
      window.location.reload();
    });

    const storedPassword = getStoredPassword();
    if (storedPassword) {
      refreshDashboard(storedPassword).catch(() => {
        setStoredPassword("");
      });
    }
  }

  document.addEventListener("DOMContentLoaded", init);
})();
