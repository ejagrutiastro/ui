(function () {
  const API_BASE_URL = "http://127.0.0.1:8000";
  const LOGO_PATH = "./src/images/logo.png";
  const ICONS = {
    delete: "./src/images/icon-delete.svg",
    edit: "./src/images/icon-pencil.svg",
    first: "./src/images/icon-chevrons-left.svg",
    kundali: "./src/images/kundali1.jpg",
    last: "./src/images/icon-chevrons-right.svg",
    next: "./src/images/icon-chevron-right.svg",
    new: "./src/images/icon-plus.svg",
    previous: "./src/images/icon-chevron-left.svg",
    view: "./src/images/icon-eye.svg",
  };
  const ASTRO_NOTE_CATEGORIES = [
    { key: "planet", labelEn: "planet", labelMr: "????", glyph: "P", image: "./src/images/planets.jpg" },
    { key: "house", labelEn: "house", labelMr: "??", glyph: "H" },
    { key: "sign", labelEn: "sign", labelMr: "????", glyph: "S", image: "./src/images/zodiac.jpg" },
    { key: "nakshatra", labelEn: "nakshatra", labelMr: "???????", glyph: "N", image: "./src/images/nakshatra.jpg" },
    { key: "jaimini", labelEn: "Jaimini", labelMr: "??????", glyph: "J" },
    { key: "kp", labelEn: "KP", labelMr: "????", glyph: "KP" },
  ];
  const ASTRO_NOTE_ICON_MAP = {
    planet: [
      { key: "sun", labelEn: "Sun", labelMr: "?????", glyph: "Su", image: "./src/images/sun.jpg" },
      { key: "moon", labelEn: "Moon", labelMr: "?????", glyph: "Mo", image: "./src/images/moon.jpg" },
      { key: "mars", labelEn: "Mars", labelMr: "????", glyph: "Ma", image: "./src/images/mars.jpg" },
      { key: "mercury", labelEn: "Mercury", labelMr: "???", glyph: "Me", image: "./src/images/mercury.jpg" },
      { key: "jupiter", labelEn: "Jupiter", labelMr: "????", glyph: "Ju", image: "./src/images/jupiter.jpg" },
      { key: "venus", labelEn: "Venus", labelMr: "?????", glyph: "Ve", image: "./src/images/venus.jpg" },
      { key: "saturn", labelEn: "Saturn", labelMr: "???", glyph: "Sa", image: "./src/images/saturn.jpg" },
      { key: "rahu", labelEn: "Rahu", labelMr: "????", glyph: "Ra", image: "./src/images/rahu.jpg" },
      { key: "ketu", labelEn: "Ketu", labelMr: "????", glyph: "Ke", image: "./src/images/ketu.jpg" },
    ],
    house: Array.from({ length: 12 }, (_, index) => {
      const n = index + 1;
      return { key: `house-${n}`, labelEn: `${n}H`, labelMr: `${n} ??`, glyph: `${n}`, image: `./src/images/house-${n}.jpg` };
    }),
    sign: [
      { key: "aries", labelEn: "Aries", labelMr: "???", glyph: "Ar", image: "./src/images/Aries.jpg" },
      { key: "taurus", labelEn: "Taurus", labelMr: "????", glyph: "Ta", image: "./src/images/taurus.jpg" },
      { key: "gemini", labelEn: "Gemini", labelMr: "?????", glyph: "Ge", image: "./src/images/gemini.jpg" },
      { key: "cancer", labelEn: "Cancer", labelMr: "????", glyph: "Ca", image: "./src/images/Cancer.jpg" },
      { key: "leo", labelEn: "Leo", labelMr: "????", glyph: "Le", image: "./src/images/Leo.jpg" },
      { key: "virgo", labelEn: "Virgo", labelMr: "?????", glyph: "Vi", image: "./src/images/Virgo.jpg" },
      { key: "libra", labelEn: "Libra", labelMr: "???", glyph: "Li", image: "./src/images/Libra.jpg" },
      { key: "scorpio", labelEn: "Scorpio", labelMr: "???????", glyph: "Sc", image: "./src/images/Scorpio.jpg" },
      { key: "sagittarius", labelEn: "Sagittarius", labelMr: "???", glyph: "Sg", image: "./src/images/Sagittarius.jpg" },
      { key: "capricorn", labelEn: "Capricorn", labelMr: "???", glyph: "Cp", image: "./src/images/Capricon.jpg" },
      { key: "aquarius", labelEn: "Aquarius", labelMr: "????", glyph: "Aq", image: "./src/images/Aquarius.jpg" },
      { key: "pisces", labelEn: "Pisces", labelMr: "???", glyph: "Pi", image: "./src/images/Pisces.jpg" },
    ],
    nakshatra: [
      { key: "ashwini", labelEn: "Ashwini", labelMr: "???????", glyph: "1", image: "./src/images/nakshatra-ashwini.jpg" },
      { key: "bharani", labelEn: "Bharani", labelMr: "????", glyph: "2", image: "./src/images/nakshatra-bharani.jpg" },
      { key: "krittika", labelEn: "Krittika", labelMr: "????????", glyph: "3", image: "./src/images/nakshatra-krittika.jpg" },
      { key: "rohini", labelEn: "Rohini", labelMr: "??????", glyph: "4", image: "./src/images/nakshatra-rohini.jpg" },
      { key: "mrigashira", labelEn: "Mrigashira", labelMr: "????????", glyph: "5", image: "./src/images/nakshatra-mrigashira.jpg" },
      { key: "ardra", labelEn: "Ardra", labelMr: "???????", glyph: "6", image: "./src/images/nakshatra-ardra.jpg" },
      { key: "punarvasu", labelEn: "Punarvasu", labelMr: "????????", glyph: "7", image: "./src/images/nakshatra-punarvasu.jpg" },
      { key: "pushya", labelEn: "Pushya", labelMr: "?????", glyph: "8", image: "./src/images/nakshatra-pushya.jpg" },
      { key: "ashlesha", labelEn: "Ashlesha", labelMr: "???????", glyph: "9", image: "./src/images/nakshatra-ashlesha.jpg" },
      { key: "magha", labelEn: "Magha", labelMr: "???", glyph: "10", image: "./src/images/nakshatra-magha.jpg" },
      { key: "purva-phalguni", labelEn: "Purva Phalguni", labelMr: "????? ????????", glyph: "11", image: "./src/images/nakshatra-purva-phalguni.jpg" },
      { key: "uttara-phalguni", labelEn: "Uttara Phalguni", labelMr: "????? ????????", glyph: "12", image: "./src/images/nakshatra-uttara-phalguni.jpg" },
      { key: "hasta", labelEn: "Hasta", labelMr: "????", glyph: "13", image: "./src/images/nakshatra-hasta.jpg" },
      { key: "chitra", labelEn: "Chitra", labelMr: "??????", glyph: "14", image: "./src/images/nakshatra-chitra.jpg" },
      { key: "swati", labelEn: "Swati", labelMr: "??????", glyph: "15", image: "./src/images/nakshatra-swati.jpg" },
      { key: "vishakha", labelEn: "Vishakha", labelMr: "??????", glyph: "16", image: "./src/images/nakshatra-vishakha.jpg" },
      { key: "anuradha", labelEn: "Anuradha", labelMr: "???????", glyph: "17", image: "./src/images/nakshatra-anuradha.jpg" },
      { key: "jyeshtha", labelEn: "Jyeshtha", labelMr: "????????", glyph: "18", image: "./src/images/nakshatra-jyeshtha.jpg" },
      { key: "mula", labelEn: "Mula", labelMr: "???", glyph: "19", image: "./src/images/nakshatra-mula.jpg" },
      { key: "purva-ashadha", labelEn: "Purva Ashadha", labelMr: "??????????", glyph: "20", image: "./src/images/nakshatra-purva-ashadha.jpg" },
      { key: "uttara-ashadha", labelEn: "Uttara Ashadha", labelMr: "??????????", glyph: "21", image: "./src/images/nakshatra-uttara-ashadha.jpg" },
      { key: "shravan", labelEn: "Shravan", labelMr: "?????", glyph: "22", image: "./src/images/nakshatra-shravan.jpg" },
      { key: "dhanishta", labelEn: "Dhanishta", labelMr: "???????", glyph: "23", image: "./src/images/nakshatra-dhanishta.jpg" },
      { key: "shatabhisha", labelEn: "Shatabhisha", labelMr: "??????", glyph: "24", image: "./src/images/nakshatra-shatabhisha.jpg" },
      { key: "purva-bhadrapada", labelEn: "Purva Bhadrapada", labelMr: "?????????????", glyph: "25", image: "./src/images/nakshatra-purva-bhadrapada.jpg" },
      { key: "uttara-bhadrapada", labelEn: "Uttara Bhadrapada", labelMr: "?????????????", glyph: "26", image: "./src/images/nakshatra-uttara-bhadrapada.jpg" },
      { key: "revati", labelEn: "Revati", labelMr: "?????", glyph: "27", image: "./src/images/nakshatra-revati.jpg" },
    ],
    jaimini: [
      { key: "gulika", labelEn: "Gulika", labelMr: "??????", glyph: "Gu" },
      { key: "mandi", labelEn: "Mandi", labelMr: "????", glyph: "Ma" },
    ],
    kp: [],
  };
  const STORAGE_KEYS = {
    client: "ej_astrology_client",
    language: "ej_astrology_language",
  };
  const CHART_CATALOG = [
    { key: "d1", title: "Birth Chart", description: "D1 - Body, Physical Matters and all General Matters", enabled: true },
    { key: "gochar", title: "Gochar Chart", description: "Gochar - Current Transit Chart", enabled: true },
    { key: "chalit", title: "Chalit Chart", description: "Chalit - Bhava Chalit House Placement", enabled: true },
    { key: "moon", title: "Moon Chart", description: "Moon - Mind, Emotions and Mental Disposition", enabled: true },
    { key: "sun", title: "Sun Chart", description: "Sun - Soul, Authority and Vitality", enabled: true },
    { key: "jupiter", title: "Jupiter Chart", description: "Jupiter - Jeev Karak, Wisdom and Life Guidance", enabled: true },
    { key: "d2", title: "Hora Chart", description: "D2 - Wealth, Family", enabled: true },
    { key: "d3", title: "Dreshkan Chart", description: "D3 - Siblings, Nature", enabled: true },
    { key: "d4", title: "Chathurthamasha Chart", description: "D4 - Fortune and Property", enabled: true },
    { key: "d5", title: "Panchmansha Chart", description: "D5 - Fame and Power", enabled: true },
    { key: "d7", title: "Saptamansha Chart", description: "D7 - Children/Progeny", enabled: true },
    { key: "d8", title: "Ashtamansha Chart", description: "D8 - Unexpected Troubles", enabled: true },
    { key: "d9", title: "Navamansha Chart", description: "D9 - Wife, Dharma and Relationships", enabled: true },
    { key: "d10", title: "Dashamansha Chart", description: "D10 - Actions in Society, Profession", enabled: true },
    { key: "d12", title: "Dwadashamsha Chart", description: "D12 - Parents", enabled: true },
    { key: "d16", title: "Shodashamsha Chart", description: "D16 - Vehicles, Travelling and Comforts", enabled: true },
    { key: "d20", title: "Vishamansha Chart", description: "D20 - Spiritual Pursuits", enabled: true },
    { key: "d24", title: "Chaturvimshamsha Chart", description: "D24 - Education, Learning and Knowledge", enabled: true },
    { key: "d27", title: "Bhamsha Chart", description: "D27 - Strengths and Weakness", enabled: true },
    { key: "d30", title: "Trishamansha Chart", description: "D30 - Evils, Failure, Bad Luck", enabled: true },
    { key: "d40", title: "Khavedamsha Chart", description: "D40 - Maternal Legacy", enabled: true },
    { key: "d45", title: "Akshvedansha Chart", description: "D45 - Paternal Legacy", enabled: true },
    { key: "d60", title: "Shashtiamsha Chart", description: "D60 - Past Karma and Complete Life Pattern", enabled: true },
    { key: "jaimini", title: "Jaimini Chart", description: "Get Jaimini Details", enabled: true },
  ];

  const state = {
    route: "dashboard",
    client: readJson(STORAGE_KEYS.client),
    language: localStorage.getItem(STORAGE_KEYS.language) || "en",
    messages: {},
    charts: [],
    loadingCharts: false,
    locationPreference: {
      countries: [],
      states: [],
      cities: [],
      selectedCountryCode: "",
      selectedStateCode: "",
      selectedCityKey: "",
      isLoadingCountries: false,
      isLoadingStates: false,
      isLoadingCities: false,
      isSaving: false,
      message: "",
      error: "",
    },
    panchang: {
      activeTab: "tithi",
      nakshatras: [],
      nakshatraFilters: {},
      isLoadingNakshatras: false,
      error: "",
    },
    matchMaking: {
      activeTab: "varn-vinyas",
      varnVinyasName: "",
      varnVinyasResult: null,
      isLoadingVarnVinyas: false,
      error: "",
    },
    planets: {
      activePlanet: "sun",
      activeSection: "about",
    },
    astroNotes: {
      records: [],
      page: 1,
      pageSize: 5,
      total: null,
      searchResults: [],
      searchPage: 1,
      searchPageSize: 1,
      searchTotal: null,
      searchLoading: false,
      searchError: "",
      isLoading: false,
      isSaving: false,
      error: "",
      message: "",
      mode: "list",
      dialogMode: "add",
      editingId: null,
      activeCategory: "planet",
      selections: [],
      form: {
        summary: "",
        notes: "",
      },
    },
    planetPages: {
      en: {},
      mr: {},
    },
    horoscope: {
      records: [],
      cities: [],
      page: 1,
      pageSize: 10,
      isLoading: false,
      isLoadingCities: false,
      isSaving: false,
      mode: "list",
      editingId: null,
      message: "",
      error: "",
      view: null,
      kundali: null,
      form: defaultHoroscopeForm(),
    },
  };

  const app = document.getElementById("app");

  init();

  async function init() {
    state.messages.en = await loadIni("./src/locales/en.ini");
    state.messages.mr = await loadIni("./src/locales/mr.ini");
    document.documentElement.lang = state.language === "mr" ? "mr" : "en";
    document.addEventListener("click", () => closeChartPickers());
    render();
  }

  function render() {
    if (!state.client) {
      renderLogin();
      return;
    }

    renderAppShell();
  }

  function renderLogin() {
    app.innerHTML = `
      <main class="login-page">
        <section class="login-visual" aria-hidden="true">
          <img class="brand-logo hero-logo" src="${LOGO_PATH}" alt="" />
          <div>
            <p class="eyebrow">${t("app.shortName")}</p>
            <h1>${t("auth.loginTitle")}</h1>
            <p>${t("auth.loginSubtitle")}</p>
          </div>
        </section>
        <section class="login-panel">
          <div class="language-toggle" aria-label="Language">
            <button class="${state.language === "en" ? "active" : ""}" data-language="en" type="button">${t("language.english")}</button>
            <button class="${state.language === "mr" ? "active" : ""}" data-language="mr" type="button">${t("language.marathi")}</button>
          </div>
          <form class="login-form" id="loginForm">
            <div>
              <p class="eyebrow">${t("app.name")}</p>
              <h2>${t("auth.signIn")}</h2>
            </div>
            <label>
              <span>${t("auth.username")}</span>
              <input autocomplete="username" id="username" placeholder="${t("auth.usernamePlaceholder")}" value="admin" />
            </label>
            <label>
              <span>${t("auth.password")}</span>
              <input autocomplete="current-password" id="password" placeholder="${t("auth.passwordPlaceholder")}" type="password" value="admin" />
            </label>
            <div class="form-error hidden" id="loginError"></div>
            <button class="primary-button" id="loginButton" type="submit">${t("auth.signIn")}</button>
          </form>
        </section>
      </main>
    `;

    app.querySelectorAll("[data-language]").forEach((button) => {
      button.addEventListener("click", () => setLanguage(button.dataset.language));
    });
    app.querySelector("#loginForm").addEventListener("submit", handleLogin);
  }

  async function handleLogin(event) {
    event.preventDefault();
    const username = app.querySelector("#username").value.trim();
    const password = app.querySelector("#password").value;
    const error = app.querySelector("#loginError");
    const button = app.querySelector("#loginButton");

    error.classList.add("hidden");

    if (!username || !password) {
      showError(error, t("auth.required"));
      return;
    }

    button.disabled = true;
    button.textContent = t("auth.signingIn");

    try {
      const client = await postJson("/client/login", { username, password });
      state.client = client;
      localStorage.setItem(STORAGE_KEYS.client, JSON.stringify(client));
      state.route = "dashboard";
      render();
      loadDashboardData();
    } catch (errorResponse) {
      showError(error, errorResponse && errorResponse.isNetworkError ? t("auth.corsError") : t("auth.invalidCredentials"));
      button.disabled = false;
      button.textContent = t("auth.signIn");
    }
  }

  function renderAppShell() {
    const routes = [
      ["dashboard", "nav.dashboard", "H"],
      ["planets", "nav.planets", "P"],
      ["horoscope", "nav.horoscope", "S"],
      ["match-making", "nav.matchMaking", "M"],
      ["panchang", "nav.panchang", "P"],
      ["reports", "nav.reports", "R"],
      ["settings", "nav.settings", "G"],
    ];

    app.innerHTML = `
      <div class="app-shell">
        <header class="app-header">
          <div class="app-brand">
            <img class="brand-logo small" src="${LOGO_PATH}" alt="${t("app.name")}" />
            <div>
              <strong>${t("app.shortName")}</strong>
              <small>${escapeHtml(state.client.client_name || state.client.client_email)}</small>
            </div>
          </div>
          <nav class="main-nav">
            ${routes
              .map(
                ([route, key, icon]) => `
                  <a href="#${route}" class="${state.route === route ? "active" : ""}" data-route="${route}">
                    <span>${icon}</span>${t(key)}
                  </a>
                `,
              )
              .join("")}
          </nav>
          <div class="header-actions">
            <div>
              <strong>${escapeHtml(state.client.client_name || t("dashboard.welcome"))}</strong>
              <span>${escapeHtml(state.client.client_email)}</span>
            </div>
            <div class="topbar-actions">
              <label class="language-select">
                <span>${t("common.language")}</span>
                <select id="languageSelect" aria-label="Language">
                  <option value="en" ${state.language === "en" ? "selected" : ""}>${t("language.english")}</option>
                  <option value="mr" ${state.language === "mr" ? "selected" : ""}>${t("language.marathi")}</option>
                </select>
              </label>
              <button class="ghost-button" id="logoutButton" type="button">${t("auth.logout")}</button>
            </div>
          </div>
        </header>
        <div class="main-column">
          ${state.route === "dashboard" ? dashboardHtml() : state.route === "save-location" ? saveLocationHtml() : state.route === "horoscope" ? horoscopeHtml() : state.route === "match-making" ? matchMakingHtml() : state.route === "panchang" ? panchangHtml() : featureHtml()}
        </div>
      </div>
    `;

    app.querySelectorAll("[data-route]").forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        state.route = link.dataset.route;
        render();
        if (state.route === "dashboard" && state.charts.length === 0) {
          loadDashboardData();
        }
        if (state.route === "save-location" && state.locationPreference.countries.length === 0) {
          loadCountries();
        }
        if (state.route === "horoscope" && state.horoscope.records.length === 0) {
          loadHoroscopePage();
        }
        if (state.route === "panchang" && state.panchang.activeTab === "nakshatra" && state.panchang.nakshatras.length === 0) {
          loadNakshatras();
        }
        if (state.route === "planets" && state.astroNotes.records.length === 0) {
          if (!Number.isFinite(state.astroNotes.pageSize) || state.astroNotes.pageSize <= 0) {
            state.astroNotes.pageSize = 5;
          }
          loadAstroNotesPage();
        }
      });
    });
    app.querySelector("#languageSelect").addEventListener("change", (event) => setLanguage(event.target.value));
    app.querySelector("#logoutButton").addEventListener("click", logout);
    attachSaveLocationHandlers();
    attachHoroscopeHandlers();
    attachMatchMakingHandlers();
    attachPanchangHandlers();
    attachPlanetHandlers();
    attachAstroNotesHandlers();
  }

  function dashboardHtml() {
    const today = new Date().toISOString().slice(0, 10);
    const todaysCharts = state.charts.filter((chart) => String(chart.created_on || chart.created_at || "").startsWith(today)).length;
    const stats = [
      [t("dashboard.totalCharts"), state.loadingCharts ? "..." : state.charts.length, t("stats.fromApi")],
      [t("dashboard.todayCharts"), state.loadingCharts ? "..." : todaysCharts, t("stats.fromApi")],
      [t("dashboard.totalClients"), "1", t("stats.estimated")],
      [t("dashboard.pendingReports"), "0", t("stats.estimated")],
    ];
    const actions = [
      ["save-location", t("dashboard.saveLocation"), "L"],
      ["planets", t("feature.astroNotes"), "AN"],
      ["horoscope", t("feature.horoscope"), "S"],
      ["match-making", t("feature.matchMaking"), "M"],
      ["panchang", t("feature.panchang"), "P"],
      ["reports", t("feature.reports"), "R"],
    ];
    const recent = state.charts.slice(0, 5);

    return `
      <main class="page-content">
        <section class="stats-grid" aria-label="${t("dashboard.title")}">
          ${stats
            .map(
              ([label, value, note]) => `
                <article class="stat-card">
                  <span>${label}</span>
                  <strong>${value}</strong>
                  <small>${note}</small>
                </article>
              `,
            )
            .join("")}
        </section>
        <section class="dashboard-grid">
          <div class="panel">
            <div class="panel-header"><h2>${t("dashboard.quickActions")}</h2></div>
            <div class="action-grid">
              ${actions
                .map(
                  ([route, title, icon]) => `
                    <a class="action-tile" href="#${route}" data-route="${route}">
                      <span>${icon}</span><strong>${title}</strong>
                    </a>
                  `,
                )
                .join("")}
            </div>
          </div>
          <div class="panel">
            <div class="panel-header">
              <h2>${t("dashboard.recentCharts")}</h2>
            </div>
            <div class="recent-list">
              ${
                recent.length
                  ? recent
                      .map(
                        (chart, index) => `
                          <div class="recent-item">
                            <span>${escapeHtml(chart.jatak_full_name || chart.name || chart.full_name || "Chart " + (index + 1))}</span>
                            <small>${escapeHtml(chart.created_on || chart.birth_place || chart.created_at || "-")}</small>
                          </div>
                        `,
                      )
                      .join("")
                  : `<div class="empty-state">${state.loadingCharts ? t("common.loading") : t("dashboard.noRecentCharts")}</div>`
              }
            </div>
          </div>
        </section>
      </main>
    `;
  }

  function featureHtml() {
    const routeMap = {
      planets: "nav.planets",
      horoscope: "nav.horoscope",
      "match-making": "nav.matchMaking",
      panchang: "nav.panchang",
      reports: "nav.reports",
      settings: "nav.settings",
    };

    return `
      <main class="page-content">
        <section class="feature-panel ${state.route === "planets" ? "planet-page-hero" : ""}">
          <p class="eyebrow">${t("app.shortName")}</p>
          <h1>${state.route === "planets" ? t("feature.astroNotes") : t(routeMap[state.route] || "dashboard.title")}</h1>
        <div class="planet-hero-row">
          <p>${state.route === "planets" ? t("feature.astroNotesSoon") : t("page.placeholder")}</p>
          ${state.route === "planets" ? `<button class="primary-button compact-action astro-notes-hero-button" id="searchAstroNoteButton" type="button">Search Notes</button>` : ""}
          ${state.route === "planets" ? `<button class="primary-button compact-action astro-notes-hero-button" id="addAstroNoteButton" type="button">${t("astroNotes.add")}</button>` : ""}
        </div>
        </section>
        ${state.route === "planets" ? planetsPageHtml() : ""}
      </main>
    `;
  }

  function planetsPageHtml() {
    return `
      <section class="panel planet-browser-panel">
        ${astroNotesHtml()}
      </section>
    `;
  }

  function astroNotesHtml() {
    const notes = state.astroNotes;
    const pageSize = Number(notes.pageSize) > 0 ? Number(notes.pageSize) : 5;
    const canGoPrev = notes.page > 1;
    const totalPages = astroNotesTotalPages();
    const canGoNext = notes.page < totalPages;
    return `
      <section class="panel astro-notes-panel">
        <div class="astro-notes-toolbar">
          <div class="astro-notes-controls">
            <label class="astro-notes-page-size">
              <span>${t("horoscope.rowsPerPage")}</span>
              <select id="astroNotesPageSize">
                ${[5, 10, 25, 50].map((size) => `<option value="${size}" ${pageSize === size ? "selected" : ""}>${size}</option>`).join("")}
              </select>
            </label>
            <div class="astro-notes-pagination">
              <button class="icon-button astro-page-button" id="firstAstroNotesPage" type="button" ${!canGoPrev || notes.isLoading ? "disabled" : ""} title="First page" aria-label="First page">${ICONS.first ? `<img src="${ICONS.first}" alt="" />` : "<<"}</button>
              <button class="icon-button astro-page-button" id="prevAstroNotesPage" type="button" ${!canGoPrev || notes.isLoading ? "disabled" : ""} title="${t("horoscope.previous")}" aria-label="${t("horoscope.previous")}">${ICONS.previous ? `<img src="${ICONS.previous}" alt="" />` : "<"}</button>
              <button class="icon-button astro-page-button" id="nextAstroNotesPage" type="button" ${!canGoNext || notes.isLoading ? "disabled" : ""} title="${t("horoscope.next")}" aria-label="${t("horoscope.next")}">${ICONS.next ? `<img src="${ICONS.next}" alt="" />` : ">"}</button>
              <button class="icon-button astro-page-button" id="lastAstroNotesPage" type="button" ${!canGoNext || notes.isLoading ? "disabled" : ""} title="Last page" aria-label="Last page">${ICONS.last ? `<img src="${ICONS.last}" alt="" />` : ">>"}</button>
            </div>
          </div>
        </div>
        ${notes.error ? `<div class="form-error">${escapeHtml(notes.error)}</div>` : ""}
        ${notes.message ? `<div class="form-success">${escapeHtml(notes.message)}</div>` : ""}
        <div class="table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>${t("astroNotes.summary")}</th>
                <th>${t("astroNotes.notes")}</th>
                <th>${t("horoscope.actions")}</th>
              </tr>
            </thead>
            <tbody>
              ${
                notes.isLoading
                  ? `<tr><td colspan="4">${t("common.loading")}</td></tr>`
                  : notes.records.length
                    ? notes.records.map((record, index) => astroNoteRowHtml(record, index, notes)).join("")
                    : `<tr><td colspan="4">${t("horoscope.noRecords")}</td></tr>`
              }
            </tbody>
          </table>
        </div>
        <div class="astro-notes-table-footer">
          <span class="astro-notes-page-indicator">Page ${notes.page} / ${totalPages}</span>
          <span class="astro-notes-page-indicator">Total Records: ${notes.total ?? 0}</span>
        </div>
        ${notes.mode === "form" ? astroNoteModalHtml() : ""}
      </section>
    `;
  }

  function astroNoteRowHtml(record, index, notesState = state.astroNotes) {
    const noteId = astroNoteId(record);
    const summary = truncateCellText(record.summary || record.title || "-");
    const noteText = truncateCellText(record.notes || "-");
    const rowNumber = (notesState.page - 1) * notesState.pageSize + index + 1;
    return `
      <tr>
        <td>${rowNumber}</td>
        <td title="${escapeHtml(summary.full)}">${escapeHtml(summary.display)}</td>
        <td title="${escapeHtml(noteText.full)}">${escapeHtml(noteText.display)}</td>
        <td>
          <div class="row-actions">
            <button class="icon-button" data-edit-astro-note="${escapeHtml(noteId)}" type="button" title="${t("horoscope.updateAction")}" aria-label="${t("horoscope.updateAction")}">${ICONS.edit ? `<img src="${ICONS.edit}" alt="" />` : "Edit"}</button>
            <button class="icon-button danger-icon-button" data-delete-astro-note="${escapeHtml(noteId)}" type="button" title="${t("horoscope.deleteAction")}" aria-label="${t("horoscope.deleteAction")}">${ICONS.delete ? `<img src="${ICONS.delete}" alt="" />` : "Delete"}</button>
          </div>
        </td>
      </tr>
    `;
  }

  function astroNoteModalHtml() {
    const form = state.astroNotes.form;
    const activeCategory = state.astroNotes.activeCategory || "planet";
    const selectedItems = state.astroNotes.selections || [];
    const isSearchMode = state.astroNotes.dialogMode === "search";
    const searchRecord = state.astroNotes.searchResults?.[0] || null;
    const searchCanGoPrev = state.astroNotes.searchPage > 1;
    const searchCanGoNext = state.astroNotes.searchTotal != null ? state.astroNotes.searchPage < state.astroNotes.searchTotal : !state.astroNotes.searchError;
    const searchTotalPages = state.astroNotes.searchTotal != null ? Math.max(1, Math.ceil(state.astroNotes.searchTotal / state.astroNotes.searchPageSize)) : Math.max(1, state.astroNotes.searchPage);
    const searchTextareaValue = state.astroNotes.searchError
      ? state.astroNotes.searchError
      : searchRecord?.notes
        ? searchRecord.notes
        : "No notes found for the selected context.";
    return `
      <div class="kundali-modal-backdrop" id="astroNoteModalBackdrop">
        <section class="kundali-tool-modal astro-note-modal" role="dialog" aria-modal="true" aria-label="${t("astroNotes.title")}">
          <div class="kundali-slider-header astro-note-modal-header">
            <div>
              <strong>${state.astroNotes.editingId ? t("astroNotes.edit") : t("astroNotes.add")}</strong>
              <span>${t("astroNotes.subtitle")}</span>
            </div>
            <button class="icon-button" id="closeAstroNoteModalButton" type="button" aria-label="Close">X</button>
          </div>
          <div class="astro-note-modal-split">
            <aside class="astro-note-picker">
              <div class="astro-note-category-list" role="tablist" aria-label="Astro note categories">
                ${ASTRO_NOTE_CATEGORIES.map(
                  (category) => `
                    <button class="astro-note-category ${activeCategory === category.key ? "active" : ""}" data-astro-note-category="${category.key}" type="button">
                      ${astroNoteCategoryVisualHtml(category)}
                      <span>${escapeHtml(astroNoteDisplayLabel(category))}</span>
                    </button>
                  `,
                ).join("")}
              </div>
              <div class="astro-note-icon-grid" aria-label="Astro note icons">
                ${astroNoteIconGridHtml(activeCategory)}
              </div>
            </aside>
            <section class="astro-note-editor">
              ${
                isSearchMode
                  ? `
                    <div class="astro-note-selection-panel">
                      <span class="astro-note-selection-label">Selected context</span>
                      <div class="astro-note-selection-list">
                        ${
                          selectedItems.length
                            ? selectedItems.map((item) => astroNoteSelectionChipHtml(item)).join("")
                            : `<span class="astro-note-selection-empty">Select one or more icons from the left</span>`
                        }
                      </div>
                    </div>
                    <div class="astro-note-form astro-note-search-form">
                      <div class="astro-note-search-box">
                        <div class="astro-note-search-header-row">
                          <span>${t("astroNotes.notes")}</span>
                          <div class="astro-note-search-nav astro-note-search-nav-top">
                            <button class="icon-button astro-page-button" id="searchAstroNotesPrev" type="button" ${!searchCanGoPrev || state.astroNotes.searchLoading ? "disabled" : ""} title="${t("horoscope.previous")}" aria-label="${t("horoscope.previous")}">${ICONS.previous ? `<img src="${ICONS.previous}" alt="" />` : "<"}</button>
                            <button class="icon-button astro-page-button" id="searchAstroNotesNext" type="button" ${!searchCanGoNext || state.astroNotes.searchLoading ? "disabled" : ""} title="${t("horoscope.next")}" aria-label="${t("horoscope.next")}">${ICONS.next ? `<img src="${ICONS.next}" alt="" />` : ">"}</button>
                          </div>
                        </div>
                        <textarea id="astroNoteSearchNotes" rows="12" readonly>${escapeHtml(searchTextareaValue)}</textarea>
                      </div>
                    </div>
                    <div class="astro-notes-table-footer astro-note-search-footer">
                      <span class="astro-notes-page-indicator">Page ${state.astroNotes.searchPage} / ${searchTotalPages}</span>
                      <span class="astro-notes-page-indicator">Total Records: ${state.astroNotes.searchTotal ?? state.astroNotes.searchResults.length ?? 0}</span>
                    </div>
                  `
                  : `
                    <div class="astro-note-selection-panel">
                      <span class="astro-note-selection-label">Selected context</span>
                      <div class="astro-note-selection-list">
                        ${
                          selectedItems.length
                            ? selectedItems.map((item) => astroNoteSelectionChipHtml(item)).join("")
                            : `<span class="astro-note-selection-empty">Select one or more icons from the left</span>`
                        }
                      </div>
                    </div>
                    <div class="astro-note-form">
                      <label>
                        <span>${t("astroNotes.notes")}</span>
                        <textarea id="astroNoteNotes" rows="8">${escapeHtml(form.notes)}</textarea>
                      </label>
                      <div class="form-actions">
                        <button class="primary-button" id="saveAstroNoteButton" type="button" ${state.astroNotes.isSaving ? "disabled" : ""}>${state.astroNotes.isSaving ? t("location.saving") : t("common.submit")}</button>
                      </div>
                    </div>
                  `
              }
            </section>
          </div>
        </section>
      </div>
    `;
  }

  function astroNoteIconGridHtml(categoryKey) {
    const items = ASTRO_NOTE_ICON_MAP[categoryKey] || [];
    if (!items.length) {
      return `<div class="astro-note-empty-state">${escapeHtml(astroNoteDisplayLabel(ASTRO_NOTE_CATEGORIES.find((category) => category.key === categoryKey)) || "No items")}</div>`;
    }
    return items
      .map((item) => {
        const selected = isAstroNoteSelectionSelected(categoryKey, item.key);
        return `
          <button class="astro-note-icon-tile ${selected ? "selected" : ""}" data-astro-note-item="${categoryKey}:${item.key}" type="button">
            ${astroNoteIconVisualHtml(item, categoryKey)}
            <strong>${escapeHtml(astroNoteDisplayLabel(item))}</strong>
          </button>
        `;
      })
      .join("");
  }

  function astroNoteSelectionChipHtml(item) {
    return `
      <button class="astro-note-selection-chip" data-remove-astro-note-item="${escapeHtml(item.categoryKey)}:${escapeHtml(item.key)}" type="button">
        ${astroNoteIconVisualHtml(item, item.categoryKey)}
        <strong>${escapeHtml(astroNoteDisplayLabel(item))}</strong>
        <span class="astro-note-selection-remove">x</span>
      </button>
    `;
  }

  function astroNoteIconVisualHtml(item, categoryKey) {
    if (item.image) {
      return `<span class="astro-note-icon-badge image-badge"><img src="${escapeHtml(item.image)}" alt="" /></span>`;
    }
    return `<span class="astro-note-icon-badge">${escapeHtml(item.glyph || iconBadgeText(categoryKey, item.label))}</span>`;
  }

  function astroNoteCategoryVisualHtml(category) {
    if (category.image) {
      return `<span class="astro-note-category-icon image-badge"><img src="${escapeHtml(category.image)}" alt="" /></span>`;
    }
    return `<span class="astro-note-category-icon">${escapeHtml(category.glyph || category.label.slice(0, 1).toUpperCase())}</span>`;
  }

  function iconBadgeText(categoryKey, label) {
    if (categoryKey === "house") return label.replace("H", "");
    return label.slice(0, 2).toUpperCase();
  }

  function astroNoteDisplayLabel(item) {
    if (!item) return "";
    return state.language === "mr" ? item.labelMr || item.labelEn || "" : item.labelEn || item.labelMr || "";
  }

  function isAstroNoteSelectionSelected(categoryKey, key) {
    return (state.astroNotes.selections || []).some((item) => item.categoryKey === categoryKey && item.key === key);
  }

  function attachPlanetHandlers() {
    if (state.route !== "planets") {
      return;
    }
  }

  function attachAstroNotesHandlers() {
    if (state.route !== "planets") {
      return;
    }

    const addButton = app.querySelector("#addAstroNoteButton");
    const pageSizeSelect = app.querySelector("#astroNotesPageSize");
    const firstButton = app.querySelector("#firstAstroNotesPage");
    const prevButton = app.querySelector("#prevAstroNotesPage");
    const nextButton = app.querySelector("#nextAstroNotesPage");
    const lastButton = app.querySelector("#lastAstroNotesPage");
    const closeButton = app.querySelector("#closeAstroNoteModalButton");
    const backButton = app.querySelector(".astro-note-form .ghost-button");
    const saveButton = app.querySelector("#saveAstroNoteButton");
    const notesInput = app.querySelector("#astroNoteNotes");
    const searchPrevButton = app.querySelector("#searchAstroNotesPrev");
    const searchNextButton = app.querySelector("#searchAstroNotesNext");
    const modal = app.querySelector(".astro-note-modal");
    const modalBackdrop = app.querySelector("#astroNoteModalBackdrop");

    if (addButton) {
      addButton.addEventListener("click", openAstroNoteCreate);
    }
    const searchButton = app.querySelector("#searchAstroNoteButton");
    if (searchButton) {
      searchButton.addEventListener("click", openAstroNoteSearch);
    }
    app.querySelectorAll("[data-astro-note-category]").forEach((button) => {
      button.addEventListener("click", () => {
        state.astroNotes.activeCategory = button.dataset.astroNoteCategory || "planet";
        render();
      });
    });
    app.querySelectorAll("[data-astro-note-item]").forEach((button) => {
      button.addEventListener("click", () => toggleAstroNoteSelection(button.dataset.astroNoteItem));
    });
    app.querySelectorAll("[data-remove-astro-note-item]").forEach((button) => {
      button.addEventListener("click", () => toggleAstroNoteSelection(button.dataset.removeAstroNoteItem));
    });
    if (searchPrevButton) {
      searchPrevButton.addEventListener("click", () => changeAstroNoteSearchPage(-1));
    }
    if (searchNextButton) {
      searchNextButton.addEventListener("click", () => changeAstroNoteSearchPage(1));
    }
    if (pageSizeSelect) {
      pageSizeSelect.addEventListener("change", () => {
        state.astroNotes.pageSize = Number(pageSizeSelect.value) || 5;
        state.astroNotes.page = 1;
        loadAstroNotesPage();
      });
    }
    if (firstButton) {
      firstButton.addEventListener("click", () => {
        if (state.astroNotes.page > 1) {
          state.astroNotes.page = 1;
          loadAstroNotesPage();
        }
      });
    }
    if (prevButton) {
      prevButton.addEventListener("click", () => {
        if (state.astroNotes.page > 1) {
          state.astroNotes.page -= 1;
          loadAstroNotesPage();
        }
      });
    }
    if (nextButton) {
      nextButton.addEventListener("click", () => {
        const lastPage = astroNotesTotalPages();
        if (state.astroNotes.page < lastPage) {
          state.astroNotes.page += 1;
          loadAstroNotesPage();
        }
      });
    }
    if (lastButton) {
      lastButton.addEventListener("click", () => {
        const lastPage = astroNotesTotalPages();
        if (state.astroNotes.page !== lastPage) {
          state.astroNotes.page = lastPage;
          loadAstroNotesPage();
        }
      });
    }
    if (closeButton) {
      closeButton.addEventListener("click", closeAstroNoteModal);
    }
    if (backButton) {
      backButton.addEventListener("click", (event) => event.preventDefault());
    }
    if (modalBackdrop) {
      modalBackdrop.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
      });
      modalBackdrop.addEventListener("mousedown", (event) => {
        event.preventDefault();
        event.stopPropagation();
      });
    }
    if (modal) {
      modal.addEventListener("click", (event) => event.stopPropagation());
      modal.addEventListener("mousedown", (event) => event.stopPropagation());
    }
    if (saveButton) {
      saveButton.addEventListener("click", saveAstroNote);
    }
    if (notesInput) {
      notesInput.addEventListener("input", () => {
        state.astroNotes.form.notes = notesInput.value;
      });
    }

    app.querySelectorAll("[data-edit-astro-note]").forEach((button) => {
      button.addEventListener("click", () => loadAstroNoteForEdit(button.dataset.editAstroNote));
    });
    app.querySelectorAll("[data-delete-astro-note]").forEach((button) => {
      button.addEventListener("click", () => deleteAstroNote(button.dataset.deleteAstroNote));
    });
  }

  function panchangHtml() {
    const panchang = state.panchang;
    return `
      <main class="page-content panchang-page-content">
        <section class="feature-panel panchang-header-panel">
          <h1>${t("nav.panchang")}</h1>
        </section>
        <section class="panel panchang-panel">
          <div class="panchang-tabs" role="tablist" aria-label="${t("nav.panchang")}">
            ${panchangTabsHtml()}
          </div>
          <div class="panchang-tab-content">
            ${panchang.error ? `<div class="form-error">${escapeHtml(panchang.error)}</div>` : ""}
            ${panchang.activeTab === "nakshatra" ? nakshatraReferenceHtml() : panchangPlaceholderHtml(panchang.activeTab)}
          </div>
        </section>
      </main>
    `;
  }

  function matchMakingHtml() {
    return `
      <main class="page-content match-making-page-content">
        <section class="feature-panel match-making-header-panel">
          <h1>${t("nav.matchMaking")}</h1>
        </section>
        <section class="panel match-making-panel">
          <div class="panchang-tabs match-making-tabs" role="tablist" aria-label="${t("nav.matchMaking")}">
            <button class="panchang-tab active" data-match-making-tab="varn-vinyas" role="tab" aria-selected="true" type="button">Varn Vinyas</button>
          </div>
          <div class="match-making-tab-content">
            ${state.matchMaking.activeTab === "varn-vinyas" ? varnVinyasHtml() : ""}
          </div>
        </section>
      </main>
    `;
  }

  function varnVinyasHtml() {
    const matchMaking = state.matchMaking;
    const result = matchMaking.varnVinyasResult;
    return `
      <div class="varn-vinyas-panel">
        <form class="varn-vinyas-form" id="varnVinyasForm">
          <label>
            <span>${escapeHtml(varnVinyasLabel("Name"))}</span>
            <input id="varnVinyasName" autocomplete="name" placeholder="${escapeHtml(varnVinyasLabel("Enter name"))}" value="${escapeHtml(matchMaking.varnVinyasName)}" />
          </label>
          <button class="primary-button" type="submit" ${matchMaking.isLoadingVarnVinyas ? "disabled" : ""}>
            ${matchMaking.isLoadingVarnVinyas ? t("common.loading") : varnVinyasLabel("Submit")}
          </button>
        </form>
        ${matchMaking.error ? `<div class="form-error">${escapeHtml(matchMaking.error)}</div>` : ""}
        ${result ? varnVinyasResultHtml(result) : `<div class="empty-state varn-vinyas-empty">${escapeHtml(varnVinyasLabel("Submit a name to view the Varn Vinyas table."))}</div>`}
      </div>
    `;
  }

  function varnVinyasResultHtml(result) {
    const person = result.person || {};
    const varnVinyasTable = Array.isArray(result.varn_vinyas_table) ? result.varn_vinyas_table : [];
    const bestMatches = Array.isArray(result.best_matches) ? result.best_matches : Array.isArray(result.bestMatches) ? result.bestMatches : [];
    const allVargas = Array.isArray(result.compatibility_with_all_vargas)
      ? result.compatibility_with_all_vargas
      : Array.isArray(result.compatibilityWithAllVarnas)
        ? result.compatibilityWithAllVarnas
        : [];
    return `
      <div class="varn-vinyas-results">
        <section class="varn-vinyas-card">
          <div class="panel-header"><h2>${escapeHtml(varnVinyasLabel("Person Details"))}</h2></div>
          <div class="detail-matrix varn-vinyas-person-grid">
            ${detailItemHtml("Name", person.name)}
            ${detailItemHtml("First Letter", varnVinyasLetters([person.first_letter ?? person.firstLetter]))}
            ${detailItemHtml("Script", varnVinyasValue(person.script))}
            ${detailItemHtml("Group No", person.group_no ?? person.groupNo)}
            ${detailItemHtml("Group Name", varnVinyasGroupName(person.group_name ?? person.groupName, person.group_no ?? person.groupNo))}
            ${detailItemHtml("Animal", varnVinyasValue(person.animal))}
            ${detailItemHtml("Direction", varnVinyasValue(person.direction))}
            ${detailItemHtml("Enemy Group", person.enemy_group_no ?? person.enemyGroup)}
          </div>
        </section>
        <section class="varn-vinyas-card">
          <div class="panel-header"><h2>${escapeHtml(varnVinyasLabel("Varn Vinyas Groups"))}</h2></div>
          ${varnVinyasMasterTableHtml(varnVinyasTable)}
        </section>
        <section class="varn-vinyas-card">
          <div class="panel-header"><h2>${escapeHtml(varnVinyasLabel("Best Matches"))}</h2></div>
          ${varnVinyasCompatibilityTableHtml(bestMatches, true)}
        </section>
        <section class="varn-vinyas-card">
          <div class="panel-header"><h2>${escapeHtml(varnVinyasLabel("Compatibility With All Varnas"))}</h2></div>
          ${varnVinyasCompatibilityTableHtml(allVargas, false)}
        </section>
        ${varnVinyasNoteHtml()}
      </div>
    `;
  }

  function detailItemHtml(label, value) {
    return `
      <div>
        <span>${escapeHtml(varnVinyasLabel(label))}</span>
        <strong>${escapeHtml(displayValue(value))}</strong>
      </div>
    `;
  }

  function varnVinyasMasterTableHtml(rows) {
    if (!rows.length) {
      return `<div class="empty-state">${escapeHtml(varnVinyasLabel("No Varn Vinyas group records found."))}</div>`;
    }
    return `
      <div class="table-wrap">
        <table class="data-table varn-vinyas-master-table">
          <thead>
            <tr>
              <th>${escapeHtml(varnVinyasLabel("Group"))}</th>
              <th>${escapeHtml(varnVinyasLabel("Varn"))}</th>
              <th>${escapeHtml(varnVinyasLabel("Animal"))}</th>
              <th>${escapeHtml(varnVinyasLabel("Direction"))}</th>
              <th>${escapeHtml(varnVinyasLabel("Letters"))}</th>
              <th>${escapeHtml(varnVinyasLabel("Enemy Group"))}</th>
            </tr>
          </thead>
          <tbody>
            ${rows.map(varnVinyasMasterRowHtml).join("")}
          </tbody>
        </table>
      </div>
    `;
  }

  function varnVinyasMasterRowHtml(row) {
    const romanLetters = Array.isArray(row.letters_roman) ? row.letters_roman : [];
    const devnagariLetters = Array.isArray(row.letters_devanagari) ? row.letters_devanagari : [];
    const personGroupNo = state.matchMaking.varnVinyasResult?.person?.group_no ?? state.matchMaking.varnVinyasResult?.person?.groupNo;
    const rowGroupNo = row.group_no ?? row.varnaGroupNo;
    const rowEnemyGroupNo = row.enemy_group_no ?? row.enemyGroup;
    const isEnemyRow = Number(rowGroupNo) === Number(state.matchMaking.varnVinyasResult?.person?.enemy_group_no ?? state.matchMaking.varnVinyasResult?.person?.enemyGroup) || Number(rowEnemyGroupNo) === Number(personGroupNo);
    return `
      <tr class="${isEnemyRow ? "enemy-varn-row" : ""}">
        <td>${escapeHtml(displayValue(rowGroupNo))}</td>
        <td><strong>${escapeHtml(displayValue(varnVinyasGroupName(row.group_name ?? row.varnaName, rowGroupNo)))}</strong></td>
        <td>${escapeHtml(displayValue(varnVinyasValue(row.animal)))}</td>
        <td>${escapeHtml(displayValue(varnVinyasValue(row.direction)))}</td>
        <td>${escapeHtml(displayValue(varnVinyasLetters(romanLetters, devnagariLetters)))}</td>
        <td>${escapeHtml(displayValue(rowEnemyGroupNo))}</td>
      </tr>
    `;
  }

  function varnVinyasCompatibilityTableHtml(rows, compact) {
    if (!rows.length) {
      return `<div class="empty-state">${escapeHtml(varnVinyasLabel("No Varn Vinyas records found."))}</div>`;
    }
    return `
      <div class="table-wrap">
        <table class="data-table varn-vinyas-table ${compact ? "compact-data-table" : ""}">
          <thead>
            <tr>
              <th>${escapeHtml(varnVinyasLabel("Group"))}</th>
              <th>${escapeHtml(varnVinyasLabel("Varn"))}</th>
              <th>${escapeHtml(varnVinyasLabel("Animal"))}</th>
              <th>${escapeHtml(varnVinyasLabel("Direction"))}</th>
              <th>${escapeHtml(varnVinyasLabel("Enemy Check"))}</th>
              <th>${escapeHtml(varnVinyasLabel("Person Score"))}</th>
              <th>${escapeHtml(varnVinyasLabel("Other Score"))}</th>
              <th>${escapeHtml(varnVinyasLabel("Difference"))}</th>
              <th>${escapeHtml(varnVinyasLabel("Outcome"))}</th>
              <th>${escapeHtml(varnVinyasLabel("Category"))}</th>
              <th>${escapeHtml(varnVinyasLabel("Favorable"))}</th>
              <th>${escapeHtml(varnVinyasLabel("Reason"))}</th>
            </tr>
          </thead>
          <tbody>
            ${rows.map(varnVinyasCompatibilityRowHtml).join("")}
          </tbody>
        </table>
      </div>
    `;
  }

  function varnVinyasCompatibilityRowHtml(row) {
    const enemyCheck = row.enemy_check || row.enemyCheck || {};
    const kankini = row.kankini || {};
    const outcome = row.outcome || row.compatibility || {};
    const interpretation = outcome.interpretation || {};
    const facts = outcome.facts || {};
    const isFavorable = interpretation.favorable ?? outcome.compatible ?? null;
    const isEnemy = enemyCheck.is_enemy ?? enemyCheck.isEnemy ?? false;
    const groupNo = row.partner_group_no ?? row.varnaGroupNo;
    const groupName = varnVinyasGroupName(row.partner_group_name ?? row.varnaName, groupNo);
    const jatakValue = kankini.jatak_value ?? facts.jatak_kankini ?? kankini.personScore;
    const partnerValue = kankini.partner_value ?? facts.partner_kankini ?? kankini.otherVarnaScore;
    const signedDifference = kankini.difference ?? facts.difference;
    const hasSignedDifference = signedDifference !== null && signedDifference !== undefined && signedDifference !== "" && !Number.isNaN(Number(signedDifference));
    const isNegativeDifference = hasSignedDifference && signedDifference < 0;
    return `
      <tr>
        <td>${escapeHtml(displayValue(groupNo))}</td>
        <td><strong>${escapeHtml(displayValue(groupName))}</strong></td>
        <td>${escapeHtml(displayValue(varnVinyasValue(row.animal)))}</td>
        <td>${escapeHtml(displayValue(varnVinyasValue(row.direction)))}</td>
        <td><span class="${isEnemy ? "enemy-check-text" : ""}">${escapeHtml(varnVinyasValue(enemyCheck.message || (isEnemy ? "Enemy Varn combination." : "Not an enemy Varn combination.")))}</span></td>
        <td>${escapeHtml(displayValue(jatakValue))}</td>
        <td>${escapeHtml(displayValue(partnerValue))}</td>
        <td>${escapeHtml(displayValue(hasSignedDifference ? signedDifference : kankini.difference))}</td>
        <td><span class="grade-pill ${isNegativeDifference ? "negative-outcome" : isFavorable ? "compatible" : "not-compatible"}">${escapeHtml(varnVinyasValue(cleanVarnVinyasText(displayValue(outcome.result ?? outcome.grade ?? outcome.higher_kankini))))}</span></td>
        <td>${escapeHtml(varnVinyasValue(displayValue(interpretation.category ?? outcome.category)))}</td>
        <td>${escapeHtml(yesNo(isFavorable) || displayValue(isFavorable))}</td>
        <td>${escapeHtml(varnVinyasOutcomeMessage(row, outcome, groupName))}</td>
      </tr>
    `;
  }

  function varnVinyasNoteHtml() {
    return `
      <section class="varn-vinyas-card varn-vinyas-note">
        <strong>* Note</strong>
        <p>\u0905\u092a\u0928\u0947 \u0935\u0930\u094d\u0917 \u0938\u0947 \u092a\u093e\u0902\u091a\u0935\u093e\u0902 \u0935\u0930\u094d\u0917 \u0936\u0924\u094d\u0930\u0941 \u0915\u093e \u0939\u094b\u0924\u093e \u0939\u0948\u0964 \u0905\u0924\u0903</p>
        <ol>
          <li>\u0924\u094b \u0935\u094d\u092f\u0915\u094d\u0924\u093f \u0915\u094b \u0909\u0938 \u0926\u093f\u0936\u093e \u092e\u0947\u0902 \u0918\u0930 \u0926\u094d\u0935\u093e\u0930 \u0928\u0939\u0940\u0902 \u092c\u0928\u093e\u0928\u093e \u091a\u093e\u0939\u093f\u090f\u0964</li>
          <li>\u0909\u0938 \u0935\u0930\u094d\u0923 \u0915\u0947 \u0935\u094d\u092f\u0915\u094d\u0924\u093f \u0938\u0947 \u0909\u0938\u0947 \u0915\u092d\u0940 \u0932\u093e\u092d \u092a\u094d\u0930\u093e\u092a\u094d\u0924 \u0928\u0939\u0940\u0902 \u0939\u094b\u0917\u093e\u0964</li>
          <li>\u091c\u093f\u0938\u0915\u0940 \u0915\u093e\u0902\u0915\u093f\u0923\u0940 \u0938\u0902\u0916\u094d\u092f\u093e \u091c\u094d\u092f\u093e\u0926\u093e \u0939\u0948 \u0935\u0939 \u0926\u0942\u0938\u0930\u0947 \u0915\u093e \u090b\u0923\u0940 \u0939\u0948\u0964</li>
        </ol>
      </section>
    `;
  }

  function varnVinyasLabel(label) {
    if (state.language !== "mr") return label;
    const map = {
      "Name": "\u0928\u093e\u0935",
      "Enter name": "\u0928\u093e\u0935 \u0932\u093f\u0939\u093e",
      "Submit": "\u0938\u092c\u092e\u093f\u091f",
      "Submit a name to view the Varn Vinyas table.": "\u0935\u0930\u094d\u0923 \u0935\u093f\u0928\u094d\u092f\u093e\u0938 \u0924\u0915\u094d\u0924\u093e \u092a\u093e\u0939\u0923\u094d\u092f\u093e\u0938\u093e\u0920\u0940 \u0928\u093e\u0935 \u0932\u093f\u0939\u093e.",
      "Person Details": "\u0935\u094d\u092f\u0915\u094d\u0924\u0940\u091a\u0940 \u092e\u093e\u0939\u093f\u0924\u0940",
      "First Letter": "\u092a\u0939\u093f\u0932\u0947 \u0905\u0915\u094d\u0937\u0930",
      "Script": "\u0932\u093f\u092a\u0940",
      "Group No": "\u0935\u0930\u094d\u0917 \u0915\u094d\u0930\u092e\u093e\u0902\u0915",
      "Group Name": "\u0935\u0930\u094d\u0917 \u0928\u093e\u0935",
      "Animal": "\u092a\u094d\u0930\u093e\u0923\u0940",
      "Direction": "\u0926\u093f\u0936\u093e",
      "Enemy Group": "\u0936\u0924\u094d\u0930\u0942 \u0935\u0930\u094d\u0917",
      "Varn Vinyas Groups": "\u0935\u0930\u094d\u0923 \u0935\u093f\u0928\u094d\u092f\u093e\u0938 \u0935\u0930\u094d\u0917",
      "Best Matches": "\u0938\u0930\u094d\u0935\u094b\u0924\u094d\u0924\u092e \u091c\u0941\u0933\u0923\u0940",
      "Compatibility With All Varnas": "\u0938\u0930\u094d\u0935 \u0935\u0930\u094d\u0923\u093e\u0902\u0936\u0940 \u0938\u0941\u0938\u0902\u0917\u0924\u0940",
      "Group": "\u0935\u0930\u094d\u0917",
      "Varn": "\u0935\u0930\u094d\u0923",
      "Letters": "\u0905\u0915\u094d\u0937\u0930\u0947",
      "Enemy Check": "\u0936\u0924\u094d\u0930\u0942 \u0924\u092a\u093e\u0938\u0923\u0940",
      "Person Score": "\u091c\u093e\u0924\u0915 \u0917\u0941\u0923",
      "Other Score": "\u0938\u092e\u094b\u0930\u091a\u0947 \u0917\u0941\u0923",
      "Difference": "\u092b\u0930\u0915",
      "Outcome": "\u0928\u093f\u0937\u094d\u0915\u0930\u094d\u0937",
      "Score": "\u0917\u0941\u0923",
      "Category": "\u0936\u094d\u0930\u0947\u0923\u0940",
      "Favorable": "\u0905\u0928\u0941\u0915\u0942\u0932",
      "Reason": "\u0915\u093e\u0930\u0923",
      "No Varn Vinyas group records found.": "\u0935\u0930\u094d\u0923 \u0935\u093f\u0928\u094d\u092f\u093e\u0938 \u0935\u0930\u094d\u0917 \u0928\u094b\u0902\u0926\u0940 \u0938\u093e\u092a\u0921\u0932\u0940 \u0928\u093e\u0939\u0940.",
      "No Varn Vinyas records found.": "\u0935\u0930\u094d\u0923 \u0935\u093f\u0928\u094d\u092f\u093e\u0938 \u0928\u094b\u0902\u0926\u0940 \u0938\u093e\u092a\u0921\u0932\u0940 \u0928\u093e\u0939\u0940.",
    };
    return map[label] || label;
  }

  function varnVinyasValue(value) {
    if (state.language !== "mr") return value;
    const normalized = normalizeAstrologyValue(value);
    const map = {
      roman: "\u0930\u094b\u092e\u0928",
      east: "\u092a\u0942\u0930\u094d\u0935",
      "south east": "\u0906\u0917\u094d\u0928\u0947\u092f",
      south: "\u0926\u0915\u094d\u0937\u093f\u0923",
      "south west": "\u0928\u0948\u090b\u0924\u094d\u092f",
      west: "\u092a\u0936\u094d\u091a\u093f\u092e",
      "north west": "\u0935\u093e\u092f\u0935\u094d\u092f",
      north: "\u0909\u0924\u094d\u0924\u0930",
      "north east": "\u0908\u0936\u093e\u0928\u094d\u092f",
      "garuda eagle": "\u0917\u0930\u0941\u0921",
      garuda: "\u0917\u0930\u0941\u0921",
      cat: "\u092e\u093e\u0902\u091c\u0930",
      lion: "\u0938\u093f\u0902\u0939",
      dog: "\u0915\u0941\u0924\u094d\u0930\u093e",
      snake: "\u0938\u093e\u092a",
      rat: "\u0909\u0902\u0926\u0940\u0930",
      deer: "\u0939\u0930\u0940\u0923",
      lamb: "\u092e\u0947\u0902\u0922\u0940",
      "enemy varn combination": "\u0936\u0924\u094d\u0930\u0942 \u0935\u0930\u094d\u0923 \u0938\u0902\u092f\u094b\u0917.",
      "not an enemy varn combination": "\u0936\u0924\u094d\u0930\u0942 \u0935\u0930\u094d\u0923 \u0938\u0902\u092f\u094b\u0917 \u0928\u093e\u0939\u0940.",
      partner: "\u0938\u092e\u094b\u0930\u091a\u0940 \u0935\u094d\u092f\u0915\u094d\u0924\u0940",
      "partner is more obligated": "\u0938\u092e\u094b\u0930\u091a\u0940 \u0935\u094d\u092f\u0915\u094d\u0924\u0940 \u0905\u0927\u093f\u0915 \u092c\u093e\u0902\u0927\u0940\u0932",
      "jatak is more obligated": "\u091c\u093e\u0924\u0915 \u0905\u0927\u093f\u0915 \u092c\u093e\u0902\u0927\u0940\u0932",
      favorable: "\u0905\u0928\u0941\u0915\u0942\u0932",
      "less favorable": "\u0915\u092e\u0940 \u0905\u0928\u0941\u0915\u0942\u0932",
      "enemy varn": "\u0936\u0924\u094d\u0930\u0942 \u0935\u0930\u094d\u0923",
      less_favorable: "\u0915\u092e\u0940 \u0905\u0928\u0941\u0915\u0942\u0932",
      enemy: "\u0936\u0924\u094d\u0930\u0942",
      balanced: "\u0938\u0902\u0924\u0941\u0932\u093f\u0924",
      excellent: "\u0909\u0924\u094d\u0924\u092e",
      "very good": "\u0916\u0942\u092a \u091a\u093e\u0902\u0917\u0932\u0947",
      good: "\u091a\u093e\u0902\u0917\u0932\u0947",
      average: "\u0938\u0930\u093e\u0938\u0930\u0940",
      "below average": "\u0938\u0930\u093e\u0938\u0930\u0940\u092a\u0947\u0915\u094d\u0937\u093e \u0915\u092e\u0940",
      manageable: "\u0935\u094d\u092f\u0935\u0938\u094d\u0925\u093e\u092a\u0928\u0940\u092f",
      challenging: "\u0906\u0935\u094d\u0939\u093e\u0928\u093e\u0924\u094d\u092e\u0915",
      avoid: "\u091f\u093e\u0933\u093e",
    };
    if (map[normalized]) return map[normalized];
    return translateVarnVinyasSentence(String(value || ""));
  }

  function varnVinyasGroupName(value, groupNo) {
    if (state.language !== "mr") return value;
    const map = {
      1: "\u0905 \u0935\u0930\u094d\u0917",
      2: "\u0915 \u0935\u0930\u094d\u0917",
      3: "\u091a \u0935\u0930\u094d\u0917",
      4: "\u091f \u0935\u0930\u094d\u0917",
      5: "\u0924 \u0935\u0930\u094d\u0917",
      6: "\u092a \u0935\u0930\u094d\u0917",
      7: "\u092f \u0935\u0930\u094d\u0917",
      8: "\u0936 \u0935\u0930\u094d\u0917",
    };
    return map[Number(groupNo)] || value;
  }

  function varnVinyasLetters(letters, fallbackLetters) {
    const source = Array.isArray(letters) && letters.length ? letters : Array.isArray(fallbackLetters) ? fallbackLetters : [];
    if (!source.length) return "";
    if (state.language !== "mr") return source.join(", ");
    const romanMap = {
      a: "\u0905",
      aa: "\u0906",
      i: "\u0907",
      ee: "\u0908",
      ii: "\u0908",
      u: "\u0909",
      oo: "\u090a",
      uu: "\u090a",
      ri: "\u090b",
      e: "\u090f",
      ai: "\u0910",
      o: "\u0913",
      au: "\u0914",
      am: "\u0905\u0902",
      ah: "\u0905\u0903",
      k: "\u0915",
      kh: "\u0916",
      g: "\u0917",
      gh: "\u0918",
      ng: "\u0919",
      ch: "\u091a",
      chh: "\u091b",
      j: "\u091c",
      jh: "\u091d",
      ny: "\u091e",
      tt: "\u091f",
      thh: "\u0920",
      dd: "\u0921",
      ddh: "\u0922",
      nn: "\u0923",
      t: "\u0924",
      th: "\u0925",
      d: "\u0926",
      dh: "\u0927",
      n: "\u0928",
      p: "\u092a",
      ph: "\u092b",
      b: "\u092c",
      bh: "\u092d",
      m: "\u092e",
      y: "\u092f",
      r: "\u0930",
      l: "\u0932",
      v: "\u0935",
      w: "\u0935",
      sh: "\u0936",
      ss: "\u0937",
      s: "\u0938",
      h: "\u0939",
      ksh: "\u0915\u094d\u0937",
      tr: "\u0924\u094d\u0930",
      gy: "\u091c\u094d\u091e",
      gya: "\u091c\u094d\u091e",
      jn: "\u091c\u094d\u091e",
    };
    return source.map((letter) => romanMap[normalizeAstrologyValue(letter)] || letter).join(", ");
  }

  function translateVarnVinyasSentence(value) {
    if (state.language !== "mr") return value;
    return value
      .replace(/\bPartner\b/g, "\u0938\u092e\u094b\u0930\u091a\u0940 \u0935\u094d\u092f\u0915\u094d\u0924\u0940")
      .replace(/\bpartner\b/g, "\u0938\u092e\u094b\u0930\u091a\u0940 \u0935\u094d\u092f\u0915\u094d\u0924\u0940")
      .replace(/\bJatak\b/g, "\u091c\u093e\u0924\u0915")
      .replace(/\bjatak\b/g, "\u091c\u093e\u0924\u0915")
      .replace(/\bis more obligated\b/g, "\u0905\u0927\u093f\u0915 \u092c\u093e\u0902\u0927\u0940\u0932 \u0906\u0939\u0947")
      .replace(/\bhas the higher kankini value and may do more for\b/g, "\u091a\u0947 \u0915\u0902\u0915\u093f\u0923\u0940 \u092e\u0942\u0932\u094d\u092f \u0905\u0927\u093f\u0915 \u0905\u0938\u0942\u0928 \u0905\u0927\u093f\u0915 \u0915\u0930\u0942 \u0936\u0915\u0924\u0947")
      .replace(/\bBoth kankini values are equal, so both sides are balanced in giving and receiving\./g, "\u0926\u094b\u0928\u094d\u0939\u0940 \u0915\u0902\u0915\u093f\u0923\u0940 \u092e\u0942\u0932\u094d\u092f\u0947 \u0938\u092e\u093e\u0928 \u0906\u0939\u0947\u0924, \u0924\u094d\u092f\u093e\u092e\u0941\u0933\u0947 \u0926\u0947\u0923\u0947-\u0918\u0947\u0923\u0947 \u0938\u0902\u0924\u0941\u0932\u093f\u0924 \u0930\u093e\u0939\u0924\u0947.");
  }

  function varnVinyasOutcomeMessage(row, outcome, groupName) {
    const message = cleanVarnVinyasText(displayValue(outcome.interpretation?.message ?? outcome.message ?? outcome.reason));
    if (state.language !== "mr") {
      return message;
    }
    const personName = state.matchMaking.varnVinyasResult?.person?.name || varnVinyasLabel("Name");
    const higher = normalizeAstrologyValue(outcome.higher_kankini);
    if (higher === "equal" || normalizeAstrologyValue(outcome.result) === "balanced") {
      return "\u0926\u094b\u0928\u094d\u0939\u0940 \u0915\u0902\u0915\u093f\u0923\u0940 \u092e\u0942\u0932\u094d\u092f\u0947 \u0938\u092e\u093e\u0928 \u0906\u0939\u0947\u0924, \u0924\u094d\u092f\u093e\u092e\u0941\u0933\u0947 \u0926\u0947\u0923\u0947-\u0918\u0947\u0923\u0947 \u0938\u0902\u0924\u0941\u0932\u093f\u0924 \u0930\u093e\u0939\u0924\u0947.";
    }
    if (higher === "partner" || normalizeAstrologyValue(outcome.result).includes("partner")) {
      return `${groupName} \u091a\u0947 \u0915\u0902\u0915\u093f\u0923\u0940 \u092e\u0942\u0932\u094d\u092f \u0905\u0927\u093f\u0915 \u0905\u0938\u0942\u0928 ${personName} \u0938\u093e\u0920\u0940 \u0905\u0927\u093f\u0915 \u0915\u0930\u0942 \u0936\u0915\u0924\u0947.`;
    }
    if (higher === "jatak" || normalizeAstrologyValue(outcome.result).includes("jatak")) {
      return `${personName} \u091a\u0947 \u0915\u0902\u0915\u093f\u0923\u0940 \u092e\u0942\u0932\u094d\u092f \u0905\u0927\u093f\u0915 \u0905\u0938\u0942\u0928 ${groupName} \u0938\u093e\u0920\u0940 \u0905\u0927\u093f\u0915 \u0915\u0930\u0942 \u0936\u0915\u0924\u0947.`;
    }
    return varnVinyasValue(message);
  }

  function normalizeVarnVinyasResponse(response) {
    if (!response || !Array.isArray(response.kankini_by_partner_varga)) {
      return response;
    }

    const person = response.person || {};
    const normalizedPerson = {
      ...person,
      group_name: person.group_name || person.varn,
      animal: person.animal || person.varg_swami,
      enemy_group_no: person.enemy_group_no ?? person.enemy_group,
    };
    const rows = response.kankini_by_partner_varga.map((item) => {
      const jatakValue = item.self_kankini_number;
      const partnerValue = item.partner_kankini_number;
      const difference = Number(partnerValue) - Number(jatakValue);
      const hasDifference = !Number.isNaN(difference);
      const isEnemy = item.is_enemy_group === true;
      const result = isEnemy ? "Enemy Varn" : !hasDifference ? "-" : difference > 0 ? "Favorable" : difference === 0 ? "Balanced" : "Less favorable";
      const category = isEnemy ? "enemy" : !hasDifference ? "" : difference > 0 ? "favorable" : difference === 0 ? "balanced" : "less_favorable";
      const favorable = !isEnemy && hasDifference && difference >= 0;
      return {
        partner_group_no: item.partner_group_no,
        partner_group_name: item.partner_group_name || item.partner_varn,
        animal: item.partner_animal || item.partner_varg_swami,
        direction: item.partner_direction,
        enemy_check: {
          is_enemy: isEnemy,
          message: isEnemy ? "Enemy Varn combination." : "Not an enemy Varn combination.",
        },
        kankini: {
          jatak_value: jatakValue,
          partner_value: partnerValue,
          difference: hasDifference ? difference : "",
        },
        outcome: {
          higher_kankini: hasDifference ? difference > 0 ? "partner" : difference < 0 ? "jatak" : "equal" : "",
          result,
          facts: {
            jatak_kankini: jatakValue,
            partner_kankini: partnerValue,
            difference: hasDifference ? difference : "",
            absolute_difference: hasDifference ? Math.abs(difference) : "",
          },
          interpretation: {
            category,
            favorable,
            message: varnVinyasGeneratedMessage(result, difference, isEnemy),
          },
          message: varnVinyasGeneratedMessage(result, difference, isEnemy),
        },
      };
    });

    const bestMatches = rows
      .filter((row) => row.outcome.interpretation.favorable && !row.enemy_check.is_enemy)
      .sort((a, b) => Math.abs(Number(b.kankini.difference)) - Math.abs(Number(a.kankini.difference)))
      .slice(0, 3);

    return {
      ...response,
      person: normalizedPerson,
      varn_vinyas_table: rows.map((row) => ({
        group_no: row.partner_group_no,
        group_name: row.partner_group_name,
        animal: row.animal,
        direction: row.direction,
        letters_roman: varnVinyasLettersForGroup(row.partner_group_no),
        enemy_group_no: enemyGroupForVarn(row.partner_group_no),
      })),
      best_matches: bestMatches,
      compatibility_with_all_vargas: rows,
    };
  }

  function varnVinyasGeneratedMessage(result, difference, isEnemy) {
    if (isEnemy) {
      return "This is an Enemy Varn combination.";
    }
    if (Number.isNaN(Number(difference))) {
      return "";
    }
    if (difference > 0) {
      return "The other person has the higher kankini number and may contribute more.";
    }
    if (difference < 0) {
      return "The jatak has the higher kankini number and may contribute more.";
    }
    return "Both kankini numbers are equal, so both sides are balanced.";
  }

  function enemyGroupForVarn(groupNo) {
    const number = Number(groupNo);
    return Number.isNaN(number) ? "" : ((number + 3) % 8) + 1;
  }

  function varnVinyasLettersForGroup(groupNo) {
    const map = {
      1: ["a", "aa", "i", "ee", "ii", "u", "oo", "uu", "ri", "e", "ai", "o", "au", "am", "ah"],
      2: ["k", "kh", "g", "gh", "ng"],
      3: ["ch", "chh", "j", "jh", "ny"],
      4: ["tt", "thh", "dd", "ddh", "nn"],
      5: ["t", "th", "d", "dh", "n"],
      6: ["p", "ph", "b", "bh", "m"],
      7: ["y", "r", "l", "v", "w"],
      8: ["sh", "ss", "s", "h", "ksh", "tr", "gy", "gya", "jn"],
    };
    return map[Number(groupNo)] || [];
  }

  function cleanVarnVinyasText(value) {
    return String(value || "")
      .replace(/\bPartner varg\b/g, "Partner")
      .replace(/\bpartner varg\b/g, "partner");
  }

  function panchangTabsHtml() {
    const tabs = [
      ["tithi", "Tithi"],
      ["var", "Var"],
      ["nakshatra", "Nakshatra"],
      ["yog", "Yog"],
      ["karan", "Karan"],
    ];
    return tabs
      .map(([key, label]) => `<button class="panchang-tab ${state.panchang.activeTab === key ? "active" : ""}" data-panchang-tab="${key}" role="tab" aria-selected="${state.panchang.activeTab === key ? "true" : "false"}" type="button">${label}</button>`)
      .join("");
  }

  function panchangPlaceholderHtml(tabKey) {
    const label = {
      tithi: "Tithi",
      var: "Var",
      yog: "Yog",
      karan: "Karan",
    }[tabKey] || "";
    return `<div class="empty-state">${escapeHtml(label)} details will come here.</div>`;
  }

  function nakshatraReferenceHtml() {
    const panchang = state.panchang;
    if (panchang.isLoadingNakshatras) {
      return `<div class="empty-state">${t("common.loading")}</div>`;
    }
    if (!panchang.nakshatras.length) {
      return `<div class="empty-state">${t("common.loading")}</div>`;
    }
    const filteredNakshatras = filteredNakshatraReferences();
    return `
      ${nakshatraFiltersHtml()}
      ${filteredNakshatras.length ? "" : `<div class="empty-state">No Nakshatra details match the selected filters.</div>`}
      <div class="nakshatra-reference-grid">
        ${filteredNakshatras.map(nakshatraCardHtml).join("")}
      </div>
    `;
  }

  function nakshatraFiltersHtml() {
    const filters = state.panchang.nakshatraFilters || {};
    const filteredCount = filteredNakshatraReferences().length;
    const totalCount = state.panchang.nakshatras.length;
    const fields = [
      ["lord", "Lord"],
      ["nature", "Nature"],
      ["yoni", "Yoni"],
      ["gana", "Gana"],
      ["nadi", "Nadi"],
      ["purpose", "Purpose"],
    ];
    return `
      <div class="nakshatra-filter-panel">
        <div class="nakshatra-filter-summary">
          <strong>Filters</strong>
          <span>${escapeHtml(filteredCount)} / ${escapeHtml(totalCount)} Nakshatras</span>
        </div>
        <div class="nakshatra-filter-controls">
          ${fields.map(([field, label]) => `
            <label>
              <span>${escapeHtml(localizeReferenceLabel(label))}</span>
              <select data-nakshatra-filter="${field}">
                <option value="">All</option>
                ${nakshatraFilterOptions(field, filters[field] || "")}
              </select>
            </label>
          `).join("")}
          <button class="ghost-button compact-filter-button" id="clearNakshatraFilters" type="button">Clear</button>
        </div>
      </div>
    `;
  }

  function nakshatraFilterOptions(field, selectedValue) {
    return uniqueNakshatraFilterValues(field)
      .map((value) => `<option value="${escapeHtml(value)}" ${selectedValue === value ? "selected" : ""}>${escapeHtml(localizeNakshatraFilterValue(field, value))}</option>`)
      .join("");
  }

  function uniqueNakshatraFilterValues(field) {
    const values = state.panchang.nakshatras
      .map((nakshatra) => nakshatraFilterRawValue(nakshatra, field))
      .filter((value) => value !== null && value !== undefined && value !== "");
    return Array.from(new Set(values)).sort((a, b) => String(a).localeCompare(String(b)));
  }

  function filteredNakshatraReferences() {
    const filters = state.panchang.nakshatraFilters || {};
    return state.panchang.nakshatras.filter((nakshatra) =>
      Object.keys(filters).every((field) => !filters[field] || nakshatraFilterRawValue(nakshatra, field) === filters[field])
    );
  }

  function nakshatraFilterRawValue(nakshatra, field) {
    if (field === "nature") return nakshatra.nature && (nakshatra.nature.type || nakshatra.nature.meaning);
    return nakshatra[field];
  }

  function localizeNakshatraFilterValue(field, value) {
    if (field === "lord") return localizeReferenceValue("lord", value);
    return localizeReferenceValue(field, value);
  }

  function nakshatraCardHtml(nakshatra) {
    const rows = [
      ["Lord", localizeReferenceValue("lord", nakshatra.lord)],
      ["Deity", localizeReferenceValue("deity", nakshatra.deity)],
      ["Gana", localizeReferenceValue("gana", nakshatra.gana)],
      ["Nature", localizeReferenceValue("nature", nakshatra.nature && (nakshatra.nature.meaning || nakshatra.nature.type))],
      ["Symbol", localizeReferenceValue("symbol", nakshatra.symbol)],
      ["Yoni", localizeReferenceValue("yoni", nakshatra.yoni)],
      ["Nadi", localizeReferenceValue("nadi", nakshatra.nadi)],
      ["Purpose", localizeReferenceValue("purpose", nakshatra.purpose)],
      ["Span", nakshatra.span],
    ];
    return `
      <article class="nakshatra-card">
        <div class="nakshatra-card-title">
          <span>${escapeHtml(nakshatra.index ?? "-")}</span>
          <strong>${escapeHtml(localizeNakshatra(nakshatra.name) || nakshatra.name || "-")}</strong>
        </div>
        <div class="nakshatra-card-details">
          ${rows.map(([label, value]) => `<div><span>${escapeHtml(localizeReferenceLabel(label))}</span><strong>${escapeHtml(value ?? "-")}</strong></div>`).join("")}
        </div>
        <div class="nakshatra-pada-list">
          ${(nakshatra.padas || []).map((pada) => `<span>${escapeHtml(localizeReferenceLabel("Pada"))} ${escapeHtml(pada.pada)}: ${escapeHtml(localizeSign(pada.sign) || pada.sign)} / ${escapeHtml(localizeSign(pada.navamsa_sign) || pada.navamsa_sign)} (${escapeHtml(localizeReferenceLabel("Lord"))}: ${escapeHtml(localizeReferenceValue("lord", pada.pada_lord))})</span>`).join("")}
        </div>
      </article>
    `;
  }

  function horoscopeHtml() {
    const horoscope = state.horoscope;
    const showForm = horoscope.mode === "create" || horoscope.mode === "edit";
    const title = horoscope.mode === "edit" ? t("horoscope.update") : t("horoscope.create");
    const canGoNext = horoscope.records.length === horoscope.pageSize;

    if (showForm) {
      return `
        <main class="page-content">
          <section class="feature-panel compact-panel">
            <div>
              <p class="eyebrow">${t("horoscope.title")}</p>
              <h1>${title}</h1>
            </div>
            <button class="ghost-button light-button" id="cancelHoroscopeButton" type="button">${t("location.back")}</button>
          </section>
          ${horoscope.error ? `<div class="form-error">${escapeHtml(horoscope.error)}</div>` : ""}
          ${horoscope.message ? `<div class="form-success">${escapeHtml(horoscope.message)}</div>` : ""}
          ${horoscopeFormHtml(title)}
        </main>
      `;
    }

    if (horoscope.mode === "view" && horoscope.view) {
      return `
        <main class="page-content">
          ${horoscope.error ? `<div class="form-error">${escapeHtml(horoscope.error)}</div>` : ""}
          ${horoscopeViewHtml()}
        </main>
      `;
    }

    if (horoscope.mode === "kp-view" && horoscope.kpView) {
      return `
        <main class="page-content">
          ${kpViewHtml()}
        </main>
      `;
    }

    if (horoscope.mode === "kundali" && horoscope.kundali) {
      return horoscopeKundaliHtml();
    }

    return `
      <main class="page-content">
        <section class="feature-panel compact-panel">
          <div>
            <p class="eyebrow">${t("app.shortName")}</p>
            <h1>${t("horoscope.title")}</h1>
          </div>
          <div class="header-button-group">
            <button class="ghost-button light-button" data-route="dashboard" type="button">${t("horoscope.backHome")}</button>
            <button class="primary-button compact-action icon-text-button" id="newHoroscopeButton" title="${t("horoscope.createNew")}" aria-label="${t("horoscope.createNew")}" type="button">
              <img src="${ICONS.new}" alt="" />${t("horoscope.createNew")}
            </button>
          </div>
        </section>

        ${horoscope.error ? `<div class="form-error">${escapeHtml(horoscope.error)}</div>` : ""}
        ${horoscope.message ? `<div class="form-success">${escapeHtml(horoscope.message)}</div>` : ""}

        <section class="panel table-panel">
          <div class="panel-header">
            <h2>${t("horoscope.list")}</h2>
            <div class="pagination-actions">
              <label class="rows-per-page">
                <span>${t("horoscope.rowsPerPage")}</span>
                <select id="horoscopePageSize">
                  ${[5, 10, 25, 50].map((size) => `<option value="${size}" ${horoscope.pageSize === size ? "selected" : ""}>${size}</option>`).join("")}
                </select>
              </label>
              <button class="icon-button" id="prevHoroscopePage" title="${t("horoscope.previous")}" aria-label="${t("horoscope.previous")}" type="button" ${horoscope.page <= 1 || horoscope.isLoading ? "disabled" : ""}>
                <img src="${ICONS.previous}" alt="" />
              </button>
              <span>${horoscope.page}</span>
              <button class="icon-button" id="nextHoroscopePage" title="${t("horoscope.next")}" aria-label="${t("horoscope.next")}" type="button" ${!canGoNext || horoscope.isLoading ? "disabled" : ""}>
                <img src="${ICONS.next}" alt="" />
              </button>
            </div>
          </div>
          <div class="table-wrap">
            <table class="data-table">
              <thead>
                <tr>
                  <th>${t("horoscope.jatakId")}</th>
                  <th>${t("horoscope.name")}</th>
                  <th>${t("horoscope.dob")}</th>
                  <th>${t("horoscope.time")}</th>
                  <th>${t("location.city")}</th>
                  <th>${t("horoscope.actions")}</th>
                </tr>
              </thead>
              <tbody>
                ${
                  horoscope.records.length
                    ? horoscope.records
                        .map((record) => {
                          const jatakId = jatakIdForRecord(record);
                          return `
                            <tr>
                              <td>${escapeHtml(jatakId || "-")}</td>
                              <td>${escapeHtml(record.jatak_full_name || "-")}</td>
                              <td>${escapeHtml(record.date || "-")}</td>
                              <td>${escapeHtml(record.time || "-")}</td>
                              <td>${escapeHtml(record.city_name || record.city || record.birth_place || "-")}</td>
                              <td>
                                <div class="row-actions">
                                  <button class="icon-button" data-kp-jatak="${escapeHtml(jatakId)}" title="KP" aria-label="KP" type="button" ${jatakId ? "" : "disabled"}>
                                    <img src="./src/images/KP.jpg" alt="" />
                                  </button>
                                  <button class="icon-button" data-edit-jatak="${escapeHtml(jatakId)}" title="${t("horoscope.updateAction")}" aria-label="${t("horoscope.updateAction")}" type="button" ${jatakId ? "" : "disabled"}>
                                    <img src="${ICONS.edit}" alt="" />
                                  </button>
                                  <button class="icon-button danger-icon-button" data-delete-jatak="${escapeHtml(jatakId)}" title="${t("horoscope.deleteAction")}" aria-label="${t("horoscope.deleteAction")}" type="button" ${jatakId ? "" : "disabled"}>
                                    <img src="${ICONS.delete}" alt="" />
                                  </button>
                                  <button class="icon-button" data-view-jatak="${escapeHtml(jatakId)}" title="${t("horoscope.viewAction")}" aria-label="${t("horoscope.viewAction")}" type="button" ${jatakId ? "" : "disabled"}>
                                    <img src="${ICONS.view}" alt="" />
                                  </button>
                                  <button class="icon-button" data-kundali-jatak="${escapeHtml(jatakId)}" title="${t("horoscope.viewKundali")}" aria-label="${t("horoscope.viewKundali")}" type="button" ${jatakId ? "" : "disabled"}>
                                    <img src="${ICONS.kundali}" alt="" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          `;
                        })
                        .join("")
                    : `<tr><td colspan="6">${horoscope.isLoading ? t("common.loading") : t("horoscope.noRecords")}</td></tr>`
                }
              </tbody>
            </table>
          </div>
        </section>
      </main>
    `;
  }

  function horoscopeFormHtml(title) {
    const form = state.horoscope.form;
    return `
      <section class="location-panel compact-form-panel">
        <div class="horoscope-form-grid">
          <label>
            <span>${t("horoscope.name")}</span>
            <input id="jatakName" value="${escapeHtml(form.name)}" />
          </label>
          <label>
            <span>${t("horoscope.day")}</span>
            <select id="jatakDay">${dayOptions(form.day)}</select>
          </label>
          <label>
            <span>${t("horoscope.month")}</span>
            <select id="jatakMonth">${monthOptions(form.month)}</select>
          </label>
          <label>
            <span>${t("horoscope.year")}</span>
            <input id="jatakYear" maxlength="4" value="${escapeHtml(form.year)}" />
          </label>
          <label>
            <span>${t("horoscope.time")}</span>
            <input id="jatakTime" placeholder="HH:MM:SS" value="${escapeHtml(form.time)}" />
          </label>
          <label>
            <span>${t("horoscope.city")}</span>
            <select id="jatakCity" ${state.horoscope.isLoadingCities ? "disabled" : ""}>
              <option value="">${state.horoscope.isLoadingCities ? t("common.loading") : t("location.selectCity")}</option>
              ${state.horoscope.cities
                .map((city) => `<option value="${city.id}" ${String(form.cityId) === String(city.id) ? "selected" : ""}>${escapeHtml(city.city_name)} - ${escapeHtml(city.latitude)} - ${escapeHtml(city.longitude)}</option>`)
                .join("")}
            </select>
          </label>
        </div>
        <div class="form-actions">
          <button class="ghost-button" data-route="save-location" type="button">${t("horoscope.saveCityPreference")}</button>
          <button class="primary-button" id="saveHoroscopeButton" type="button" ${state.horoscope.isSaving ? "disabled" : ""}>
            ${state.horoscope.isSaving ? t("location.saving") : state.horoscope.mode === "edit" ? t("horoscope.update") : t("horoscope.create")}
          </button>
        </div>
      </section>
    `;
  }

  function horoscopeViewHtml() {
    const view = state.horoscope.view;
    const record = view.record || {};
    const matrixRows = [
      [t("horoscope.name"), record.jatak_full_name],
      [t("horoscope.day"), record.date],
      [t("horoscope.time"), record.time],
      [t("location.city"), record.city_name || record.city || record.birth_place],
      ["Timezone", record.timezone],
      [t("location.latitude"), record.latitude],
      [t("location.longitude"), record.longitude],
      [t("horoscope.city"), record.city_id],
      [t("horoscope.createdBy"), record.create_by],
      [t("horoscope.createdOn"), record.created_on],
    ];
    return `
      <section class="panel table-panel">
        <div class="panel-header">
          <h2>${t("horoscope.viewTitle")}</h2>
          <button class="ghost-button" id="closeHoroscopeView" type="button">${t("location.back")}</button>
        </div>
        <div class="detail-matrix">
          ${matrixRows.map(([label, value]) => `<div><span>${escapeHtml(label)}</span><strong>${escapeHtml(value ?? "-")}</strong></div>`).join("")}
        </div>
        <div class="note-box">
          <strong>${t("horoscope.notes")}</strong>
          <p>${escapeHtml(record.notes || t("horoscope.noNotes"))}</p>
        </div>
      </section>
    `;
  }

  function horoscopeKundaliHtml() {
    const kundali = state.horoscope.kundali || {};
    const leftChartKey = kundali.leftChartKey || "d1";
    const rightChartKey = kundali.rightChartKey || "d9";
    const chartPickersDisabled = (kundali.kundaliChoice || "home") === "kp-astrology";
    const charts = kundali.charts || {};
    const leftChart = charts[chartCacheKeyForSide("left", leftChartKey)];
    const rightChart = charts[chartCacheKeyForSide("right", rightChartKey)];
    const detailChart = leftChart && !leftChart.unavailable ? leftChart : charts.d1;
    return `
      <main class="page-content kundali-page-content">
        ${kundaliSideTabsHtml(kundali)}
        ${kundali.error ? `<div class="form-error">${escapeHtml(kundali.error)}</div>` : ""}
        <section class="panel kundali-panel">
          <div class="kundali-chart-layout">
            <div class="kundali-chart-cluster">
              <div class="kundali-grid">
                <div class="kundali-cell kundali-heading">${chartSelectHtml("leftKundaliChart", leftChartKey, chartPickersDisabled)}</div>
                <div class="kundali-cell kundali-heading">${chartSelectHtml("rightKundaliChart", rightChartKey, chartPickersDisabled)}</div>
                <div class="kundali-cell chart-cell">${chartPanelHtml(leftChart, leftChartKey, "left")}</div>
                <div class="kundali-cell chart-cell">${chartPanelHtml(rightChart, rightChartKey, "right")}</div>
              </div>
              ${kundaliInfoTilesHtml(kundali)}
            </div>
            <div class="kundali-right-panel">
              <div class="kundali-right-control-row">
                ${kundaliChoiceSelectHtml(kundali)}
                <div class="kundali-right-tabs" role="tablist" aria-label="Kundali quick panels">
                  <button class="kundali-right-tab ${kundali.rightPanelActive === "vimshottari-dasha" ? "active" : ""}" data-kundali-right-panel="vimshottari-dasha" type="button" role="tab" aria-selected="${kundali.rightPanelActive === "vimshottari-dasha" ? "true" : "false"}">Vimshottari Dasha</button>
                  <button class="kundali-right-tab ${kundali.rightPanelActive === "yogini-dasha" ? "active" : ""}" data-kundali-right-panel="yogini-dasha" type="button" role="tab" aria-selected="${kundali.rightPanelActive === "yogini-dasha" ? "true" : "false"}">Yogini Dasha</button>
                </div>
              </div>
              <div class="kundali-right-separator"></div>
              <div class="kundali-right-panel-body">
                ${kundaliRightPanelBodyHtml(kundali)}
              </div>
            </div>
          </div>
        </section>
        ${kundaliDetailPanelHtml(detailChart, "d1")}
      </main>
    `;
  }

  function kpViewHtml() {
    const view = state.horoscope.kpView || {};
    const d1Chart = view.charts?.d1;
    const chalitChart = view.charts?.chalit;
    const leftChartKey = view.leftChartKey || "d1";
    const rightChartKey = view.rightChartKey || "chalit";
    return `
      <section class="kp-view-grid">
        <div class="kp-view-grid-inner">
          <div class="kundali-cell chart-cell">
            <div class="kundali-heading">${chartSelectHtml("kpLeftChart", leftChartKey)}</div>
            <div class="kp-chart-title">D1-Chart</div>
            ${chartPanelHtml(d1Chart, "d1", "left")}
          </div>
          <div class="kundali-cell chart-cell">
            <div class="kundali-heading">${chartSelectHtml("kpRightChart", rightChartKey)}</div>
            <div class="kp-chart-title">Bhav Chalit-Chart</div>
            ${chartPanelHtml(chalitChart, "chalit", "right")}
          </div>
        </div>
      </section>
    `;
  }

  function kundaliDetailPanelOptions() {
    return [
      { key: "chart-details-d1", label: "Rashi Chart", image: "./src/images/D1Chart.jpg" },
      { key: "planets", label: "Planets", image: "./src/images/planets.jpg" },
      { key: "cusp", label: "Cusp", image: "./src/images/BinduKundali.png" },
      { key: "nakshatra-nadi", label: "Yogini Dasha", image: "./src/images/nakshatra.jpg" },
    ];
  }

  function kundaliChoiceSelectHtml(kundali) {
    const selectedChoice = kundali.kundaliChoice || "home";
    const selectedLabel = selectedChoice === "kp-astrology" ? "KP - Astrology" : selectedChoice === "panchanga" ? "Panchanga" : "Home";
    const selectedDescription = selectedChoice === "kp-astrology" ? "KP astrology tools" : selectedChoice === "panchanga" ? "Daily Panchanga details" : "Default setting";
    return `
      <div class="chart-picker kundali-choice-picker" data-chart-picker="kundaliChoice">
        <button class="chart-picker-button kundali-choice-button" type="button" aria-haspopup="listbox" aria-expanded="false">
          <span>${escapeHtml(selectedLabel)}</span>
          <small>${escapeHtml(selectedDescription)}</small>
        </button>
        <div class="chart-picker-menu kundali-choice-menu" role="listbox" aria-label="Kundali choices">
          <button class="chart-picker-option ${selectedChoice === "home" ? "active" : ""}" data-kundali-choice="home" role="option" type="button" aria-selected="${selectedChoice === "home" ? "true" : "false"}">
            <strong>Home</strong>
            <span>Default setting</span>
          </button>
          <button class="chart-picker-option ${selectedChoice === "panchanga" ? "active" : ""}" data-kundali-choice="panchanga" role="option" type="button" aria-selected="${selectedChoice === "panchanga" ? "true" : "false"}">
            <strong>Panchanga</strong>
            <span>Daily Panchanga details</span>
          </button>
          <button class="chart-picker-option ${selectedChoice === "kp-astrology" ? "active" : ""}" data-kundali-choice="kp-astrology" role="option" type="button" aria-selected="${selectedChoice === "kp-astrology" ? "true" : "false"}">
            <strong>KP - Astrology</strong>
            <span>KP astrology tools</span>
          </button>
        </div>
      </div>
    `;
  }

  function kundaliRightPanelBodyHtml(kundali) {
    const activePanel = kundali.rightPanelActive || "";
    if (activePanel === "yogini-dasha") {
      return `<div class="empty-state">Yogini Dasha details will come here soon.</div>`;
    }
    if (activePanel === "vimshottari-dasha") {
      return vimshottariDashaPanelHtml(kundali);
    }
    return "";
  }

  function vimshottariDashaPanelHtml(kundali) {
    const details = kundali.vimshottariDasha || {};
    if (details.isLoading) {
      return `<div class="placeholder-panel">${t("common.loading")}</div>`;
    }
    if (details.error) {
      return `<div class="form-error">${escapeHtml(details.error)}</div>`;
    }
    if (!details.data) {
      return `<div class="empty-state">Click Vimshottari Dasha to load details.</div>`;
    }
    const payload = normalizeVimshottariPayload(details.data, details);
    const currentLord = payload.currentLord || "-";
    return `
      <section class="vimshottari-panel">
        <div class="vimshottari-current-card">
          ${vimshottariHeaderTrailHtml(payload)}
        </div>
        ${payload.rows.length ? `
          <div class="vimshottari-list">
            ${payload.rows.slice(0, 10).map((row) => vimshottariRowHtml(row, payload)).join("")}
          </div>
        ` : renderVimshottariFallback(details.data)}
      </section>
    `;
  }

  function vimshottariRowHtml(row, payload) {
    const pathKey = dashaPathKey(row.path || row.parent_path || row.lord_key || row.lord || row.name || row.planet || "");
    const pathDepth = pathKey ? pathKey.split(",").length : 0;
    const isClickable = pathDepth > 0 && pathDepth < 3;
    const className = `vimshottari-row ${isVimshottariRowActive(row, payload, pathKey) ? "active" : ""} ${isClickable ? "clickable" : "disabled"}`;
    const content = `
      ${dashaPlanetIconHtml(row.lord_key || row.lord || row.name || row.planet, "row")}
      <strong>${escapeHtml(row.lord || row.name || row.planet || "-")}</strong>
      <span>${escapeHtml(formatDashaDisplayDate(row.start || row.start_date || row.from))}</span>
      <span>${escapeHtml(formatDashaDisplayDate(row.end || row.end_date || row.to))}</span>
    `;
    if (!isClickable) {
      return `<article class="${className}">${content}</article>`;
    }
    return `<button class="${className}" data-vimshottari-path="${escapeHtml(pathKey)}" type="button">${content}</button>`;
  }

  function isVimshottariRowActive(row, payload, pathKey) {
    const selectedParts = dashaPathParts(payload.selectedPath);
    const rowParts = dashaPathParts(pathKey);
    if (selectedParts.length && rowParts.length) {
      return rowParts.every((part, index) => selectedParts[index] === part);
    }
    return row === payload.currentRow;
  }

  function vimshottariHeaderTrailHtml(payload) {
    const parentPath = Array.isArray(payload.parentPath) ? payload.parentPath : [];
    const selectedParts = dashaPathParts(payload.selectedPath);
    if (!parentPath.length && selectedParts.length > 1) {
      const selectedChips = selectedParts.slice(0, 3).map((lord, index) => {
        const label = `Current ${vimshottariLevelLabel(index === 0 ? "dasha" : index === 1 ? "bhukti" : "antara")} Lord`;
        return vimshottariHeaderChipHtml(label, planetFullName(lord), dashaPathKey(selectedParts.slice(0, index)), false);
      });
      return `<div class="vimshottari-header-trail">${selectedChips.join("")}</div>`;
    }
    const levelLabel = vimshottariLevelLabel(payload.level || "dasha");
    const currentLord = payload.currentLord || "-";
    const chips = parentPath.map((lord, index) => {
      const label = vimshottariLevelLabel(index === 0 ? "dasha" : index === 1 ? "bhukti" : index === 2 ? "antara" : `level-${index + 1}`);
      const targetPath = index === 0 ? "" : dashaPathKey(parentPath.slice(0, index));
      return vimshottariHeaderChipHtml(label, planetFullName(lord), targetPath, true);
    });
    chips.push(vimshottariHeaderChipHtml(`Current ${levelLabel} Lord`, currentLord, dashaPathKey(parentPath), false));
    return `<div class="vimshottari-header-trail">${chips.join("")}</div>`;
  }

  function vimshottariHeaderChipHtml(label, lord, targetPath, clickable) {
    const content = `
      ${dashaPlanetIconHtml(lord, "header")}
      <div>
        <span>${escapeHtml(label)}</span>
        <strong>${escapeHtml(lord || "-")}</strong>
      </div>
    `;
    if (!clickable) return `<div class="vimshottari-header-chip">${content}</div>`;
    return `<button class="vimshottari-header-chip clickable" data-vimshottari-back-path="${escapeHtml(targetPath)}" type="button">${content}</button>`;
  }

  function vimshottariLevelLabel(level) {
    const normalized = String(level || "").toLowerCase();
    if (normalized === "dasha") return "Dasha";
    if (normalized === "bhukti") return "Bhukti";
    if (normalized === "antara") return "Antara";
    return humanizeKey(level || "Dasha");
  }

  function normalizeVimshottariPayload(payload, details = {}) {
    const source = payload?.vimshottari || payload?.dasha || payload?.data || payload || {};
    const current = source.current || source.current_dasha || source.currentDasha || source.running_dasha || source.runningDasha || {};
    const rows = [
      source.periods,
      source.dashas,
      source.mahadashas,
      source.maha_dashas,
      source.vimshottari_dasha,
      source.sequence,
    ].find(Array.isArray) || (Array.isArray(source) ? source : []);
    const currentRow = findCurrentDashaRow(rows, details.contextAt);
    const parentPath = Array.isArray(source.parent_path) ? source.parent_path : Array.isArray(source.parentPath) ? source.parentPath : [];
    const currentLord = planetFullName(
      current.lord || current.planet || current.name || current.dasha_lord || current.dashaLord ||
      source.current_lord || source.currentLord || source.current_dasha_lord || source.currentDashaLord ||
      currentRow?.lord || currentRow?.lord_key || currentRow?.planet || currentRow?.name ||
      rows[0]?.lord || rows[0]?.lord_key || rows[0]?.planet || rows[0]?.name || ""
    );
    return {
      currentLord,
      currentRow,
      parentPath,
      level: source.level || "dasha",
      selectedPath: dashaPathKey(details.selectedPath || details.currentPath || ""),
      rows,
    };
  }

  function findCurrentDashaRow(rows, at = "") {
    const now = at ? new Date(at) : new Date();
    const nowTime = now.getTime();
    if (!Array.isArray(rows) || Number.isNaN(nowTime)) return null;
    return rows.find((row) => {
      const start = new Date(row?.start || row?.start_date || row?.from || "");
      const end = new Date(row?.end || row?.end_date || row?.to || "");
      const startTime = start.getTime();
      const endTime = end.getTime();
      return !Number.isNaN(startTime) && !Number.isNaN(endTime) && nowTime >= startTime && nowTime <= endTime;
    }) || null;
  }

  function formatDashaDisplayDate(value) {
    const text = String(value || "").trim();
    if (!text) return "-";
    const normalized = text.replace("T", " ").split(/\s+/)[0];
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let year = "";
    let month = "";
    let day = "";
    let match = normalized.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
    if (match) {
      [, year, month, day] = match;
    } else {
      match = normalized.match(/^(\d{1,2})[-/ ]([A-Za-z]{3,}|\d{1,2})[-/ ](\d{4})$/);
      if (match) {
        [, day, month, year] = match;
      }
    }
    if (!year || !month || !day) return normalized;
    const monthIndex = Number(month) ? Number(month) - 1 : monthNames.findIndex((name) => name.toLowerCase() === String(month).slice(0, 3).toLowerCase());
    const monthLabel = monthNames[monthIndex] || String(month).slice(0, 3);
    return `${String(day).padStart(2, "0")} ${monthLabel} ${year}`;
  }

  function renderVimshottariFallback(payload) {
    const source = payload?.vimshottari || payload?.dasha || payload?.data || payload || {};
    if (!source || typeof source !== "object") {
      return `<div class="empty-state">No Vimshottari Dasha rows available.</div>`;
    }
    const rows = Object.entries(source)
      .filter(([, value]) => value !== null && value !== undefined && value !== "")
      .slice(0, 8);
    if (!rows.length) {
      return `<div class="empty-state">No Vimshottari Dasha rows available.</div>`;
    }
    return `
      <div class="vimshottari-kv-list">
        ${rows.map(([key, value]) => `
          <div>
            <span>${escapeHtml(humanizeKey(key))}</span>
            <strong>${escapeHtml(formatJaiminiScalar(value))}</strong>
          </div>
        `).join("")}
      </div>
    `;
  }

  function dashaPlanetIconHtml(planetName, variant = "header") {
    const normalized = normalizePlanetName(planetName);
    const imageMap = {
      sun: "sun.jpg",
      moon: "moon.jpg",
      mars: "mars.jpg",
      mercury: "mercury.jpg",
      jupiter: "jupiter.jpg",
      venus: "venus.jpg",
      saturn: "saturn.jpg",
      rahu: "rahu.jpg",
      ketu: "ketu.jpg",
      uranus: "uranus.jpg",
      neptune: "Neptune.jpg",
      pluto: "pluto.jpg",
    };
    const fileName = imageMap[normalized] || "planets.jpg";
    return `
      <div class="vimshottari-current-icon ${variant === "row" ? "row-icon" : ""}">
        <img src="./src/images/${escapeHtml(fileName)}" alt="" onerror="this.onerror=null;this.src='./src/images/planets.jpg';" />
      </div>
    `;
  }

  function dashaPathKey(path) {
    if (Array.isArray(path)) return path.map((item) => normalizePlanetName(item) || String(item || "").toLowerCase()).filter(Boolean).join(",");
    return String(path || "").split(",").map((item) => normalizePlanetName(item) || item.trim().toLowerCase()).filter(Boolean).join(",");
  }

  function dashaPathParts(path) {
    return dashaPathKey(path).split(",").filter(Boolean);
  }

  function kundaliDetailPanelHtml(chart, chartKey) {
    const kundali = state.horoscope.kundali || {};
    const activePanel = kundali.detailPanelActive || "chart-details-d1";
    const options = kundaliDetailPanelOptions();
    const activeOption = options.find((option) => option.key === activePanel);
    if ((kundali.kundaliChoice || "home") === "home") {
      return `
        <section class="panel table-panel kundali-detail-table">
          <div class="kundali-detail-body">
            ${chartDetailsTableHtml(chart, chartKey)}
          </div>
        </section>
      `;
    }
    if ((kundali.kundaliChoice || "panchanga") === "kp-astrology") {
      queueMicrotask(() => loadKpNadiRules(false));
      return `
        <section class="panel table-panel kundali-detail-table kp-detail-placeholder">
          <div class="kundali-detail-body">
            ${kpNadiFilterHtml(kundali)}
            ${nakshatraNadiTilesHtml(kundali)}
          </div>
        </section>
      `;
    }
    const content = activePanel === "chart-details-d1"
      ? chartDetailsTableHtml(chart, chartKey)
      : activePanel === "cusp"
        ? cuspDetailsTableHtml(kundali)
        : activePanel === "nakshatra-nadi"
          ? `<div class="empty-state">Yogini Dasha details will come here soon.</div>`
        : `<div class="empty-state">${escapeHtml(activeOption?.label || "Details")} details will come here.</div>`;
    return `
      <section class="panel table-panel kundali-detail-table">
        <div class="kundali-detail-toolbar" role="tablist" aria-label="Kundali detail tools">
          ${options.map((option) => `
            <button
              class="kundali-detail-tool ${activePanel === option.key ? "active" : ""}"
              data-kundali-detail-panel="${escapeHtml(option.key)}"
              role="tab"
              aria-selected="${activePanel === option.key ? "true" : "false"}"
              title="${escapeHtml(option.label)}"
              type="button"
            >
              <span class="kundali-detail-tool-label">${escapeHtml(option.label)}</span>
            </button>
          `).join("")}
        </div>
        <div class="kundali-detail-body">
          ${content}
        </div>
      </section>
    `;
  }

  function kundaliSideTabsHtml(kundali) {
    const sidePanel = kundali.sidePanel || {};
    return `
      <aside class="kundali-side-tabs" aria-label="Kundali tools">
        <button class="kundali-side-tab ${sidePanel.menuOpen ? "active" : ""}" id="kundaliMoreButton" type="button" aria-haspopup="menu" aria-expanded="${sidePanel.menuOpen ? "true" : "false"}">
          <span class="vertical-dot-stack" aria-hidden="true"><i></i><i></i><i></i></span>
          <span class="sr-only">More</span>
        </button>
        ${sidePanel.menuOpen ? kundaliMoreMenuHtml() : ""}
      </aside>
      ${sidePanel.active === "karak-akarak" ? karakAkarakModalHtml(kundali) : ""}
      ${sidePanel.active === "bhavbala" ? bhavbalaModalHtml(kundali) : ""}
      ${sidePanel.active === "shadbal" ? shadbalModalHtml(kundali) : ""}
      ${kundali.houseDetails ? houseDetailsModalHtml(kundali) : ""}
    `;
  }

  function kundaliMoreMenuHtml() {
    return `
      <div class="kundali-more-menu" role="menu">
        <button data-kundali-tool="shadbal" type="button" role="menuitem">Shadbal</button>
        <button data-kundali-tool="bhavbala" type="button" role="menuitem">Bhavbala</button>
        <button data-kundali-tool="karak-akarak" type="button" role="menuitem">Karak-Akarak</button>
        <button data-kundali-tool="rashi" type="button" role="menuitem">Rashi</button>
      </div>
    `;
  }

  function bhavbalaModalHtml(kundali) {
    const sidePanel = kundali.sidePanel || {};
    const panel = sidePanel.bhavbala || {};
    return `
      <div class="kundali-modal-backdrop" data-close-kundali-modal="true">
        <section class="kundali-tool-modal kundali-shadbal-modal" role="dialog" aria-modal="true" aria-label="Bhavbala">
          <div class="kundali-slider-header">
            <div>
              <strong>Bhavbala</strong>
              <span>House strength summary</span>
            </div>
            <button class="icon-button" data-close-kundali-modal="true" type="button" aria-label="Close">X</button>
          </div>
          <div class="kundali-tab-content">
            ${bhavbalaBodyHtml(panel)}
          </div>
        </section>
      </div>
    `;
  }

  function houseDetailsModalHtml(kundali) {
    const details = kundali.houseDetails || {};
    const houseNumber = Number(details.house_number || details.houseNumber || 0) || "";
    const rows = Array.isArray(details.rows) ? details.rows : [];
    return `
      <div class="kundali-modal-backdrop" data-close-house-details="true">
        <section class="kundali-tool-modal kundali-house-details-modal" role="dialog" aria-modal="true" aria-label="${escapeHtml(`Details of House #${houseNumber || "-"}`)}">
          <div class="kundali-slider-header">
            <div>
              <strong>${escapeHtml(`Details of House #${houseNumber || "-"}`)}</strong>
              <span>${escapeHtml(details.sign || details.sign_name || details.cusp_sign || "")}</span>
            </div>
            <button class="icon-button" data-close-house-details="true" type="button" aria-label="Close">X</button>
          </div>
          <div class="detail-matrix">
            ${rows.map(([label, value]) => `<div><span>${escapeHtml(label)}</span><strong>${escapeHtml(value ?? "-")}</strong></div>`).join("")}
          </div>
          <div class="note-box">
            <strong>Planets</strong>
            <p>${escapeHtml((details.planets || []).join(", ") || "-")}</p>
          </div>
        </section>
      </div>
    `;
  }

  function cuspDetailsTableHtml(kundali) {
    const details = kundali.cuspDetails;
    if (details?.isLoading) {
      return `<div class="placeholder-panel">${t("common.loading")}</div>`;
    }
    if (details?.error) {
      return `<div class="form-error">${escapeHtml(details.error)}</div>`;
    }
    const rows = Array.isArray(details?.rows) ? details.rows.slice(0, 12) : [];
    if (!rows.length) {
      return `<div class="empty-state">No cusp details available.</div>`;
    }
    const columns = Array.isArray(details?.columns) && details.columns.length
      ? details.columns
      : Object.keys(rows[0] || {});
    return `
      <div class="table-wrap cusp-table-wrap">
        <table class="data-table cusp-detail-table">
          <thead>
            <tr>
              ${columns.map((column) => `<th>${escapeHtml(formatCuspLabel(column))}</th>`).join("")}
            </tr>
          </thead>
          <tbody>
            ${rows.map((row) => `
              <tr>
                ${columns.map((column) => `<td>${escapeHtml(column === "cusp_longitude" || column === "degree_in_sign" ? formatCuspLongitude(row?.[column]) : formatCuspValue(row?.[column]))}</td>`).join("")}
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    `;
  }

  function nakshatraNadiTilesHtml(kundali) {
    const details = kundali.nakshatraNadi;
    if (details?.isLoading) {
      return `<div class="placeholder-panel">${t("common.loading")}</div>`;
    }
    if (details?.error) {
      return `<div class="form-error">${escapeHtml(details.error)}</div>`;
    }
    const rows = Array.isArray(details?.rows) ? details.rows.slice(0, 12) : [];
    if (!rows.length) {
      return `<div class="empty-state">No Yogini Dasha details available.</div>`;
    }
    const rule = selectedKpNadiRule(kundali);
    const activeLords = currentVimshottariLords(kundali);
    return `
      <div class="nakshatra-nadi-grid">
        ${rows.map((row, index) => `
          <article class="nakshatra-nadi-tile ${index >= 6 ? "tooltip-up" : "tooltip-down"}" tabindex="0">
            ${nakshatraNadiDashaBadgesHtml(row, activeLords)}
            <div class="nakshatra-nadi-content">
              ${nakshatraNadiValueRowHtml("Planet", row.current_planet, rule, activeLords, row)}
              ${nakshatraNadiValueRowHtml("Star Lord", row.nakshatra_lord, rule, activeLords, row)}
              ${nakshatraNadiValueRowHtml("Sub Lord", row.sub_lord, rule, activeLords, row)}
            </div>
            ${nakshatraNadiPlanetImageHtml(row.current_planet?.planet_key)}
            <div class="nakshatra-nadi-tooltip" role="tooltip">
              ${nakshatraNadiTooltipRowHtml("Planet", row.current_planet)}
              ${nakshatraNadiTooltipRowHtml("Star Lord", row.nakshatra_lord)}
              ${nakshatraNadiTooltipRowHtml("Sub Lord", row.sub_lord)}
            </div>
          </article>
        `).join("")}
      </div>
    `;
  }

  function kpNadiFilterHtml(kundali) {
    const filter = kundali.kpNadiFilter || {};
    const data = filter.data || {};
    const parents = Object.keys(data);
    const selectedParent = filter.parent || "";
    const childKeys = selectedParent && data[selectedParent] && typeof data[selectedParent] === "object"
      ? Object.keys(data[selectedParent])
      : [];
    return `
      <div class="kp-nadi-filter-bar">
        <label>
          <select data-kp-nadi-parent>
            <option value="">Select Topic</option>
            ${parents.map((parent) => `<option value="${escapeHtml(parent)}" ${selectedParent === parent ? "selected" : ""}>${escapeHtml(parent)}</option>`).join("")}
          </select>
        </label>
        <label>
          <select data-kp-nadi-child>
            <option value="all" ${(filter.child || "all") === "all" ? "selected" : ""}>All</option>
            ${childKeys.map((child) => `<option value="${escapeHtml(child)}" ${filter.child === child ? "selected" : ""}>${escapeHtml(formatNadiRuleLabel(child))}</option>`).join("")}
          </select>
        </label>
      </div>
    `;
  }

  function formatNadiRuleLabel(value) {
    return String(value || "")
      .replace(/_/g, " ")
      .replace(/\b\w/g, (ch) => ch.toUpperCase());
  }

  function selectedKpNadiRule(kundali) {
    const filter = kundali?.kpNadiFilter || {};
    const parent = filter.parent || "";
    const child = filter.child || "all";
    if (!parent || !child || child === "all") {
      return { plus: new Set(), minus: new Set() };
    }
    const rule = findNadiRule(filter.data, parent, child);
    return {
      plus: new Set(normalizeNadiRuleValues(rule?.["+"])),
      minus: new Set(normalizeNadiRuleValues(rule?.["-"])),
    };
  }

  function findNadiRule(data, parent, child) {
    if (!data || typeof data !== "object") return null;
    const parentKey = findNormalizedObjectKey(data, parent);
    const parentData = parentKey ? data[parentKey] : null;
    if (!parentData || typeof parentData !== "object") return null;
    const childKey = findNormalizedObjectKey(parentData, child);
    return childKey ? parentData[childKey] : null;
  }

  function findNormalizedObjectKey(source, target) {
    const targetKey = normalizeNadiRuleKey(target);
    return Object.keys(source || {}).find((key) => normalizeNadiRuleKey(key) === targetKey) || "";
  }

  function normalizeNadiRuleKey(value) {
    return String(value || "").trim().toLowerCase().replace(/[\s-]+/g, "_").replace(/_+/g, "_");
  }

  function normalizeNadiRuleValues(value) {
    const source = Array.isArray(value) ? value : String(value || "").split(/[,\s]+/);
    return source
      .map((item) => Number(item))
      .filter((item) => Number.isFinite(item));
  }

  function currentVimshottariLords(kundali) {
    const path = dashaPathParts(kundali?.vimshottariDasha?.selectedPath || "");
    return {
      dasha: normalizePlanetName(path[0]),
      bhukti: normalizePlanetName(path[1]),
      antara: normalizePlanetName(path[2]),
      set: new Set(path.map((lord) => normalizePlanetName(lord)).filter(Boolean)),
    };
  }

  function nakshatraNadiDashaBadgesHtml(row, activeLords) {
    const planet = normalizePlanetName(row?.current_planet?.planet_key);
    const badges = [
      activeLords?.dasha === planet ? ["D", "Dasha Lord", "dasha"] : null,
      activeLords?.bhukti === planet ? ["B", "Bhukti Lord", "bhukti"] : null,
      activeLords?.antara === planet ? ["A", "Antara Lord", "antara"] : null,
    ].filter(Boolean);
    if (!badges.length) return "";
    return `
      <div class="nakshatra-nadi-dasha-badges" aria-label="Current dasha markers">
        ${badges.map(([letter, title, type]) => `<span class="nadi-dasha-badge ${escapeHtml(type)}" title="${escapeHtml(title)}">${escapeHtml(letter)}</span>`).join("")}
      </div>
    `;
  }

  function nakshatraNadiTooltipRowHtml(label, item) {
    const planet = item?.planet_key || "-";
    const value = formatNakshatraNadiValue(item?.value);
    return `
      <div class="nakshatra-nadi-tooltip-row">
        <span>${escapeHtml(label)}</span>
        <strong>${escapeHtml(planet)}</strong>
        <code>${escapeHtml(value)}</code>
      </div>
    `;
  }

  function nakshatraNadiPlanetImageHtml(planetName) {
    const normalized = normalizePlanetName(planetName);
    const imageMap = {
      sun: "sun.jpg",
      moon: "moon.jpg",
      mars: "mars.jpg",
      mercury: "mercury.jpg",
      jupiter: "jupiter.jpg",
      venus: "venus.jpg",
      saturn: "saturn.jpg",
      rahu: "rahu.jpg",
      ketu: "ketu.jpg",
      uranus: "uranus.jpg",
      neptune: "Neptune.jpg",
      pluto: "pluto.jpg",
    };
    const fileName = imageMap[normalized] || `planet-${normalized}.svg`;
    return `
      <div class="nakshatra-nadi-planet-image" aria-hidden="true">
        <img src="./src/images/${escapeHtml(fileName)}" alt="" />
      </div>
    `;
  }

  function nakshatraNadiValueRowHtml(label, item, rule = null, activeLords = null, row = null) {
    const colorClass = nakshatraNadiPlanetColorClass(item?.planet_key);
    const planet = item?.planet_key || "-";
    const shouldHighlight = activeLords?.set?.has(normalizePlanetName(row?.current_planet?.planet_key));
    return `
      <div class="nakshatra-nadi-row">
        <span>${escapeHtml(label)} :</span>
        <strong class="${escapeHtml(colorClass)}">${escapeHtml(planet)}</strong>
        <code>- ${nakshatraNadiValueHtml(item?.value, rule, shouldHighlight)}</code>
      </div>
    `;
  }

  function nakshatraNadiValueHtml(value, rule, shouldHighlight = false) {
    if (!Array.isArray(value) || !value.length) return "";
    return [...value]
      .map((item) => Number(item))
      .filter((item) => Number.isFinite(item))
      .sort((first, second) => first - second)
      .map((item) => {
        const highlightClass = shouldHighlight ? nadiRuleValueClass(item, rule) : "";
        if (!highlightClass) return escapeHtml(item);
        return `<em class="${escapeHtml(highlightClass)}">${escapeHtml(item)}</em>`;
      })
      .join(", ");
  }

  function nadiRuleValueClass(value, rule) {
    if (!rule) return "";
    if (rule.minus?.has(value)) return "nadi-rule-negative";
    if (rule.plus?.has(value)) return "nadi-rule-positive";
    return "";
  }

  function nakshatraNadiPlanetColorClass(name) {
    const normalized = normalizePlanetName(name);
    if (["moon", "venus", "mercury", "jupiter"].includes(normalized)) return "nadi-planet-green";
    if (normalized === "sun") return "nadi-planet-brown";
    if (["saturn", "mars", "rahu", "ketu"].includes(normalized)) return "nadi-planet-red";
    return "nadi-planet-default";
  }

  function bhavbalaBodyHtml(panel) {
    if (panel.isLoading) {
      return `<div class="placeholder-panel">${t("common.loading")}</div>`;
    }
    if (panel.error) {
      return `<div class="form-error">${escapeHtml(panel.error)}</div>`;
    }
    const rows = Array.isArray(panel.rows) ? panel.rows : [];
    return `
      <div class="shadbal-table-wrap">
        <table class="data-table shadbal-table">
          <thead>
            <tr>
              <th>Bhava Bala</th>
              <th>Planet</th>
              <th>House Lord Strength</th>
              <th>House Digbala</th>
              <th>House Drigbala</th>
            </tr>
          </thead>
          <tbody>
            ${rows.length ? rows.map(bhavbalaRowHtml).join("") : `<tr><td colspan="5"><div class="empty-state">No Bhavbala summary available.</div></td></tr>`}
          </tbody>
        </table>
      </div>
    `;
  }

  function shadbalTabs() {
    return [
      "Sthanbal",
      "Kaalbal",
      "Digbala",
      "DrikBal",
      "Cheshtabal",
      "Naisargik Bal",
    ];
  }

  function shadbalModalHtml(kundali) {
    const sidePanel = kundali.sidePanel || {};
    const activeTab = sidePanel.shadbalActiveTab || "sthanbal";
    const tabs = shadbalTabs();
    const analysis = sidePanel.shadbalAnalysis || {};
    const currentTabData = analysis[activeTab] || {};
    return `
      <div class="kundali-modal-backdrop" data-close-kundali-modal="true">
        <section class="kundali-tool-modal kundali-shadbal-modal" role="dialog" aria-modal="true" aria-label="Shadbal">
          <div class="kundali-slider-header">
            <div>
              <strong>Shadbal</strong>
              <span>Strength summary placeholder</span>
            </div>
            <button class="icon-button" data-close-kundali-modal="true" type="button" aria-label="Close">X</button>
          </div>
          <div class="kundali-tab-strip" role="tablist" aria-label="Shadbal sections">
            ${tabs
              .map((tabLabel) => {
                const tabKey = normalizeShadbalTabKey(tabLabel);
                return `<button class="kundali-tab ${activeTab === tabKey ? "active" : ""}" data-shadbal-tab="${tabKey}" role="tab" aria-selected="${activeTab === tabKey ? "true" : "false"}" type="button">${escapeHtml(tabLabel)}</button>`;
              })
              .join("")}
          </div>
          <div class="kundali-tab-content">
            ${shadbalTabBodyHtml(activeTab, currentTabData)}
          </div>
        </section>
      </div>
    `;
  }

  function shadbalTabBodyHtml(tabKey, tabData) {
    if (tabKey === "sthanbal") {
      if (tabData.isLoading) {
        return `<div class="placeholder-panel">${t("common.loading")}</div>`;
      }
      if (tabData.error) {
        return `<div class="form-error">${escapeHtml(tabData.error)}</div>`;
      }
      const rows = Array.isArray(tabData.rows) ? tabData.rows : [];
      return `
        <div class="shadbal-table-wrap">
          <table class="data-table shadbal-table">
            <thead>
              <tr>
                <th>Planet</th>
                <th>Stana Bala</th>
                <th>In rupas</th>
              </tr>
            </thead>
            <tbody>
              ${rows.length ? rows.map(shadbalRowHtml).join("") : `<tr><td colspan="3"><div class="empty-state">No Sthanbal summary available.</div></td></tr>`}
            </tbody>
          </table>
        </div>
      `;
    }
    if (tabKey === "kaalbal") {
      if (tabData.isLoading) {
        return `<div class="placeholder-panel">${t("common.loading")}</div>`;
      }
      if (tabData.error) {
        return `<div class="form-error">${escapeHtml(tabData.error)}</div>`;
      }
      const rows = Array.isArray(tabData.rows) ? tabData.rows : [];
      const componentKeys = Array.isArray(tabData.componentKeys) && tabData.componentKeys.length
        ? tabData.componentKeys
        : ["natonnata", "paksha", "tribhaga", "abda", "masa", "vaara", "hora", "ayana"];
      return `
        <div class="shadbal-table-wrap">
          <table class="data-table shadbal-table">
            <thead>
              <tr>
                <th>Planet</th>
                ${componentKeys.map((key) => `<th>${escapeHtml(formatKaalbalLabel(key))}</th>`).join("")}
              </tr>
            </thead>
            <tbody>
              ${rows.length ? rows.map((row) => kaalbalRowHtml(row, componentKeys)).join("") : `<tr><td colspan="${1 + componentKeys.length}"><div class="empty-state">No Kaalbal summary available.</div></td></tr>`}
            </tbody>
          </table>
        </div>
      `;
    }
    if (tabKey === "digbala") {
      if (tabData.isLoading) {
        return `<div class="placeholder-panel">${t("common.loading")}</div>`;
      }
      if (tabData.error) {
        return `<div class="form-error">${escapeHtml(tabData.error)}</div>`;
      }
      const rows = Array.isArray(tabData.rows) ? tabData.rows : [];
      return `
        <div class="shadbal-table-wrap">
          <table class="data-table shadbal-table">
            <thead>
              <tr>
                <th>Planet</th>
                <th>Digbala Virupa</th>
                <th>Digbala Rupa</th>
              </tr>
            </thead>
            <tbody>
              ${rows.length ? rows.map((row) => digbalRowHtml(row)).join("") : `<tr><td colspan="3"><div class="empty-state">No Digbala summary available.</div></td></tr>`}
            </tbody>
          </table>
        </div>
      `;
    }
    if (tabKey === "drikbal") {
      if (tabData.isLoading) {
        return `<div class="placeholder-panel">${t("common.loading")}</div>`;
      }
      if (tabData.error) {
        return `<div class="form-error">${escapeHtml(tabData.error)}</div>`;
      }
      const rows = Array.isArray(tabData.rows) ? tabData.rows : [];
      return `
        <div class="shadbal-table-wrap">
          <table class="data-table shadbal-table">
            <thead>
              <tr>
                <th>Planet</th>
                <th>Drig Bala</th>
                <th>Rupas</th>
              </tr>
            </thead>
            <tbody>
              ${rows.length ? rows.map((row) => drikbalRowHtml(row)).join("") : `<tr><td colspan="3"><div class="empty-state">No DrikBal summary available.</div></td></tr>`}
            </tbody>
          </table>
        </div>
      `;
    }
    if (tabKey === "cheshtabal") {
      if (tabData.isLoading) {
        return `<div class="placeholder-panel">${t("common.loading")}</div>`;
      }
      if (tabData.error) {
        return `<div class="form-error">${escapeHtml(tabData.error)}</div>`;
      }
      const rows = Array.isArray(tabData.rows) ? tabData.rows : [];
      return `
        <div class="shadbal-table-wrap">
          <table class="data-table shadbal-table">
            <thead>
              <tr>
                <th>Planet</th>
                <th>Cheshta Bala</th>
                <th>Cheshta Rupas</th>
              </tr>
            </thead>
            <tbody>
              ${rows.length ? rows.map(cheshtabalRowHtml).join("") : `<tr><td colspan="3"><div class="empty-state">No Cheshtabal summary available.</div></td></tr>`}
            </tbody>
          </table>
        </div>
      `;
    }
    if (tabKey === "naisargik-bal") {
      if (tabData.isLoading) {
        return `<div class="placeholder-panel">${t("common.loading")}</div>`;
      }
      if (tabData.error) {
        return `<div class="form-error">${escapeHtml(tabData.error)}</div>`;
      }
      const rows = Array.isArray(tabData.rows) ? tabData.rows : [];
      return `
        <div class="shadbal-table-wrap">
          <table class="data-table shadbal-table">
            <thead>
              <tr>
                <th>Planet</th>
                <th>Naisargika Bala</th>
                <th>Rupas</th>
              </tr>
            </thead>
            <tbody>
              ${rows.length ? rows.map(naisargikBalRowHtml).join("") : `<tr><td colspan="3"><div class="empty-state">No Naisargik Bal summary available.</div></td></tr>`}
            </tbody>
          </table>
        </div>
      `;
    }
    return `<div class="placeholder-panel">A code will come here soon for ${escapeHtml(shadbalTabLabel(tabKey))}.</div>`;
  }

  function shadbalRowHtml(row) {
    const stanaBala = resolveShadbalStanaBala(row);
    const inRupas = stanaBala === null ? null : stanaBala / 60;
    return `
      <tr>
        <td><strong>${escapeHtml(formatShadbalPlanetLabel(row.planet || "-"))}</strong></td>
        <td>${escapeHtml(formatAnalysisNumber(stanaBala))}</td>
        <td>${escapeHtml(formatAnalysisNumber(inRupas))}</td>
      </tr>
    `;
  }

  function kaalbalRowHtml(row, componentKeys) {
    const components = row?.components || {};
    return `
      <tr>
        <td><strong>${escapeHtml(formatShadbalPlanetLabel(row.planet || "-"))}</strong></td>
        ${componentKeys.map((key) => `<td>${escapeHtml(formatAnalysisNumber(components?.[key]))}</td>`).join("")}
      </tr>
    `;
  }

  function digbalRowHtml(row) {
    const virupa = firstFiniteNumber(row?.digbala_virupa, row?.digbalaVirupa, row?.components?.dig_bala, row?.components?.digbala);
    const rupa = firstFiniteNumber(row?.digbala_rupa, row?.digbalaRupa, row?.rupas, row?.strength_ratio);
    return `
      <tr>
        <td><strong>${escapeHtml(formatShadbalPlanetLabel(row.planet || "-"))}</strong></td>
        <td>${escapeHtml(formatAnalysisNumber(virupa))}</td>
        <td>${escapeHtml(formatAnalysisNumber(rupa))}</td>
      </tr>
    `;
  }

  function drikbalRowHtml(row) {
    return `
      <tr>
        <td><strong>${escapeHtml(formatShadbalPlanetLabel(row.planet || "-"))}</strong></td>
        <td>${escapeHtml(formatAnalysisNumber(row.drig_bala ?? row.components?.drik_bala))}</td>
        <td>${escapeHtml(formatAnalysisNumber(row.rupas ?? row.strength_ratio))}</td>
      </tr>
    `;
  }

  function cheshtabalRowHtml(row) {
    const bala = firstFiniteNumber(row?.cheshta_bal, row?.cheshta_bala, row?.cheshtaBala, row?.components?.cheshta_bala);
    const rupas = firstFiniteNumber(row?.cheshta_rupas, row?.cheshtaRupas, row?.rupas, row?.strength_ratio);
    return `
      <tr>
        <td><strong>${escapeHtml(formatShadbalPlanetLabel(row.planet || "-"))}</strong></td>
        <td>${escapeHtml(formatAnalysisNumber(bala))}</td>
        <td>${escapeHtml(formatAnalysisNumber(rupas))}</td>
      </tr>
    `;
  }

  function naisargikBalRowHtml(row) {
    const bala = firstFiniteNumber(row?.naisargika_bala, row?.naisargikaBala, row?.components?.naisargika_bala);
    const rupas = firstFiniteNumber(row?.rupas, row?.in_rupas, row?.inRupas, row?.strength_ratio);
    return `
      <tr>
        <td><strong>${escapeHtml(formatShadbalPlanetLabel(row.planet || "-"))}</strong></td>
        <td>${escapeHtml(formatAnalysisNumber(bala))}</td>
        <td>${escapeHtml(formatAnalysisNumber(rupas))}</td>
      </tr>
    `;
  }

  function normalizeShadbalTabKey(label) {
    return String(label || "")
      .toLowerCase()
      .replace(/\s+/g, "-");
  }

  function shadbalTabLabel(tabKey) {
    const labels = {
      sthanbal: "Sthanbal",
      kaalbal: "Kaalbal",
      digbala: "Digbala",
      drikbal: "DrikBal",
      cheshtabal: "Cheshta Bala",
      "naisargik-bal": "Naisargik Bal",
    };
    return labels[tabKey] || "Sthanbal";
  }

  function karakAkarakModalHtml(kundali) {
    const ascendantNumber = kundaliAscendantNumber(kundali);
    const cache = kundali.sidePanel?.karakAkarak || {};
    const panel = ascendantNumber ? cache[ascendantNumber] || {} : {};
    return `
      <div class="kundali-modal-backdrop" data-close-kundali-modal="true">
        <section class="kundali-tool-modal" role="dialog" aria-modal="true" aria-label="Karak-Akarak">
          <div class="kundali-slider-header">
            <div>
              <strong>Karak-Akarak</strong>
              <span>${ascendantNumber ? `Asc ${escapeHtml(ascendantNumber)}` : "Asc unavailable"}</span>
            </div>
            <button class="icon-button" data-close-kundali-modal="true" type="button" aria-label="Close">X</button>
          </div>
          ${karakAkarakSliderBodyHtml(panel, ascendantNumber)}
        </section>
      </div>
    `;
  }

  function karakAkarakSliderHtml(kundali) {
    const ascendantNumber = kundaliAscendantNumber(kundali);
    const cache = kundali.sidePanel?.karakAkarak || {};
    const panel = ascendantNumber ? cache[ascendantNumber] || {} : {};
    return `
      <div class="kundali-slider-panel" data-kundali-slider="karak-akarak">
        <div class="kundali-slider-header">
          <strong>Karak-Akarak</strong>
          <span>${ascendantNumber ? `Asc ${escapeHtml(ascendantNumber)}` : "Asc unavailable"}</span>
        </div>
        ${karakAkarakSliderBodyHtml(panel, ascendantNumber)}
      </div>
    `;
  }

  function karakAkarakSliderBodyHtml(panel, ascendantNumber) {
    if (!ascendantNumber) {
      return `<div class="empty-state">Ascendant number not available.</div>`;
    }
    if (panel.isLoading) {
      return `<div class="empty-state">${t("common.loading")}</div>`;
    }
    if (panel.error) {
      return `<div class="form-error">${escapeHtml(panel.error)}</div>`;
    }
    if (!panel.data) {
      return `<div class="empty-state">Loading Karak-Akarak details.</div>`;
    }
    const data = panel.data || {};
    const kundali = state.horoscope.kundali;
    const planetRows = Object.values(data.planet_wise_values || {}).map((row) => resolveKarakAkarakPlanetRow(row, kundali));
    return `
      <div class="karak-summary">
        <div><span>Ascendant</span><strong>${escapeHtml(data.ascendant_name || "-")}</strong></div>
        <div><span>Number</span><strong>${escapeHtml(data.ascendant_number ?? ascendantNumber)}</strong></div>
      </div>
      <div class="karak-list">
        ${planetRows.length ? planetRows.map(karakAkarakPlanetHtml).join("") : `<div class="empty-state">No Karak-Akarak details found.</div>`}
      </div>
    `;
  }

  function karakAkarakPlanetHtml(row) {
    const categories = Array.isArray(row.categories) ? row.categories : [];
    return `
      <article class="karak-item">
        <div>
          <strong>${escapeHtml(karakPlanetName(row.planet))}</strong>
          <span class="${escapeHtml(karakValueClass(row.value))}">${escapeHtml(row.value || "-")}</span>
        </div>
        <div class="karak-image-tags">
          ${categories.map(karakCategoryImageHtml).join("")}
        </div>
        ${row.note ? `<small>${escapeHtml(row.note)}</small>` : ""}
      </article>
    `;
  }

  function resolveKarakAkarakPlanetRow(row, kundali) {
    if (normalizePlanetName(row.planet) !== "moon") {
      return row;
    }
    const note = normalizeAstrologyValue(row.note || "");
    const value = normalizeAstrologyValue(row.value || "");
    if (!note.includes("krura") && !value.includes("if not krura")) {
      return row;
    }
    const moonIsKrura = isMoonKruraFromSun(kundali);
    if (moonIsKrura === null) {
      return row;
    }
    const category = moonIsKrura ? "Akaraka" : "Karaka";
    return Object.assign({}, row, {
      value: category,
      categories: [category],
      note: moonIsKrura ? "Moon is Krura: within +/- 90 degrees from Sun" : "Moon is not Krura: outside +/- 90 degrees from Sun",
    });
  }

  function isMoonKruraFromSun(kundali) {
    const d1 = normalizeChartPayload(kundali?.charts?.d1, "d1");
    if (!d1 || d1.unavailable) return null;
    const placements = d1.placements || {};
    const sun = findPlacementByBody(placements, "sun");
    const moon = findPlacementByBody(placements, "moon");
    const sunLongitude = absolutePlacementLongitude(sun);
    const moonLongitude = absolutePlacementLongitude(moon);
    if (sunLongitude === null || moonLongitude === null) {
      return null;
    }
    return Math.abs(shortestAngularDifference(moonLongitude, sunLongitude)) <= 90;
  }

  function absolutePlacementLongitude(placement) {
    if (!placement) return null;
    const longitude = Number(placement.longitude);
    if (!Number.isNaN(longitude)) {
      return positiveModulo(longitude, 360);
    }
    const signIndex = placementSignIndex(placement);
    const degreeInSign = Number(placement.degree_in_sign ?? placement.degree ?? placement.longitude_in_sign ?? placement.degrees_in_sign);
    if (!signIndex || Number.isNaN(degreeInSign)) {
      return null;
    }
    return positiveModulo((Number(signIndex) - 1) * 30 + degreeInSign, 360);
  }

  function shortestAngularDifference(value, reference) {
    return ((Number(value) - Number(reference) + 540) % 360) - 180;
  }

  function karakCategoryImageHtml(category) {
    const asset = karakCategoryAsset(category);
    return `
      <span class="karak-image-tag ${escapeHtml(karakCategoryClass(category))}" title="${escapeHtml(category)}">
        <img src="${escapeHtml(asset)}" alt="" />
        <strong>${escapeHtml(category)}</strong>
      </span>
    `;
  }

  function karakCategoryAsset(category) {
    const normalized = normalizeAstrologyValue(category);
    if (normalized.includes("badhaka") || normalized.includes("badhak")) return "./src/images/badhak.jpg";
    if (normalized.includes("maraka") || normalized.includes("marak")) return "./src/images/marak.jpg";
    if (normalized.includes("akaraka") || normalized.includes("akarak")) return "./src/images/akarak.jpg";
    if (normalized.includes("karaka") || normalized.includes("karak")) return "./src/images/karak.jpg";
    return "./src/images/shadbala.jpg";
  }

  function karakCategoryClass(category) {
    const normalized = normalizeAstrologyValue(category);
    if (normalized.includes("prabala") && (normalized.includes("akaraka") || normalized.includes("akarak"))) return "intense-akarak";
    if (normalized.includes("akaraka") || normalized.includes("akarak")) return "akarak";
    if (normalized.includes("badhaka") || normalized.includes("badhak")) return "badhak";
    if (normalized.includes("maraka") || normalized.includes("marak")) return normalized.includes("mild") ? "mild-marak" : "marak";
    if (normalized.includes("prabala") && (normalized.includes("karaka") || normalized.includes("karak"))) return "intense-karak";
    if (normalized.includes("karaka") || normalized.includes("karak")) return "karak";
    return "neutral";
  }

  function karakValueClass(value) {
    const normalized = normalizeAstrologyValue(value);
    if (normalized.includes("prabala") && (normalized.includes("akaraka") || normalized.includes("akarak"))) return "karak-value intense-akarak";
    if (normalized.includes("akaraka") || normalized.includes("akarak")) return "karak-value akarak";
    if (normalized.includes("badhaka") || normalized.includes("badhak")) return "karak-value badhak";
    if (normalized.includes("prabala") && (normalized.includes("karaka") || normalized.includes("karak"))) return "karak-value intense-karak";
    if (normalized.includes("karaka") || normalized.includes("karak")) return "karak-value karak";
    if (normalized.includes("maraka") || normalized.includes("marak")) return "karak-value marak";
    return "karak-value neutral";
  }

  function kundaliAscendantNumber(kundali) {
    const d1 = normalizeChartPayload(kundali?.charts?.d1, "d1");
    if (!d1 || d1.unavailable) return null;
    const lagnaPlacement = findPlacementByBody(d1.placements || {}, "lagna");
    return Number(d1.lagna_sign_index || lagnaPlacement?.sign_index || placementSignIndex(lagnaPlacement) || 0) || null;
  }

  function karakPlanetName(name) {
    const map = {
      surya: "Sun",
      chandra: "Moon",
      mangala: "Mars",
      budha: "Mercury",
      guru: "Jupiter",
      sukra: "Venus",
      shukra: "Venus",
      sani: "Saturn",
      shani: "Saturn",
    };
    return planetFullName(map[normalizeAstrologyValue(name)] || name);
  }

  function kundaliBirthDetailsHtml(record) {
    if (!record) return "";
    const values = [
      record.jatak_full_name || record.name,
      record.date,
      record.time,
      record.city_name || record.city || record.birth_place,
    ].map((value) => value ?? "-");
    return `
      <aside class="kundali-native-details">
        ${values.map((value) => `<span>${escapeHtml(value)}</span>`).join("")}
      </aside>
    `;
  }

  function kundaliInfoTilesHtml(kundali) {
    return `
      <div class="kundali-info-tile-stack">
        ${kundaliBirthDetailsHtml(kundali.record)}
        ${kundaliGocharTileHtml(kundali)}
      </div>
    `;
  }

  function kundaliGocharTileHtml(kundali) {
    const side = kundali.gocharTileSide === "right" ? "right" : "left";
    const chartKey = side === "right" ? kundali.rightChartKey : kundali.leftChartKey;
    const isHomeChoice = (kundali.kundaliChoice || "home") === "home";
    const isKpChoice = (kundali.kundaliChoice || "home") === "kp-astrology";
    const steps = [
      ["5year", "5 Year"],
      ["year", "1 Year"],
      ["month", "1 Month"],
      ["week", "1 Week"],
      ["day", "1 Day"],
      ["hour", "1 Hour"],
      ["10min", "10 Min"],
      ["1min", "1 Min"],
    ];
    return `
      <aside class="kundali-gochar-tile">
        ${isKpChoice ? "" : `
          <div class="kundali-side-toggle" role="group" aria-label="Time control chart side">
            <button class="${side === "left" ? "active" : ""}" data-gochar-tile-side="left" type="button" ${isHomeChoice ? "disabled" : ""}>Left</button>
            <button class="${side === "right" ? "active" : ""}" data-gochar-tile-side="right" type="button" ${isHomeChoice ? "disabled" : ""}>Right</button>
          </div>
        `}
        <div class="kundali-time-step-list">
          ${steps.map(([step, label]) => `
            <div class="kundali-time-step-row">
              <button data-gochar-side="${escapeHtml(side)}" data-gochar-chart-key="${escapeHtml(chartKey)}" data-gochar-step="${escapeHtml(step)}" data-gochar-direction="backward" type="button" aria-label="Previous ${escapeHtml(label)}" ${isHomeChoice ? "disabled" : ""}>-</button>
              <span>${escapeHtml(label)}</span>
              <button data-gochar-side="${escapeHtml(side)}" data-gochar-chart-key="${escapeHtml(chartKey)}" data-gochar-step="${escapeHtml(step)}" data-gochar-direction="forward" type="button" aria-label="Next ${escapeHtml(label)}" ${isHomeChoice ? "disabled" : ""}>+</button>
            </div>
          `).join("")}
        </div>
      </aside>
    `;
  }

  function formatKundaliTileTimestamp(value) {
    const text = String(value || "").trim();
    if (!text) return { date: "-", time: "-" };
    const normalized = text.replace("T", " ");
    const [datePart, timePart = ""] = normalized.split(/\s+/);
    return {
      date: datePart || "-",
      time: timePart ? timePart.replace(/\.\d+Z?$/, "").replace(/Z$/, "") : "-",
    };
  }

  function chartSelectHtml(id, selected, disabled = false) {
    const selectedChart = chartCatalogItem(selected);
    return `
      <div class="chart-picker ${disabled ? "disabled" : ""}" data-chart-picker="${id}" data-chart-picker-disabled="${disabled ? "true" : "false"}">
        <button class="chart-picker-button" type="button" aria-haspopup="listbox" aria-expanded="false" ${disabled ? "disabled" : ""}>
          <span>${escapeHtml(selectedChart.title)}</span>
          <small>${escapeHtml(selectedChart.description)}</small>
        </button>
        <div class="chart-picker-menu" role="listbox" aria-label="${t("horoscope.selectChart")}">
          ${CHART_CATALOG.map((chart) => `
            <button class="chart-picker-option ${chart.key === selected ? "active" : ""}" data-chart-target="${id}" data-chart-key="${escapeHtml(chart.key)}" role="option" type="button" ${chart.enabled && !disabled ? "" : "disabled"} aria-selected="${chart.key === selected ? "true" : "false"}">
              <strong>${escapeHtml(chart.title)}</strong>
              <span>${escapeHtml(chart.description)}</span>
            </button>
          `).join("")}
        </div>
      </div>
    `;
  }

  function chartPanelHtml(chart, chartKey, side) {
    chart = normalizeChartPayload(chart, chartKey);
    if (!chart) {
      return `<div class="empty-state">${t("common.loading")}</div>`;
    }
    if (chart.unavailable) {
      return `<div class="empty-state">${t("horoscope.chartUnavailable")}</div>`;
    }
    return `
      ${northIndianChartHtml(chart, chartKey)}
      ${chartTimingControlsHtml(chart, chartKey, side)}
    `;
  }

  function chartDetailsTableHtml(chart, chartKey) {
    chart = normalizeChartPayload(chart, chartKey);
    const placements = chart && !chart.unavailable ? Object.values(chart.placements || {}) : [];
    const kundali = state.horoscope.kundali;
    const planetStatus = chartKey === "d1" && kundali ? kundali.planetStatus : null;
    const charakarakas = chartKey === "d1" && kundali ? normalizeCharakarakas(kundali.jaimini) : {};
    return `
      <section class="kundali-detail-card">
        <div class="panel-header">
          <h2>${t("horoscope.chartDetails")} - ${chartDisplayName(chartKey)}</h2>
        </div>
        <div class="table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>${t("horoscope.planet")}</th>
                <th>Charkarakas</th>
                <th>${t("horoscope.longitude")}</th>
                <th>${t("horoscope.nakshatra")}</th>
                <th>${t("horoscope.pada")}</th>
                <th>${t("horoscope.rashi")}</th>
              </tr>
            </thead>
            <tbody>
              ${
                placements.length
                  ? placements.map((placement) => `
                    <tr>
                      <td>${escapeHtml(planetFullDisplayLabel(placement.body || placement.name, planetStatus))}</td>
                      <td>${escapeHtml(charakarakaForPlanet(placement.body || placement.name, charakarakas) || "-")}</td>
                      <td>${escapeHtml(formatJhoraLongitude(placement))}</td>
                      <td>${escapeHtml(localizeNakshatra(placement.nakshatra) || "-")}</td>
                      <td>${escapeHtml(placement.pada ?? "-")}</td>
                      <td>${escapeHtml(localizeSign(placement.sign || placement.varga_sign || placement.d3_sign || placement.drekkana_sign || placement.navamsa_sign || placement.rasi_sign) || "-")}</td>
                    </tr>
                  `).join("")
                  : `<tr><td colspan="6">${t("horoscope.chartUnavailable")}</td></tr>`
              }
            </tbody>
          </table>
        </div>
      </section>
    `;
  }

  function jaiminiDetailsHtml(chart) {
    if (!chart || chart.unavailable) {
      return `
        <section class="panel table-panel kundali-detail-table">
          <div class="panel-header">
            <h2>${t("horoscope.chartDetails")} - ${chartDisplayName("jaimini")}</h2>
          </div>
          <div class="empty-state">${t("horoscope.chartUnavailable")}</div>
        </section>
      `;
    }

    const source = chart.analysis || chart.jaimini || chart.data || chart;
    const sections = [];

    if (Array.isArray(source)) {
      sections.push({
        title: chartDisplayName("jaimini"),
        body: renderKeyValueList(arrayToKeyValueRows(source)),
      });
    } else if (source && typeof source === "object") {
      const priorityKeys = [
        "analysis",
        "results",
        "details",
        "planets",
        "rows",
        "points",
        "karakas",
        "chara_karakas",
        "special_lagnas",
      ];
      const handled = new Set();

      priorityKeys.forEach((key) => {
        if (source[key] !== undefined) {
          sections.push({
            title: humanizeKey(key),
            body: renderJaiminiValue(source[key]),
          });
          handled.add(key);
        }
      });

      Object.entries(source).forEach(([key, value]) => {
        if (handled.has(key) || isEmptyRenderableValue(value)) return;
        sections.push({
          title: humanizeKey(key),
          body: renderJaiminiValue(value),
        });
      });
    } else {
      sections.push({
        title: chartDisplayName("jaimini"),
        body: `<div class="empty-state">${t("horoscope.chartUnavailable")}</div>`,
      });
    }

    return `
      <section class="panel table-panel kundali-detail-table">
        <div class="panel-header">
          <h2>${t("horoscope.chartDetails")} - ${chartDisplayName("jaimini")}</h2>
        </div>
        <div class="jaimini-detail-stack">
          ${sections.map((section) => `
            <article class="jaimini-detail-section">
              <h3>${escapeHtml(section.title)}</h3>
              ${section.body}
            </article>
          `).join("")}
        </div>
      </section>
    `;
  }

  function normalizeCharakarakas(jaiminiPayload) {
    const source = normalizeJaiminiPayload(jaiminiPayload);
    const raw = source?.charakarakas || source?.chara_karakas || source?.charaKarakas || source?.charakaraka || {};
    if (!raw || typeof raw !== "object") return {};

    return Object.entries(raw).reduce((result, [karakaKey, value]) => {
      const planetKey = value && typeof value === "object" ? normalizePlanetName(value.planet_key || value.planetKey || value.planet || value.body || value.name || value.graha || value.grah || value.planet_name || value.planetName) : "";
      const label = karakaKey;
      if (!planetKey) return result;
      result[planetKey] = label;
      result[normalizeAstrologyValue(planetKey)] = label;
      result[normalizeAstrologyValue(planetKey).replace(/\s+/g, "")] = label;
      return result;
    }, {});
  }

  function charakarakaForPlanet(planetName, charakarakas) {
    const normalized = normalizeAstrologyValue(planetName);
    if (!normalized) return "";
    const normalizedPlanet = normalizePlanetName(planetName);
    const directMatches = [
      normalized,
      normalized.replace(/\s+/g, ""),
      normalizedPlanet,
      normalizedPlanet.replace(/\s+/g, ""),
    ];
    for (const key of directMatches) {
      if (key && Object.prototype.hasOwnProperty.call(charakarakas, key)) {
        return formatJaiminiScalar(charakarakas[key]);
      }
    }
    return Object.prototype.hasOwnProperty.call(charakarakas, normalizedPlanet)
      ? formatJaiminiScalar(charakarakas[normalizedPlanet])
      : "";
  }

  function renderJaiminiValue(value) {
    if (value === null || value === undefined || value === "") {
      return `<div class="empty-state">${t("common.noData") || "-"}</div>`;
    }
    if (Array.isArray(value)) {
      return renderArrayTable(value);
    }
    if (typeof value === "object") {
      return renderObjectTable(value);
    }
    return `<div class="detail-value">${escapeHtml(String(value))}</div>`;
  }

  function renderArrayTable(items) {
    const rows = items.flatMap((item, index) => {
      if (item && typeof item === "object" && !Array.isArray(item)) {
        const entries = Object.entries(item).filter(([, val]) => !isEmptyRenderableValue(val));
        if (!entries.length) return [];
        return [[`#${index + 1}`, entries.map(([k, v]) => `${humanizeKey(k)}: ${formatJaiminiScalar(v)}`).join(" | ")]];
      }
      return [[`#${index + 1}`, formatJaiminiScalar(item)]];
    });

    if (!rows.length) {
      return `<div class="empty-state">${t("horoscope.chartUnavailable")}</div>`;
    }

    return `
      <div class="table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            ${rows.map(([label, value]) => `<tr><td>${escapeHtml(label)}</td><td>${escapeHtml(value)}</td></tr>`).join("")}
          </tbody>
        </table>
      </div>
    `;
  }

  function renderObjectTable(obj) {
    const entries = Object.entries(obj).filter(([, value]) => !isEmptyRenderableValue(value));
    if (!entries.length) {
      return `<div class="empty-state">${t("horoscope.chartUnavailable")}</div>`;
    }
    return `
      <div class="table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>Field</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            ${entries.map(([key, value]) => `<tr><td>${escapeHtml(humanizeKey(key))}</td><td>${escapeHtml(formatJaiminiScalar(value))}</td></tr>`).join("")}
          </tbody>
        </table>
      </div>
    `;
  }

  function arrayToKeyValueRows(items) {
    return items.map((item, index) => ({
      key: `#${index + 1}`,
      value: formatJaiminiScalar(item),
    }));
  }

  function renderKeyValueList(rows) {
    return `
      <div class="detail-matrix">
        ${rows.map((row) => `<div><span>${escapeHtml(row.key)}</span><strong>${escapeHtml(row.value)}</strong></div>`).join("")}
      </div>
    `;
  }

  function formatJaiminiScalar(value) {
    if (value === null || value === undefined || value === "") return "-";
    if (Array.isArray(value)) return value.map(formatJaiminiScalar).join(", ");
    if (typeof value === "object") {
      return Object.entries(value)
        .filter(([, v]) => !isEmptyRenderableValue(v))
        .map(([k, v]) => `${humanizeKey(k)}: ${formatJaiminiScalar(v)}`)
        .join(" | ") || "-";
    }
    return String(value);
  }

  function humanizeKey(key) {
    return String(key || "")
      .replace(/[_-]+/g, " ")
      .replace(/\b\w/g, (ch) => ch.toUpperCase());
  }

  function isEmptyRenderableValue(value) {
    return value === null || value === undefined || value === "";
  }

  function northIndianChartHtml(chart, chartKey) {
    chart = normalizeChartPayload(chart, chartKey);
    const kundali = state.horoscope.kundali;
    const planetStatus = chartKey === "d1" && kundali ? kundali.planetStatus : null;
    const houses = buildNorthIndianHouses(chart, planetStatus, chartKey);
    const markers = chartKey === "jaimini" ? buildJaiminiMarkers(kundali?.jaimini) : [];
    const showPlanets = chartKey !== "jaimini";
    return `
      <div class="north-chart">
        ${northIndianSvgHtml(houses, markers, showPlanets, chartKey)}
      </div>
    `;
  }

  function buildNorthIndianHouses(chart, planetStatus, chartKey = "") {
    const lagnaSignIndex = Number(chart.lagna_sign_index || 1);
    const gocharAscSignIndex = chartKey === "gochar" ? Number(chart.gochar_asc_sign_index || chart.gocharAscSignIndex || 0) || null : null;
    const isDerivedAscendantChart = Boolean(chart.derived_anchor);
    const placements = Object.values(chart.placements || {});
    const sourceHouses = Array.isArray(chart.houses) ? chart.houses : [];
    return Array.from({ length: 12 }, (_, index) => {
      const houseNumber = index + 1;
      const signIndex = ((lagnaSignIndex + houseNumber - 2) % 12) + 1;
      const sourceHouse = sourceHouses.find((house) => Number(house.house) === houseNumber) || {};
      const ascendantHouseNumber = gocharAscSignIndex ? houseFromLagnaSign(gocharAscSignIndex, lagnaSignIndex) : 1;
      const ascendantPlacement = !isDerivedAscendantChart && houseNumber === ascendantHouseNumber ? ascendantDisplayData(placements, sourceHouse) : null;
      const bodies = chart.use_house_bodies
        ? bodiesFromHouse(sourceHouse, placements, planetStatus)
        : placements
            .filter((placement) => (isDerivedAscendantChart || !isAscendantPlacement(placement)) && placementBelongsToHouse(placement, houseNumber, signIndex, isDerivedAscendantChart))
            .map((placement) => planetDisplayData(placement, planetStatus));
      return {
        house: houseNumber,
        sign: sourceHouse.sign || sourceHouse.cusp_sign || signNameByIndex(signIndex),
        sign_index: sourceHouse.sign_index || sourceHouse.cusp_sign_index || signIndex,
        bodies: ascendantPlacement && !chart.use_house_bodies ? [ascendantPlacement, ...bodies] : bodies,
      };
    });
  }

  function bodiesFromHouse(sourceHouse, placements, planetStatus) {
    const houseBodies = Array.isArray(sourceHouse.bodies) ? sourceHouse.bodies : [];
    return houseBodies
      .map((body) => findPlacementByBody(placements, body) || { body })
      .map((placement) => planetDisplayData(placement, planetStatus));
  }

  function normalizeChartPayload(chart, chartKey) {
    if (!chart || chart.unavailable || chart.placements) {
      return chartKey === "chalit" ? normalizeChalitChart(chart) : chart;
    }
    if (chartKey !== "gochar" || !chart.positions) {
      return chart;
    }

    const positions = chart.positions || {};
    const lagna = positions.lagna || positions.ascendant || positions.asc;
    const placements = Object.keys(positions).reduce((result, key) => {
      const position = positions[key] || {};
      const body = position.body || position.name || key;
      result[key] = Object.assign({}, position, { body });
      return result;
    }, {});

    return Object.assign({}, chart, {
      lagna_sign: chart.lagna_sign || (lagna && lagna.sign),
      lagna_sign_index: chart.lagna_sign_index || (lagna && lagna.sign_index) || 1,
      placements,
      houses: chart.houses || [],
    });
  }

  function natalLagnaSignIndex(kundali) {
    const d1Chart = kundali?.charts?.d1;
    if (!d1Chart) return null;
    const normalizedD1 = normalizeChartPayload(d1Chart, "d1") || d1Chart;
    return Number(normalizedD1?.lagna_sign_index || normalizedD1?.lagna_sign_index === 0 ? normalizedD1.lagna_sign_index : null) || null;
  }

  function prepareGocharChart(chart, kundali) {
    if (!chart || chart.unavailable) return chart;
    const natalLagna = natalLagnaSignIndex(kundali);
    const normalized = normalizeChartPayload(chart, "gochar");
    if (!normalized) return chart;
    const gocharLagna = Number(normalized?.positions?.lagna?.sign_index || normalized?.positions?.ascendant?.sign_index || normalized?.positions?.asc?.sign_index || normalized?.lagna_sign_index || 0) || null;
    if (gocharLagna) {
      normalized.gochar_asc_sign_index = gocharLagna;
      normalized.gochar_asc_sign = signNameByIndex(gocharLagna);
    }
    if (natalLagna) {
      normalized.lagna_sign_index = natalLagna;
      normalized.lagna_sign = signNameByIndex(natalLagna);
    }
    return normalized;
  }

  function normalizeJaiminiPayload(payload) {
    if (!payload) return null;
    const source = payload.analysis || payload.data || payload.jaimini || payload;
    return source && typeof source === "object" ? source : null;
  }

  function normalizeChalitChart(chart) {
    if (!chart || chart.unavailable || !chart.placements) return chart;
    const placements = Object.keys(chart.placements || {}).reduce((result, key) => {
      const placement = chart.placements[key] || {};
      result[key] = Object.assign({}, placement, {
        house: placement.house || placement.bhava,
      });
      return result;
    }, {});
    return Object.assign({}, chart, {
      placements,
      use_house_bodies: true,
    });
  }

  function derivedAscendantBody(chartKey) {
    const map = {
      moon: "moon",
      sun: "sun",
      jupiter: "jupiter",
    };
    return map[chartKey] || "";
  }

  function buildDerivedAscendantChart(sourceChart, chartKey) {
    if (!sourceChart || sourceChart.unavailable) return { unavailable: true };
    const bodyName = derivedAscendantBody(chartKey);
    const sourcePlacements = sourceChart.placements || {};
    const anchorPlacement = findPlacementByBody(sourcePlacements, bodyName);
    const anchorSignIndex = anchorPlacement ? placementSignIndex(anchorPlacement) : null;
    if (!anchorSignIndex) return { unavailable: true };

    const placements = Object.keys(sourcePlacements).reduce((result, key) => {
      const placement = sourcePlacements[key] || {};
      const signIndex = placementSignIndex(placement);
      result[key] = Object.assign({}, placement, {
        house: signIndex ? houseFromLagnaSign(signIndex, anchorSignIndex) : placement.house,
      });
      return result;
    }, {});

    return Object.assign({}, sourceChart, {
      lagna_sign: anchorPlacement.sign || signNameByIndex(anchorSignIndex),
      lagna_sign_index: anchorSignIndex,
      houses: buildDerivedHouses(anchorSignIndex, placements),
      placements,
      derived_from: "d1",
      derived_anchor: bodyName,
    });
  }

  function buildDerivedHouses(lagnaSignIndex, placements) {
    return Array.from({ length: 12 }, (_, index) => {
      const houseNumber = index + 1;
      const signIndex = ((lagnaSignIndex + houseNumber - 2) % 12) + 1;
      const bodies = Object.values(placements || {})
        .filter((placement) => placementSignIndex(placement) === signIndex)
        .map((placement) => placement.body || placement.name || "");
      return {
        house: houseNumber,
        sign: signNameByIndex(signIndex),
        sign_index: signIndex,
        bodies,
      };
    });
  }

  function findPlacementByBody(placements, bodyName) {
    const expected = normalizePlanetName(bodyName);
    return Object.values(placements || {}).find((placement) => normalizePlanetName(placement.body || placement.name) === expected) || null;
  }

  function houseFromLagnaSign(signIndex, lagnaSignIndex) {
    return ((Number(signIndex) - Number(lagnaSignIndex) + 12) % 12) + 1;
  }

  function formatGocharCalculatedAt(value) {
    return String(value || "");
  }

  function chartTimingControlsHtml(chart, chartKey, side) {
    const kundali = state.horoscope.kundali || {};
    const rawTimestamp = chartKey === "gochar"
      ? chart?.calculated_at || kundali.chartTimes?.[side] || ""
      : (kundali.kundaliChoice === "kp-astrology" && kundali.contextAt)
        ? kundali.contextAt
        : nativeBirthIsoTimestamp(kundali.record) || formatNativeBirthTimestamp(kundali.record);
    const timestamp = formatChartDateTimeLabel(rawTimestamp);
    if (!timestamp) return "";
    return `<div class="gochar-chart-time-label">${escapeHtml(timestamp)}</div>`;
  }

  function formatChartDateTimeLabel(value) {
    const text = String(value || "").trim();
    if (!text) return "";
    const parsed = new Date(text);
    if (!Number.isNaN(parsed.getTime())) {
      return formatDatePartsLabel(
        parsed.getDate(),
        parsed.getMonth(),
        parsed.getFullYear(),
        parsed.getHours(),
        parsed.getMinutes(),
        parsed.getSeconds(),
      );
    }
    const normalized = text.replace("T", " ");
    const [datePart, timePart = "00:00:00"] = normalized.split(/\s+/);
    const parsedDate = parseNativeDate(datePart) || datePart;
    const match = parsedDate.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
    if (!match) return text;
    const [, year, month, day] = match;
    const [hour = "00", minute = "00", second = "00"] = timePart.replace(/\.\d+Z?$/, "").replace(/Z$/, "").split(":");
    return formatDatePartsLabel(Number(day), Number(month) - 1, Number(year), Number(hour), Number(minute), Number(second));
  }

  function formatDatePartsLabel(day, monthIndex, year, hour, minute, second) {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${String(day).padStart(2, "0")}-${monthNames[monthIndex] || "Jan"}-${year} ${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}:${String(second).padStart(2, "0")}`;
  }

  function formatNativeBirthTimestamp(record) {
    if (!record) return "";
    const date = record.date || record.dob || record.birth_date || "";
    const time = record.time || record.birth_time || "";
    return [date, time].filter(Boolean).join(" ");
  }

  function nativeBirthIsoTimestamp(record) {
    if (!record) return "";
    const rawDate = record.date || record.dob || record.birth_date || "";
    const rawTime = record.time || record.birth_time || "00:00:00";
    const parsedDate = parseNativeDate(rawDate);
    if (!parsedDate) return "";
    const time = String(rawTime).slice(0, 8).padEnd(8, "0");
    return `${parsedDate}T${time}`;
  }

  function parseNativeDate(value) {
    const text = String(value || "").trim();
    if (!text) return "";
    if (/^\d{4}-\d{2}-\d{2}$/.test(text)) return text;
    const match = text.match(/^(\d{1,2})-([A-Za-z]{3})-(\d{4})$/);
    if (!match) return "";
    const month = {
      jan: "01",
      feb: "02",
      mar: "03",
      apr: "04",
      may: "05",
      jun: "06",
      jul: "07",
      aug: "08",
      sep: "09",
      oct: "10",
      nov: "11",
      dec: "12",
    }[match[2].toLowerCase()];
    return month ? `${match[3]}-${month}-${match[1].padStart(2, "0")}` : "";
  }

  function gocharStepOptions(selectedStep) {
    return [
      ["week", "1 Week"],
      ["hour", "1 Hour"],
      ["day", "1 Day"],
      ["month", "1 Month"],
      ["year", "1 Year"],
      ["5year", "5 Years"],
    ]
      .map(([value, label]) => `<option value="${value}" ${selectedStep === value ? "selected" : ""}>${label}</option>`)
      .join("");
  }

  function northIndianSvgHtml(houses, markers = [], showPlanets = true, chartKey = "") {
    const showDebugSlots = false;
    const layout = {
      1: { sign: [50, 36], primary: [36, 28, 28, 7, "horizontal"], overflow: [40, 20, 20, 6, "horizontal"] },
      2: { sign: [26, 18], primary: [10, 4, 31, 6, "horizontal"], overflow: [17, 13, 20, 5, "horizontal"] },
      3: { sign: [17, 25], primary: [3, 18, 7, 29, "vertical"], overflow: [11, 23, 13, 14, "horizontal"] },
      4: { sign: [39, 49], primary: [10, 46, 28, 7, "horizontal"], overflow: [17, 56, 20, 6, "horizontal"] },
      5: { sign: [17, 75], primary: [3, 60, 7, 29, "vertical"], overflow: [11, 75, 13, 14, "horizontal"] },
      6: { sign: [26, 82], primary: [9, 91, 31, 5, "horizontal"], overflow: [16, 83, 18, 5, "horizontal"] },
      7: { sign: [50, 64], primary: [34, 70, 32, 6, "horizontal"], overflow: [40, 78, 20, 6, "horizontal"] },
      8: { sign: [74, 82], primary: [60, 91, 31, 5, "horizontal"], overflow: [66, 83, 18, 5, "horizontal"] },
      9: { sign: [84, 75], primary: [90, 60, 7, 29, "vertical"], overflow: [76, 75, 13, 14, "horizontal"] },
      10: { sign: [62, 49], primary: [62, 46, 28, 7, "horizontal"], overflow: [63, 56, 20, 6, "horizontal"] },
      11: { sign: [84, 30], primary: [90, 8, 7, 29, "vertical"], overflow: [76, 13, 13, 14, "horizontal"] },
      12: { sign: [74, 18], primary: [59, 4, 31, 6, "horizontal"], overflow: [66, 13, 20, 5, "horizontal"] },
    };

    return `
      <svg class="north-diamond-chart" viewBox="0 0 100 100" preserveAspectRatio="none" role="img" aria-label="${t("horoscope.northIndian")}">
        <rect x="1" y="1" width="98" height="98" fill="#ffffff" stroke="#155b96" stroke-width="1.2"/>
        <polygon points="50,2 98,50 50,98 2,50" fill="#f7fbff" stroke="#155b96" stroke-width="1.1"/>
        <line x1="1" y1="1" x2="99" y2="99" stroke="#155b96" stroke-width="0.8"/>
        <line x1="99" y1="1" x2="1" y2="99" stroke="#155b96" stroke-width="0.8"/>
        ${houses
          .map((house) => {
            const slot = layout[Number(house.house)];
            if (!slot) return "";
            const houseMarkers = markers.filter((marker) => Number(marker.sign_index) === Number(house.sign_index));
            return `
              <g class="house-hit-zone" data-house-number="${escapeHtml(house.house)}" data-house-sign="${escapeHtml(house.sign)}" data-house-sign-index="${escapeHtml(house.sign_index)}" data-house-chart-key="${escapeHtml(chartKey)}">
                <rect x="${slot.sign[0] - 6}" y="${slot.sign[1] - 6}" width="12" height="12" fill="transparent" />
                <text x="${slot.sign[0]}" y="${slot.sign[1]}" text-anchor="middle" class="house-sign">${escapeHtml(house.sign_index ?? "-")}</text>
              </g>
              ${showDebugSlots ? debugSlotHtml(slot) : ""}
              ${houseMarkers.length ? markerSlotHtml(houseMarkers, slot) : ""}
              ${showPlanets ? planetSlotHtml(house.bodies || [], slot) : ""}
            `;
          })
          .join("")}
      </svg>
    `;
  }

  function planetSlotHtml(bodies, slot) {
    if (!bodies.length) return "";
    const primary = bodies.slice(0, 3);
    const overflow = bodies.slice(3);
    const primaryHtml = slotTextHtml(primary, slot.primary, "house-planets");
    const overflowHtml = overflow.length ? slotTextHtml(overflow, slot.overflow, "house-planets overflow-planets") : "";
    return `${primaryHtml}${overflowHtml}`;
  }

  function markerSlotHtml(markers, slot) {
    const primary = markers.slice(0, 3);
    const overflow = markers.slice(3);
    const primaryHtml = slotLabelHtml(primary, slot.primary, "house-markers");
    const overflowHtml = overflow.length ? slotLabelHtml(overflow, slot.overflow, "house-markers overflow-markers") : "";
    return `${primaryHtml}${overflowHtml}`;
  }

  function slotLabelHtml(items, slot, className) {
    const [x, y, width, height, orientation] = slot;
    return orientation === "vertical"
      ? verticalMarkerGroupHtml(items, x, y, width, height, className)
      : horizontalMarkerGroupHtml(items, x, y, width, height, className);
  }

  function horizontalMarkerGroupHtml(items, x, y, width, height, className) {
    const step = width / Math.max(items.length, 1);
    return items
      .map((marker, index) => markerTextHtml(marker, x + step * index + step / 2, y + height / 2 + 1.2, "middle", className))
      .join("");
  }

  function verticalMarkerGroupHtml(items, x, y, width, height, className) {
    const step = height / Math.max(items.length, 1);
    return items
      .map((marker, index) => markerTextHtml(marker, x + width / 2, y + step * index + step / 2 + 1, "middle", `${className} vertical-planets`))
      .join("");
  }

  function markerTextHtml(marker, x, y, anchor = "middle", className = "house-markers") {
    return `
      <text x="${x}" y="${y}" text-anchor="${anchor}" class="${className} planet-tooltip-target" data-planet-tooltip="${escapeHtml(marker.tooltip || marker.lagna_key || marker.pada_key || marker.key || "")}">
        <tspan class="planet-default">${escapeHtml(marker.lagna_key || marker.pada_key || marker.key || "-")}</tspan>
      </text>
    `;
  }

  function slotTextHtml(planets, slot, className) {
    const [x, y, width, height, orientation] = slot;
    return orientation === "vertical" ? verticalPlanetGroupHtml(planets, x, y, width, height, className) : horizontalPlanetGroupHtml(planets, x, y, width, height, className);
  }

  function horizontalPlanetGroupHtml(planets, x, y, width, height, className) {
    const limitedPlanets = planets.slice(0, 4);
    const step = width / limitedPlanets.length;
    return limitedPlanets
      .map((planet, index) => planetTextHtml(planet, x + step * index + step / 2, y + height / 2 + 1.4, "middle", className))
      .join("");
  }

  function verticalPlanetGroupHtml(planets, x, y, width, height, className) {
    const limitedPlanets = planets.slice(0, 4);
    const step = height / limitedPlanets.length;
    return limitedPlanets
      .map((planet, index) => planetTextHtml(planet, x + width / 2, y + step * index + step / 2 + 1.2, "middle", `${className} vertical-planets`))
      .join("");
  }

  function debugSlotHtml(slot) {
    return [slot.primary, slot.overflow]
      .map(([x, y, width, height], index) => `<rect x="${x}" y="${y}" width="${width}" height="${height}" class="${index === 0 ? "debug-primary-slot" : "debug-overflow-slot"}"/>`)
      .join("");
  }

  function planetTextHtml(planet, x, y, anchor = "middle", className = "house-planets") {
    const degree = planetDegreeLabel(planet.degree);
    return `
      <text x="${x}" y="${y}" text-anchor="${anchor}" class="${className} planet-tooltip-target" data-planet-tooltip="${escapeHtml(planet.tooltip || planet.abbr)}">
        <tspan class="${escapeHtml(planet.colorClass)}">${escapeHtml(planet.abbr)}</tspan>${degree ? `<tspan class="planet-degree ${escapeHtml(planet.colorClass)}" dx="0.4" dy="-1.8">${escapeHtml(degree)}&#176;</tspan>` : ""}
      </text>
    `;
  }

  function planetDisplayData(placement, planetStatus) {
    const name = placement.body || placement.name || "";
    const status = planetStatusForName(name, planetStatus);
    return {
      abbr: planetDisplayLabel(name, planetStatus),
      degree: placement.degree_in_sign ?? placement.degree ?? placement.longitude_in_sign,
      colorClass: planetColorClass(name),
      tooltip: planetTooltipText(placement, status),
    };
  }

  function ascendantDisplayData(placements, sourceHouse) {
    const ascendant = placements.find(isAscendantPlacement);
    if (ascendant) {
      return planetDisplayData(ascendant);
    }
    const sourceBodies = Array.isArray(sourceHouse.bodies) ? sourceHouse.bodies : [];
    const hasAscendant = sourceBodies.some((body) => isAscendantPlacement({ body }));
    return hasAscendant ? { abbr: "Asc", degree: "", colorClass: "planet-default", tooltip: "Ascendant" } : null;
  }

  function placementSignIndex(placement) {
    const signIndex = placement.sign_index ?? placement.varga_sign_index ?? placement.d3_sign_index ?? placement.drekkana_sign_index ?? placement.navamsa_sign_index ?? placement.rasi_sign_index;
    const numeric = Number(signIndex);
    return Number.isNaN(numeric) ? null : numeric;
  }

  function placementBelongsToHouse(placement, houseNumber, signIndex, useSignForAscendant = false) {
    if (isAscendantPlacement(placement) && !useSignForAscendant) {
      return houseNumber === 1;
    }
    return placementSignIndex(placement) === signIndex;
  }

  function buildJaiminiMarkers(jaiminiPayload) {
    const source = normalizeJaiminiPayload(jaiminiPayload);
    if (!source) return [];
    const markers = [];
    extractJaiminiCandidates(source).forEach((candidate) => {
      const signIndex = jaiminiCandidateSignIndex(candidate);
      const displayKey =
        candidate.lagna_key ||
        candidate.lagnaKey ||
        candidate.pada_key ||
        candidate.padaKey ||
        candidate.key ||
        candidate.label ||
        candidate.name;
      if (!signIndex || !displayKey) return;
      markers.push({
        lagna_key: String(displayKey),
        pada_key: String(candidate.pada_key || candidate.padaKey || displayKey),
        sign_index: signIndex,
        tooltip: humanizeKey(displayKey),
      });
    });
    return markers;
  }

  function extractJaiminiCandidates(source) {
    const result = [];
    const walk = (value, keyHint = "") => {
      if (!value) return;
      if (Array.isArray(value)) {
        value.forEach((item, index) => walk(item, `${keyHint}${index + 1}`));
        return;
      }
      if (typeof value !== "object") return;
      if (hasJaiminiMarkerShape(value)) {
        result.push(Object.assign({ key: keyHint }, value));
        return;
      }
      Object.entries(value).forEach(([key, child]) => {
        if (key === "special_lagnas" && child && typeof child === "object") {
          Object.entries(child).forEach(([lagnaKey, lagnaValue]) => {
            if (lagnaValue && typeof lagnaValue === "object") {
              result.push(Object.assign({ key: lagnaKey, lagna_key: lagnaKey }, lagnaValue));
            } else {
              result.push({ key: lagnaKey, lagna_key: lagnaKey, sign_index: lagnaValue });
            }
          });
          return;
        }
        if (/^(a\d{1,2}|arudha_lagna|upapada_lagna|gulika|mandi)$/i.test(key)) {
          if (child && typeof child === "object") {
            result.push(Object.assign({ key }, child));
          } else {
            result.push({ key, sign_index: child, pada_key: key });
          }
          return;
        }
        walk(child, key);
      });
    };
    walk(source);
    return result;
  }

  function hasJaiminiMarkerShape(value) {
    return (
      "sign_index" in value ||
      "signIndex" in value ||
      "rashi_index" in value ||
      "rashiIndex" in value ||
      "sign" in value ||
      "rashi" in value ||
      "pada_key" in value ||
      "padaKey" in value ||
      "lagna_key" in value ||
      "lagnaKey" in value
    );
  }

  function jaiminiCandidateSignIndex(candidate) {
    const direct = candidate.sign_index ?? candidate.signIndex ?? candidate.rashi_index ?? candidate.rashiIndex;
    const numeric = Number(direct);
    if (!Number.isNaN(numeric) && numeric >= 1 && numeric <= 12) return numeric;
    return signIndexFromName(candidate.sign ?? candidate.rashi ?? candidate.rashi_name ?? candidate.sign_name);
  }

  function signIndexFromName(value) {
    const normalized = normalizeAstrologyValue(value);
    const map = {
      aries: 1,
      taurus: 2,
      gemini: 3,
      cancer: 4,
      leo: 5,
      virgo: 6,
      libra: 7,
      scorpio: 8,
      sagittarius: 9,
      capricorn: 10,
      aquarius: 11,
      pisces: 12,
    };
    return map[normalized] || null;
  }

  function isAscendantPlacement(placement) {
    const name = String(placement.body || placement.name || "").toLowerCase();
    return name === "ascendant" || name === "asc" || name === "lagna";
  }

  function planetPlainLabel(planet) {
    const degree = planetDegreeLabel(planet.degree);
    return `${planet.abbr}${degree ? " " + degree + " deg" : ""}`;
  }

  function planetDegreeLabel(value) {
    if (value === null || value === undefined || value === "") return "";
    const numeric = Number(value);
    if (Number.isNaN(numeric)) return "";
    return String(Math.round(numeric));
  }

  function formatDecimal(value) {
    if (value === null || value === undefined || value === "") return "-";
    const numeric = Number(value);
    return Number.isNaN(numeric) ? String(value) : numeric.toFixed(4);
  }

  function formatJhoraLongitude(placement) {
    const longitude = Number(placement.longitude);
    if (Number.isNaN(longitude)) return "-";
    const signIndex = longitudeSignIndex(longitude);
    const signName = signSanskritName(signIndex);
    const degreeInSign = Number(placement.degree_in_sign);
    const normalizedDegree = Number.isNaN(degreeInSign) ? positiveModulo(longitude, 30) : degreeInSign;
    const degrees = Math.floor(normalizedDegree);
    const minuteFloat = (normalizedDegree - degrees) * 60;
    const minutes = Math.floor(minuteFloat);
    const seconds = (minuteFloat - minutes) * 60;
    return `${degrees} ${signName} ${String(minutes).padStart(2, "0")}' ${seconds.toFixed(2)}"`;
  }

  function planetTooltipText(placement, status) {
    const dignity = status && status.dignity ? status.dignity : {};
    const combustion = status && status.combustion ? status.combustion : {};
    const vargottama = status && status.vargottama ? status.vargottama : {};
    const rows = [
      [localizeAstrologyLabel("Planet"), planetFullName(placement.body || placement.name)],
      [localizeAstrologyLabel("Longitude"), formatJhoraLongitude(placement)],
      [localizeAstrologyLabel("Rashi"), localizeSign(placement.sign || placement.varga_sign || placement.d3_sign || placement.drekkana_sign || placement.navamsa_sign || placement.rasi_sign)],
      [localizeAstrologyLabel("House"), placement.house],
      [localizeAstrologyLabel("Nakshatra"), localizeNakshatra(placement.nakshatra)],
      [localizeAstrologyLabel("Pada"), placement.pada],
      [localizeAstrologyLabel("Retrograde"), status ? yesNo(status.retrograde) : placement.retrograde === true ? yesNo(true) : placement.retrograde === false ? yesNo(false) : ""],
      [localizeAstrologyLabel("Combust"), status ? yesNo(combustion.is_combust) : ""],
      [localizeAstrologyLabel("Vargottama"), status ? yesNo(vargottama.is_vargottama_d9) : ""],
      [localizeAstrologyLabel("Uccha"), status ? yesNo(dignity.is_exalted) : ""],
      [localizeAstrologyLabel("Nich"), status ? yesNo(dignity.is_debilitated) : ""],
      [localizeAstrologyLabel("Mooltrikona"), status ? yesNo(dignity.is_moolatrikona) : ""],
    ];
    return rows
      .filter(([, value]) => value !== null && value !== undefined && value !== "")
      .map(([label, value]) => `${label}: ${value}`)
      .join("\n");
  }

  function longitudeSignIndex(longitude) {
    return Math.floor(positiveModulo(longitude, 360) / 30) + 1;
  }

  function positiveModulo(value, divisor) {
    return ((value % divisor) + divisor) % divisor;
  }

  function signSanskritName(signIndex) {
    const signs = ["Mesh", "Vrish", "Mith", "Kark", "Simha", "Kanya", "Tula", "Vrischik", "Dhanu", "Makar", "Kumbh", "Meen"];
    return localizeSign(signs[signIndex - 1]) || String(signIndex);
  }

  function planetColorClass(name) {
    const normalized = String(name || "").toLowerCase();
    if (["sun", "surya", "mars", "mangal", "saturn", "shani", "rahu", "ketu"].includes(normalized)) {
      return "planet-red";
    }
    return "planet-green";
  }

  function planetAbbreviation(name) {
    const normalized = normalizePlanetName(name);
    const map = state.language === "mr" ? {
      ascendant: "लग्न",
      asc: "लग्न",
      lagna: "लग्न",
      sun: "सू",
      moon: "चं",
      mars: "मं",
      mercury: "बु",
      jupiter: "गु",
      guru: "गु",
      venus: "शु",
      saturn: "श",
      rahu: "रा",
      ketu: "के",
    } : {
      ascendant: "Asc",
      asc: "Asc",
      lagna: "Asc",
      sun: "Su",
      moon: "Mo",
      mars: "Ma",
      mercury: "Me",
      jupiter: "Ju",
      guru: "Ju",
      venus: "Ve",
      saturn: "Sa",
      rahu: "Ra",
      ketu: "Ke",
    };
    return map[normalized] || String(name || "").slice(0, 3);
  }

  function planetDisplayLabel(name, planetStatus) {
    return `${planetStatusSymbols(planetStatusForName(name, planetStatus))}${planetAbbreviation(name)}`;
  }

  function planetFullDisplayLabel(name, planetStatus) {
    return `${planetStatusSymbols(planetStatusForName(name, planetStatus))}${planetFullName(name)}`;
  }

  function planetFullName(name) {
    const normalized = normalizePlanetName(name);
    const englishMap = {
      ascendant: "Ascendant",
      asc: "Ascendant",
      lagna: "Ascendant",
      sun: "Sun",
      moon: "Moon",
      mars: "Mars",
      mercury: "Mercury",
      jupiter: "Jupiter",
      guru: "Jupiter",
      venus: "Venus",
      saturn: "Saturn",
      rahu: "Rahu",
      ketu: "Ketu",
    };
    const marathiMap = {
      ascendant: "लग्न",
      asc: "लग्न",
      lagna: "लग्न",
      sun: "सूर्य",
      moon: "चंद्र",
      mars: "मंगळ",
      mercury: "बुध",
      jupiter: "गुरु",
      guru: "गुरु",
      venus: "शुक्र",
      saturn: "शनि",
      rahu: "राहू",
      ketu: "केतू",
    };
    const map = state.language === "mr" ? marathiMap : englishMap;
    return map[normalized] || String(name || "");
  }

  function planetStatusForName(name, planetStatus) {
    if (!planetStatus) return null;
    const key = normalizePlanetName(name);
    return planetStatus[key] || null;
  }

  function planetStatusSymbols(status) {
    if (!status) return "";
    const dignity = status.dignity || {};
    const combustion = status.combustion || {};
    const vargottama = status.vargottama || {};
    return [
      status.retrograde ? "*" : "",
      combustion.is_combust ? "^" : "",
      vargottama.is_vargottama_d9 ? "\u25a1" : "",
      dignity.is_exalted ? "\u2191" : "",
      dignity.is_debilitated ? "\u2193" : "",
      dignity.is_moolatrikona ? "$" : "",
    ].join("");
  }

  function normalizePlanetName(name) {
    const normalized = String(name || "").trim().toLowerCase();
    const map = {
      asc: "lagna",
      ascendant: "lagna",
      lagna: "lagna",
      su: "sun",
      surya: "sun",
      mo: "moon",
      chandra: "moon",
      ma: "mars",
      mangal: "mars",
      me: "mercury",
      budha: "mercury",
      ju: "jupiter",
      guru: "jupiter",
      ve: "venus",
      shukra: "venus",
      sa: "saturn",
      shani: "saturn",
      ra: "rahu",
      ke: "ketu",
      ur: "uranus",
      ura: "uranus",
      nep: "neptune",
      plu: "pluto",
    };
    return map[normalized] || normalized;
  }

  function localizeSign(value) {
    if (!value) return "";
    if (state.language !== "mr") return String(value);
    const map = {
      aries: "मेष",
      mesh: "मेष",
      mesha: "मेष",
      taurus: "वृषभ",
      vrish: "वृषभ",
      vrishabha: "वृषभ",
      gemini: "मिथुन",
      mith: "मिथुन",
      mithuna: "मिथुन",
      cancer: "कर्क",
      kark: "कर्क",
      karka: "कर्क",
      leo: "सिंह",
      simha: "सिंह",
      virgo: "कन्या",
      kanya: "कन्या",
      libra: "तुला",
      tula: "तुला",
      scorpio: "वृश्चिक",
      vrischik: "वृश्चिक",
      vrischika: "वृश्चिक",
      sagittarius: "धनु",
      dhanu: "धनु",
      capricorn: "मकर",
      makar: "मकर",
      makara: "मकर",
      aquarius: "कुंभ",
      kumbh: "कुंभ",
      kumbha: "कुंभ",
      pisces: "मीन",
      meen: "मीन",
      meena: "मीन",
    };
    return map[normalizeAstrologyValue(value)] || String(value);
  }

  function localizeNakshatra(value) {
    if (!value) return "";
    if (state.language !== "mr") return String(value);
    const map = {
      ashwini: "अश्विनी",
      aswini: "अश्विनी",
      bharani: "भरणी",
      krittika: "कृत्तिका",
      kritika: "कृत्तिका",
      rohini: "रोहिणी",
      mrigashira: "मृगशीर्ष",
      mrigashirsha: "मृगशीर्ष",
      ardra: "आर्द्रा",
      arudra: "आर्द्रा",
      punarvasu: "पुनर्वसु",
      pushya: "पुष्य",
      pushyami: "पुष्य",
      ashlesha: "आश्लेषा",
      aslesha: "आश्लेषा",
      magha: "मघा",
      purvaphalguni: "पूर्वा फाल्गुनी",
      poorvaphalguni: "पूर्वा फाल्गुनी",
      purvafalguni: "पूर्वा फाल्गुनी",
      "uttara phalguni": "उत्तरा फाल्गुनी",
      uttaraphalguni: "उत्तरा फाल्गुनी",
      uttarafalguni: "उत्तरा फाल्गुनी",
      hasta: "हस्त",
      chitra: "चित्रा",
      swati: "स्वाती",
      svati: "स्वाती",
      vishakha: "विशाखा",
      visakha: "विशाखा",
      anuradha: "अनुराधा",
      jyeshtha: "ज्येष्ठा",
      jyestha: "ज्येष्ठा",
      mula: "मूळ",
      moola: "मूळ",
      purvaashadha: "पूर्वाषाढा",
      purvashadha: "पूर्वाषाढा",
      poorvashadha: "पूर्वाषाढा",
      uttaraashadha: "उत्तराषाढा",
      uttarashadha: "उत्तराषाढा",
      shravana: "श्रवण",
      sravana: "श्रवण",
      dhanishta: "धनिष्ठा",
      shatabhisha: "शतभिषा",
      shatabhishak: "शतभिषा",
      satabhisha: "शतभिषा",
      purvabhadrapada: "पूर्वा भाद्रपदा",
      poorvabhadrapada: "पूर्वा भाद्रपदा",
      "uttara bhadrapada": "उत्तरा भाद्रपदा",
      uttarabhadrapada: "उत्तरा भाद्रपदा",
      revati: "रेवती",
    };
    const normalized = normalizeAstrologyValue(value);
    return map[normalized] || map[normalized.replace(/\s+/g, "")] || String(value);
  }

  function localizeAstrologyLabel(label) {
    if (state.language !== "mr") return label;
    const map = {
      Planet: "ग्रह",
      Longitude: "रेखांश",
      Rashi: "राशी",
      House: "स्थान",
      Nakshatra: "नक्षत्र",
      Pada: "पाद",
      Retrograde: "वक्री",
      Combust: "अस्त",
      Vargottama: "वर्गोत्तम",
      Uccha: "उच्च",
      Nich: "नीच",
      Mooltrikona: "मूलत्रिकोण",
    };
    return map[label] || label;
  }

  function localizeReferenceLabel(label) {
    if (state.language !== "mr") return label;
    const map = {
      Lord: "स्वामी",
      Deity: "देवता",
      Gana: "गण",
      Nature: "स्वभाव",
      Symbol: "चिन्ह",
      Yoni: "योनी",
      Nadi: "नाडी",
      Purpose: "पुरुषार्थ",
      Span: "अंश विस्तार",
      Pada: "पाद",
    };
    return map[label] || label;
  }

  function localizeReferenceValue(type, value) {
    if (!value) return "";
    if (state.language !== "mr") return String(value);
    if (type === "lord") return planetFullName(value);
    const normalized = normalizeAstrologyValue(value);
    const map = {
      "ashwini kumaras": "अश्विनी कुमार",
      yama: "यम",
      agni: "अग्नी",
      prajapati: "प्रजापती",
      soma: "सोम",
      rudra: "रुद्र",
      aditi: "अदिती",
      brihaspati: "बृहस्पती",
      nagas: "नाग",
      pitris: "पितर",
      bhaga: "भग",
      aryaman: "अर्यमन",
      savitar: "सविता",
      tvastar: "त्वष्टा",
      vayu: "वायू",
      "indra agni": "इंद्र-अग्नी",
      mitra: "मित्र",
      indra: "इंद्र",
      nirriti: "निरृती",
      apas: "आप",
      vishwadevas: "विश्वदेव",
      vishnu: "विष्णू",
      vasus: "वसु",
      varuna: "वरुण",
      "aja ekapada": "अज एकपाद",
      "ahir budhnya": "अहिर बुध्न्य",
      pushan: "पूषा",
      deva: "देव",
      manushya: "मनुष्य",
      rakshasa: "राक्षस",
      urdhva: "ऊर्ध्व",
      adho: "अधो",
      tiryak: "तिर्यक",
      dhruva: "ध्रुव",
      sthira: "स्थिर",
      fixed: "स्थिर",
      "fixed / stable": "स्थिर",
      chara: "चर",
      chala: "चल",
      movable: "चल",
      "movable / active": "चल / सक्रिय",
      ugra: "उग्र",
      krura: "क्रूर",
      cruel: "क्रूर",
      "fierce / harsh": "तीव्र / कठोर",
      mishra: "मिश्र",
      sadharana: "साधारण",
      ordinary: "साधारण",
      "mixed / ordinary": "मिश्र / साधारण",
      kshipra: "क्षिप्र",
      laghu: "लघु",
      short: "लघु",
      "swift / light": "शीघ्र / हलका",
      mridu: "मृदु",
      maitra: "मैत्र",
      gentle: "मृदु",
      "soft / friendly": "मृदु / मैत्रीपूर्ण",
      tikshna: "तीक्ष्ण",
      daruna: "दारुण",
      ferocious: "उग्र",
      "sharp / intense": "तीक्ष्ण / तीव्र",
      "horse head": "घोड्याचे डोके",
      yoni: "योनी",
      razor: "वस्तरा",
      cart: "रथ",
      "deer head": "हरिणाचे डोके",
      teardrop: "अश्रू",
      quiver: "भाता",
      "cow udder": "गायीचे स्तन",
      "coiled serpent": "गुंडाळलेला सर्प",
      throne: "सिंहासन",
      "front legs of bed": "खाटेचे पुढचे पाय",
      "back legs of bed": "खाटेचे मागचे पाय",
      hand: "हात",
      jewel: "रत्न",
      "young sprout": "कोवळा अंकुर",
      "triumphal arch": "विजय तोरण",
      lotus: "कमळ",
      earring: "कुंडल",
      roots: "मुळे",
      fan: "पंखा",
      "elephant tusk": "हत्तीचा सुळा",
      ear: "कान",
      drum: "ढोल",
      "empty circle": "रिक्त वर्तुळ",
      "front legs of funeral cot": "अंत्यखाटेचे पुढचे पाय",
      "back legs of funeral cot": "अंत्यखाटेचे मागचे पाय",
      fish: "मासा",
      horse: "घोडा",
      elephant: "हत्ती",
      sheep: "मेंढा",
      serpent: "सर्प",
      dog: "कुत्रा",
      cat: "मांजर",
      rat: "उंदीर",
      cow: "गाय",
      buffalo: "म्हैस",
      tiger: "वाघ",
      deer: "हरिण",
      monkey: "माकड",
      mongoose: "मुंगूस",
      lion: "सिंह",
      adi: "आदि",
      madhya: "मध्य",
      antya: "अंत्य",
      vaishya: "वैश्य",
      shudra: "शूद्र",
      brahmin: "ब्राह्मण",
      kshatriya: "क्षत्रिय",
      servant: "सेवक",
      butcher: "खाटीक",
      outcaste: "बहिष्कृत",
      male: "पुरुष",
      female: "स्त्री",
      neutral: "नपुंसक",
      dharma: "धर्म",
      artha: "अर्थ",
      kama: "काम",
      moksha: "मोक्ष",
    };
    return map[normalized] || String(value);
  }

  function normalizeAstrologyValue(value) {
    return String(value || "")
      .trim()
      .toLowerCase()
      .replace(/[_-]+/g, " ")
      .replace(/\s+/g, " ");
  }

  function yesNo(value) {
    if (value === true) return state.language === "mr" ? "होय" : "Yes";
    if (value === false) return state.language === "mr" ? "नाही" : "No";
    return "";
  }

  function signNameByIndex(signIndex) {
    const signs = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];
    return localizeSign(signs[signIndex - 1]) || String(signIndex);
  }

  function chartHouseHtml(house) {
    return `
      <div class="north-house">
        <span>${escapeHtml(house.house ?? "-")}</span>
        <strong>${escapeHtml(house.sign || "-")}</strong>
        <small>${escapeHtml((house.bodies || []).map(planetPlainLabel).join(", ") || "-")}</small>
      </div>
    `;
  }

  function saveLocationHtml() {
    const location = state.locationPreference;
    const selectedCity = selectedLocationCity();
    const canSave = selectedCity && selectedCity.latitude !== null && selectedCity.latitude !== undefined && selectedCity.longitude !== null && selectedCity.longitude !== undefined;

    return `
      <main class="page-content">
        <section class="feature-panel compact-panel">
          <div>
            <p class="eyebrow">${t("dashboard.quickActions")}</p>
            <h1>${t("location.title")}</h1>
          </div>
          <button class="ghost-button light-button" data-route="dashboard" type="button">${t("location.back")}</button>
        </section>

        <section class="location-panel">
          <div class="location-form-grid">
            <label>
              <span>${t("location.country")}</span>
              <select id="countrySelect" ${location.isLoadingCountries ? "disabled" : ""}>
                <option value="">${location.isLoadingCountries ? t("common.loading") : t("location.selectCountry")}</option>
                ${location.countries
                  .map((country) => `<option value="${escapeHtml(country.country_code)}" ${location.selectedCountryCode === country.country_code ? "selected" : ""}>${escapeHtml(country.country_name)}</option>`)
                  .join("")}
              </select>
            </label>

            <label>
              <span>${t("location.state")}</span>
              <select id="stateSelect" ${!location.selectedCountryCode || location.isLoadingStates ? "disabled" : ""}>
                <option value="">${location.isLoadingStates ? t("common.loading") : t("location.selectState")}</option>
                ${location.states
                  .map((item) => `<option value="${escapeHtml(item.state_code || item.state_name)}" ${location.selectedStateCode === (item.state_code || item.state_name) ? "selected" : ""}>${escapeHtml(item.state_name)}</option>`)
                  .join("")}
              </select>
            </label>

            <label>
              <span>${t("location.city")}</span>
              <select id="citySelect" ${!location.selectedStateCode || location.isLoadingCities ? "disabled" : ""}>
                <option value="">${location.isLoadingCities ? t("common.loading") : t("location.selectCity")}</option>
                ${location.cities
                  .map((city, index) => `<option value="${index}" ${location.selectedCityKey === String(index) ? "selected" : ""}>${escapeHtml(city.city_name)}</option>`)
                  .join("")}
              </select>
            </label>
          </div>

          <div class="coordinate-grid">
            <div class="coordinate-label">
              <span>${t("location.latitude")}</span>
              <strong>${selectedCity && selectedCity.latitude !== null && selectedCity.latitude !== undefined ? escapeHtml(selectedCity.latitude) : "-"}</strong>
            </div>
            <div class="coordinate-label">
              <span>${t("location.longitude")}</span>
              <strong>${selectedCity && selectedCity.longitude !== null && selectedCity.longitude !== undefined ? escapeHtml(selectedCity.longitude) : "-"}</strong>
            </div>
          </div>

          ${location.error ? `<div class="form-error">${escapeHtml(location.error)}</div>` : ""}
          ${location.message ? `<div class="form-success">${escapeHtml(location.message)}</div>` : ""}

          <div class="form-actions">
            <button class="ghost-button" data-route="dashboard" type="button">${t("location.back")}</button>
            <button class="primary-button" id="saveLocationButton" type="button" ${!canSave || location.isSaving ? "disabled" : ""}>
              ${location.isSaving ? t("location.saving") : t("location.save")}
            </button>
          </div>
        </section>
      </main>
    `;
  }

  function attachSaveLocationHandlers() {
    if (state.route !== "save-location") {
      return;
    }

    const countrySelect = app.querySelector("#countrySelect");
    const stateSelect = app.querySelector("#stateSelect");
    const citySelect = app.querySelector("#citySelect");
    const saveButton = app.querySelector("#saveLocationButton");

    if (countrySelect) {
      countrySelect.addEventListener("change", () => loadStates(countrySelect.value));
    }
    if (stateSelect) {
      stateSelect.addEventListener("change", () => loadCities(stateSelect.value));
    }
    if (citySelect) {
      citySelect.addEventListener("change", () => {
        state.locationPreference.selectedCityKey = citySelect.value;
        state.locationPreference.message = "";
        state.locationPreference.error = "";
        render();
      });
    }
    if (saveButton) {
      saveButton.addEventListener("click", saveLocationPreference);
    }
  }

  function attachHoroscopeHandlers() {
    if (state.route !== "horoscope") {
      return;
    }

    const newButton = app.querySelector("#newHoroscopeButton");
    const cancelButton = app.querySelector("#cancelHoroscopeButton");
    const saveButton = app.querySelector("#saveHoroscopeButton");
    const prevButton = app.querySelector("#prevHoroscopePage");
    const nextButton = app.querySelector("#nextHoroscopePage");
    const pageSizeSelect = app.querySelector("#horoscopePageSize");
    const closeViewButton = app.querySelector("#closeHoroscopeView");
    const closeKundaliButton = app.querySelector("#closeKundaliView");

    if (newButton) {
      newButton.addEventListener("click", () => {
        state.horoscope.mode = "create";
        state.horoscope.editingId = null;
        state.horoscope.form = defaultHoroscopeForm();
        state.horoscope.message = "";
        state.horoscope.error = "";
        state.horoscope.view = null;
        render();
        loadSavedCities();
      });
    }
    if (cancelButton) {
      cancelButton.addEventListener("click", () => {
        state.horoscope.mode = "list";
        state.horoscope.editingId = null;
        state.horoscope.form = defaultHoroscopeForm();
        state.horoscope.error = "";
        state.horoscope.view = null;
        render();
      });
    }
    if (saveButton) {
      saveButton.addEventListener("click", saveHoroscope);
    }
    if (prevButton) {
      prevButton.addEventListener("click", () => {
        if (state.horoscope.page > 1) {
          state.horoscope.page -= 1;
          loadHoroscopePage();
        }
      });
    }
    if (nextButton) {
      nextButton.addEventListener("click", () => {
        state.horoscope.page += 1;
        loadHoroscopePage();
      });
    }
    if (pageSizeSelect) {
      pageSizeSelect.addEventListener("change", () => {
        state.horoscope.pageSize = Number(pageSizeSelect.value);
        state.horoscope.page = 1;
        loadHoroscopePage();
      });
    }
    if (closeViewButton) {
      closeViewButton.addEventListener("click", () => {
        state.horoscope.mode = "list";
        state.horoscope.view = null;
        render();
      });
    }
    if (closeKundaliButton) {
      closeKundaliButton.addEventListener("click", () => {
        state.horoscope.mode = "list";
        state.horoscope.kundali = null;
        render();
      });
    }
    app.querySelectorAll(".chart-picker-button").forEach((button) => {
      button.addEventListener("click", (event) => {
        event.stopPropagation();
        const picker = button.closest(".chart-picker");
        if (picker?.dataset.chartPickerDisabled === "true" || button.disabled) return;
        const isOpen = picker.classList.contains("open");
        closeChartPickers();
        if (!isOpen) {
          picker.classList.add("open");
          button.setAttribute("aria-expanded", "true");
        }
      });
    });
    app.querySelectorAll("[data-chart-target]").forEach((button) => {
      button.addEventListener("click", () => {
        if (button.disabled) return;
        const side = button.dataset.chartTarget === "rightKundaliChart" ? "right" : "left";
        closeChartPickers();
        changeKundaliChart(side, button.dataset.chartKey);
      });
    });
    app.querySelectorAll("[data-gochar-step-side]").forEach((select) => {
      select.addEventListener("change", () => {
        setGocharStep(select.dataset.gocharStepSide, select.value);
      });
    });
    app.querySelectorAll("[data-gochar-side]").forEach((button) => {
      button.addEventListener("click", () => {
        changeGocharTime(button.dataset.gocharSide, button.dataset.gocharDirection, button.dataset.gocharChartKey, button.dataset.gocharStep);
      });
    });
    app.querySelectorAll("[data-gochar-tile-side]").forEach((button) => {
      button.addEventListener("click", () => {
        setGocharTileSide(button.dataset.gocharTileSide);
      });
    });
    app.querySelectorAll("[data-kundali-right-panel]").forEach((button) => {
      button.addEventListener("click", () => {
        setKundaliRightPanel(button.dataset.kundaliRightPanel);
      });
    });
    app.querySelectorAll("[data-vimshottari-path]").forEach((button) => {
      button.addEventListener("click", () => {
        loadKundaliVimshottariChildren(button.dataset.vimshottariPath);
      });
    });
    app.querySelectorAll("[data-vimshottari-back-path]").forEach((button) => {
      button.addEventListener("click", () => {
        loadKundaliVimshottariPath(button.dataset.vimshottariBackPath);
      });
    });
    app.querySelectorAll(".north-diamond-chart").forEach((chart) => {
      chart.addEventListener("click", (event) => {
        const target = event.target?.closest?.("[data-house-number]");
        if (!target || !chart.contains(target)) return;
        event.preventDefault();
        event.stopPropagation();
        openHouseDetails(target.dataset.houseNumber, target.dataset.houseChartKey);
      });
    });
    app.querySelectorAll("[data-close-house-details]").forEach((element) => {
      element.addEventListener("click", (event) => {
        if (event.target === element || event.target?.closest?.("[data-close-house-details]")) {
          closeHouseDetails();
        }
      });
    });
    const kundaliMoreButton = app.querySelector("#kundaliMoreButton");
    if (kundaliMoreButton) {
      kundaliMoreButton.addEventListener("click", toggleKundaliMoreMenu);
    }
    app.querySelectorAll("[data-kundali-tool]").forEach((button) => {
      button.addEventListener("click", () => openKundaliTool(button.dataset.kundaliTool));
    });
    app.querySelectorAll("[data-shadbal-tab]").forEach((button) => {
      button.addEventListener("click", () => setShadbalTab(button.dataset.shadbalTab));
    });
    app.querySelectorAll("[data-kundali-detail-panel]").forEach((button) => {
      button.addEventListener("click", () => setKundaliDetailPanel(button.dataset.kundaliDetailPanel));
    });
    app.querySelectorAll("[data-kundali-choice]").forEach((button) => {
      button.addEventListener("click", () => {
        closeChartPickers();
        setKundaliChoice(button.dataset.kundaliChoice);
      });
    });
    app.querySelectorAll("[data-kp-nadi-parent]").forEach((select) => {
      select.addEventListener("change", () => setKpNadiParent(select.value));
    });
    app.querySelectorAll("[data-kp-nadi-child]").forEach((select) => {
      select.addEventListener("change", () => setKpNadiChild(select.value));
    });
    app.querySelectorAll("[data-close-kundali-modal]").forEach((element) => {
      element.addEventListener("click", (event) => {
        if (event.target === element || element.tagName === "BUTTON") {
          closeKundaliToolModal();
        }
      });
    });

    app.querySelectorAll("[data-edit-jatak]").forEach((button) => {
      button.addEventListener("click", () => editHoroscope(button.dataset.editJatak));
    });
    app.querySelectorAll("[data-kp-jatak]").forEach((button) => {
      button.addEventListener("click", () => viewKpPage(button.dataset.kpJatak));
    });
    app.querySelectorAll("[data-delete-jatak]").forEach((button) => {
      button.addEventListener("click", () => deleteHoroscope(button.dataset.deleteJatak));
    });
    app.querySelectorAll("[data-view-jatak]").forEach((button) => {
      button.addEventListener("click", () => viewHoroscope(button.dataset.viewJatak));
    });
    app.querySelectorAll("[data-kundali-jatak]").forEach((button) => {
      button.addEventListener("click", () => viewKundali(button.dataset.kundaliJatak));
    });
    attachPlanetTooltips();
  }

  function attachPanchangHandlers() {
    if (state.route !== "panchang") {
      return;
    }
    app.querySelectorAll("[data-panchang-tab]").forEach((button) => {
      button.addEventListener("click", () => changePanchangTab(button.dataset.panchangTab));
    });
    app.querySelectorAll("[data-nakshatra-filter]").forEach((select) => {
      select.addEventListener("change", () => setNakshatraFilter(select.dataset.nakshatraFilter, select.value));
    });
    const clearFiltersButton = app.querySelector("#clearNakshatraFilters");
    if (clearFiltersButton) {
      clearFiltersButton.addEventListener("click", clearNakshatraFilters);
    }
  }

  function attachMatchMakingHandlers() {
    if (state.route !== "match-making") {
      return;
    }
    app.querySelectorAll("[data-match-making-tab]").forEach((button) => {
      button.addEventListener("click", () => {
        state.matchMaking.activeTab = button.dataset.matchMakingTab || "varn-vinyas";
        render();
      });
    });
    const varnVinyasForm = app.querySelector("#varnVinyasForm");
    const varnVinyasName = app.querySelector("#varnVinyasName");
    if (varnVinyasName) {
      varnVinyasName.addEventListener("input", () => {
        state.matchMaking.varnVinyasName = varnVinyasName.value;
        state.matchMaking.error = "";
      });
    }
    if (varnVinyasForm) {
      varnVinyasForm.addEventListener("submit", analyzeVarnVinyas);
    }
  }

  async function analyzeVarnVinyas(event) {
    event.preventDefault();
    const name = (app.querySelector("#varnVinyasName")?.value || "").trim();
    state.matchMaking.varnVinyasName = name;
    state.matchMaking.error = "";

    if (!name) {
      state.matchMaking.error = state.language === "mr" ? "\u0915\u0943\u092a\u092f\u093e \u0928\u093e\u0935 \u0932\u093f\u0939\u093e." : "Please enter a name.";
      render();
      return;
    }

    state.matchMaking.isLoadingVarnVinyas = true;
    render();

    try {
      const result = await postJson("/reference/varn-vinyas/analyze", { name });
      state.matchMaking.varnVinyasResult = normalizeVarnVinyasResponse(result);
      state.matchMaking.error = "";
    } catch (errorResponse) {
      state.matchMaking.varnVinyasResult = null;
      state.matchMaking.error = errorMessage(errorResponse, "Unable to analyze Varn Vinyas.");
    } finally {
      state.matchMaking.isLoadingVarnVinyas = false;
      render();
    }
  }

  function changePanchangTab(tabKey) {
    const validTabs = ["tithi", "var", "nakshatra", "yog", "karan"];
    state.panchang.activeTab = validTabs.includes(tabKey) ? tabKey : "tithi";
    state.panchang.error = "";
    render();
    if (state.panchang.activeTab === "nakshatra" && state.panchang.nakshatras.length === 0) {
      loadNakshatras();
    }
  }

  function setNakshatraFilter(field, value) {
    const filters = state.panchang.nakshatraFilters || {};
    if (value) {
      filters[field] = value;
    } else {
      delete filters[field];
    }
    state.panchang.nakshatraFilters = filters;
    render();
  }

  function clearNakshatraFilters() {
    state.panchang.nakshatraFilters = {};
    render();
  }

  function attachPlanetTooltips() {
    const targets = app.querySelectorAll(".planet-tooltip-target");
    if (!targets.length) return;
    let tooltip = document.querySelector("#planetTooltip");
    if (!tooltip) {
      tooltip = document.createElement("div");
      tooltip.id = "planetTooltip";
      tooltip.className = "planet-tooltip";
      document.body.appendChild(tooltip);
    }

    targets.forEach((target) => {
      target.addEventListener("mouseenter", (event) => {
        tooltip.innerHTML = planetTooltipHtml(target.dataset.planetTooltip || "");
        tooltip.classList.add("visible");
        movePlanetTooltip(event, tooltip);
      });
      target.addEventListener("mousemove", (event) => movePlanetTooltip(event, tooltip));
      target.addEventListener("mouseleave", () => tooltip.classList.remove("visible"));
    });
  }

  function movePlanetTooltip(event, tooltip) {
    const offset = 14;
    tooltip.style.left = `${event.clientX + offset}px`;
    tooltip.style.top = `${event.clientY + offset}px`;
  }

  function planetTooltipHtml(text) {
    const rows = String(text || "")
      .split("\n")
      .map((line) => {
        const separator = line.indexOf(":");
        if (separator < 0) return `<div><strong>${escapeHtml(line)}</strong></div>`;
        return `<div><span>${escapeHtml(line.slice(0, separator))}</span><strong>${escapeHtml(line.slice(separator + 1).trim())}</strong></div>`;
      })
      .join("");
    return `<section>${rows}</section>`;
  }

  async function loadDashboardData() {
    state.loadingCharts = true;
    render();
    try {
      const payload = await getJson("/jatak?limit=100&offset=0");
      state.charts = toArray(payload);
    } catch {
      state.charts = [];
    } finally {
      state.loadingCharts = false;
      render();
    }
  }

  async function loadHoroscopePage() {
    const horoscope = state.horoscope;
    horoscope.isLoading = true;
    horoscope.error = "";
    render();
    try {
      const offset = (horoscope.page - 1) * horoscope.pageSize;
      const payload = await getJson(`/jatak?limit=${horoscope.pageSize}&offset=${offset}`);
      horoscope.records = toArray(payload);
    } catch {
      horoscope.records = [];
      horoscope.error = t("horoscope.loadError");
    } finally {
      horoscope.isLoading = false;
      render();
    }
  }

  async function loadAstroNotesPage() {
    const notes = state.astroNotes;
    notes.pageSize = Number(notes.pageSize) > 0 ? Number(notes.pageSize) : 5;
    notes.isLoading = true;
    notes.error = "";
    render();
    try {
      const query = new URLSearchParams({
        page: String(notes.page),
        rows_per_page: String(notes.pageSize),
      });
      const payload = await getJson(`/astro-notes?${query.toString()}`);
      const records = astroNotesRecords(payload).slice(0, notes.pageSize);
      notes.records = records;
      const total = Number(
        payload?.total_records ??
        payload?.count ??
        payload?.total ??
        payload?.total_count ??
        payload?.totalCount ??
        payload?.meta?.count ??
        payload?.meta?.total ??
        payload?.meta?.total_records ??
        payload?.pagination?.count ??
        payload?.pagination?.total,
      );
      notes.total = Number.isFinite(total) && total >= 0 ? total : null;
      const lastPage = astroNotesTotalPages();
      if (notes.page > lastPage) {
        notes.page = lastPage;
      }
    } catch {
      notes.records = [];
      notes.total = null;
      notes.error = t("astroNotes.loadError");
    } finally {
      notes.isLoading = false;
      render();
    }
  }

  function truncateCellText(value, maxLength = 100) {
    const text = String(value ?? "-");
    if (text.length <= maxLength) {
      return { display: text, full: text };
    }
    return {
      display: `${text.slice(0, maxLength)}...`,
      full: text,
    };
  }

  function openAstroNoteCreate() {
    state.astroNotes.mode = "form";
    state.astroNotes.dialogMode = "add";
    state.astroNotes.editingId = null;
    state.astroNotes.activeCategory = "planet";
    state.astroNotes.selections = [];
    state.astroNotes.form = { summary: "", notes: "" };
    state.astroNotes.error = "";
    state.astroNotes.message = "";
    render();
  }

  function astroNotesTotalPages() {
    const notes = state.astroNotes;
    if (notes.total != null) {
      return Math.max(1, Math.ceil(notes.total / notes.pageSize));
    }
    return Math.max(1, Math.ceil((notes.records?.length || 0) / notes.pageSize) || 1);
  }

  function openAstroNoteSearch() {
    state.astroNotes.mode = "form";
    state.astroNotes.dialogMode = "search";
    state.astroNotes.editingId = null;
    state.astroNotes.activeCategory = "planet";
    state.astroNotes.selections = [];
    state.astroNotes.form = { summary: "", notes: "" };
    state.astroNotes.error = "";
    state.astroNotes.message = "";
    state.astroNotes.searchResults = [];
    state.astroNotes.searchPage = 1;
    state.astroNotes.searchPageSize = 1;
    state.astroNotes.searchTotal = null;
    state.astroNotes.searchLoading = false;
    state.astroNotes.searchError = "";
    render();
  }

  function closeAstroNoteModal() {
    state.astroNotes.mode = "list";
    state.astroNotes.editingId = null;
    state.astroNotes.dialogMode = "add";
    state.astroNotes.error = "";
    render();
  }

  async function loadAstroNoteForEdit(noteId) {
    if (!noteId) return;
    state.astroNotes.error = "";
    try {
      const record = await getJson(`/astro-notes/${encodeURIComponent(noteId)}`);
      state.astroNotes.editingId = noteId;
      state.astroNotes.dialogMode = "add";
      state.astroNotes.selections = parseAstroNoteSummary(record.summary || record.title || "");
      state.astroNotes.form = {
        summary: record.summary || record.title || "",
        notes: record.notes || "",
      };
      state.astroNotes.activeCategory = state.astroNotes.selections[0]?.categoryKey || "planet";
      state.astroNotes.mode = "form";
      render();
    } catch {
      state.astroNotes.error = t("astroNotes.loadError");
      render();
    }
  }

  async function saveAstroNote() {
    if (state.astroNotes.dialogMode === "search") {
      return;
    }
    const notes = state.astroNotes;
    const summary = astroNoteSelectionSummary().replace(/\s+/g, "_");
    const noteText = (notes.form.notes || "").trim();
    notes.error = "";
    notes.message = "";

    if (!summary || !noteText) {
      notes.error = t("astroNotes.required");
      render();
      return;
    }

    notes.isSaving = true;
    render();

    const payload = { summary, notes: noteText };
    try {
      if (notes.editingId) {
        await putJson(`/astro-notes/${encodeURIComponent(notes.editingId)}`, payload);
        notes.message = t("astroNotes.updated");
      } else {
        await postJson("/astro-notes", payload);
        notes.message = t("astroNotes.saved");
      }
      notes.editingId = null;
      notes.form = { summary: "", notes: "" };
      notes.selections = [];
      notes.activeCategory = "planet";
      await loadAstroNotesPage();
      notes.mode = "form";
      render();
    } catch (errorResponse) {
      notes.error = errorMessage(errorResponse, t("astroNotes.saveError"));
      render();
    } finally {
      notes.isSaving = false;
      render();
    }
  }

  function astroNoteSearchQuery() {
    return (state.astroNotes.selections || [])
      .map((item) => astroNoteSelectionSummaryItem(item))
      .filter(Boolean)
      .join("-")
      .replace(/\s+/g, "_")
      .trim();
  }

  function astroNoteSelectionSummaryItem(item) {
    if (!item) return "";
    return state.language === "mr" ? item.labelMr || item.labelEn || "" : item.labelEn || item.labelMr || "";
  }

  async function loadAstroNoteSearchResults() {
    if (state.astroNotes.dialogMode !== "search") return;
    const query = astroNoteSearchQuery();
    state.astroNotes.searchLoading = true;
    state.astroNotes.searchError = "";
    render();
    try {
      if (!query) {
        state.astroNotes.searchResults = [];
        state.astroNotes.searchTotal = 0;
        state.astroNotes.searchLoading = false;
        return;
      }
      const params = new URLSearchParams({
        query,
        page: String(state.astroNotes.searchPage),
        records_per_page: String(state.astroNotes.searchPageSize),
      });
      const payload = await getJson(`/astro-notes/search?${params.toString()}`);
      const records = astroNotesRecords(payload);
      state.astroNotes.searchResults = records;
      const total = Number(
        payload?.total_records ??
        payload?.count ??
        payload?.total ??
        payload?.total_count ??
        payload?.totalCount ??
        payload?.meta?.count ??
        payload?.meta?.total ??
        payload?.meta?.total_records ??
        payload?.pagination?.count ??
        payload?.pagination?.total,
      );
      state.astroNotes.searchTotal = Number.isFinite(total) && total >= 0 ? total : null;
      if (!records.length && state.astroNotes.searchTotal == null) {
        state.astroNotes.searchTotal = 0;
      }
    } catch (errorResponse) {
      state.astroNotes.searchResults = [];
      state.astroNotes.searchTotal = null;
      state.astroNotes.searchError = errorMessage(errorResponse, t("astroNotes.loadError"));
    } finally {
      state.astroNotes.searchLoading = false;
      render();
    }
  }

  function changeAstroNoteSearchPage(direction) {
    const nextPage = Math.max(1, state.astroNotes.searchPage + direction);
    if (nextPage === state.astroNotes.searchPage) return;
    state.astroNotes.searchPage = nextPage;
    loadAstroNoteSearchResults();
  }

  function toggleAstroNoteSelection(selectionKey) {
    if (!selectionKey) return;
    const [categoryKey, itemKey] = String(selectionKey).split(":");
    const items = ASTRO_NOTE_ICON_MAP[categoryKey] || [];
    const item = items.find((entry) => entry.key === itemKey);
    if (!item) return;

    const selections = state.astroNotes.selections || [];
    const existingIndex = selections.findIndex((entry) => entry.categoryKey === categoryKey && entry.key === itemKey);
    if (existingIndex >= 0) {
      selections.splice(existingIndex, 1);
    } else {
      selections.push({
        categoryKey,
        key: itemKey,
        labelEn: item.labelEn,
        labelMr: item.labelMr,
        label: astroNoteDisplayLabel(item),
        glyph: item.glyph,
        image: item.image,
      });
    }
    state.astroNotes.selections = [...selections];
    state.astroNotes.form.summary = astroNoteSelectionSummary();
    render();
    if (state.astroNotes.dialogMode === "search") {
      state.astroNotes.searchPage = 1;
      loadAstroNoteSearchResults();
    }
  }

  function astroNoteSelectionSummary() {
    return (state.astroNotes.selections || [])
      .map((item) => {
        return astroNoteDisplayLabel(item) || item.label || item.labelEn || item.labelMr || "";
      })
      .join("-")
      .replace(/\s*-\s*/g, "-")
      .trim();
  }

  function parseAstroNoteSummary(summary) {
    const rawParts = String(summary || "")
      .split("-")
      .map((part) => part.trim())
      .filter(Boolean);
    if (!rawParts.length) return [];

    const selections = [];
    rawParts.forEach((part) => {
      const matched = findAstroNoteItemByLabel(part);
      if (matched) {
        selections.push(matched);
      }
    });
    return selections;
  }

  function findAstroNoteItemByLabel(label) {
    const target = String(label || "").trim().toLowerCase();
    for (const [categoryKey, items] of Object.entries(ASTRO_NOTE_ICON_MAP)) {
      const match = items.find((item) => {
        const labels = [item.labelEn, item.labelMr, item.label].filter(Boolean);
        return labels.some((candidate) => String(candidate).trim().toLowerCase() === target);
      });
      if (match) {
        return {
          categoryKey,
          key: match.key,
          labelEn: match.labelEn,
          labelMr: match.labelMr,
          label: state.language === "mr" ? match.labelMr || match.labelEn : match.labelEn || match.labelMr,
          glyph: match.glyph,
          image: match.image,
        };
      }
    }
    return null;
  }

  async function deleteAstroNote(noteId) {
    if (!noteId) return;
    if (!window.confirm(t("astroNotes.deleteConfirm"))) {
      return;
    }
    const notes = state.astroNotes;
    notes.error = "";
    notes.message = "";
    try {
      await deleteJson(`/astro-notes/${encodeURIComponent(noteId)}`);
      notes.message = t("astroNotes.deleted");
      await loadAstroNotesPage();
    } catch (errorResponse) {
      notes.error = errorMessage(errorResponse, t("astroNotes.deleteError"));
      render();
    }
  }

  function astroNoteId(record) {
    return record?.id ?? record?.note_id ?? record?.noteId ?? record?.astro_note_id ?? "";
  }

  async function loadNakshatras() {
    const panchang = state.panchang;
    panchang.isLoadingNakshatras = true;
    panchang.error = "";
    render();
    try {
      panchang.nakshatras = await getJson("/reference/nakshatras");
    } catch {
      panchang.error = t("common.error");
      panchang.nakshatras = [];
    } finally {
      panchang.isLoadingNakshatras = false;
      render();
    }
  }

  async function loadSavedCities() {
    const horoscope = state.horoscope;
    horoscope.isLoadingCities = true;
    render();
    try {
      const payload = await getJson("/cities?limit=500&offset=0");
      horoscope.cities = toArray(payload);
    } catch {
      horoscope.error = t("location.loadError");
    } finally {
      horoscope.isLoadingCities = false;
      render();
    }
  }

  async function editHoroscope(jatakId) {
    if (!jatakId || jatakId === "null" || jatakId === "undefined") {
      state.horoscope.error = t("horoscope.loadError");
      render();
      return;
    }
    const horoscope = state.horoscope;
    horoscope.error = "";
    horoscope.message = "";
    horoscope.view = null;
    try {
      const record = await getJson(`/jatak/${encodeURIComponent(jatakId)}`);
      horoscope.mode = "edit";
      horoscope.editingId = jatakIdForRecord(record) || jatakId;
      horoscope.form = formFromJatak(record);
      render();
      loadSavedCities();
    } catch {
      horoscope.error = t("horoscope.loadError");
      render();
    }
  }

  async function deleteHoroscope(jatakId) {
    if (!jatakId || jatakId === "null" || jatakId === "undefined") {
      state.horoscope.error = t("horoscope.deleteError");
      render();
      return;
    }
    if (!window.confirm(t("horoscope.deleteConfirm"))) {
      return;
    }

    const horoscope = state.horoscope;
    horoscope.error = "";
    horoscope.message = "";
    try {
      await deleteJson(`/jatak/${encodeURIComponent(jatakId)}`);
      horoscope.message = t("horoscope.deleted");
      await loadHoroscopePage();
      loadDashboardData();
    } catch {
      horoscope.error = t("horoscope.deleteError");
      render();
    }
  }

  async function viewHoroscope(jatakId) {
    if (!jatakId || jatakId === "null" || jatakId === "undefined") {
      state.horoscope.error = t("common.error");
      render();
      return;
    }
    const horoscope = state.horoscope;
    horoscope.error = "";
    horoscope.message = "";
    try {
      const record = await getJson(`/jatak/${encodeURIComponent(jatakId)}`);
      horoscope.mode = "view";
      horoscope.view = { record };
      render();
    } catch {
      horoscope.error = t("common.error");
      render();
    }
  }

  async function viewKpPage(jatakId) {
    if (!jatakId || jatakId === "null" || jatakId === "undefined") {
      state.horoscope.error = t("common.error");
      render();
      return;
    }
    const horoscope = state.horoscope;
    horoscope.error = "";
    horoscope.message = "";
    try {
      const [record, d1, chalit] = await Promise.all([
        getJson(`/jatak/${encodeURIComponent(jatakId)}`),
        getJson(chartFetchPath(jatakId, "d1")),
        getJson(chartFetchPath(jatakId, "chalit")),
      ]);
      horoscope.mode = "kp-view";
      horoscope.kpView = {
        jatakId,
        title: "KP",
        record,
        leftChartKey: "d1",
        rightChartKey: "chalit",
        charts: {
          d1,
          chalit: normalizeChartPayload(chalit, "chalit"),
        },
      };
      render();
    } catch {
      horoscope.error = t("common.error");
      render();
    }
  }

  async function viewKundali(jatakId) {
    if (!jatakId || jatakId === "null" || jatakId === "undefined") {
      state.horoscope.error = t("common.error");
      render();
      return;
    }
    state.horoscope.error = "";
    state.horoscope.message = "";
    state.horoscope.view = null;
    try {
      const [record, d1, d9, planetStatusResult, jaiminiResult] = await Promise.all([
        getJson(`/jatak/${encodeURIComponent(jatakId)}`),
        getJson(chartFetchPath(jatakId, "d1")),
        getJson(chartFetchPath(jatakId, "d9")),
        getJson(planetStatusApiPath(jatakId)).catch(() => null),
        getJson(chartFetchPath(jatakId, "jaimini")).catch(() => null),
      ]);
      state.horoscope.mode = "kundali";
      state.horoscope.kundali = {
        jatakId,
        chartType: "north",
        record,
        planetStatus: planetStatusResult,
        detailPanelActive: "chart-details-d1",
        rightPanelActive: "vimshottari-dasha",
        kundaliChoice: "home",
        leftChartKey: "d1",
        rightChartKey: "d9",
        gocharSteps: { left: "month", right: "month" },
        chalitTimes: {},
        sidePanel: { active: "", menuOpen: false, karakAkarak: {} },
        charts: { d1, d9 },
        jaimini: normalizeJaiminiPayload(jaiminiResult),
        houseDetails: null,
        cuspDetails: null,
        nakshatraNadi: null,
        error: "",
      };
      render();
      loadKundaliVimshottariDasha(false);
    } catch {
      state.horoscope.error = t("common.error");
      render();
    }
  }

  async function changeKundaliChart(side, chartKey) {
    const kundali = state.horoscope.kundali;
    if (!kundali) return;
    const chartItem = chartCatalogItem(chartKey);
    const normalizedChartKey = chartItem.enabled ? chartItem.key : "d1";
    kundali[side === "right" ? "rightChartKey" : "leftChartKey"] = normalizedChartKey;
    kundali.error = "";
    if (!kundali.charts) {
      kundali.charts = {};
    }
    const cacheKey = chartCacheKeyForSide(side, normalizedChartKey);
    if (!kundali.charts[cacheKey] || kundali.charts[cacheKey].unavailable) {
      try {
        if (derivedAscendantBody(normalizedChartKey)) {
          if (!kundali.charts.d1 || kundali.charts.d1.unavailable) {
            kundali.charts.d1 = await getJson(chartFetchPath(kundali.jatakId, "d1"));
          }
          kundali.charts[cacheKey] = buildDerivedAscendantChart(kundali.charts.d1, normalizedChartKey);
        } else if (normalizedChartKey === "jaimini") {
          kundali.jaimini = normalizeJaiminiPayload(await getJson(chartFetchPath(kundali.jatakId, "jaimini")));
          kundali.charts[cacheKey] = kundali.charts.d1 || { unavailable: true };
        } else {
          const fetchedChart = await getJson(chartFetchPath(kundali.jatakId, normalizedChartKey));
          kundali.charts[cacheKey] = normalizedChartKey === "gochar"
            ? prepareGocharChart(fetchedChart, kundali)
            : normalizedChartKey === "chalit"
              ? normalizeChartPayload(fetchedChart, "chalit")
              : fetchedChart;
          if (normalizedChartKey === "chalit") {
            if (!kundali.chalitTimes) kundali.chalitTimes = {};
            kundali.chalitTimes[side] = fetchedChart?.calculated_at || nativeBirthIsoTimestamp(kundali.record);
          }
        }
      } catch {
        kundali.charts[cacheKey] = { unavailable: true };
        kundali.error = t("horoscope.chartLoadError");
      }
    }
    render();
  }

  function toggleKundaliMoreMenu() {
    const kundali = state.horoscope.kundali;
    if (!kundali) return;
    if (!kundali.sidePanel) {
      kundali.sidePanel = { active: "", menuOpen: false, karakAkarak: {} };
    }
    kundali.sidePanel.menuOpen = !kundali.sidePanel.menuOpen;
    render();
  }

  async function setKundaliDetailPanel(panelKey) {
    const kundali = state.horoscope.kundali;
    if (!kundali) return;
    kundali.detailPanelActive = panelKey || "chart-details-d1";
    render();
  }

  function setKundaliRightPanel(panelKey) {
    const kundali = state.horoscope.kundali;
    if (!kundali) return;
    kundali.rightPanelActive = panelKey || "";
    render();
    if (kundali.rightPanelActive === "vimshottari-dasha") {
      loadKundaliVimshottariDasha(false);
    }
  }

  async function setKundaliChoice(choice) {
    const kundali = state.horoscope.kundali;
    if (!kundali) return;
    kundali.kundaliChoice = choice === "kp-astrology" ? "kp-astrology" : choice === "panchanga" ? "panchanga" : "home";
    if (kundali.kundaliChoice === "home") {
      resetKundaliHomeChoice(kundali);
      render();
      loadKundaliVimshottariDasha(true);
      return;
    }
    if (kundali.kundaliChoice === "kp-astrology") {
      render();
      if (kundali.contextAt) {
        await applyKundaliKpChartPairForTime(kundali, kundali.contextAt);
      } else {
        await applyKundaliKpChartPair();
      }
      loadKpNadiRules(false);
      await loadKundaliNakshatraNadi(true);
      return;
    }
    render();
  }

  async function loadKpNadiRules(forceReload = false) {
    const kundali = state.horoscope.kundali;
    if (!kundali) return;
    if (!kundali.kpNadiFilter) {
      kundali.kpNadiFilter = { parent: "", child: "all", data: null, isLoading: false, error: "" };
    }
    if (!forceReload && (kundali.kpNadiFilter.isLoading || kundali.kpNadiFilter.data)) {
      return;
    }
    kundali.kpNadiFilter.isLoading = true;
    kundali.kpNadiFilter.error = "";
    render();
    try {
      const response = await fetch("./src/data/naadi.json");
      if (!response.ok) throw new Error("Unable to load Naadi rules.");
      const data = await response.json();
      if (!state.horoscope.kundali) return;
      state.horoscope.kundali.kpNadiFilter = {
        parent: state.horoscope.kundali.kpNadiFilter?.parent || "",
        child: state.horoscope.kundali.kpNadiFilter?.child || "all",
        data,
        isLoading: false,
        error: "",
      };
    } catch (errorResponse) {
      if (!state.horoscope.kundali) return;
      state.horoscope.kundali.kpNadiFilter = Object.assign({}, state.horoscope.kundali.kpNadiFilter, {
        isLoading: false,
        error: errorResponse?.message || "Unable to load Naadi rules.",
      });
    }
    render();
  }

  function setKpNadiParent(parent) {
    const kundali = state.horoscope.kundali;
    if (!kundali) return;
    if (!kundali.kpNadiFilter) {
      kundali.kpNadiFilter = { parent: "", child: "all", data: null };
    }
    kundali.kpNadiFilter.parent = parent || "";
    kundali.kpNadiFilter.child = "all";
    render();
  }

  function setKpNadiChild(child) {
    const kundali = state.horoscope.kundali;
    if (!kundali) return;
    if (!kundali.kpNadiFilter) {
      kundali.kpNadiFilter = { parent: "", child: "all", data: null };
    }
    kundali.kpNadiFilter.child = child || "all";
    render();
  }

  function resetKundaliHomeChoice(kundali) {
    if (!kundali) return;
    kundali.leftChartKey = "d1";
    kundali.rightChartKey = "d9";
    kundali.gocharTileSide = "left";
    kundali.contextAt = "";
    kundali.chartTimes = {
      left: nativeBirthIsoTimestamp(kundali.record) || formatNativeBirthTimestamp(kundali.record),
      right: nativeBirthIsoTimestamp(kundali.record) || formatNativeBirthTimestamp(kundali.record),
    };
    if (kundali.charts?.d1) {
      kundali.charts.d1 = Object.assign({}, kundali.charts.d1);
    }
    if (kundali.charts?.d9) {
      kundali.charts.d9 = Object.assign({}, kundali.charts.d9);
    }
  }

  async function applyKundaliKpChartPair() {
    const kundali = state.horoscope.kundali;
    if (!kundali) return;
    kundali.leftChartKey = "d1";
    kundali.rightChartKey = "chalit";
    if (!kundali.charts) {
      kundali.charts = {};
    }
    try {
      if (!kundali.charts.d1 || kundali.charts.d1.unavailable) {
        kundali.charts.d1 = await getJson(chartFetchPath(kundali.jatakId, "d1"));
      }
      const chalitKey = chartCacheKeyForSide("right", "chalit");
      if (!kundali.charts[chalitKey] || kundali.charts[chalitKey].unavailable) {
        const chalit = await getJson(chartFetchPath(kundali.jatakId, "chalit"));
        kundali.charts[chalitKey] = normalizeChartPayload(chalit, "chalit");
        if (!kundali.chalitTimes) kundali.chalitTimes = {};
        kundali.chalitTimes.right = chalit?.calculated_at || nativeBirthIsoTimestamp(kundali.record);
      }
      kundali.error = "";
    } catch {
      kundali.error = t("horoscope.chartLoadError");
    } finally {
      render();
    }
  }

  function openKundaliTool(panelKey) {
    const kundali = state.horoscope.kundali;
    if (!kundali) return;
    if (!kundali.sidePanel) {
      kundali.sidePanel = { active: "", menuOpen: false, karakAkarak: {} };
    }
    kundali.sidePanel.active = panelKey;
    kundali.sidePanel.menuOpen = false;
    if (panelKey === "shadbal" && !kundali.sidePanel.shadbalActiveTab) {
      kundali.sidePanel.shadbalActiveTab = "sthanbal";
    }
    render();
    if (panelKey === "bhavbala") {
      loadBhavbalaAnalysis(true);
    }
    if (panelKey === "shadbal") {
      loadShadbalAnalysis(true);
    }
    if (panelKey === "karak-akarak") {
      loadKarakAkarakDetails();
    }
  }

  function closeKundaliToolModal() {
    const kundali = state.horoscope.kundali;
    if (!kundali?.sidePanel?.active) return;
    kundali.sidePanel.active = "";
    render();
  }

  function openHouseDetails(houseNumber, chartKey = "") {
    const kundali = state.horoscope.kundali;
    if (!kundali) return;
    const chart = resolveHouseDetailsChart(chartKey, kundali);
    if (!chart) return;
    const normalizedChart = normalizeChartPayload(chart, chartKey || kundali.leftChartKey || "d1");
    const houses = buildNorthIndianHouses(normalizedChart, kundali.planetStatus);
    const house = houses.find((item) => String(item.house) === String(houseNumber));
    if (!house) return;
    kundali.houseDetails = buildHouseDetailsPayload(house);
    render();
  }

  function closeHouseDetails() {
    const kundali = state.horoscope.kundali;
    if (!kundali) return;
    kundali.houseDetails = null;
    render();
  }

  function resolveHouseDetailsChart(chartKey, kundali) {
    const charts = kundali?.charts || {};
    const activeChartKey = chartKey || kundali?.leftChartKey || "d1";
    const cacheKey = activeChartKey === "gochar" ? gocharChartCacheKey("left") : activeChartKey;
    return charts[cacheKey] || charts[activeChartKey] || charts.d1 || null;
  }

  function buildHouseDetailsPayload(house) {
    const planets = Array.isArray(house?.bodies) ? house.bodies.map((body) => body.abbr || body.tooltip || body.body || body.name || body.key).filter(Boolean) : [];
    return {
      house_number: Number(house?.house || 0) || "",
      sign: house?.sign || "",
      sign_index: house?.sign_index || "",
      planets,
      rows: [
        ["House #", house?.house || "-"],
        ["Sign", house?.sign || "-"],
        ["Sign Index", house?.sign_index || "-"],
        ["Planets", planets.join(", ") || "-"],
      ],
    };
  }

  function bhavbalaRowHtml(row) {
    return `
      <tr>
        <td>${escapeHtml(formatAnalysisNumber(row?.bhavbala))}</td>
        <td><strong>${escapeHtml(formatPlanetLabel(row?.planet || "-"))}</strong></td>
        <td>${escapeHtml(formatAnalysisNumber(row?.house_lord_strength))}</td>
        <td>${escapeHtml(formatAnalysisNumber(row?.house_digbala))}</td>
        <td>${escapeHtml(formatAnalysisNumber(row?.house_drigbala))}</td>
      </tr>
    `;
  }

  function setShadbalTab(tabKey) {
    const kundali = state.horoscope.kundali;
    if (!kundali?.sidePanel) return;
    const validTabs = new Set(["sthanbal", "kaalbal", "digbala", "drikbal", "cheshtabal", "naisargik-bal"]);
    kundali.sidePanel.shadbalActiveTab = validTabs.has(tabKey) ? tabKey : "sthanbal";
    render();
    ensureShadbalAnalysis();
  }

  async function loadShadbalAnalysis(forceReload = false) {
    const kundali = state.horoscope.kundali;
    if (!kundali) return;
    if (!kundali.sidePanel) {
      kundali.sidePanel = { active: "shadbal", menuOpen: false, karakAkarak: {} };
    }
    if (!kundali.sidePanel.shadbalAnalysis) {
      kundali.sidePanel.shadbalAnalysis = {};
    }
    const cache = kundali.sidePanel.shadbalAnalysis;
    if (!forceReload && cache.raw && cache.sthanbal?.rows) return;

    cache.sthanbal = { isLoading: true, error: "", rows: [] };
    cache.kaalbal = { isLoading: true, error: "", rows: [] };
    cache.digbala = { isLoading: true, error: "", rows: [] };
    cache.drikbal = { isLoading: true, error: "", rows: [] };
    cache.cheshtabal = { isLoading: true, error: "", rows: [] };
    cache["naisargik-bal"] = { isLoading: true, error: "", rows: [] };
    render();

    try {
      const payload = await getJson(shadbalApiPath(kundali.jatakId));
      const analysis = normalizeShadbalAnalysis(payload);
      if (!state.horoscope.kundali?.sidePanel?.shadbalAnalysis) return;
      state.horoscope.kundali.sidePanel.shadbalAnalysis = analysis;
    } catch (errorResponse) {
      try {
        const payload = await getJson(shadbalSthanbalFallbackApiPath(kundali.jatakId));
        const analysis = normalizeShadbalAnalysis(payload);
        if (!state.horoscope.kundali?.sidePanel?.shadbalAnalysis) return;
        state.horoscope.kundali.sidePanel.shadbalAnalysis = analysis;
        render();
        return;
      } catch (fallbackErrorResponse) {
        if (!state.horoscope.kundali?.sidePanel?.shadbalAnalysis) return;
        const message = errorMessage(fallbackErrorResponse || errorResponse, "Unable to load Shadbal summary.");
        state.horoscope.kundali.sidePanel.shadbalAnalysis = {
          raw: null,
          sthanbal: { isLoading: false, error: message, rows: [] },
          kaalbal: { isLoading: false, error: message, rows: [] },
          digbala: { isLoading: false, error: message, rows: [] },
          drikbal: { isLoading: false, error: message, rows: [] },
          cheshtabal: { isLoading: false, error: message, rows: [] },
          "naisargik-bal": { isLoading: false, error: message, rows: [] },
        };
      }
    } finally {
      render();
    }
  }

  async function loadKaalbalAnalysis(forceReload = false) {
    await ensureShadbalAnalysis(forceReload);
  }

  async function loadBhavbalaAnalysis(forceReload = false) {
    const kundali = state.horoscope.kundali;
    if (!kundali) return;
    if (!kundali.sidePanel) {
      kundali.sidePanel = { active: "bhavbala", menuOpen: false, karakAkarak: {} };
    }
    if (!kundali.sidePanel.bhavbala) {
      kundali.sidePanel.bhavbala = {};
    }
    const cache = kundali.sidePanel.bhavbala;
    if (!forceReload && (cache.isLoading || cache.rows)) return;

    cache.isLoading = true;
    cache.error = "";
    cache.rows = [];
    render();

    try {
      const payload = await getJson(shadbalBhavbalaApiPath(kundali.jatakId));
      const rows = normalizeBhavbalaRows(payload);
      if (!state.horoscope.kundali?.sidePanel?.bhavbala) return;
      state.horoscope.kundali.sidePanel.bhavbala = {
        isLoading: false,
        error: "",
        rows,
      };
    } catch (errorResponse) {
      if (!state.horoscope.kundali?.sidePanel?.bhavbala) return;
      state.horoscope.kundali.sidePanel.bhavbala = {
        isLoading: false,
        error: errorMessage(errorResponse, "Unable to load Bhavbala summary."),
        rows: [],
      };
    } finally {
      render();
    }
  }

  async function loadDigbalAnalysis() {
    await ensureShadbalAnalysis();
  }

  async function loadKundaliCuspDetails(forceReload = false) {
    const kundali = state.horoscope.kundali;
    if (!kundali) return;
    if (!kundali.cuspDetails) {
      kundali.cuspDetails = {};
    }
    if (!forceReload && (kundali.cuspDetails.isLoading || kundali.cuspDetails.rows)) {
      return;
    }

    kundali.cuspDetails = { isLoading: true, error: "", rows: [], columns: [] };
    render();

    try {
      const payload = await getJson(kundaliCuspApiPath(kundali));
      const normalized = normalizeCuspDetails(payload);
      if (!state.horoscope.kundali) return;
      state.horoscope.kundali.cuspDetails = {
        isLoading: false,
        error: "",
        rows: normalized.rows,
        columns: normalized.columns,
      };
    } catch (errorResponse) {
      if (!state.horoscope.kundali) return;
      state.horoscope.kundali.cuspDetails = {
        isLoading: false,
        error: errorMessage(errorResponse, "Unable to load cusp details."),
        rows: [],
        columns: [],
      };
    } finally {
      render();
    }
  }

  function kundaliCuspApiPath(kundali) {
    return `/jatak/${encodeURIComponent(kundali.jatakId)}/kp/cusps`;
  }

  async function loadKundaliNakshatraNadi(forceReload = false) {
    const kundali = state.horoscope.kundali;
    if (!kundali) return;
    if (!kundali.nakshatraNadi) {
      kundali.nakshatraNadi = {};
    }
    if (!forceReload && (kundali.nakshatraNadi.isLoading || kundali.nakshatraNadi.rows)) {
      return;
    }

    kundali.nakshatraNadi = { isLoading: true, error: "", rows: [] };
    render();

    try {
      const payload = await getJson(`/jatak/${encodeURIComponent(kundali.jatakId)}/kp/nakshatra-nadi`);
      const rows = normalizeNakshatraNadiDetails(payload);
      if (!state.horoscope.kundali) return;
      state.horoscope.kundali.nakshatraNadi = {
        isLoading: false,
        error: "",
        rows,
      };
    } catch (errorResponse) {
      if (!state.horoscope.kundali) return;
      state.horoscope.kundali.nakshatraNadi = {
        isLoading: false,
        error: errorMessage(errorResponse, "Unable to load Yogini Dasha details."),
        rows: [],
      };
    } finally {
      render();
    }
  }

  async function loadKundaliVimshottariDasha(forceReload = false) {
    const kundali = state.horoscope.kundali;
    if (!kundali) return;
    if (!kundali.vimshottariDasha) {
      kundali.vimshottariDasha = {};
    }
    if (!forceReload && (kundali.vimshottariDasha.isLoading || kundali.vimshottariDasha.data)) {
      return;
    }

    kundali.vimshottariDasha = { isLoading: true, error: "", data: null };
    render();

    try {
      const payload = await getJson(kundaliTimestampedPath(`/jatak/${encodeURIComponent(kundali.jatakId)}/dasha/vimshottari`, kundali));
      const preload = await preloadCurrentVimshottariPath(kundali.jatakId, payload, kundali.contextAt);
      if (!state.horoscope.kundali) return;
      state.horoscope.kundali.vimshottariDasha = {
        isLoading: false,
        error: "",
        data: payload,
        root: payload,
        currentPath: "",
        selectedPath: preload.selectedPath,
        contextAt: kundali.contextAt || "",
        cache: Object.assign({ "": payload }, preload.cache),
      };
    } catch (errorResponse) {
      if (!state.horoscope.kundali) return;
      state.horoscope.kundali.vimshottariDasha = {
        isLoading: false,
        error: errorMessage(errorResponse, "Unable to load Vimshottari Dasha details."),
        data: null,
      };
    } finally {
      render();
    }
  }

  async function preloadCurrentVimshottariPath(jatakId, rootPayload, contextAt = "") {
    const cache = {};
    const root = normalizeVimshottariPayload(rootPayload, { contextAt });
    const dashaPath = dashaPathKey(root.currentRow?.path || root.currentRow?.lord_key || root.currentRow?.lord || "");
    if (!dashaPath) return { cache, selectedPath: "" };
    let selectedPath = dashaPath;
    try {
      const bhuktiPayload = await getJson(vimshottariChildrenPath(jatakId, dashaPath, contextAt));
      cache[dashaPath] = bhuktiPayload;
      const bhukti = normalizeVimshottariPayload(bhuktiPayload, { contextAt });
      const bhuktiPath = dashaPathKey(bhukti.currentRow?.path || "");
      if (!bhuktiPath) return { cache, selectedPath };
      selectedPath = bhuktiPath;
      const antaraPayload = await getJson(vimshottariChildrenPath(jatakId, bhuktiPath, contextAt));
      cache[bhuktiPath] = antaraPayload;
      const antara = normalizeVimshottariPayload(antaraPayload, { contextAt });
      const antaraPath = dashaPathKey(antara.currentRow?.path || "");
      if (antaraPath) selectedPath = antaraPath;
    } catch {
      return { cache, selectedPath };
    }
    return { cache, selectedPath };
  }

  async function loadKundaliVimshottariPath(path = "") {
    const normalizedPath = dashaPathKey(path);
    if (!normalizedPath) {
      const kundali = state.horoscope.kundali;
      if (!kundali?.vimshottariDasha) return;
      kundali.vimshottariDasha.data = kundali.vimshottariDasha.root || kundali.vimshottariDasha.cache?.[""] || kundali.vimshottariDasha.data;
      kundali.vimshottariDasha.currentPath = "";
      render();
      return;
    }
    await loadKundaliVimshottariChildren(normalizedPath);
  }

  async function loadKundaliVimshottariChildren(path = "") {
    const kundali = state.horoscope.kundali;
    const normalizedPath = dashaPathKey(path);
    if (!kundali || !normalizedPath) return;
    if (!kundali.vimshottariDasha) {
      kundali.vimshottariDasha = {};
    }
    if (!kundali.vimshottariDasha.cache) {
      kundali.vimshottariDasha.cache = {};
    }
    if (kundali.vimshottariDasha.cache[normalizedPath]) {
      kundali.vimshottariDasha.data = kundali.vimshottariDasha.cache[normalizedPath];
      kundali.vimshottariDasha.currentPath = normalizedPath;
      if (normalizedPath.split(",").length >= (dashaPathKey(kundali.vimshottariDasha.selectedPath || "").split(",").filter(Boolean).length || 0)) {
        kundali.vimshottariDasha.selectedPath = normalizedPath;
      }
      render();
      return;
    }

    kundali.vimshottariDasha.isLoading = true;
    kundali.vimshottariDasha.error = "";
    render();

    try {
      const payload = await getJson(vimshottariChildrenPath(kundali.jatakId, normalizedPath, kundali.contextAt));
      if (!state.horoscope.kundali?.vimshottariDasha) return;
      state.horoscope.kundali.vimshottariDasha.cache[normalizedPath] = payload;
      state.horoscope.kundali.vimshottariDasha.data = payload;
      state.horoscope.kundali.vimshottariDasha.currentPath = normalizedPath;
      if (normalizedPath.split(",").length >= (dashaPathKey(state.horoscope.kundali.vimshottariDasha.selectedPath || "").split(",").filter(Boolean).length || 0)) {
        state.horoscope.kundali.vimshottariDasha.selectedPath = normalizedPath;
      }
      state.horoscope.kundali.vimshottariDasha.isLoading = false;
      state.horoscope.kundali.vimshottariDasha.error = "";
    } catch (errorResponse) {
      if (!state.horoscope.kundali?.vimshottariDasha) return;
      state.horoscope.kundali.vimshottariDasha.isLoading = false;
      state.horoscope.kundali.vimshottariDasha.error = errorMessage(errorResponse, "Unable to load Vimshottari child details.");
    } finally {
      render();
    }
  }

  async function loadDrigbalAnalysis() {
    await ensureShadbalAnalysis();
  }

  async function loadCheshtabalAnalysis() {
    await ensureShadbalAnalysis();
  }

  async function loadNaisargikBalAnalysis() {
    await ensureShadbalAnalysis();
  }

  async function ensureShadbalAnalysis(forceReload = false) {
    const kundali = state.horoscope.kundali;
    if (!kundali) return;
    if (!kundali.sidePanel) {
      kundali.sidePanel = { active: "shadbal", menuOpen: false, karakAkarak: {} };
    }
    if (!kundali.sidePanel.shadbalAnalysis || forceReload) {
      await loadShadbalAnalysis(forceReload);
    }
  }

  function normalizeShadbalRows(payload) {
    if (Array.isArray(payload)) {
      return payload.map(normalizeShadbalRow).filter((row) => row.planet);
    }

    const source =
      payload?.shadbal ||
      payload?.analysis?.shadbal ||
      payload?.sthanbal ||
      payload?.sthana_bala ||
      payload?.sthanabala ||
      payload?.sthan_bala ||
      payload?.analysis?.sthanbal ||
      payload?.analysis?.sthana_bala ||
      payload?.analysis?.sthan_bala ||
      payload?.analysis?.shadbal ||
      payload?.planet_wise_values ||
      payload?.data ||
      payload;

    const rows = Array.isArray(source)
      ? source
      : Array.isArray(source?.rows)
        ? source.rows
      : Array.isArray(source?.planets)
          ? source.planets
          : source?.planets && typeof source.planets === "object"
            ? Object.entries(source.planets).map(([planet, value]) => ({
                planet,
                ...(value && typeof value === "object" ? value : {}),
              }))
          : Array.isArray(source?.planetWiseValues)
            ? source.planetWiseValues
            : source?.planet_wise_values && typeof source.planet_wise_values === "object"
              ? Object.entries(source.planet_wise_values).map(([planet, value]) => ({
                  planet,
                  ...(value && typeof value === "object" ? value : {}),
                }))
              : Array.isArray(source?.summary)
                ? source.summary
              : source && typeof source === "object" && source !== payload
                ? Object.entries(source)
                    .filter(([key, value]) => !["rows", "planets", "data", "summary", "analysis", "shadbal", "sthanbal"].includes(key) && value && typeof value === "object")
                    .map(([planet, value]) => ({
                      planet,
                      ...value,
                    }))
              : [];

    return rows.map(normalizeShadbalRow).filter((row) => row.planet);
  }

  function normalizeShadbalAnalysis(payload) {
    const shadbala = payload?.shadbala || payload?.analysis?.shadbala || payload?.shadbal || payload?.analysis?.shadbal || payload;
    const components = shadbala?.components || {};
    const planets = Array.isArray(shadbala?.planets) ? shadbala.planets : Array.isArray(shadbala?.rows) ? shadbala.rows : [];
    const planetRows = planets.map((row) => ({
      planet: row?.planet || row?.body || row?.name || row?.graha || row?.grah || row?.planet_name || row?.planetName || row?.planet_key || row?.planetKey,
      total_score: row?.total_score ?? row?.totalScore ?? row?.total,
      rupas: row?.rupas ?? row?.in_rupas ?? row?.inRupas,
      strength_ratio: row?.strength_ratio ?? row?.strengthRatio,
      components: row?.components || {},
      nature: row?.nature,
    })).filter((row) => row.planet);

    const tabRows = planetRows.length ? planetRows : normalizeShadbalRows(payload);
    const componentKeys = Object.keys(components);
    const byPlanet = (componentKey) => tabRows.map((row) => ({
      planet: row.planet,
      total_score: row.total_score,
      rupas: row.rupas,
      strength_ratio: row.strength_ratio,
      components: {
        [componentKey]: row.components?.[componentKey] ?? null,
        ...row.components,
      },
    }));

    return {
      raw: shadbala,
      sthanbal: { isLoading: false, error: "", rows: byPlanet("sthana_bala") },
      kaalbal: { isLoading: false, error: "", rows: byPlanet("kaala_bala"), componentKeys: componentKeys.length ? ["kaala_bala"] : [] },
      digbala: { isLoading: false, error: "", rows: byPlanet("dig_bala") },
      drikbal: {
        isLoading: false,
        error: "",
        rows: tabRows.map((row) => ({
          ...row,
          nature: row.nature || "-",
          benefic_aspects: row.components?.benefic_aspects,
          malefic_aspects: row.components?.malefic_aspects,
          drishti_pinda: row.components?.drishti_pinda,
          drig_bala: row.components?.drik_bala,
        })),
      },
      cheshtabal: { isLoading: false, error: "", rows: byPlanet("cheshta_bala") },
      "naisargik-bal": { isLoading: false, error: "", rows: byPlanet("naisargika_bala") },
    };
  }

  function normalizeShadbalRow(row) {
    const planet = row?.planet || row?.body || row?.name || row?.graha || row?.grah || row?.planet_name || row?.planetName || row?.body_name;
    const components = row?.components || {};
    return {
      planet,
      total_score: row?.total_score ?? row?.totalScore ?? row?.total ?? row?.sthana_bala ?? row?.sthan_bal ?? row?.sthanabala ?? row?.sthanbal ?? row?.sthan_bala,
      rupas: row?.rupas ?? row?.in_rupas ?? row?.inRupas,
      components: {
        uchcha: components?.uchcha ?? row?.uchha ?? row?.uchcha,
        saptavargaja: components?.saptavargaja ?? row?.saptavargaja ?? row?.saptavarga,
        oja_yugma: components?.oja_yugma ?? row?.oja_yugma ?? row?.ojaYugma,
        kendra: components?.kendra ?? row?.kendra,
        drekkana: components?.drekkana ?? row?.drekkana,
      },
    };
  }

  function formatShadbalPlanetLabel(planet) {
    const value = String(planet || "").trim();
    if (!value) return "-";
    return value
      .split(/[_\-\s]+/)
      .map((part) => part ? part.charAt(0).toUpperCase() + part.slice(1) : part)
      .join(" ");
  }

  function normalizeKaalbalRows(payload) {
    const source = payload?.planets?.planets && typeof payload.planets.planets === "object"
      ? payload.planets.planets
      : payload?.planets && typeof payload.planets === "object"
        ? payload.planets
        : payload?.planet_wise_values && typeof payload.planet_wise_values === "object"
          ? payload.planet_wise_values
          : payload?.planetWiseValues && typeof payload.planetWiseValues === "object"
            ? payload.planetWiseValues
            : payload?.data && typeof payload.data === "object"
              ? payload.data
              : payload?.analysis?.planets && typeof payload.analysis.planets === "object"
                ? payload.analysis.planets
                : payload?.analysis?.planet_wise_values && typeof payload.analysis.planet_wise_values === "object"
                  ? payload.analysis.planet_wise_values
                  : payload;

    const rawRows = [];
    if (Array.isArray(source)) {
      source.forEach((row) => rawRows.push({ key: row?.planet_key || row?.planetKey || row?.planet, value: row }));
    } else if (source && typeof source === "object") {
      if (Array.isArray(source.rows)) {
        source.rows.forEach((row) => rawRows.push({ key: row?.planet_key || row?.planetKey || row?.planet, value: row }));
      } else if (Array.isArray(source.planets)) {
        source.planets.forEach((row) => rawRows.push({ key: row?.planet_key || row?.planetKey || row?.planet, value: row }));
      } else {
        Object.entries(source).forEach(([key, value]) => {
          if (key !== "rows" && key !== "planets" && key !== "data" && key !== "analysis") {
            rawRows.push({ key, value });
          }
        });
      }
    }

    const rows = rawRows.map(({ key, value }) => {
      const row = value && typeof value === "object" ? value : {};
      return {
        planet: row?.planet || row?.body || row?.name || row?.graha || row?.grah || row?.planet_name || row?.planetName || row?.body_name || row?.planet_key || row?.planetKey || key,
        total_score: row?.total_score ?? row?.totalScore ?? row?.total,
        components: {
          natonnata: row?.natonnata ?? row?.natonnata_score,
          paksha: row?.paksha ?? row?.paksha_score,
          tribhaga: row?.tribhaga ?? row?.tribhaga_score,
          abda: row?.abda ?? row?.abda_score,
          masa: row?.masa ?? row?.masa_score,
          vaara: row?.vaara ?? row?.vaara_score,
          hora: row?.hora ?? row?.hora_score,
          ayana: row?.ayana ?? row?.ayana_score,
        },
      };
    }).filter((row) => row.planet);

    const componentKeys = ["natonnata", "paksha", "tribhaga", "abda", "masa", "vaara", "hora", "ayana"];
    return { rows, componentKeys };
  }

  function normalizeBhavbalaRows(payload) {
    const source =
      payload?.houses ||
      payload?.bhavbala?.houses ||
      payload?.bhavbala?.planets ||
      payload?.planets ||
      payload?.planet_wise_values ||
      payload?.planetWiseValues ||
      payload?.data ||
      payload?.analysis?.bhavbala?.houses ||
      payload?.analysis?.bhavbala?.planets ||
      payload?.analysis?.houses ||
      payload?.analysis?.planets ||
      payload;

    const rows = [];
    if (Array.isArray(source)) {
      source.forEach((row) => rows.push(row));
    } else if (source && typeof source === "object") {
      if (Array.isArray(source.rows)) {
        source.rows.forEach((row) => rows.push(row));
      } else {
        Object.entries(source).forEach(([planet, value]) => {
          if (value && typeof value === "object") {
            rows.push({ planet, ...value });
          }
        });
      }
    }

    return rows.map((row) => ({
      planet: row?.house ? `House ${row.house} (${row.house_lord || row.planet})` : (row?.house_lord || row?.planet || row?.body || row?.name || row?.graha || row?.grah || row?.planet_name || row?.planetName || row?.body_name),
      bhavbala: row?.bhav_bala ?? row?.bhavbala ?? row?.bhava_bala ?? row?.bhavaBala,
      house_lord_strength: row?.house_lord_strength ?? row?.houseLordStrength,
      house_digbala: row?.house_digbala ?? row?.houseDigbala,
      house_drigbala: row?.house_drigbala ?? row?.houseDrigbala,
    })).filter((row) => row.planet);
  }

  function normalizeCuspDetails(payload) {
    const sourceRows = Array.isArray(payload?.cusps)
      ? payload.cusps
      : Array.isArray(payload?.data?.cusps)
        ? payload.data.cusps
        : Array.isArray(payload?.result?.cusps)
          ? payload.result.cusps
          : Array.isArray(payload?.rows)
            ? payload.rows
            : [];

    const normalizedRows = sourceRows.map((row, index) => ({
      house_number: row?.house_number ?? row?.houseNumber ?? index + 1,
      cusp_longitude: row?.cusp_longitude ?? row?.cuspLongitude ?? row?.longitude ?? "-",
      sign: row?.sign ?? "-",
      sign_index: row?.sign_index ?? row?.signIndex ?? "-",
      degree_in_sign: row?.degree_in_sign ?? row?.degreeInSign ?? "-",
      nakshatra: row?.nakshatra ?? "-",
      nakshatra_index: row?.nakshatra_index ?? row?.nakshatraIndex ?? "-",
      rashi_swami: row?.rashi_swami ?? row?.rashiSwami ?? "-",
      nakshatra_swami: row?.nakshatra_swami ?? row?.nakshatraSwami ?? "-",
      sub_lord: row?.sub_lord ?? row?.subLord ?? "-",
      sub_sub_lord: row?.sub_sub_lord ?? row?.subSubLord ?? "-",
    }));

    const columns = [
      "house_number",
      "cusp_longitude",
      "sign",
      "degree_in_sign",
      "nakshatra",
      "rashi_swami",
      "nakshatra_swami",
      "sub_lord",
    ];
    return { rows: normalizedRows, columns };
  }

  function normalizeNakshatraNadiDetails(payload) {
    const planets = payload?.planets || payload?.data?.planets || payload?.result?.planets || {};
    return Object.entries(planets).map(([planetKey, row]) => ({
      planet_key: row?.planet_key || planetKey,
      current_planet: normalizeNakshatraNadiReference(row?.current_planet),
      nakshatra_lord: normalizeNakshatraNadiReference(row?.nakshatra_lord),
      sub_lord: normalizeNakshatraNadiReference(row?.sub_lord),
    }));
  }

  function normalizeNakshatraNadiReference(value) {
    return {
      planet_key: value?.planet_key ?? value?.planetKey ?? "-",
      value: Array.isArray(value?.value) ? value.value : [],
    };
  }

  function formatCuspLabel(value) {
    return String(value || "")
      .replace(/_/g, " ")
      .replace(/\b\w/g, (ch) => ch.toUpperCase());
  }

  function formatCuspValue(value) {
    if (value === null || value === undefined || value === "") return "-";
    if (typeof value === "number") {
      return Number.isInteger(value) ? String(value) : value.toFixed(6).replace(/\.?0+$/, "");
    }
    return String(value);
  }

  function formatCuspLongitude(value) {
    const number = Number(value);
    if (!Number.isFinite(number)) return "-";
    const wholeDegrees = Math.floor(number);
    const minutesFloat = (number - wholeDegrees) * 60;
    const wholeMinutes = Math.floor(minutesFloat);
    const seconds = Math.round((minutesFloat - wholeMinutes) * 60);
    const normalizedMinutes = wholeMinutes + Math.floor(seconds / 60);
    const normalizedSeconds = seconds % 60;
    const normalizedDegrees = wholeDegrees + Math.floor(normalizedMinutes / 60);
    const displayMinutes = String(normalizedMinutes % 60).padStart(2, "0");
    const displaySeconds = String(normalizedSeconds).padStart(2, "0");
    return `${normalizedDegrees}° ${displayMinutes}' ${displaySeconds}"`;
  }

  function formatNakshatraNadiValue(value) {
    if (!Array.isArray(value) || !value.length) return "";
    return [...value]
      .map((item) => Number(item))
      .filter((item) => Number.isFinite(item))
      .sort((first, second) => first - second)
      .join(", ");
  }

  function normalizeDigbalRows(payload) {
    const source =
      payload?.digbala ||
      payload?.planets ||
      payload?.planet_wise_values ||
      payload?.planetWiseValues ||
      payload?.data ||
      payload?.analysis?.digbala ||
      payload?.analysis?.planets ||
      payload?.analysis?.planet_wise_values ||
      payload;

    const rawRows = Array.isArray(source)
      ? source
      : source && typeof source === "object" && !Array.isArray(source)
        ? Object.values(source)
      : Array.isArray(source?.planets)
        ? source.planets
        : Array.isArray(source?.rows)
          ? source.rows
          : Array.isArray(source?.planet_wise_values)
            ? Object.values(source.planet_wise_values)
            : [];

    const rows = rawRows.map((row) => ({
      planet: row?.planet || row?.body || row?.name || row?.graha || row?.grah || row?.planet_name || row?.planetName || row?.body_name || row?.planet_key || row?.planetKey,
      digbala_virupa: row?.digbala_virupa ?? row?.digbalaVirupa ?? row?.virupa ?? row?.virupa_value,
      digbala_rupa: row?.digbala_rupa ?? row?.digbalaRupa ?? row?.rupa ?? row?.rupa_value,
    })).filter((row) => row.planet);
    return { rows };
  }

  function normalizeDrigbalRows(payload) {
    const source =
      payload?.drigbal ||
      payload?.drig_bala ||
      payload?.drishti ||
      payload?.planets ||
      payload?.planet_wise_values ||
      payload?.planetWiseValues ||
      payload?.data ||
      payload?.analysis?.drigbal ||
      payload?.analysis?.drig_bala ||
      payload?.analysis?.drishti ||
      payload?.analysis?.planets ||
      payload?.analysis?.planet_wise_values ||
      payload;

    let rawRows = [];
    if (Array.isArray(source)) {
      rawRows = source;
    } else if (source && typeof source === "object") {
      if (Array.isArray(source.rows)) {
        rawRows = source.rows;
      } else if (Array.isArray(source.planets)) {
        rawRows = source.planets;
      } else if (source.planet_wise_values && typeof source.planet_wise_values === "object") {
        rawRows = Object.entries(source.planet_wise_values).map(([planet, value]) => ({ planet, ...(value || {}) }));
      } else if (source.planets && typeof source.planets === "object") {
        rawRows = Object.entries(source.planets).map(([planet, value]) => ({ planet, ...(value || {}) }));
      } else if (
        "nature" in source ||
        "benefic_aspects" in source ||
        "malefic_aspects" in source ||
        "drishti_pinda" in source ||
        "drig_bala" in source ||
        "rupas" in source
      ) {
        rawRows = [source];
      } else {
        rawRows = Object.values(source);
      }
    }

    const rows = rawRows.map((row, index) => {
      const sourceRow = row && typeof row === "object" ? row : {};
      return {
        planet: sourceRow?.planet || sourceRow?.body || sourceRow?.name || sourceRow?.graha || sourceRow?.grah || sourceRow?.planet_name || sourceRow?.planetName || sourceRow?.body_name || sourceRow?.planet_key || sourceRow?.planetKey || String(index + 1),
        nature: sourceRow?.nature ?? sourceRow?.drig_nature ?? sourceRow?.drigNature,
        benefic_aspects: sourceRow?.benefic_aspects ?? sourceRow?.beneficAspects ?? sourceRow?.benefic_aspect ?? sourceRow?.beneficAspect,
        malefic_aspects: sourceRow?.malefic_aspects ?? sourceRow?.maleficAspects ?? sourceRow?.malefic_aspect ?? sourceRow?.maleficAspect,
        drishti_pinda: sourceRow?.drishti_pinda ?? sourceRow?.drishtiPinda,
        drig_bala: sourceRow?.drig_bala ?? sourceRow?.drigBala,
        rupas: sourceRow?.rupas ?? sourceRow?.rupa,
      };
    }).filter((row) =>
      row.nature !== undefined ||
      row.benefic_aspects !== undefined ||
      row.malefic_aspects !== undefined ||
      row.drishti_pinda !== undefined ||
      row.drig_bala !== undefined ||
      row.rupas !== undefined
    );

    return { rows };
  }

  function normalizeCheshtabalRows(payload) {
    const source =
      payload?.cheshtabala?.planets ||
      payload?.cheshtabala ||
      payload?.planets ||
      payload?.cheshtabal ||
      payload?.cheshta_bala ||
      payload?.cheshta_bal ||
      payload?.planet_wise_values ||
      payload?.planetWiseValues ||
      payload?.data ||
      payload?.analysis?.cheshtabala?.planets ||
      payload?.analysis?.cheshtabala ||
      payload?.analysis?.planets ||
      payload?.analysis?.cheshtabal ||
      payload?.analysis?.cheshta_bala ||
      payload?.analysis?.cheshta_bal ||
      payload;

    const rawRows = [];
    if (Array.isArray(source)) {
      source.forEach((row) => rawRows.push({ key: row?.planet_key || row?.planetKey || row?.planet, value: row }));
    } else if (source && typeof source === "object") {
      if (source.planets && typeof source.planets === "object" && !Array.isArray(source.planets)) {
        Object.entries(source.planets).forEach(([key, value]) => rawRows.push({ key, value }));
      } else if (source.planets && Array.isArray(source.planets)) {
        source.planets.forEach((row) => rawRows.push({ key: row?.planet_key || row?.planetKey || row?.planet, value: row }));
      } else if (source.cheshtabala && typeof source.cheshtabala.planets === "object" && !Array.isArray(source.cheshtabala.planets)) {
        Object.entries(source.cheshtabala.planets).forEach(([key, value]) => rawRows.push({ key, value }));
      } else if (source.cheshtabala && Array.isArray(source.cheshtabala.planets)) {
        source.cheshtabala.planets.forEach((row) => rawRows.push({ key: row?.planet_key || row?.planetKey || row?.planet, value: row }));
      } else if (source.cheshtabala && typeof source.cheshtabala === "object") {
        Object.entries(source.cheshtabala).forEach(([key, value]) => {
          if (key !== "rule" && key !== "birth_datetime" && key !== "timezone" && key !== "julian_day_utc") {
            rawRows.push({ key, value });
          }
        });
      } else if (source.planets && typeof source.planets === "object" && !Array.isArray(source.planets)) {
        Object.entries(source.planets).forEach(([key, value]) => rawRows.push({ key, value }));
      } else if (source.planets && Array.isArray(source.planets)) {
        source.planets.forEach((row) => rawRows.push({ key: row?.planet_key || row?.planetKey || row?.planet, value: row }));
      } else if (source.rows && Array.isArray(source.rows)) {
        source.rows.forEach((row) => rawRows.push({ key: row?.planet_key || row?.planetKey || row?.planet, value: row }));
      } else if (source.planet_wise_values && typeof source.planet_wise_values === "object") {
        Object.entries(source.planet_wise_values).forEach(([key, value]) => rawRows.push({ key, value }));
      } else {
        Object.entries(source).forEach(([key, value]) => {
          if (value && typeof value === "object" && key !== "rule" && key !== "birth_datetime" && key !== "timezone" && key !== "julian_day_utc") {
            rawRows.push({ key, value });
          }
        });
      }
    }

    return rawRows.map(({ key, value }) => {
      const row = value || {};
      return {
        planet: row?.planet || row?.body || row?.name || row?.graha || row?.grah || row?.planet_name || row?.planetName || row?.body_name || row?.planet_key || row?.planetKey || key,
        cheshta_bal: row?.cheshta_bal ?? row?.cheshta_bala ?? row?.cheshtaBala ?? row?.bala ?? row?.value,
        cheshta_rupas: row?.cheshta_rupas ?? row?.cheshtaRupas ?? row?.rupas,
      };
    }).filter((row) => row.planet);
  }

  function normalizeNaisargikBalRows(payload) {
    const source =
      payload?.naisargik_strength ||
      payload?.naisargikStrength ||
      payload?.naisargik_bala ||
      payload?.naisargikBala ||
      payload?.naisargikbala ||
      payload?.planets ||
      payload?.planet_wise_values ||
      payload?.planetWiseValues ||
      payload?.data ||
      payload?.analysis?.naisargik_strength ||
      payload?.analysis?.naisargikStrength ||
      payload?.analysis?.naisargik_bala ||
      payload?.analysis?.naisargikBala ||
      payload?.analysis?.naisargikbala ||
      payload?.analysis?.planets ||
      payload;

    const rawRows = [];
    if (Array.isArray(source)) {
      source.forEach((row) => rawRows.push({ key: row?.planet_key || row?.planetKey || row?.planet, value: row }));
    } else if (source && typeof source === "object") {
      if (source.naisargik_strength && Array.isArray(source.naisargik_strength)) {
        source.naisargik_strength.forEach((row) => rawRows.push({ key: row?.planet_key || row?.planetKey || row?.planet, value: row }));
      } else if (source.naisargikStrength && Array.isArray(source.naisargikStrength)) {
        source.naisargikStrength.forEach((row) => rawRows.push({ key: row?.planet_key || row?.planetKey || row?.planet, value: row }));
      } else if (source.naisargik_strength && typeof source.naisargik_strength === "object" && !Array.isArray(source.naisargik_strength)) {
        Object.entries(source.naisargik_strength).forEach(([key, value]) => rawRows.push({ key, value }));
      } else if (source.naisargikStrength && typeof source.naisargikStrength === "object" && !Array.isArray(source.naisargikStrength)) {
        Object.entries(source.naisargikStrength).forEach(([key, value]) => rawRows.push({ key, value }));
      } else
      if (source.planets && typeof source.planets === "object" && !Array.isArray(source.planets)) {
        Object.entries(source.planets).forEach(([key, value]) => rawRows.push({ key, value }));
      } else if (source.planets && Array.isArray(source.planets)) {
        source.planets.forEach((row) => rawRows.push({ key: row?.planet_key || row?.planetKey || row?.planet, value: row }));
      } else if (source.naisargikbala && typeof source.naisargikbala.planets === "object" && !Array.isArray(source.naisargikbala.planets)) {
        Object.entries(source.naisargikbala.planets).forEach(([key, value]) => rawRows.push({ key, value }));
      } else if (source.naisargikbala && Array.isArray(source.naisargikbala.planets)) {
        source.naisargikbala.planets.forEach((row) => rawRows.push({ key: row?.planet_key || row?.planetKey || row?.planet, value: row }));
      } else if (source.naisargik_bala && typeof source.naisargik_bala.planets === "object" && !Array.isArray(source.naisargik_bala.planets)) {
        Object.entries(source.naisargik_bala.planets).forEach(([key, value]) => rawRows.push({ key, value }));
      } else if (source.naisargik_bala && Array.isArray(source.naisargik_bala.planets)) {
        source.naisargik_bala.planets.forEach((row) => rawRows.push({ key: row?.planet_key || row?.planetKey || row?.planet, value: row }));
      } else if (source.naisargikBala && typeof source.naisargikBala === "object") {
        Object.entries(source.naisargikBala).forEach(([key, value]) => {
          if (key !== "rule" && key !== "birth_datetime" && key !== "timezone" && key !== "julian_day_utc") {
            rawRows.push({ key, value });
          }
        });
      } else if (source.rows && Array.isArray(source.rows)) {
        source.rows.forEach((row) => rawRows.push({ key: row?.planet_key || row?.planetKey || row?.planet, value: row }));
      } else if (source.planet_wise_values && typeof source.planet_wise_values === "object") {
        Object.entries(source.planet_wise_values).forEach(([key, value]) => rawRows.push({ key, value }));
      } else {
        Object.entries(source).forEach(([key, value]) => {
          if (value && typeof value === "object" && key !== "rule" && key !== "birth_datetime" && key !== "timezone" && key !== "julian_day_utc") {
            rawRows.push({ key, value });
          }
        });
      }
    }

    return rawRows.map(({ key, value }) => {
      const row = value || {};
      return {
        planet: row?.planet || row?.body || row?.name || row?.graha || row?.grah || row?.planet_name || row?.planetName || row?.body_name || row?.planet_key || row?.planetKey || key,
        naisargika_bala: row?.naisargika_bala ?? row?.naisargikaBala ?? row?.bala ?? row?.value,
        rupas: row?.rupas ?? row?.in_rupas ?? row?.inRupas,
      };
    }).filter((row) => row.planet);
  }

  function normalizeKaalbalComponents(components) {
    const source = components && typeof components === "object" ? components : {};
    return Object.fromEntries(
      Object.entries(source).map(([key, value]) => [key, value]),
    );
  }

  function resolveShadbalStanaBala(row) {
    const direct = firstFiniteNumber(
      row?.components?.sthana_bala,
      row?.sthana_bala,
      row?.sthanaBala,
      row?.components?.sthanaBala,
      row?.sthan_bal,
      row?.sthanabala,
      row?.sthanbal,
      row?.sthan_bala,
    );
    if (direct !== null) {
      return direct;
    }
    return null;
  }

  function formatKaalbalLabel(value) {
    if (value === null || value === undefined || value === "") return "-";
    return String(value)
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  }

  function firstFiniteNumber(...values) {
    for (const value of values) {
      const number = Number(value);
      if (Number.isFinite(number)) {
        return number;
      }
    }
    return null;
  }

  function formatAnalysisNumber(value) {
    if (value === null || value === undefined || value === "") {
      return "-";
    }
    const number = Number(value);
    return Number.isFinite(number) ? number.toFixed(2) : String(value);
  }

  function shadbalApiPath(jatakId) {
    return `/jatak/${encodeURIComponent(jatakId)}/analysis/shadbal`;
  }

  function shadbalSthanbalFallbackApiPath(jatakId) {
    return `/jatak/${encodeURIComponent(jatakId)}/analysis/sthan-bal`;
  }

  function shadbalKaalbalApiPath(jatakId) {
    return `/jatak/${encodeURIComponent(jatakId)}/analysis/kaalbal`;
  }

  function shadbalKaalbalFallbackApiPath(jatakId) {
    return `/jatak/${encodeURIComponent(jatakId)}/analysis/kaal-bal`;
  }

  function shadbalDigbalApiPath(jatakId) {
    return `/jatak/${encodeURIComponent(jatakId)}/analysis/digbala`;
  }

  function shadbalDigbalFallbackApiPath(jatakId) {
    return `/jatak/${encodeURIComponent(jatakId)}/analysis/digbala`;
  }

  function shadbalDrigbalApiPath(jatakId) {
    return `/jatak/${encodeURIComponent(jatakId)}/analysis/drigbal`;
  }

  function shadbalDrigbalFallbackApiPath(jatakId) {
    return `/jatak/${encodeURIComponent(jatakId)}/analysis/drigbal`;
  }

  function shadbalCheshtabalApiPath(jatakId) {
    return `/jatak/${encodeURIComponent(jatakId)}/analysis/cheshtabal`;
  }

  function shadbalCheshtabalFallbackApiPath(jatakId) {
    return `/jatak/${encodeURIComponent(jatakId)}/analysis/cheshta-bala`;
  }

  function shadbalNaisargikBalApiPath(jatakId) {
    return `/jatak/${encodeURIComponent(jatakId)}/analysis/naisargik-bala`;
  }

  function shadbalNaisargikBalFallbackApiPath(jatakId) {
    return `/jatak/${encodeURIComponent(jatakId)}/analysis/naisargik-bal`;
  }

  function shadbalBhavbalaApiPath(jatakId) {
    return `/jatak/${encodeURIComponent(jatakId)}/analysis/bhavabal`;
  }

  function formatPlanetLabel(value) {
    const label = String(value || "").trim();
    if (!label) return "-";
    return label
      .split(/[_\-\s]+/)
      .map((part) => part ? part.charAt(0).toUpperCase() + part.slice(1) : part)
      .join(" ");
  }

  async function loadKarakAkarakDetails() {
    const kundali = state.horoscope.kundali;
    if (!kundali) return;
    const ascendantNumber = kundaliAscendantNumber(kundali);
    if (!ascendantNumber) return;
    if (!kundali.sidePanel) {
      kundali.sidePanel = { active: "karak-akarak", menuOpen: false, karakAkarak: {} };
    }
    if (!kundali.sidePanel.karakAkarak) {
      kundali.sidePanel.karakAkarak = {};
    }
    const existing = kundali.sidePanel.karakAkarak[ascendantNumber];
    if (existing?.data || existing?.isLoading) return;
    kundali.sidePanel.karakAkarak[ascendantNumber] = { isLoading: true, error: "", data: null };
    render();
    try {
      const data = await getJson(`/reference/karak-akarak/${encodeURIComponent(ascendantNumber)}`);
      if (!state.horoscope.kundali?.sidePanel?.karakAkarak) return;
      state.horoscope.kundali.sidePanel.karakAkarak[ascendantNumber] = { isLoading: false, error: "", data };
    } catch (errorResponse) {
      if (!state.horoscope.kundali?.sidePanel?.karakAkarak) return;
      state.horoscope.kundali.sidePanel.karakAkarak[ascendantNumber] = {
        isLoading: false,
        error: errorMessage(errorResponse, "Unable to load Karak-Akarak details."),
        data: null,
      };
    }
    render();
  }

  function setGocharStep(side, step) {
    const kundali = state.horoscope.kundali;
    if (!kundali || !side) return;
    if (!kundali.gocharSteps) {
      kundali.gocharSteps = {};
    }
    kundali.gocharSteps[side] = gocharStepConfig(step) ? step : "month";
    render();
  }

  function setGocharTileSide(side) {
    const kundali = state.horoscope.kundali;
    if (!kundali) return;
    kundali.gocharTileSide = side === "right" ? "right" : "left";
    render();
  }

  async function changeGocharTime(side, direction, explicitChartKey = "", explicitStep = "") {
    const kundali = state.horoscope.kundali;
    if (!kundali || !side) return;
    if ((kundali.kundaliChoice || "home") === "kp-astrology") {
      await changeKpContextTime(direction, explicitStep || selectedGocharStep("left"));
      return;
    }
    const normalizedSide = side === "right" ? "right" : "left";
    const chartKey = normalizedSide === "right" ? "gochar" : "d1";
    kundali[normalizedSide === "right" ? "rightChartKey" : "leftChartKey"] = chartKey;

    const chart = normalizeChartPayload(activeChartForSide(kundali, normalizedSide), chartKey);
    const baseValue = chart?.calculated_at || kundali.chartTimes?.[normalizedSide] || nativeBirthIsoTimestamp(kundali.record) || "";
    const targetAt = addGocharStep(baseValue, explicitStep || selectedGocharStep(normalizedSide), direction === "backward" ? -1 : 1);
    const targetKey = chartCacheKeyForSide(normalizedSide, chartKey);

    kundali.error = "";
    if (!kundali.charts) {
      kundali.charts = {};
    }
    try {
      const fetchChartKey = normalizedSide === "left" && chartKey === "d1" ? "gochar" : chartKey;
      const fetchedChart = await getJson(`${chartFetchPath(kundali.jatakId, fetchChartKey)}?at=${encodeURIComponent(targetAt)}`);
      kundali.charts[targetKey] = fetchChartKey === "gochar" ? prepareGocharChart(fetchedChart, kundali) : chartKey === "chalit" ? normalizeChartPayload(fetchedChart, "chalit") : fetchedChart;
      if (!kundali.chartTimes) kundali.chartTimes = {};
      kundali.chartTimes[normalizedSide] = fetchedChart?.calculated_at || targetAt;
      kundali.contextAt = kundali.chartTimes[normalizedSide];
      if ((kundali.kundaliChoice || "panchanga") === "kp-astrology") {
        await applyKundaliKpChartPairForTime(kundali, targetAt);
      }
      render();
      refreshKundaliDependentPanelsAfterTimeChange(kundali);
    } catch {
      kundali.error = t("horoscope.chartLoadError");
    }
    render();
  }

  async function changeKpContextTime(direction, step) {
    const kundali = state.horoscope.kundali;
    if (!kundali) return;
    const baseValue = kundali.contextAt || kundali.chartTimes?.left || nativeBirthIsoTimestamp(kundali.record) || "";
    const targetAt = addGocharStep(baseValue, step, direction === "backward" ? -1 : 1);
    kundali.contextAt = targetAt;
    kundali.gocharTileSide = "left";
    kundali.error = "";
    try {
      await applyKundaliKpChartPairForTime(kundali, targetAt);
      render();
      if (kundali.rightPanelActive === "vimshottari-dasha") {
        await loadKundaliVimshottariDasha(true);
      }
    } catch {
      kundali.error = t("horoscope.chartLoadError");
      render();
    }
  }

  async function refreshKundaliDependentPanelsAfterTimeChange(kundali) {
    if (!kundali) return;
    if (kundali.rightPanelActive === "vimshottari-dasha") {
      await loadKundaliVimshottariDasha(true);
    }
  }

  async function applyKundaliKpChartPairForTime(kundali, targetAt) {
    if (!kundali) return;
    kundali.leftChartKey = "d1";
    kundali.rightChartKey = "chalit";
    if (!kundali.charts) kundali.charts = {};
    try {
      const leftKey = chartCacheKeyForSide("left", "d1");
      const gochar = await getJson(`${chartFetchPath(kundali.jatakId, "gochar")}?at=${encodeURIComponent(targetAt)}`);
      kundali.charts[leftKey] = prepareGocharChart(gochar, kundali);
      if (!kundali.chartTimes) kundali.chartTimes = {};
      kundali.chartTimes.left = gochar?.calculated_at || targetAt;
      const chalitKey = chartCacheKeyForSide("right", "chalit");
      const chalit = await getJson(`${chartFetchPath(kundali.jatakId, "chalit")}?at=${encodeURIComponent(targetAt)}`);
      kundali.charts[chalitKey] = normalizeChartPayload(chalit, "chalit");
      if (!kundali.chalitTimes) kundali.chalitTimes = {};
      kundali.chalitTimes.right = chalit?.calculated_at || targetAt;
      if (!kundali.chartTimes) kundali.chartTimes = {};
      kundali.chartTimes.right = chalit?.calculated_at || targetAt;
    } catch {
      kundali.error = t("horoscope.chartLoadError");
    }
  }

  function kundaliTimestampedPath(path, kundali) {
    if (!kundali?.contextAt) return path;
    const separator = path.includes("?") ? "&" : "?";
    return `${path}${separator}at=${encodeURIComponent(kundali.contextAt)}`;
  }

  function vimshottariChildrenPath(jatakId, path, contextAt = "") {
    const base = `/jatak/${encodeURIComponent(jatakId)}/dasha/vimshottari/children?path=${encodeURIComponent(path)}`;
    return contextAt ? `${base}&at=${encodeURIComponent(contextAt)}` : base;
  }

  function activeChartForSide(kundali, side) {
    const chartKey = side === "right" ? kundali.rightChartKey : kundali.leftChartKey;
    const cacheKey = chartCacheKeyForSide(side, chartKey);
    const chart = kundali.charts && kundali.charts[cacheKey];
    return chartKey === "gochar" ? prepareGocharChart(chart, kundali) : chart;
  }

  function chartCacheKeyForSide(side, chartKey) {
    if (chartKey === "gochar") return gocharChartCacheKey(side);
    if (chartKey === "chalit") return `chalit_${side || "left"}`;
    return chartKey;
  }

  function selectedGocharStep(side) {
    const kundali = state.horoscope.kundali || {};
    const steps = kundali.gocharSteps || {};
    return steps[side] || "month";
  }

  function addGocharStep(baseValue, step, direction) {
    const date = new Date(baseValue);
    const target = Number.isNaN(date.getTime()) ? new Date() : date;
    const amount = direction < 0 ? -1 : 1;
    const config = gocharStepConfig(step) || gocharStepConfig("month");
    if (config.unit === "minute") target.setMinutes(target.getMinutes() + amount * config.value);
    if (config.unit === "hour") target.setHours(target.getHours() + amount * config.value);
    if (config.unit === "day") target.setDate(target.getDate() + amount * config.value);
    if (config.unit === "week") target.setDate(target.getDate() + amount * config.value * 7);
    if (config.unit === "month") target.setMonth(target.getMonth() + amount * config.value);
    if (config.unit === "year") target.setFullYear(target.getFullYear() + amount * config.value);
    return target.toISOString();
  }

  function gocharStepConfig(step) {
    const map = {
      week: { unit: "week", value: 1 },
      hour: { unit: "hour", value: 1 },
      day: { unit: "day", value: 1 },
      month: { unit: "month", value: 1 },
      year: { unit: "year", value: 1 },
      "10min": { unit: "minute", value: 10 },
      "1min": { unit: "minute", value: 1 },
      "5year": { unit: "year", value: 5 },
    };
    return map[step] || null;
  }

  function closeChartPickers() {
    app.querySelectorAll(".chart-picker.open").forEach((picker) => {
      picker.classList.remove("open");
      picker.querySelector(".chart-picker-button")?.setAttribute("aria-expanded", "false");
    });
  }

  function chartFetchPath(jatakId, chartKey) {
    const endpointMap = {
      d1: "rasi",
      gochar: "gochar",
      chalit: "chalit",
      d2: "d2",
      d3: "d3",
      d4: "d4",
      d5: "d5",
      d7: "d7",
      d8: "d8",
      d9: "d9",
      d10: "d10",
      d12: "d12",
      d16: "d16",
      d20: "d20",
      d24: "d24",
      d27: "d27",
      d30: "d30",
      d40: "d40",
      d45: "d45",
      d60: "d60",
      jaimini: "jaimini",
    };
    const endpoint = endpointMap[chartKey] || "rasi";
    return `/jatak/${encodeURIComponent(jatakId)}/chart/${endpoint}`;
  }

  function gocharChartCacheKey(side) {
    return `gochar_${side === "right" ? "right" : "left"}`;
  }

  function planetStatusApiPath(jatakId) {
    return `/jatak/${encodeURIComponent(jatakId)}/analysis/planet-status`;
  }

  function chartDisplayName(chartKey) {
    return chartCatalogItem(chartKey).description.split(" - ")[0] || String(chartKey || "").toUpperCase();
  }

  function chartCatalogItem(chartKey) {
    return CHART_CATALOG.find((chart) => chart.key === chartKey) || CHART_CATALOG[0];
  }

  async function saveHoroscope() {
    const horoscope = state.horoscope;
    const form = readHoroscopeForm();
    horoscope.form = form;
    horoscope.error = "";
    horoscope.message = "";

    if (!form.name || !form.day || !form.month || !form.year || !form.time) {
      horoscope.error = t("horoscope.required");
      render();
      return;
    }
    if (!form.cityId) {
      horoscope.error = t("horoscope.cityRequired");
      render();
      return;
    }

    const selectedCity = selectedHoroscopeCity();
    if (!selectedCity) {
      horoscope.error = t("horoscope.cityRequired");
      render();
      return;
    }

    horoscope.isSaving = true;
    render();

    const payload = {
      city_name: selectedCity.city_name || selectedCity.name || "",
      create_by: state.client?.client_email || state.client?.client_name || state.client?.username || "admin",
      date: formatHoroscopeDate(form.day, form.month, form.year),
      jatak_full_name: form.name,
      latitude: selectedCity.latitude ?? "",
      longitude: selectedCity.longitude ?? "",
      time: form.time,
      timezone: "Asia/Kolkata",
    };

    try {
      if (horoscope.mode === "edit" && horoscope.editingId) {
        await putJson(`/jatak/${encodeURIComponent(horoscope.editingId)}`, payload);
        horoscope.message = t("horoscope.updated");
      } else {
        await postJson("/jatak", payload);
        horoscope.message = t("horoscope.saved");
      }
      horoscope.mode = "list";
      horoscope.editingId = null;
      horoscope.form = defaultHoroscopeForm();
      await loadHoroscopePage();
      loadDashboardData();
    } catch (errorResponse) {
      horoscope.error = errorResponse && errorResponse.message ? errorResponse.message : t("horoscope.saveError");
      render();
    } finally {
      horoscope.isSaving = false;
      render();
    }
  }

  async function loadCountries() {
    const location = state.locationPreference;
    location.isLoadingCountries = true;
    location.error = "";
    render();
    try {
      location.countries = await getJson("/locations/countries");
    } catch {
      location.error = t("location.loadError");
    } finally {
      location.isLoadingCountries = false;
      render();
    }
  }

  async function loadStates(countryCode) {
    const location = state.locationPreference;
    location.selectedCountryCode = countryCode;
    location.selectedStateCode = "";
    location.selectedCityKey = "";
    location.states = [];
    location.cities = [];
    location.message = "";
    location.error = "";
    if (!countryCode) {
      render();
      return;
    }

    location.isLoadingStates = true;
    render();
    try {
      location.states = await getJson(`/locations/states?country_code=${encodeURIComponent(countryCode)}`);
    } catch {
      location.error = t("location.loadError");
    } finally {
      location.isLoadingStates = false;
      render();
    }
  }

  async function loadCities(stateCode) {
    const location = state.locationPreference;
    location.selectedStateCode = stateCode;
    location.selectedCityKey = "";
    location.cities = [];
    location.message = "";
    location.error = "";
    if (!location.selectedCountryCode || !stateCode) {
      render();
      return;
    }

    location.isLoadingCities = true;
    render();
    try {
      location.cities = await getJson(`/locations/cities?country_code=${encodeURIComponent(location.selectedCountryCode)}&state_code=${encodeURIComponent(stateCode)}`);
    } catch {
      location.error = t("location.loadError");
    } finally {
      location.isLoadingCities = false;
      render();
    }
  }

  async function saveLocationPreference() {
    const location = state.locationPreference;
    const city = selectedLocationCity();
    if (!city || city.latitude === null || city.latitude === undefined || city.longitude === null || city.longitude === undefined) {
      location.error = t("location.required");
      location.message = "";
      render();
      return;
    }

    location.isSaving = true;
    location.error = "";
    location.message = "";
    render();

    try {
      await postJson("/cities", {
        city_id: city.city_id,
        city_name: city.city_name,
        state_code: city.state_code,
        state_name: city.state_name,
        country_code: city.country_code,
        country_name: city.country_name,
        latitude: city.latitude,
        longitude: city.longitude,
        created_by: state.client.client_email,
      });
      location.message = t("location.saved");
    } catch (errorResponse) {
      location.error = errorResponse && errorResponse.message ? errorResponse.message : t("location.saveError");
    } finally {
      location.isSaving = false;
      render();
    }
  }

  function selectedLocationCity() {
    if (state.locationPreference.selectedCityKey === "") {
      return null;
    }
    const index = Number(state.locationPreference.selectedCityKey);
    if (!Number.isInteger(index) || index < 0) {
      return null;
    }
    return state.locationPreference.cities[index] || null;
  }

  function selectedHoroscopeCity() {
    const cityId = state.horoscope.form?.cityId || app.querySelector("#jatakCity")?.value || "";
    if (!cityId) {
      return null;
    }
    return (
      state.horoscope.cities.find((city) => String(city.id) === String(cityId) || String(city.city_id) === String(cityId)) || null
    );
  }

  function formatHoroscopeDate(day, month, year) {
    const monthMap = {
      Jan: "Jan",
      Feb: "Feb",
      Mar: "Mar",
      Apr: "Apr",
      May: "May",
      Jun: "Jun",
      Jul: "Jul",
      Aug: "Aug",
      Sep: "Sep",
      Oct: "Oct",
      Nov: "Nov",
      Dec: "Dec",
    };
    return `${day}-${monthMap[month] || month || "Jan"}-${year}`;
  }

  function defaultHoroscopeForm() {
    return {
      name: "",
      day: "",
      month: "",
      year: "",
      time: "",
      cityId: "",
    };
  }

  function readHoroscopeForm() {
    return {
      name: (app.querySelector("#jatakName")?.value || "").trim(),
      day: app.querySelector("#jatakDay")?.value || "",
      month: app.querySelector("#jatakMonth")?.value || "",
      year: (app.querySelector("#jatakYear")?.value || "").trim(),
      time: (app.querySelector("#jatakTime")?.value || "").trim(),
      cityId: app.querySelector("#jatakCity")?.value || "",
    };
  }

  function formFromJatak(record) {
    const dateParts = String(record.date || "").split("-");
    return {
      name: record.jatak_full_name || "",
      day: dateParts[0] || "",
      month: dateParts[1] || "",
      year: dateParts[2] || "",
      time: record.time || "",
      cityId: record.city_id || "",
    };
  }

  function dayOptions(selectedDay) {
    return `<option value="">${t("horoscope.day")}</option>${Array.from({ length: 31 }, (_, index) => {
      const day = String(index + 1).padStart(2, "0");
      return `<option value="${day}" ${selectedDay === day ? "selected" : ""}>${day}</option>`;
    }).join("")}`;
  }

  function monthOptions(selectedMonth) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `<option value="">${t("horoscope.month")}</option>${months.map((month) => `<option value="${month}" ${selectedMonth === month ? "selected" : ""}>${month}</option>`).join("")}`;
  }

  function setLanguage(language) {
    state.language = language === "mr" ? "mr" : "en";
    localStorage.setItem(STORAGE_KEYS.language, state.language);
    document.documentElement.lang = state.language === "mr" ? "mr" : "en";
    render();
  }

  function logout() {
    localStorage.removeItem(STORAGE_KEYS.client);
    state.client = null;
    state.route = "dashboard";
    state.charts = [];
    resetLocationPreference();
    render();
  }

  function resetLocationPreference() {
    state.locationPreference = {
      countries: [],
      states: [],
      cities: [],
      selectedCountryCode: "",
      selectedStateCode: "",
      selectedCityKey: "",
      isLoadingCountries: false,
      isLoadingStates: false,
      isLoadingCities: false,
      isSaving: false,
      message: "",
      error: "",
    };
  }

  function t(key) {
    return (state.messages[state.language] && state.messages[state.language][key]) || (state.messages.en && state.messages.en[key]) || key;
  }

  async function loadIni(path) {
    const response = await fetch(path);
    const text = await response.text();
    return text.split(/\r?\n/).reduce((messages, line) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#") || trimmed.startsWith(";")) {
        return messages;
      }

      const separator = trimmed.indexOf("=");
      if (separator > -1) {
        messages[trimmed.slice(0, separator).trim()] = trimmed.slice(separator + 1).trim();
      }
      return messages;
    }, {});
  }

  async function loadText(path) {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`Unable to load ${path}`);
    }
    return response.text();
  }

  async function getJson(path) {
    let response;
    try {
      response = await fetch(API_BASE_URL + path);
    } catch (error) {
      error.isNetworkError = true;
      throw error;
    }
    if (!response.ok) {
      throw await responseError(response);
    }
    return readResponseBody(response);
  }

  async function postJson(path, body) {
    let response;
    try {
      response = await fetch(API_BASE_URL + path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch (error) {
      error.isNetworkError = true;
      throw error;
    }
    if (!response.ok) {
      throw await responseError(response);
    }
    return readResponseBody(response);
  }

  async function putJson(path, body) {
    let response;
    try {
      response = await fetch(API_BASE_URL + path, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch (error) {
      error.isNetworkError = true;
      throw error;
    }
    if (!response.ok) {
      throw await responseError(response);
    }
    return readResponseBody(response);
  }

  async function deleteJson(path) {
    let response;
    try {
      response = await fetch(API_BASE_URL + path, { method: "DELETE" });
    } catch (error) {
      error.isNetworkError = true;
      throw error;
    }
    if (!response.ok) {
      throw await responseError(response);
    }
    return null;
  }

  function showError(element, message) {
    element.textContent = message;
    element.classList.remove("hidden");
  }

  function errorMessage(errorResponse, fallback) {
    return errorResponse && errorResponse.message ? errorResponse.message : fallback;
  }

  function displayValue(value) {
    if (value === null || value === undefined || value === "") {
      return "-";
    }
    if (typeof value === "boolean") {
      return yesNo(value) || String(value);
    }
    return String(value);
  }

  async function responseError(response) {
    const error = new Error("Request failed");
    const body = await readResponseBody(response);
    if (body && typeof body === "object") {
      error.message = typeof body.detail === "string" ? body.detail : typeof body.message === "string" ? body.message : "Request failed";
      error.detail = body.detail ?? body.message ?? body;
    } else if (typeof body === "string" && body.trim()) {
      error.message = body;
      error.detail = body;
    }
    return error;
  }

  async function readResponseBody(response) {
    if (response.status === 204 || response.status === 205) {
      return null;
    }

    const text = await response.text();
    if (!text) {
      return null;
    }

    try {
      return JSON.parse(text);
    } catch {
      return text;
    }
  }

  function toArray(value) {
    if (Array.isArray(value)) {
      return value;
    }
    if (value && Array.isArray(value.value)) {
      return value.value;
    }
    if (value && Array.isArray(value.items)) {
      return value.items;
    }
    if (value && Array.isArray(value.results)) {
      return value.results;
    }
    if (value && Array.isArray(value.records)) {
      return value.records;
    }
    if (value && Array.isArray(value.data)) {
      return value.data;
    }
    return value ? [value] : [];
  }

  function astroNotesRecords(payload) {
    if (Array.isArray(payload)) {
      return payload;
    }
    if (payload && Array.isArray(payload.records)) {
      return payload.records;
    }
    if (payload && Array.isArray(payload.data)) {
      return payload.data;
    }
    if (payload && Array.isArray(payload.items)) {
      return payload.items;
    }
    if (payload && Array.isArray(payload.results)) {
      return payload.results;
    }
    if (payload && payload.data && Array.isArray(payload.data.records)) {
      return payload.data.records;
    }
    if (payload && payload.data && Array.isArray(payload.data.items)) {
      return payload.data.items;
    }
    if (payload && payload.data && Array.isArray(payload.data.rows)) {
      return payload.data.rows;
    }
    if (payload && Array.isArray(payload.rows)) {
      return payload.rows;
    }
    return [];
  }

  function jatakIdForRecord(record) {
    if (!record) {
      return "";
    }
    return record.id ?? record.jatak_id ?? record.jatakId ?? record.native_id ?? "";
  }

  function readJson(key) {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch {
      localStorage.removeItem(key);
      return null;
    }
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
})();



