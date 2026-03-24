(function () {
  const data = window.CASE_STUDIES_DATA;
  const LANGUAGE_STORAGE_KEY = "drops-case-studies-language";
  const COMPLETION_STORAGE_KEY = "drops-case-study-completion";

  if (!data) {
    return;
  }

  const supportedLanguages = new Set(data.locales.map((locale) => locale.code));

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
    italy: null,
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
    return `linear-gradient(135deg, ${study.gradient[0]}, ${study.gradient[1]})`;
  }

  function renderCountryMap(study) {
    const shape = countryShapes[study.country] || countryShapes.default;
    if (study.country === "italy") {
      return '<div class="country-map"><img src="./italy.svg" alt="" /></div>';
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
    const params = getSearchParams();
    const currentLanguage = getLanguageFromParams(params);
    const currentCategory = params.get("category") || "all";
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

    eyebrow.textContent = ui.cardsEyebrow;
    title.textContent = ui.cardsTitle;
    copy.textContent = ui.cardsCopy;
    languageLabel.textContent = ui.languageLabel;
    filtersTitle.textContent = ui.filtersTitle;
    filtersCopy.textContent = ui.filtersCopy;
    emptyState.textContent = ui.noResults;

    createLanguageOptions(languageSelect, currentLanguage);
    languageSelect.onchange = (event) => {
      const nextLanguage = event.target.value;
      setStoredLanguage(nextLanguage);
      updateCurrentUrl({ lang: nextLanguage });
      renderCardsPage();
    };

    const firstStudy = data.studies[0];
    openFirstStudyLink.textContent = ui.openFirstStudy;
    openFirstStudyLink.href = createUrl("./case-study.html", {
      id: firstStudy ? firstStudy.id : null,
      lang: currentLanguage,
    });

    filtersContainer.innerHTML = "";
    const categoryEntries = Object.entries(ui.categories);
    categoryEntries.forEach(([key, label]) => {
      const button = createChipButton(label, key === currentCategory, () => {
        updateCurrentUrl({ category: key, lang: currentLanguage });
        renderCardsPage();
      });
      filtersContainer.appendChild(button);
    });

    const filteredStudies =
      currentCategory === "all"
        ? data.studies
        : data.studies.filter((study) => study.category === currentCategory);

    grid.innerHTML = "";

    filteredStudies.forEach((study) => {
      const translation = getStudyTranslation(study, currentLanguage);
      const countryName = getCountryName(currentLanguage, study);
      const card = document.createElement("a");
      card.className = "study-card";
      card.href = createUrl("./case-study.html", {
        id: study.id,
        lang: currentLanguage,
      });

      card.innerHTML = `
        <div class="study-visual" style="background:${gradientStyle(study)}">
          ${renderCountryMap(study)}
          <div class="country-badge">
            <span>${iconMarkup(study.icon)}</span>
            <span>${countryName}</span>
          </div>
        </div>
        <div class="study-body">
          <div class="pill-row">
            <span class="pill">${ui.categories[study.category]}</span>
            <span class="pill pill-neutral">${study.readTime} ${ui.metaReadTime}</span>
          </div>
          <h2 class="study-title">${translation.title}</h2>
          <p class="study-description">${translation.description}</p>
          <div class="study-footer">
            <span class="study-link">${ui.readCaseStudy}<span class="study-link-arrow">→</span></span>
          </div>
        </div>
      `;

      grid.appendChild(card);
    });

    emptyState.classList.toggle("hidden", filteredStudies.length > 0);
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

  function renderDetailPage() {
    const params = getSearchParams();
    const currentLanguage = getLanguageFromParams(params);
    const studyId = params.get("id") || data.studies[0]?.id;
    const study = data.studies.find((entry) => entry.id === studyId) || data.studies[0];
    const ui = getUi(currentLanguage);
    const translation = getStudyTranslation(study, currentLanguage);
    const countryName = getCountryName(currentLanguage, study);
    const completionState = readCompletionState();
    const alreadyCompleted = Boolean(completionState[study.id]);

    setStoredLanguage(currentLanguage);
    setHtmlLanguage(currentLanguage);
    document.title = `${translation.title} | DROPS`;

    const hero = document.getElementById("detail-hero");
    const metaRow = document.getElementById("detail-meta-row");
    const languageRow = document.getElementById("detail-language-row");
    const content = document.getElementById("detail-content");
    const completionTitle = document.getElementById("completion-title");
    const completionCopy = document.getElementById("completion-copy");
    const completionButton = document.getElementById("completion-button");
    const completionHelper = document.getElementById("completion-helper");
    const moreStudiesTitle = document.getElementById("more-studies-title");
    const moreStudiesList = document.getElementById("more-studies-list");
    const backLink = document.getElementById("back-to-cards-link");
    const detailLanguageLabel = document.getElementById("detail-language-label");
    const detailLanguageSelect = document.getElementById("detail-language-select");

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

    hero.style.background = gradientStyle(study);
    hero.innerHTML = `
      <div class="detail-hero-inner">
        <div class="detail-hero-tag">
          <span>${ui.categories[study.category]}</span>
          <span>•</span>
          <span>${countryName}</span>
        </div>
        <h1 class="detail-hero-title">${translation.title}</h1>
        <p class="detail-hero-copy">${translation.description}</p>
      </div>
    `;

    metaRow.innerHTML = `
      <span class="pill">${ui.metaCategory}: ${ui.categories[study.category]}</span>
      <span class="pill pill-neutral">${study.readTime} ${ui.metaReadTime}</span>
      <span class="pill pill-neutral">+${study.points} ${ui.metaPoints}</span>
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

    renderBlocks(content, translation.sections);

    completionTitle.textContent = ui.completionTitle;
    completionCopy.textContent = ui.completionCopy;
    moreStudiesTitle.textContent = ui.moreStudiesTitle;

    moreStudiesList.innerHTML = "";
    data.studies.forEach((entry) => {
      const entryTranslation = getStudyTranslation(entry, currentLanguage);
      const link = document.createElement("a");
      link.className = `sidebar-link${entry.id === study.id ? " is-current" : ""}`;
      link.href = createUrl("./case-study.html", { id: entry.id, lang: currentLanguage });
      link.innerHTML = `
        <span class="sidebar-link-title">${entryTranslation.title}</span>
        <span class="sidebar-link-copy">${entryTranslation.description}</span>
      `;
      moreStudiesList.appendChild(link);
    });

    function syncCompletionButton(progressValue) {
      const unlocked = progressValue >= 80;
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
