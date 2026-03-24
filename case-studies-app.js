(function () {
  const data = window.CASE_STUDIES_DATA;
  const LANGUAGE_STORAGE_KEY = "drops-case-studies-language";
  const COMPLETION_STORAGE_KEY = "drops-case-study-completion";

  if (!data) {
    return;
  }

  const supportedLanguages = new Set(data.locales.map((locale) => locale.code));
  const markdownFiles = {
    en: "./Translations/good-practices-collection-english.md",
    ro: "./Translations/good-practices-collection-romanian.md",
    it: "./Translations/good-practices-collection-italian.md",
    es: "./Translations/good-practices-collection-spanish.md",
    el: "./Translations/good-practices-collection-greek.md",
    hr: "./Translations/good-practices-collection-croatian.md",
  };
  const studyAnchors = {
    en: {
      "warka-tower": "_fgmhmlncf5no",
      "rifo-circular-fashion": "_yoodjpn2q0n4",
      "flipped-learning-adult-education": "_yx6zeb51f5tm",
      "matematica-live": "_bcf9f6dfw8mk",
    },
    ro: {
      "warka-tower": "_fandfouo3gzi",
      "rifo-circular-fashion": "_sf7cn9ceei7j",
      "flipped-learning-adult-education": "_1kv850lpivfy",
      "matematica-live": "_jujydkib6cdp",
    },
    it: {
      "warka-tower": "_heading=h.jl8hrl5zlicd",
      "rifo-circular-fashion": "_heading=h.q6yx4lu0lpea",
      "flipped-learning-adult-education": "_heading=h.zcty5t630yot",
      "matematica-live": "_heading=h.601kqy7kttt",
    },
    es: {
      "warka-tower": "_Toc194516796",
      "rifo-circular-fashion": "_Toc194516797",
      "flipped-learning-adult-education": "_Toc194516810",
      "matematica-live": "_Toc194516811",
    },
    el: {
      "warka-tower": "_fgmhmlncf5no",
      "rifo-circular-fashion": "_yoodjpn2q0n4",
      "flipped-learning-adult-education": "_yx6zeb51f5tm",
      "matematica-live": "_bcf9f6dfw8mk",
    },
    hr: {
      "warka-tower": "_fnc6ad7sw1rh",
      "rifo-circular-fashion": "_jyz85zpajwdi",
      "flipped-learning-adult-education": "_z06x753m33uu",
      "matematica-live": "_nd22pkz0i1to",
    },
  };
  const markdownBundleCache = new Map();
  const studyCollectionCache = new Map();
  const cardGradients = [
    ["#0f9283", "#173260"],
    ["#1172bd", "#0b4577"],
    ["#16834d", "#145c37"],
    ["#cc7a2f", "#8e3e14"],
    ["#7f4cc9", "#173260"],
    ["#d15d68", "#7d2430"],
  ];
  const countrySvgFiles = {
    europe: "./europe.svg",
    ethiopia: "./ethiopia.svg",
    finland: "./finland.svg",
    hungary: "./hungary.svg",
    italy: "./italy.svg",
    spain: "./spain.svg",
    romania: "./romania.svg",
    croatia: "./croatia.svg",
    cyprus: "./cyprus.svg",
  };
  const actualStudyCountries = {
    "study-01": { key: "hungary", label: "Hungary" },
    "study-02": { key: "europe", label: "Europe" },
    "study-03": { key: "europe", label: "Europe" },
    "study-04": { key: "europe", label: "Europe" },
    "study-05": { key: "ethiopia", label: "Ethiopia" },
    "study-06": { key: "italy", label: "Italy" },
    "study-07": { key: "spain", label: "Spain" },
    "study-08": { key: "spain", label: "Spain" },
    "study-09": { key: "croatia", label: "Croatia" },
    "study-10": { key: "europe", label: "Europe" },
    "study-11": { key: "romania", label: "Romania" },
    "study-12": { key: "romania", label: "Romania" },
    "study-13": { key: "europe", label: "Europe" },
    "study-14": { key: "finland", label: "Finland" },
    "study-15": { key: "europe", label: "Europe" },
    "study-16": { key: "europe", label: "Europe" },
    "study-17": { key: "europe", label: "Europe" },
    "study-18": { key: "italy", label: "Italy" },
    "study-19": { key: "europe", label: "Europe" },
    "study-20": { key: "spain", label: "Spain" },
    "study-21": { key: "croatia", label: "Croatia" },
    "study-22": { key: "croatia", label: "Croatia" },
    "study-23": { key: "romania", label: "Romania" },
    "study-24": { key: "romania", label: "Romania" },
  };
  let cardsRenderRequest = 0;
  let detailRenderRequest = 0;

  const countryShapes = {
    spain: {
      viewBox: "0 0 100 100",
      paths: [
        "M10,35 L20,25 L40,20 L60,18 L80,22 L90,30 L92,45 L88,60 L75,72 L55,78 L35,76 L18,68 L8,55 L6,42 L10,35 M85,25 L95,22 L98,30 L95,38 L88,35 L85,25",
      ],
    },
    ethiopia: {
      viewBox: "0 0 100 100",
      paths: [
        "M20,22 L42,15 L65,18 L82,28 L88,45 L82,62 L68,72 L50,78 L32,75 L18,62 L10,48 L15,32 L20,22",
      ],
    },
    default: {
      viewBox: "0 0 100 100",
      paths: ["M25,25 L50,15 L75,25 L85,50 L75,75 L50,85 L25,75 L15,50 L25,25"],
    },
  };

  function isValidLanguage(language) {
    return supportedLanguages.has(language);
  }

  function getStoredLanguage() {
    try {
      return window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    } catch (error) {
      return null;
    }
  }

  function setStoredLanguage(language) {
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    } catch (error) {
      return null;
    }
    return null;
  }

  function readCompletionState() {
    try {
      const raw = window.localStorage.getItem(COMPLETION_STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (error) {
      return {};
    }
  }

  function writeCompletionState(state) {
    try {
      window.localStorage.setItem(COMPLETION_STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      return null;
    }
    return null;
  }

  function getSearchParams() {
    return new URLSearchParams(window.location.search);
  }

  function getLanguageFromParams(params) {
    const language = params.get("lang");
    if (language && isValidLanguage(language)) {
      return language;
    }
    const stored = getStoredLanguage();
    if (stored && isValidLanguage(stored)) {
      return stored;
    }
    return data.defaultLocale;
  }

  function setHtmlLanguage(language) {
    document.documentElement.lang = language;
  }

  function getUi(language) {
    return data.ui[language] || data.ui[data.defaultLocale];
  }

  function getStudyTranslation(study, language) {
    return study.translations[language] || study.translations[data.defaultLocale];
  }

  function getCountryName(language, study) {
    if (study.countryLabel) {
      return study.countryLabel;
    }
    const ui = getUi(language);
    return ui.countries[study.country] || study.country;
  }

  function createUrl(pathname, params) {
    const url = new URL(pathname, window.location.href);
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        url.searchParams.set(key, value);
      }
    });
    return url.pathname + url.search;
  }

  function updateCurrentUrl(params) {
    const url = new URL(window.location.href);
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        url.searchParams.set(key, value);
      } else {
        url.searchParams.delete(key);
      }
    });
    window.history.replaceState({}, "", url.toString());
  }

  function createLanguageOptions(select, currentLanguage) {
    select.innerHTML = "";
    data.locales.forEach((locale) => {
      const option = document.createElement("option");
      option.value = locale.code;
      option.textContent = locale.label;
      option.selected = locale.code === currentLanguage;
      select.appendChild(option);
    });
  }

  function iconMarkup(icon) {
    const icons = {
      drop:
        '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2c2.9 4 7 8.3 7 12.1A7 7 0 1 1 5 14.1C5 10.3 9.1 6 12 2Z"/></svg>',
      loop:
        '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M7.4 7.2h7.1l-1.9-2 1.4-1.4 4.3 4.4-4.3 4.4-1.4-1.4 1.9-2H7.9a3.9 3.9 0 0 0 0 7.8h2.2v2H7.9a5.9 5.9 0 0 1-.5-11.8Zm8.7-2.2h.1a5.9 5.9 0 0 1 0 11.8H9.5l1.9 2-1.4 1.4-4.3-4.4 4.3-4.4 1.4 1.4-1.9 2H16a3.9 3.9 0 0 0 .1-7.8H14V5Z"/></svg>',
      cap:
        '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="m12 3 10 5-10 5L2 8l10-5Zm-6 8.3 6 3 6-3V16c0 2-2.7 4-6 4s-6-2-6-4v-4.7Z"/></svg>',
      spark:
        '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M13 2 6 13h5l-1 9 8-12h-5l0-8Z"/></svg>',
    };
    return icons[icon] || icons.spark;
  }

  function gradientStyle(study) {
    const gradient = study.gradient || cardGradients[study.index % cardGradients.length];
    return `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})`;
  }

  function renderCountryMap(study) {
    const svgFile = countrySvgFiles[study.country];
    const shape = countryShapes[study.country] || countryShapes.default;

    if (svgFile) {
      return `<div class="country-map"><img src="${svgFile}" alt="" /></div>`;
    }

    const paths = shape.paths
      .map((path) => `<path d="${path}" fill="rgba(255,255,255,0.18)" stroke="rgba(255,255,255,0.75)" stroke-width="2"></path>`)
      .join("");

    return `<div class="country-map"><svg viewBox="${shape.viewBox}" preserveAspectRatio="xMidYMid meet" aria-hidden="true">${paths}</svg></div>`;
  }

  function createChipButton(label, active, onClick) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `chip${active ? " is-active" : ""}`;
    button.textContent = label;
    button.addEventListener("click", onClick);
    return button;
  }

  function renderCardsPage() {
    const requestId = ++cardsRenderRequest;
    const params = getSearchParams();
    const currentLanguage = getLanguageFromParams(params);
    const ui = getUi(currentLanguage);
    setStoredLanguage(currentLanguage);
    setHtmlLanguage(currentLanguage);

    document.title = `${ui.cardsTitle} | DROPS`;

    const title = document.getElementById("cards-title");
    const eyebrow = document.getElementById("cards-eyebrow");
    const copy = document.getElementById("cards-copy");
    const languageLabel = document.getElementById("cards-language-label");
    const filtersTitle = document.getElementById("filters-title");
    const filtersCopy = document.getElementById("filters-copy");
    const emptyState = document.getElementById("cards-empty-state");
    const languageSelect = document.getElementById("cards-language-select");
    const filtersContainer = document.getElementById("category-filters");
    const grid = document.getElementById("case-study-grid");
    const openFirstStudyLink = document.getElementById("open-first-study-link");

    if (eyebrow) eyebrow.textContent = ui.cardsEyebrow;
    if (title) title.textContent = ui.cardsTitle;
    if (copy) copy.textContent = ui.cardsCopy;
    if (languageLabel) languageLabel.textContent = ui.languageLabel;
    if (filtersTitle) filtersTitle.textContent = ui.filtersTitle;
    if (filtersCopy) filtersCopy.textContent = ui.filtersCopy;
    if (emptyState) emptyState.textContent = ui.noResults;

    if (languageSelect) {
      createLanguageOptions(languageSelect, currentLanguage);
      languageSelect.onchange = (event) => {
        const nextLanguage = event.target.value;
        setStoredLanguage(nextLanguage);
        updateCurrentUrl({ lang: nextLanguage });
        renderCardsPage();
      };
    }

    if (filtersTitle) filtersTitle.textContent = ui.cardsTitle;
    if (filtersCopy) filtersCopy.textContent = ui.cardsCopy;
    if (filtersContainer) {
      filtersContainer.innerHTML = "";
      filtersContainer.classList.add("hidden");
    }
    grid.innerHTML = "";

    loadStudyCollection(currentLanguage)
      .then((studies) => {
        if (requestId !== cardsRenderRequest) {
          return;
        }

        const completionState = readCompletionState();

        const firstStudy = studies[0];
        if (openFirstStudyLink) {
          openFirstStudyLink.textContent = ui.openFirstStudy;
          openFirstStudyLink.href = createUrl("./case-study.html", {
            id: firstStudy ? firstStudy.id : null,
            lang: currentLanguage,
          });
        }

        studies.forEach((study) => {
          const countryName = getCountryName(currentLanguage, study);
          const isCompleted = Boolean(completionState[study.id]);
          const card = document.createElement("a");
          card.className = `study-card${isCompleted ? " is-completed" : ""}`;
          card.href = createUrl("./case-study.html", {
            id: study.id,
            lang: currentLanguage,
          });

          card.innerHTML = `
            <div class="study-visual" style="background:${gradientStyle(study)}">
              ${renderCountryMap(study)}
              ${isCompleted ? `<div class="study-status-badge" aria-label="${ui.completionDone}"><span class="study-status-check">✓</span><span>${ui.completionDone}</span></div>` : ""}
              <div class="country-badge">
                <span>${iconMarkup(study.icon || "spark")}</span>
                <span>${countryName}</span>
              </div>
            </div>
            <div class="study-body">
              <div class="pill-row">
                <span class="pill">${countryName}</span>
                <span class="pill pill-neutral">${study.readTime} ${ui.metaReadTime}</span>
              </div>
              <h2 class="study-title">${study.title}</h2>
              <p class="study-description">${study.description}</p>
              <div class="study-footer">
                <span class="study-link">${ui.readCaseStudy}<span class="study-link-arrow">→</span></span>
              </div>
            </div>
          `;

          grid.appendChild(card);
        });

        emptyState.classList.toggle("hidden", studies.length > 0);
      })
      .catch(() => {
        if (requestId !== cardsRenderRequest) {
          return;
        }

        const fallbackStudies = data.studies.map((study, index) => {
          const translation = getStudyTranslation(study, currentLanguage);
          return {
            id: study.id,
            index,
            icon: study.icon,
            gradient: study.gradient,
            title: translation.title,
            description: translation.description,
            readTime: study.readTime,
            country: study.country,
            countryLabel: getCountryName(currentLanguage, study),
          };
        });
        const completionState = readCompletionState();

        const firstStudy = fallbackStudies[0];
        if (openFirstStudyLink) {
          openFirstStudyLink.textContent = ui.openFirstStudy;
          openFirstStudyLink.href = createUrl("./case-study.html", {
            id: firstStudy ? firstStudy.id : null,
            lang: currentLanguage,
          });
        }

        fallbackStudies.forEach((study) => {
          const isCompleted = Boolean(completionState[study.id]);
          const card = document.createElement("a");
          card.className = `study-card${isCompleted ? " is-completed" : ""}`;
          card.href = createUrl("./case-study.html", {
            id: study.id,
            lang: currentLanguage,
          });

          card.innerHTML = `
            <div class="study-visual" style="background:${gradientStyle(study)}">
              ${renderCountryMap(study)}
              ${isCompleted ? `<div class="study-status-badge" aria-label="${ui.completionDone}"><span class="study-status-check">✓</span><span>${ui.completionDone}</span></div>` : ""}
              <div class="country-badge">
                <span>${iconMarkup(study.icon || "spark")}</span>
                <span>${study.countryLabel}</span>
              </div>
            </div>
            <div class="study-body">
              <div class="pill-row">
                <span class="pill">${study.countryLabel}</span>
                <span class="pill pill-neutral">${study.readTime} ${ui.metaReadTime}</span>
              </div>
              <h2 class="study-title">${study.title}</h2>
              <p class="study-description">${study.description}</p>
              <div class="study-footer">
                <span class="study-link">${ui.readCaseStudy}<span class="study-link-arrow">→</span></span>
              </div>
            </div>
          `;

          grid.appendChild(card);
        });

        emptyState.classList.toggle("hidden", fallbackStudies.length > 0);
      });

    setHtmlLanguage(currentLanguage);
  }

  function renderBlocks(container, blocks) {
    container.innerHTML = "";
    blocks.forEach((block) => {
      if (block.type === "heading") {
        const heading = document.createElement("h2");
        heading.textContent = block.text;
        container.appendChild(heading);
        return;
      }

      if (block.type === "paragraph") {
        const paragraph = document.createElement("p");
        paragraph.textContent = block.text;
        container.appendChild(paragraph);
        return;
      }

      if (block.type === "bullets" || block.type === "numbered") {
        const list = document.createElement(block.type === "bullets" ? "ul" : "ol");
        block.items.forEach((item) => {
          const entry = document.createElement("li");
          entry.textContent = item;
          list.appendChild(entry);
        });
        container.appendChild(list);
      }
    });
  }

  function getMarkdownFile(language) {
    return markdownFiles[language] || markdownFiles[data.defaultLocale];
  }

  async function fetchMarkdownText(language) {
    const file = getMarkdownFile(language);

    if (!markdownBundleCache.has(file)) {
      markdownBundleCache.set(
        file,
        window.fetch(file).then((response) => {
          if (!response.ok) {
            throw new Error(`Unable to load ${file}`);
          }
          return response.text();
        })
      );
    }

    return markdownBundleCache.get(file);
  }

  function collectImageSources(markdown) {
    return Array.from(markdown.matchAll(/<img\b[^>]*\bsrc="([^"]+)"/g), (match) => match[1]);
  }

  async function loadMarkdownBundle(language) {
    const cacheKey = isValidLanguage(language) ? language : data.defaultLocale;

    if (!markdownBundleCache.has(cacheKey)) {
      markdownBundleCache.set(
        cacheKey,
        Promise.all([fetchMarkdownText(cacheKey), fetchMarkdownText("en")]).then(
          ([markdown, englishMarkdown]) => {
            const englishSources = collectImageSources(englishMarkdown);
            const localizedSources = collectImageSources(markdown);
            const imageMap = new Map();

            localizedSources.forEach((source, index) => {
              imageMap.set(source, englishSources[index] || source);
            });

            return { markdown, imageMap };
          }
        )
      );
    }

    return markdownBundleCache.get(cacheKey);
  }

  function formatInlineMarkdown(text) {
    return text
      .trim()
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  }

  function isMarkdownTableLine(line) {
    return /^\|.*\|\s*$/.test(line.trim());
  }

  function isMarkdownSeparatorLine(line) {
    return /^\|\s*[-:| ]+\|\s*$/.test(line.trim());
  }

  function convertMarkdownTableBlock(block) {
    const rows = block
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line && isMarkdownTableLine(line) && !isMarkdownSeparatorLine(line))
      .map((line) =>
        line
          .replace(/^\|/, "")
          .replace(/\|$/, "")
          .split("|")
          .map((cell) => `<td>${formatInlineMarkdown(cell)}</td>`)
          .join("")
      );

    return `<table class="markdown-table"><tbody>${rows
      .map((row) => `<tr>${row}</tr>`)
      .join("")}</tbody></table>`;
  }

  function convertMarkdownTablesToHtml(content) {
    return content
      .split(/\n{2,}/)
      .map((block) => {
        const trimmed = block.trim();
        if (!trimmed) {
          return "";
        }

        const lines = trimmed.split("\n").filter((line) => line.trim());
        const isTableBlock =
          lines.length > 1 &&
          lines.every((line) => isMarkdownTableLine(line) || isMarkdownSeparatorLine(line));

        return isTableBlock ? convertMarkdownTableBlock(trimmed) : trimmed;
      })
      .filter(Boolean)
      .join("\n\n");
  }

  function normalizeImagePaths(content, imageMap) {
    return content.replace(/(<img\b[^>]*\bsrc=")([^"]+)(")/g, (match, prefix, source, suffix) => {
      let nextSource = imageMap.get(source) || source;
      if (!/^(?:[a-z]+:|\/)/i.test(nextSource)) {
        nextSource = `./Translations/${nextSource.replace(/^\.?\//, "")}`;
      }
      return `${prefix}${nextSource}${suffix}`;
    });
  }

  function cleanSectionLabel(text) {
    return text
      .replace(/\s+/g, " ")
      .replace(/^\d+(?:\.\d+)+(?:\s+|$)/u, "")
      .replace(/^\d+[.)]\s*/u, "")
      .replace(/^[-:.\s]+/u, "")
      .replace(/[:.\s]+$/u, "")
      .trim();
  }

  function cleanInlineLabel(text) {
    return cleanSectionLabel(text).replace(/["“”]+/g, "");
  }

  function normalizeSectionContent(html) {
    const trimmed = html.trim();
    if (!trimmed) {
      return "";
    }

    if (!/<(?:p|ul|ol|table|div|figure|blockquote|h\d)\b/i.test(trimmed)) {
      return `<p>${trimmed}</p>`;
    }

    return trimmed;
  }

  function htmlToText(html) {
    const parser = new window.DOMParser();
    return parser
      .parseFromString(`<div>${html}</div>`, "text/html")
      .body.textContent.replace(/\s+/g, " ")
      .trim();
  }

  function truncateText(text, maxLength) {
    if (text.length <= maxLength) {
      return text;
    }
    return `${text.slice(0, maxLength).replace(/\s+\S*$/u, "").trim()}…`;
  }

  function toTitleCase(text) {
    const lower = text.toLowerCase();
    return lower.replace(/\b\p{L}/gu, (letter) => letter.toUpperCase());
  }

  function normalizeCountryKey(country) {
    const normalized = country.toLowerCase().trim();
    const knownCountries = {
      europe: "europe",
      spain: "spain",
      italy: "italy",
      romania: "romania",
      croatia: "croatia",
      cyprus: "cyprus",
      ethiopia: "ethiopia",
      finland: "finland",
      hungary: "hungary",
    };

    return knownCountries[normalized] || "default";
  }

  function createStudyId(index) {
    return `study-${String(index + 1).padStart(2, "0")}`;
  }

  function getActualStudyCountry(studyId, fallbackCountryKey, fallbackCountryLabel) {
    const override = actualStudyCountries[studyId];
    if (override) {
      return override;
    }

    return {
      key: fallbackCountryKey,
      label: fallbackCountryLabel,
    };
  }

  function extractTopicKey(text) {
    const match = text.match(/^(\d+)\./);
    return match ? `section-${match[1]}` : "section-1";
  }

  function parseMetaTable(table) {
    const rows = Array.from(table.querySelectorAll("tr")).map((row) =>
      Array.from(row.cells).map((cell) => cell.textContent.replace(/\s+/g, " ").trim())
    );

    const partner = rows[0]?.[1] || "";
    const country = rows[1]?.[1] || "";
    const contact = rows[2]?.[1] || "";
    const date = rows[3]?.[1] || "";

    return {
      partner,
      country,
      contact,
      date,
    };
  }

  function isPureLabelRow(row) {
    const cells = Array.from(row.cells);
    if (cells.length !== 1) {
      return false;
    }

    const cell = cells[0];
    const text = cell.textContent.replace(/\s+/g, " ").trim();
    const hasMedia = Boolean(cell.querySelector("img, ul, ol, p, a, table, div, figure"));
    const hasAnchor = Boolean(cell.querySelector(".anchor"));
    const looksLikeLabel =
      /:\s*$/u.test(text) || (Boolean(cell.querySelector("strong")) && text.length <= 120);

    return Boolean(text) && !hasMedia && !hasAnchor && looksLikeLabel;
  }

  function extractStudyDataFromTable(contentTable, meta, index) {
    const images = [];
    const contentSections = [];
    const criteria = [];
    let criteriaTitle = "";
    let pendingLabel = "";
    let titleSeen = false;
    let title = "";
    let topicKey = "section-1";

    Array.from(contentTable.querySelectorAll("tr")).forEach((row) => {
      const cells = Array.from(row.cells);
      if (!cells.length) {
        return;
      }

      if (!titleSeen && isPureLabelRow(row)) {
        const rawLabel = cells[0].textContent.replace(/\s+/g, " ").trim();
        topicKey = extractTopicKey(rawLabel);
      }

      if (row.querySelector(".anchor")) {
        title = cleanInlineLabel(cells[0].textContent);
        titleSeen = true;
        pendingLabel = "";
        return;
      }

      if (!titleSeen) {
        return;
      }

      if (isPureLabelRow(row)) {
        pendingLabel = cleanSectionLabel(cells[0].textContent);
        return;
      }

      if (row.querySelector("img")) {
        images.push(
          ...Array.from(row.querySelectorAll("img")).map(
            (image) => ({
              src: image.getAttribute("src") || "",
              html: `<figure class="article-figure">${image.outerHTML}</figure>`,
            })
          )
        );
        pendingLabel = "";
        return;
      }

      if (cells.length === 2) {
        criteriaTitle = criteriaTitle || pendingLabel || "Selection criteria";
        criteria.push({
          label: cleanInlineLabel(cells[0].textContent),
          content: cells[1].innerHTML.trim(),
        });
        return;
      }

      if (cells.length === 1) {
        contentSections.push({
          title: pendingLabel,
          content: normalizeSectionContent(cells[0].innerHTML.trim()),
        });
        pendingLabel = "";
      }
    });

    const articleParts = [];

    const [leadSection, ...otherSections] = contentSections;

    if (leadSection) {
      articleParts.push(`
        <section class="article-section article-section-lead">
          <div class="article-rich-block">${leadSection.content}</div>
        </section>
      `);
    }

    if (images.length) {
      articleParts.push(
        `<div class="article-media-stack">${images.map((image) => image.html).join("")}</div>`
      );
    }

    otherSections.forEach((section) => {
      articleParts.push(`
        <section class="article-section">
          ${section.title ? `<h2>${section.title}</h2>` : ""}
          <div class="article-rich-block">${section.content}</div>
        </section>
      `);
    });

    if (criteria.length) {
      articleParts.splice(
        Math.min(articleParts.length, 2),
        0,
        `
          <section class="article-section article-section-criteria">
            <h2>${criteriaTitle}</h2>
            <div class="criteria-grid">
              ${criteria
                .map(
                  (entry) => `
                    <article class="criteria-card">
                      <h3 class="criteria-card-title">${entry.label}</h3>
                      <div class="criteria-card-content">${entry.content}</div>
                    </article>
                  `
                )
                .join("")}
            </div>
          </section>
        `
      );
    }

    const articleHtml = articleParts.join("");
    const firstSectionText = htmlToText(contentSections[0]?.content || "");
    const countryLabel = meta.country && meta.country === meta.country.toUpperCase()
      ? toTitleCase(meta.country)
      : meta.country;

    const studyId = createStudyId(index);
    const fallbackCountryKey = normalizeCountryKey(countryLabel);
    const actualCountry = getActualStudyCountry(studyId, fallbackCountryKey, countryLabel);

    return {
      id: studyId,
      index,
      title,
      description: truncateText(firstSectionText, 190),
      articleHtml,
      imageSrc: images[0]?.src || "",
      partner: meta.partner,
      country: actualCountry.key,
      countryLabel: actualCountry.label,
      contact: meta.contact,
      date: meta.date,
      topicKey,
      readTime: Math.max(4, Math.ceil((htmlToText(articleHtml).split(/\s+/u).filter(Boolean).length || 0) / 180)),
      icon: "spark",
    };
  }

  function extractStudyMarkup(markdown, anchorId) {
    const anchorNeedle = `id="${anchorId}"`;
    const anchorIndex = markdown.indexOf(anchorNeedle);

    if (anchorIndex === -1) {
      return null;
    }

    const partnerMarker = "| Partner Organization Name |";
    const previousAnchorIndex = markdown.lastIndexOf('<span id="', anchorIndex - 1);
    const partnerIndex = markdown.lastIndexOf(partnerMarker, anchorIndex);
    const tableIndex = markdown.lastIndexOf("<table", anchorIndex);

    let startIndex = tableIndex >= 0 ? tableIndex : anchorIndex;
    if (partnerIndex !== -1 && partnerIndex > previousAnchorIndex) {
      startIndex = partnerIndex;
    }

    const nextAnchorIndex = markdown.indexOf('<span id="', anchorIndex + 1);
    let endIndex = nextAnchorIndex === -1 ? markdown.length : nextAnchorIndex;

    if (nextAnchorIndex !== -1) {
      const nextPartnerIndex = markdown.lastIndexOf(partnerMarker, nextAnchorIndex);
      if (nextPartnerIndex !== -1 && nextPartnerIndex > anchorIndex) {
        endIndex = nextPartnerIndex;
      }
    }

    return markdown.slice(startIndex, endIndex).trim();
  }

  function buildStudyCollection(markdown, imageMap) {
    const html = normalizeImagePaths(convertMarkdownTablesToHtml(markdown), imageMap);
    const parser = new window.DOMParser();
    const doc = parser.parseFromString(`<div>${html}</div>`, "text/html");
    const tables = Array.from(doc.querySelectorAll("table"));
    const studies = [];
    let pendingMeta = { partner: "", country: "", contact: "", date: "" };

    tables.forEach((table) => {
      if (table.classList.contains("markdown-table")) {
        pendingMeta = parseMetaTable(table);
        return;
      }

      if (!table.querySelector(".anchor")) {
        return;
      }

      studies.push(extractStudyDataFromTable(table, pendingMeta, studies.length));
      pendingMeta = { partner: "", country: "", contact: "", date: "" };
    });

    return studies;
  }

  async function loadStudyCollection(language) {
    const cacheKey = isValidLanguage(language) ? language : data.defaultLocale;

    if (!studyCollectionCache.has(cacheKey)) {
      studyCollectionCache.set(
        cacheKey,
        loadMarkdownBundle(cacheKey).then(({ markdown, imageMap }) =>
          buildStudyCollection(markdown, imageMap)
        )
      );
    }

    return studyCollectionCache.get(cacheKey);
  }

  async function loadStudyMarkup(studyId, language) {
    const studies = await loadStudyCollection(language);
    return studies.find((study) => study.id === studyId) || null;
  }

  async function renderDetailPage() {
    const requestId = ++detailRenderRequest;
    const params = getSearchParams();
    const currentLanguage = getLanguageFromParams(params);
    const ui = getUi(currentLanguage);

    setStoredLanguage(currentLanguage);
    setHtmlLanguage(currentLanguage);

    const hero = document.getElementById("detail-hero");
    const metaRow = document.getElementById("detail-meta-row");
    const languageRow = document.getElementById("detail-language-row");
    const content = document.getElementById("detail-content");
    const completionTitle = document.getElementById("completion-title");
    const completionCopy = document.getElementById("completion-copy");
    const completionButton = document.getElementById("completion-button");
    const completionHelper = document.getElementById("completion-helper");
    const nextStudyLink = document.getElementById("next-study-link");
    const moreStudiesTitle = document.getElementById("more-studies-title");
    const moreStudiesList = document.getElementById("more-studies-list");
    const completionSection = completionTitle.closest("section");
    const moreStudiesSection = moreStudiesTitle.closest("section");
    const backLink = document.getElementById("back-to-cards-link");
    const detailLanguageLabel = document.getElementById("detail-language-label");
    const detailLanguageSelect = document.getElementById("detail-language-select");

    let studies;
    try {
      studies = await loadStudyCollection(currentLanguage);
    } catch (error) {
      studies = data.studies.map((entry, index) => {
        const translation = getStudyTranslation(entry, currentLanguage);
        return {
          id: entry.id,
          index,
          title: translation.title,
          description: translation.description,
          articleHtml: "",
          readTime: entry.readTime,
          country: getCountryName(currentLanguage, entry),
          countryLabel: getCountryName(currentLanguage, entry),
          partner: "",
          date: "",
          icon: entry.icon,
          gradient: entry.gradient,
          fallbackSections: translation.sections,
        };
      });
    }

    if (requestId !== detailRenderRequest) {
      return;
    }

    const studyId = params.get("id") || studies[0]?.id;
    const study = studies.find((entry) => entry.id === studyId) || studies[0];
    const currentStudyIndex = studies.findIndex((entry) => entry.id === study.id);
    const nextStudy = currentStudyIndex >= 0 ? studies[currentStudyIndex + 1] || null : null;
    const completionState = readCompletionState();
    const alreadyCompleted = Boolean(completionState[study.id]);
    const hasKnownCountry = Boolean(study.countryLabel);

    document.title = `${study.title} | DROPS`;

    backLink.textContent = `← ${ui.backToCards}`;
    backLink.href = createUrl("./index.html", { lang: currentLanguage });

    detailLanguageLabel.textContent = ui.languageLabel;
    createLanguageOptions(detailLanguageSelect, currentLanguage);
    detailLanguageSelect.onchange = (event) => {
      const nextLanguage = event.target.value;
      setStoredLanguage(nextLanguage);
      updateCurrentUrl({ lang: nextLanguage, id: study.id });
      renderDetailPage();
    };

    hero.style.background = study.imageSrc
      ? `linear-gradient(135deg, rgba(23, 50, 96, 0.72), rgba(15, 146, 131, 0.6)), url("${study.imageSrc}") center/cover`
      : gradientStyle(study);
    hero.innerHTML = `
      <div class="detail-hero-inner">
        <div class="detail-hero-tag">
          ${hasKnownCountry ? `<span>${study.countryLabel}</span>` : ""}
          ${hasKnownCountry && study.partner ? `<span>•</span>` : ""}
          ${study.partner ? `<span>${study.partner}</span>` : ""}
        </div>
        <h1 class="detail-hero-title">${study.title}</h1>
        <p class="detail-hero-copy">${study.description}</p>
      </div>
    `;

    metaRow.innerHTML = `
      ${hasKnownCountry ? `<span class="pill">${study.countryLabel}</span>` : ""}
      <span class="pill pill-neutral">${study.readTime} ${ui.metaReadTime}</span>
      ${study.date ? `<span class="pill pill-neutral">${study.date}</span>` : ""}
    `;

    languageRow.innerHTML = "";
    data.locales.forEach((locale) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `language-chip${locale.code === currentLanguage ? " is-active" : ""}`;
      button.textContent = locale.label;
      button.addEventListener("click", () => {
        setStoredLanguage(locale.code);
        updateCurrentUrl({ lang: locale.code, id: study.id });
        renderDetailPage();
      });
      languageRow.appendChild(button);
    });

    if (study.articleHtml) {
      content.innerHTML = study.articleHtml;
    } else if (study.fallbackSections) {
      renderBlocks(content, study.fallbackSections);
    } else {
      content.innerHTML = "";
    }

    completionTitle.textContent = ui.completionTitle;
    completionCopy.textContent = ui.completionCopy;
    nextStudyLink.textContent = ui.nextStudy || "Go to next case study";
    nextStudyLink.href = nextStudy
      ? createUrl("./case-study.html", { id: nextStudy.id, lang: currentLanguage })
      : createUrl("./index.html", { lang: currentLanguage });
    moreStudiesTitle.textContent = ui.moreStudiesTitle;

    moreStudiesList.innerHTML = "";
    const relatedStudies = studies.filter(
      (entry) => entry.id !== study.id && entry.topicKey === study.topicKey
    );
    const sidebarStudies = (relatedStudies.length
      ? relatedStudies
      : studies.filter((entry) => entry.id !== study.id)).slice(0, 4);

    sidebarStudies.forEach((entry) => {
      const link = document.createElement("a");
      link.className = "sidebar-link";
      link.href = createUrl("./case-study.html", { id: entry.id, lang: currentLanguage });
      link.innerHTML = `
        <span class="sidebar-link-title">${entry.title}</span>
        <span class="sidebar-link-copy">${entry.description}</span>
      `;
      moreStudiesList.appendChild(link);
    });

    function syncCompletionButton(progressValue) {
      const unlocked = progressValue >= 80;
      if (moreStudiesSection) {
        moreStudiesSection.classList.toggle("hidden", alreadyCompleted);
      }
      if (completionSection) {
        completionSection.classList.add("detail-sidebar-progress");
      }
      nextStudyLink.classList.toggle("hidden", !(alreadyCompleted && nextStudy));

      if (alreadyCompleted) {
        completionButton.textContent = ui.completionDone;
        completionButton.disabled = true;
        completionHelper.textContent = ui.completionHintDone;
        return;
      }

      completionButton.textContent = unlocked
        ? ui.completionReady
        : `${ui.completionLocked} (${Math.round(progressValue)}%)`;
      completionButton.disabled = !unlocked;
      completionHelper.textContent = ui.completionHintLocked;
    }

    let progressValue = 0;
    const progressBar = document.getElementById("reading-progress-bar");
    const updateProgress = function () {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      progressValue = scrollable > 0 ? Math.min((window.scrollY / scrollable) * 100, 100) : 100;
      progressBar.style.width = `${progressValue}%`;
      syncCompletionButton(progressValue);
    };

    completionButton.onclick = function () {
      if (alreadyCompleted || progressValue < 80) {
        return;
      }
      const nextState = readCompletionState();
      nextState[study.id] = true;
      writeCompletionState(nextState);
      renderDetailPage();
    };

    if (window.__dropsCaseStudyScrollHandler) {
      window.removeEventListener("scroll", window.__dropsCaseStudyScrollHandler);
    }
    window.__dropsCaseStudyScrollHandler = updateProgress;
    window.addEventListener("scroll", window.__dropsCaseStudyScrollHandler, { passive: true });
    updateProgress();
  }

  function init() {
    const page = document.body.getAttribute("data-page");
    if (page === "cards") {
      renderCardsPage();
    }
    if (page === "detail") {
      renderDetailPage();
    }
  }

  document.addEventListener("DOMContentLoaded", init);
})();
