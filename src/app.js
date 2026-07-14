(function () {
  const API_BASE_URL = "http://127.0.0.1:8000";

  const state = {
    language: localStorage.getItem("ej_vedic_language") || "en",
    headingChoice: "home",
    naadiView: "cusp",
    settings: {
      chart_type: "north",
      jatak_id: null,
      show_outer_planets: false,
    },
    gochar: {
      data: null,
      loading: false,
      error: "",
      errorKey: "",
    },
    panchang: {
      data: null,
      loading: false,
      error: "",
      errorKey: "",
    },
    jatakView: {
      active: false,
      jatakId: null,
      jatakName: "",
      dateTimeLabel: "",
      d1: null,
      d9: null,
      positions: null,
      cusps: null,
      cuspsLoading: false,
      cuspsError: "",
      cuspsErrorKey: "",
      nakshatraNaadi: null,
      nakshatraNaadiLoading: false,
      nakshatraNaadiError: "",
      nakshatraNaadiErrorKey: "",
      dasha: defaultDashaState(),
      loading: false,
      error: "",
      errorKey: "",
    },
    chartHeaderChoices: {
      d1: { chart: "D1" },
      d9: { chart: "D9" },
    },
    chartRotations: {
      gochar: null,
      d1: null,
      d9: null,
    },
    naadiRules: {
      data: {},
      rootChoice: "",
      childChoice: "",
    },
    kundaliForm: {
      open: false,
      saving: false,
      message: "",
      error: "",
      countries: [],
      states: [],
      cities: [],
      loadingCountries: false,
      loadingStates: false,
      loadingCities: false,
      form: defaultKundaliForm(),
    },
    openKundali: {
      open: false,
      records: [],
      loading: false,
      saving: false,
      error: "",
      message: "",
      nameQuery: "",
      noteQuery: "",
      page: 1,
      rowsPerPage: 10,
      editingId: null,
      editForm: null,
    },
    transitModal: {
      open: false,
      data: null,
      workingDate: new Date().toISOString(),
      step: "Day",
      loading: false,
      error: "",
      errorKey: "",
    },
    messages: {
      en: {},
      mr: {},
    },
  };

  const app = document.getElementById("app");

  init();

  async function init() {
    state.messages.en = await loadIni("./src/locales/en.ini");
    state.messages.mr = await loadIni("./src/locales/mr.ini");
    state.settings = { ...state.settings, ...(await loadSettings()) };
    state.naadiRules.data = await loadNaadiRules();
    initializeNaadiRuleChoices();
    render();
    loadHomeGocharChart();
    loadHomePanchang();
  }

  function render() {
    document.documentElement.lang = state.language === "mr" ? "mr" : "en";
    app.innerHTML = `
      <main class="page-layout">
        <section class="section section1" aria-label="section1">
          <div class="logo-area">
            <img src="./src/images/logo.jpg" alt="${t("logo.alt")}" />
          </div>
          <div class="header-jatak-name">${escapeHtml(headerTitleText())}</div>
          <label class="language-picker">
            <select id="languageSelect">
              <option value="en" ${state.language === "en" ? "selected" : ""}>${t("language.english")}</option>
              <option value="mr" ${state.language === "mr" ? "selected" : ""}>${t("language.marathi")}</option>
            </select>
          </label>
        </section>

        <section class="section section2" aria-label="section2">
          <div class="section2-icons">
            ${iconActionHtml("H", "nav.home", "", "home", "", isHomeActive())}
            ${state.headingChoice === "header" ? iconActionHtml("C", "cusp.title", "", "", "cusp-details", state.naadiView === "cusp") : ""}
            ${state.headingChoice === "header" ? iconActionHtml("N", "nav.nakshatraNaadi", "", "", "nakshatra-naadi", state.naadiView === "nakshatra") : ""}
            ${state.headingChoice === "home" && !state.jatakView.active ? iconActionHtml("O", "homeIcon.openKundali", "", "", "open-kundali", state.openKundali.open) : ""}
            ${state.headingChoice === "home" && !state.jatakView.active ? iconActionHtml("N", "homeIcon.newKundali", "", "", "new-kundali") : ""}
          </div>
          <div class="choice-picker">
            <button class="choice-picker-button" id="headingPickerButton" type="button" aria-expanded="false" ${isHeadingPickerEnabled() ? "" : "disabled"}>
              ${selectedHeadingChoiceHtml()}
            </button>
            <div class="choice-picker-menu" id="headingPickerMenu">
              ${headingOptionHtml("header", "page.header", "page.subHeader")}
              ${headingOptionHtml("subHeader", "choice.subHeader", "page.subHeader")}
            </div>
          </div>
        </section>

        <section class="section section3" aria-label="section3">
          <div class="vsectionlhs" aria-label="vsectionlhs"></div>
          <div class="vsectionmiddle" aria-label="vsectionmiddle">
            ${sectionMiddleHtml()}
          </div>
          <div class="vsectionrhs" aria-label="vsectionrhs"></div>
        </section>
        ${state.kundaliForm.open ? kundaliModalHtml() : ""}
        ${state.openKundali.open ? openKundaliModalHtml() : ""}
        ${state.transitModal.open ? transitGocharModalHtml() : ""}
      </main>
    `;

    document.getElementById("languageSelect").addEventListener("change", (event) => {
      state.language = event.target.value === "mr" ? "mr" : "en";
      localStorage.setItem("ej_vedic_language", state.language);
      render();
    });

    document.getElementById("headingPickerButton").addEventListener("click", () => {
      if (document.getElementById("headingPickerButton").disabled) return;
      document.querySelector(".choice-picker").classList.toggle("open");
    });

    document.querySelectorAll("[data-heading-choice]").forEach((option) => {
      option.addEventListener("click", () => {
        selectHeadingChoice(option.dataset.headingChoice);
      });
    });

    document.querySelectorAll("[data-section-choice]").forEach((button) => {
      button.addEventListener("click", () => {
        if (button.dataset.sectionChoice === "home") {
          resetToDefaultHome();
          return;
        }
        state.headingChoice = button.dataset.sectionChoice;
        render();
        if (state.headingChoice === "home") {
          loadHomeGocharChart();
          loadHomePanchang();
        }
      });
    });

    document.querySelectorAll("[data-action]").forEach((button) => {
      button.addEventListener("click", () => {
        if (button.dataset.action === "new-kundali") {
          openKundaliModal();
        }
        if (button.dataset.action === "open-kundali") {
          openSavedKundaliModal();
        }
        if (button.dataset.action === "cusp-details") {
          state.naadiView = "cusp";
          render();
          loadCuspDetails();
        }
        if (button.dataset.action === "nakshatra-naadi") {
          state.naadiView = "nakshatra";
          render();
          loadNakshatraNaadi();
          loadDashaLevel("");
        }
        if (button.dataset.action === "view-gochar") {
          openTransitGocharModal();
        }
      });
    });

    document.getElementById("naadiRootSelect")?.addEventListener("change", (event) => {
      state.naadiRules.rootChoice = event.target.value;
      state.naadiRules.childChoice = firstNaadiChild(event.target.value);
      render();
    });

    document.getElementById("naadiChildSelect")?.addEventListener("change", (event) => {
      state.naadiRules.childChoice = event.target.value;
      render();
    });

    document.querySelectorAll("[data-dasha-path]").forEach((button) => {
      button.addEventListener("click", () => {
        loadDashaLevel(button.dataset.dashaPath);
      });
    });

    document.getElementById("dashaBackButton")?.addEventListener("click", () => {
      goBackDasha();
    });

    document.querySelectorAll("[name='dashaTimeStep']").forEach((input) => {
      input.addEventListener("change", () => {
        state.jatakView.dasha.step = input.value;
      });
    });

    document.querySelectorAll("[data-dasha-shift]").forEach((button) => {
      button.addEventListener("click", () => {
        shiftDashaWorkingDate(Number(button.dataset.dashaShift));
      });
    });

    document.getElementById("closeTransitGocharModal")?.addEventListener("click", closeTransitGocharModal);

    document.querySelectorAll("[name='transitTimeStep']").forEach((input) => {
      input.addEventListener("change", () => {
        state.transitModal.step = input.value;
      });
    });

    document.querySelectorAll("[data-transit-shift]").forEach((button) => {
      button.addEventListener("click", () => {
        shiftTransitGocharDate(Number(button.dataset.transitShift));
      });
    });

    document.querySelectorAll("[data-dasha-current]").forEach((button) => {
      button.addEventListener("click", () => {
        showCurrentDasha();
      });
    });

    document.querySelectorAll("[data-chart-choice]").forEach((button) => {
      button.addEventListener("click", () => {
        if (button.disabled) return;
        updateChartHeaderChoice(button.dataset.chartKey, "chart", button.dataset.chartChoice);
      });
    });

    document.querySelectorAll("[data-rotate-chart][data-sign-index]").forEach((sign) => {
      sign.addEventListener("dblclick", () => {
        rotateChartToSign(sign.dataset.rotateChart, sign.dataset.signIndex);
      });
    });

    attachKundaliModalHandlers();
    attachOpenKundaliHandlers();
  }

  function resetToDefaultHome() {
    state.headingChoice = "home";
    state.naadiView = "cusp";
    state.jatakView = {
      active: false,
      jatakId: null,
      jatakName: "",
      dateTimeLabel: "",
      d1: null,
      d9: null,
      positions: null,
      cusps: null,
      cuspsLoading: false,
      cuspsError: "",
      cuspsErrorKey: "",
      nakshatraNaadi: null,
      nakshatraNaadiLoading: false,
      nakshatraNaadiError: "",
      nakshatraNaadiErrorKey: "",
      dasha: defaultDashaState(),
      loading: false,
      error: "",
      errorKey: "",
    };
    state.chartHeaderChoices = {
      d1: { chart: "D1" },
      d9: { chart: "D9" },
    };
    state.chartRotations = {
      gochar: null,
      d1: null,
      d9: null,
    };
    state.kundaliForm.open = false;
    state.openKundali.open = false;
    render();
    loadHomeGocharChart();
    loadHomePanchang();
  }

  function isHomeActive() {
    return state.headingChoice === "home" && !state.openKundali.open && !state.kundaliForm.open;
  }

  async function selectHeadingChoice(choice) {
    state.headingChoice = choice || "home";
    if (state.headingChoice === "header" && state.jatakView.active) {
      state.naadiView = "cusp";
      state.chartHeaderChoices = {
        d1: { chart: "D1" },
        d9: { chart: "CHALIT" },
      };
      await loadSelectedSavedCharts();
      return;
    }

    render();
    if (state.headingChoice === "home") {
      loadHomeGocharChart();
      loadHomePanchang();
    }
  }

  async function loadSelectedSavedCharts() {
    if (!state.jatakView.active || !state.jatakView.jatakId) return;
    const topChart = state.chartHeaderChoices.d1.chart || "D1";
    const bottomChart = state.chartHeaderChoices.d9.chart || "D9";
    state.chartRotations.d1 = null;
    state.chartRotations.d9 = null;
    state.jatakView = {
      ...state.jatakView,
      d1: null,
      d9: null,
      cusps: null,
      cuspsLoading: true,
      cuspsError: "",
      cuspsErrorKey: "",
      loading: true,
      error: "",
      errorKey: "",
    };
    render();

    const [topResult, bottomResult, cuspsResult] = await Promise.allSettled([
      getJson(`/jatak/${encodeURIComponent(state.jatakView.jatakId)}/chart/${chartEndpoint(topChart)}`, "chart.loadError"),
      getJson(`/jatak/${encodeURIComponent(state.jatakView.jatakId)}/chart/${chartEndpoint(bottomChart)}`, "chart.loadError"),
      getJson(`/jatak/${encodeURIComponent(state.jatakView.jatakId)}/kp/cusps`, "cusp.loadError"),
    ]);

    if (topResult.status === "fulfilled") state.jatakView.d1 = topResult.value;
    if (bottomResult.status === "fulfilled") state.jatakView.d9 = bottomResult.value;
    if (topResult.status === "rejected" || bottomResult.status === "rejected") {
      const error = topResult.reason || bottomResult.reason || {};
      state.jatakView.error = error.message || t("chart.loadError");
      state.jatakView.errorKey = error.messageKey || "chart.loadError";
    }

    if (cuspsResult.status === "fulfilled") {
      state.jatakView.cusps = cuspsResult.value;
    } else {
      const error = cuspsResult.reason || {};
      state.jatakView.cuspsError = error.message || t("cusp.loadError");
      state.jatakView.cuspsErrorKey = error.messageKey || "cusp.loadError";
    }

    state.jatakView.loading = false;
    state.jatakView.cuspsLoading = false;
    render();
  }

  async function loadCuspDetails() {
    if (!state.jatakView.active || !state.jatakView.jatakId || state.jatakView.cuspsLoading) return;
    state.jatakView.cuspsLoading = true;
    state.jatakView.cuspsError = "";
    state.jatakView.cuspsErrorKey = "";
    render();

    try {
      state.jatakView.cusps = await getJson(`/jatak/${encodeURIComponent(state.jatakView.jatakId)}/kp/cusps`, "cusp.loadError");
    } catch (error) {
      state.jatakView.cuspsError = error.message || t("cusp.loadError");
      state.jatakView.cuspsErrorKey = error.messageKey || "cusp.loadError";
    } finally {
      state.jatakView.cuspsLoading = false;
      render();
    }
  }

  async function loadNakshatraNaadi() {
    if (!state.jatakView.active || !state.jatakView.jatakId || state.jatakView.nakshatraNaadiLoading) return;
    state.jatakView.nakshatraNaadiLoading = true;
    state.jatakView.nakshatraNaadiError = "";
    state.jatakView.nakshatraNaadiErrorKey = "";
    render();

    try {
      state.jatakView.nakshatraNaadi = await getJson(`/jatak/${encodeURIComponent(state.jatakView.jatakId)}/kp/nakshatra-nadi`, "nakshatraNaadi.loadError");
    } catch (error) {
      state.jatakView.nakshatraNaadiError = error.message || t("nakshatraNaadi.loadError");
      state.jatakView.nakshatraNaadiErrorKey = error.messageKey || "nakshatraNaadi.loadError";
    } finally {
      state.jatakView.nakshatraNaadiLoading = false;
      render();
    }
  }

  function openTransitGocharModal() {
    state.transitModal = {
      ...state.transitModal,
      open: true,
      workingDate: state.jatakView.dasha?.workingDate || new Date().toISOString(),
      error: "",
      errorKey: "",
    };
    render();
    loadTransitGochar();
  }

  function closeTransitGocharModal() {
    state.transitModal.open = false;
    render();
  }

  async function loadTransitGochar() {
    if (!state.transitModal.open || state.transitModal.loading) return;
    state.transitModal.loading = true;
    state.transitModal.error = "";
    state.transitModal.errorKey = "";
    render();

    try {
      state.transitModal.data = await getJson(`/chart/gochar?at=${encodeURIComponent(state.transitModal.workingDate)}`, "chart.loadError");
    } catch (error) {
      state.transitModal.error = error.message || t("chart.loadError");
      state.transitModal.errorKey = error.messageKey || "chart.loadError";
    } finally {
      state.transitModal.loading = false;
      render();
    }
  }

  async function shiftTransitGocharDate(direction) {
    const date = new Date(state.transitModal.workingDate || Date.now());
    const shifted = addDashaStep(Number.isNaN(date.getTime()) ? new Date() : date, state.transitModal.step || "Day", direction);
    state.transitModal.workingDate = shifted.toISOString();
    await loadTransitGochar();
  }

  async function loadDashaLevel(pathValue = "") {
    if (!state.jatakView.active || !state.jatakView.jatakId || state.jatakView.dasha.loading) return;
    const path = parseDashaPath(pathValue);
    state.jatakView.dasha = {
      ...state.jatakView.dasha,
      loading: true,
      error: "",
      errorKey: "",
    };
    render();

    try {
      const query = path.length ? `/children?path=${encodeURIComponent(path.join(","))}` : "";
      const data = await getJson(`/jatak/${encodeURIComponent(state.jatakView.jatakId)}/dasha/vimshottari${query}`, "dasha.loadError");
      state.jatakView.dasha = {
        ...state.jatakView.dasha,
        level: dashaLevelFromPath(path),
        path,
        data,
        activePath: await resolveActiveDashaPath(data, dashaWorkingDate()),
        loading: false,
        error: "",
        errorKey: "",
      };
    } catch (error) {
      state.jatakView.dasha = {
        ...state.jatakView.dasha,
        level: dashaLevelFromPath(path),
        path,
        loading: false,
        error: error.message || t("dasha.loadError"),
        errorKey: error.messageKey || "dasha.loadError",
      };
    }
    render();
  }

  function goBackDasha() {
    const path = state.jatakView.dasha.path || [];
    if (!path.length) return;
    loadDashaLevel(path.slice(0, -1).join(","));
  }

  function parseDashaPath(pathValue) {
    return String(pathValue || "")
      .split(",")
      .map((part) => part.trim())
      .filter(Boolean);
  }

  function dashaLevelFromPath(path) {
    if (path.length >= 2) return "antara";
    if (path.length === 1) return "bhukti";
    return "dasha";
  }

  async function shiftDashaWorkingDate(direction) {
    const current = dashaWorkingDate();
    const shifted = addDashaStep(current, state.jatakView.dasha.step || "Hour", direction);
    await updateDashaWorkingDate(shifted);
  }

  async function setDashaCurrentDate() {
    await updateDashaWorkingDate(new Date());
  }

  async function showCurrentDasha() {
    state.jatakView.dasha = {
      ...state.jatakView.dasha,
      workingDate: new Date().toISOString(),
    };
    await loadDashaLevel("");
  }

  async function updateDashaWorkingDate(date) {
    if (!date || Number.isNaN(date.getTime())) return;
    state.jatakView.dasha = {
      ...state.jatakView.dasha,
      workingDate: date.toISOString(),
      activePath: await resolveActiveDashaPath(state.jatakView.dasha.data, date),
    };
    render();
  }

  function dashaWorkingDate() {
    const date = new Date(state.jatakView.dasha?.workingDate || Date.now());
    return Number.isNaN(date.getTime()) ? new Date() : date;
  }

  function dashaRunningAgeLabel() {
    const birthDate = parseJatakBirthDate();
    const workingDate = dashaWorkingDate();
    if (!birthDate || workingDate < birthDate) return "";
    let completedYears = workingDate.getFullYear() - birthDate.getFullYear();
    const hasBirthdayPassed =
      workingDate.getMonth() > birthDate.getMonth() ||
      (workingDate.getMonth() === birthDate.getMonth() && workingDate.getDate() >= birthDate.getDate());
    if (!hasBirthdayPassed) completedYears -= 1;
    return `(${completedYears + 1} yrs)`;
  }

  function dashaRunningAgeHtml() {
    const label = dashaRunningAgeLabel();
    return label ? `<span class="dasha-running-age">${escapeHtml(label)}</span>` : "";
  }

  function parseJatakBirthDate() {
    const value = String(state.jatakView.dateTimeLabel || "").trim();
    const match = value.match(/^(\d{1,2})-([A-Za-z]{3})-(\d{4})/);
    if (!match) return null;
    const months = { jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5, jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11 };
    const month = months[match[2].toLowerCase()];
    if (month === undefined) return null;
    const date = new Date(Number(match[3]), month, Number(match[1]));
    return Number.isNaN(date.getTime()) ? null : date;
  }

  function addDashaStep(date, step, direction) {
    const next = new Date(date);
    const amount = Number(direction) || 1;
    const normalized = String(step || "Hour").toLowerCase();
    if (normalized === "5 years") next.setFullYear(next.getFullYear() + 5 * amount);
    else if (normalized === "year") next.setFullYear(next.getFullYear() + amount);
    else if (normalized === "month") next.setMonth(next.getMonth() + amount);
    else if (normalized === "day") next.setDate(next.getDate() + amount);
    else if (normalized === "10 min") next.setMinutes(next.getMinutes() + 10 * amount);
    else if (normalized === "minute") next.setMinutes(next.getMinutes() + amount);
    else next.setHours(next.getHours() + amount);
    return next;
  }

  async function resolveActiveDashaPath(data, targetDate = dashaWorkingDate()) {
    let active = (data?.periods || []).find((period) => isCurrentDashaPeriod(period, targetDate));
    let path = Array.isArray(active?.path) ? active.path : [];

    while (path.length > 0 && path.length < 3) {
      try {
        const childData = await getJson(
          `/jatak/${encodeURIComponent(state.jatakView.jatakId)}/dasha/vimshottari/children?path=${encodeURIComponent(path.join(","))}`,
          "dasha.loadError",
        );
        active = (childData?.periods || []).find((period) => isCurrentDashaPeriod(period, targetDate));
        if (!active?.path?.length || active.path.join(",") === path.join(",")) break;
        path = active.path;
      } catch {
        break;
      }
    }

    return path;
  }

  function rotateChartToSign(chartKey, signIndex) {
    const numericSign = Number(signIndex);
    if (!chartKey || !numericSign) return;
    state.chartRotations[chartKey] = numericSign;
    render();
  }

  async function updateChartHeaderChoice(chartKey, field, value) {
    if (!chartKey || !value || !state.chartHeaderChoices[chartKey]) return;
    state.chartHeaderChoices[chartKey] = {
      ...state.chartHeaderChoices[chartKey],
      [field]: value,
    };
    state.chartRotations[chartKey] = null;
    render();
    if (field === "chart") {
      await loadSavedChartForPanel(chartKey, value);
    }
  }

  function headingOptionHtml(value, mainKey, subKey) {
    return `
      <button class="choice-picker-option ${state.headingChoice === value ? "active" : ""}" data-heading-choice="${value}" type="button">
        <strong>${t(mainKey)}</strong>
        <span>${t(subKey)}</span>
      </button>
    `;
  }

  function selectedHeadingChoiceHtml() {
    const selected = {
      home: ["choice.select", "choice.selectSubLabel"],
      header: ["page.header", "page.subHeader"],
      subHeader: ["choice.subHeader", "page.subHeader"],
    }[state.headingChoice] || ["choice.select", "choice.selectSubLabel"];

    return `
      <strong>${t(selected[0])}</strong>
      ${selected[1] ? `<span>${t(selected[1])}</span>` : ""}
    `;
  }

  function isHeadingPickerEnabled() {
    return Boolean(state.jatakView.active && state.jatakView.d1 && state.jatakView.d9 && !state.jatakView.loading && !state.jatakView.error);
  }

  function headerTitleText() {
    return state.jatakView.active && state.jatakView.jatakName ? state.jatakView.jatakName : t("header.welcome");
  }

  function sectionMiddleHtml() {
    if (state.headingChoice === "home" || state.headingChoice === "header") {
      const topChart = state.chartHeaderChoices.d1.chart || "D1";
      const bottomChart = state.chartHeaderChoices.d9.chart || "D9";
      return `
        <div class="home-middle-layout">
          <div class="home-middle-left">
            <div class="home-left-top">
              <div class="home-left-top-part1">${state.jatakView.active ? chartHeaderHtml("d1", "chart.d1Chart", state.jatakView.dateTimeLabel, topChart) : gocharChartHeaderHtml()}</div>
              <div class="home-left-top-part2">${state.jatakView.active ? jatakChartHtml("d1") : gocharChartHtml()}</div>
            </div>
            <div class="home-left-bottom">${state.jatakView.active ? jatakChartWithHeaderHtml("d9", "chart.d9Chart", bottomChart) : panchangTilesHtml()}</div>
          </div>
          <div class="home-middle-right">
            <div class="home-right-top">${rightPanelTitleHtml()}</div>
            <div class="home-right-bottom">${rightPanelBodyHtml()}</div>
          </div>
        </div>
      `;
    }

    return `<div class="generic-middle-layout"></div>`;
  }

  function rightPanelTitleHtml() {
    if (state.headingChoice !== "header") return t("chart.planetaryDetail");
    return state.naadiView === "nakshatra" ? t("nav.nakshatraNaadi") : t("cusp.title");
  }

  function rightPanelBodyHtml() {
    if (state.headingChoice !== "header") return planetaryDetailHtml();
    return state.naadiView === "nakshatra" ? nakshatraNaadiHtml() : cuspDetailHtml();
  }

  function kundaliModalHtml() {
    const form = state.kundaliForm.form;
    return `
      <div class="modal-backdrop">
        <section class="kundali-modal" role="dialog" aria-modal="true" aria-label="${t("kundali.newTitle")}">
          <div class="kundali-modal-header">
            <h2>${t("kundali.newTitle")}</h2>
            <button class="modal-close-button" id="closeKundaliModal" type="button" aria-label="${t("common.close")}">x</button>
          </div>
          <form class="kundali-form" id="kundaliForm">
            <label>
              <span>${t("kundali.fullName")}</span>
              <input id="kundaliName" value="${escapeHtml(form.jatak_full_name)}" autocomplete="off" />
            </label>
            <label>
              <span>${t("kundali.day")}</span>
              <select id="kundaliDay">
                ${dayOptions(form.day)}
              </select>
            </label>
            <label>
              <span>${t("kundali.month")}</span>
              <select id="kundaliMonth">
                ${monthOptions(form.month)}
              </select>
            </label>
            <label>
              <span>${t("kundali.year")}</span>
              <input id="kundaliYear" inputmode="numeric" maxlength="4" value="${escapeHtml(form.year)}" placeholder="YYYY" />
            </label>
            <label>
              <span>${t("kundali.time")}</span>
              <input id="kundaliTime" type="time" step="1" value="${escapeHtml(form.time)}" />
            </label>
            <fieldset class="gender-field">
              <legend>${t("kundali.gender")}</legend>
              <label>
                <input type="radio" name="kundaliGender" value="Male" ${form.gender === "Male" ? "checked" : ""} />
                <span>${t("kundali.genderMale")}</span>
              </label>
              <label>
                <input type="radio" name="kundaliGender" value="Female" ${form.gender === "Female" ? "checked" : ""} />
                <span>${t("kundali.genderFemale")}</span>
              </label>
            </fieldset>
            <label>
              <span>${t("kundali.country")}</span>
              <select id="kundaliCountry">
                <option value="">${state.kundaliForm.loadingCountries ? t("kundali.loadingCountries") : t("kundali.selectCountry")}</option>
                ${state.kundaliForm.countries
                  .map((country) => `<option value="${escapeHtml(country.country_code)}" ${form.country_code === country.country_code ? "selected" : ""}>${escapeHtml(country.country_name)}</option>`)
                  .join("")}
              </select>
            </label>
            <label>
              <span>${t("kundali.state")}</span>
              <select id="kundaliState" ${!form.country_code || state.kundaliForm.loadingStates ? "disabled" : ""}>
                <option value="">${state.kundaliForm.loadingStates ? t("kundali.loadingStates") : t("kundali.selectState")}</option>
                ${state.kundaliForm.states
                  .map((stateItem) => `<option value="${escapeHtml(stateItem.state_code || "")}" ${form.state_code === stateItem.state_code ? "selected" : ""}>${escapeHtml(stateItem.state_name)}</option>`)
                  .join("")}
              </select>
            </label>
            <label>
              <span>${t("kundali.city")}</span>
              <select id="kundaliCity" ${!form.state_code || state.kundaliForm.loadingCities ? "disabled" : ""}>
                <option value="">${state.kundaliForm.loadingCities ? t("kundali.loadingCities") : t("kundali.selectCity")}</option>
                ${state.kundaliForm.cities
                  .map((city, index) => `<option value="${index}" ${form.city_index === String(index) ? "selected" : ""}>${escapeHtml(city.city_name)}</option>`)
                  .join("")}
              </select>
            </label>
            <label>
              <span>${t("kundali.latitude")}</span>
              <input id="kundaliLatitude" value="${escapeHtml(form.latitude)}" readonly />
            </label>
            <label>
              <span>${t("kundali.longitude")}</span>
              <input id="kundaliLongitude" value="${escapeHtml(form.longitude)}" readonly />
            </label>
            <label>
              <span>${t("kundali.timezone")}</span>
              <input id="kundaliTimezone" value="${escapeHtml(form.timezone)}" readonly />
            </label>
            <label class="kundali-note-field">
              <span>${t("kundali.note")}</span>
              <textarea id="kundaliNote" maxlength="200">${escapeHtml(form.note1)}</textarea>
            </label>
            ${state.kundaliForm.error ? `<div class="modal-error">${escapeHtml(state.kundaliForm.error)}</div>` : ""}
            ${state.kundaliForm.message ? `<div class="modal-success">${escapeHtml(state.kundaliForm.message)}</div>` : ""}
            <div class="kundali-modal-actions">
              <button class="secondary-modal-button" id="cancelKundaliModal" type="button">${t("common.cancel")}</button>
              <button class="primary-modal-button" type="submit" ${state.kundaliForm.saving ? "disabled" : ""}>
                ${state.kundaliForm.saving ? t("kundali.saving") : t("kundali.save")}
              </button>
            </div>
          </form>
        </section>
      </div>
    `;
  }

  function openKundaliModalHtml() {
    const rows = pagedOpenKundaliRecords();
    const total = filteredOpenKundaliRecords().length;
    const totalPages = Math.max(1, Math.ceil(total / state.openKundali.rowsPerPage));
    return `
      <div class="modal-backdrop">
        <section class="kundali-modal open-kundali-modal" role="dialog" aria-modal="true" aria-label="${t("openKundali.title")}">
          <div class="kundali-modal-header">
            <h2>${t("openKundali.title")}</h2>
            <button class="modal-close-button" id="closeOpenKundaliModal" type="button" aria-label="${t("common.close")}">x</button>
          </div>
          <div class="open-kundali-body">
            <div class="open-kundali-toolbar">
              <label>
                <span>${t("openKundali.searchName")}</span>
                <input id="openKundaliNameSearch" value="${escapeHtml(state.openKundali.nameQuery)}" placeholder="${t("openKundali.searchNamePlaceholder")}" />
                ${openKundaliSearchSuggestionsHtml("name")}
              </label>
              <label>
                <span>${t("openKundali.searchNote")}</span>
                <input id="openKundaliNoteSearch" value="${escapeHtml(state.openKundali.noteQuery)}" placeholder="${t("openKundali.searchNotePlaceholder")}" />
                ${openKundaliSearchSuggestionsHtml("note")}
              </label>
              <label>
                <span>${t("openKundali.rowsPerPage")}</span>
                <select id="openKundaliRows">
                  ${[5, 10, 20, 50].map((value) => `<option value="${value}" ${state.openKundali.rowsPerPage === value ? "selected" : ""}>${value}</option>`).join("")}
                </select>
              </label>
            </div>
            ${state.openKundali.error ? `<div class="modal-error">${escapeHtml(state.openKundali.error)}</div>` : ""}
            ${state.openKundali.message ? `<div class="modal-success">${escapeHtml(state.openKundali.message)}</div>` : ""}
            ${state.openKundali.editingId ? openKundaliEditHtml() : ""}
            <div class="open-kundali-table-wrap">
              <table class="open-kundali-table">
                <thead>
                  <tr>
                    <th>${t("openKundali.id")}</th>
                    <th>${t("openKundali.name")}</th>
                    <th>${t("openKundali.date")}</th>
                    <th>${t("openKundali.time")}</th>
                    <th>${t("openKundali.city")}</th>
                    <th>${t("openKundali.gender")}</th>
                    <th>${t("openKundali.actions")}</th>
                  </tr>
                </thead>
                <tbody>
                  ${state.openKundali.loading ? `<tr><td colspan="7">${t("common.loading")}</td></tr>` : rows.map(openKundaliRowHtml).join("")}
                  ${!state.openKundali.loading && !rows.length ? `<tr><td colspan="7">${t("openKundali.noRecords")}</td></tr>` : ""}
                </tbody>
              </table>
            </div>
            <div class="open-kundali-footer">
              <button id="openKundaliPrev" type="button" ${state.openKundali.page <= 1 ? "disabled" : ""}>${t("openKundali.previous")}</button>
              <strong>${state.openKundali.page} / ${totalPages} ${t("openKundali.pages")}</strong>
              <span>${t("openKundali.total")}:${total} ${t("openKundali.records")}</span>
              <button id="openKundaliNext" type="button" ${state.openKundali.page >= totalPages ? "disabled" : ""}>${t("openKundali.next")}</button>
            </div>
          </div>
        </section>
      </div>
    `;
  }

  function openKundaliRowHtml(record) {
    const id = record.jatak_id || record.id;
    return `
      <tr>
        <td>${escapeHtml(id)}</td>
        <td>${escapeHtml(record.jatak_full_name || "")}</td>
        <td>${escapeHtml(record.date || "")}</td>
        <td>${escapeHtml(record.time || "")}</td>
        <td>${escapeHtml(record.city_name || "")}</td>
        <td>${escapeHtml(localizedGender(record.gender))}</td>
        <td>
          <div class="open-kundali-actions">
            <button data-open-view="${id}" type="button" title="${t("openKundali.view")}" aria-label="${t("openKundali.view")}">
              <img src="./src/images/icon-eye.svg" alt="" />
            </button>
            <button data-open-edit="${id}" type="button" title="${t("openKundali.update")}" aria-label="${t("openKundali.update")}">
              <img src="./src/images/icon-pencil.svg" alt="" />
            </button>
            <button data-open-delete="${id}" type="button" title="${t("openKundali.delete")}" aria-label="${t("openKundali.delete")}">
              <img src="./src/images/icon-delete.svg" alt="" />
            </button>
          </div>
        </td>
      </tr>
    `;
  }

  function openKundaliSearchSuggestionsHtml(type) {
    const query = type === "note" ? state.openKundali.noteQuery.trim() : state.openKundali.nameQuery.trim();
    if (!query || state.openKundali.loading) return "";
    const matches = filteredOpenKundaliRecords().slice(0, 8);
    if (!matches.length) {
      return `<div class="open-kundali-suggestions"><div class="open-kundali-suggestion-empty">${t("openKundali.noRecords")}</div></div>`;
    }
    return `
      <div class="open-kundali-suggestions">
        ${matches
          .map((record) => {
            const id = record.jatak_id || record.id;
            return `
              <button data-open-suggestion="${id}" type="button">
                <strong>${escapeHtml(record.jatak_full_name || "")}</strong>
                <span>${escapeHtml([record.date, record.time, record.city_name, record.note1].filter(Boolean).join(" | "))}</span>
              </button>
            `;
          })
          .join("")}
      </div>
    `;
  }

  function openKundaliEditHtml() {
    const form = state.openKundali.editForm || {};
    return `
      <form class="open-kundali-edit" id="openKundaliEditForm">
        <label><span>${t("kundali.fullName")}</span><input id="openEditName" value="${escapeHtml(form.jatak_full_name || "")}" /></label>
        <label><span>${t("kundali.date")}</span><input id="openEditDate" value="${escapeHtml(form.date || "")}" /></label>
        <label><span>${t("kundali.time")}</span><input id="openEditTime" value="${escapeHtml(form.time || "")}" /></label>
        <label><span>${t("kundali.gender")}</span><select id="openEditGender"><option value="Male" ${form.gender === "Male" ? "selected" : ""}>${t("kundali.genderMale")}</option><option value="Female" ${form.gender === "Female" ? "selected" : ""}>${t("kundali.genderFemale")}</option></select></label>
        <label><span>${t("kundali.city")}</span><input id="openEditCity" value="${escapeHtml(form.city_name || "")}" /></label>
        <label><span>${t("kundali.latitude")}</span><input id="openEditLatitude" value="${escapeHtml(form.latitude || "")}" /></label>
        <label><span>${t("kundali.longitude")}</span><input id="openEditLongitude" value="${escapeHtml(form.longitude || "")}" /></label>
        <label><span>${t("kundali.timezone")}</span><input id="openEditTimezone" value="${escapeHtml(form.timezone || "Asia/Kolkata")}" /></label>
        <label class="open-kundali-edit-note"><span>${t("kundali.note")}</span><textarea id="openEditNote" maxlength="200">${escapeHtml(form.note1 || "")}</textarea></label>
        <div class="open-kundali-edit-actions">
          <button class="secondary-modal-button" id="cancelOpenKundaliEdit" type="button">${t("common.cancel")}</button>
          <button class="primary-modal-button" type="submit">${state.openKundali.saving ? t("openKundali.saving") : t("openKundali.saveUpdate")}</button>
        </div>
      </form>
    `;
  }

  function planetaryDetailHtml() {
    if (state.jatakView.active) {
      return savedPlanetaryDetailHtml();
    }

    if (state.gochar.loading) {
      return `<div class="chart-state">${t("chart.loading")}</div>`;
    }

    if (state.gochar.error) {
      return `<div class="chart-state error">${state.gochar.errorKey ? t(state.gochar.errorKey) : state.gochar.error}</div>`;
    }

    const positions = sortPlanetPositions(
      Object.values(state.gochar.data?.positions || {}).filter((position) => shouldShowPlanet(position.name || position.body || "")),
    );
    if (!positions.length) {
      return `<div class="chart-state">${t("chart.waiting")}</div>`;
    }

    return `
      <div class="planetary-detail-table-wrap">
        <table class="planetary-detail-table">
          <thead>
            <tr>
              <th>${t("planetTable.planet")}</th>
              <th>${t("planetTable.sign")}</th>
              <th>${t("planetTable.degree")}</th>
              <th>${t("planetTable.nakshatra")}</th>
              <th>${t("planetTable.pada")}</th>
              <th>${t("planetTable.retro")}</th>
            </tr>
          </thead>
          <tbody>
            ${positions.map(planetaryDetailRowHtml).join("")}
          </tbody>
        </table>
      </div>
    `;
  }

  function savedPlanetaryDetailHtml() {
    if (state.jatakView.loading) {
      return `<div class="chart-state">${t("chart.loading")}</div>`;
    }

    if (state.jatakView.error) {
      return `<div class="chart-state error">${state.jatakView.errorKey ? t(state.jatakView.errorKey) : state.jatakView.error}</div>`;
    }

    const rawPositions = state.jatakView.positions?.positions || state.jatakView.positions || {};
    const positions = sortPlanetPositions(Object.values(rawPositions).filter((position) => shouldShowPlanet(position.name || position.body || "")));
    if (!positions.length) {
      return `<div class="chart-state">${t("chart.waiting")}</div>`;
    }

    return `
      <div class="planetary-detail-table-wrap">
        <table class="planetary-detail-table">
          <thead>
            <tr>
              <th>${t("planetTable.planet")}</th>
              <th>${t("planetTable.sign")}</th>
              <th>${t("planetTable.degree")}</th>
              <th>${t("planetTable.nakshatra")}</th>
              <th>${t("planetTable.pada")}</th>
              <th>${t("planetTable.retro")}</th>
            </tr>
          </thead>
          <tbody>
            ${positions.map(planetaryDetailRowHtml).join("")}
          </tbody>
        </table>
      </div>
    `;
  }

  function cuspDetailHtml() {
    if (state.jatakView.cuspsLoading) {
      return `<div class="chart-state">${t("cusp.loading")}</div>`;
    }

    if (state.jatakView.cuspsError) {
      return `<div class="chart-state error">${state.jatakView.cuspsErrorKey ? t(state.jatakView.cuspsErrorKey) : state.jatakView.cuspsError}</div>`;
    }

    const cusps = state.jatakView.cusps?.cusps || [];
    if (!cusps.length) {
      return `<div class="chart-state">${t("cusp.waiting")}</div>`;
    }

    const columns = ["house_number", "sign", "rashi_swami", "degree_in_sign", "nakshatra", "nakshatra_swami", "sub_lord", "sub_sub_lord"];
    return `
      <div class="planetary-detail-table-wrap">
        <table class="planetary-detail-table cusp-detail-table">
          <thead>
            <tr>
              ${columns.map((column) => `<th>${escapeHtml(formatColumnLabel(column))}</th>`).join("")}
            </tr>
          </thead>
          <tbody>
            ${cusps
              .map(
                (cusp) => `
                  <tr>
                    ${columns.map((column) => `<td>${escapeHtml(formatCuspValue(column, cusp[column], cusp))}</td>`).join("")}
                  </tr>
                `,
              )
              .join("")}
          </tbody>
        </table>
      </div>
    `;
  }

  function transitGocharModalHtml() {
    const options = ["Month", "Day", "Hour", "10 Min", "Minute"];
    const birthDate = state.jatakView.dateTimeLabel || "-";
    return `
      <div class="modal-backdrop">
        <section class="kundali-modal transit-gochar-modal" role="dialog" aria-modal="true" aria-label="View Gochar">
          <div class="kundali-modal-header">
            <h2>View Gochar</h2>
            <button class="modal-close-button" id="closeTransitGocharModal" type="button" aria-label="${t("common.close")}">x</button>
          </div>
          <div class="transit-gochar-body">
            <div class="transit-gochar-chart-wrap">
              ${transitGocharChartHtml()}
            </div>
            <div class="transit-gochar-controls">
              <div class="transit-date-stack">
                <div class="dasha-working-date">
                  <span>Birth Date</span>
                  <strong>${escapeHtml(birthDate)}</strong>
                </div>
                <div class="dasha-working-date">
                  <span>${t("dasha.workingDate")}</span>
                  <strong>${escapeHtml(formatDateTime(state.transitModal.workingDate))}</strong>
                </div>
              </div>
              <div class="dasha-time-options">
                ${options
                  .map(
                    (option) => `
                      <label>
                        <input type="radio" name="transitTimeStep" value="${escapeHtml(option)}" ${option === state.transitModal.step ? "checked" : ""} />
                        <span>${escapeHtml(option)}</span>
                      </label>
                    `,
                  )
                  .join("")}
              </div>
              <div class="dasha-step-buttons">
                <button data-transit-shift="-1" type="button">-</button>
                <button data-transit-shift="1" type="button">+</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    `;
  }

  function transitGocharChartHtml() {
    if (state.transitModal.loading) return `<div class="chart-state">${t("chart.loading")}</div>`;
    if (state.transitModal.error) return `<div class="chart-state error">${state.transitModal.errorKey ? t(state.transitModal.errorKey) : state.transitModal.error}</div>`;
    if (!state.jatakView.d1 || !state.transitModal.data) return `<div class="chart-state">${t("chart.waiting")}</div>`;
    const natalHouses = buildSavedChartHouses(state.jatakView.d1);
    return `
      <div class="transit-gochar-content">
        ${doubleDiamondChartHtml(natalHouses, buildTransitOverNatalHouses(state.transitModal.data, nativeAscSignIndex(natalHouses)))}
        ${transitDegreeComparisonHtml()}
      </div>
    `;
  }

  function nativeAscSignIndex(natalHouses) {
    return Number(natalHouses?.[0]?.sign_index) || "";
  }

  function buildTransitOverNatalHouses(gochar, nativeAscSign) {
    const startSign = Number(nativeAscSign) || 1;
    const positions = gochar?.positions || {};
    const houses = Array.from({ length: 12 }, (_, index) => ({
      house: index + 1,
      sign_index: ((startSign + index - 1) % 12) + 1,
      bodies: [],
    }));

    Object.values(positions).forEach((position) => {
      const name = position.name || position.body || "";
      if (!shouldShowPlanet(name)) return;
      const signIndex = Number(position.sign_index);
      if (!signIndex) return;
      const houseIndex = (signIndex - startSign + 12) % 12;
      houses[houseIndex].bodies.push({
        name,
        degree: Number(position.degree_in_sign),
        retrograde: position.retrograde === true,
      });
    });

    return houses;
  }

  function doubleDiamondChartHtml(natalHouses, transitHouses) {
    const slots = northDiamondSlots();
    const innerScale = 0.38;
    const innerOffset = 31;

    return `
      <div class="double-diamond-frame">
        <svg class="double-diamond-chart" viewBox="0 0 100 100" preserveAspectRatio="none" role="img" aria-label="Transit and natal chart">
          <g class="double-diamond-outer">
            ${slots
              .map((slot) => {
                const house = transitHouses[slot.house - 1] || { sign_index: "", bodies: [] };
                return `
                  <g class="double-diamond-house">
                    <polygon points="${slot.points}"></polygon>
                    ${doubleDiamondHouseNumberHtml(slot, house.sign_index, "outer")}
                    ${doubleDiamondBodiesHtml(slot, house.bodies, "outer", 1, 0)}
                  </g>
                `;
              })
              .join("")}
          </g>
          <g class="double-diamond-inner">
            ${slots
              .map((slot) => {
                const house = natalHouses[slot.house - 1] || { sign_index: "", bodies: [] };
                return `
                  <g class="double-diamond-house">
                    <polygon points="${transformPoints(slot.points, innerScale, innerOffset)}"></polygon>
                    ${doubleDiamondHouseNumberHtml(slot, house.sign_index, "inner", innerScale, innerOffset)}
                    ${doubleDiamondBodiesHtml(slot, house.bodies, "inner", innerScale, innerOffset)}
                  </g>
                `;
              })
              .join("")}
          </g>
        </svg>
      </div>
    `;
  }

  function northDiamondSlots() {
    return [
      { house: 1, x: 50, y: 10, points: "50,2 74,26 50,50 26,26" },
      { house: 2, x: 25, y: 10, points: "2,2 50,2 26,26" },
      { house: 3, x: 10, y: 25, points: "2,2 26,26 2,50" },
      { house: 4, x: 25, y: 50, points: "2,50 26,26 50,50 26,74" },
      { house: 5, x: 10, y: 75, points: "2,50 26,74 2,98" },
      { house: 6, x: 25, y: 90, points: "2,98 26,74 50,98" },
      { house: 7, x: 50, y: 90, points: "50,50 74,74 50,98 26,74" },
      { house: 8, x: 75, y: 90, points: "50,98 74,74 98,98" },
      { house: 9, x: 90, y: 75, points: "98,50 98,98 74,74" },
      { house: 10, x: 75, y: 50, points: "50,50 74,26 98,50 74,74" },
      { house: 11, x: 90, y: 25, points: "98,2 98,50 74,26" },
      { house: 12, x: 75, y: 10, points: "50,2 98,2 74,26" },
    ];
  }

  function transformPoints(points, scale, offset) {
    return String(points)
      .split(" ")
      .map((point) => {
        const [x, y] = point.split(",").map(Number);
        return `${formatSvgNumber(x * scale + offset)},${formatSvgNumber(y * scale + offset)}`;
      })
      .join(" ");
  }

  function formatSvgNumber(value) {
    return Number(value).toFixed(2).replace(/\.?0+$/, "");
  }

  function doubleDiamondHouseNumberHtml(slot, houseNumber, layer, scale = 1, offset = 0) {
    const position = {
      1: [50, 5],
      2: [25, 5],
      3: [7, 26],
      4: [25, 47],
      5: [7, 73],
      6: [25, 93],
      7: [50, 96],
      8: [75, 93],
      9: [93, 73],
      10: [75, 47],
      11: [93, 26],
      12: [75, 5],
    }[slot.house] || [slot.x, slot.y];
    const x = position[0] * scale + offset;
    const y = position[1] * scale + offset;
    return `<text class="double-diamond-sign ${layer}" x="${formatSvgNumber(x)}" y="${formatSvgNumber(y)}">${houseNumber || ""}</text>`;
  }

  function doubleDiamondBodiesHtml(slot, bodies, layer, scale = 1, offset = 0) {
    const visibleLimit = layer === "inner" ? 4 : 5;
    const visibleBodies = bodies.slice(0, visibleLimit);
    const overflowCount = bodies.length - visibleBodies.length;
    const labels = overflowCount > 0 ? [...visibleBodies, `+${overflowCount}`] : visibleBodies;
    const outerBodySlot = {
      1: [50, 9, 1],
      2: [22, 10, 1],
      3: [6, 31, 1],
      4: [22, 58, 1],
      5: [6, 84, 1],
      6: [22, 90, -1],
      7: [50, 92, -1],
      8: [78, 90, -1],
      9: [94, 84, 1],
      10: [78, 58, 1],
      11: [94, 31, 1],
      12: [78, 10, 1],
    };
    const innerBodySlot = {
      1: [50, 13, 1],
      2: [25, 14, 1],
      3: [10, 34, 1],
      4: [25, 56, 1],
      5: [10, 80, 1],
      6: [25, 86, -1],
      7: [50, 88, -1],
      8: [75, 86, -1],
      9: [90, 80, 1],
      10: [75, 56, 1],
      11: [90, 34, 1],
      12: [75, 14, 1],
    };
    const bodySlot = (layer === "outer" ? outerBodySlot : innerBodySlot)[slot.house] || [slot.x, slot.y + 4, 1];
    const [baseX, baseY, direction] = bodySlot;
    const step = layer === "inner" ? 4.2 : 4.9;

    return labels
      .map((body, index) => {
        const x = baseX * scale + offset;
        const y = (baseY + direction * index * step) * scale + offset;
        return doubleDiamondPlanetLabelHtml(body, x, y, layer);
      })
      .join("");
  }

  function doubleDiamondPlanetLabelHtml(body, x, y, layer) {
    if (typeof body === "string") {
      return `<text class="double-diamond-planet ${layer} overflow" x="${formatSvgNumber(x)}" y="${formatSvgNumber(y)}">${body}</text>`;
    }

    const planetName = shortPlanetName(body.name);
    const degree = planetDegreeLabel(body.degree);
    const colorClass = layer === "outer" ? gocharPlanetColorClass(body.name) : "planet-natal";
    const retrogradeMark = body.retrograde ? `<tspan class="planet-degree-sup" dx="0.12" dy="-1.3">*</tspan>` : "";
    const degreeDy = body.retrograde ? "0" : "-1.3";
    return `
      <text class="double-diamond-planet ${layer} ${colorClass}" x="${formatSvgNumber(x)}" y="${formatSvgNumber(y)}">
        <tspan>${planetName}</tspan>${retrogradeMark}${degree ? `<tspan class="planet-degree-sup" dx="0.3" dy="${degreeDy}">${degree}</tspan>` : ""}
      </text>
    `;
  }

  function transitDegreeComparisonHtml() {
    const transitPositions = sortPlanetPositions(
      Object.values(state.transitModal.data?.positions || {}).filter((position) => shouldShowPlanet(position.name || position.body || "")),
    );
    const birthPositionMap = birthPositionByPlanet();

    return `
      <aside class="transit-degree-panel" aria-label="Birth and transit degree comparison">
        <div class="double-diamond-legend">
          <span><i class="legend-dot transit"></i>Transit</span>
          <span><i class="legend-dot natal"></i>Natal D1</span>
        </div>
        <h3>Planet Degrees</h3>
        <table class="transit-degree-table">
          <thead>
            <tr>
              <th colspan="2" class="birth-group">Birth Chart</th>
              <th rowspan="2">Planet</th>
              <th colspan="2" class="transit-group">Transit</th>
            </tr>
            <tr>
              <th>Sign</th>
              <th>Degree</th>
              <th>Degree</th>
              <th>Sign</th>
            </tr>
          </thead>
          <tbody>
            ${transitPositions.map((position) => transitDegreeRowHtml(position, birthPositionMap)).join("")}
          </tbody>
        </table>
      </aside>
    `;
  }

  function transitDegreeRowHtml(position, birthPositionMap) {
    const name = position.name || position.body || "";
    const key = normalizedPlanetKey(name);
    const birthPosition = birthPositionMap.get(key) || {};
    const birthSign = Number(birthPosition.sign_index);
    const transitSign = Number(position.sign_index);
    const rowClass = transitAspectRowClass(birthPosition, position);
    return `
      <tr class="${rowClass}">
        <td>${birthSign ? localizedSignName(birthSign) : "-"}</td>
        <td>${formatDegreeDms(birthPosition.degree_in_sign)}</td>
        <td>${localizedPlanetName(name)}</td>
        <td>${formatDegreeDms(position.degree_in_sign)}</td>
        <td>${transitSign ? localizedSignName(transitSign) : "-"}</td>
      </tr>
    `;
  }

  function birthPositionByPlanet() {
    const map = new Map();
    const savedPositions = state.jatakView.positions?.positions || state.jatakView.positions || {};
    Object.values(savedPositions).forEach((position) => {
      const key = normalizedPlanetKey(position.name || position.body || "");
      if (!key) return;
      map.set(key, {
        degree_in_sign: position.degree_in_sign,
        sign_index: position.sign_index,
      });
    });

    Object.entries(state.jatakView.d1?.placements || {}).forEach(([name, placement]) => {
      const key = normalizedPlanetKey(name);
      if (!key || map.has(key)) return;
      map.set(key, {
        degree_in_sign: placement.degree_in_sign,
        sign_index: placement.sign_index,
      });
    });

    return map;
  }

  function transitAspectRowClass(birthPosition, transitPosition) {
    const birthLongitude = zodiacLongitude(birthPosition?.sign_index, birthPosition?.degree_in_sign);
    const transitLongitude = zodiacLongitude(transitPosition?.sign_index, transitPosition?.degree_in_sign);
    if (!Number.isFinite(birthLongitude) || !Number.isFinite(transitLongitude)) return "";
    const separation = circularDegreeDistance(birthLongitude, transitLongitude);
    if (separation <= 3) return "aspect-conjunction-row";
    if (Math.abs(separation - 180) <= 3) return "aspect-opposition-row";
    return "";
  }

  function zodiacLongitude(signIndex, degreeInSign) {
    const sign = Number(signIndex);
    const degree = Number(degreeInSign);
    if (!sign || !Number.isFinite(degree)) return NaN;
    return ((sign - 1) * 30 + degree + 360) % 360;
  }

  function circularDegreeDistance(firstDegree, secondDegree) {
    const difference = Math.abs((((Number(firstDegree) - Number(secondDegree)) % 360) + 360) % 360);
    return Math.min(difference, 360 - difference);
  }

  function normalizedPlanetKey(name) {
    const key = String(name || "").trim().toLowerCase();
    if (["lagna", "asc", "ascendant"].includes(key)) return "lagna";
    return key;
  }

  function formatCuspValue(column, value, row = {}) {
    if (value === null || value === undefined || value === "") return "-";
    if (column === "degree_in_sign") return formatDegreeDms(value);
    if (column === "sign") return localizedSignValue(value, row.sign_index);
    if (column === "nakshatra") return localizedNakshatraName(value);
    if (["rashi_swami", "nakshatra_swami", "sub_lord", "sub_sub_lord"].includes(column)) {
      return localizedPlanetFullName(value);
    }
    return String(value);
  }

  function formatColumnLabel(column) {
    const key = String(column || "").trim();
    if (!key) return "";
    const translated = t(`column.${key}`);
    if (translated !== `column.${key}`) return translated;
    return key
      .split("_")
      .filter(Boolean)
      .map((word) => {
        const lower = word.toLowerCase();
        if (lower === "id") return "ID";
        return lower.charAt(0).toUpperCase() + lower.slice(1);
      })
      .join(" ");
  }

  function nakshatraNaadiHtml() {
    if (state.jatakView.nakshatraNaadiLoading) {
      return `<div class="chart-state">${t("nakshatraNaadi.loading")}</div>`;
    }

    if (state.jatakView.nakshatraNaadiError) {
      return `<div class="chart-state error">${state.jatakView.nakshatraNaadiErrorKey ? t(state.jatakView.nakshatraNaadiErrorKey) : state.jatakView.nakshatraNaadiError}</div>`;
    }

    const planets = state.jatakView.nakshatraNaadi?.planets || {};
    const planetGroups = nakshatraNaadiGroups(planets);
    if (!planetGroups.length) {
      return `<div class="chart-state">${t("nakshatraNaadi.waiting")}</div>`;
    }

    const chunkSize = Math.ceil(planetGroups.length / 3);
    const columns = [planetGroups.slice(0, chunkSize), planetGroups.slice(chunkSize, chunkSize * 2), planetGroups.slice(chunkSize * 2)];
    return `
      <div class="nakshatra-naadi-panel">
        ${naadiRuleControlsHtml()}
        <div class="nakshatra-naadi-grid">
          ${columns
            .map(
              (column) => `
                <div class="nakshatra-naadi-column">
                  ${column.map(nakshatraNaadiGroupHtml).join("")}
                </div>
              `,
            )
            .join("")}
        </div>
        ${dashaTableHtml(planetGroups)}
      </div>
    `;
  }

  function naadiRuleControlsHtml() {
    const roots = Object.keys(state.naadiRules.data || {});
    const children = Object.keys(state.naadiRules.data?.[state.naadiRules.rootChoice] || {});
    return `
      <div class="naadi-rule-controls">
        <label>
          <select id="naadiRootSelect">
            ${roots.map((root) => `<option value="${escapeHtml(root)}" ${root === state.naadiRules.rootChoice ? "selected" : ""}>${escapeHtml(root)}</option>`).join("")}
          </select>
        </label>
        <label>
          <select id="naadiChildSelect">
            ${children.map((child) => `<option value="${escapeHtml(child)}" ${child === state.naadiRules.childChoice ? "selected" : ""}>${escapeHtml(child)}</option>`).join("")}
          </select>
        </label>
      </div>
    `;
  }

  function nakshatraNaadiGroups(planets) {
    const order = ["ketu", "venus", "sun", "moon", "mars", "rahu", "jupiter", "saturn", "mercury"];
    return order
      .map((key) => planets[key])
      .filter(Boolean)
      .map((planet) => {
        const rows = ["current_planet", "nakshatra_lord", "sub_lord"].map((field) => nakshatraNaadiRow(planet[field])).filter(Boolean);
        rows.planetKey = planet.planet_key;
        return rows;
      })
      .filter((group) => group.length);
  }

  function nakshatraNaadiGroupHtml(group) {
    return `
      <table class="nakshatra-naadi-table">
        <tbody>
          ${group
            .map(
              (row, index) => `
                <tr>
                  <th class="${index === 0 ? "group-primary" : ""}">${escapeHtml(row.planet)}</th>
                  <td>${nakshatraNaadiValuesHtml(row.values)}</td>
                </tr>
              `,
            )
            .join("")}
        </tbody>
      </table>
    `;
  }

  function nakshatraNaadiRow(item) {
    if (!item) return null;
    return {
      planet: shortPlanetName(item.planet_key || item.planet),
      values: Array.isArray(item.value) ? item.value : [],
    };
  }

  function nakshatraNaadiValuesHtml(values) {
    return values
      .slice()
      .sort((a, b) => Number(a) - Number(b))
      .map((value) => {
        const number = Number(value);
        const colorClass = naadiRuleColorClass(number);
        return `<span class="${colorClass}">${escapeHtml(String(value))}</span>`;
      })
      .join('<span class="naadi-number-separator">,</span>');
  }

  function naadiRuleColorClass(number) {
    const rule = selectedNaadiRule();
    if (rule.green?.map(Number).includes(number)) return "naadi-number-green";
    if (rule.red?.map(Number).includes(number)) return "naadi-number-red";
    return "naadi-number-default";
  }

  function naadiSignificatorMessageHtml(planetGroups) {
    const rule = selectedNaadiRule();
    const child = state.naadiRules.childChoice || "";
    const significator = rule.significator ? localizedPlanetFullName(rule.significator) : "-";
    const positives = scoredNaadiPlanets(planetGroups, rule)
      .filter((item) => item.score > 0)
      .map((item) => `${localizedPlanetFullName(item.planet)} (${item.score})`);
    return `
      <div class="naadi-significator-message">
        <div class="naadi-message-title">${escapeHtml(child)}</div>
        <div class="naadi-message-row">
          <span>Significator Planet</span>
          <strong>${escapeHtml(significator)}</strong>
        </div>
        <div class="naadi-message-row">
          <span>Positive Planets</span>
          <strong>${escapeHtml(positives.length ? positives.join(", ") : "-")}</strong>
        </div>
      </div>
    `;
  }

  function scoredNaadiPlanets(planetGroups, rule) {
    const green = new Set((rule.green || []).map(Number));
    const red = new Set((rule.red || []).map(Number));
    return planetGroups.map((group) => ({
      planet: group.planetKey || group[0]?.planet || "",
      score: group.reduce((total, row, index) => total + scoreNaadiRow(row.values, index === 2 ? 4 : index + 1, green, red), 0),
    }));
  }

  function scoreNaadiRow(values, rowNumber, green, red) {
    return (values || []).reduce((total, value) => {
      const number = Number(value);
      if (green.has(number)) return total + rowNumber;
      if (red.has(number)) return total - rowNumber;
      return total;
    }, 0);
  }

  function selectedNaadiRule() {
    return state.naadiRules.data?.[state.naadiRules.rootChoice]?.[state.naadiRules.childChoice] || {};
  }

  function dashaTableHtml(planetGroups = []) {
    const dasha = state.jatakView.dasha || defaultDashaState();
    if (dasha.loading) {
      return `<div class="dasha-panel"><div class="chart-state">${t("dasha.loading")}</div></div>`;
    }

    if (dasha.error) {
      return `<div class="dasha-panel"><div class="chart-state error">${dasha.errorKey ? t(dasha.errorKey) : dasha.error}</div></div>`;
    }

    const periods = dasha.data?.periods || [];
    if (!periods.length) {
      return `<div class="dasha-panel"><div class="chart-state">${t("dasha.waiting")}</div></div>`;
    }

    const level = dasha.level || "dasha";
    return `
      <div class="dasha-section">
        <div class="dasha-panel">
          <div class="dasha-heading">
            ${level !== "dasha" ? `<button id="dashaBackButton" type="button">${t("common.back")}</button>` : `<span></span>`}
            <strong>${t(`dasha.${level}`)}</strong>
            <button class="dasha-current-link" data-dasha-current type="button">${t("dasha.currentDasha")}</button>
          </div>
          <div class="dasha-table-wrap">
            <table class="dasha-table">
              <thead>
                <tr>
                  <th>${t("dasha.planet")}</th>
                  <th>${t("dasha.startDate")}</th>
                  <th>${t("dasha.endDate")}</th>
                </tr>
              </thead>
              <tbody>
                ${periods.map((period) => dashaPeriodRowHtml(period, level)).join("")}
              </tbody>
            </table>
          </div>
        </div>
        ${dashaTimingControlsHtml(planetGroups)}
        ${dashaActionPlaceholderHtml()}
      </div>
    `;
  }

  function dashaActionPlaceholderHtml() {
    return `
      <div class="dasha-action-placeholder">
        <button class="dasha-action-button" data-action="view-gochar" type="button">
          <span class="dasha-action-icon" aria-hidden="true">G</span>
          <strong>View Gochar</strong>
        </button>
      </div>
    `;
  }

  function dashaTimingControlsHtml(planetGroups = []) {
    const options = ["5 Years", "Year", "Month", "Day", "Hour", "10 Min", "Minute"];
    const selectedStep = state.jatakView.dasha?.step || "Hour";
    return `
      <div class="dasha-timing-panel">
        ${naadiSignificatorMessageHtml(planetGroups)}
        ${activeDashaNamesHtml()}
        <div class="dasha-working-date">
          <span>${t("dasha.workingDate")}</span>
          <strong>${escapeHtml(formatDateTime(dashaWorkingDate().toISOString()))} ${dashaRunningAgeHtml()}</strong>
        </div>
        <div class="dasha-time-options">
          ${options
            .map(
              (option) => `
                <label>
                  <input type="radio" name="dashaTimeStep" value="${escapeHtml(option)}" ${option === selectedStep ? "checked" : ""} />
                  <span>${escapeHtml(option)}</span>
                </label>
              `,
            )
            .join("")}
        </div>
        <div class="dasha-step-buttons">
          <button data-dasha-shift="-1" type="button">-</button>
          <button data-dasha-shift="1" type="button">+</button>
        </div>
      </div>
    `;
  }

  function activeDashaNamesHtml() {
    const periods = state.jatakView.dasha?.data?.periods || [];
    const active = periods.find(isCurrentDashaPeriod);
    const path = state.jatakView.dasha?.activePath?.length ? state.jatakView.dasha.activePath : Array.isArray(active?.path) ? active.path : [];
    const names = {
      dasha: dashaActiveNameHtml(path[0]),
      bhukti: dashaActiveNameHtml(path[1]),
      antara: dashaActiveNameHtml(path[2]),
    };
    return `
      <div class="dasha-active-summary">
        <div><span>${t("dasha.activeDasha")}</span>${names.dasha}</div>
        <div><span>${t("dasha.activeBhukti")}</span>${names.bhukti}</div>
        <div><span>${t("dasha.activeAntara")}</span>${names.antara}</div>
      </div>
    `;
  }

  function dashaActiveNameHtml(planetKey) {
    if (!planetKey) return `<strong>-</strong>`;
    const key = String(planetKey).toLowerCase();
    return `
      <strong class="dasha-active-planet">
        <img src="./src/images/planet-${escapeHtml(key)}.svg" alt="" />
        <span>${escapeHtml(localizedPlanetFullName(key))}</span>
      </strong>
    `;
  }

  function dashaPeriodRowHtml(period, level) {
    const path = Array.isArray(period.path) ? period.path : [];
    const label = dashaPathLabel(period);
    const clickable = level !== "antara" && path.length > 0 && path.length < 3;
    const activeClass = isCurrentDashaPeriod(period, dashaWorkingDate()) ? "active" : "";
    return `
      <tr class="${activeClass}">
        <td>
          ${
            clickable
              ? `<button class="dasha-link" data-dasha-path="${escapeHtml(path.join(","))}" type="button">${escapeHtml(label)}</button>`
              : `<span class="dasha-link dasha-link-static">${escapeHtml(label)}</span>`
          }
        </td>
        <td>${escapeHtml(formatDateTime(period.start))}</td>
        <td>${escapeHtml(formatDateTime(period.end))}</td>
      </tr>
    `;
  }

  function isCurrentDashaPeriod(period, targetDate = dashaWorkingDate()) {
    const start = new Date(period.start);
    const end = new Date(period.end);
    const now = targetDate;
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return false;
    return now >= start && now < end;
  }

  function dashaPathLabel(period) {
    const path = Array.isArray(period.path) ? period.path : [];
    if (!path.length) return localizedPlanetFullName(period.lord_key || period.lord || "");
    return path.map((planet) => localizedPlanetFullName(planet)).join("/");
  }

  function defaultDashaState() {
    return {
      level: "dasha",
      path: [],
      activePath: [],
      workingDate: new Date().toISOString(),
      step: "Hour",
      data: null,
      loading: false,
      error: "",
      errorKey: "",
    };
  }

  function planetaryDetailRowHtml(position) {
    return `
      <tr>
        <td>${localizedPlanetName(position.name || position.body || "")}${position.retrograde ? `<sup>*</sup>` : ""}</td>
        <td>${localizedSignName(position.sign_index)}</td>
        <td>${formatDegreeDms(position.degree_in_sign)}</td>
        <td>${localizedNakshatraName(position.nakshatra)}</td>
        <td>${position.pada || "-"}</td>
        <td>${position.retrograde ? t("common.yes") : t("common.no")}</td>
      </tr>
    `;
  }

  function sortPlanetPositions(positions) {
    return positions.slice().sort((a, b) => planetSortRank(a) - planetSortRank(b));
  }

  function planetSortRank(position) {
    const name = String(position.name || position.body || "").toLowerCase();
    return name === "lagna" || name === "asc" || name === "ascendant" ? 0 : 1;
  }

  function gocharChartHtml() {
    if (state.gochar.loading) {
      return `<div class="chart-state">${t("chart.loading")}</div>`;
    }

    if (state.gochar.error) {
      return `<div class="chart-state error">${state.gochar.errorKey ? t(state.gochar.errorKey) : state.gochar.error}</div>`;
    }

    if (!state.gochar.data) {
      return `<div class="chart-state">${t("chart.waiting")}</div>`;
    }

    const chartType = String(state.settings.chart_type || "north").toLowerCase();
    const houses = buildGocharHouses(state.gochar.data);
    return `
      <div class="gochar-chart-panel">
        ${chartType === "south" ? southChartHtml(houses) : northChartHtml(houses, "gochar")}
      </div>
    `;
  }

  function jatakChartWithHeaderHtml(chartKey, titleKey, selectedValue) {
    return `
      <div class="saved-chart-block">
        <div class="saved-chart-header">${chartHeaderHtml(chartKey, titleKey, state.jatakView.dateTimeLabel, selectedValue)}</div>
        <div class="saved-chart-body">${jatakChartHtml(chartKey)}</div>
      </div>
    `;
  }

  function jatakChartHtml(chartKey) {
    if (state.jatakView.loading) {
      return `<div class="chart-state">${t("chart.loading")}</div>`;
    }

    if (state.jatakView.error) {
      return `<div class="chart-state error">${state.jatakView.errorKey ? t(state.jatakView.errorKey) : state.jatakView.error}</div>`;
    }

    const chart = state.jatakView[chartKey];
    if (!chart) {
      return `<div class="chart-state">${t("chart.waiting")}</div>`;
    }

    const chartType = String(state.settings.chart_type || "north").toLowerCase();
    const houses = buildSavedChartHouses(chart);
    return `
      <div class="gochar-chart-panel">
        ${chartType === "south" ? southChartHtml(houses) : northChartHtml(houses, chartKey)}
      </div>
    `;
  }

  function chartHeaderHtml(chartKey, titleKey, dateTimeLabel, selectedValue) {
    const choices = state.chartHeaderChoices[chartKey] || { chart: selectedValue };
    const selectedChart = choices.chart || selectedValue;
    return `
      <div class="gochar-chart-heading saved-chart-heading">
        ${chartMiniPickerHtml(chartKey, "chart", selectedChart, chartPickerOptions(), "chart.selectChart", true)}
        <span class="chart-heading-spacer" aria-hidden="true"></span>
        ${dateTimeLabel ? `<span>${escapeHtml(dateTimeLabel)}</span>` : ""}
      </div>
    `;
  }

  function chartMiniPickerHtml(chartKey, type, selectedValue, options, labelKey, disabled = false) {
    const selectedLabel = chartPickerLabel(selectedValue, options);
    if (disabled) {
      return `
        <span class="chart-mini-picker chart-mini-picker-chart chart-mini-picker-disabled" aria-label="${t(labelKey)}">
          ${escapeHtml(selectedLabel)}
        </span>
      `;
    }
    return `
      <details class="chart-mini-picker chart-mini-picker-chart">
        <summary aria-label="${t(labelKey)}">${escapeHtml(selectedLabel)}</summary>
        <div class="chart-mini-picker-menu">
          ${options
            .map((option) => (typeof option === "string" ? { value: option, label: option } : option))
            .map(
              (option) => `
                <button class="${option.value === selectedValue ? "active" : ""}" data-chart-key="${chartKey}" data-chart-choice="${escapeHtml(option.value)}" type="button">
                  ${escapeHtml(option.label)}
                </button>
              `,
            )
            .join("")}
        </div>
      </details>
    `;
  }

  function chartPickerOptions() {
    return [
      { value: "D1", label: "Birth Chart - D1" },
      { value: "D2", label: "Hora Chart - D2" },
      { value: "D3", label: "Dreshkan Chart - D3" },
      { value: "CHALIT", label: "Chalit Chart - Chalit" },
      { value: "D9", label: "Navamansha Chart - D9" },
    ];
  }

  function chartPickerLabel(value, options) {
    const match = options.map((option) => (typeof option === "string" ? { value: option, label: option } : option)).find((option) => option.value === value);
    return match?.label || value;
  }

  function chartPickerTitle(value) {
    return chartPickerLabel(value, chartPickerOptions()).replace(/\s+-\s+D\d+$/i, "");
  }

  function panchangTilesHtml() {
    if (state.panchang.loading) {
      return `<div class="chart-state">${t("panchang.loading")}</div>`;
    }

    if (state.panchang.error) {
      return `<div class="chart-state error">${state.panchang.errorKey ? t(state.panchang.errorKey) : state.panchang.error}</div>`;
    }

    if (!state.panchang.data) {
      return `<div class="chart-state">${t("panchang.waiting")}</div>`;
    }

    const panchang = state.panchang.data;
    const tiles = [
      ["panchang.paksha", localizedPanchangValue("paksha", panchang.paksha)],
      ["panchang.tithi", indexedValue(localizedPanchangValue("tithi", panchang.tithi), panchang.tithi_index)],
      ["panchang.nakshatra", indexedValue(localizedPanchangValue("nakshatra", panchang.nakshatra), panchang.nakshatra_index)],
      ["panchang.hindiDay", localizedPanchangValue("day", panchang.hindi_day)],
      ["panchang.englishDay", localizedPanchangValue("day", panchang.english_day)],
      ["panchang.yog", indexedValue(localizedPanchangValue("yog", panchang.yog), panchang.yog_index)],
      ["panchang.karan", indexedValue(localizedPanchangValue("karan", panchang.karan), panchang.karan_index)],
      ["panchang.sunrise", formatTime(panchang.sunrise)],
      ["panchang.sunset", formatTime(panchang.sunset)],
    ];

    return `
      <div class="panchang-tile-panel">
        <div class="panchang-tile-heading">${t("panchang.title")}</div>
        ${tiles
          .map(
            ([labelKey, value]) => `
              <div class="panchang-tile">
                <span>${t(labelKey)}</span>
                <strong>${displayValue(value)}</strong>
              </div>
            `,
          )
          .join("")}
      </div>
    `;
  }

  function gocharChartHeaderHtml() {
    const calculatedAt = state.gochar.data?.calculated_at ? formatDateTime(state.gochar.data.calculated_at) : "";
    return `
      <div class="gochar-chart-heading">
        <strong>${t("chart.currentGochar")}</strong>
        <span class="chart-heading-spacer" aria-hidden="true"></span>
        ${calculatedAt ? `<span>${calculatedAt}</span>` : ""}
      </div>
    `;
  }

  function northChartHtml(houses, chartKey) {
    const rotatedHouses = rotateHousesForChart(houses, chartKey);
    const slots = [
      { house: 1, x: 50, y: 10, points: "50,2 74,26 50,50 26,26" },
      { house: 2, x: 25, y: 10, points: "2,2 50,2 26,26" },
      { house: 3, x: 10, y: 25, points: "2,2 26,26 2,50" },
      { house: 4, x: 25, y: 50, points: "2,50 26,26 50,50 26,74" },
      { house: 5, x: 10, y: 75, points: "2,50 26,74 2,98" },
      { house: 6, x: 25, y: 90, points: "2,98 26,74 50,98" },
      { house: 7, x: 50, y: 90, points: "50,50 74,74 50,98 26,74" },
      { house: 8, x: 75, y: 90, points: "50,98 74,74 98,98" },
      { house: 9, x: 90, y: 75, points: "98,50 98,98 74,74" },
      { house: 10, x: 75, y: 50, points: "50,50 74,26 98,50 74,74" },
      { house: 11, x: 90, y: 25, points: "98,2 98,50 74,26" },
      { house: 12, x: 75, y: 10, points: "50,2 98,2 74,26" },
    ];

    return `
      <svg class="north-diamond-chart" viewBox="0 0 100 100" preserveAspectRatio="none" role="img" aria-label="${t("chart.northIndian")}">
        ${slots
          .map((slot) => {
            const house = rotatedHouses[slot.house - 1];
            return `
              <g class="diamond-house">
                <polygon points="${slot.points}"></polygon>
                ${northHouseNumberHtml(slot, house.sign_index, chartKey)}
                ${northHouseBodiesHtml(slot, house.bodies)}
              </g>
            `;
          })
          .join("")}
      </svg>
    `;
  }

  function rotateHousesForChart(houses, chartKey) {
    const signIndex = Number(state.chartRotations[chartKey]);
    if (!signIndex) return houses;
    const startIndex = houses.findIndex((house) => Number(house.sign_index) === signIndex);
    if (startIndex < 0) return houses;
    return houses.slice(startIndex).concat(houses.slice(0, startIndex));
  }

  function northHouseNumberHtml(slot, houseNumber, chartKey) {
    const position = {
      1: [50, 6],
      2: [24, 5],
      3: [8, 26],
      4: [24, 46],
      5: [8, 72],
      6: [24, 88],
      7: [50, 96],
      8: [76, 88],
      9: [92, 72],
      10: [76, 46],
      11: [92, 26],
      12: [76, 5],
    }[slot.house] || [slot.x, slot.y];
    const label = houseNumber || "";
    return `<text class="diamond-house-number" x="${position[0]}" y="${position[1]}" data-rotate-chart="${escapeHtml(chartKey)}" data-sign-index="${label}">${label}</text>`;
  }

  function northHouseBodiesHtml(slot, bodies) {
    const visibleBodies = bodies.slice(0, 5);
    const overflowCount = bodies.length - visibleBodies.length;
    const labels = overflowCount > 0 ? [...visibleBodies, `+${overflowCount}`] : visibleBodies;
    const bodySlot = {
      1: [50, 11, 1],
      2: [24, 13, 1],
      3: [8, 34, 1],
      4: [24, 55, 1],
      5: [8, 80, 1],
      6: [24, 82, -1],
      7: [50, 88, -1],
      8: [76, 82, -1],
      9: [92, 80, 1],
      10: [76, 55, 1],
      11: [92, 34, 1],
      12: [76, 13, 1],
    }[slot.house] || [slot.x, slot.y + 4, 1];
    const [x, startY, direction] = bodySlot;

    return labels
      .map((body, index) => {
        const y = startY + direction * index * 4.6;
        return northPlanetLabelHtml(body, x, y);
      })
      .join("");
  }

  function northPlanetLabelHtml(body, x, y) {
    if (typeof body === "string") {
      return `<text class="diamond-house-body planet-red" x="${x}" y="${y}">${body}</text>`;
    }

    const planetName = shortPlanetName(body.name);
    const degree = planetDegreeLabel(body.degree);
    const colorClass = gocharPlanetColorClass(body.name);
    const retrogradeMark = body.retrograde ? `<tspan class="planet-degree-sup" dx="0.15" dy="-1.4">*</tspan>` : "";
    const degreeDy = body.retrograde ? "0" : "-1.4";
    return `
      <text class="diamond-house-body ${colorClass}" x="${x}" y="${y}">
        <tspan>${planetName}</tspan>${retrogradeMark}${degree ? `<tspan class="planet-degree-sup" dx="0.35" dy="${degreeDy}">${degree}</tspan>` : ""}
      </text>
    `;
  }

  function southChartHtml(houses) {
    const order = [12, 1, 2, 3, 11, 0, 0, 4, 10, 0, 0, 5, 9, 8, 7, 6];
    return `
      <div class="south-chart" aria-label="${t("chart.southIndian")}">
        ${order
          .map((houseNumber) => (houseNumber ? chartCellHtml(houses[houseNumber - 1]) : `<div class="chart-cell chart-cell-empty"></div>`))
          .join("")}
      </div>
    `;
  }

  function chartCellHtml(house) {
    const signIndex = house.sign_index || "";
    return `
      <div class="chart-cell">
        <span class="chart-house-number">${house.house}</span>
        <strong>${signIndex ? shortSign(signIndex) : ""}</strong>
        <div>${house.bodies.map((body) => `${shortPlanetName(body.name)}${planetDegreeLabel(body.degree)}`).join(" ")}</div>
      </div>
    `;
  }

  function buildGocharHouses(gochar) {
    const positions = gochar.positions || {};
    const lagna = positions.lagna || {};
    const lagnaSignIndex = Number(lagna.sign_index) || 1;
    const houses = Array.from({ length: 12 }, (_, index) => {
      const signIndex = ((lagnaSignIndex + index - 1) % 12) + 1;
      return {
        house: index + 1,
        sign_index: signIndex,
        bodies: [],
      };
    });

    Object.values(positions).forEach((position) => {
      if (!shouldShowPlanet(position.name || position.body || "")) return;
      const signIndex = Number(position.sign_index);
      if (!signIndex) return;
      const houseIndex = (signIndex - lagnaSignIndex + 12) % 12;
      houses[houseIndex].bodies.push({
        name: position.name || position.body || "",
        degree: Number(position.degree_in_sign),
        retrograde: position.retrograde === true,
      });
    });

    return houses;
  }

  function buildSavedChartHouses(chart) {
    const placements = chart.placements || {};
    return (chart.houses || []).map((house) => ({
      house: house.house,
      sign_index: house.sign_index || house.cusp_sign_index,
      bodies: (house.bodies || [])
        .filter((body) => shouldShowPlanet(body))
        .map((body) => {
          const placement = placements[body] || {};
          return {
            name: body,
            degree: Number(placement.degree_in_sign),
            retrograde: placement.retrograde === true,
          };
        }),
    }));
  }

  function chartEndpoint(chartCode) {
    const code = String(chartCode || "D1").toLowerCase();
    return code === "d1" ? "rasi" : code;
  }

  async function loadHomeGocharChart() {
    if (state.headingChoice !== "home" || state.gochar.loading) return;
    state.gochar.loading = true;
    state.gochar.error = "";
    state.gochar.errorKey = "";
    render();

    try {
      state.gochar.data = await getJson(`/chart/gochar?at=${encodeURIComponent(new Date().toISOString())}`, "chart.loadError");
    } catch (error) {
      state.gochar.error = error.message || t("chart.loadError");
      state.gochar.errorKey = error.messageKey || "chart.loadError";
    } finally {
      state.gochar.loading = false;
      render();
    }
  }

  async function loadHomePanchang() {
    if (state.headingChoice !== "home" || state.panchang.loading) return;
    state.panchang.loading = true;
    state.panchang.error = "";
    state.panchang.errorKey = "";
    render();

    try {
      const now = new Date();
      const date = localDateString(now);
      const time = localTimeString(now);
      state.panchang.data = await getJson(`/panchang?date=${encodeURIComponent(date)}&time=${encodeURIComponent(time)}`, "panchang.loadError");
    } catch (error) {
      state.panchang.error = error.message || t("panchang.loadError");
      state.panchang.errorKey = error.messageKey || "panchang.loadError";
    } finally {
      state.panchang.loading = false;
      render();
    }
  }

  async function loadSavedJatakView(jatakId, dateTimeLabel, jatakName = "") {
    if (!jatakId) return;
    state.headingChoice = "home";
    state.chartRotations.d1 = null;
    state.chartRotations.d9 = null;
    state.jatakView = {
      ...state.jatakView,
      active: true,
      jatakId,
      jatakName,
      dateTimeLabel,
      d1: null,
      d9: null,
      positions: null,
      cusps: null,
      cuspsLoading: false,
      cuspsError: "",
      cuspsErrorKey: "",
      nakshatraNaadi: null,
      nakshatraNaadiLoading: false,
      nakshatraNaadiError: "",
      nakshatraNaadiErrorKey: "",
      dasha: defaultDashaState(),
      loading: true,
      error: "",
      errorKey: "",
    };
    render();

    try {
      const topChart = state.chartHeaderChoices.d1.chart || "D1";
      const bottomChart = state.chartHeaderChoices.d9.chart || "D9";
      const [d1, d9, positions] = await Promise.all([
        getJson(`/jatak/${encodeURIComponent(jatakId)}/chart/${chartEndpoint(topChart)}`, "chart.loadError"),
        getJson(`/jatak/${encodeURIComponent(jatakId)}/chart/${chartEndpoint(bottomChart)}`, "chart.loadError"),
        getJson(`/jatak/${encodeURIComponent(jatakId)}/positions`, "chart.loadError"),
      ]);
      state.jatakView.d1 = d1;
      state.jatakView.d9 = d9;
      state.jatakView.positions = positions;
    } catch (error) {
      state.jatakView.error = error.message || t("chart.loadError");
      state.jatakView.errorKey = error.messageKey || "chart.loadError";
    } finally {
      state.jatakView.loading = false;
      render();
    }
  }

  async function loadSavedChartForPanel(panelKey, chartCode) {
    if (!state.jatakView.active || !state.jatakView.jatakId) return;
    state.jatakView = {
      ...state.jatakView,
      [panelKey]: null,
      loading: true,
      error: "",
      errorKey: "",
    };
    render();

    try {
      state.jatakView[panelKey] = await getJson(
        `/jatak/${encodeURIComponent(state.jatakView.jatakId)}/chart/${chartEndpoint(chartCode)}`,
        "chart.loadError",
      );
    } catch (error) {
      state.jatakView.error = error.message || t("chart.loadError");
      state.jatakView.errorKey = error.messageKey || "chart.loadError";
    } finally {
      state.jatakView.loading = false;
      render();
    }
  }

  async function loadSettings() {
    try {
      const response = await fetch("./settings.json");
      if (!response.ok) return {};
      return response.json();
    } catch {
      return {};
    }
  }

  async function loadNaadiRules() {
    try {
      const response = await fetch("./src/data/naadi.json");
      if (!response.ok) return {};
      return response.json();
    } catch {
      return {};
    }
  }

  function initializeNaadiRuleChoices() {
    const roots = Object.keys(state.naadiRules.data || {});
    state.naadiRules.rootChoice = state.naadiRules.rootChoice || roots[0] || "";
    state.naadiRules.childChoice = state.naadiRules.childChoice || firstNaadiChild(state.naadiRules.rootChoice);
  }

  function firstNaadiChild(root) {
    return Object.keys(state.naadiRules.data?.[root] || {})[0] || "";
  }

  async function getJson(path, errorKey = "chart.loadError") {
    const response = await fetch(API_BASE_URL + path);
    if (!response.ok) {
      const error = new Error(t(errorKey));
      error.messageKey = errorKey;
      throw error;
    }
    return response.json();
  }

  async function postJson(path, body, errorKey = "common.saveError") {
    const response = await fetch(API_BASE_URL + path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      const error = new Error(t(errorKey));
      error.messageKey = errorKey;
      throw error;
    }
    return response.json();
  }

  async function putJson(path, body, errorKey = "common.saveError") {
    const response = await fetch(API_BASE_URL + path, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      const error = new Error(t(errorKey));
      error.messageKey = errorKey;
      throw error;
    }
    return response.json();
  }

  async function deleteJson(path, errorKey = "common.saveError") {
    const response = await fetch(API_BASE_URL + path, { method: "DELETE" });
    if (!response.ok) {
      const error = new Error(t(errorKey));
      error.messageKey = errorKey;
      throw error;
    }
    return true;
  }

  function filteredOpenKundaliRecords() {
    const nameQuery = state.openKundali.nameQuery.trim().toLowerCase();
    const noteQuery = state.openKundali.noteQuery.trim().toLowerCase();
    if (!nameQuery && !noteQuery) return state.openKundali.records;
    return state.openKundali.records.filter((record) => {
      const nameMatches = !nameQuery || String(record.jatak_full_name || "").toLowerCase().includes(nameQuery);
      const noteMatches = !noteQuery || String(record.note1 || "").toLowerCase().includes(noteQuery);
      return nameMatches && noteMatches;
    });
  }

  function pagedOpenKundaliRecords() {
    const records = filteredOpenKundaliRecords();
    const start = (state.openKundali.page - 1) * state.openKundali.rowsPerPage;
    return records.slice(start, start + state.openKundali.rowsPerPage);
  }

  function attachKundaliModalHandlers() {
    if (!state.kundaliForm.open) return;
    document.getElementById("closeKundaliModal")?.addEventListener("click", closeKundaliModal);
    document.getElementById("cancelKundaliModal")?.addEventListener("click", closeKundaliModal);
    document.getElementById("kundaliForm")?.addEventListener("submit", saveKundali);
    document.getElementById("kundaliCountry")?.addEventListener("change", (event) => handleCountryChange(event.target.value));
    document.getElementById("kundaliState")?.addEventListener("change", (event) => handleStateChange(event.target.value));
    document.getElementById("kundaliCity")?.addEventListener("change", (event) => handleCityChange(event.target.value));
  }

  function attachOpenKundaliHandlers() {
    if (!state.openKundali.open) return;
    document.getElementById("closeOpenKundaliModal")?.addEventListener("click", closeOpenKundaliModal);
    document.getElementById("openKundaliNameSearch")?.addEventListener("input", (event) => handleOpenKundaliSearchInput(event, "name"));
    document.getElementById("openKundaliNoteSearch")?.addEventListener("input", (event) => handleOpenKundaliSearchInput(event, "note"));
    document.getElementById("openKundaliNameSearch")?.addEventListener("keydown", (event) => {
      if (event.key !== "Enter") return;
      state.openKundali.nameQuery = event.target.value;
      state.openKundali.page = 1;
      render();
    });
    document.getElementById("openKundaliNoteSearch")?.addEventListener("keydown", (event) => {
      if (event.key !== "Enter") return;
      state.openKundali.noteQuery = event.target.value;
      state.openKundali.page = 1;
      render();
    });
    document.getElementById("openKundaliRows")?.addEventListener("change", (event) => {
      state.openKundali.rowsPerPage = Number(event.target.value) || 10;
      state.openKundali.page = 1;
      render();
    });
    document.getElementById("openKundaliPrev")?.addEventListener("click", () => {
      state.openKundali.page = Math.max(1, state.openKundali.page - 1);
      render();
    });
    document.getElementById("openKundaliNext")?.addEventListener("click", () => {
      const totalPages = Math.max(1, Math.ceil(filteredOpenKundaliRecords().length / state.openKundali.rowsPerPage));
      state.openKundali.page = Math.min(totalPages, state.openKundali.page + 1);
      render();
    });
    document.querySelectorAll("[data-open-view]").forEach((button) => {
      button.addEventListener("click", () => viewOpenKundali(button.dataset.openView));
    });
    document.querySelectorAll("[data-open-edit]").forEach((button) => {
      button.addEventListener("click", () => editOpenKundali(button.dataset.openEdit));
    });
    document.querySelectorAll("[data-open-delete]").forEach((button) => {
      button.addEventListener("click", () => deleteOpenKundali(button.dataset.openDelete));
    });
    document.querySelectorAll("[data-open-suggestion]").forEach((button) => {
      button.addEventListener("click", () => viewOpenKundali(button.dataset.openSuggestion));
    });
    document.getElementById("cancelOpenKundaliEdit")?.addEventListener("click", () => {
      state.openKundali.editingId = null;
      state.openKundali.editForm = null;
      render();
    });
    document.getElementById("openKundaliEditForm")?.addEventListener("submit", updateOpenKundali);
  }

  function handleOpenKundaliSearchInput(event, type) {
    const caret = event.target.selectionStart || 0;
    const inputId = type === "note" ? "openKundaliNoteSearch" : "openKundaliNameSearch";
    if (type === "note") {
      state.openKundali.noteQuery = event.target.value;
    } else {
      state.openKundali.nameQuery = event.target.value;
    }
    state.openKundali.page = 1;
    render();
    const input = document.getElementById(inputId);
    input?.focus();
    input?.setSelectionRange(caret, caret);
  }

  function openKundaliModal() {
    const form = defaultKundaliForm();
    state.kundaliForm = {
      open: true,
      saving: false,
      message: "",
      error: "",
      countries: state.kundaliForm.countries || [],
      states: [],
      cities: [],
      loadingCountries: false,
      loadingStates: false,
      loadingCities: false,
      form,
    };
    render();
    if (!state.kundaliForm.countries.length) {
      loadCountries();
    } else {
      initializeDefaultCountry();
    }
  }

  function openSavedKundaliModal() {
    state.openKundali = {
      ...state.openKundali,
      open: true,
      error: "",
      message: "",
      editingId: null,
      editForm: null,
    };
    render();
    loadOpenKundaliRecords();
  }

  function closeKundaliModal() {
    state.kundaliForm.open = false;
    render();
  }

  function closeOpenKundaliModal() {
    state.openKundali.open = false;
    render();
  }

  async function loadOpenKundaliRecords() {
    state.openKundali.loading = true;
    state.openKundali.error = "";
    render();
    try {
      state.openKundali.records = await getJson("/jatak?limit=500&offset=0", "openKundali.loadError");
      const totalPages = Math.max(1, Math.ceil(filteredOpenKundaliRecords().length / state.openKundali.rowsPerPage));
      state.openKundali.page = Math.min(state.openKundali.page, totalPages);
    } catch (error) {
      state.openKundali.error = error.message || t("openKundali.loadError");
    } finally {
      state.openKundali.loading = false;
      render();
    }
  }

  async function viewOpenKundali(jatakId) {
    const record = state.openKundali.records.find((item) => String(item.jatak_id || item.id) === String(jatakId));
    state.openKundali.open = false;
    render();
    await loadSavedJatakView(jatakId, `${record?.date || ""} ${record?.time || ""}`.trim(), record?.jatak_full_name || "");
  }

  function editOpenKundali(jatakId) {
    const record = state.openKundali.records.find((item) => String(item.jatak_id || item.id) === String(jatakId));
    if (!record) return;
    state.openKundali.editingId = jatakId;
    state.openKundali.editForm = { ...record };
    state.openKundali.error = "";
    state.openKundali.message = "";
    render();
  }

  async function updateOpenKundali(event) {
    event.preventDefault();
    const id = state.openKundali.editingId;
    if (!id) return;
    const body = {
      city_name: document.getElementById("openEditCity")?.value.trim() || "",
      create_by: "admin",
      date: document.getElementById("openEditDate")?.value.trim() || "",
      jatak_full_name: document.getElementById("openEditName")?.value.trim() || "",
      gender: document.getElementById("openEditGender")?.value || "Male",
      latitude: document.getElementById("openEditLatitude")?.value.trim() || "",
      longitude: document.getElementById("openEditLongitude")?.value.trim() || "",
      note1: document.getElementById("openEditNote")?.value.trim() || "",
      time: document.getElementById("openEditTime")?.value.trim() || "",
      timezone: document.getElementById("openEditTimezone")?.value.trim() || "Asia/Kolkata",
    };
    if (!body.jatak_full_name || !body.date || !body.time || !body.city_name || !body.latitude || !body.longitude) {
      state.openKundali.error = t("openKundali.updateRequired");
      render();
      return;
    }
    state.openKundali.saving = true;
    state.openKundali.error = "";
    render();
    try {
      await putJson(`/jatak/${encodeURIComponent(id)}`, body, "openKundali.updateError");
      state.openKundali.message = t("openKundali.updated");
      state.openKundali.editingId = null;
      state.openKundali.editForm = null;
      if (String(state.jatakView.jatakId) === String(id)) {
        state.jatakView.jatakName = body.jatak_full_name;
      }
      await loadOpenKundaliRecords();
    } catch (error) {
      state.openKundali.error = error.message || t("openKundali.updateError");
    } finally {
      state.openKundali.saving = false;
      render();
    }
  }

  async function deleteOpenKundali(jatakId) {
    if (!window.confirm(t("openKundali.deleteConfirm"))) return;
    state.openKundali.error = "";
    render();
    try {
      await deleteJson(`/jatak/${encodeURIComponent(jatakId)}`, "openKundali.deleteError");
      state.openKundali.message = t("openKundali.deleted");
      await loadOpenKundaliRecords();
    } catch (error) {
      state.openKundali.error = error.message || t("openKundali.deleteError");
      render();
    }
  }

  async function loadCountries() {
    state.kundaliForm.loadingCountries = true;
    render();
    try {
      state.kundaliForm.countries = await getJson("/locations/countries", "kundali.countryLoadError");
      await initializeDefaultCountry();
    } catch (error) {
      state.kundaliForm.error = error.message || t("kundali.countryLoadError");
    } finally {
      state.kundaliForm.loadingCountries = false;
      render();
    }
  }

  async function initializeDefaultCountry() {
    if (!state.kundaliForm.open || state.kundaliForm.form.country_code) return;
    const india = findIndiaCountry(state.kundaliForm.countries);
    if (!india) return;
    state.kundaliForm.form = {
      ...state.kundaliForm.form,
      country_code: india.country_code,
      timezone: "Asia/Kolkata",
    };
    await loadStatesForCountry(india.country_code);
  }

  function findIndiaCountry(countries) {
    const exactIndia = (countries || []).find((country) => String(country.country_name || "").trim().toLowerCase() === "india");
    if (exactIndia) return exactIndia;
    return (countries || []).find((country) => {
      const code = String(country.country_code || "").toUpperCase();
      return code === "IN" || code === "IND";
    });
  }

  async function handleCountryChange(countryCode) {
    state.kundaliForm.form = {
      ...readKundaliForm(),
      country_code: countryCode,
      state_code: "",
      city_index: "",
      city_name: "",
      latitude: "",
      longitude: "",
      timezone: "Asia/Kolkata",
    };
    state.kundaliForm.states = [];
    state.kundaliForm.cities = [];
    if (!countryCode) {
      render();
      return;
    }
    await loadStatesForCountry(countryCode);
  }

  async function loadStatesForCountry(countryCode) {
    state.kundaliForm.loadingStates = true;
    render();
    try {
      state.kundaliForm.states = await getJson(`/locations/states?country_code=${encodeURIComponent(countryCode)}`, "kundali.stateLoadError");
    } catch (error) {
      state.kundaliForm.error = error.message || t("kundali.stateLoadError");
    } finally {
      state.kundaliForm.loadingStates = false;
      render();
    }
  }

  async function handleStateChange(stateCode) {
    const countryCode = document.getElementById("kundaliCountry")?.value || state.kundaliForm.form.country_code;
    state.kundaliForm.form = {
      ...readKundaliForm(),
      country_code: countryCode,
      state_code: stateCode,
      city_index: "",
      city_name: "",
      latitude: "",
      longitude: "",
      timezone: "Asia/Kolkata",
    };
    state.kundaliForm.cities = [];
    if (!countryCode || !stateCode) {
      render();
      return;
    }
    state.kundaliForm.loadingCities = true;
    render();
    try {
      state.kundaliForm.cities = await getJson(`/locations/cities?country_code=${encodeURIComponent(countryCode)}&state_code=${encodeURIComponent(stateCode)}`, "kundali.cityLoadError");
    } catch (error) {
      state.kundaliForm.error = error.message || t("kundali.cityLoadError");
    } finally {
      state.kundaliForm.loadingCities = false;
      render();
    }
  }

  function handleCityChange(cityIndex) {
    const city = state.kundaliForm.cities[Number(cityIndex)];
    state.kundaliForm.form = {
      ...readKundaliForm(),
      city_index: cityIndex,
      city_name: city?.city_name || "",
      latitude: city?.latitude ?? "",
      longitude: city?.longitude ?? "",
      timezone: city?.timezone || "Asia/Kolkata",
    };
    state.kundaliForm.error = "";
    render();
  }

  async function saveKundali(event) {
    event.preventDefault();
    state.kundaliForm.form = readKundaliForm();
    const form = state.kundaliForm.form;
    state.kundaliForm.error = "";
    state.kundaliForm.message = "";

    const dateError = validateKundaliDate(form.day, form.month, form.year);
    if (dateError) {
      state.kundaliForm.error = dateError;
      render();
      return;
    }

    if (!form.jatak_full_name || !form.day || !form.month || !form.year || !form.time || !form.gender || !form.city_name || !form.latitude || !form.longitude || !form.timezone) {
      state.kundaliForm.error = t("kundali.required");
      render();
      return;
    }

    state.kundaliForm.saving = true;
    render();

    try {
      const birthDate = apiDateString(form.day, form.month, form.year);
      const savedJatak = await postJson(
        "/jatak",
        {
          city_name: form.city_name,
          create_by: "admin",
          date: birthDate,
          jatak_full_name: form.jatak_full_name,
          gender: form.gender,
          latitude: form.latitude,
          longitude: form.longitude,
          note1: form.note1,
          time: form.time,
          timezone: form.timezone,
        },
        "kundali.saveError",
      );
      const savedJatakId = savedJatak?.jatak_id || savedJatak?.id;
      state.kundaliForm.message = t("kundali.saved");
      state.kundaliForm.form = defaultKundaliForm();
      state.kundaliForm.states = [];
      state.kundaliForm.cities = [];
      state.kundaliForm.open = false;
      if (savedJatakId) {
        await loadSavedJatakView(savedJatakId, `${birthDate} ${form.time}`, form.jatak_full_name);
      }
    } catch (error) {
      state.kundaliForm.error = error.message || t("kundali.saveError");
    } finally {
      state.kundaliForm.saving = false;
      render();
    }
  }

  function readKundaliForm() {
    const selectedCityIndex = document.getElementById("kundaliCity")?.value || state.kundaliForm.form.city_index || "";
    const selectedCity = selectedCityIndex !== "" ? state.kundaliForm.cities[Number(selectedCityIndex)] : null;
    return {
      jatak_full_name: document.getElementById("kundaliName")?.value.trim() || state.kundaliForm.form.jatak_full_name || "",
      day: document.getElementById("kundaliDay")?.value || state.kundaliForm.form.day || "",
      month: document.getElementById("kundaliMonth")?.value || state.kundaliForm.form.month || "",
      year: document.getElementById("kundaliYear")?.value.trim() || state.kundaliForm.form.year || "",
      time: document.getElementById("kundaliTime")?.value || state.kundaliForm.form.time || "",
      gender: document.querySelector('input[name="kundaliGender"]:checked')?.value || state.kundaliForm.form.gender || "",
      country_code: document.getElementById("kundaliCountry")?.value || state.kundaliForm.form.country_code || "",
      state_code: document.getElementById("kundaliState")?.value || state.kundaliForm.form.state_code || "",
      city_index: selectedCityIndex,
      city_name: selectedCity?.city_name || state.kundaliForm.form.city_name || "",
      latitude: document.getElementById("kundaliLatitude")?.value || selectedCity?.latitude || state.kundaliForm.form.latitude || "",
      longitude: document.getElementById("kundaliLongitude")?.value || selectedCity?.longitude || state.kundaliForm.form.longitude || "",
      timezone: document.getElementById("kundaliTimezone")?.value || selectedCity?.timezone || state.kundaliForm.form.timezone || "Asia/Kolkata",
      note1: document.getElementById("kundaliNote")?.value.trim() || state.kundaliForm.form.note1 || "",
    };
  }

  function defaultKundaliForm() {
    return {
      jatak_full_name: "",
      day: "",
      month: "",
      year: "",
      time: "",
      gender: "Male",
      country_code: "",
      state_code: "",
      city_index: "",
      city_name: "",
      latitude: "",
      longitude: "",
      timezone: "Asia/Kolkata",
      note1: "",
    };
  }

  function apiDateString(day, month, year) {
    return `${String(day).padStart(2, "0")}-${month}-${year}`;
  }

  function monthOptions(selectedMonth) {
    return ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      .map((month) => `<option value="${month}" ${selectedMonth === month ? "selected" : ""}>${month}</option>`)
      .join("");
  }

  function dayOptions(selectedDay) {
    return `<option value="">${t("kundali.selectDay")}</option>${Array.from({ length: 31 }, (_, index) => {
      const day = String(index + 1).padStart(2, "0");
      return `<option value="${day}" ${selectedDay === day ? "selected" : ""}>${day}</option>`;
    }).join("")}`;
  }

  function validateKundaliDate(dayValue, monthValue, yearValue) {
    if (!/^\d{1,2}$/.test(dayValue || "") || !/^\d{4}$/.test(yearValue || "")) {
      return t("kundali.invalidDate");
    }

    const day = Number(dayValue);
    const year = Number(yearValue);
    const monthIndex = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].indexOf(monthValue);
    const currentYear = new Date().getFullYear();

    if (monthIndex < 0 || year < 1800 || year > currentYear || day < 1) {
      return t("kundali.invalidDate");
    }

    const daysByMonth = [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const maxDay = daysByMonth[monthIndex];
    return day <= maxDay ? "" : t("kundali.invalidDate");
  }

  function isLeapYear(year) {
    return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
  }

  function shortPlanetName(name) {
    const key = String(name || "").toLowerCase();
    const value = t(`planet.${key}`);
    return state.language === "mr" ? value : value.slice(0, 3);
  }

  function planetFullName(name) {
    return localizedPlanetFullName(name);
  }

  function planetDegreeLabel(degree) {
    return Number.isFinite(degree) ? `${Math.floor(degree)}°` : "";
  }

  function formatDegree(degree) {
    const value = Number(degree);
    return Number.isFinite(value) ? `${value.toFixed(2)}°` : "-";
  }

  function formatDegreeDms(degree) {
    const value = Number(degree);
    if (!Number.isFinite(value)) return "-";
    const wholeDegree = Math.floor(value);
    const minuteFloat = (value - wholeDegree) * 60;
    const minute = Math.floor(minuteFloat);
    const second = Math.round((minuteFloat - minute) * 60);
    return `${wholeDegree}° ${minute}' ${second}"`;
  }

  function localizedPlanetName(name) {
    if (state.language !== "mr") return planetFullName(name);
    const key = String(name || "").toLowerCase();
    return state.messages.mr[`planet.${key}`] || planetFullName(key);
  }

  function localizedPlanetFullName(name) {
    const key = String(name || "").trim().toLowerCase();
    const englishNames = {
      lagna: "Lagna",
      asc: "Lagna",
      ascendant: "Lagna",
      sun: "Sun",
      moon: "Moon",
      mars: "Mars",
      mercury: "Mercury",
      jupiter: "Jupiter",
      venus: "Venus",
      saturn: "Saturn",
      rahu: "Rahu",
      ketu: "Ketu",
      uranus: "Uranus",
      neptune: "Neptune",
      pluto: "Pluto",
    };
    if (state.language !== "mr") return englishNames[key] || toTitleCase(String(name || ""));
    return state.messages.mr[`planet.${key}`] || englishNames[key] || toTitleCase(String(name || ""));
  }

  function localizedSignName(signIndex) {
    if (state.language !== "mr") return t(`sign.${signIndex}`);
    return state.messages.mr[`sign.${signIndex}`] || shortSign(signIndex);
  }

  function localizedSignValue(signName, signIndex) {
    const index = Number(signIndex) || signIndexFromName(signName);
    if (index) return localizedSignName(index);
    return signName || "-";
  }

  function signIndexFromName(signName) {
    const normalized = String(signName || "").trim().toLowerCase();
    const signs = {
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
    return signs[normalized] || null;
  }

  function localizedGender(value) {
    const normalized = String(value || "").trim().toLowerCase();
    if (!normalized) return "";
    if (normalized === "male") return t("kundali.genderMale");
    if (normalized === "female") return t("kundali.genderFemale");
    return toTitleCase(String(value));
  }

  function localizedNakshatraName(name) {
    if (state.language !== "mr") return name || "-";
    const key = String(name || "").trim().toLowerCase();
    const localeKey = key.replace(/\s+/g, "-");
    const translated = t(`panchangValue.nakshatra.${localeKey}`);
    if (translated !== `panchangValue.nakshatra.${localeKey}`) return translated;
    const names = {
      ashwini: "अश्विनी",
      bharani: "भरणी",
      krittika: "कृत्तिका",
      rohini: "रोहिणी",
      mrigashira: "मृगशिरा",
      ardra: "आर्द्रा",
      punarvasu: "पुनर्वसु",
      pushya: "पुष्य",
      ashlesha: "आश्लेषा",
      magha: "मघा",
      "purva phalguni": "पूर्वा फाल्गुनी",
      "uttara phalguni": "उत्तरा फाल्गुनी",
      hasta: "हस्त",
      chitra: "चित्रा",
      swati: "स्वाती",
      vishakha: "विशाखा",
      anuradha: "अनुराधा",
      jyeshtha: "ज्येष्ठा",
      mula: "मूळ",
      "purva ashadha": "पूर्वाषाढा",
      "uttara ashadha": "उत्तराषाढा",
      shravana: "श्रवण",
      dhanishta: "धनिष्ठा",
      shatabhisha: "शतभिषा",
      "purva bhadrapada": "पूर्वा भाद्रपदा",
      "uttara bhadrapada": "उत्तरा भाद्रपदा",
      revati: "रेवती",
    };
    return names[key] || name || "-";
  }

  function localizedPanchangValue(type, value) {
    if (!value || state.language !== "mr") return value || "-";
    const key = String(value).trim().toLowerCase().replace(/\s+/g, "-");
    return t(`panchangValue.${type}.${key}`) === `panchangValue.${type}.${key}` ? value : t(`panchangValue.${type}.${key}`);
  }

  function gocharPlanetColorClass(name) {
    const greenPlanets = new Set(["jupiter", "moon", "venus", "mercury"]);
    return greenPlanets.has(String(name || "").toLowerCase()) ? "planet-green" : "planet-red";
  }

  function shortSign(signIndex) {
    const value = t(`sign.${signIndex}`);
    return value.slice(0, 3);
  }

  function shouldShowPlanet(name) {
    const outerPlanets = new Set(["uranus", "neptune", "pluto"]);
    if (!outerPlanets.has(String(name || "").toLowerCase())) return true;
    return state.settings.show_outer_planets === true;
  }

  function formatDateTime(value) {
    if (!value) return "";
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? String(value) : date.toLocaleString();
  }

  function indexedValue(value, index) {
    return index === null || index === undefined || index === "" ? value : `${value} (${index})`;
  }

  function toTitleCase(value) {
    return String(value || "")
      .replace(/_/g, " ")
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }

  function displayValue(value) {
    return value === null || value === undefined || value === "" ? "-" : String(value);
  }

  function formatTime(value) {
    if (!value) return "";
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? String(value) : date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  function localDateString(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function localTimeString(date) {
    const hour = String(date.getHours()).padStart(2, "0");
    const minute = String(date.getMinutes()).padStart(2, "0");
    const second = String(date.getSeconds()).padStart(2, "0");
    return `${hour}:${minute}:${second}`;
  }

  function iconActionHtml(icon, labelKey, subLabelKey = "", sectionChoice = "", action = "", active = false) {
    return `
      <button class="section2-icon-action ${active ? "active" : ""}" ${sectionChoice ? `data-section-choice="${sectionChoice}"` : ""} ${action ? `data-action="${action}"` : ""} type="button">
        <span class="section2-icon-symbol" aria-hidden="true">${icon}</span>
        <span class="section2-icon-text">
          <strong>${t(labelKey)}</strong>
          ${subLabelKey ? `<span>${t(subLabelKey)}</span>` : ""}
        </span>
      </button>
    `;
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

  function t(key) {
    return state.messages[state.language][key] || state.messages.en[key] || key;
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
})();
