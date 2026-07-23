(function () {
  const API_BASE_URL = "http://127.0.0.1:8000";
  const CHART_LAYOUT_PLANET_SLOT_COUNT = 6;
  const JAIMINI_CHART_LAYOUT_PLANET_SLOT_COUNT = 12;

  const state = {
    language: localStorage.getItem("ej_vedic_language") || "en",
    headingChoice: "home",
    homeView: "current-gochar",
    headerActiveMenu: "home",
    naadiView: "cusp",
    headerMenuOpen: false,
    settings: {
      chart_type: "north",
      jatak_id: null,
      show_outer_planets: false,
      show_chart_layout_button: false,
      show_2dchart_layout_button: false,
      show_jaimini_chart_layout_button: false,
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
    panchangInfo: {
      yogs: null,
      yogsLoading: false,
      yogsError: "",
      yogsErrorKey: "",
      nakshatras: null,
      nakshatrasLoading: false,
      nakshatrasError: "",
      nakshatrasErrorKey: "",
      nakshatraFilters: {
        lord: "",
        sign: "",
        sign_lord: "",
        navamsa_lord: "",
        pada_lord: "",
        gana: "",
      },
    },
    hora: {
      data: null,
      loading: false,
      error: "",
      errorKey: "",
      location: null,
    },
    searchKundali: {
      records: [],
      suggestions: [],
      loading: false,
      error: "",
      errorKey: "",
      page: 1,
      rowsPerPage: 10,
      totalRecords: 0,
      totalPages: 1,
      nameQuery: "",
      noteQuery: "",
      activeSearchType: "",
      searchTimer: null,
      suggestionOpen: false,
      sectionACollapsed: false,
      activeTool: "",
      jaiminiInfoTab: "planetary",
      selected: {
        jatakId: null,
        jatakName: "",
        dateTimeLabel: "",
        birthDetails: null,
        d1: null,
        d9: null,
        d1Chart: "D1",
        d9Chart: "D9",
        jaimini: null,
        jaiminiLoading: false,
        jaiminiError: "",
        jaiminiErrorKey: "",
        d1Loading: false,
        d9Loading: false,
        positions: null,
        loading: false,
        error: "",
        errorKey: "",
        dasha: {
          level: "dasha",
          path: [],
          activePath: [],
          workingDate: new Date().toISOString(),
          step: "Hour",
          data: null,
          loading: false,
          error: "",
          errorKey: "",
        },
      },
    },
    imageModal: {
      open: false,
      title: "",
      src: "",
      mode: "",
      activeTab: "abodes",
    },
    astroNotes: {
      open: false,
      mode: "new",
      records: [],
      suggestions: [],
      query: "",
      searchBy: "notes",
      placementPlanet: "",
      placementHouse: "",
      placementSign: "",
      selectedId: null,
      editorText: "",
      message: "",
      error: "",
      loading: false,
      saving: false,
      page: 1,
      rowsPerPage: 10,
      totalRecords: 0,
      footer: "",
      editing: false,
      searchToken: 0,
      searchTimer: null,
      suggestionToken: 0,
      ascSign: 1,
      noteText: "",
      housePlanets: {},
      planetMenu: {
        open: false,
        house: null,
        x: 0,
        y: 0,
      },
    },
    homeNotes: {
      records: [],
      loading: false,
      error: "",
      page: 1,
      rowsPerPage: 10,
      totalRecords: 0,
      totalPages: 1,
      footer: "",
      query: "",
      selectedId: null,
      mode: "view",
      noteText: "",
      ascSign: 1,
      housePlanets: {},
      message: "",
      saving: false,
      planetMenu: {
        open: false,
        house: null,
        x: 0,
        y: 0,
      },
      sectionACollapsed: false,
      searchTimer: null,
    },
    jatakView: {
      active: false,
      jatakId: null,
      jatakName: "",
      dateTimeLabel: "",
      d1: null,
      rasi: null,
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
      rightView: "planet-details",
      birthDetails: null,
      birthDetailsLoading: false,
      birthDetailsError: "",
      birthDetailsErrorKey: "",
      panchang: {
        data: null,
        loading: false,
        error: "",
        errorKey: "",
      },
      btr: {
        workingDate: "",
        step: "Month",
      },
      kundaliSection: "basic-details",
      loading: false,
      error: "",
      errorKey: "",
    },
    ashtakVarga: {
      selectedPlanet: "",
      data: null,
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
      step: "Month",
      source: "jatakView",
      loading: false,
      error: "",
      errorKey: "",
    },
    chartLayoutModal: {
      open: false,
      mode: "sign",
      house: 1,
      slot: 1,
      message: "",
      returnContext: null,
    },
    twoDChartLayoutModal: {
      open: false,
      layer: "inner",
      mode: "sign",
      house: 1,
      slot: 1,
      message: "",
    },
    jaiminiChartLayoutModal: {
      open: false,
      mode: "sign",
      house: 1,
      slot: 1,
      message: "",
    },
    messages: {
      en: {},
      mr: {},
    },
    chartLayout: null,
    twoDChartLayout: null,
    jaiminiChartLayout: null,
  };

  const app = document.getElementById("app");

  init();

  async function init() {
    state.messages.en = await loadIni("./src/locales/en.ini");
    state.messages.mr = await loadIni("./src/locales/mr.ini");
    state.settings = { ...state.settings, ...(await loadSettings()) };
    state.chartLayout = await loadChartLayout();
    state.twoDChartLayout = await loadTwoDChartLayout();
    state.jaiminiChartLayout = await loadJaiminiChartLayout();
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
            <button class="header-menu-button" id="headerMenuButton" type="button" aria-label="${t("headerMenu.menu")}" aria-expanded="${state.headerMenuOpen ? "true" : "false"}">
              <img src="./src/images/menu.png" alt="" />
            </button>
            <span class="header-active-menu-label">${headerSelectedMenuHtml()}</span>
            ${headerMenuHtml()}
          </div>
          <div class="header-jatak-name">${headerCenterHtml()}</div>
          <label class="language-picker">
            <select id="languageSelect">
              <option value="en" ${state.language === "en" ? "selected" : ""}>${t("language.english")}</option>
              <option value="mr" ${state.language === "mr" ? "selected" : ""}>${t("language.marathi")}</option>
            </select>
          </label>
        </section>

        <section class="section section2" aria-label="section2">
          <div class="section2-icons">
            ${state.headingChoice === "home" && !state.jatakView.active ? iconActionHtml("./src/images/gochar.jpg", "homeIcon.currentGochar", "", "", "current-gochar", state.homeView === "current-gochar") : ""}
            ${state.headingChoice === "home" && !state.jatakView.active ? iconActionHtml("./src/images/hora.jpg", "homeIcon.hora", "", "", "hora", state.homeView === "hora") : ""}
            ${state.headingChoice === "home" && !state.jatakView.active ? iconActionHtml("./src/images/search_kundali.png", "homeIcon.searchKundali", "", "", "search-kundali", state.homeView === "search-kundali") : ""}
            ${state.headingChoice === "home" && !state.jatakView.active ? iconActionHtml("./src/images/add_notes.png", "homeIcon.notes", "", "", "home-notes", state.homeView === "notes") : ""}
            ${state.headingChoice === "home" && !state.jatakView.active && state.searchKundali.selected?.d1 ? iconActionHtml("VT", "kundaliSection.viewTransit", "", "", "search-view-transit", false) : ""}
            ${state.jatakView.active && state.headingChoice === "home" && state.headerActiveMenu === "open-kundali" ? kundaliSectionButtonsHtml() : ""}
            ${shouldShowChartLayoutButton() ? iconActionHtml("L", "chartLayout.title", "", "", "chart-layout") : ""}
            ${shouldShowTwoDChartLayoutButton() ? iconActionHtml("2D", "twoDChartLayout.title", "", "", "2d-chart-layout") : ""}
            ${shouldShowJaiminiChartLayoutButton() ? iconActionHtml("./src/images/jaimini.jpg", "jaiminiChartLayout.title", "", "", "jaimini-chart-layout") : ""}
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

        <section class="section section-title" aria-label="section_title">${sectionTitleHtml()}</section>

        <section class="section section3" aria-label="section3">
          <div class="vsectionlhs" aria-label="vsectionlhs">${leftRailMenuHtml()}</div>
          <div class="vsectionmiddle" aria-label="vsectionmiddle">
            ${sectionMiddleHtml()}
          </div>
          <div class="vsectionrhs" aria-label="vsectionrhs">${rightRailToolsHtml()}</div>
        </section>
        ${state.kundaliForm.open ? kundaliModalHtml() : ""}
        ${state.openKundali.open ? openKundaliModalHtml() : ""}
        ${state.transitModal.open ? transitGocharModalHtml() : ""}
        ${state.chartLayoutModal.open ? chartLayoutModalHtml() : ""}
        ${state.twoDChartLayoutModal.open ? twoDChartLayoutModalHtml() : ""}
        ${state.jaiminiChartLayoutModal.open ? jaiminiChartLayoutModalHtml() : ""}
        ${state.imageModal.open ? imageModalHtml() : ""}
        ${state.astroNotes.open ? astroNotesModalHtml() : ""}
        <div class="floating-planet-tooltip" id="floatingPlanetTooltip" hidden></div>
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

    document.removeEventListener("click", handleDocumentClick);
    document.addEventListener("click", handleDocumentClick);

    document.getElementById("headerMenuButton")?.addEventListener("click", (event) => {
      event.stopPropagation();
      state.headerMenuOpen = !state.headerMenuOpen;
      render();
    });

    document.querySelectorAll("[data-header-menu-action]").forEach((button) => {
      button.addEventListener("click", (event) => {
        event.stopPropagation();
        state.headerMenuOpen = false;
        if (button.dataset.headerMenuAction === "home") {
          state.headerActiveMenu = "home";
          resetToDefaultHome();
        }
        if (button.dataset.headerMenuAction === "new-kundali") {
          state.headerActiveMenu = "new-kundali";
          openKundaliModal();
        }
        if (button.dataset.headerMenuAction === "open-kundali") {
          state.headerActiveMenu = "open-kundali";
          openSavedKundaliModal();
        }
      });
    });

    document.getElementById("leftRailMenuButton")?.addEventListener("click", (event) => {
      event.stopPropagation();
      const menu = document.querySelector(".left-rail-menu");
      menu?.classList.toggle("open");
      if (!menu?.classList.contains("open")) {
        closeLeftRailSubmenus();
      }
    });

    document.querySelectorAll(".left-rail-menu-item > button").forEach((button) => {
      button.addEventListener("click", (event) => {
        event.stopPropagation();
        const item = button.closest(".left-rail-menu-item");
        if (!item?.querySelector(".left-rail-submenu")) return;
        const isOpen = item.classList.contains("submenu-open");
        closeLeftRailSubmenus();
        if (!isOpen) item.classList.add("submenu-open");
        document.querySelector(".left-rail-menu")?.classList.add("open");
      });
    });

    document.querySelectorAll("[data-image-modal]").forEach((button) => {
      button.addEventListener("click", (event) => {
        event.stopPropagation();
        openImageModal(button.dataset.imageTitle || "", button.dataset.imageModal || "");
      });
    });

    document.querySelectorAll("[data-planets-modal]").forEach((button) => {
      button.addEventListener("click", (event) => {
        event.stopPropagation();
        openPlanetsInfoModal();
      });
    });

    document.querySelectorAll("[data-panchang-info-modal]").forEach((button) => {
      button.addEventListener("click", (event) => {
        event.stopPropagation();
        openPanchangInfoModal();
      });
    });

    document.querySelectorAll("[data-astro-notes-modal]").forEach((button) => {
      button.addEventListener("click", (event) => {
        event.stopPropagation();
        openAstroNotesModal();
      });
    });

    document.querySelectorAll("[data-planet-info-tab]").forEach((button) => {
      button.addEventListener("click", () => {
        state.imageModal.activeTab = button.dataset.planetInfoTab || "abodes";
        render();
      });
    });

    document.querySelectorAll("[data-panchang-info-tab]").forEach((button) => {
      button.addEventListener("click", () => {
        state.imageModal.activeTab = button.dataset.panchangInfoTab || "tithi";
        render();
        if (state.imageModal.activeTab === "yog") loadPanchangYogReference();
        if (state.imageModal.activeTab === "nakshatra") loadPanchangNakshatraReference();
      });
    });

    document.querySelectorAll("[data-panchang-nakshatra-filter]").forEach((select) => {
      select.addEventListener("change", () => {
        state.panchangInfo.nakshatraFilters[select.dataset.panchangNakshatraFilter] = select.value;
        render();
      });
    });

    document.getElementById("closeImageModal")?.addEventListener("click", closeImageModal);

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
          if (state.headerActiveMenu === "open-kundali" && state.jatakView.active) {
            state.headingChoice = "home";
            state.jatakView.kundaliSection = "nakshatra-naadi";
          }
          render();
          loadNakshatraNaadi();
          loadDashaLevel("");
        }
        if (button.dataset.action === "view-gochar") {
          openTransitGocharModal();
        }
        if (button.dataset.action === "view-transit") {
          openTransitGocharModal();
        }
        if (button.dataset.action === "search-view-transit") {
          openTransitGocharModal("search-kundali");
        }
        if (button.dataset.action === "current-gochar") {
          state.homeView = "current-gochar";
          render();
          loadHomeGocharChart();
        }
        if (button.dataset.action === "hora") {
          state.homeView = "hora";
          render();
          loadHomeHora();
        }
        if (button.dataset.action === "search-kundali") {
          state.homeView = "search-kundali";
          resetSearchKundaliView();
          render();
          loadSearchKundaliRecords({ autoOpenLatest: true });
        }
        if (button.dataset.action === "home-notes") {
          state.homeView = "notes";
          state.homeNotes.page = 1;
          state.homeNotes.records = [];
          state.homeNotes.error = "";
          render();
          loadHomeNotes();
        }
        if (button.dataset.action === "jatak-panchang") {
          state.jatakView.rightView = "panchang";
          render();
          loadJatakPanchang();
        }
        if (button.dataset.action === "jatak-planet-details") {
          state.jatakView.rightView = "planet-details";
          render();
        }
        if (button.dataset.action?.startsWith("kundali-section-")) {
          const section = button.dataset.action.replace("kundali-section-", "");
          state.jatakView.kundaliSection = section;
          render();
          if (section === "nakshatra-naadi") {
            state.naadiView = "nakshatra";
            state.chartHeaderChoices.d1.chart = "D1";
            state.chartHeaderChoices.d9.chart = "CHALIT";
            loadSavedChartForPanel("d9", "CHALIT");
            loadNakshatraNaadi();
            loadDashaLevel("");
          }
          if (section === "btr") {
            state.chartHeaderChoices.d1.chart = "D1";
            state.chartHeaderChoices.d9.chart = "D9";
            initBtrWorkingDate();
            loadBtrCharts();
          }
          if (section === "ashtak-varga") {
            selectDefaultAshtakVarga();
          }
        }
        if (button.dataset.ashtakPlanet) {
          state.ashtakVarga.selectedPlanet = button.dataset.ashtakPlanet;
          state.ashtakVarga.data = null;
          state.ashtakVarga.error = "";
          state.ashtakVarga.errorKey = "";
          render();
          loadAshtakVarga(button.dataset.ashtakPlanet);
        }
        if (button.dataset.action === "chart-layout") {
          openChartLayoutModal();
        }
        if (button.dataset.action === "2d-chart-layout") {
          openTwoDChartLayoutModal();
        }
        if (button.dataset.action === "jaimini-chart-layout") {
          openJaiminiChartLayoutModal();
        }
      });
    });

    document.querySelectorAll("[data-home-notes-page]").forEach((button) => {
      button.addEventListener("click", () => changeHomeNotesPage(button.dataset.homeNotesPage));
    });
    document.getElementById("homeNotesSearch")?.addEventListener("input", (event) => handleHomeNotesSearchInput(event));
    document.querySelector("[data-home-notes-toggle]")?.addEventListener("click", () => {
      state.homeNotes.sectionACollapsed = !state.homeNotes.sectionACollapsed;
      render();
    });
    document.querySelector("[data-home-notes-reset]")?.addEventListener("click", () => resetHomeNotesSearch());
    document.querySelectorAll("[data-home-note-select]").forEach((button) => {
      button.addEventListener("click", () => selectHomeNote(button.dataset.homeNoteSelect || ""));
      button.addEventListener("mouseenter", () => positionHomeNoteTooltip(button));
      button.addEventListener("focus", () => positionHomeNoteTooltip(button));
    });
    document.querySelectorAll("[data-home-notes-action]").forEach((button) => {
      button.addEventListener("click", () => handleHomeNotesAction(button.dataset.homeNotesAction || ""));
    });
    document.getElementById("homeNotesDetailText")?.addEventListener("input", (event) => {
      state.homeNotes.noteText = event.target.value;
      state.homeNotes.message = "";
      state.homeNotes.error = "";
    });
    document.querySelectorAll("[data-home-note-asc-sign]").forEach((sign) => {
      sign.addEventListener("click", () => {
        if (!isHomeNotesEditable()) return;
        state.homeNotes.ascSign = Number(sign.dataset.homeNoteAscSign) || 1;
        render();
      });
    });
    document.querySelectorAll("[data-home-note-remove-planet]").forEach((planetLabel) => {
      planetLabel.addEventListener("click", (event) => {
        event.stopPropagation();
        if (!isHomeNotesEditable()) return;
        removeHomeNotePlanetFromHouse(
          Number(planetLabel.dataset.homeNoteRemoveHouse) || 0,
          planetLabel.dataset.homeNoteRemovePlanet || "",
        );
      });
    });
    document.querySelectorAll("[data-home-note-house]").forEach((house) => {
      house.addEventListener("contextmenu", (event) => {
        if (!isHomeNotesEditable()) return;
        event.preventDefault();
        const shellRect = document.querySelector(".home-notes-detail-shell")?.getBoundingClientRect();
        state.homeNotes.planetMenu = {
          open: true,
          house: Number(house.dataset.homeNoteHouse) || 1,
          x: Math.max(8, event.clientX - (shellRect?.left || 0)),
          y: Math.max(8, event.clientY - (shellRect?.top || 0)),
        };
        render();
      });
    });
    document.querySelectorAll("[data-home-note-planet-option]").forEach((button) => {
      button.addEventListener("click", () => addHomeNotePlanetToHouse(button.dataset.homeNotePlanetOption || ""));
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
        dashaSourceView().dasha.step = input.value;
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

    document.querySelectorAll("[name='btrTimeStep']").forEach((input) => {
      input.addEventListener("change", () => {
        state.jatakView.btr = {
          ...(state.jatakView.btr || {}),
          step: input.value,
        };
      });
    });

    document.querySelectorAll("[data-btr-shift]").forEach((button) => {
      button.addEventListener("click", () => {
        shiftBtrWorkingDate(Number(button.dataset.btrShift));
      });
    });

    document.querySelectorAll("[data-search-kundali-page]").forEach((button) => {
      button.addEventListener("click", () => {
        changeSearchKundaliPage(Number(button.dataset.searchKundaliPage));
      });
    });

    document.querySelector("[data-search-kundali-section-toggle]")?.addEventListener("click", () => {
      state.searchKundali.sectionACollapsed = !state.searchKundali.sectionACollapsed;
      state.searchKundali.suggestionOpen = false;
      render();
    });

    document.querySelectorAll("[data-search-kundali-input]").forEach((input) => {
      input.addEventListener("input", (event) => handleSearchKundaliInput(event, input.dataset.searchKundaliInput));
      input.addEventListener("focus", () => {
        state.searchKundali.activeSearchType = input.dataset.searchKundaliInput || "";
        if (searchKundaliActiveQuery().length >= 3) state.searchKundali.suggestionOpen = true;
      });
    });

    document.querySelector(".search-kundali-section-a-bottom")?.addEventListener("mouseenter", hideSearchKundaliSuggestions);

    document.querySelectorAll("[data-search-kundali-suggestion]").forEach((button) => {
      button.addEventListener("click", () => applySearchKundaliSuggestion(button.dataset.searchKundaliSuggestion));
    });

    document.querySelectorAll("[data-search-kundali-clear]").forEach((button) => {
      button.addEventListener("click", () => clearSearchKundaliField(button.dataset.searchKundaliClear));
    });

    document.querySelectorAll("[data-search-kundali-record]").forEach((button) => {
      button.addEventListener("click", () => {
        state.searchKundali.suggestionOpen = false;
        loadSearchKundaliPreview(button.dataset.searchKundaliRecord);
      });
    });

    document.querySelectorAll("[data-search-kundali-tool]").forEach((button) => {
      button.addEventListener("click", () => {
        handleSearchKundaliTool(button.dataset.searchKundaliTool);
      });
    });

    document.querySelectorAll("[data-jaimini-info-tab]").forEach((button) => {
      button.addEventListener("click", () => {
        state.searchKundali.jaiminiInfoTab = button.dataset.jaiminiInfoTab || "planetary";
        render();
      });
    });

    bindPlanetTooltips();

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

    document.querySelectorAll("[data-search-kundali-chart-choice]").forEach((button) => {
      button.addEventListener("click", () => {
        updateSearchKundaliPreviewChart(button.dataset.searchKundaliChartKey, button.dataset.searchKundaliChartChoice);
      });
    });

    document.querySelectorAll("[data-rotate-chart][data-sign-index]").forEach((sign) => {
      sign.addEventListener("dblclick", () => {
        rotateChartToSign(sign.dataset.rotateChart, sign.dataset.signIndex);
      });
    });

    attachKundaliModalHandlers();
    attachOpenKundaliHandlers();
    attachAstroNotesHandlers();
    attachChartLayoutHandlers();
    attachTwoDChartLayoutHandlers();
    attachJaiminiChartLayoutHandlers();
  }

  function sectionTitleHtml() {
    const view = sectionTitleJatakView();
    if (!view) return "";
    return `<div class="kundali-jatak-name-badge section-title-jatak-badge">${kundaliJatakSummaryForHtml(view)}</div>`;
  }

  function sectionTitleJatakView() {
    if (state.headingChoice !== "home") return null;
    if (state.homeView === "search-kundali" && state.searchKundali.selected?.jatakId) {
      return state.searchKundali.selected;
    }
    if (state.jatakView.active) {
      if (state.jatakView.kundaliSection === "nakshatra-naadi") return nakshatraNaadiSourceView();
      if (state.jatakView.kundaliSection === "ashtak-varga") return ashtakVargaSourceView();
      return state.jatakView;
    }
    return null;
  }

  function closeLeftRailSubmenus() {
    document.querySelectorAll(".left-rail-menu-item.submenu-open").forEach((openItem) => {
      openItem.classList.remove("submenu-open");
    });
  }

  function closeLeftRailMenu() {
    document.querySelector(".left-rail-menu")?.classList.remove("open");
    closeLeftRailSubmenus();
  }

  function handleDocumentClick(event) {
    const headerMenu = document.querySelector(".logo-area");
    if (state.headerMenuOpen && headerMenu && !headerMenu.contains(event.target)) {
      state.headerMenuOpen = false;
      render();
      return;
    }
    const railMenu = document.querySelector(".left-rail-menu");
    if (railMenu && !railMenu.contains(event.target)) {
      closeLeftRailMenu();
    }
    const planetMenu = document.querySelector(".astro-notes-planet-menu");
    if (state.astroNotes.planetMenu.open && planetMenu && !planetMenu.contains(event.target)) {
      state.astroNotes.planetMenu = { open: false, house: null, x: 0, y: 0 };
      render();
    }
  }

  function openImageModal(title, src) {
    if (!src) return;
    state.imageModal = { open: true, title, src, mode: "image", activeTab: "abodes" };
    closeLeftRailMenu();
    render();
  }

  function openPlanetsInfoModal() {
    state.imageModal = { open: true, title: "Planets", src: "", mode: "planets", activeTab: "abodes" };
    closeLeftRailMenu();
    render();
  }

  function openPanchangInfoModal() {
    state.imageModal = { open: true, title: t("panchang.title"), src: "", mode: "panchangInfo", activeTab: "tithi" };
    closeLeftRailMenu();
    render();
  }

  function openAstroNotesModal() {
    state.astroNotes = {
      ...state.astroNotes,
      open: true,
      mode: "new",
      records: [],
      selectedId: null,
      editorText: "",
      page: 1,
      totalRecords: 0,
      message: "",
      error: "",
    };
    closeLeftRailMenu();
    render();
  }

  function closeAstroNotesModal() {
    state.astroNotes.open = false;
    state.astroNotes.message = "";
    state.astroNotes.error = "";
    render();
  }

  function closeImageModal() {
    state.imageModal.open = false;
    render();
  }

  function resetToDefaultHome() {
    state.headingChoice = "home";
    state.homeView = "current-gochar";
    state.naadiView = "cusp";
    state.jatakView = {
      active: false,
      jatakId: null,
      jatakName: "",
      dateTimeLabel: "",
      d1: null,
      rasi: null,
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
      rightView: "planet-details",
      birthDetails: null,
      panchang: {
        data: null,
        loading: false,
        error: "",
        errorKey: "",
      },
      btr: {
        workingDate: "",
        step: "Month",
      },
      kundaliSection: "basic-details",
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
      rasi: null,
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

    const [topResult, bottomResult, rasiResult, cuspsResult] = await Promise.allSettled([
      getJson(jatakChartUrl(state.jatakView.jatakId, topChart), "chart.loadError"),
      getJson(jatakChartUrl(state.jatakView.jatakId, bottomChart), "chart.loadError"),
      getJson(jatakChartUrl(state.jatakView.jatakId, "D1"), "chart.loadError"),
      getJson(`/jatak/${encodeURIComponent(state.jatakView.jatakId)}/kp/cusps`, "cusp.loadError"),
    ]);

    if (topResult.status === "fulfilled") state.jatakView.d1 = topResult.value;
    if (bottomResult.status === "fulfilled") state.jatakView.d9 = bottomResult.value;
    if (rasiResult.status === "fulfilled") state.jatakView.rasi = rasiResult.value;
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
    const isSearchSource = isSearchKundaliTool("nakshatra-naadi");
    const sourceView = nakshatraNaadiSourceView();
    const jatakId = sourceView.jatakId;
    if (!sourceView.jatakId || sourceView.nakshatraNaadiLoading) return;
    setNakshatraNaadiSourceState(isSearchSource, jatakId, {
      nakshatraNaadiLoading: true,
      nakshatraNaadiError: "",
      nakshatraNaadiErrorKey: "",
    });
    render();

    try {
      const data = await getJson(`/jatak/${encodeURIComponent(jatakId)}/kp/nakshatra-nadi`, "nakshatraNaadi.loadError");
      setNakshatraNaadiSourceState(isSearchSource, jatakId, { nakshatraNaadi: data });
    } catch (error) {
      setNakshatraNaadiSourceState(isSearchSource, jatakId, {
        nakshatraNaadiError: error.message || t("nakshatraNaadi.loadError"),
        nakshatraNaadiErrorKey: error.messageKey || "nakshatraNaadi.loadError",
      });
    } finally {
      setNakshatraNaadiSourceState(isSearchSource, jatakId, { nakshatraNaadiLoading: false });
      render();
    }
  }

  function setNakshatraNaadiSourceState(isSearchSource, jatakId, patch) {
    if (isSearchSource) {
      if (String(state.searchKundali.selected?.jatakId || "") !== String(jatakId || "")) return;
      state.searchKundali.selected = {
        ...state.searchKundali.selected,
        ...patch,
      };
      return;
    }
    state.jatakView = {
      ...state.jatakView,
      ...patch,
    };
  }

  async function openTransitGocharModal(source = "jatakView") {
    localStorage.removeItem("ej_vedic_2d_chart_layout_draft");
    state.twoDChartLayout = await loadTwoDChartLayout();
    state.transitModal = {
      ...state.transitModal,
      open: true,
      source,
      workingDate: state.jatakView.dasha?.workingDate || new Date().toISOString(),
      step: "Month",
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

  function openChartLayoutModal() {
    state.chartLayoutModal.open = true;
    state.chartLayoutModal.message = "";
    state.chartLayoutModal.returnContext = {
      headingChoice: state.headingChoice,
      headerActiveMenu: state.headerActiveMenu,
      kundaliSection: state.jatakView.kundaliSection,
      jatakActive: state.jatakView.active,
    };
    render();
  }

  function closeChartLayoutModal() {
    state.chartLayoutModal.open = false;
    state.chartLayoutModal.message = "";
    render();
  }

  function openTwoDChartLayoutModal() {
    state.twoDChartLayoutModal.open = true;
    state.twoDChartLayoutModal.message = "";
    render();
  }

  function closeTwoDChartLayoutModal() {
    state.twoDChartLayoutModal.open = false;
    state.twoDChartLayoutModal.message = "";
    render();
  }

  function openJaiminiChartLayoutModal() {
    state.jaiminiChartLayoutModal.open = true;
    state.jaiminiChartLayoutModal.message = "";
    render();
  }

  function closeJaiminiChartLayoutModal() {
    state.jaiminiChartLayoutModal.open = false;
    state.jaiminiChartLayoutModal.message = "";
    render();
  }

  function bindPlanetTooltips() {
    const tooltip = document.getElementById("floatingPlanetTooltip");
    if (!tooltip) return;

    const moveTooltip = (event) => {
      const padding = 14;
      const rect = tooltip.getBoundingClientRect();
      let left = event.clientX + padding;
      let top = event.clientY + padding;
      if (left + rect.width > window.innerWidth - 8) left = event.clientX - rect.width - padding;
      if (top + rect.height > window.innerHeight - 8) top = event.clientY - rect.height - padding;
      tooltip.style.left = `${Math.max(8, left)}px`;
      tooltip.style.top = `${Math.max(8, top)}px`;
    };

    document.querySelectorAll("[data-planet-tooltip]").forEach((planet) => {
      planet.addEventListener("mouseenter", (event) => {
        tooltip.className = `floating-planet-tooltip ${planet.dataset.tooltipLayer === "outer" ? "gochar" : "birth"}`;
        tooltip.innerHTML = decodeURIComponent(planet.dataset.planetTooltip || "");
        tooltip.hidden = false;
        moveTooltip(event);
      });
      planet.addEventListener("mousemove", moveTooltip);
      planet.addEventListener("mouseleave", () => {
        tooltip.hidden = true;
      });
    });
  }

  async function loadTransitGochar() {
    if (!state.transitModal.open || state.transitModal.loading) return;
    state.transitModal.loading = true;
    state.transitModal.error = "";
    state.transitModal.errorKey = "";
    render();

    try {
      state.transitModal.data = await getJson(gocharChartUrl(state.transitModal.workingDate), "chart.loadError");
    } catch (error) {
      state.transitModal.error = error.message || t("chart.loadError");
      state.transitModal.errorKey = error.messageKey || "chart.loadError";
    } finally {
      state.transitModal.loading = false;
      render();
    }
  }

  async function loadHomeHora() {
    if (state.headingChoice !== "home" || state.jatakView.active || state.hora.loading) return;
    state.hora.loading = true;
    state.hora.error = "";
    state.hora.errorKey = "";
    render();

    try {
      if (!state.gochar.data && !state.gochar.loading) {
        state.gochar.data = await getJson(gocharChartUrl(), "chart.loadError");
      }
      const params = horaQueryParamsFromGochar();
      const targetDate = horaTargetDateFromGochar();
      let horaData = await getJson(`/panchang/hora?${params.toString()}`, "hora.loadError");
      horaData = normalizeHoraCurrent(horaData, targetDate);

      if (!currentHoraFromData(horaData)) {
        const previousDate = new Date(targetDate);
        previousDate.setDate(previousDate.getDate() - 1);
        const previousParams = horaQueryParamsFromGochar(previousDate);
        horaData = await getJson(`/panchang/hora?${previousParams.toString()}`, "hora.loadError");
        horaData = normalizeHoraCurrent(horaData, targetDate);
      }

      state.hora.data = horaData;
    } catch (error) {
      state.hora.error = error.message || t("hora.loadError");
      state.hora.errorKey = error.messageKey || "";
    } finally {
      state.hora.loading = false;
      render();
    }
  }

  function currentBrowserCoordinates() {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error(t("hora.locationUnsupported")));
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: Number(position.coords.latitude.toFixed(6)),
            longitude: Number(position.coords.longitude.toFixed(6)),
          });
        },
        () => reject(new Error(t("hora.locationDenied"))),
        { enableHighAccuracy: true, timeout: 12000, maximumAge: 300000 },
      );
    });
  }

  function horaTargetDateFromGochar() {
    const calculatedAt = state.gochar.data?.calculated_at;
    const date = calculatedAt ? new Date(calculatedAt) : new Date();
    return Number.isNaN(date.getTime()) ? new Date() : date;
  }

  function horaQueryParamsFromGochar(dateOverride = null) {
    const data = state.gochar.data || {};
    const date = dateOverride || horaTargetDateFromGochar();
    const params = new URLSearchParams({
      date: apiIsoDate(date),
      time: apiTimeString(date),
    });
    if (data.timezone) params.set("timezone", data.timezone);
    if (data.latitude !== undefined && data.latitude !== null && data.latitude !== "") params.set("latitude", String(data.latitude));
    if (data.longitude !== undefined && data.longitude !== null && data.longitude !== "") params.set("longitude", String(data.longitude));
    return params;
  }

  function horaQueryParams(coords, date, timezone) {
    return new URLSearchParams({
      latitude: String(coords.latitude),
      longitude: String(coords.longitude),
      date: apiIsoDate(date),
      time: apiTimeString(date),
      timezone,
    });
  }

  function normalizeHoraCurrent(data, targetDate = new Date()) {
    const targetTime = targetDate.getTime();
    const horas = (data?.horas || []).map((hora) => {
      const start = new Date(hora.start_time).getTime();
      const end = new Date(hora.end_time).getTime();
      const isCurrent = Number.isFinite(start) && Number.isFinite(end) && targetTime >= start && targetTime < end;
      return { ...hora, is_current_hora: isCurrent };
    });
    return { ...data, horas };
  }

  function currentHoraFromData(data) {
    return (data?.horas || []).find((hora) => hora.is_current_hora);
  }

  async function shiftTransitGocharDate(direction) {
    const date = new Date(state.transitModal.workingDate || Date.now());
    const shifted = addDashaStep(Number.isNaN(date.getTime()) ? new Date() : date, state.transitModal.step || "Day", direction);
    state.transitModal.workingDate = shifted.toISOString();
    await loadTransitGochar();
  }

  async function loadDashaLevel(pathValue = "") {
    const isSearchSource = isSearchKundaliTool("nakshatra-naadi");
    const sourceView = dashaSourceView();
    const jatakId = sourceView.jatakId;
    if (!jatakId || sourceView.dasha.loading) return;
    const path = parseDashaPath(pathValue);
    setDashaSourceState(isSearchSource, jatakId, {
      loading: true,
      error: "",
      errorKey: "",
    });
    render();

    try {
      const query = path.length ? `/children?path=${encodeURIComponent(path.join(","))}` : "";
      const data = await getJson(`/jatak/${encodeURIComponent(jatakId)}/dasha/vimshottari${query}`, "dasha.loadError");
      setDashaSourceState(isSearchSource, jatakId, {
        level: dashaLevelFromPath(path),
        path,
        data,
        activePath: await resolveActiveDashaPath(data, dashaWorkingDate()),
        loading: false,
        error: "",
        errorKey: "",
      });
    } catch (error) {
      setDashaSourceState(isSearchSource, jatakId, {
        level: dashaLevelFromPath(path),
        path,
        loading: false,
        error: error.message || t("dasha.loadError"),
        errorKey: error.messageKey || "dasha.loadError",
      });
    }
    render();
  }

  function setDashaSourceState(isSearchSource, jatakId, patch) {
    if (isSearchSource) {
      if (String(state.searchKundali.selected?.jatakId || "") !== String(jatakId || "")) return;
      state.searchKundali.selected = {
        ...state.searchKundali.selected,
        dasha: {
          ...(state.searchKundali.selected.dasha || defaultDashaState()),
          ...patch,
        },
      };
      return;
    }
    state.jatakView = {
      ...state.jatakView,
      dasha: {
        ...(state.jatakView.dasha || defaultDashaState()),
        ...patch,
      },
    };
  }

  function goBackDasha() {
    const path = dashaSourceView().dasha.path || [];
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
    const sourceView = dashaSourceView();
    const current = dashaWorkingDate();
    const shifted = addDashaStep(current, sourceView.dasha.step || "Hour", direction);
    await updateDashaWorkingDate(shifted);
  }

  async function setDashaCurrentDate() {
    await updateDashaWorkingDate(new Date());
  }

  async function showCurrentDasha() {
    const sourceView = dashaSourceView();
    sourceView.dasha = {
      ...sourceView.dasha,
      workingDate: new Date().toISOString(),
    };
    await loadDashaLevel("");
  }

  async function updateDashaWorkingDate(date) {
    if (!date || Number.isNaN(date.getTime())) return;
    const sourceView = dashaSourceView();
    sourceView.dasha = {
      ...sourceView.dasha,
      workingDate: date.toISOString(),
      activePath: await resolveActiveDashaPath(sourceView.dasha.data, date),
    };
    render();
  }

  function initBtrWorkingDate() {
    const birthDate = btrBirthDateTime();
    state.jatakView.btr = {
      ...(state.jatakView.btr || {}),
      workingDate: birthDate ? birthDate.toISOString() : "",
      step: state.jatakView.btr?.step || "Month",
    };
  }

  function btrWorkingDate() {
    const existing = new Date(state.jatakView.btr?.workingDate || "");
    if (!Number.isNaN(existing.getTime())) return existing;
    const birthDate = btrBirthDateTime();
    return birthDate || new Date();
  }

  function btrBirthDateTime() {
    const details = state.jatakView.birthDetails || {};
    const rawDate = details.date || formatDisplayDateOnly(state.jatakView.dateTimeLabel);
    const labelTimeMatch = String(state.jatakView.dateTimeLabel || "").match(/\b(\d{1,2}:\d{2}(?::\d{2})?)\b/);
    const rawTime = details.time || (labelTimeMatch ? labelTimeMatch[1] : "") || formatTimeWithSeconds(state.jatakView.dateTimeLabel) || "00:00:00";
    const isoDate = panchangApiDateFromJatakDate(rawDate);
    if (!isoDate) return null;
    const match = String(rawTime).match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?/);
    const [year, month, day] = isoDate.split("-").map(Number);
    const hour = match ? Number(match[1]) : 0;
    const minute = match ? Number(match[2]) : 0;
    const second = match && match[3] ? Number(match[3]) : 0;
    const date = new Date(year, month - 1, day, hour, minute, second);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  function btrApiDateTime(date) {
    return `${apiIsoDate(date)}T${apiTimeString(date)}`;
  }

  function formatBtrDateTime(date) {
    return `${formatDisplayDateOnly(date.toISOString())} ${apiTimeString(date)}`;
  }

  async function shiftBtrWorkingDate(direction) {
    if (state.jatakView.kundaliSection !== "btr") return;
    const shifted = addDashaStep(btrWorkingDate(), state.jatakView.btr?.step || "Month", direction);
    state.jatakView.btr = {
      ...(state.jatakView.btr || {}),
      workingDate: shifted.toISOString(),
    };
    await loadBtrCharts();
  }

  async function loadBtrCharts() {
    if (!state.jatakView.active || !state.jatakView.jatakId) return;
    const workingDate = btrWorkingDate();
    const at = btrApiDateTime(workingDate);
    state.chartHeaderChoices.d1.chart = "D1";
    state.chartHeaderChoices.d9.chart = "D9";
    state.chartRotations.d1 = null;
    state.chartRotations.d9 = null;
    state.jatakView = {
      ...state.jatakView,
      d1: null,
      d9: null,
      loading: true,
      error: "",
      errorKey: "",
    };
    render();

    const [d1Result, d9Result] = await Promise.allSettled([
      getJson(btrJatakChartUrl(state.jatakView.jatakId, "D1", at), "chart.loadError"),
      getJson(btrJatakChartUrl(state.jatakView.jatakId, "D9", at), "chart.loadError"),
    ]);

    if (d1Result.status === "fulfilled") state.jatakView.d1 = d1Result.value;
    if (d9Result.status === "fulfilled") state.jatakView.d9 = d9Result.value;
    if (d1Result.status === "rejected" || d9Result.status === "rejected") {
      const error = d1Result.reason || d9Result.reason || {};
      state.jatakView.error = error.message || t("chart.loadError");
      state.jatakView.errorKey = error.messageKey || "chart.loadError";
    }
    state.jatakView.loading = false;
    render();
  }

  function dashaWorkingDate() {
    const date = new Date(dashaSourceView().dasha?.workingDate || Date.now());
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
    const value = String(dashaSourceView().dateTimeLabel || "").trim();
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
    else if (normalized === "year" || normalized === "1 year") next.setFullYear(next.getFullYear() + amount);
    else if (normalized === "month") next.setMonth(next.getMonth() + amount);
    else if (normalized === "day") next.setDate(next.getDate() + amount);
    else if (normalized === "10 min") next.setMinutes(next.getMinutes() + 10 * amount);
    else if (normalized === "minute") next.setMinutes(next.getMinutes() + amount);
    else next.setHours(next.getHours() + amount);
    return next;
  }

  async function resolveActiveDashaPath(data, targetDate = dashaWorkingDate()) {
    const sourceView = dashaSourceView();
    let active = (data?.periods || []).find((period) => isCurrentDashaPeriod(period, targetDate));
    let path = Array.isArray(active?.path) ? active.path : [];

    while (path.length > 0 && path.length < 3) {
      try {
        const childData = await getJson(
          `/jatak/${encodeURIComponent(sourceView.jatakId)}/dasha/vimshottari/children?path=${encodeURIComponent(path.join(","))}`,
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
    return Boolean(state.headingChoice !== "header" && state.jatakView.active && state.jatakView.d1 && state.jatakView.d9 && !state.jatakView.loading && !state.jatakView.error);
  }

  function shouldShowChartLayoutButton() {
    return Boolean(
      state.settings.show_chart_layout_button === true ||
      (state.headerActiveMenu === "open-kundali" && state.headingChoice === "home" && state.jatakView.active),
    );
  }

  function shouldShowTwoDChartLayoutButton() {
    return Boolean(
      state.settings.show_2dchart_layout_button === true &&
      state.headerActiveMenu === "home" &&
      state.headingChoice === "home" &&
      !state.jatakView.active,
    );
  }

  function shouldShowJaiminiChartLayoutButton() {
    return Boolean(
      state.settings.show_jaimini_chart_layout_button === true &&
      state.headerActiveMenu === "home" &&
      state.headingChoice === "home" &&
      !state.jatakView.active,
    );
  }

  function headerTitleText() {
    return state.jatakView.active && state.jatakView.jatakName ? state.jatakView.jatakName : t("header.welcome");
  }

  function headerCenterHtml() {
    return `<img class="header-center-logo" src="./src/images/logo.jpg" alt="${t("logo.alt")}" />`;
  }

  function headerSelectedMenuLabel() {
    if (state.kundaliForm.open) return t("homeIcon.newKundali");
    if (state.openKundali.open) return t("homeIcon.openKundali");
    if (state.headerActiveMenu === "open-kundali") return t("homeIcon.openKundali");
    if (state.headerActiveMenu === "new-kundali") return t("homeIcon.newKundali");
    return t("nav.home");
  }

  function headerSelectedMenuHtml() {
    const isNewKundali = state.kundaliForm.open;
    const isOpenKundali = state.openKundali.open;
    const imageSrc = isNewKundali || state.headerActiveMenu === "new-kundali"
      ? "./src/images/create_kundali.png"
      : isOpenKundali || state.headerActiveMenu === "open-kundali"
        ? "./src/images/open_kundali.jpg"
        : "./src/images/home.png";
    return `<img src="${imageSrc}" alt="" /><strong>${headerSelectedMenuLabel()}</strong>`;
  }

  function sectionMiddleHtml() {
    if (state.headingChoice === "home" && state.jatakView.active && state.headerActiveMenu === "open-kundali") {
      return kundaliSectionPlaceholderHtml();
    }

    if (state.headingChoice === "home" && !state.jatakView.active && state.homeView === "home-placeholder") {
      return `<div class="home-section-placeholder empty"></div>`;
    }

    if (state.headingChoice === "home" && !state.jatakView.active && state.homeView === "current-gochar") {
      return currentGocharPlaceholderHtml();
    }

    if (state.headingChoice === "home" && !state.jatakView.active && state.homeView === "hora") {
      return `<div class="home-section-placeholder hora-home-placeholder">${horaHtml()}</div>`;
    }

    if (state.headingChoice === "home" && !state.jatakView.active && state.homeView === "search-kundali") {
      return searchKundaliPlaceholderHtml();
    }

    if (state.headingChoice === "home" && !state.jatakView.active && state.homeView === "notes") {
      return homeNotesPlaceholderHtml();
    }

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

  function homeNotesPlaceholderHtml() {
    const isCollapsed = state.homeNotes.sectionACollapsed;
    return `
      <div class="home-notes-placeholder ${isCollapsed ? "home-notes-placeholder-collapsed" : ""}">
        <section class="home-notes-section-a astro-notes-placeholder-right" aria-label="${t("homeNotes.leftPanel")}">
          ${isCollapsed ? homeNotesCollapseButtonHtml() : homeNotesListHtml()}
        </section>
        <section class="home-notes-section-b" aria-label="${t("homeNotes.rightPanel")}">
          ${homeNotesDetailHtml()}
        </section>
      </div>
    `;
  }

  function homeNotesCollapseButtonHtml() {
    const isCollapsed = state.homeNotes.sectionACollapsed;
    return `
      <button class="home-notes-section-toggle" data-home-notes-toggle type="button" title="${t(isCollapsed ? "searchKundali.expand" : "searchKundali.collapse")}" aria-label="${t(isCollapsed ? "searchKundali.expand" : "searchKundali.collapse")}">
        ${isCollapsed ? "&gt;" : "&lt;"}
      </button>
    `;
  }

  function homeNotesListHtml() {
    const rows = state.homeNotes.records || [];
    return `
      <div class="home-notes-list">
        ${homeNotesSearchHtml()}
        <div class="home-notes-list-body">
          ${state.homeNotes.loading ? `<div class="home-notes-status">${t("common.loading")}</div>` : ""}
          ${state.homeNotes.error ? `<div class="home-notes-status error">${escapeHtml(state.homeNotes.error)}</div>` : ""}
          ${!state.homeNotes.loading && !state.homeNotes.error && !rows.length ? `<div class="home-notes-status">${t("homeNotes.noRecords")}</div>` : ""}
          ${!state.homeNotes.loading && !state.homeNotes.error ? rows.map(homeNotesRowHtml).join("") : ""}
        </div>
        ${homeNotesPaginationHtml()}
      </div>
    `;
  }

  function homeNotesRowHtml(note) {
    const meta = homeNotesMetaText(note);
    const active = String(state.homeNotes.selectedId || "") === String(note.id || "");
    return `
      <button class="home-notes-row ${active ? "active" : ""}" data-home-note-select="${escapeHtml(note.id)}" type="button">
        <strong>${escapeHtml(astroNotesPreviewText(note.note_text || "", 100))}</strong>
        ${meta ? `<span>${escapeHtml(meta)}</span>` : ""}
        ${note.note_text ? `<div class="home-notes-html-tooltip">${formatNoteBlockHtml(note.note_text)}</div>` : ""}
      </button>
    `;
  }

  function positionHomeNoteTooltip(row) {
    const tooltip = row?.querySelector(".home-notes-html-tooltip");
    if (!row || !tooltip) return;
    tooltip.style.setProperty("--home-note-tooltip-left", "0px");
    tooltip.style.setProperty("--home-note-tooltip-top", "0px");
    tooltip.classList.add("measuring");
    const rowRect = row.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    const margin = 12;
    const preferredLeft = rowRect.right + 12;
    const fallbackLeft = rowRect.left - tooltipRect.width - 12;
    const maxLeft = window.innerWidth - tooltipRect.width - margin;
    const left = preferredLeft <= maxLeft
      ? preferredLeft
      : Math.max(margin, Math.min(fallbackLeft, maxLeft));
    const maxTop = window.innerHeight - tooltipRect.height - margin;
    const top = Math.max(margin, Math.min(rowRect.top, maxTop));
    tooltip.style.setProperty("--home-note-tooltip-left", `${Math.round(left)}px`);
    tooltip.style.setProperty("--home-note-tooltip-top", `${Math.round(top)}px`);
    tooltip.classList.remove("measuring");
  }

  function homeNotesDetailHtml() {
    const selected = selectedHomeNote();
    const isEditable = isHomeNotesEditable();
    const hasSelection = Boolean(state.homeNotes.selectedId);
    const showEditor = isEditable;
    return `
      <div class="home-notes-detail-shell">
        <div class="home-notes-detail-toolbar">
          <button data-home-notes-action="new" type="button">${t("astroNotes.addNote")}</button>
          <button data-home-notes-action="edit" type="button" ${!hasSelection || state.homeNotes.mode === "new" ? "disabled" : ""}>${t("astroNotes.edit")}</button>
          <button data-home-notes-action="delete" type="button" ${!hasSelection || state.homeNotes.mode === "new" ? "disabled" : ""}>${t("openKundali.delete")}</button>
          ${isEditable ? `<button class="primary" data-home-notes-action="save" type="button" ${state.homeNotes.saving ? "disabled" : ""}>${t(state.homeNotes.mode === "edit" ? "astroNotes.saveUpdate" : "astroNotes.saveNote")}</button>` : ""}
          ${isEditable ? `<button data-home-notes-action="cancel" type="button" ${state.homeNotes.saving ? "disabled" : ""}>${t("astroNotes.cancelEdit")}</button>` : ""}
        </div>
        <div class="home-notes-detail-content">
          <section class="home-notes-detail-chart-card">
            ${homeNotesDiamondHtml()}
          </section>
          <section class="home-notes-detail-note-card ${showEditor ? "editing" : ""}">
            ${showEditor ? homeNotesEditorHtml() : homeNotesFancyNoteHtml(selected)}
          </section>
        </div>
        ${state.homeNotes.error ? `<div class="home-notes-detail-status error">${escapeHtml(state.homeNotes.error)}</div>` : ""}
        ${state.homeNotes.message ? `<div class="home-notes-detail-status">${escapeHtml(state.homeNotes.message)}</div>` : ""}
        ${state.homeNotes.planetMenu.open ? homeNotesPlanetMenuHtml() : ""}
      </div>
    `;
  }

  function homeNotesEditorHtml() {
    return `
      <label class="home-notes-editor">
        <span>${t("astroNotes.add")}</span>
        <textarea id="homeNotesDetailText" maxlength="1000" required>${escapeHtml(state.homeNotes.noteText || "")}</textarea>
      </label>
    `;
  }

  function homeNotesFancyNoteHtml(note) {
    if (!note) {
      return `<div class="home-notes-empty-state">${t("homeNotes.placeholder")}</div>`;
    }
    const paragraphs = String(state.homeNotes.noteText || note.note_text || "")
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);
    const title = paragraphs[0] || note.note_text || t("astroNotes.note");
    const bodyParagraphs = paragraphs.length > 1 ? paragraphs.slice(1) : [];
    return `
      <article class="home-notes-fancy-note">
        <div class="home-notes-fancy-note-title">${formatNoteInlineHtml(title)}</div>
        <div class="home-notes-fancy-note-body">
          ${bodyParagraphs.length ? bodyParagraphs.map((line) => `<p>${formatNoteInlineHtml(line)}</p>`).join("") : ""}
        </div>
        <div class="home-notes-fancy-note-meta">
          <span>${escapeHtml(homeNotesMetaText(note) || "-")}</span>
        </div>
      </article>
    `;
  }

  function homeNotesDiamondHtml() {
    const slots = northDiamondHouseSlots();
    const ascSign = Number(state.homeNotes.ascSign) || 1;
    return `
      <div class="home-notes-chart-wrap">
        <svg class="astro-notes-blank-chart home-notes-chart" viewBox="0 0 100 100" preserveAspectRatio="none" role="img" aria-label="${escapeHtml(t("astroNotes.placements"))}">
          ${slots.map((slot) => {
            const signIndex = ((ascSign + slot.house - 2) % 12) + 1;
            const planets = state.homeNotes.housePlanets?.[slot.house] || [];
            return `
              <g class="astro-notes-blank-house" data-home-note-house="${slot.house}">
                <polygon points="${slot.points}"></polygon>
                <text x="${slot.labelX}" y="${slot.labelY}" data-home-note-asc-sign="${signIndex}">${signIndex}</text>
                ${homeNotesHousePlanetsHtml(slot, planets)}
              </g>
            `;
          }).join("")}
        </svg>
      </div>
    `;
  }

  function homeNotesHousePlanetsHtml(slot, planets) {
    if (!planets.length) return "";
    return planets.slice(0, 12).map((planet, index) => {
      const position = northPlanetSlot(slot.house, index);
      return `
        <text class="astro-notes-house-planets ${astroNotesPlanetColorClass(planet)}" x="${formatSvgNumber(position.x)}" y="${formatSvgNumber(position.y)}" data-home-note-remove-planet="${escapeHtml(planet)}" data-home-note-remove-house="${slot.house}">
          ${escapeHtml(shortPlanetName(planet))}
        </text>
      `;
    }).join("");
  }

  function homeNotesPlanetMenuHtml() {
    const planets = ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn", "Rahu", "Ketu", "Uranus", "Neptune", "Pluto"];
    return `
      <div class="astro-notes-planet-menu home-notes-planet-menu" style="left: ${state.homeNotes.planetMenu.x}px; top: ${state.homeNotes.planetMenu.y}px;">
        ${planets.map((planet) => `<button type="button" data-home-note-planet-option="${planet}">${escapeHtml(localizedPlanetFullName(planet))}</button>`).join("")}
      </div>
    `;
  }

  function homeNotesSearchHtml() {
    return `
      <div class="home-notes-search-bar">
        <div class="home-notes-search-top">
          <label class="home-notes-search-box">
            <span>S</span>
            <input id="homeNotesSearch" value="${escapeHtml(state.homeNotes.query || "")}" placeholder="${t("homeNotes.search")}" aria-label="${t("homeNotes.search")}" />
          </label>
          <button class="home-notes-reset-button" data-home-notes-reset type="button" title="${t("common.clear")}" aria-label="${t("common.clear")}">x</button>
          ${homeNotesCollapseButtonHtml()}
        </div>
      </div>
    `;
  }

  function homeNotesMetaText(note) {
    const parts = [];
    if (note.asc_sign) parts.push(`Asc ${note.asc_sign}`);
    if (Array.isArray(note.placements) && note.placements.length) parts.push(`${note.placements.length} placements`);
    const updatedAt = formatAstroNotesDateTime(note.updated_at || note.created_at);
    if (updatedAt) parts.push(updatedAt);
    return parts.join(" | ");
  }

  function homeNotesPaginationHtml() {
    const page = Math.max(1, Number(state.homeNotes.page) || 1);
    const totalPages = Math.max(1, Number(state.homeNotes.totalPages) || Math.ceil((state.homeNotes.totalRecords || 0) / state.homeNotes.rowsPerPage) || 1);
    const total = Number(state.homeNotes.totalRecords) || 0;
    return `
      <div class="home-notes-pagination">
        <button class="astro-notes-page-icon-button" type="button" data-home-notes-page="prev" title="${t("openKundali.previous")}" aria-label="${t("openKundali.previous")}" ${page <= 1 || state.homeNotes.loading ? "disabled" : ""}>
          &lt;
        </button>
        <span class="home-notes-page-message">
          <strong>${t("openKundali.page")} ${page} ${t("openKundali.of")} ${totalPages}</strong>
          <em>${t("openKundali.total")}:${total} ${t("openKundali.records")}</em>
        </span>
        <button class="astro-notes-page-icon-button" type="button" data-home-notes-page="next" title="${t("openKundali.next")}" aria-label="${t("openKundali.next")}" ${page >= totalPages || state.homeNotes.loading ? "disabled" : ""}>
          &gt;
        </button>
      </div>
    `;
  }

  function searchKundaliPlaceholderHtml() {
    const isCollapsed = state.searchKundali.sectionACollapsed;
    return `
      <div class="search-kundali-page ${isCollapsed ? "search-kundali-page-collapsed" : ""}">
        <section class="search-kundali-section-a" aria-label="${t("searchKundali.sectionA")}">
          <div class="search-kundali-section-a-top">
            ${isCollapsed ? "" : searchKundaliSearchBoxHtml("name")}
            ${isCollapsed ? "" : searchKundaliSearchBoxHtml("note")}
            <button class="search-kundali-section-toggle" data-search-kundali-section-toggle type="button" title="${t(isCollapsed ? "searchKundali.expand" : "searchKundali.collapse")}" aria-label="${t(isCollapsed ? "searchKundali.expand" : "searchKundali.collapse")}">
              ${isCollapsed ? "&gt;" : "&lt;"}
            </button>
          </div>
          <div class="search-kundali-section-a-bottom ${isCollapsed ? "hidden" : ""}">
            ${searchKundaliListHtml()}
          </div>
        </section>
        <section class="search-kundali-section-b" aria-label="${t("searchKundali.sectionB")}">
          ${searchKundaliPreviewHtml()}
        </section>
      </div>
    `;
  }

  function searchKundaliSearchBoxHtml(type) {
    const isNote = type === "note";
    const inputId = isNote ? "searchKundaliNoteInput" : "searchKundaliNameInput";
    const value = isNote ? state.searchKundali.noteQuery : state.searchKundali.nameQuery;
    return `
      <label class="search-kundali-field">
        <span>${t(isNote ? "searchKundali.searchNote" : "searchKundali.searchName")}</span>
        <div class="search-kundali-input-row">
          <input id="${inputId}" data-search-kundali-input="${type}" value="${escapeHtml(value)}" autocomplete="off" />
          <button class="search-kundali-clear" data-search-kundali-clear="${type}" type="button" title="${t("common.clear")}" aria-label="${t("common.clear")}">x</button>
        </div>
        ${state.searchKundali.activeSearchType === type && state.searchKundali.suggestionOpen ? searchKundaliSuggestionsHtml() : ""}
      </label>
    `;
  }

  function searchKundaliSuggestionsHtml() {
    const suggestions = state.searchKundali.suggestions || [];
    if (!suggestions.length) {
      return `<div class="search-kundali-suggestions"><div class="search-kundali-suggestion-empty">${t("openKundali.noRecords")}</div></div>`;
    }
    return `
      <div class="search-kundali-suggestions">
        ${suggestions.map((record) => {
          const id = record.jatak_id || record.id;
          return `
            <button data-search-kundali-suggestion="${escapeHtml(String(id || ""))}" type="button">
              <strong>${escapeHtml(record.jatak_full_name || "")}</strong>
              <span>${escapeHtml([record.date, record.time, record.city_name].filter(Boolean).join(" | "))}</span>
            </button>
          `;
        }).join("")}
      </div>
    `;
  }

  function searchKundaliListHtml() {
    const rows = state.searchKundali.records || [];
    return `
      <div class="search-kundali-list">
        <div class="search-kundali-list-body">
          ${state.searchKundali.loading ? `<div class="chart-state">${t("common.loading")}</div>` : ""}
          ${state.searchKundali.error ? `<div class="chart-state error">${escapeHtml(state.searchKundali.errorKey ? t(state.searchKundali.errorKey) : state.searchKundali.error)}</div>` : ""}
          ${!state.searchKundali.loading && !state.searchKundali.error && !rows.length ? `<div class="chart-state">${t("openKundali.noRecords")}</div>` : ""}
          ${!state.searchKundali.loading && !state.searchKundali.error ? rows.map(searchKundaliRecordHtml).join("") : ""}
        </div>
        ${searchKundaliPaginationHtml()}
      </div>
    `;
  }

  function searchKundaliRecordHtml(record) {
    const name = record.jatak_full_name || record.name || "-";
    const date = record.date || "-";
    const time = record.time || "-";
    const city = record.city_name || record.city || "-";
    const note = record.note1 || "";
    const id = record.jatak_id || record.id || "";
    return `
      <article class="search-kundali-record ${note ? "has-note" : ""}">
        <button class="search-kundali-name-link" data-search-kundali-record="${escapeHtml(String(id))}" type="button">${escapeHtml(name)}</button>
        <i>|</i>
        <span>${escapeHtml(date)} ${escapeHtml(time)}</span>
        <i>|</i>
        <em>${escapeHtml(city)}</em>
        ${note ? `<div class="search-kundali-note-tooltip">${formatNoteBlockHtml(note)}</div>` : ""}
      </article>
    `;
  }

  function searchKundaliPaginationHtml() {
    const total = Number(state.searchKundali.totalRecords) || 0;
    const totalPages = Math.max(1, Number(state.searchKundali.totalPages) || Math.ceil(total / state.searchKundali.rowsPerPage));
    const page = Math.min(Math.max(1, Number(state.searchKundali.page) || 1), totalPages);
    return `
      <div class="search-kundali-pagination">
        <button class="search-kundali-page-button" data-search-kundali-page="-1" type="button" title="${t("openKundali.previous")}" aria-label="${t("openKundali.previous")}" ${page <= 1 ? "disabled" : ""}>&lt;</button>
        <strong>${t("openKundali.page")} ${page} ${t("openKundali.of")} ${totalPages}</strong>
        <span>${t("openKundali.total")}:${total} ${t("openKundali.records")}</span>
        <button class="search-kundali-page-button" data-search-kundali-page="1" type="button" title="${t("openKundali.next")}" aria-label="${t("openKundali.next")}" ${page >= totalPages ? "disabled" : ""}>&gt;</button>
      </div>
    `;
  }

  function searchKundaliPreviewHtml() {
    const selected = state.searchKundali.selected || {};
    if (selected.loading) {
      return `<div class="search-kundali-preview-state chart-state">${t("chart.loading")}</div>`;
    }
    if (selected.error) {
      return `<div class="search-kundali-preview-state chart-state error">${selected.errorKey ? t(selected.errorKey) : escapeHtml(selected.error)}</div>`;
    }
    if (!selected.jatakId) {
      return `<div class="search-kundali-preview-state">${t("searchKundali.selectRecord")}</div>`;
    }
    if (state.searchKundali.activeTool === "ashtakvarga") {
      return ashtakVargaSectionHtml();
    }
    if (state.searchKundali.activeTool === "nakshatra-naadi") {
      return kundaliNakshatraNaadiSectionHtml();
    }
    if (state.searchKundali.activeTool === "jaimini-kundali") {
      return searchKundaliJaiminiPlaceholderHtml();
    }
    return `
      <div class="search-kundali-preview">
        <div class="kundali-section-charts">
          <div class="kundali-section-chart-stack">
            ${kundaliImageChartBlockForHtml(selected, "d1", selected.d1Chart || "D1")}
            ${kundaliImageChartBlockForHtml(selected, "d9", selected.d9Chart || "D9")}
          </div>
          <div class="kundali-section-details">
            <div class="kundali-section-planet-details">
              <div class="current-gochar-planet-title">${t("chart.planetaryDetail")}</div>
              <div class="current-gochar-planet-body">${savedPlanetaryDetailForHtml(selected)}</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function rightRailToolsHtml() {
    if (!(state.headingChoice === "home" && state.homeView === "search-kundali" && state.searchKundali.selected?.jatakId)) {
      return "";
    }
    return searchKundaliRightRailToolsHtml();
  }

  function searchKundaliRightRailToolsHtml() {
    const actions = [
      { key: "kundali", labelKey: "searchKundali.action.vedicKundali", image: "./src/images/kundali1.jpg" },
      { key: "jaimini-kundali", labelKey: "searchKundali.action.jaiminiKundali", image: "./src/images/jaimini.jpg" },
      { key: "ashtakvarga", labelKey: "searchKundali.action.ashtakvarga", image: "./src/images/BinduKundali.png" },
      { key: "strength", labelKey: "searchKundali.action.strength", image: "./src/images/shadbala.jpg" },
      { key: "nakshatra-naadi", labelKey: "searchKundali.action.nakshatraNaadi", image: "./src/images/nakshatra.jpg" },
      { key: "tbd2", labelKey: "searchKundali.action.tbd2", image: "./src/images/icon-kundali.svg" },
      { key: "tbd3", labelKey: "searchKundali.action.tbd3", image: "./src/images/icon-kundali.svg" },
    ];
    return `
      <div class="search-kundali-tool-drawer" aria-label="${t("searchKundali.moreTools")}">
        <div class="search-kundali-tool-dots" aria-hidden="true">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div class="search-kundali-preview-actions">
          ${actions.map((action) => `
            <div class="search-kundali-preview-action-wrap">
              <button class="search-kundali-preview-action ${(state.searchKundali.activeTool === action.key) || (!state.searchKundali.activeTool && action.key === "kundali") ? "active" : ""}" data-search-kundali-tool="${escapeHtml(action.key)}" type="button" title="${t(action.labelKey)}" aria-label="${t(action.labelKey)}">
                <img src="${escapeHtml(action.image)}" alt="" />
                <span>${t(action.labelKey)}</span>
              </button>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  }

  function searchKundaliJaiminiPlaceholderHtml() {
    const selected = state.searchKundali.selected || {};
    return `
      <div class="search-kundali-jaimini-page">
        <div class="search-kundali-jaimini-chart-stack">
          ${searchKundaliChartPickerHtml("d1", selected.d1Chart || "D1")}
          ${jaiminiImageChartForHtml(selected)}
        </div>
        ${jaiminiSideDetailsHtml(selected)}
      </div>
    `;
  }

  function jaiminiSideDetailsHtml(view) {
    const panels = [
      {
        key: "planetary",
        shortLabel: "PL",
        title: t("chart.planetaryDetail"),
        body: savedPlanetaryDetailForHtml(view),
      },
      {
        key: "jaimini",
        shortLabel: "JM",
        title: t("jaimini.detailsTitle"),
        body: jaiminiDetailTableHtml(view),
      },
    ];
    const activeKey = panels.some((panel) => panel.key === state.searchKundali.jaiminiInfoTab)
      ? state.searchKundali.jaiminiInfoTab
      : "planetary";
    const activePanel = panels.find((panel) => panel.key === activeKey) || panels[0];
    return `
      <section class="search-kundali-jaimini-details">
        <div class="jaimini-info-tabs" role="tablist" aria-label="${t("jaimini.detailsTitle")}">
          ${panels.map((panel) => `
            <button class="${panel.key === activeKey ? "active" : ""}" data-jaimini-info-tab="${panel.key}" type="button" role="tab" aria-selected="${panel.key === activeKey ? "true" : "false"}" title="${escapeHtml(panel.title)}" aria-label="${escapeHtml(panel.title)}">
              ${escapeHtml(panel.shortLabel)}
            </button>
        `).join("")}
          <span class="jaimini-info-active-label">${escapeHtml(activePanel.title)}</span>
        </div>
        <div class="current-gochar-planet-body jaimini-info-tab-body">${activePanel.body}</div>
      </section>
    `;
  }

  function jaiminiImageChartForHtml(view) {
    if (view.loading || view.jaiminiLoading) {
      return `<div class="search-kundali-jaimini-chart chart-state">${t("chart.loading")}</div>`;
    }
    if (view.error || view.jaiminiError) {
      return `<div class="search-kundali-jaimini-chart chart-state error">${view.jaiminiErrorKey ? t(view.jaiminiErrorKey) : view.errorKey ? t(view.errorKey) : escapeHtml(view.jaiminiError || view.error)}</div>`;
    }
    if (!view.jaimini) {
      return `<div class="search-kundali-jaimini-chart chart-state">${t("chart.waiting")}</div>`;
    }

    const houses = buildJaiminiChartHouses(view);
    return `
      <div class="search-kundali-jaimini-chart">
        <img src="./src/images/blank_kundali.jpg" alt="" />
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" role="img" aria-label="${t("searchKundali.action.jaiminiKundali")}">
          ${jaiminiDiamondSlots().map((slot) => {
            const house = houses[slot.house - 1] || { sign_index: "", bodies: [] };
            return `
              <g>
                ${jaiminiHouseNumberHtml(slot, house.sign_index)}
                ${jaiminiHouseBodiesHtml(slot, house.bodies)}
              </g>
            `;
          }).join("")}
        </svg>
      </div>
    `;
  }

  function jaiminiHouseNumberHtml(slot, houseNumber) {
    const position = jaiminiSignPosition(slot.house, [slot.x, slot.y]);
    return `<text class="jaimini-chart-house-number" x="${formatSvgNumber(position[0])}" y="${formatSvgNumber(position[1])}">${houseNumber || ""}</text>`;
  }

  function jaiminiHouseBodiesHtml(slot, bodies) {
    const visibleLimit = JAIMINI_CHART_LAYOUT_PLANET_SLOT_COUNT;
    const visibleBodies = bodies.slice(0, visibleLimit);
    const overflowCount = bodies.length - visibleBodies.length;
    const labels = overflowCount > 0 ? [...visibleBodies.slice(0, visibleLimit - 1), `+${overflowCount + 1}`] : visibleBodies;
    return labels
      .map((body, index) => {
        const position = jaiminiPlanetSlot(slot.house, index);
        return body?.isJaimini
          ? jaiminiPointLabelHtml(body, formatSvgNumber(position.x), formatSvgNumber(position.y))
          : northPlanetLabelHtml(body, formatSvgNumber(position.x), formatSvgNumber(position.y));
      })
      .join("");
  }

  function jaiminiPointLabelHtml(body, x, y) {
    const label = String(body?.label || body?.name || "").trim();
    const degree = planetDegreeLabel(body?.degree);
    return `
      <text class="diamond-house-body jaimini-point-label" x="${x}" y="${y}">
        <tspan>${escapeHtml(label)}</tspan>${degree ? `<tspan class="planet-degree-sup" dx="0.35" dy="-1.4">${degree}</tspan>` : ""}
      </text>
    `;
  }

  function buildJaiminiChartHouses(view) {
    const selectedChart = view.d1;
    const chartHouses = selectedChart ? buildSavedChartHouses(selectedChart) : [];
    const houses = Array.from({ length: 12 }, (_, index) => {
      const chartHouse = chartHouses[index] || {};
      return {
        house: index + 1,
        sign_index: chartHouse.sign_index || "",
        bodies: chartHouse.bodies || [],
      };
    });

    jaiminiChartOverlayItems(view, houses).forEach((item) => {
      const houseNumber = Number(item.house) || houseForSignIndexInHouses(houses, item.sign_index);
      if (!houseNumber || houseNumber < 1 || houseNumber > 12) return;
      houses[houseNumber - 1].sign_index = houses[houseNumber - 1].sign_index || item.sign_index || "";
      const degreeValue = item.degree_in_sign === "" || item.degree_in_sign === null || item.degree_in_sign === undefined
        ? NaN
        : Number(item.degree_in_sign);
      houses[houseNumber - 1].bodies.push({
        isJaimini: true,
        label: item.label,
        name: item.label,
        degree: degreeValue,
        retrograde: false,
      });
    });
    return houses;
  }

  function jaiminiChartOverlayItems(view, houses) {
    const jaimini = view.jaimini || {};
    const items = [];
    Object.values(jaimini.padas || {}).forEach((pada) => {
      items.push({
        label: pada.pada_key || "",
        sign_index: pada.sign_index || "",
        house: houseForSignIndexInHouses(houses, pada.sign_index) || pada.house || "",
        degree_in_sign: "",
      });
    });
    Object.values(jaimini.special_lagnas || {}).forEach((lagna) => {
      items.push({
        label: lagna.lagna_key || "",
        sign_index: lagna.sign_index || "",
        house: houseForSignIndexInHouses(houses, lagna.sign_index) || lagna.house || "",
        degree_in_sign: lagna.degree_in_sign ?? "",
      });
    });
    ["gulika", "mandi"].forEach((key) => {
      const value = jaimini[key];
      if (!value) return;
      items.push({
        label: t(key === "gulika" ? "jaimini.chart.gulika" : "jaimini.chart.mandi"),
        sign_index: value.sign_index || "",
        house: houseForSignIndexInHouses(houses, value.sign_index) || value.house || "",
        degree_in_sign: value.degree_in_sign ?? "",
      });
    });
    return items.filter((item) => item.label);
  }

  function jaiminiJaiminiChartItems(view) {
    const jaimini = view.jaimini || {};
    const items = [];
    Object.values(jaimini.charakarakas || {}).forEach((karaka) => {
      const placement = findPositionForPlanetKey(view, karaka.planet_key || karaka.planet_name);
      const house = placement ? houseForSignIndex(view, placement.sign_index) : null;
      items.push({
        group: "Chara Karaka",
        label: karaka.abbreviation || karaka.planet_name || karaka.planet_key || "",
        name: karaka.planet_name || karaka.planet_key || "",
        sign: placement?.sign || "",
        sign_index: placement?.sign_index || "",
        house,
        degree_in_sign: karaka.degree_in_sign ?? placement?.degree_in_sign,
      });
    });
    Object.values(jaimini.padas || {}).forEach((pada) => {
      items.push({
        group: "Pada",
        label: pada.pada_key || "",
        name: pada.name || "",
        sign: pada.sign || "",
        sign_index: pada.sign_index || "",
        house: pada.house || "",
        degree_in_sign: "",
      });
    });
    Object.values(jaimini.special_lagnas || {}).forEach((lagna) => {
      items.push({
        group: "Special Lagna",
        label: lagna.lagna_key || "",
        name: lagna.name || "",
        sign: lagna.sign || "",
        sign_index: lagna.sign_index || "",
        house: lagna.house || "",
        degree_in_sign: lagna.degree_in_sign ?? "",
      });
    });
    ["gulika", "mandi"].forEach((key) => {
      const value = jaimini[key];
      if (!value) return;
      items.push({
        group: "Special Point",
        label: key === "gulika" ? "Gul" : "Man",
        name: key === "gulika" ? "Gulika" : "Mandi",
        sign: value.sign || "",
        sign_index: value.sign_index || "",
        house: value.house || "",
        degree_in_sign: value.degree_in_sign ?? "",
      });
    });
    return items.filter((item) => item.label || item.name);
  }

  function findPositionForPlanetKey(view, planetKey) {
    const key = normalizePlanetKey(planetKey);
    const positions = Object.values(view.positions?.positions || view.positions || {});
    return positions.find((position) => normalizePlanetKey(position.name || position.body) === key) || null;
  }

  function normalizePlanetKey(value) {
    const key = String(value || "").trim().toLowerCase();
    const aliases = {
      sani: "saturn",
      shani: "saturn",
      budha: "mercury",
      mangala: "mars",
      mangal: "mars",
      guru: "jupiter",
      chandra: "moon",
      surya: "sun",
      sukra: "venus",
      shukra: "venus",
    };
    return aliases[key] || key;
  }

  function houseForSignIndex(view, signIndex) {
    const d1Houses = view.d1 ? buildSavedChartHouses(view.d1) : [];
    const house = d1Houses.find((item) => Number(item.sign_index) === Number(signIndex));
    return house?.house || "";
  }

  function houseForSignIndexInHouses(houses, signIndex) {
    const house = houses.find((item) => Number(item.sign_index) === Number(signIndex));
    return house?.house || "";
  }

  function jaiminiDetailTableHtml(view) {
    if (view.jaiminiLoading) return `<div class="chart-state">${t("chart.loading")}</div>`;
    if (view.jaiminiError) return `<div class="chart-state error">${view.jaiminiErrorKey ? t(view.jaiminiErrorKey) : escapeHtml(view.jaiminiError)}</div>`;
    const rows = jaiminiJaiminiChartItems(view).filter((row) => row.group === "Chara Karaka");
    if (!rows.length) {
      return `<div class="chart-state">${t("chart.waiting")}</div>`;
    }
    return `
      <div class="planetary-detail-table-wrap jaimini-detail-table-wrap">
        <table class="planetary-detail-table jaimini-detail-table">
          <thead>
            <tr>
              <th>${t("jaimini.type")}</th>
              <th>${t("jaimini.key")}</th>
              <th>${t("jaimini.name")}</th>
              <th>${t("planetTable.sign")}</th>
              <th>${t("chartLayout.house")}</th>
              <th>${t("planetTable.degree")}</th>
            </tr>
          </thead>
          <tbody>
            ${rows.map((row) => `
              <tr>
                <td>${escapeHtml(localizedJaiminiValue(row.group, "group"))}</td>
                <td>${escapeHtml(localizedJaiminiValue(row.label, "key"))}</td>
                <td>${escapeHtml(localizedJaiminiValue(row.name, "name"))}</td>
                <td>${row.sign_index ? localizedSignName(row.sign_index) : escapeHtml(row.sign || "-")}</td>
                <td>${row.house || "-"}</td>
                <td>${row.degree_in_sign !== "" && row.degree_in_sign !== null && row.degree_in_sign !== undefined ? formatDegreeDms(row.degree_in_sign) : "-"}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    `;
  }

  function localizedJaiminiValue(value, type = "name") {
    const text = String(value || "").trim();
    if (!text) return "-";
    const normalized = text.toLowerCase().replace(/[^a-z0-9]+/g, "");
    const translationKey = `jaimini.${type}.${normalized}`;
    const translated = t(translationKey);
    if (translated !== translationKey) return translated;
    if (type === "name") return planetDetailName(text);
    return text;
  }

  function kundaliImageChartBlockForHtml(view, chartKey, selectedChart) {
    return `
      <div class="kundali-image-chart-block">
        ${searchKundaliChartPickerHtml(chartKey, selectedChart)}
        ${kundaliImageChartForHtml(view, chartKey)}
      </div>
    `;
  }

  function searchKundaliChartPickerHtml(chartKey, selectedValue) {
    const options = kundaliSectionChartOptions();
    const selected = options.find((option) => option.value === selectedValue) || options[0];
    return `
      <details class="kundali-chart-picker chart-mini-picker chart-mini-picker-chart">
        <summary aria-label="${t("chart.selectChart")}">
          <strong>${escapeHtml(selected.label)}</strong>
          <em>${escapeHtml(selected.subLabel)}</em>
        </summary>
        <div class="chart-mini-picker-menu">
          ${options.map((option) => `
            <button class="${option.value === selectedValue ? "active" : ""}" data-search-kundali-chart-key="${chartKey}" data-search-kundali-chart-choice="${escapeHtml(option.value)}" type="button">
              <strong>${escapeHtml(option.label)}</strong>
              <span>${escapeHtml(option.subLabel)}</span>
            </button>
          `).join("")}
        </div>
      </details>
    `;
  }

  function kundaliSectionButtonsHtml() {
    return [
      ["./src/images/basic_details.png", "kundaliSection.basicDetails", "basic-details"],
      ["./src/images/kundali1.jpg", "kundaliSection.kundali", "kundali"],
      ["D", "kundaliSection.dashaSystem", "dasha-system"],
      ["KP", "kundaliSection.kpAstrology", "kp-astrology"],
      ["N", "nav.nakshatraNaadi", "nakshatra-naadi"],
      ["A", "kundaliSection.ashtakVarga", "ashtak-varga"],
      ["VT", "kundaliSection.viewTransit", "view-transit"],
      ["BTR", "kundaliSection.btr", "btr"],
    ]
      .map(([icon, labelKey, value]) => {
        if (value === "view-transit") return iconActionHtml(icon, labelKey, "", "", "view-transit");
        return iconActionHtml(icon, labelKey, "", "", `kundali-section-${value}`, state.jatakView.kundaliSection === value);
      })
      .join("");
  }

  function kundaliSectionPlaceholderHtml() {
    const key = state.jatakView.kundaliSection || "basic-details";
    if (key === "basic-details") return basicDetailsSectionHtml();
    if (key === "kundali" || key === "btr") return kundaliSectionChartsHtml();
    if (key === "nakshatra-naadi") return kundaliNakshatraNaadiSectionHtml();
    if (key === "ashtak-varga") return ashtakVargaSectionHtml();
    const labelKey = {
      "dasha-system": "kundaliSection.dashaSystem",
      "kp-astrology": "kundaliSection.kpAstrology",
      "ashtak-varga": "kundaliSection.ashtakVarga",
    }[key] || "kundaliSection.basicDetails";
    return `
      <div class="kundali-section-placeholder">
        <span>${t(labelKey)}</span>
      </div>
    `;
  }

  function ashtakVargaSectionHtml() {
    const planets = ashtakVargaPlanets();
    const selected = state.ashtakVarga.selectedPlanet || "";
    return `
      <div class="ashtak-varga-page">
        <div class="ashtak-varga-planet-strip" aria-label="${t("kundaliSection.ashtakVarga")}">
          ${planets.map((planet) => `
            <button class="ashtak-planet-button ${selected === planet.key ? "active" : ""}" data-action="ashtak-planet" data-ashtak-planet="${escapeHtml(planet.key)}" type="button" title="${escapeHtml(ashtakPlanetLabel(planet.key))}">
              <img src="${escapeHtml(planet.image)}" alt="${escapeHtml(ashtakPlanetLabel(planet.key))}" />
              <span>${escapeHtml(ashtakPlanetLabel(planet.key))}</span>
            </button>
          `).join("")}
        </div>
        <div class="ashtak-varga-workspace ${selected ? "visible" : ""}">
          ${selected ? ashtakVargaDetailHtml(selected) : `<div class="ashtak-varga-empty">${t("ashtakVarga.selectPlanet")}</div>`}
        </div>
      </div>
    `;
  }

  function ashtakVargaPlanets() {
    return [
      ["sarva", "./src/images/sarvashtakvarg.png"],
      ["sun", "./src/images/sun1.png"],
      ["moon", "./src/images/moon1.jpg"],
      ["mars", "./src/images/mars1.jpg"],
      ["mercury", "./src/images/mercury1.jpg"],
      ["jupiter", "./src/images/jupiter1.jpg"],
      ["venus", "./src/images/venus1.jpg"],
      ["saturn", "./src/images/saturn1.jpg"],
    ].map(([key, image]) => ({ key, image }));
  }

  function ashtakPlanetLabel(planetKey) {
    if (planetKey === "sarva") return t("ashtakVarga.sarvashtakVarg");
    return `${t(`ashtakVarga.planet.${planetKey}`)} ${t("ashtakVarga.ashtakSuffix")}`.trim();
  }

  function ashtakVargaDetailHtml(selectedPlanet) {
    const label = ashtakPlanetLabel(selectedPlanet);
    if (state.ashtakVarga.loading) {
      return `<div class="ashtak-varga-empty">${t("ashtakVarga.loading")}</div>`;
    }
    if (state.ashtakVarga.error) {
      return `<div class="ashtak-varga-empty error">${state.ashtakVarga.errorKey ? t(state.ashtakVarga.errorKey) : escapeHtml(state.ashtakVarga.error)}</div>`;
    }
    return `
      <div class="ashtak-varga-detail">
        <div class="ashtak-varga-kundali-placeholder">
          <div class="current-gochar-planet-title">${escapeHtml(label)} ${t("ashtakVarga.kundaliSuffix")}</div>
          ${ashtakVargaChartHtml()}
        </div>
        <div class="ashtak-varga-points-placeholder">
          <div class="current-gochar-planet-title">${t("ashtakVarga.pointsDetails")}</div>
          ${ashtakVargaPointsTableHtml(state.ashtakVarga.data, selectedPlanet)}
        </div>
      </div>
    `;
  }

  function ashtakVargaChartHtml() {
    const sourceView = ashtakVargaSourceView();
    const houses = buildSavedChartHouses(sourceView.rasi || sourceView.d1 || {});
    const pointsBySign = ashtakVargaPointsBySign(state.ashtakVarga.data);
    const slots = northDiamondSlots();
    return `
      <div class="ashtak-varga-chart-box">
        <img src="./src/images/blank_kundali.jpg" alt="" />
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" role="img" aria-label="${t("kundaliSection.ashtakVarga")}">
          ${slots.map((slot) => {
            const house = houses[slot.house - 1] || { sign_index: "" };
            const signIndex = Number(house.sign_index) || "";
            const point = signIndex ? pointsBySign.get(signIndex) : "";
            return `
              <g>
                ${northHouseNumberHtml(slot, signIndex, "ashtakVarga")}
                ${ashtakVargaPointBadgeHtml(slot.x, slot.y, point, state.ashtakVarga.selectedPlanet)}
              </g>
            `;
          }).join("")}
        </svg>
      </div>
    `;
  }

  async function loadAshtakVarga(planetKey) {
    const sourceView = ashtakVargaSourceView();
    if (!sourceView.jatakId || !planetKey) return;
    state.ashtakVarga.loading = true;
    state.ashtakVarga.error = "";
    state.ashtakVarga.errorKey = "";
    render();
    try {
      state.ashtakVarga.data = await getJson(`/jatak/${encodeURIComponent(sourceView.jatakId)}/ashtakavarga/${encodeURIComponent(planetKey)}`, "ashtakVarga.loadError");
    } catch (error) {
      state.ashtakVarga.error = error.message || t("ashtakVarga.loadError");
      state.ashtakVarga.errorKey = error.messageKey || "ashtakVarga.loadError";
    } finally {
      state.ashtakVarga.loading = false;
      render();
    }
  }

  function selectDefaultAshtakVarga() {
    state.ashtakVarga.selectedPlanet = "sarva";
    state.ashtakVarga.data = null;
    state.ashtakVarga.error = "";
    state.ashtakVarga.errorKey = "";
    render();
    loadAshtakVarga("sarva");
  }

  function ashtakVargaSourceView() {
    if (state.headingChoice === "home" && state.homeView === "search-kundali" && state.searchKundali.activeTool === "ashtakvarga") {
      return state.searchKundali.selected || {};
    }
    return state.jatakView;
  }

  function isSearchKundaliTool(toolKey) {
    return state.headingChoice === "home" && state.homeView === "search-kundali" && state.searchKundali.activeTool === toolKey;
  }

  function nakshatraNaadiSourceView() {
    return isSearchKundaliTool("nakshatra-naadi") ? (state.searchKundali.selected || {}) : state.jatakView;
  }

  function dashaSourceView() {
    const view = isSearchKundaliTool("nakshatra-naadi") ? (state.searchKundali.selected || {}) : state.jatakView;
    if (!view.dasha) view.dasha = defaultDashaState();
    return view;
  }

  function isKundaliNakshatraContext() {
    return (state.headerActiveMenu === "open-kundali" && state.jatakView.kundaliSection === "nakshatra-naadi") || isSearchKundaliTool("nakshatra-naadi");
  }

  function ashtakVargaPointsBySign(data) {
    const map = new Map();
    collectAshtakPointCandidates(data).forEach((item) => {
      const signValue = item.sign_index ?? item.sign ?? item.rashi_index ?? item.rashi ?? item.zodiac_sign_index;
      const sign = Number(signValue) || signIndexFromName(signValue);
      const value = item.total ?? item.points ?? item.point ?? item.bindu ?? item.value ?? item.score;
      if (sign >= 1 && sign <= 12 && value !== undefined && value !== null && value !== "") {
        map.set(sign, value);
      }
    });
    return map;
  }

  function collectAshtakPointCandidates(data) {
    const candidates = [];
    const visit = (value, key = "") => {
      if (Array.isArray(value)) {
        value.forEach((item) => visit(item, key));
        return;
      }
      if (!value || typeof value !== "object") return;
      const signKeys = ["sign_index", "sign", "rashi_index", "rashi", "zodiac_sign_index"];
      const pointKeys = ["total", "points", "point", "bindu", "value", "score"];
      if (signKeys.some((itemKey) => itemKey in value) && pointKeys.some((itemKey) => itemKey in value)) {
        candidates.push(value);
      }
      Object.entries(value).forEach(([childKey, childValue]) => {
        const numericKey = Number(childKey);
        if (numericKey >= 1 && numericKey <= 12 && childValue && typeof childValue === "object") {
          candidates.push({ sign_index: numericKey, ...childValue });
        } else if (numericKey >= 1 && numericKey <= 12 && childValue !== null && childValue !== undefined && typeof childValue !== "object") {
          candidates.push({ sign_index: numericKey, points: childValue });
        }
        visit(childValue, childKey);
      });
    };
    visit(data);
    return candidates;
  }

  function ashtakVargaJsonTilesHtml(data) {
    if (!data) return `<div class="ashtak-varga-empty">${t("ashtakVarga.noData")}</div>`;
    const rows = flattenJsonForTiles(data).slice(0, 80);
    return `
      <div class="ashtak-varga-json-tiles">
        ${rows.map(([key, value]) => `
          <div class="ashtak-varga-json-tile">
            <span>${escapeHtml(key)}</span>
            <strong>${escapeHtml(formatJsonTileValue(value))}</strong>
          </div>
        `).join("")}
      </div>
    `;
  }

  function ashtakVargaPointsTableHtml(data, selectedPlanet) {
    const rows = ashtakVargaTableRows(data, selectedPlanet);
    if (!rows.length) return ashtakVargaJsonTilesHtml(data);
    return `
      <div class="ashtak-varga-table-wrap">
        <table class="ashtak-varga-sign-table">
          <thead>
            <tr>
              <th>${t("ashtakVarga.planets")}</th>
              ${Array.from({ length: 12 }, (_, index) => `<th>${escapeHtml(localizedSignName(index + 1))}</th>`).join("")}
            </tr>
          </thead>
          <tbody>
            ${rows.map((row) => `
              <tr>
                <th>${escapeHtml(ashtakVargaTablePlanetLabel(row.planet))}</th>
                ${Array.from({ length: 12 }, (_, index) => {
                  const value = row.points.get(index + 1);
                  return `<td class="${ashtakVargaPointClass(value, row.planet)}">${value === undefined || value === null || value === "" ? "-" : escapeHtml(String(value))}</td>`;
                }).join("")}
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    `;
  }

  function ashtakVargaTableRows(data, selectedPlanet) {
    const rowMap = new Map();
    collectAshtakTableCandidates(data).forEach((item) => {
      const planet = normalizedPlanetKey(item.planet || item.name || item.body || item.graha || item.lord || selectedPlanet);
      if (!planet) return;
      const signValue = item.sign_index ?? item.sign ?? item.rashi_index ?? item.rashi ?? item.zodiac_sign_index;
      const sign = Number(signValue) || signIndexFromName(signValue);
      const value = item.total ?? item.points ?? item.point ?? item.bindu ?? item.value ?? item.score;
      if (!(sign >= 1 && sign <= 12) || value === undefined || value === null || value === "") return;
      if (!rowMap.has(planet)) rowMap.set(planet, new Map());
      rowMap.get(planet).set(sign, value);
    });

    if (!rowMap.size) {
      const pointsBySign = ashtakVargaPointsBySign(data);
      if (pointsBySign.size) rowMap.set(selectedPlanet, pointsBySign);
    }

    const order = ashtakVargaPlanets().map((planet) => planet.key);
    return [...rowMap.entries()]
      .sort(([first], [second]) => {
        const firstIndex = order.indexOf(first);
        const secondIndex = order.indexOf(second);
        return (firstIndex === -1 ? 99 : firstIndex) - (secondIndex === -1 ? 99 : secondIndex);
      })
      .map(([planet, points]) => ({ planet, points }));
  }

  function ashtakVargaTablePlanetLabel(planetKey) {
    return planetKey === "sarva" ? t("ashtakVarga.sarvashtakVarg") : localizedPlanetFullName(planetKey);
  }

  function collectAshtakTableCandidates(data) {
    const candidates = [];
    const visit = (value, inheritedPlanet = "") => {
      if (Array.isArray(value)) {
        value.forEach((item) => visit(item, inheritedPlanet));
        return;
      }
      if (!value || typeof value !== "object") return;

      const directPlanet = value.planet || value.name || value.body || value.graha || value.lord || inheritedPlanet;
      const signKeys = ["sign_index", "sign", "rashi_index", "rashi", "zodiac_sign_index"];
      const pointKeys = ["total", "points", "point", "bindu", "value", "score"];
      if (directPlanet && signKeys.some((itemKey) => itemKey in value) && pointKeys.some((itemKey) => itemKey in value)) {
        candidates.push({ planet: directPlanet, ...value });
      }

      Object.entries(value).forEach(([childKey, childValue]) => {
        const planetFromKey = normalizedPlanetKey(childKey) || inheritedPlanet;
        const numericKey = Number(childKey);
        if (directPlanet && numericKey >= 1 && numericKey <= 12 && childValue !== null && childValue !== undefined && typeof childValue !== "object") {
          candidates.push({ planet: directPlanet, sign_index: numericKey, points: childValue });
        } else if (planetFromKey && childValue && typeof childValue === "object") {
          Object.entries(childValue).forEach(([signKey, signValue]) => {
            const sign = Number(signKey) || signIndexFromName(signKey);
            if (sign >= 1 && sign <= 12 && signValue !== null && signValue !== undefined && typeof signValue !== "object") {
              candidates.push({ planet: planetFromKey, sign_index: sign, points: signValue });
            }
          });
        }
        visit(childValue, planetFromKey);
      });
    };
    visit(data);
    return candidates;
  }

  function ashtakVargaPointClass(value, ashtakType = state.ashtakVarga.selectedPlanet) {
    const point = Number(value);
    if (!Number.isFinite(point)) return "";
    if (ashtakType === "sarva") {
      if (point <= 23) return "ashtak-point-low";
      if (point <= 30) return "ashtak-point-mid";
      return "ashtak-point-high";
    }
    if (point <= 3) return "ashtak-point-low";
    if (point === 4) return "ashtak-point-mid";
    return "ashtak-point-high";
  }

  function ashtakVargaPointBadgeHtml(x, y, value, ashtakType = state.ashtakVarga.selectedPlanet) {
    if (value === "" || value === undefined || value === null) {
      return `<text class="ashtak-varga-point-empty" x="${formatSvgNumber(x)}" y="${formatSvgNumber(y)}">-</text>`;
    }
    const className = ashtakVargaPointClass(value, ashtakType);
    return `
      <g class="ashtak-varga-point-badge ${className}">
        <circle cx="${formatSvgNumber(x)}" cy="${formatSvgNumber(y)}" r="3.15"></circle>
        <text x="${formatSvgNumber(x)}" y="${formatSvgNumber(y)}">${escapeHtml(String(value))}</text>
      </g>
    `;
  }

  function flattenJsonForTiles(value, prefix = "") {
    if (value === null || value === undefined) return [[prefix || "value", "-"]];
    if (typeof value !== "object") return [[prefix || "value", value]];
    if (Array.isArray(value)) {
      return value.flatMap((item, index) => flattenJsonForTiles(item, `${prefix}[${index + 1}]`));
    }
    return Object.entries(value).flatMap(([key, child]) => flattenJsonForTiles(child, prefix ? `${prefix}.${key}` : key));
  }

  function formatJsonTileValue(value) {
    if (value === null || value === undefined || value === "") return "-";
    if (typeof value === "object") return JSON.stringify(value);
    return String(value);
  }

  function basicDetailsSectionHtml() {
    if (state.jatakView.birthDetailsLoading) {
      return `<div class="basic-details-section"><div class="chart-state">${basicDetailsText("basicDetails.loading")}</div></div>`;
    }
    if (state.jatakView.birthDetailsError && !state.jatakView.birthDetails) {
      return `<div class="basic-details-section"><div class="chart-state error">${state.jatakView.birthDetailsErrorKey ? basicDetailsText(state.jatakView.birthDetailsErrorKey) : state.jatakView.birthDetailsError}</div></div>`;
    }

    const details = state.jatakView.birthDetails || {};
    const items = [
      ["basicDetails.jatakId", details.id || details.jatak_id || state.jatakView.jatakId],
      ["kundali.fullName", details.jatak_full_name || state.jatakView.jatakName],
      ["kundali.date", details.date || formatDisplayDateOnly(state.jatakView.dateTimeLabel)],
      ["kundali.time", details.time || ""],
      ["kundali.gender", details.gender || ""],
      ["kundali.city", details.city_name || details.city || ""],
      ["kundali.state", details.state_name || details.state || ""],
      ["kundali.country", details.country_name || details.country || ""],
      ["kundali.latitude", details.latitude || ""],
      ["kundali.longitude", details.longitude || ""],
      ["kundali.timezone", details.timezone || ""],
      ["basicDetails.createdBy", details.create_by || details.created_by || ""],
      ["kundali.note", details.note1 || details.note || "", "note"],
    ].filter(([, value]) => String(value ?? "").trim());

    return `
      <div class="basic-details-section">
        <div class="basic-details-title">${basicDetailsText("basicDetails.title")}</div>
        <div class="basic-details-tiles">
          ${items.map(([labelKey, value, tileType]) => `
            <div class="basic-detail-tile ${tileType === "note" ? "note-tile" : ""}">
              <span>${basicDetailsText(labelKey)}</span>
              <strong>${escapeHtml(value)}</strong>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  }

  function basicDetailsText(key) {
    const labels = {
      en: {
        "basicDetails.title": "Jatak Details",
        "basicDetails.jatakId": "Jatak ID",
        "basicDetails.createdBy": "Created By",
        "basicDetails.loading": "Loading Jatak details...",
        "basicDetails.loadError": "Unable to load Jatak details.",
      },
      mr: {
        "basicDetails.title": "जाटक तपशील",
        "basicDetails.jatakId": "जाटक आयडी",
        "basicDetails.createdBy": "तयार करणारे",
        "basicDetails.loading": "जाटक तपशील लोड होत आहेत...",
        "basicDetails.loadError": "जाटक तपशील लोड करता आले नाहीत.",
      },
    };
    return labels[state.language]?.[key] || t(key);
  }

  function kundaliSectionChartsHtml() {
    const topChart = state.chartHeaderChoices.d1.chart || "D1";
    const bottomChart = state.chartHeaderChoices.d9.chart || "D9";
    const isBtr = state.jatakView.kundaliSection === "btr";
    return `
      <div class="kundali-section-charts">
        <div class="kundali-section-chart-stack">
          ${kundaliImageChartBlockHtml("d1", topChart, isBtr)}
          ${kundaliImageChartBlockHtml("d9", bottomChart, isBtr)}
        </div>
        <div class="kundali-section-details">
          <div class="kundali-section-planet-details">
            <div class="current-gochar-planet-title">${t("chart.planetaryDetail")}</div>
            <div class="current-gochar-planet-body">${savedPlanetaryDetailHtml()}</div>
          </div>
          ${isBtr ? btrTimingControlsHtml() : ""}
        </div>
      </div>
    `;
  }

  function btrTimingControlsHtml() {
    const options = ["Month", "Day", "Hour", "10 Min", "Minute"];
    const birthDateTime = btrBirthDateTime();
    const workingDateTime = btrWorkingDate();
    const selectedStep = state.jatakView.btr?.step || "Month";
    return `
      <div class="btr-timing-panel">
        <div class="btr-date-stack">
          <div>
            <span>${t("btr.dob")}</span>
            <strong>${escapeHtml(birthDateTime ? formatBtrDateTime(birthDateTime) : "-")}</strong>
          </div>
          <div>
            <span>${t("dasha.workingDate")}</span>
            <strong>${escapeHtml(formatBtrDateTime(workingDateTime))}</strong>
          </div>
        </div>
        <div class="dasha-time-options btr-time-options">
          ${options
            .map(
              (option) => `
                <label>
                  <input type="radio" name="btrTimeStep" value="${escapeHtml(option)}" ${option === selectedStep ? "checked" : ""} />
                  <span>${escapeHtml(option)}</span>
                </label>
              `,
            )
            .join("")}
        </div>
        <div class="dasha-step-buttons btr-step-buttons">
          <button data-btr-shift="-1" type="button">-</button>
          <button data-btr-shift="1" type="button">+</button>
        </div>
      </div>
    `;
  }

  function kundaliNakshatraNaadiSectionHtml() {
    const sourceView = nakshatraNaadiSourceView();
    const topChart = state.chartHeaderChoices.d1.chart || "D1";
    const bottomChart = state.chartHeaderChoices.d9.chart || "CHALIT";
    return `
      <div class="kundali-nakshatra-section">
        <div class="kundali-nakshatra-chart">
          ${kundaliNakshatraChartBlockHtml(sourceView, "d1", topChart)}
          ${kundaliNakshatraChartBlockHtml(sourceView, "d9", bottomChart)}
        </div>
        <div class="kundali-nakshatra-content">
          ${nakshatraNaadiHtml()}
        </div>
      </div>
    `;
  }

  function kundaliNakshatraChartBlockHtml(view, chartKey, selectedChart) {
    return `
      <div class="kundali-image-chart-block">
        ${kundaliChartPickerHtml(chartKey, selectedChart, true)}
        ${kundaliImageChartForHtml(view, chartKey)}
      </div>
    `;
  }

  function kundaliImageChartBlockHtml(chartKey, selectedChart, pickerDisabled = false) {
    return `
      <div class="kundali-image-chart-block">
        ${kundaliChartPickerHtml(chartKey, selectedChart, pickerDisabled)}
        ${kundaliImageChartHtml(chartKey)}
      </div>
    `;
  }

  function kundaliJatakSummaryHtml() {
    return kundaliJatakSummaryForHtml(state.jatakView);
  }

  function kundaliJatakSummaryForHtml(view) {
    const details = view.birthDetails || {};
    const dateTimeLabel = view.dateTimeLabel || "";
    const parts = [
      [t("kundali.fullName"), details.jatak_full_name || view.jatakName || "-"],
      [t("kundali.date"), details.date || formatDisplayDateOnly(dateTimeLabel) || "-"],
      [t("kundali.time"), details.time || formatTimeWithSeconds(dateTimeLabel) || "-"],
      [t("kundali.city"), details.city_name || details.city || "-"],
    ];
    return parts
      .map(([label, value]) => `<b>${escapeHtml(label)}:</b> ${escapeHtml(value)}`)
      .join(" | ");
  }

  function kundaliChartPickerHtml(chartKey, selectedValue, disabled = false) {
    const options = kundaliSectionChartOptions();
    const selected = options.find((option) => option.value === selectedValue) || options[0];
    if (disabled) {
      return `
        <div class="kundali-chart-picker chart-mini-picker chart-mini-picker-chart chart-mini-picker-disabled" style="width:128px;min-width:128px;height:20px;min-height:20px;padding:1px 10px;line-height:1;">
          <strong style="font-size:10px;line-height:1;">${escapeHtml(selected.label)}</strong>
          <em style="font-size:7px;line-height:1;">${escapeHtml(selected.subLabel)}</em>
        </div>
      `;
    }
    return `
      <details class="kundali-chart-picker chart-mini-picker chart-mini-picker-chart">
        <summary aria-label="${t("chart.selectChart")}">
          <strong>${escapeHtml(selected.label)}</strong>
          <em>${escapeHtml(selected.subLabel)}</em>
        </summary>
        <div class="chart-mini-picker-menu">
          ${options.map((option) => `
            <button class="${option.value === selectedValue ? "active" : ""}" data-chart-key="${chartKey}" data-chart-choice="${escapeHtml(option.value)}" type="button">
              <strong>${escapeHtml(option.label)}</strong>
              <span>${escapeHtml(option.subLabel)}</span>
            </button>
          `).join("")}
        </div>
      </details>
    `;
  }

  function kundaliSectionChartOptions() {
    return [
      { value: "D1", label: "Birth Chart", subLabel: "D1 - Body, Physical Matters and all General Matters" },
      { value: "CHALIT", label: "Chalit Chart", subLabel: "Chalit - Body, Physical Matters and all General Matters" },
      { value: "D2", label: "Hora Chart", subLabel: "D2 - Wealth, Family" },
      { value: "D3", label: "Dreshkan Chart", subLabel: "D3 - Siblings, Nature" },
      { value: "D4", label: "Chathurthamsha Chart", subLabel: "D4 - Fortune and Property" },
      { value: "D5", label: "Panchmansha Chart", subLabel: "D5 - Fame and Power" },
      { value: "D7", label: "Saptamansha Chart", subLabel: "D7 - Children/Progeny" },
      { value: "D8", label: "Ashtamansha Chart", subLabel: "D8 - Unexpected Troubles" },
      { value: "D9", label: "Navamansha Chart", subLabel: "D9 - Wife, Dharma and Relationships" },
      { value: "D10", label: "Dashamansha Chart", subLabel: "D10 - Actions in Society, Profession" },
      { value: "D12", label: "Dwadashamsha Chart", subLabel: "D12 - Parents" },
      { value: "D16", label: "Shodashamsha Chart", subLabel: "D16 - Vehicles, Travelling and Comforts" },
      { value: "D20", label: "Vishamansha Chart", subLabel: "D20 - Spiritual Pursuits" },
      { value: "D24", label: "Chaturvimshamsha Chart", subLabel: "D24 - Education, Learning and Knowledge" },
      { value: "D27", label: "Bhamsha Chart", subLabel: "D27 - Strengths and Weakness" },
      { value: "D30", label: "Trishamansha Chart", subLabel: "D30 - Evils, Failure, Bad Luck" },
      { value: "D40", label: "Khavedamsha Chart", subLabel: "D40 - Maternal Legacy" },
      { value: "D45", label: "Akshvedansha Chart", subLabel: "D45 - Paternal Legacy" },
      { value: "D60", label: "Shashtymsha Chart", subLabel: "D60 - Past birth or Karma" },
    ];
  }

  function kundaliImageChartHtml(chartKey) {
    return kundaliImageChartForHtml(state.jatakView, chartKey);
  }

  function kundaliImageChartForHtml(view, chartKey) {
    if (view.loading || view[`${chartKey}Loading`]) {
      return `<div class="kundali-image-chart chart-state">${t("chart.loading")}</div>`;
    }
    if (view.error) {
      return `<div class="kundali-image-chart chart-state error">${view.errorKey ? t(view.errorKey) : escapeHtml(view.error)}</div>`;
    }

    const chart = view[chartKey];
    if (!chart) {
      return `<div class="kundali-image-chart chart-state">${t("chart.waiting")}</div>`;
    }

    const houses = buildSavedChartHouses(chart);
    const slots = northDiamondSlots();
    return `
      <div class="kundali-image-chart">
        <img src="./src/images/blank_kundali.jpg" alt="" />
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" role="img" aria-label="${t("kundaliSection.kundali")}">
          ${slots.map((slot) => {
            const house = houses[slot.house - 1] || { sign_index: "", bodies: [] };
            return `
              <g>
                ${northHouseNumberHtml(slot, house.sign_index, chartKey)}
                ${northHouseBodiesHtml(slot, house.bodies)}
              </g>
            `;
          }).join("")}
        </svg>
      </div>
    `;
  }

  function kundaliBirthInfoTileHtml() {
    const details = state.jatakView.birthDetails || {};
    const dateTime = `${details.date || formatDisplayDateOnly(state.jatakView.dateTimeLabel) || ""} ${details.time || ""}`.trim();
    return `
      <div class="current-gochar-info-tile kundali-birth-info-tile">
        <div>
          <span>${t("gocharInfo.date")}</span>
          <strong>${escapeHtml(details.date || formatDisplayDateOnly(dateTime) || "-")}</strong>
        </div>
        <div>
          <span>${t("gocharInfo.time")}</span>
          <strong>${escapeHtml(details.time || formatTimeWithSeconds(dateTime) || "-")}</strong>
        </div>
        <div>
          <span>${t("gocharInfo.place")}</span>
          <strong>${escapeHtml(`${displayValue(details.latitude)}, ${displayValue(details.longitude)}`)}</strong>
        </div>
        <div>
          <span>${t("gocharInfo.timezone")}</span>
          <strong>${escapeHtml(displayValue(details.timezone))}</strong>
        </div>
      </div>
    `;
  }

  function rightPanelTitleHtml() {
    if (state.headingChoice !== "header" && state.jatakView.active && state.jatakView.rightView === "panchang") return t("panchang.title");
    if (state.headingChoice !== "header") return !state.jatakView.active && state.homeView === "hora" ? t("homeIcon.hora") : t("chart.planetaryDetail");
    return state.naadiView === "nakshatra" ? t("nav.nakshatraNaadi") : t("cusp.title");
  }

  function rightPanelBodyHtml() {
    if (state.headingChoice !== "header" && state.jatakView.active && state.jatakView.rightView === "panchang") return jatakPanchangHtml();
    if (state.headingChoice !== "header") return !state.jatakView.active && state.homeView === "hora" ? horaHtml() : planetaryDetailHtml();
    return state.naadiView === "nakshatra" ? nakshatraNaadiHtml() : cuspDetailHtml();
  }

  function headerMenuHtml() {
    if (!state.headerMenuOpen) return "";
    return `
      <div class="header-menu-panel" role="menu">
        <button type="button" data-header-menu-action="home" role="menuitem">
          <img src="./src/images/home.png" alt="" />
          <strong>${t("nav.home")}</strong>
        </button>
        <button type="button" data-header-menu-action="new-kundali" role="menuitem">
          <img src="./src/images/create_kundali.png" alt="" />
          <strong>${t("homeIcon.newKundali")}</strong>
        </button>
        <button type="button" data-header-menu-action="open-kundali" role="menuitem">
          <img src="./src/images/open_kundali.jpg" alt="" />
          <strong>${t("homeIcon.openKundali")}</strong>
        </button>
      </div>
    `;
  }

  function leftRailMenuHtml() {
    if (state.headingChoice !== "home") return "";
    return `
      <div class="left-rail-menu">
        <button class="left-rail-menu-button" id="leftRailMenuButton" type="button" aria-label="Menu">&#8942;</button>
        <div class="left-rail-menu-panel">
          <div class="left-rail-menu-item">
            <button type="button" data-planets-modal="true">Planets</button>
          </div>
          <div class="left-rail-menu-item">
            <button type="button" data-panchang-info-modal="true">${t("panchang.title")}</button>
          </div>
          <div class="left-rail-menu-item">
            <button type="button" data-astro-notes-modal="true">${t("astroNotes.title")}</button>
          </div>
        </div>
      </div>
    `;
  }

  function astroNotesModalHtml() {
    const isViewMode = state.astroNotes.mode === "view";
    const isSearchMode = state.astroNotes.mode === "search";
    const isEditingView = isViewMode && state.astroNotes.editing === true;
    const showEditor = !isSearchMode;
    return `
      <div class="modal-backdrop">
        <section class="kundali-modal astro-notes-modal" role="dialog" aria-modal="true" aria-label="${t("astroNotes.title")}">
          <div class="kundali-modal-header">
            <h2>${t("astroNotes.title")}</h2>
            <button class="modal-close-button" id="closeAstroNotesModal" type="button" aria-label="${t("common.close")}">x</button>
          </div>
          <div class="astro-notes-placeholder-shell">
            <div class="astro-notes-placeholder">
              <section class="astro-notes-placeholder-left" aria-label="${t("astroNotes.leftPanel")}">
                <div class="astro-notes-new-actions" aria-label="${t("astroNotes.actions")}">
                  <button class="astro-notes-icon-action ${state.astroNotes.mode === "new" ? "active" : ""}" type="button" data-astro-notes-mode="new" aria-pressed="${state.astroNotes.mode === "new" ? "true" : "false"}">
                    <span>A</span>
                    <strong>${t("astroNotes.addNote")}</strong>
                  </button>
                  <button class="astro-notes-icon-action ${isViewMode ? "active" : ""}" type="button" data-astro-notes-mode="view" aria-pressed="${isViewMode ? "true" : "false"}">
                    <span>V</span>
                    <strong>${t("astroNotes.viewNotes")}</strong>
                  </button>
                  <button class="astro-notes-icon-action ${isSearchMode ? "active" : ""}" type="button" data-astro-notes-mode="search" aria-pressed="${isSearchMode ? "true" : "false"}">
                    <span>S</span>
                    <strong>${t("astroNotes.searchNotes")}</strong>
                  </button>
                </div>
                ${astroNotesBlankDiamondHtml()}
              </section>
              <section class="astro-notes-placeholder-right" aria-label="${t("astroNotes.rightPanel")}">
                ${isSearchMode ? `
                  <div class="astro-notes-new-search">
                    <span class="astro-notes-search-icon">S</span>
                    <input id="astroNotesSearch" value="${escapeHtml(state.astroNotes.query)}" placeholder="${t("astroNotes.searchPlaceholder")}" />
                    <span class="astro-notes-filter-separator">/</span>
                    ${astroNotesPlacementFiltersHtml()}
                    <div class="astro-notes-search-toggle" role="group" aria-label="${t("astroNotes.searchMode")}">
                      <button class="${state.astroNotes.searchBy === "notes" ? "active" : ""}" type="button" data-astro-notes-search-by="notes">${t("astroNotes.byNotes")}</button>
                      <button class="${state.astroNotes.searchBy === "placements" ? "active" : ""}" type="button" data-astro-notes-search-by="placements">${t("astroNotes.byPlacements")}</button>
                    </div>
                    ${astroNotesSearchSuggestionsHtml()}
                  </div>
                ` : ""}
                ${showEditor ? `
                  <label class="astro-notes-note-field ${["new", "view"].includes(state.astroNotes.mode) ? "add-mode" : ""}">
                    <div class="astro-notes-note-heading">
                      <span>${t("astroNotes.add")}</span>
                      ${state.astroNotes.mode === "new" ? `
                        <button id="astroNotesChartSave" class="astro-notes-save-icon-button" type="button" title="${t("astroNotes.saveNote")}" aria-label="${t("astroNotes.saveNote")}" ${state.astroNotes.saving || isViewMode ? "disabled" : ""}>
                          <img src="src/images/icon-save.svg" alt="" />
                        </button>
                      ` : ""}
                      ${isViewMode ? `
                        <span class="astro-notes-heading-actions">
                          ${isEditingView ? `
                            <button id="astroNotesUpdateSave" class="astro-notes-save-icon-button" type="button" title="${t("astroNotes.saveUpdate")}" aria-label="${t("astroNotes.saveUpdate")}" ${state.astroNotes.saving || !state.astroNotes.selectedId ? "disabled" : ""}>
                              <img src="src/images/icon-save.svg" alt="" />
                            </button>
                          ` : ""}
                          <button id="astroNotesEditKundaliNote" class="astro-notes-edit-button" type="button" ${state.astroNotes.saving || !state.astroNotes.selectedId ? "disabled" : ""}>
                            ${isEditingView ? t("astroNotes.cancelEdit") : t("astroNotes.edit")}
                          </button>
                        </span>
                      ` : ""}
                    </div>
                    <textarea id="astroNotesNoteText" maxlength="1000" required ${isViewMode && !isEditingView ? "readonly" : ""}>${escapeHtml(state.astroNotes.noteText)}</textarea>
                    ${state.astroNotes.mode === "new" || isViewMode ? `
                      <strong class="astro-notes-save-status ${state.astroNotes.error ? "error" : ""}">
                        ${escapeHtml(state.astroNotes.error || state.astroNotes.message || "")}
                      </strong>
                    ` : ""}
                  </label>
                ` : astroNotesInlineTableHtml()}
              </section>
            </div>
            ${state.astroNotes.planetMenu.open ? astroNotesPlanetMenuHtml() : ""}
          </div>
        </section>
      </div>
    `;
  }

  function astroNotesViewHtml() {
    const total = Number(state.astroNotes.totalRecords) || 0;
    const totalPages = Math.max(1, Math.ceil(total / state.astroNotes.rowsPerPage));
    const rows = state.astroNotes.records || [];
    const pageMessage = astroNotesPageMessage(state.astroNotes.page, totalPages, total);
    return `
      <div class="astro-notes-view-page">
        <section class="astro-notes-view-left" aria-label="${t("astroNotes.searchAndRecords")}">
          <div class="astro-notes-view-search">
            <input id="astroNotesSearch" value="${escapeHtml(state.astroNotes.query)}" placeholder="${t("astroNotes.searchPlaceholder")}" />
          </div>
          ${astroNotesViewBlankDiamondHtml()}
          <div class="astro-notes-view-table-tools">
            <label>
              <span>${t("openKundali.rowsPerPage")}</span>
              <select id="astroNotesRows">
                ${[5, 10, 20, 50].map((value) => `<option value="${value}" ${state.astroNotes.rowsPerPage === value ? "selected" : ""}>${value}</option>`).join("")}
              </select>
            </label>
          </div>
        </section>
        <section class="astro-notes-view-right" aria-label="${t("astroNotes.details")}">
          ${state.astroNotes.error ? `<div class="modal-error">${escapeHtml(state.astroNotes.error)}</div>` : ""}
          ${state.astroNotes.message ? `<div class="modal-success">${escapeHtml(state.astroNotes.message)}</div>` : ""}
          <div class="open-kundali-table-wrap astro-notes-view-table-wrap">
            <table class="open-kundali-table astro-notes-view-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>${t("astroNotes.note")}</th>
                  <th>${t("astroNotes.asc")}</th>
                  <th>${t("astroNotes.placements")}</th>
                </tr>
              </thead>
              <tbody>
                ${state.astroNotes.loading ? `<tr><td colspan="4">${t("common.loading")}</td></tr>` : rows.map(astroNotesViewRowHtml).join("")}
                ${!state.astroNotes.loading && !rows.length ? `<tr><td colspan="4">${t("astroNotes.noNotes")}</td></tr>` : ""}
              </tbody>
            </table>
          </div>
          <div class="open-kundali-pagination astro-notes-view-pagination">
            <button id="astroNotesPrev" type="button" ${state.astroNotes.page <= 1 ? "disabled" : ""}>${t("openKundali.previous")}</button>
            <strong>${escapeHtml(pageMessage)}</strong>
            <button id="astroNotesNext" type="button" ${state.astroNotes.page >= totalPages ? "disabled" : ""}>${t("openKundali.next")}</button>
          </div>
        </section>
      </div>
    `;
  }

  function astroNotesInlineTableHtml() {
    const total = Number(state.astroNotes.totalRecords) || 0;
    const totalPages = Math.max(1, Math.ceil(total / state.astroNotes.rowsPerPage));
    const rows = state.astroNotes.records || [];
    const pageMessage = astroNotesPageMessage(state.astroNotes.page, totalPages, total);
    return `
      <div class="astro-notes-inline-table-panel">
        <div class="open-kundali-table-wrap astro-notes-view-table-wrap">
          <table class="open-kundali-table astro-notes-view-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>${t("astroNotes.note")}</th>
                <th>${t("astroNotes.asc")}</th>
                <th>${t("astroNotes.placements")}</th>
              </tr>
            </thead>
            <tbody>
              ${state.astroNotes.loading ? `<tr><td colspan="4">${t("common.loading")}</td></tr>` : rows.map(astroNotesViewRowHtml).join("")}
              ${!state.astroNotes.loading && !rows.length ? `<tr><td colspan="4">${t("astroNotes.noNotes")}</td></tr>` : ""}
            </tbody>
          </table>
        </div>
        <div class="open-kundali-pagination astro-notes-view-pagination">
          <button id="astroNotesPrev" class="astro-notes-page-icon-button" type="button" title="${t("openKundali.previous")}" aria-label="${t("openKundali.previous")}" ${state.astroNotes.page <= 1 ? "disabled" : ""}>
            <img src="src/images/icon-chevron-left.svg" alt="" />
          </button>
          <strong>${escapeHtml(pageMessage)}</strong>
          <button id="astroNotesNext" class="astro-notes-page-icon-button" type="button" title="${t("openKundali.next")}" aria-label="${t("openKundali.next")}" ${state.astroNotes.page >= totalPages ? "disabled" : ""}>
            <img src="src/images/icon-chevron-right.svg" alt="" />
          </button>
          <label class="astro-notes-pagination-rows">
            <span>${t("openKundali.rowsPerPage")}</span>
            <select id="astroNotesRows">
              ${[10, 20, 50].map((value) => `<option value="${value}" ${state.astroNotes.rowsPerPage === value ? "selected" : ""}>${value}</option>`).join("")}
            </select>
          </label>
        </div>
      </div>
    `;
  }

  function astroNotesPlacementFiltersHtml() {
    const planets = ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn", "Rahu", "Ketu", "Uranus", "Neptune", "Pluto"];
    const houses = Array.from({ length: 12 }, (_, index) => index + 1);
    const signs = Array.from({ length: 12 }, (_, index) => index + 1);
    return `
      <select id="astroNotesPlacementPlanet" class="astro-notes-placement-filter" ${state.astroNotes.searchBy !== "placements" ? "disabled" : ""}>
        <option value="">${t("astroNotes.selectPlanet")}</option>
        ${planets.map((planet) => `<option value="${planet}" ${state.astroNotes.placementPlanet === planet ? "selected" : ""}>${escapeHtml(localizedPlanetFullName(planet))}</option>`).join("")}
      </select>
      <select id="astroNotesPlacementHouse" class="astro-notes-placement-filter" ${state.astroNotes.searchBy !== "placements" ? "disabled" : ""}>
        <option value="">${t("astroNotes.selectHouse")}</option>
        ${houses.map((house) => `<option value="${house}" ${String(state.astroNotes.placementHouse) === String(house) ? "selected" : ""}>H${house}</option>`).join("")}
      </select>
      <select id="astroNotesPlacementSign" class="astro-notes-placement-filter" ${state.astroNotes.searchBy !== "placements" ? "disabled" : ""}>
        <option value="">${t("astroNotes.selectSign")}</option>
        ${signs.map((sign) => `<option value="${sign}" ${String(state.astroNotes.placementSign) === String(sign) ? "selected" : ""}>${escapeHtml(localizedSignName(sign))}</option>`).join("")}
      </select>
    `;
  }

  function astroNotesSearchSuggestionsHtml() {
    const query = (state.astroNotes.query || "").trim();
    if (query.length <= 3 || !state.astroNotes.suggestions.length) return "";
    return `
      <div class="astro-notes-intellisense" role="listbox">
        ${state.astroNotes.suggestions.slice(0, 5).map((note) => `
          <button type="button" data-astro-note-suggestion="${escapeHtml(note.id)}" role="option">
            <strong>${escapeHtml(astroNotesPreviewText(note.note_text || "Untitled note", 100))}</strong>
            <span>${escapeHtml(astroNotesPlacementSummary(note) || `Asc ${note.asc_sign || "-"}`)}</span>
          </button>
        `).join("")}
      </div>
    `;
  }

  function astroNotesPageMessage(page, totalPages, total) {
    return t("astroNotes.pageMessage")
      .replace("{page}", page)
      .replace("{totalPages}", totalPages)
      .replace("{total}", total);
  }

  function astroNotesViewRowHtml(note) {
    const placements = astroNotesPlacementSummary(note);
    return `
      <tr data-astro-note-row="${escapeHtml(note.id)}">
        <td>${escapeHtml(note.id)}</td>
        <td><strong>${escapeHtml(astroNotesPreviewText(note.note_text || "", 50))}</strong></td>
        <td>${escapeHtml(note.asc_sign)}</td>
        <td>${escapeHtml(placements || "-")}</td>
      </tr>
    `;
  }

  function astroNotesPlacementSummary(note) {
    return (note?.placements || [])
      .map((placement) => `${localizedPlanetFullName(placement.planet)} ${t("astroNotes.houseShort")}${placement.house} ${t("astroNotes.signShort")}${placement.sign}`)
      .join(", ");
  }

  function astroNotesPreviewText(value, maxLength = 100) {
    const text = stripNoteMarkup(value).replace(/\s+/g, " ").trim();
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  }

  function astroNotesViewBlankDiamondHtml() {
    const slots = northDiamondHouseSlots();
    return `
      <div class="astro-notes-view-chart-wrap">
        <svg class="astro-notes-view-chart" viewBox="0 0 100 100" preserveAspectRatio="none" role="img" aria-label="Blank notes chart">
          ${slots.map((slot) => `
            <g class="astro-notes-view-house">
              <polygon points="${slot.points}"></polygon>
              <text x="${slot.labelX}" y="${slot.labelY}">${slot.house}</text>
            </g>
          `).join("")}
        </svg>
      </div>
    `;
  }

  function astroNotesBlankDiamondHtml() {
    const slots = northDiamondHouseSlots();
    const ascSign = Number(state.astroNotes.ascSign) || 1;
    return `
      <div class="astro-notes-blank-chart-wrap">
        <svg class="astro-notes-blank-chart" viewBox="0 0 100 100" preserveAspectRatio="none" role="img" aria-label="Blank diamond chart">
          ${slots.map((slot) => {
            const signIndex = ((ascSign + slot.house - 2) % 12) + 1;
            const planets = state.astroNotes.housePlanets?.[slot.house] || [];
            return `
            <g class="astro-notes-blank-house" data-astro-house="${slot.house}">
              <polygon points="${slot.points}"></polygon>
              <text x="${slot.labelX}" y="${slot.labelY}" data-astro-asc-sign="${signIndex}">${signIndex}</text>
              ${astroNotesHousePlanetsHtml(slot, planets)}
            </g>
          `;
          }).join("")}
        </svg>
      </div>
    `;
  }

  function astroNotesHousePlanetsHtml(slot, planets) {
    if (!planets.length) return "";
    return planets.slice(0, 12).map((planet, index) => {
      const position = northPlanetSlot(slot.house, index);
      return `
        <text class="astro-notes-house-planets ${astroNotesPlanetColorClass(planet)}" x="${formatSvgNumber(position.x)}" y="${formatSvgNumber(position.y)}" data-astro-remove-planet="${escapeHtml(planet)}" data-astro-remove-house="${slot.house}">
          ${escapeHtml(shortPlanetName(planet))}
        </text>
      `;
    }).join("");
  }

  function astroNotesPlanetColorClass(planet) {
    const key = String(planet || "").trim().toLowerCase();
    if (["jupiter", "moon", "mercury", "venus"].includes(key)) return "astro-notes-planet-green";
    if (["mars", "saturn", "rahu", "ketu"].includes(key)) return "astro-notes-planet-red";
    if (key === "sun") return "astro-notes-planet-sun";
    return "astro-notes-planet-default";
  }

  function astroNotesPlanetMenuHtml() {
    const planets = ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn", "Rahu", "Ketu", "Uranus", "Neptune", "Pluto"];
    return `
      <div class="astro-notes-planet-menu" style="left: ${state.astroNotes.planetMenu.x}px; top: ${state.astroNotes.planetMenu.y}px;">
        ${planets.map((planet) => `<button type="button" data-astro-planet-option="${planet}">${escapeHtml(localizedPlanetFullName(planet))}</button>`).join("")}
      </div>
    `;
  }

  function northDiamondHouseSlots() {
    return northDiamondSlots().map((slot) => {
      const sign = northLayoutHouse(slot.house)?.sign || {};
      const firstPlanet = northPlanetSlot(slot.house, 0);
      return {
        ...slot,
        labelX: Number(sign.x ?? slot.x),
        labelY: Number(sign.y ?? slot.y),
        planetX: Number(firstPlanet.x ?? slot.x),
        planetY: Number(firstPlanet.y ?? slot.y + 4),
      };
    });
  }

  function astroNoteListItemHtml(note) {
    const active = note.id === state.astroNotes.selectedId ? "active" : "";
    return `
      <article class="astro-note-list-item ${active}">
        <button class="astro-note-list-main" type="button" data-astro-note-select="${escapeHtml(note.id)}">
          <strong>${escapeHtml(note.title || "Untitled Note")}</strong>
          <span>${escapeHtml(note.preview || "No content")}</span>
        </button>
      </article>
    `;
  }

  function astroNoteTilesHtml(note) {
    const sections = Array.isArray(note.sections) ? note.sections : parseAstroNoteText(note.raw_text || "").sections;
    const flatSections = flattenAstroNoteSections(sections);
    return `
      <div class="astro-note-tile-view">
        ${flatSections.length ? flatSections.map((section) => astroNoteSectionTileHtml(section)).join("") : astroNoteRawTileHtml(note.raw_text || "")}
      </div>
    `;
  }

  function astroNoteBottomActionsHtml(selected, isEditing) {
    if (!selected && !isEditing) return "";
    return `
      <div class="astro-note-bottom-actions">
        ${isEditing ? `<button class="primary" id="astroNotesSave" type="button" ${state.astroNotes.saving ? "disabled" : ""}>${state.astroNotes.saving ? "Saving..." : "Save"}</button>` : ""}
        ${selected && isEditing ? `<button class="secondary" id="astroNotesCancelEdit" type="button" ${state.astroNotes.saving ? "disabled" : ""}>Cancel</button>` : ""}
        ${selected && !isEditing ? `<button class="primary" id="astroNotesEdit" type="button" ${state.astroNotes.saving ? "disabled" : ""}>Edit</button>` : ""}
        ${selected ? `<button class="danger" id="astroNotesDelete" type="button" ${state.astroNotes.saving ? "disabled" : ""}>Delete</button>` : ""}
      </div>
    `;
  }

  function astroNoteSectionTileHtml(section) {
    const level = Math.max(1, Math.min(6, Number(section.level) || 1));
    return `
      <article class="astro-note-section-tile level-${level}">
        <div class="astro-note-card-shine"></div>
        <div class="astro-note-section-heading">
          <strong>${escapeHtml(section.heading || "Untitled")}</strong>
        </div>
        ${section.content ? `<div class="astro-note-section-content">${astroNoteContentHtml(section.content)}</div>` : ""}
      </article>
    `;
  }

  function flattenAstroNoteSections(sections) {
    const flattened = [];
    const visit = (section) => {
      flattened.push(section);
      (section.children || []).forEach(visit);
    };
    (sections || []).forEach(visit);
    return flattened;
  }

  function astroNoteRawTileHtml(rawText) {
    return `
      <article class="astro-note-section-tile level-1">
        <div class="astro-note-card-shine"></div>
        <div class="astro-note-section-heading">
          <strong>Note</strong>
        </div>
        <div class="astro-note-section-content">${astroNoteContentHtml(rawText)}</div>
      </article>
    `;
  }

  function astroNoteContentHtml(content) {
    return String(content || "")
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => `<p>${formatNoteInlineHtml(line.replace(/^-+\s*/, ""))}</p>`)
      .join("");
    return String(content || "")
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => `<p>${escapeHtml(line.replace(/^[-•]\s*/, ""))}</p>`)
      .join("");
  }

  function attachAstroNotesHandlers() {
    if (!state.astroNotes.open) return;

    document.getElementById("closeAstroNotesModal")?.addEventListener("click", closeAstroNotesModal);
    document.querySelectorAll("[data-astro-notes-mode]").forEach((button) => {
      button.addEventListener("click", () => switchAstroNotesMode(button.dataset.astroNotesMode || "new"));
    });
    document.getElementById("astroNotesSearch")?.addEventListener("input", (event) => handleAstroNotesSearchInput(event));
    document.getElementById("astroNotesSearch")?.addEventListener("keydown", (event) => {
      if (event.key !== "Enter") return;
      state.astroNotes.query = event.target.value;
      state.astroNotes.page = 1;
      state.astroNotes.suggestions = [];
      loadAstroNotesRecords();
    });
    document.querySelectorAll("[data-astro-notes-search-by]").forEach((button) => {
      button.addEventListener("click", () => {
        state.astroNotes.searchBy = button.dataset.astroNotesSearchBy === "placements" ? "placements" : "notes";
        state.astroNotes.page = 1;
        state.astroNotes.suggestions = [];
        loadAstroNotesRecords();
        render();
      });
    });
    document.getElementById("astroNotesPlacementPlanet")?.addEventListener("change", (event) => {
      state.astroNotes.placementPlanet = event.target.value;
      state.astroNotes.page = 1;
      state.astroNotes.suggestions = [];
      loadAstroNotesRecords();
    });
    document.getElementById("astroNotesPlacementHouse")?.addEventListener("change", (event) => {
      state.astroNotes.placementHouse = event.target.value;
      state.astroNotes.page = 1;
      state.astroNotes.suggestions = [];
      loadAstroNotesRecords();
    });
    document.getElementById("astroNotesPlacementSign")?.addEventListener("change", (event) => {
      state.astroNotes.placementSign = event.target.value;
      state.astroNotes.page = 1;
      state.astroNotes.suggestions = [];
      loadAstroNotesRecords();
    });
    document.getElementById("astroNotesRows")?.addEventListener("change", (event) => {
      state.astroNotes.rowsPerPage = Number(event.target.value) || 10;
      state.astroNotes.page = 1;
      loadAstroNotesRecords();
    });
    document.getElementById("astroNotesPrev")?.addEventListener("click", () => {
      state.astroNotes.page = Math.max(1, state.astroNotes.page - 1);
      loadAstroNotesRecords();
    });
    document.getElementById("astroNotesNext")?.addEventListener("click", () => {
      const totalPages = Math.max(1, Math.ceil((state.astroNotes.totalRecords || 0) / state.astroNotes.rowsPerPage));
      state.astroNotes.page = Math.min(totalPages, state.astroNotes.page + 1);
      loadAstroNotesRecords();
    });
    document.getElementById("astroNotesNoteText")?.addEventListener("input", (event) => {
      state.astroNotes.noteText = event.target.value;
      state.astroNotes.error = "";
      state.astroNotes.message = "";
    });
    document.getElementById("astroNotesChartSave")?.addEventListener("click", saveKundaliNotePattern);
    document.getElementById("astroNotesEditKundaliNote")?.addEventListener("click", toggleKundaliNoteEdit);
    document.getElementById("astroNotesUpdateSave")?.addEventListener("click", updateKundaliNotePattern);
    document.querySelectorAll("[data-astro-note-suggestion]").forEach((button) => {
      button.addEventListener("click", () => selectAstroNotesSuggestion(button.dataset.astroNoteSuggestion || ""));
    });
    document.querySelectorAll("[data-astro-note-row]").forEach((row) => {
      row.addEventListener("click", () => selectAstroNotesRecord(row.dataset.astroNoteRow || ""));
    });
    document.querySelectorAll("[data-astro-asc-sign]").forEach((sign) => {
      sign.addEventListener("click", () => {
        state.astroNotes.ascSign = Number(sign.dataset.astroAscSign) || 1;
        render();
      });
    });
    document.querySelectorAll("[data-astro-remove-planet]").forEach((planetLabel) => {
      planetLabel.addEventListener("click", (event) => {
        event.stopPropagation();
        removeAstroNotesPlanetFromHouse(
          Number(planetLabel.dataset.astroRemoveHouse) || 0,
          planetLabel.dataset.astroRemovePlanet || "",
        );
      });
    });
    document.querySelectorAll("[data-astro-house]").forEach((house) => {
      house.addEventListener("contextmenu", (event) => {
        event.preventDefault();
        const shellRect = document.querySelector(".astro-notes-placeholder-shell")?.getBoundingClientRect();
        state.astroNotes.planetMenu = {
          open: true,
          house: Number(house.dataset.astroHouse) || 1,
          x: Math.max(8, event.clientX - (shellRect?.left || 0)),
          y: Math.max(8, event.clientY - (shellRect?.top || 0)),
        };
        render();
      });
    });
    document.querySelectorAll("[data-astro-planet-option]").forEach((button) => {
      button.addEventListener("click", () => {
        addAstroNotesPlanetToHouse(button.dataset.astroPlanetOption || "");
      });
    });
  }

  function attachChartLayoutHandlers() {
    if (!state.chartLayoutModal.open) return;
    document.getElementById("closeChartLayoutModal")?.addEventListener("click", closeChartLayoutModal);
    document.getElementById("chartLayoutMode")?.addEventListener("change", (event) => {
      state.chartLayoutModal.mode = event.target.value === "planet" ? "planet" : "sign";
      state.chartLayoutModal.message = "";
      render();
    });
    document.getElementById("chartLayoutHouse")?.addEventListener("change", (event) => {
      state.chartLayoutModal.house = Number(event.target.value) || 1;
      state.chartLayoutModal.message = "";
      render();
    });
    document.getElementById("chartLayoutSlot")?.addEventListener("change", (event) => {
      state.chartLayoutModal.slot = Number(event.target.value) || 1;
      state.chartLayoutModal.message = "";
      render();
    });
    document.getElementById("chartLayoutEditorChart")?.addEventListener("click", handleChartLayoutClick);
    document.getElementById("chartLayoutSave")?.addEventListener("click", saveChartLayoutToFile);
  }

  function attachTwoDChartLayoutHandlers() {
    if (!state.twoDChartLayoutModal.open) return;
    document.getElementById("closeTwoDChartLayoutModal")?.addEventListener("click", closeTwoDChartLayoutModal);
    document.getElementById("twoDChartLayoutLayer")?.addEventListener("change", (event) => {
      state.twoDChartLayoutModal.layer = event.target.value === "outer" ? "outer" : "inner";
      state.twoDChartLayoutModal.message = "";
      render();
    });
    document.getElementById("twoDChartLayoutMode")?.addEventListener("change", (event) => {
      state.twoDChartLayoutModal.mode = event.target.value === "planet" ? "planet" : "sign";
      state.twoDChartLayoutModal.message = "";
      render();
    });
    document.getElementById("twoDChartLayoutHouse")?.addEventListener("change", (event) => {
      state.twoDChartLayoutModal.house = Number(event.target.value) || 1;
      state.twoDChartLayoutModal.message = "";
      render();
    });
    document.getElementById("twoDChartLayoutSlot")?.addEventListener("change", (event) => {
      state.twoDChartLayoutModal.slot = Number(event.target.value) || 1;
      state.twoDChartLayoutModal.message = "";
      render();
    });
    document.getElementById("twoDChartLayoutEditorChart")?.addEventListener("click", handleTwoDChartLayoutClick);
    document.getElementById("twoDChartLayoutSave")?.addEventListener("click", saveTwoDChartLayoutToFile);
  }

  function attachJaiminiChartLayoutHandlers() {
    if (!state.jaiminiChartLayoutModal.open) return;
    document.getElementById("closeJaiminiChartLayoutModal")?.addEventListener("click", closeJaiminiChartLayoutModal);
    document.getElementById("jaiminiChartLayoutMode")?.addEventListener("change", (event) => {
      state.jaiminiChartLayoutModal.mode = event.target.value === "planet" ? "planet" : "sign";
      state.jaiminiChartLayoutModal.message = "";
      render();
    });
    document.getElementById("jaiminiChartLayoutHouse")?.addEventListener("change", (event) => {
      state.jaiminiChartLayoutModal.house = Number(event.target.value) || 1;
      state.jaiminiChartLayoutModal.message = "";
      render();
    });
    document.getElementById("jaiminiChartLayoutSlot")?.addEventListener("change", (event) => {
      state.jaiminiChartLayoutModal.slot = Number(event.target.value) || 1;
      state.jaiminiChartLayoutModal.message = "";
      render();
    });
    document.getElementById("jaiminiChartLayoutEditorChart")?.addEventListener("click", handleJaiminiChartLayoutClick);
    document.getElementById("jaiminiChartLayoutSave")?.addEventListener("click", saveJaiminiChartLayoutToFile);
  }

  async function saveChartLayoutToFile() {
    try {
      state.chartLayout = normalizeChartLayoutPlanetSlots(state.chartLayout);
      await postJson("/chart-layout", state.chartLayout, "chartLayout.saveError");
      localStorage.removeItem("ej_vedic_chart_layout_draft");
      state.chartLayoutModal.message = t("chartLayout.saved");
      restoreChartLayoutReturnContext();
      state.chartLayoutModal.open = false;
    } catch (error) {
      state.chartLayoutModal.message = error.message || t("chartLayout.saveError");
    }
    render();
  }

  async function saveTwoDChartLayoutToFile() {
    try {
      state.twoDChartLayout = normalizeTwoDChartLayout(state.twoDChartLayout);
      await postJson("/2d-chart-layout", state.twoDChartLayout, "chartLayout.saveError");
      localStorage.removeItem("ej_vedic_2d_chart_layout_draft");
      state.twoDChartLayoutModal.message = t("twoDChartLayout.saved");
    } catch (error) {
      state.twoDChartLayoutModal.message = error.message || t("chartLayout.saveError");
    }
    render();
  }

  async function saveJaiminiChartLayoutToFile() {
    try {
      state.jaiminiChartLayout = normalizeJaiminiChartLayout(state.jaiminiChartLayout);
      await postJson("/jaimini-chart-layout", state.jaiminiChartLayout, "chartLayout.saveError");
      localStorage.removeItem("ej_vedic_jaimini_chart_layout_draft");
      state.jaiminiChartLayoutModal.message = t("jaiminiChartLayout.saved");
    } catch (error) {
      state.jaiminiChartLayoutModal.message = error.message || t("chartLayout.saveError");
    }
    render();
  }

  function restoreChartLayoutReturnContext() {
    const context = state.chartLayoutModal.returnContext;
    if (!state.jatakView.active) return;
    state.headingChoice = "home";
    state.headerActiveMenu = "open-kundali";
    state.jatakView.kundaliSection = "kundali";
    state.chartLayoutModal.returnContext = context || null;
  }

  function handleChartLayoutClick(event) {
    const svg = event.currentTarget;
    const rect = svg.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    const clickedHouse = chartLayoutHouseAtPoint(x, y) || Number(event.target.closest?.("[data-layout-house]")?.dataset?.layoutHouse);
    const house = clickedHouse || Number(state.chartLayoutModal.house) || 1;
    state.chartLayoutModal.house = house;
    ensureNorthLayoutHouse(house);
    const layoutHouse = state.chartLayout.north.houses[String(house)];
    if (state.chartLayoutModal.mode === "planet") {
      const slotIndex = Math.max(0, Math.min(CHART_LAYOUT_PLANET_SLOT_COUNT - 1, (Number(state.chartLayoutModal.slot) || 1) - 1));
      layoutHouse.planets = Array.isArray(layoutHouse.planets) ? layoutHouse.planets : [];
      while (layoutHouse.planets.length < CHART_LAYOUT_PLANET_SLOT_COUNT) {
        layoutHouse.planets.push({ x: 50, y: 50 });
      }
      layoutHouse.planets = layoutHouse.planets.slice(0, CHART_LAYOUT_PLANET_SLOT_COUNT);
      layoutHouse.planets[slotIndex] = { x: roundChartCoordinate(x), y: roundChartCoordinate(y) };
      state.chartLayoutModal.message = `H${house} slot ${slotIndex + 1}: ${roundChartCoordinate(x)}, ${roundChartCoordinate(y)}`;
    } else {
      layoutHouse.sign = { x: roundChartCoordinate(x), y: roundChartCoordinate(y) };
      state.chartLayoutModal.message = `H${house} sign: ${roundChartCoordinate(x)}, ${roundChartCoordinate(y)}`;
    }
    saveChartLayoutDraft();
    render();
  }

  function handleTwoDChartLayoutClick(event) {
    const svg = event.currentTarget;
    const rect = svg.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    const house = Number(state.twoDChartLayoutModal.house) || 1;
    const layer = state.twoDChartLayoutModal.layer === "outer" ? "outer" : "inner";
    ensureTwoDLayoutHouse(layer, house);
    const layoutHouse = state.twoDChartLayout.north_2d.layers[layer].houses[String(house)];
    if (state.twoDChartLayoutModal.mode === "planet") {
      const slotIndex = Math.max(0, Math.min(CHART_LAYOUT_PLANET_SLOT_COUNT - 1, (Number(state.twoDChartLayoutModal.slot) || 1) - 1));
      layoutHouse.planets[slotIndex] = { x: roundChartCoordinate(x), y: roundChartCoordinate(y) };
      state.twoDChartLayoutModal.message = `${layer} H${house} slot ${slotIndex + 1}: ${roundChartCoordinate(x)}, ${roundChartCoordinate(y)}`;
    } else {
      layoutHouse.sign = { x: roundChartCoordinate(x), y: roundChartCoordinate(y) };
      state.twoDChartLayoutModal.message = `${layer} H${house} sign: ${roundChartCoordinate(x)}, ${roundChartCoordinate(y)}`;
    }
    saveTwoDChartLayoutDraft();
    render();
  }

  function handleJaiminiChartLayoutClick(event) {
    const svg = event.currentTarget;
    const rect = svg.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    const clickedHouse = jaiminiChartLayoutHouseAtPoint(x, y) || Number(event.target.closest?.("[data-jaimini-layout-house]")?.dataset?.jaiminiLayoutHouse);
    const house = clickedHouse || Number(state.jaiminiChartLayoutModal.house) || 1;
    state.jaiminiChartLayoutModal.house = house;
    const layoutHouse = ensureJaiminiLayoutHouse(house);
    if (state.jaiminiChartLayoutModal.mode === "planet") {
      const slotIndex = Math.max(0, Math.min(JAIMINI_CHART_LAYOUT_PLANET_SLOT_COUNT - 1, (Number(state.jaiminiChartLayoutModal.slot) || 1) - 1));
      layoutHouse.planets[slotIndex] = { x: roundChartCoordinate(x), y: roundChartCoordinate(y) };
      state.jaiminiChartLayoutModal.message = `H${house} slot ${slotIndex + 1}: ${roundChartCoordinate(x)}, ${roundChartCoordinate(y)}`;
    } else {
      layoutHouse.sign = { x: roundChartCoordinate(x), y: roundChartCoordinate(y) };
      state.jaiminiChartLayoutModal.message = `H${house} sign: ${roundChartCoordinate(x)}, ${roundChartCoordinate(y)}`;
    }
    saveJaiminiChartLayoutDraft();
    render();
  }

  function saveChartLayoutDraft() {
    try {
      localStorage.setItem("ej_vedic_chart_layout_draft", JSON.stringify(state.chartLayout));
    } catch {
      // Export JSON still exposes the current in-memory layout if storage is unavailable.
    }
  }

  function saveTwoDChartLayoutDraft() {
    try {
      localStorage.setItem("ej_vedic_2d_chart_layout_draft", JSON.stringify(state.twoDChartLayout));
    } catch {
      // The modal message still exposes the last selected coordinate if storage is unavailable.
    }
  }

  function saveJaiminiChartLayoutDraft() {
    try {
      localStorage.setItem("ej_vedic_jaimini_chart_layout_draft", JSON.stringify(state.jaiminiChartLayout));
    } catch {
      // The selected coordinate remains visible in the modal message when storage is unavailable.
    }
  }

  function ensureNorthLayoutHouse(house) {
    state.chartLayout = state.chartLayout || { north: { houses: {} } };
    state.chartLayout.north = state.chartLayout.north || { houses: {} };
    state.chartLayout.north.houses = state.chartLayout.north.houses || {};
    const key = String(house);
    if (!state.chartLayout.north.houses[key]) {
      const fallback = northDiamondSlots().find((slot) => slot.house === house) || { points: "", x: 50, y: 50 };
      state.chartLayout.north.houses[key] = {
        points: fallback.points,
        sign: { x: fallback.x, y: fallback.y },
        planets: Array.from({ length: CHART_LAYOUT_PLANET_SLOT_COUNT }, (_, index) => ({ x: fallback.x, y: fallback.y + index * 4 })),
      };
    }
  }

  function ensureJaiminiLayoutHouse(house, layout = state.jaiminiChartLayout) {
    const targetLayout = layout || defaultJaiminiChartLayout();
    targetLayout.jaimini = targetLayout.jaimini || defaultJaiminiChartLayout().jaimini;
    targetLayout.jaimini.houses = targetLayout.jaimini.houses || {};
    const key = String(house);
    const fallback = northDiamondSlots().find((slot) => slot.house === house) || { points: "", x: 50, y: 50 };
    if (!targetLayout.jaimini.houses[key]) {
      targetLayout.jaimini.houses[key] = {
        points: fallback.points,
        sign: { x: fallback.x, y: fallback.y },
        planets: Array.from({ length: JAIMINI_CHART_LAYOUT_PLANET_SLOT_COUNT }, (_, index) => ({
          x: fallback.x,
          y: fallback.y + index * 3.2,
        })),
      };
    }
    const layoutHouse = targetLayout.jaimini.houses[key];
    layoutHouse.points = layoutHouse.points || fallback.points;
    layoutHouse.sign = layoutHouse.sign || { x: fallback.x, y: fallback.y };
    layoutHouse.planets = Array.isArray(layoutHouse.planets) ? layoutHouse.planets.slice(0, JAIMINI_CHART_LAYOUT_PLANET_SLOT_COUNT) : [];
    while (layoutHouse.planets.length < JAIMINI_CHART_LAYOUT_PLANET_SLOT_COUNT) {
      layoutHouse.planets.push({ x: fallback.x, y: fallback.y });
    }
    if (!state.jaiminiChartLayout && layout === state.jaiminiChartLayout) {
      state.jaiminiChartLayout = targetLayout;
    }
    return layoutHouse;
  }

  function roundChartCoordinate(value) {
    return Math.round(Number(value) * 100) / 100;
  }

  function chartLayoutHouseAtPoint(x, y) {
    return northDiamondSlots().find((slot) => pointInPolygon(x, y, slot.points))?.house || null;
  }

  function jaiminiChartLayoutHouseAtPoint(x, y) {
    return jaiminiDiamondSlots().find((slot) => pointInPolygon(x, y, slot.points))?.house || null;
  }

  function pointInPolygon(x, y, points) {
    const polygon = String(points)
      .trim()
      .split(/\s+/)
      .map((point) => point.split(",").map(Number));
    let inside = false;
    for (let index = 0, previous = polygon.length - 1; index < polygon.length; previous = index++) {
      const [xi, yi] = polygon[index];
      const [xj, yj] = polygon[previous];
      const intersects = ((yi > y) !== (yj > y)) && x < ((xj - xi) * (y - yi)) / (yj - yi || 1) + xi;
      if (intersects) inside = !inside;
    }
    return inside;
  }

  function switchAstroNotesMode(mode) {
    state.astroNotes.mode = ["view", "search"].includes(mode) ? mode : "new";
    state.astroNotes.error = "";
    state.astroNotes.message = "";
    state.astroNotes.planetMenu = { open: false, house: null, x: 0, y: 0 };
    if (state.astroNotes.mode === "new") {
      resetAstroNotesNewNote();
    }
    if (state.astroNotes.mode === "search") {
      state.astroNotes.rowsPerPage = 10;
      state.astroNotes.page = 1;
      state.astroNotes.suggestions = [];
      state.astroNotes.ascSign = 1;
      state.astroNotes.housePlanets = {};
    }
    render();
    if (state.astroNotes.mode === "view") {
      loadMostRecentAstroNote();
    }
    if (state.astroNotes.mode === "search") {
      loadAstroNotesRecords();
    }
  }

  function resetAstroNotesNewNote() {
    state.astroNotes.selectedId = null;
    state.astroNotes.noteText = "";
    state.astroNotes.ascSign = 1;
    state.astroNotes.housePlanets = {};
    state.astroNotes.query = "";
    state.astroNotes.suggestions = [];
    state.astroNotes.records = [];
    state.astroNotes.totalRecords = 0;
    state.astroNotes.page = 1;
  }

  function handleAstroNotesSearchInput(event) {
    const caret = event.target.selectionStart || 0;
    state.astroNotes.query = event.target.value;
    state.astroNotes.page = 1;
    state.astroNotes.suggestions = [];
    render();
    const input = document.getElementById("astroNotesSearch");
    input?.focus();
    input?.setSelectionRange(caret, caret);
    clearTimeout(state.astroNotes.searchTimer);
    state.astroNotes.searchTimer = setTimeout(() => {
      if (state.astroNotes.open && state.astroNotes.mode === "search" && state.astroNotes.searchBy === "notes") {
        loadAstroNotesSuggestions();
      } else if (state.astroNotes.open && state.astroNotes.mode === "search") {
        loadAstroNotesRecords();
      }
    }, 500);
  }

  async function loadAstroNotesSuggestions() {
    if (state.astroNotes.searchBy !== "notes") {
      state.astroNotes.suggestions = [];
      render();
      return;
    }
    const query = (state.astroNotes.query || "").trim();
    if (query.length <= 3) {
      state.astroNotes.suggestions = [];
      render();
      return;
    }
    const token = state.astroNotes.suggestionToken + 1;
    state.astroNotes.suggestionToken = token;
    try {
      const response = await getKundaliNotesPage({ recordsPerPage: 5, page: 1, search: query });
      if (token !== state.astroNotes.suggestionToken) return;
      state.astroNotes.suggestions = normalizeKundaliNotesList(response).records.slice(0, 5);
    } catch (error) {
      if (token !== state.astroNotes.suggestionToken) return;
      state.astroNotes.suggestions = [];
    } finally {
      if (token === state.astroNotes.suggestionToken) {
        render();
      }
    }
  }

  function selectAstroNotesSuggestion(noteId) {
    const note = state.astroNotes.suggestions.find((item) => String(item.id) === String(noteId));
    if (!note) return;
    loadAstroNoteIntoEditor(note, "view");
    state.astroNotes.message = "Note loaded.";
    render();
  }

  function selectAstroNotesRecord(noteId) {
    const note = state.astroNotes.records.find((item) => String(item.id) === String(noteId));
    if (!note) return;
    loadAstroNoteIntoEditor(note, "view");
    state.astroNotes.message = "Note loaded.";
    render();
  }

  function loadAstroNoteIntoEditor(note, mode = "view") {
    state.astroNotes.mode = mode;
    state.astroNotes.selectedId = note.id;
    state.astroNotes.noteText = note.note_text || "";
    state.astroNotes.ascSign = Number(note.asc_sign) || 1;
    state.astroNotes.housePlanets = astroNotesHousePlanetsFromPlacements(note.placements || []);
    state.astroNotes.query = "";
    state.astroNotes.page = 1;
    state.astroNotes.suggestions = [];
    state.astroNotes.error = "";
    state.astroNotes.editing = false;
  }

  function astroNotesHousePlanetsFromPlacements(placements) {
    return (placements || []).reduce((result, placement) => {
      const house = Number(placement.house);
      const planet = String(placement.planet || "").trim();
      if (!house || !planet) return result;
      result[house] = result[house] || [];
      if (!result[house].includes(planet)) {
        result[house].push(planet);
      }
      return result;
    }, {});
  }

  function addAstroNotesPlanetToHouse(planet) {
    const house = state.astroNotes.planetMenu.house;
    if (!planet || !house) return;
    const currentPlanets = state.astroNotes.housePlanets?.[house] || [];
    const updatedPlanets = currentPlanets.includes(planet) ? currentPlanets : [...currentPlanets, planet];
    state.astroNotes.housePlanets = {
      ...(state.astroNotes.housePlanets || {}),
      [house]: updatedPlanets,
    };
    state.astroNotes.planetMenu = { open: false, house: null, x: 0, y: 0 };
    render();
  }

  function removeAstroNotesPlanetFromHouse(house, planet) {
    if (!house || !planet) return;
    const currentPlanets = state.astroNotes.housePlanets?.[house] || [];
    state.astroNotes.housePlanets = {
      ...(state.astroNotes.housePlanets || {}),
      [house]: currentPlanets.filter((existingPlanet) => existingPlanet !== planet),
    };
    render();
  }

  async function saveKundaliNotePattern() {
    const noteText = (document.getElementById("astroNotesNoteText")?.value || state.astroNotes.noteText || "").trim();
    if (!noteText) {
      state.astroNotes.error = t("astroNotes.addRequired");
      render();
      return;
    }

    const placements = astroNotesKundaliPlacements();
    const payload = {
      note_text: noteText,
      asc_sign: Number(state.astroNotes.ascSign) || 1,
      placements,
    };

    state.astroNotes.saving = true;
    state.astroNotes.error = "";
    state.astroNotes.message = "";
    render();

    try {
      await postJson("/kundali-notes", payload, t("astroNotes.saveKundaliError"));
      resetAstroNotesNewNote();
      state.astroNotes.planetMenu = { open: false, house: null, x: 0, y: 0 };
      state.astroNotes.mode = "new";
      state.astroNotes.message = t("astroNotes.kundaliSaved");
    } catch (error) {
      state.astroNotes.error = error.message || t("astroNotes.saveKundaliError");
    } finally {
      state.astroNotes.saving = false;
      render();
    }
  }

  function toggleKundaliNoteEdit() {
    state.astroNotes.editing = !state.astroNotes.editing;
    state.astroNotes.error = "";
    state.astroNotes.message = "";
    render();
  }

  async function updateKundaliNotePattern() {
    const noteId = state.astroNotes.selectedId;
    const noteText = (document.getElementById("astroNotesNoteText")?.value || state.astroNotes.noteText || "").trim();
    if (!noteId) {
      state.astroNotes.error = t("astroNotes.noNoteSelected");
      render();
      return;
    }
    if (!noteText) {
      state.astroNotes.error = t("astroNotes.addRequired");
      render();
      return;
    }

    const payload = {
      note_text: noteText,
      asc_sign: Number(state.astroNotes.ascSign) || 1,
      placements: astroNotesKundaliPlacements(),
    };

    state.astroNotes.saving = true;
    state.astroNotes.error = "";
    state.astroNotes.message = "";
    render();

    try {
      const updatedNote = await putJson(`/kundali-notes/${encodeURIComponent(noteId)}`, payload, "astroNotes.updateKundaliError");
      loadAstroNoteIntoEditor(updatedNote, "view");
      state.astroNotes.editing = false;
      state.astroNotes.message = t("astroNotes.kundaliUpdated");
    } catch (error) {
      state.astroNotes.error = error.message || t("astroNotes.updateKundaliError");
    } finally {
      state.astroNotes.saving = false;
      render();
    }
  }

  function astroNotesKundaliPlacements() {
    const ascSign = Number(state.astroNotes.ascSign) || 1;
    const placements = [];
    Object.entries(state.astroNotes.housePlanets || {}).forEach(([houseKey, planets]) => {
      const house = Number(houseKey);
      const sign = ((ascSign + house - 2) % 12) + 1;
      (planets || []).forEach((planet) => {
        placements.push({ planet, house, sign });
      });
    });
    return placements;
  }

  async function loadAstroNotesRecords() {
    if (!state.astroNotes.open || state.astroNotes.mode !== "search") return;
    const token = state.astroNotes.searchToken + 1;
    state.astroNotes.searchToken = token;
    state.astroNotes.loading = true;
    state.astroNotes.error = "";
    render();

    try {
      const response = await getKundaliNotesPage();
      if (token !== state.astroNotes.searchToken) return;
      const normalized = normalizeKundaliNotesList(response);
      state.astroNotes.records = normalized.records;
      state.astroNotes.totalRecords = normalized.totalRecords;
      state.astroNotes.footer = normalized.footer;
      state.astroNotes.page = normalized.page || state.astroNotes.page;
      if (state.astroNotes.selectedId && !state.astroNotes.records.some((note) => note.id === state.astroNotes.selectedId)) {
        state.astroNotes.selectedId = null;
        state.astroNotes.editorText = "";
        state.astroNotes.editing = false;
      }
    } catch (error) {
      state.astroNotes.error = error.message || t("astroNotes.loadNotesError");
    } finally {
      if (token === state.astroNotes.searchToken) {
        state.astroNotes.loading = false;
        render();
      }
    }
  }

  async function loadMostRecentAstroNote() {
    if (!state.astroNotes.open || state.astroNotes.mode !== "view") return;
    const token = state.astroNotes.searchToken + 1;
    state.astroNotes.searchToken = token;
    state.astroNotes.loading = true;
    state.astroNotes.error = "";
    render();

    try {
      const response = await getKundaliNotesPage({ page: 1, recordsPerPage: 1, search: "" });
      if (token !== state.astroNotes.searchToken) return;
      const [note] = normalizeKundaliNotesList(response).records;
      if (note) {
        loadAstroNoteIntoEditor(note, "view");
      } else {
        state.astroNotes.noteText = "";
        state.astroNotes.ascSign = 1;
        state.astroNotes.housePlanets = {};
        state.astroNotes.message = t("astroNotes.noNotes");
      }
    } catch (error) {
      state.astroNotes.error = error.message || t("astroNotes.loadNotesError");
    } finally {
      if (token === state.astroNotes.searchToken) {
        state.astroNotes.loading = false;
        render();
      }
    }
  }

  async function selectAstroNote(noteId) {
    state.astroNotes.loading = true;
    state.astroNotes.error = "";
    render();
    try {
      const note = normalizeDictionaryNote(await getJson(`/dictionary/${encodeURIComponent(noteId)}`, "Unable to load note."));
      state.astroNotes.selectedId = note.id;
      state.astroNotes.editorText = note.raw_text || "";
      state.astroNotes.records = [note, ...state.astroNotes.records.filter((record) => record.id !== note.id)];
      state.astroNotes.totalRecords = Math.max(state.astroNotes.totalRecords || 0, state.astroNotes.records.length);
      state.astroNotes.query = "";
      state.astroNotes.editing = false;
      state.astroNotes.message = "";
      state.astroNotes.error = "";
    } catch (error) {
      state.astroNotes.error = error.message || "Unable to load note.";
    } finally {
      state.astroNotes.loading = false;
      render();
    }
  }

  async function editAstroNote(noteId) {
    if (!noteId) return;
    const existing = state.astroNotes.records.find((note) => note.id === String(noteId));
    if (existing && existing.raw_text) {
      state.astroNotes.selectedId = existing.id;
      state.astroNotes.editorText = existing.raw_text || "";
      state.astroNotes.editing = true;
      state.astroNotes.message = "Editing note.";
      state.astroNotes.error = "";
      render();
      return;
    }
    await selectAstroNote(noteId);
    state.astroNotes.editing = true;
    render();
  }

  async function saveAstroNote() {
    const rawText = document.getElementById("astroNotesText")?.value || state.astroNotes.editorText || "";
    const parsed = parseAstroNoteText(rawText);
    if (!parsed.sections.length && !rawText.trim()) {
      state.astroNotes.error = "Please enter note text before saving.";
      render();
      return;
    }

    state.astroNotes.saving = true;
    state.astroNotes.error = "";
    render();
    const body = { notes: rawText };

    try {
      const isUpdate = Boolean(state.astroNotes.selectedId);
      const saved = isUpdate
        ? await putJson(`/dictionary/${encodeURIComponent(state.astroNotes.selectedId)}`, body, "Unable to save note.")
        : await postJson("/dictionary", body, "Unable to save note.");
      const note = normalizeDictionaryNote(saved);
      state.astroNotes.selectedId = note.id;
      state.astroNotes.editorText = note.raw_text || rawText;
      state.astroNotes.records = [note, ...state.astroNotes.records.filter((record) => record.id !== note.id)];
      state.astroNotes.totalRecords = Math.max(state.astroNotes.totalRecords || 0, state.astroNotes.records.length);
      state.astroNotes.editing = false;
      state.astroNotes.message = isUpdate ? "Dictionary note updated." : "Dictionary note saved.";
      state.astroNotes.error = "";
    } catch (error) {
      state.astroNotes.error = error.message || "Unable to save note.";
    } finally {
      state.astroNotes.saving = false;
      render();
    }
  }

  async function deleteAstroNote(noteId = state.astroNotes.selectedId) {
    if (!noteId) return;
    if (!window.confirm("Delete this dictionary note?")) return;
    state.astroNotes.saving = true;
    state.astroNotes.error = "";
    render();
    try {
      const deletedId = String(noteId);
      await deleteJson(`/dictionary/${encodeURIComponent(deletedId)}`, "Unable to delete note.");
      state.astroNotes.records = state.astroNotes.records.filter((note) => note.id !== deletedId);
      if (state.astroNotes.selectedId === deletedId) {
        state.astroNotes.selectedId = null;
        state.astroNotes.editorText = "";
        state.astroNotes.editing = false;
      }
      state.astroNotes.totalRecords = Math.max(0, (state.astroNotes.totalRecords || 1) - 1);
      state.astroNotes.message = "Dictionary note deleted.";
    } catch (error) {
      state.astroNotes.error = error.message || "Unable to delete note.";
    } finally {
      state.astroNotes.saving = false;
      render();
    }
  }

  function getDictionaryNotesPage() {
    const page = Math.max(1, state.astroNotes.page || 1);
    const rows = Math.max(1, state.astroNotes.rowsPerPage || 10);
    return getJson(`/dictionary?page=${page}&records_per_page=${rows}`, t("astroNotes.loadNotesError"));
  }

  function getKundaliNotesPage(options = {}) {
    const page = Math.max(1, Number(options.page ?? state.astroNotes.page) || 1);
    const rows = Math.max(1, Number(options.recordsPerPage ?? state.astroNotes.rowsPerPage) || 10);
    const searchBy = options.searchBy ?? state.astroNotes.searchBy;
    const query = encodeURIComponent(searchBy === "placements" ? "" : String(options.search ?? state.astroNotes.query ?? "").trim());
    const params = new URLSearchParams({
      page: String(page),
      records_per_page: String(rows),
      search: decodeURIComponent(query),
    });
    if (searchBy === "placements") {
      const planet = String(options.planet ?? state.astroNotes.placementPlanet ?? "").trim();
      const house = String(options.house ?? state.astroNotes.placementHouse ?? "").trim();
      const sign = String(options.sign ?? state.astroNotes.placementSign ?? "").trim();
      if (planet) params.set("planet", planet);
      if (house) params.set("house", house);
      if (sign) params.set("sign", sign);
    }
    return getJson(`/kundali-notes?${params.toString()}`, t("astroNotes.loadNotesError"));
  }

  async function loadHomeNotes() {
    if (state.homeView !== "notes") return;
    const token = Date.now();
    state.homeNotes.loadToken = token;
    state.homeNotes.loading = true;
    state.homeNotes.error = "";
    render();
    try {
      const response = await getKundaliNotesPage({
        page: state.homeNotes.page,
        recordsPerPage: state.homeNotes.rowsPerPage,
        searchBy: "notes",
        search: state.homeNotes.query,
      });
      if (state.homeNotes.loadToken !== token) return;
      const normalized = normalizeKundaliNotesList(response);
      state.homeNotes.records = normalized.records;
      state.homeNotes.totalRecords = normalized.totalRecords;
      state.homeNotes.page = normalized.page || state.homeNotes.page;
      state.homeNotes.totalPages = Number(response?.total_pages) || Math.max(1, Math.ceil((normalized.totalRecords || 0) / state.homeNotes.rowsPerPage));
      state.homeNotes.footer = normalized.footer;
      const selectedRecord = state.homeNotes.records.find((note) => String(note.id) === String(state.homeNotes.selectedId));
      if (selectedRecord && state.homeNotes.mode === "view") {
        loadHomeNoteIntoDetail(selectedRecord, "view");
      } else if (state.homeNotes.mode === "view" && state.homeNotes.records.length) {
        loadHomeNoteIntoDetail(state.homeNotes.records[0], "view");
      } else if (state.homeNotes.mode === "view") {
        resetHomeNoteDetail("view");
      }
    } catch (error) {
      if (state.homeNotes.loadToken !== token) return;
      state.homeNotes.records = [];
      state.homeNotes.error = error.message || t("homeNotes.loadError");
    } finally {
      if (state.homeNotes.loadToken === token) {
        state.homeNotes.loading = false;
        render();
      }
    }
  }

  function changeHomeNotesPage(direction) {
    if (state.homeNotes.loading) return;
    const totalPages = Math.max(1, Number(state.homeNotes.totalPages) || Math.ceil((state.homeNotes.totalRecords || 0) / state.homeNotes.rowsPerPage) || 1);
    const nextPage = direction === "next"
      ? Math.min(totalPages, state.homeNotes.page + 1)
      : Math.max(1, state.homeNotes.page - 1);
    if (nextPage === state.homeNotes.page) return;
    state.homeNotes.page = nextPage;
    loadHomeNotes();
  }

  function handleHomeNotesSearchInput(event) {
    state.homeNotes.query = event.target.value;
    state.homeNotes.page = 1;
    clearTimeout(state.homeNotes.searchTimer);
    state.homeNotes.searchTimer = setTimeout(() => {
      if (state.homeView === "notes") loadHomeNotes();
    }, 500);
  }

  function resetHomeNotesSearch() {
    clearTimeout(state.homeNotes.searchTimer);
    state.homeNotes.query = "";
    state.homeNotes.page = 1;
    loadHomeNotes();
  }

  function selectedHomeNote() {
    const selectedId = String(state.homeNotes.selectedId || "");
    return (state.homeNotes.records || []).find((note) => String(note.id) === selectedId) || null;
  }

  function selectHomeNote(noteId) {
    const note = (state.homeNotes.records || []).find((item) => String(item.id) === String(noteId));
    if (!note) return;
    loadHomeNoteIntoDetail(note, "view");
    state.homeNotes.message = "";
    state.homeNotes.error = "";
    render();
  }

  function loadHomeNoteIntoDetail(note, mode = "view") {
    state.homeNotes.selectedId = note?.id || null;
    state.homeNotes.mode = mode;
    state.homeNotes.noteText = note?.note_text || "";
    state.homeNotes.ascSign = Number(note?.asc_sign) || 1;
    state.homeNotes.housePlanets = astroNotesHousePlanetsFromPlacements(note?.placements || []);
    state.homeNotes.planetMenu = { open: false, house: null, x: 0, y: 0 };
  }

  function resetHomeNoteDetail(mode = "new") {
    state.homeNotes.selectedId = null;
    state.homeNotes.mode = mode;
    state.homeNotes.noteText = "";
    state.homeNotes.ascSign = 1;
    state.homeNotes.housePlanets = {};
    state.homeNotes.message = "";
    state.homeNotes.error = "";
    state.homeNotes.planetMenu = { open: false, house: null, x: 0, y: 0 };
  }

  function isHomeNotesEditable() {
    return state.homeNotes.mode === "new" || state.homeNotes.mode === "edit";
  }

  function handleHomeNotesAction(action) {
    if (action === "new") {
      resetHomeNoteDetail("new");
      render();
      return;
    }
    if (action === "edit") {
      if (!state.homeNotes.selectedId) return;
      state.homeNotes.mode = "edit";
      state.homeNotes.message = "";
      state.homeNotes.error = "";
      render();
      return;
    }
    if (action === "cancel") {
      const note = selectedHomeNote();
      if (note) {
        loadHomeNoteIntoDetail(note, "view");
      } else {
        resetHomeNoteDetail("view");
      }
      render();
      return;
    }
    if (action === "save") {
      saveHomeNote();
      return;
    }
    if (action === "delete") {
      deleteHomeNote();
    }
  }

  function addHomeNotePlanetToHouse(planet) {
    const house = state.homeNotes.planetMenu.house;
    if (!planet || !house) return;
    const currentPlanets = state.homeNotes.housePlanets?.[house] || [];
    state.homeNotes.housePlanets = {
      ...(state.homeNotes.housePlanets || {}),
      [house]: currentPlanets.includes(planet) ? currentPlanets : [...currentPlanets, planet],
    };
    state.homeNotes.planetMenu = { open: false, house: null, x: 0, y: 0 };
    render();
  }

  function removeHomeNotePlanetFromHouse(house, planet) {
    if (!house || !planet) return;
    const currentPlanets = state.homeNotes.housePlanets?.[house] || [];
    state.homeNotes.housePlanets = {
      ...(state.homeNotes.housePlanets || {}),
      [house]: currentPlanets.filter((existingPlanet) => existingPlanet !== planet),
    };
    render();
  }

  function homeNotePlacements() {
    const ascSign = Number(state.homeNotes.ascSign) || 1;
    const placements = [];
    Object.entries(state.homeNotes.housePlanets || {}).forEach(([houseKey, planets]) => {
      const house = Number(houseKey);
      const sign = ((ascSign + house - 2) % 12) + 1;
      (planets || []).forEach((planet) => placements.push({ planet, house, sign }));
    });
    return placements;
  }

  async function saveHomeNote() {
    const noteText = (document.getElementById("homeNotesDetailText")?.value || state.homeNotes.noteText || "").trim();
    if (!noteText) {
      state.homeNotes.error = t("astroNotes.addRequired");
      render();
      return;
    }
    const isUpdate = state.homeNotes.mode === "edit" && state.homeNotes.selectedId;
    const payload = {
      note_text: noteText,
      asc_sign: Number(state.homeNotes.ascSign) || 1,
      placements: homeNotePlacements(),
    };
    state.homeNotes.saving = true;
    state.homeNotes.error = "";
    state.homeNotes.message = "";
    render();
    try {
      const saved = isUpdate
        ? await putJson(`/kundali-notes/${encodeURIComponent(state.homeNotes.selectedId)}`, payload, "astroNotes.updateKundaliError")
        : await postJson("/kundali-notes", payload, t("astroNotes.saveKundaliError"));
      const note = normalizeKundaliNote(saved?.note || saved?.data || saved);
      if (note.id) {
        state.homeNotes.records = [note, ...state.homeNotes.records.filter((record) => String(record.id) !== String(note.id))].slice(0, state.homeNotes.rowsPerPage);
        state.homeNotes.totalRecords = Math.max(state.homeNotes.totalRecords || 0, isUpdate ? state.homeNotes.totalRecords : (state.homeNotes.totalRecords || 0) + 1);
        loadHomeNoteIntoDetail(note, "view");
      } else {
        resetHomeNoteDetail("view");
        await loadHomeNotes();
      }
      state.homeNotes.message = t(isUpdate ? "astroNotes.kundaliUpdated" : "astroNotes.kundaliSaved");
    } catch (error) {
      state.homeNotes.error = error.message || t(isUpdate ? "astroNotes.updateKundaliError" : "astroNotes.saveKundaliError");
    } finally {
      state.homeNotes.saving = false;
      render();
    }
  }

  async function deleteHomeNote() {
    const noteId = state.homeNotes.selectedId;
    if (!noteId) return;
    if (!window.confirm(t("astroNotes.deleteConfirm"))) return;
    state.homeNotes.saving = true;
    state.homeNotes.error = "";
    state.homeNotes.message = "";
    render();
    try {
      await deleteJson(`/kundali-notes/${encodeURIComponent(noteId)}`, "astroNotes.deleteError");
      state.homeNotes.records = state.homeNotes.records.filter((note) => String(note.id) !== String(noteId));
      state.homeNotes.totalRecords = Math.max(0, (state.homeNotes.totalRecords || 1) - 1);
      const nextNote = state.homeNotes.records[0] || null;
      if (nextNote) {
        loadHomeNoteIntoDetail(nextNote, "view");
      } else {
        resetHomeNoteDetail("view");
      }
      state.homeNotes.message = t("astroNotes.deleted");
    } catch (error) {
      state.homeNotes.error = error.message || t("astroNotes.deleteError");
    } finally {
      state.homeNotes.saving = false;
      render();
    }
  }

  function normalizeKundaliNotesList(response) {
    const records = Array.isArray(response)
      ? response
      : response?.items || response?.records || response?.notes || response?.kundali_notes || [];
    return {
      records: records.map(normalizeKundaliNote).filter((note) => note.id !== ""),
      totalRecords: Number(response?.total_records ?? response?.total ?? response?.count ?? records.length) || 0,
      page: Number(response?.page ?? state.astroNotes.page) || 1,
      footer: String(response?.footer || ""),
    };
  }

  function normalizeKundaliNote(note) {
    return {
      ...note,
      id: String(note?.id ?? note?.note_id ?? ""),
      note_text: String(note?.note_text ?? ""),
      asc_sign: Number(note?.asc_sign) || "",
      placements: Array.isArray(note?.placements) ? note.placements : [],
      created_at: String(note?.created_at || ""),
      updated_at: String(note?.updated_at || ""),
    };
  }

  function formatAstroNotesDateTime(value) {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return String(value);
    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function normalizeDictionaryNotesList(response) {
    const records = Array.isArray(response)
      ? response
      : response?.items || response?.records || response?.notes || response?.dictionary_notes || [];
    return {
      records: records.map(normalizeDictionaryNote).filter((note) => note.id !== ""),
      totalRecords: Number(response?.total_records ?? response?.total ?? response?.count ?? records.length) || 0,
      page: Number(response?.page ?? state.astroNotes.page) || 1,
      footer: String(response?.footer || ""),
    };
  }

  function normalizeDictionaryNote(note) {
    const rawText = String(note?.raw_text ?? note?.notes ?? note?.note_text ?? "");
    const parsed = parseAstroNoteText(rawText);
    const entrySections = dictionaryEntryToSections(note?.entry);
    const answerPreview = Array.isArray(note?.answer) ? note.answer.join(" ") : "";
    const pathText = note?.path_text || (Array.isArray(note?.matched_path) ? note.matched_path.join(" > ") : "");
    return {
      ...note,
      id: String(note?.id ?? note?.note_id ?? ""),
      title: note?.title || pathText || firstAstroHeading(entrySections || []) || parsed.title,
      preview: note?.preview || answerPreview || parsed.preview || String(note?.normalized_text || note?.summary || "").slice(0, 140),
      raw_text: rawText,
      sections: note?.sections || entrySections || parsed.sections,
      search_text: note?.search_text || note?.normalized_text || note?.summary || parsed.searchText || `${pathText} ${answerPreview}`,
      updated_at: note?.updated_at || note?.created_at || "",
    };
  }

  function dictionaryEntryToSections(entry, level = 1) {
    if (!entry || typeof entry !== "object" || !entry.heading) return null;
    const content = Array.isArray(entry.content) ? entry.content.join("\n") : String(entry.content || "");
    return [
      {
        level,
        heading: String(entry.heading || ""),
        content,
        children: (Array.isArray(entry.sub_headings) ? entry.sub_headings : [])
          .flatMap((child) => dictionaryEntryToSections(child, level + 1) || []),
      },
    ];
  }

  function parseAstroNoteText(rawText) {
    const sections = [];
    const stack = [];
    const searchParts = [rawText];
    let current = null;
    const preface = [];

    String(rawText || "").split(/\r?\n/).forEach((line) => {
      const heading = parseAstroHeading(line);
      if (heading) {
        const node = { level: heading.level, heading: heading.text, content: "", children: [] };
        while (stack.length && stack[stack.length - 1].level >= heading.level) {
          stack.pop();
        }
        if (stack.length) {
          stack[stack.length - 1].children.push(node);
        } else {
          sections.push(node);
        }
        stack.push(node);
        current = node;
        searchParts.push(heading.text);
        return;
      }

      if (current) {
        current.content = `${current.content}${line}\n`;
        searchParts.push(line);
      } else if (line.trim()) {
        preface.push(line.trim());
        searchParts.push(line);
      }
    });

    trimAstroNoteSections(sections);
    const firstHeading = firstAstroHeading(sections);
    const title = firstHeading || preface[0] || "Untitled Note";
    const preview = firstAstroContent(sections) || preface.join(" ") || String(rawText || "").trim().slice(0, 90);
    return {
      title,
      preview: preview.slice(0, 140),
      sections,
      searchText: searchParts.join(" ").toLowerCase(),
    };
  }

  function parseAstroHeading(line) {
    const match = String(line || "").trim().match(/^(\*+)(.+?)\1$/);
    if (!match) return null;
    const text = match[2].trim();
    if (!text) return null;
    return { level: match[1].length, text };
  }

  function trimAstroNoteSections(sections) {
    sections.forEach((section) => {
      section.content = String(section.content || "").trim();
      trimAstroNoteSections(section.children || []);
    });
  }

  function firstAstroHeading(sections) {
    for (const section of sections) {
      if (section.heading) return section.heading;
      const child = firstAstroHeading(section.children || []);
      if (child) return child;
    }
    return "";
  }

  function firstAstroContent(sections) {
    for (const section of sections) {
      if (section.content) return section.content.replace(/\s+/g, " ");
      const child = firstAstroContent(section.children || []);
      if (child) return child;
    }
    return "";
  }

  function createClientId(prefix) {
    if (window.crypto?.randomUUID) return `${prefix}_${window.crypto.randomUUID()}`;
    return `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2)}`;
  }

  function formatDateTimeLabel(value) {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return String(value);
    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function imageModalHtml() {
    if (state.imageModal.mode === "panchangInfo") {
      const tabs = panchangInfoTabs();
      const active = tabs.find((tab) => tab.key === state.imageModal.activeTab) || tabs[0];
      return `
        <div class="modal-backdrop">
          <section class="kundali-modal image-view-modal planets-info-modal panchang-info-modal" role="dialog" aria-modal="true" aria-label="${t("panchang.title")}">
            <div class="kundali-modal-header">
              <h2>${t("panchang.title")}</h2>
              <button class="modal-close-button" id="closeImageModal" type="button" aria-label="${t("common.close")}">x</button>
            </div>
            <div class="planets-info-body">
              <div class="planets-info-tabs">
                ${tabs.map((tab) => `<button class="${tab.key === active.key ? "active" : ""}" data-panchang-info-tab="${tab.key}" type="button">${tab.label}</button>`).join("")}
              </div>
              ${panchangInfoTabContentHtml(active)}
            </div>
          </section>
        </div>
      `;
    }

    if (state.imageModal.mode === "planets") {
      const tabs = planetInfoTabs();
      const active = tabs.find((tab) => tab.key === state.imageModal.activeTab) || tabs[0];
      const planets = ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn", "Rahu", "Ketu", "Uranus", "Neptune", "Pluto"];
      return `
        <div class="modal-backdrop">
          <section class="kundali-modal image-view-modal planets-info-modal" role="dialog" aria-modal="true" aria-label="Planets">
            <div class="kundali-modal-header">
              <h2>Planets</h2>
              <button class="modal-close-button" id="closeImageModal" type="button" aria-label="${t("common.close")}">x</button>
            </div>
            <div class="planets-info-body">
              <div class="planets-info-tabs">
                ${tabs.map((tab) => `<button class="${tab.key === active.key ? "active" : ""}" data-planet-info-tab="${tab.key}" type="button">${tab.label}</button>`).join("")}
              </div>
              <div class="planets-info-content">
                <div class="planets-info-image">
                  <img src="${escapeHtml(active.src)}" alt="${escapeHtml(active.label)}" />
                </div>
                <div class="planets-placeholder">
                  <h3>Planets</h3>
                  <div class="planets-name-grid">
                    ${planets.map((planet) => `<button type="button">${planet}</button>`).join("")}
                  </div>
                  <div class="planet-placeholder-note">Placeholder</div>
                </div>
              </div>
            </div>
          </section>
        </div>
      `;
    }

    return `
      <div class="modal-backdrop">
        <section class="kundali-modal image-view-modal" role="dialog" aria-modal="true" aria-label="${escapeHtml(state.imageModal.title)}">
          <div class="kundali-modal-header">
            <h2>${escapeHtml(state.imageModal.title)}</h2>
            <button class="modal-close-button" id="closeImageModal" type="button" aria-label="${t("common.close")}">x</button>
          </div>
          <div class="image-view-modal-body">
            <img src="${escapeHtml(state.imageModal.src)}" alt="${escapeHtml(state.imageModal.title)}" />
          </div>
        </section>
      </div>
    `;
  }

  function chartLayoutModalHtml() {
    return `
      <div class="modal-backdrop">
        <section class="kundali-modal chart-layout-modal" role="dialog" aria-modal="true" aria-label="${t("chartLayout.title")}">
          <div class="kundali-modal-header">
            <h2>${t("chartLayout.title")}</h2>
            <button class="modal-close-button" id="closeChartLayoutModal" type="button" aria-label="${t("common.close")}">x</button>
          </div>
          <div class="chart-layout-body">
            <div class="chart-layout-toolbar">
              <label><span>${t("chartLayout.mode")}</span><select id="chartLayoutMode">
                <option value="sign" ${state.chartLayoutModal.mode === "sign" ? "selected" : ""}>${t("chartLayout.signPosition")}</option>
                <option value="planet" ${state.chartLayoutModal.mode === "planet" ? "selected" : ""}>${t("chartLayout.planetSlot")}</option>
              </select></label>
              <label><span>${t("chartLayout.house")}</span><select id="chartLayoutHouse">
                ${Array.from({ length: 12 }, (_, index) => index + 1).map((house) => `<option value="${house}" ${state.chartLayoutModal.house === house ? "selected" : ""}>H${house}</option>`).join("")}
              </select></label>
              <label><span>${state.chartLayoutModal.mode === "planet" ? t("chartLayout.slot") : t("chartLayout.slotPlanetOnly")}</span><select id="chartLayoutSlot" ${state.chartLayoutModal.mode !== "planet" ? "disabled" : ""}>
                ${Array.from({ length: CHART_LAYOUT_PLANET_SLOT_COUNT }, (_, index) => index + 1).map((slot) => `<option value="${slot}" ${state.chartLayoutModal.slot === slot ? "selected" : ""}>${slot}</option>`).join("")}
              </select></label>
              <button id="chartLayoutSave" type="button">${t("chartLayout.save")}</button>
            </div>
            <div class="chart-layout-workspace">
              <section>
                <h3>${t("chartLayout.editChart")}</h3>
                ${chartLayoutEditorChartHtml()}
              </section>
              <section>
                <h3>${t("chartLayout.previewChart")}</h3>
                ${chartLayoutPreviewChartHtml()}
              </section>
            </div>
            <textarea id="chartLayoutExportText" readonly>${escapeHtml(state.chartLayoutModal.message || "")}</textarea>
          </div>
        </section>
      </div>
    `;
  }

  function chartLayoutEditorChartHtml() {
    const selectedHouse = Number(state.chartLayoutModal.house) || 1;
    return `
      <div class="chart-layout-editor-frame">
        <img class="chart-layout-editor-image" src="./src/images/blank_kundali.jpg" alt="" />
        <svg class="chart-layout-editor-chart" id="chartLayoutEditorChart" viewBox="0 0 100 100" preserveAspectRatio="none" role="img" aria-label="${t("chartLayout.editChart")}">
          ${northDiamondSlots().map((slot) => {
            const isSelected = slot.house === selectedHouse;
            const signPosition = northSignPosition(slot.house, [slot.x, slot.y]);
            const planetSlots = isSelected ? Array.from({ length: CHART_LAYOUT_PLANET_SLOT_COUNT }, (_, index) => northPlanetSlot(slot.house, index)) : [];
            return `
              <g class="chart-layout-editor-house ${isSelected ? "selected" : ""}" data-layout-house="${slot.house}">
                <polygon points="${slot.points}"></polygon>
                ${isSelected ? `
                  <circle class="chart-layout-sign-marker" cx="${formatSvgNumber(signPosition[0])}" cy="${formatSvgNumber(signPosition[1])}" r="1.4"></circle>
                  <text x="${formatSvgNumber(signPosition[0])}" y="${formatSvgNumber(signPosition[1] - 2.4)}">${slot.house}</text>
                  ${planetSlots.map((position, index) => `<circle class="chart-layout-planet-marker ${state.chartLayoutModal.slot === index + 1 ? "selected" : ""}" cx="${formatSvgNumber(position.x)}" cy="${formatSvgNumber(position.y)}" r="1"></circle>`).join("")}
                ` : ""}
              </g>
            `;
          }).join("")}
        </svg>
      </div>
    `;
  }

  function chartLayoutPreviewChartHtml() {
    const bodies = ["Sun", "Moon", "Mars", "Mer", "Jup", "Ven"];
    const houses = northDiamondSlots().map((slot) => ({
      sign_index: slot.house,
      bodies: slot.house === Number(state.chartLayoutModal.house) ? bodies : [],
    }));
    return northChartHtml(houses, "layoutPreview");
  }

  function twoDChartLayoutModalHtml() {
    return `
      <div class="modal-backdrop">
        <section class="kundali-modal chart-layout-modal two-d-chart-layout-modal" role="dialog" aria-modal="true" aria-label="${t("twoDChartLayout.title")}">
          <div class="kundali-modal-header">
            <h2>${t("twoDChartLayout.title")}</h2>
            <button class="modal-close-button" id="closeTwoDChartLayoutModal" type="button" aria-label="${t("common.close")}">x</button>
          </div>
          <div class="chart-layout-body">
            <div class="chart-layout-toolbar">
              <label><span>${t("twoDChartLayout.layer")}</span><select id="twoDChartLayoutLayer">
                <option value="inner" ${state.twoDChartLayoutModal.layer === "inner" ? "selected" : ""}>${t("twoDChartLayout.inner")}</option>
                <option value="outer" ${state.twoDChartLayoutModal.layer === "outer" ? "selected" : ""}>${t("twoDChartLayout.outer")}</option>
              </select></label>
              <label><span>${t("chartLayout.mode")}</span><select id="twoDChartLayoutMode">
                <option value="sign" ${state.twoDChartLayoutModal.mode === "sign" ? "selected" : ""}>${t("chartLayout.signPosition")}</option>
                <option value="planet" ${state.twoDChartLayoutModal.mode === "planet" ? "selected" : ""}>${t("chartLayout.planetSlot")}</option>
              </select></label>
              <label><span>${t("chartLayout.house")}</span><select id="twoDChartLayoutHouse">
                ${Array.from({ length: 12 }, (_, index) => index + 1).map((house) => `<option value="${house}" ${state.twoDChartLayoutModal.house === house ? "selected" : ""}>H${house}</option>`).join("")}
              </select></label>
              <label><span>${state.twoDChartLayoutModal.mode === "planet" ? t("chartLayout.slot") : t("chartLayout.slotPlanetOnly")}</span><select id="twoDChartLayoutSlot" ${state.twoDChartLayoutModal.mode !== "planet" ? "disabled" : ""}>
                ${Array.from({ length: CHART_LAYOUT_PLANET_SLOT_COUNT }, (_, index) => index + 1).map((slot) => `<option value="${slot}" ${state.twoDChartLayoutModal.slot === slot ? "selected" : ""}>${slot}</option>`).join("")}
              </select></label>
              <button id="twoDChartLayoutSave" type="button">${t("chartLayout.save")}</button>
            </div>
            <div class="chart-layout-workspace">
              <section>
                <h3>${t("chartLayout.editChart")}</h3>
                ${twoDChartLayoutEditorChartHtml()}
              </section>
              <section>
                <h3>${t("chartLayout.previewChart")}</h3>
                ${twoDChartLayoutPreviewChartHtml()}
              </section>
            </div>
            <textarea id="chartLayoutExportText" readonly>${escapeHtml(state.twoDChartLayoutModal.message || "")}</textarea>
          </div>
        </section>
      </div>
    `;
  }

  function jaiminiChartLayoutModalHtml() {
    return `
      <div class="modal-backdrop">
        <section class="kundali-modal chart-layout-modal jaimini-chart-layout-modal" role="dialog" aria-modal="true" aria-label="${t("jaiminiChartLayout.title")}">
          <div class="kundali-modal-header">
            <h2>${t("jaiminiChartLayout.title")}</h2>
            <button class="modal-close-button" id="closeJaiminiChartLayoutModal" type="button" aria-label="${t("common.close")}">x</button>
          </div>
          <div class="jaimini-chart-layout-body">
            <div class="chart-layout-toolbar">
              <label><span>${t("chartLayout.mode")}</span><select id="jaiminiChartLayoutMode">
                <option value="sign" ${state.jaiminiChartLayoutModal.mode === "sign" ? "selected" : ""}>${t("chartLayout.signPosition")}</option>
                <option value="planet" ${state.jaiminiChartLayoutModal.mode === "planet" ? "selected" : ""}>${t("chartLayout.planetSlot")}</option>
              </select></label>
              <label><span>${t("chartLayout.house")}</span><select id="jaiminiChartLayoutHouse">
                ${Array.from({ length: 12 }, (_, index) => index + 1).map((house) => `<option value="${house}" ${state.jaiminiChartLayoutModal.house === house ? "selected" : ""}>H${house}</option>`).join("")}
              </select></label>
              <label><span>${state.jaiminiChartLayoutModal.mode === "planet" ? t("chartLayout.slot") : t("chartLayout.slotPlanetOnly")}</span><select id="jaiminiChartLayoutSlot" ${state.jaiminiChartLayoutModal.mode !== "planet" ? "disabled" : ""}>
                ${Array.from({ length: JAIMINI_CHART_LAYOUT_PLANET_SLOT_COUNT }, (_, index) => index + 1).map((slot) => `<option value="${slot}" ${state.jaiminiChartLayoutModal.slot === slot ? "selected" : ""}>${slot}</option>`).join("")}
              </select></label>
              <button id="jaiminiChartLayoutSave" type="button">${t("chartLayout.save")}</button>
            </div>
            <div class="chart-layout-workspace jaimini-chart-layout-workspace">
              <section>
                <h3>${t("chartLayout.editChart")}</h3>
                ${jaiminiChartLayoutEditorChartHtml()}
              </section>
              <section>
                <h3>${t("chartLayout.previewChart")}</h3>
                ${jaiminiChartLayoutPreviewChartHtml()}
              </section>
            </div>
            <textarea id="jaiminiChartLayoutExportText" readonly>${escapeHtml(state.jaiminiChartLayoutModal.message || "")}</textarea>
          </div>
        </section>
      </div>
    `;
  }

  function jaiminiChartLayoutEditorChartHtml() {
    const selectedHouse = Number(state.jaiminiChartLayoutModal.house) || 1;
    return `
      <div class="chart-layout-editor-frame jaimini-chart-layout-frame">
        <img class="chart-layout-editor-image" src="./src/images/blank_kundali.jpg" alt="" />
        <svg class="chart-layout-editor-chart" id="jaiminiChartLayoutEditorChart" viewBox="0 0 100 100" preserveAspectRatio="none" role="img" aria-label="${t("jaiminiChartLayout.title")}">
          ${jaiminiDiamondSlots().map((slot) => {
            const isSelected = slot.house === selectedHouse;
            const signPosition = jaiminiSignPosition(slot.house, [slot.x, slot.y]);
            const planetSlots = isSelected ? Array.from({ length: JAIMINI_CHART_LAYOUT_PLANET_SLOT_COUNT }, (_, index) => jaiminiPlanetSlot(slot.house, index)) : [];
            return `
              <g class="chart-layout-editor-house ${isSelected ? "selected" : ""}" data-jaimini-layout-house="${slot.house}">
                <polygon points="${slot.points}"></polygon>
                ${isSelected ? `
                  <circle class="chart-layout-sign-marker" cx="${formatSvgNumber(signPosition[0])}" cy="${formatSvgNumber(signPosition[1])}" r="1.4"></circle>
                  <text x="${formatSvgNumber(signPosition[0])}" y="${formatSvgNumber(signPosition[1] - 2.4)}">H${slot.house}</text>
                  ${planetSlots.map((position, index) => `<circle class="chart-layout-planet-marker ${state.jaiminiChartLayoutModal.slot === index + 1 ? "selected" : ""}" cx="${formatSvgNumber(position.x)}" cy="${formatSvgNumber(position.y)}" r="0.9"></circle>`).join("")}
                ` : ""}
              </g>
            `;
          }).join("")}
        </svg>
      </div>
    `;
  }

  function jaiminiChartLayoutPreviewChartHtml() {
    const selectedHouse = Number(state.jaiminiChartLayoutModal.house) || 1;
    const sampleBodies = ["Sun", "Moon", "Mars", "Mer", "Jup", "Ven", "Sat", "Rah", "Ket", "Gul", "Man", "Pad"];
    return `
      <div class="chart-layout-editor-frame jaimini-chart-layout-frame">
        <img class="chart-layout-editor-image" src="./src/images/blank_kundali.jpg" alt="" />
        <svg class="chart-layout-editor-chart" viewBox="0 0 100 100" preserveAspectRatio="none" role="img" aria-label="${t("chartLayout.previewChart")}">
          ${jaiminiDiamondSlots().map((slot) => {
            const signPosition = jaiminiSignPosition(slot.house, [slot.x, slot.y]);
            return `<text class="jaimini-layout-sign-text" x="${formatSvgNumber(signPosition[0])}" y="${formatSvgNumber(signPosition[1])}">${slot.house}</text>`;
          }).join("")}
          ${sampleBodies.map((body, index) => {
            const position = jaiminiPlanetSlot(selectedHouse, index);
            return `<text class="jaimini-layout-planet-text" x="${formatSvgNumber(position.x)}" y="${formatSvgNumber(position.y)}">${body}</text>`;
          }).join("")}
        </svg>
      </div>
    `;
  }

  function twoDChartLayoutEditorChartHtml() {
    const layer = state.twoDChartLayoutModal.layer === "outer" ? "outer" : "inner";
    const selectedHouse = Number(state.twoDChartLayoutModal.house) || 1;
    ensureTwoDLayoutHouse(layer, selectedHouse);
    const house = state.twoDChartLayout.north_2d.layers[layer].houses[String(selectedHouse)];
    return `
      <div class="chart-layout-editor-frame two-d-chart-layout-frame">
        <img class="chart-layout-editor-image" src="./src/images/double_blank_chart.png" alt="" />
        <svg class="chart-layout-editor-chart" id="twoDChartLayoutEditorChart" viewBox="0 0 100 100" preserveAspectRatio="none" role="img" aria-label="${t("twoDChartLayout.title")}">
          <circle class="chart-layout-sign-marker" cx="${formatSvgNumber(house.sign.x)}" cy="${formatSvgNumber(house.sign.y)}" r="1.5"></circle>
          <text x="${formatSvgNumber(house.sign.x)}" y="${formatSvgNumber(house.sign.y - 2.4)}">${layer === "inner" ? "I" : "O"} H${selectedHouse}</text>
          ${house.planets.map((position, index) => `<circle class="chart-layout-planet-marker ${state.twoDChartLayoutModal.slot === index + 1 ? "selected" : ""}" cx="${formatSvgNumber(position.x)}" cy="${formatSvgNumber(position.y)}" r="1"></circle>`).join("")}
        </svg>
      </div>
    `;
  }

  function twoDChartLayoutPreviewChartHtml() {
    const selectedHouse = Number(state.twoDChartLayoutModal.house) || 1;
    const sampleBodies = ["Sun", "Moon", "Mars", "Mer", "Jup", "Ven"];
    return `
      <div class="chart-layout-editor-frame two-d-chart-layout-frame">
        <img class="chart-layout-editor-image" src="./src/images/double_blank_chart.png" alt="" />
        <svg class="chart-layout-editor-chart" viewBox="0 0 100 100" preserveAspectRatio="none" role="img" aria-label="${t("chartLayout.previewChart")}">
          ${["outer", "inner"].map((layer) => {
            ensureTwoDLayoutHouse(layer, selectedHouse);
            const house = state.twoDChartLayout.north_2d.layers[layer].houses[String(selectedHouse)];
            return `
              <text class="two-d-layout-${layer}-text" x="${formatSvgNumber(house.sign.x)}" y="${formatSvgNumber(house.sign.y)}">${layer === "inner" ? "D1" : "Tr"} ${selectedHouse}</text>
              ${sampleBodies.map((body, index) => {
                const position = house.planets[index] || { x: 50, y: 50 };
                return `<text class="two-d-layout-${layer}-text" x="${formatSvgNumber(position.x)}" y="${formatSvgNumber(position.y)}">${body}</text>`;
              }).join("")}
            `;
          }).join("")}
        </svg>
      </div>
    `;
  }

  function planetInfoTabs() {
    return [
      { key: "abodes", label: "Abodes", src: "./src/images/PlanetoryAbodes.jpg" },
      { key: "colors", label: "Colors", src: "./src/images/Planets_And_Colors.jpg" },
      { key: "tastes", label: "Tastes", src: "./src/images/Planets_Tastes.jpg" },
    ];
  }

  function panchangInfoTabs() {
    return [
      { key: "tithi", label: t("panchangInfo.tithi") },
      { key: "var", label: t("panchangInfo.var") },
      { key: "nakshatra", label: t("panchangInfo.nakshatra") },
      { key: "yog", label: t("panchangInfo.yog") },
      { key: "karan", label: t("panchangInfo.karan") },
    ];
  }

  function panchangInfoTabContentHtml(active) {
    if (active.key === "nakshatra") return panchangNakshatraReferenceHtml(active.label);
    if (active.key === "yog") return panchangYogReferenceHtml(active.label);
    return `
      <div class="panchang-info-placeholder">
        <h3>${escapeHtml(active.label)}</h3>
        <p>${t("panchangInfo.placeholder")}</p>
      </div>
    `;
  }

  function panchangYogReferenceHtml(title) {
    if (state.panchangInfo.yogsLoading) {
      return `
        <div class="panchang-info-placeholder">
          <h3>${escapeHtml(title)}</h3>
          <p>${t("common.loading")}</p>
        </div>
      `;
    }

    if (state.panchangInfo.yogsError) {
      return `
        <div class="panchang-info-placeholder">
          <h3>${escapeHtml(title)}</h3>
          <p class="panchang-info-error">${state.panchangInfo.yogsErrorKey ? t(state.panchangInfo.yogsErrorKey) : escapeHtml(state.panchangInfo.yogsError)}</p>
        </div>
      `;
    }

    const rows = Array.isArray(state.panchangInfo.yogs) ? state.panchangInfo.yogs : [];
    if (!rows.length) {
      return `
        <div class="panchang-info-placeholder">
          <h3>${escapeHtml(title)}</h3>
          <p>${t("panchangInfo.placeholder")}</p>
        </div>
      `;
    }

    const columns = [
      ["yog_number", "panchangInfo.yogNumber"],
      ["sanskrit_name", "panchangInfo.sanskritName"],
      ["english_name", "panchangInfo.englishName"],
      ["marathi_name", "panchangInfo.marathiName"],
      ["devta", "panchangInfo.devta"],
      ["ruling_planet", "panchangInfo.rulingPlanet"],
      ["avyogi_planet", "panchangInfo.avyogiPlanet"],
      ["start_degree", "panchangInfo.startDegree"],
      ["end_degree", "panchangInfo.endDegree"],
      ["start_minutes", "panchangInfo.startMinutes"],
      ["end_minutes", "panchangInfo.endMinutes"],
      ["quality", "panchangInfo.quality"],
    ];

    return `
      <div class="panchang-yog-table-panel">
        <div class="panchang-yog-table-wrap">
          <table class="panchang-yog-table">
            <thead>
              <tr>${columns.map(([, labelKey]) => `<th>${t(labelKey)}</th>`).join("")}</tr>
            </thead>
            <tbody>
              ${rows.map((row) => `
                <tr class="${isBadPanchangYog(row) ? "bad-yog" : ""}">
                  ${columns.map(([key]) => `<td>${panchangYogValue(row, key)}</td>`).join("")}
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  function panchangYogValue(row, key) {
    if (key === "ruling_planet" || key === "avyogi_planet") {
      return escapeHtml(planetDetailName(row?.[key] || ""));
    }
    const value = row?.[key];
    if (value === null || value === undefined || value === "") return "-";
    if (key === "start_degree" || key === "end_degree") return escapeHtml(Number(value).toFixed(2));
    return escapeHtml(value);
  }

  function isBadPanchangYog(row) {
    return String(row?.quality || "").trim().toLowerCase() === "bad";
  }

  function panchangNakshatraReferenceHtml(title) {
    if (state.panchangInfo.nakshatrasLoading) {
      return `
        <div class="panchang-info-placeholder">
          <h3>${escapeHtml(title)}</h3>
          <p>${t("common.loading")}</p>
        </div>
      `;
    }

    if (state.panchangInfo.nakshatrasError) {
      return `
        <div class="panchang-info-placeholder">
          <h3>${escapeHtml(title)}</h3>
          <p class="panchang-info-error">${state.panchangInfo.nakshatrasErrorKey ? t(state.panchangInfo.nakshatrasErrorKey) : escapeHtml(state.panchangInfo.nakshatrasError)}</p>
        </div>
      `;
    }

    const rows = filteredPanchangNakshatraRows();
    const columns = [
      ["index", "panchangInfo.nakshatraNumber"],
      ["name", "panchangInfo.nakshatraName"],
      ["lord", "panchangInfo.nakshatraLord"],
      ["pada", "panchangInfo.pada"],
      ["sign", "panchangInfo.sign"],
      ["sign_lord", "panchangInfo.signLord"],
      ["navamsa_sign", "panchangInfo.navamsaSign"],
      ["navamsa_lord", "panchangInfo.navamsaLord"],
      ["pada_lord", "panchangInfo.padaLord"],
      ["deity", "panchangInfo.deity"],
      ["gana", "panchangInfo.gana"],
      ["nadi", "panchangInfo.nadi"],
      ["span", "panchangInfo.span"],
    ];

    return `
      <div class="panchang-yog-table-panel panchang-nakshatra-table-panel">
        ${panchangNakshatraFiltersHtml()}
        <div class="panchang-yog-table-wrap">
          <table class="panchang-yog-table panchang-nakshatra-table">
            <thead>
              <tr>${columns.map(([, labelKey]) => `<th>${t(labelKey)}</th>`).join("")}</tr>
            </thead>
            <tbody>
              ${rows.length ? rows.map((row) => `
                <tr>
                  ${columns.map(([key]) => `<td>${panchangNakshatraValue(row, key)}</td>`).join("")}
                </tr>
              `).join("") : `<tr><td colspan="${columns.length}">${t("panchangInfo.noNakshatraRows")}</td></tr>`}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  function panchangNakshatraFiltersHtml() {
    const rows = flattenedPanchangNakshatraRows();
    const filters = [
      ["lord", "panchangInfo.nakshatraLord"],
      ["sign", "panchangInfo.sign"],
      ["sign_lord", "panchangInfo.signLord"],
      ["navamsa_lord", "panchangInfo.navamsaLord"],
      ["pada_lord", "panchangInfo.padaLord"],
      ["gana", "panchangInfo.gana"],
    ];
    return `
      <div class="panchang-nakshatra-filters">
        ${filters.map(([key, labelKey]) => `
          <label>
            <span>${t(labelKey)}</span>
            <select data-panchang-nakshatra-filter="${key}">
              <option value="">${t("panchangInfo.all")}</option>
              ${uniqueNakshatraFilterValues(rows, key).map((value) => `<option value="${escapeHtml(value)}" ${state.panchangInfo.nakshatraFilters[key] === value ? "selected" : ""}>${escapeHtml(panchangNakshatraFilterLabel(key, value))}</option>`).join("")}
            </select>
          </label>
        `).join("")}
      </div>
    `;
  }

  function flattenedPanchangNakshatraRows() {
    const nakshatras = Array.isArray(state.panchangInfo.nakshatras) ? state.panchangInfo.nakshatras : [];
    return nakshatras.flatMap((nakshatra) => {
      const padas = Array.isArray(nakshatra.padas) ? nakshatra.padas : [];
      return padas.map((pada) => ({ ...nakshatra, ...pada, padas: undefined, nakshatra_span: nakshatra.span }));
    });
  }

  function filteredPanchangNakshatraRows() {
    const filters = state.panchangInfo.nakshatraFilters;
    return flattenedPanchangNakshatraRows().filter((row) => {
      return Object.entries(filters).every(([key, value]) => !value || String(row[key] || "") === value);
    });
  }

  function uniqueNakshatraFilterValues(rows, key) {
    return Array.from(new Set(rows.map((row) => row[key]).filter((value) => value !== undefined && value !== null && value !== "")))
      .sort((left, right) => String(left).localeCompare(String(right)));
  }

  function panchangNakshatraFilterLabel(key, value) {
    if (["lord", "sign_lord", "navamsa_lord", "pada_lord"].includes(key)) return planetDetailName(value);
    if (["sign", "navamsa_sign"].includes(key)) return localizedSignValue(value);
    return value;
  }

  function panchangNakshatraValue(row, key) {
    const value = key === "span" ? row.nakshatra_span : row?.[key];
    if (value === null || value === undefined || value === "") return "-";
    if (["lord", "sign_lord", "navamsa_lord", "pada_lord"].includes(key)) return escapeHtml(planetDetailName(value));
    if (["sign", "navamsa_sign"].includes(key)) return escapeHtml(localizedSignValue(value));
    if (key === "name") return escapeHtml(localizedNakshatraName(value));
    return escapeHtml(value);
  }

  function kundaliModalHtml() {
    const form = state.kundaliForm.form;
    return `
      <div class="modal-backdrop">
        <section class="kundali-modal new-kundali-modal" role="dialog" aria-modal="true" aria-label="${t("kundali.newTitle")}">
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
              <th>${t("planetTable.longitude")}</th>
              <th>${t("planetTable.nakshatra")}</th>
              <th>${t("planetTable.nakshatraLord")}</th>
              <th>${t("planetTable.pada")}</th>
              <th>${t("planetTable.padaLord")}</th>
              <th>${t("planetTable.retro")}</th>
            </tr>
          </thead>
          <tbody>
            ${positions.map(savedPlanetaryDetailRowHtml).join("")}
          </tbody>
        </table>
      </div>
    `;
  }

  function savedPlanetaryDetailHtml() {
    return savedPlanetaryDetailForHtml(state.jatakView);
  }

  function savedPlanetaryDetailForHtml(view) {
    if (view.loading || view.d1Loading) {
      return `<div class="chart-state">${t("chart.loading")}</div>`;
    }

    if (view.error) {
      return `<div class="chart-state error">${view.errorKey ? t(view.errorKey) : escapeHtml(view.error)}</div>`;
    }

    const positions = savedPlanetaryDetailPositions(view);
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
              <th>${t("planetTable.longitude")}</th>
              <th>${t("planetTable.nakshatra")}</th>
              <th>${t("planetTable.nakshatraLord")}</th>
              <th>${t("planetTable.pada")}</th>
              <th>${t("planetTable.padaLord")}</th>
              <th>${t("planetTable.retro")}</th>
            </tr>
          </thead>
          <tbody>
            ${positions.map(savedPlanetaryDetailRowHtml).join("")}
          </tbody>
        </table>
      </div>
    `;
  }

  function savedPlanetaryDetailPositions(view) {
    const fallbackPositions = view.positions?.positions || view.positions || {};
    const fallbackByPlanet = new Map(
      Object.values(fallbackPositions).map((position) => [normalizedPlanetKey(position.name || position.body || ""), position]),
    );
    const chartPlacements = view.d1?.placements || {};
    const sourcePositions = Object.keys(chartPlacements).length
      ? Object.entries(chartPlacements).map(([name, placement]) => {
          const fallback = fallbackByPlanet.get(normalizedPlanetKey(name)) || {};
          return {
            ...fallback,
            ...placement,
            name: placement.name || placement.body || fallback.name || fallback.body || name,
          };
        })
      : Object.values(fallbackPositions);
    return sortPlanetPositions(sourcePositions.filter((position) => shouldShowPlanet(position.name || position.body || "")));
  }

  function savedPlanetaryDetailRowHtml(position) {
    const nakshatraLord = position.nakshatra_lord || position.nakshatra_swami || position.star_lord || nakshatraLordFromDetails(position);
    const padaLord =
      position.pada_lord ||
      position.nakshatra_pada_lord ||
      position.padaLord ||
      position.pada_lord_name ||
      position.navamsa_lord ||
      padaLordFromDetails(position);
    return `
      <tr>
        <td>${localizedPlanetName(position.name || position.body || "")}${position.retrograde ? `<sup>*</sup>` : ""}</td>
        <td>${localizedSignName(position.sign_index)}</td>
        <td>${formatDegreeDms(position.degree_in_sign)}</td>
        <td>${formatDegreeDms(position.longitude)}</td>
        <td>${localizedNakshatraName(position.nakshatra)}</td>
        <td>${planetDetailName(nakshatraLord)}</td>
        <td>${position.pada || "-"}</td>
        <td>${planetDetailName(padaLord)}</td>
        <td>${position.retrograde ? t("common.yes") : t("common.no")}</td>
      </tr>
    `;
  }

  function horaHtml() {
    if (state.hora.loading) return `<div class="chart-state">${t("hora.loading")}</div>`;
    if (state.hora.error) return `<div class="chart-state error">${state.hora.error}</div>`;
    if (!state.hora.data) return `<div class="chart-state">${t("hora.waiting")}</div>`;

    const data = state.hora.data;
    const current = currentHoraFromData(data);
    return `
      <div class="hora-panel">
        <div class="hora-summary">
          <div><span>${t("hora.weekdayLord")}</span><strong>${planetDetailName(data.weekday_lord || data.weekday_lord_name)}</strong></div>
          <div><span>${t("hora.currentHora")}</span><strong>${current ? planetDetailName(current.hora_lord || current.hora_lord_name) : "-"}</strong></div>
          <div><span>${t("kundali.latitude")}</span><strong>${displayValue(data.latitude)}</strong></div>
          <div><span>${t("kundali.longitude")}</span><strong>${displayValue(data.longitude)}</strong></div>
        </div>
        <div class="hora-table-wrap">
          <table class="hora-table">
            <thead>
              <tr>
                <th>#</th>
                <th>${t("hora.period")}</th>
                <th>${t("hora.lord")}</th>
                <th>${t("hora.start")}</th>
                <th>${t("hora.end")}</th>
              </tr>
            </thead>
            <tbody>
              ${(data.horas || []).map(horaRowHtml).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  function horaRowHtml(hora) {
    return `
      <tr class="${hora.period === "night" ? "night" : "day"} ${hora.is_current_hora ? "active" : ""}">
        <td>${displayValue(hora.overall_hora_number || hora.hora_number)}</td>
        <td>${escapeHtml(toTitleCase(hora.period || ""))}</td>
        <td>${planetDetailName(hora.hora_lord || hora.hora_lord_name)}</td>
        <td>${formatTime(hora.start_time)}</td>
        <td>${formatTime(hora.end_time)}</td>
      </tr>
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
    const options = ["5 Years", "1 Year", "Month", "Day", "Hour", "10 Min", "Minute"];
    const sourceView = transitSourceView();
    const birthDate = formatDisplayDateOnly(sourceView.dateTimeLabel) || formatDisplayDateOnly(sourceView.birthDetails?.date) || "-";
    return `
      <div class="modal-backdrop">
        <section class="kundali-modal transit-gochar-modal" role="dialog" aria-modal="true" aria-label="${t("kundaliSection.viewTransit")}">
          <div class="kundali-modal-header">
            <h2>${t("kundaliSection.viewTransit")}</h2>
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
                  <strong>${escapeHtml(formatDisplayDateOnly(state.transitModal.workingDate))}</strong>
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
    const sourceView = transitSourceView();
    if (!sourceView.d1 || !state.transitModal.data) return `<div class="chart-state">${t("chart.waiting")}</div>`;
    const natalHouses = buildSavedChartHouses(sourceView.d1);
    return `
      <div class="transit-gochar-content">
        ${twoDTransitChartHtml(natalHouses, buildTransitOverNatalHouses(state.transitModal.data, nativeAscSignIndex(natalHouses)))}
        ${transitDegreeComparisonHtml()}
      </div>
    `;
  }

  function transitSourceView() {
    return state.transitModal.source === "search-kundali" ? (state.searchKundali.selected || {}) : state.jatakView;
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
        ...position,
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

  function twoDTransitChartHtml(natalHouses, transitHouses) {
    const layout = normalizeTwoDChartLayout(state.twoDChartLayout || defaultTwoDChartLayout());
    state.twoDChartLayout = layout;
    const image = layout.north_2d?.image || "double_blank_chart.png";
    const imageUrl = `./src/images/${escapeHtml(image)}`;
    return `
      <div class="double-diamond-frame two-d-transit-frame" style="background-image: url('${imageUrl}');">
        <img class="two-d-transit-image" src="${imageUrl}" alt="" />
        <svg class="two-d-transit-overlay" viewBox="0 0 100 100" preserveAspectRatio="none" role="img" aria-label="Transit and natal chart">
          ${twoDTransitLayerHtml("outer", transitHouses)}
          ${twoDTransitLayerHtml("inner", natalHouses)}
        </svg>
      </div>
    `;
  }

  function twoDTransitLayerHtml(layer, houses) {
    return `
      <g class="two-d-transit-layer two-d-transit-${layer}">
        ${Array.from({ length: 12 }, (_, index) => {
          const houseNumber = index + 1;
          const house = houses?.[index] || { sign_index: "", bodies: [] };
          const layoutHouse = ensureTwoDLayoutHouse(layer, houseNumber);
          return `
            <g>
              ${twoDTransitSignHtml(layoutHouse.sign, house.sign_index, layer)}
              ${twoDTransitBodiesHtml(layoutHouse.planets, house.bodies, layer)}
            </g>
          `;
        }).join("")}
      </g>
    `;
  }

  function twoDTransitSignHtml(position, signIndex, layer) {
    const x = Number(position?.x ?? 50);
    const y = Number(position?.y ?? 50);
    return `<text class="two-d-transit-sign ${layer}" x="${formatSvgNumber(x)}" y="${formatSvgNumber(y)}">${signIndex || ""}</text>`;
  }

  function twoDTransitBodiesHtml(slots, bodies, layer) {
    const safeSlots = Array.isArray(slots) ? slots : [];
    const visibleLimit = Math.max(1, safeSlots.length || CHART_LAYOUT_PLANET_SLOT_COUNT);
    const visibleBodies = bodies.slice(0, visibleLimit);
    const overflowCount = bodies.length - visibleBodies.length;
    const labels = overflowCount > 0 ? [...visibleBodies.slice(0, visibleLimit - 1), `+${overflowCount + 1}`] : visibleBodies;
    return labels
      .map((body, index) => {
        const fallback = safeSlots[safeSlots.length - 1] || { x: 50, y: 50 };
        const position = safeSlots[index] || fallback;
        return twoDTransitPlanetLabelHtml(body, Number(position.x ?? 50), Number(position.y ?? 50), layer);
      })
      .join("");
  }

  function twoDTransitPlanetLabelHtml(body, x, y, layer) {
    if (typeof body === "string") {
      return `<text class="two-d-transit-planet ${layer} overflow" x="${formatSvgNumber(x)}" y="${formatSvgNumber(y)}">${body}</text>`;
    }

    const planetName = shortPlanetName(body.name);
    const degree = planetDegreeLabel(body.degree);
    const colorClass = layer === "outer" ? gocharPlanetColorClass(body.name) : "planet-natal";
    const retrogradeMark = body.retrograde ? `<tspan class="planet-degree-sup" dx="0.12" dy="-1">*</tspan>` : "";
    const degreeDy = body.retrograde ? "0" : "-1";
    const tooltip = encodeURIComponent(planetTooltipHtml(body, layer));
    return `
      <text class="two-d-transit-planet ${layer} ${colorClass}" x="${formatSvgNumber(x)}" y="${formatSvgNumber(y)}" data-planet-tooltip="${tooltip}" data-tooltip-layer="${layer}">
        <tspan>${planetName}</tspan>${retrogradeMark}${degree ? `<tspan class="planet-degree-sup" dx="0.25" dy="${degreeDy}">${degree}</tspan>` : ""}
      </text>
    `;
  }

  function northDiamondSlots() {
    const fallbackSlots = [
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
    return fallbackSlots.map((slot) => ({
      ...slot,
      points: northLayoutHouse(slot.house)?.points || slot.points,
    }));
  }

  function northLayoutHouse(house) {
    return state.chartLayout?.north?.houses?.[String(house)] || null;
  }

  function northSignPosition(house, fallback) {
    const sign = northLayoutHouse(house)?.sign || {};
    return [
      Number(sign.x ?? fallback[0]),
      Number(sign.y ?? fallback[1]),
    ];
  }

  function northPlanetSlot(house, index) {
    const layoutHouse = northLayoutHouse(house);
    const slots = layoutHouse?.planets || [];
    const slot = slots[index] || slots[slots.length - 1] || null;
    if (slot) {
      return {
        x: Number(slot.x),
        y: Number(slot.y),
      };
    }
    const fallback = northDiamondSlots().find((item) => item.house === house) || { x: 50, y: 50 };
    return {
      x: fallback.x,
      y: fallback.y + 4 + index * 4.6,
    };
  }

  function jaiminiDiamondSlots() {
    return northDiamondSlots().map((slot) => {
      const layoutHouse = jaiminiLayoutHouse(slot.house);
      return {
        ...slot,
        points: layoutHouse?.points || slot.points,
      };
    });
  }

  function jaiminiLayoutHouse(house) {
    return state.jaiminiChartLayout?.jaimini?.houses?.[String(house)] || null;
  }

  function jaiminiSignPosition(house, fallback) {
    const sign = jaiminiLayoutHouse(house)?.sign || {};
    return [
      Number(sign.x ?? fallback[0]),
      Number(sign.y ?? fallback[1]),
    ];
  }

  function jaiminiPlanetSlot(house, index) {
    const layoutHouse = jaiminiLayoutHouse(house);
    const slots = layoutHouse?.planets || [];
    const slot = slots[index] || slots[slots.length - 1] || null;
    if (slot) {
      return {
        x: Number(slot.x),
        y: Number(slot.y),
      };
    }
    const fallback = northDiamondSlots().find((item) => item.house === house) || { x: 50, y: 50 };
    return {
      x: fallback.x,
      y: fallback.y + 4 + index * 3.2,
    };
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
    const position = northSignPosition(slot.house, [slot.x, slot.y]);
    const x = position[0] * scale + offset;
    const y = position[1] * scale + offset;
    return `<text class="double-diamond-sign ${layer}" x="${formatSvgNumber(x)}" y="${formatSvgNumber(y)}">${houseNumber || ""}</text>`;
  }

  function doubleDiamondBodiesHtml(slot, bodies, layer, scale = 1, offset = 0) {
    if (layer === "outer") return doubleDiamondGroupedBodiesHtml(slot, bodies, scale, offset);

    const visibleLimit = layer === "inner" ? 4 : 5;
    const visibleBodies = bodies.slice(0, visibleLimit);
    const overflowCount = bodies.length - visibleBodies.length;
    const labels = overflowCount > 0 ? [...visibleBodies, `+${overflowCount}`] : visibleBodies;
    const outerBodySlot = {
      1: [50, 11, 1],
      2: [23, 12, 1],
      3: [9, 38, 1],
      4: [23, 58, 1],
      5: [8, 82, 1],
      6: [23, 88, -1],
      7: [50, 90, -1],
      8: [77, 88, -1],
      9: [92, 82, 1],
      10: [77, 58, 1],
      11: [91, 38, 1],
      12: [77, 12, 1],
    };
    const innerBodySlot = {
      1: [50, 13, 1],
      2: [25, 14, 1],
      3: [10, 34, 1],
      4: [25, 56, 1],
      5: [10, 80, 1],
      6: [25, 86, -1],
      7: [46, 88, -1],
      8: [75, 86, -1],
      9: [90, 80, 1],
      10: [75, 56, 1],
      11: [90, 34, 1],
      12: [75, 14, 1],
    };
    const bodySlot = (layer === "outer" ? outerBodySlot : innerBodySlot)[slot.house] || [slot.x, slot.y + 4, 1];
    const [baseX, baseY, direction] = bodySlot;
    const step = layer === "inner" ? 4.2 : 3.7;

    return labels
      .map((body, index) => {
        const x = baseX * scale + offset;
        const y = (baseY + direction * index * step) * scale + offset;
        return doubleDiamondPlanetLabelHtml(body, x, y, layer);
      })
      .join("");
  }

  function doubleDiamondGroupedBodiesHtml(slot, bodies, scale = 1, offset = 0) {
    const visibleLimit = 5;
    const visibleBodies = bodies.slice(0, visibleLimit);
    const overflowCount = bodies.length - visibleBodies.length;
    const rows = groupedOuterPlanetRows(visibleBodies);
    if (overflowCount > 0) {
      if (!rows.length) rows.push([]);
      rows[rows.length - 1].push(`+${overflowCount}`);
    }
    const bodySlot = {
      1: [50, 12, 1],
      2: [24, 13, 1],
      3: [11, 29, 1],
      4: [24, 59, 1],
      5: [11, 81, 1],
      6: [24, 87, -1],
      7: [50, 89, -1],
      8: [76, 87, -1],
      9: [89, 81, 1],
      10: [76, 59, 1],
      11: [84, 28, 1],
      12: [76, 13, 1],
    }[slot.house] || [slot.x, slot.y + 4, 1];
    const [baseX, baseY, direction] = bodySlot;
    const step = 3.45;

    return rows
      .filter((row) => row.length)
      .map((row, rowIndex) => {
        const x = baseX * scale + offset;
        const y = (baseY + direction * rowIndex * step) * scale + offset;
        return `
          <text class="double-diamond-planet outer grouped" x="${formatSvgNumber(x)}" y="${formatSvgNumber(y)}">
            ${row.map((body, index) => groupedPlanetTspanHtml(body, index)).join("")}
          </text>
        `;
      })
      .join("");
  }

  function groupedOuterPlanetRows(bodies) {
    if (bodies.length >= 4) return [bodies.slice(0, 2), bodies.slice(2, 4), bodies.slice(4)].filter((row) => row.length);
    if (bodies.length === 3) return [bodies.slice(0, 2), bodies.slice(2)];
    if (bodies.length === 2) return [[bodies[0]], [bodies[1]]];
    return bodies.length ? [bodies] : [];
  }

  function groupedPlanetTspanHtml(body, index) {
    const prefix = index > 0 ? `<tspan class="planet-separator">, </tspan>` : "";
    if (typeof body === "string") return `${prefix}<tspan class="double-diamond-planet-part overflow">${body}</tspan>`;
    const planetName = shortPlanetName(body.name);
    const degree = planetDegreeLabel(body.degree);
    const colorClass = gocharPlanetColorClass(body.name);
    const tooltip = encodeURIComponent(planetTooltipHtml(body, "outer"));
    return `${prefix}<tspan class="double-diamond-planet-part ${colorClass}" data-planet-tooltip="${tooltip}" data-tooltip-layer="outer">${planetName}${degree ? `<tspan class="planet-degree-sup" dx="0.15" dy="-1.05">${degree}</tspan>` : ""}</tspan>`;
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
    const tooltip = encodeURIComponent(planetTooltipHtml(body, layer));
    return `
      <g class="planet-tooltip-host">
        <text class="double-diamond-planet ${layer} ${colorClass}" x="${formatSvgNumber(x)}" y="${formatSvgNumber(y)}" data-planet-tooltip="${tooltip}" data-tooltip-layer="${layer}">
          <tspan>${planetName}</tspan>${retrogradeMark}${degree ? `<tspan class="planet-degree-sup" dx="0.3" dy="${degreeDy}">${degree}</tspan>` : ""}
        </text>
      </g>
    `;
  }

  function planetTooltipHtml(body, layer) {
    const details = layer === "outer" ? body : birthPositionByPlanet().get(normalizedPlanetKey(body.name)) || body;
    const title = layer === "outer" ? "Transit" : "Birth Chart";
    return `
      <strong>${escapeHtml(title)}: ${escapeHtml(localizedPlanetName(details.name || details.body || body.name))}</strong>
      <span>${escapeHtml(signDetailName(details.sign_index))} ${escapeHtml(formatDegreeDms(details.degree_in_sign ?? details.degree))}</span>
      <span>Nak: ${escapeHtml(nakshatraDetailName(details.nakshatra))}</span>
      <span>Lord: ${escapeHtml(planetDetailName(details.nakshatra_lord || details.nakshatra_swami || details.star_lord || nakshatraLordFromDetails(details)))}</span>
      <span>Sub: ${escapeHtml(planetDetailName(details.sub_lord || details.subLord || details.sub_lord_name || subLordFromDetails(details)))}</span>
    `;
  }

  function planetDetailName(value) {
    if (value === null || value === undefined || value === "") return "-";
    return localizedPlanetFullName(value);
  }

  function nakshatraLordFromDetails(details) {
    const index = Number(details?.nakshatra_index) || nakshatraIndexFromName(details?.nakshatra);
    if (!index) return "";
    return vimshottariPlanetSequence()[(index - 1) % 9];
  }

  function subLordFromDetails(details) {
    const longitude = Number(details?.longitude);
    const fallbackLongitude = zodiacLongitude(details?.sign_index, details?.degree_in_sign ?? details?.degree);
    const absoluteLongitude = Number.isFinite(longitude) ? longitude : fallbackLongitude;
    if (!Number.isFinite(absoluteLongitude)) return "";
    const nakshatraIndex = Number(details?.nakshatra_index) || Math.floor(((absoluteLongitude % 360) + 360) % 360 / (40 / 3)) + 1;
    const lordIndex = (nakshatraIndex - 1) % 9;
    const degreesPerNakshatra = 40 / 3;
    const positionInNakshatra = (((absoluteLongitude % degreesPerNakshatra) + degreesPerNakshatra) % degreesPerNakshatra);
    const totalSeconds = degreesPerNakshatra * 3600;
    let cursor = 0;
    const target = positionInNakshatra * 3600;
    const sequence = vimshottariPlanetSequence();
    const years = vimshottariPlanetYears();

    for (let step = 0; step < sequence.length; step += 1) {
      const planetIndex = (lordIndex + step) % sequence.length;
      cursor += totalSeconds * (years[sequence[planetIndex]] / 120);
      if (target <= cursor) return sequence[planetIndex];
    }

    return sequence[lordIndex];
  }

  function padaLordFromDetails(details) {
    const longitude = Number(details?.longitude);
    const fallbackLongitude = zodiacLongitude(details?.sign_index, details?.degree_in_sign ?? details?.degree);
    const absoluteLongitude = Number.isFinite(longitude) ? longitude : fallbackLongitude;
    if (!Number.isFinite(absoluteLongitude)) return "";
    const normalizedLongitude = ((absoluteLongitude % 360) + 360) % 360;
    const navamsaSignIndex = (Math.floor(normalizedLongitude / (10 / 3)) % 12) + 1;
    return signLordFromIndex(navamsaSignIndex);
  }

  function signLordFromIndex(signIndex) {
    const lordBySign = {
      1: "mars",
      2: "venus",
      3: "mercury",
      4: "moon",
      5: "sun",
      6: "mercury",
      7: "venus",
      8: "mars",
      9: "jupiter",
      10: "saturn",
      11: "saturn",
      12: "jupiter",
    };
    return lordBySign[Number(signIndex)] || "";
  }

  function vimshottariPlanetSequence() {
    return ["ketu", "venus", "sun", "moon", "mars", "rahu", "jupiter", "saturn", "mercury"];
  }

  function vimshottariPlanetYears() {
    return {
      ketu: 7,
      venus: 20,
      sun: 6,
      moon: 10,
      mars: 7,
      rahu: 18,
      jupiter: 16,
      saturn: 19,
      mercury: 17,
    };
  }

  function nakshatraIndexFromName(name) {
    const normalized = String(name || "").trim().toLowerCase().replace(/\s+/g, " ");
    const names = [
      "ashwini",
      "bharani",
      "krittika",
      "rohini",
      "mrigashira",
      "ardra",
      "punarvasu",
      "pushya",
      "ashlesha",
      "magha",
      "purva phalguni",
      "uttara phalguni",
      "hasta",
      "chitra",
      "swati",
      "vishakha",
      "anuradha",
      "jyeshtha",
      "mula",
      "purva ashadha",
      "uttara ashadha",
      "shravana",
      "dhanishta",
      "shatabhisha",
      "purva bhadrapada",
      "uttara bhadrapada",
      "revati",
    ];
    const index = names.indexOf(normalized);
    return index >= 0 ? index + 1 : 0;
  }

  function signDetailName(value) {
    if (value === null || value === undefined || value === "") return "-";
    return localizedSignName(value);
  }

  function nakshatraDetailName(value) {
    if (value === null || value === undefined || value === "") return "-";
    return localizedNakshatraName(value);
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
    const sourceView = transitSourceView();
    const savedPositions = sourceView.positions?.positions || sourceView.positions || {};
    Object.values(savedPositions).forEach((position) => {
      const key = normalizedPlanetKey(position.name || position.body || "");
      if (!key) return;
      map.set(key, {
        ...position,
        name: position.name || position.body || "",
        degree_in_sign: position.degree_in_sign,
        sign_index: position.sign_index,
      });
    });

    Object.entries(sourceView.d1?.placements || {}).forEach(([name, placement]) => {
      const key = normalizedPlanetKey(name);
      if (!key || map.has(key)) return;
      map.set(key, {
        ...placement,
        name,
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
    const sourceView = nakshatraNaadiSourceView();
    if (sourceView.nakshatraNaadiLoading) {
      return `<div class="chart-state">${t("nakshatraNaadi.loading")}</div>`;
    }

    if (sourceView.nakshatraNaadiError) {
      return `<div class="chart-state error">${sourceView.nakshatraNaadiErrorKey ? t(sourceView.nakshatraNaadiErrorKey) : sourceView.nakshatraNaadiError}</div>`;
    }

    const planets = sourceView.nakshatraNaadi?.planets || {};
    const planetGroups = nakshatraNaadiGroups(planets);
    if (!planetGroups.length) {
      return `<div class="chart-state">${t("nakshatraNaadi.waiting")}</div>`;
    }

    const chunkSize = Math.ceil(planetGroups.length / 3);
    const columns = [planetGroups.slice(0, chunkSize), planetGroups.slice(chunkSize, chunkSize * 2), planetGroups.slice(chunkSize * 2)];
    const isKundaliNakshatra = isKundaliNakshatraContext();
    const panelStyle = isKundaliNakshatra ? ' style="grid-template-rows:auto max-content minmax(190px, auto);align-content:start;"' : "";
    const gridStyle = isKundaliNakshatra ? ' style="height:auto;min-height:0;max-height:none;overflow:hidden;"' : "";
    return `
      <div class="nakshatra-naadi-panel"${panelStyle}>
        ${naadiRuleControlsHtml()}
        <div class="nakshatra-naadi-grid"${gridStyle}>
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
    const isKundaliNakshatra = isKundaliNakshatraContext();
    const controlsStyle = isKundaliNakshatra ? ' style="margin-top:0;"' : "";
    return `
      <div class="naadi-rule-controls"${controlsStyle}>
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
    const sourceView = dashaSourceView();
    const dasha = sourceView.dasha || defaultDashaState();
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
          <div class="dasha-heading current-gochar-planet-title">
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
    return "";
  }

  function dashaTimingControlsHtml(planetGroups = []) {
    const options = ["5 Years", "Year", "Month", "Day", "Hour", "10 Min", "Minute"];
    const selectedStep = dashaSourceView().dasha?.step || "Hour";
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
    const dasha = dashaSourceView().dasha || {};
    const periods = dasha.data?.periods || [];
    const active = periods.find(isCurrentDashaPeriod);
    const path = dasha.activePath?.length ? dasha.activePath : Array.isArray(active?.path) ? active.path : [];
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
        <td>${formatDegreeDms(position.longitude)}</td>
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
        ${chartMiniPickerHtml(chartKey, "chart", selectedChart, chartPickerOptions(), "chart.selectChart", state.headingChoice === "header")}
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
    return kundaliSectionChartOptions().map((option) => ({
      value: option.value,
      label: `${option.label} - ${option.value}`,
    }));
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

  function jatakPanchangHtml() {
    const panchangState = state.jatakView.panchang || {};
    if (panchangState.loading) {
      return `<div class="chart-state">${t("panchang.loading")}</div>`;
    }
    if (panchangState.error) {
      return `<div class="chart-state error">${panchangState.errorKey ? t(panchangState.errorKey) : panchangState.error}</div>`;
    }
    if (!panchangState.data) {
      return `<div class="chart-state">${t("panchang.waiting")}</div>`;
    }
    return panchangTilePanelHtml(panchangState.data);
  }

  function panchangTilePanelHtml(panchang) {
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

  function currentGocharPlaceholderHtml() {
    if (state.gochar.loading) {
      return `<div class="home-section-placeholder"><div class="chart-state">${t("chart.loading")}</div></div>`;
    }

    if (state.gochar.error) {
      return `<div class="home-section-placeholder"><div class="chart-state error">${state.gochar.errorKey ? t(state.gochar.errorKey) : state.gochar.error}</div></div>`;
    }

    if (!state.gochar.data?.positions) {
      return `<div class="home-section-placeholder empty"></div>`;
    }

    return `
      <div class="home-section-placeholder current-gochar-placeholder">
        <div class="current-gochar-chart-stack">
          ${currentGocharImageChartHtml()}
          ${currentGocharInfoTileHtml()}
        </div>
        <div class="current-gochar-planet-tile">
          <div class="current-gochar-planet-title">${t("chart.planetaryDetail")}</div>
          <div class="current-gochar-planet-body">${planetaryDetailHtml()}</div>
        </div>
      </div>
    `;
  }

  function currentGocharImageChartHtml() {
    const houses = buildGocharHouses(state.gochar.data);
    const slots = northDiamondSlots();
    return `
      <div class="current-gochar-image-chart">
        <img src="./src/images/blank_kundali.jpg" alt="" />
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" role="img" aria-label="${t("homeIcon.currentGochar")}">
          ${slots.map((slot) => {
            const house = houses[slot.house - 1] || { sign_index: "", bodies: [] };
            return `
              <g>
                ${northHouseNumberHtml(slot, house.sign_index, "currentGochar")}
                ${northHouseBodiesHtml(slot, house.bodies)}
              </g>
            `;
          }).join("")}
        </svg>
      </div>
    `;
  }

  function currentGocharInfoTileHtml() {
    const data = state.gochar.data || {};
    const calculatedAt = data.calculated_at || "";
    return `
      <div class="current-gochar-info-tile">
        <div>
          <span>${t("gocharInfo.date")}</span>
          <strong>${escapeHtml(formatDisplayDateOnly(calculatedAt) || "-")}</strong>
        </div>
        <div>
          <span>${t("gocharInfo.time")}</span>
          <strong>${escapeHtml(formatTimeWithSeconds(calculatedAt) || "-")}</strong>
        </div>
        <div>
          <span>${t("gocharInfo.place")}</span>
          <strong>${escapeHtml(`${displayValue(data.latitude)}, ${displayValue(data.longitude)}`)}</strong>
        </div>
        <div>
          <span>${t("gocharInfo.timezone")}</span>
          <strong>${escapeHtml(displayValue(data.timezone))}</strong>
        </div>
      </div>
    `;
  }

  function northChartHtml(houses, chartKey) {
    const rotatedHouses = rotateHousesForChart(houses, chartKey);
    const slots = northDiamondSlots();

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
    const position = northSignPosition(slot.house, [slot.x, slot.y]);
    const label = houseNumber || "";
    return `<text class="diamond-house-number" x="${position[0]}" y="${position[1]}" data-rotate-chart="${escapeHtml(chartKey)}" data-sign-index="${label}">${label}</text>`;
  }

  function northHouseBodiesHtml(slot, bodies) {
    const visibleLimit = CHART_LAYOUT_PLANET_SLOT_COUNT;
    const visibleBodies = bodies.slice(0, visibleLimit);
    const overflowCount = bodies.length - visibleBodies.length;
    const labels = overflowCount > 0 ? [...visibleBodies.slice(0, visibleLimit - 1), `+${overflowCount + 1}`] : visibleBodies;
    return labels
      .map((body, index) => {
        const position = northPlanetSlot(slot.house, index);
        return northPlanetLabelHtml(body, position.x, position.y);
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
        <tspan class="planet-name-text">${planetName}</tspan>${retrogradeMark}${degree ? `<tspan class="planet-degree-sup" dx="0.35" dy="${degreeDy}">${degree}</tspan>` : ""}
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

  function jatakChartUrl(jatakId, chartCode) {
    return `/jatak/${encodeURIComponent(jatakId)}/chart/${chartEndpoint(chartCode)}?include_aprakashita=true`;
  }

  function btrJatakChartUrl(jatakId, chartCode, at) {
    const params = new URLSearchParams({ include_aprakashita: "true" });
    if (at) params.set("at", at);
    return `/jatak/${encodeURIComponent(jatakId)}/chart/${chartEndpoint(chartCode)}?${params.toString()}`;
  }

  function gocharChartUrl(at) {
    const params = new URLSearchParams({ include_aprakashita: "true" });
    if (at) params.set("at", at);
    return `/chart/gochar?${params.toString()}`;
  }

  async function loadHomeGocharChart() {
    if (state.headingChoice !== "home" || state.gochar.loading) return;
    state.gochar.loading = true;
    state.gochar.error = "";
    state.gochar.errorKey = "";
    render();

    try {
      state.gochar.data = await getJson(gocharChartUrl(), "chart.loadError");
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
      const params = new URLSearchParams({
        date: apiIsoDate(now),
        time: apiTimeString(now),
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "Asia/Kolkata",
      });
      const coords = await optionalBrowserCoordinates();
      if (coords) {
        state.hora.location = coords;
        params.set("latitude", String(coords.latitude));
        params.set("longitude", String(coords.longitude));
      }
      state.panchang.data = await getJson(`/panchang?${params.toString()}`, "panchang.loadError");
    } catch (error) {
      state.panchang.error = error.message || t("panchang.loadError");
      state.panchang.errorKey = error.messageKey || "panchang.loadError";
    } finally {
      state.panchang.loading = false;
      render();
    }
  }

  async function loadPanchangYogReference() {
    if (state.panchangInfo.yogsLoading || state.panchangInfo.yogs) return;
    state.panchangInfo.yogsLoading = true;
    state.panchangInfo.yogsError = "";
    state.panchangInfo.yogsErrorKey = "";
    render();

    try {
      state.panchangInfo.yogs = await getJson("/reference/panchang-yogs", "panchangInfo.yogLoadError");
    } catch (error) {
      state.panchangInfo.yogsError = error.message || t("panchangInfo.yogLoadError");
      state.panchangInfo.yogsErrorKey = error.messageKey || "panchangInfo.yogLoadError";
    } finally {
      state.panchangInfo.yogsLoading = false;
      render();
    }
  }

  async function loadPanchangNakshatraReference() {
    if (state.panchangInfo.nakshatrasLoading || state.panchangInfo.nakshatras) return;
    state.panchangInfo.nakshatrasLoading = true;
    state.panchangInfo.nakshatrasError = "";
    state.panchangInfo.nakshatrasErrorKey = "";
    render();

    try {
      state.panchangInfo.nakshatras = await getJson("/reference/nakshatras", "panchangInfo.nakshatraLoadError");
    } catch (error) {
      state.panchangInfo.nakshatrasError = error.message || t("panchangInfo.nakshatraLoadError");
      state.panchangInfo.nakshatrasErrorKey = error.messageKey || "panchangInfo.nakshatraLoadError";
    } finally {
      state.panchangInfo.nakshatrasLoading = false;
      render();
    }
  }

  async function loadSavedJatakView(jatakId, dateTimeLabel, jatakName = "", birthDetails = null) {
    if (!jatakId) return;
    const previousKundaliSection = state.jatakView.active ? state.jatakView.kundaliSection : "basic-details";
    state.ashtakVarga = { selectedPlanet: "", data: null, loading: false, error: "", errorKey: "" };
    state.headingChoice = "home";
    state.homeView = "current-gochar";
    if (state.openKundali.open || state.headerActiveMenu === "open-kundali") {
      state.headerActiveMenu = "open-kundali";
    }
    state.chartRotations.d1 = null;
    state.chartRotations.d9 = null;
    state.jatakView = {
      ...state.jatakView,
      active: true,
      jatakId,
      jatakName,
      dateTimeLabel,
      d1: null,
      rasi: null,
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
      rightView: "planet-details",
      birthDetails,
      birthDetailsLoading: true,
      birthDetailsError: "",
      birthDetailsErrorKey: "",
      panchang: {
        data: null,
        loading: false,
        error: "",
        errorKey: "",
      },
      btr: {
        workingDate: "",
        step: "Month",
      },
      kundaliSection: state.headerActiveMenu === "open-kundali" ? previousKundaliSection || "basic-details" : "basic-details",
      loading: true,
      error: "",
      errorKey: "",
    };
    render();

    getJson(`/jatak/${encodeURIComponent(jatakId)}`, "basicDetails.loadError")
      .then((details) => {
        state.jatakView.birthDetails = details || birthDetails;
        if (state.jatakView.kundaliSection === "btr") initBtrWorkingDate();
      })
      .catch((error) => {
        state.jatakView.birthDetails = birthDetails;
        if (state.jatakView.kundaliSection === "btr") initBtrWorkingDate();
        state.jatakView.birthDetailsError = error.message || t("basicDetails.loadError");
        state.jatakView.birthDetailsErrorKey = error.messageKey || "basicDetails.loadError";
      })
      .finally(() => {
        state.jatakView.birthDetailsLoading = false;
        render();
      });

    try {
      const topChart = state.chartHeaderChoices.d1.chart || "D1";
      const bottomChart = state.chartHeaderChoices.d9.chart || "D9";
      const [d1, d9, rasi, positions] = await Promise.all([
        getJson(jatakChartUrl(jatakId, topChart), "chart.loadError"),
        getJson(jatakChartUrl(jatakId, bottomChart), "chart.loadError"),
        getJson(jatakChartUrl(jatakId, "D1"), "chart.loadError"),
        getJson(`/jatak/${encodeURIComponent(jatakId)}/positions?include_aprakashita=true`, "chart.loadError"),
      ]);
      state.jatakView.d1 = d1;
      state.jatakView.d9 = d9;
      state.jatakView.rasi = rasi;
      state.jatakView.positions = positions;
    } catch (error) {
      state.jatakView.error = error.message || t("chart.loadError");
      state.jatakView.errorKey = error.messageKey || "chart.loadError";
    } finally {
      state.jatakView.loading = false;
      render();
      if (state.jatakView.kundaliSection === "ashtak-varga") {
        selectDefaultAshtakVarga();
      }
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
        jatakChartUrl(state.jatakView.jatakId, chartCode),
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

  async function loadJatakPanchang() {
    if (!state.jatakView.active || !state.jatakView.birthDetails) return;
    const details = state.jatakView.birthDetails;
    const date = panchangApiDateFromJatakDate(details.date);
    const time = String(details.time || "00:00:00").trim();
    if (!date || !time) {
      state.jatakView.panchang = {
        ...(state.jatakView.panchang || {}),
        error: t("panchang.loadError"),
        errorKey: "panchang.loadError",
        loading: false,
      };
      render();
      return;
    }
    state.jatakView.panchang = {
      ...(state.jatakView.panchang || {}),
      loading: true,
      error: "",
      errorKey: "",
    };
    state.searchKundali.activeTool = "";
    render();
    try {
      const params = new URLSearchParams({
        date,
        time,
        timezone: details.timezone || "Asia/Kolkata",
        latitude: String(details.latitude || ""),
        longitude: String(details.longitude || ""),
      });
      state.jatakView.panchang.data = await getJson(`/panchang?${params.toString()}`, "panchang.loadError");
    } catch (error) {
      state.jatakView.panchang.error = error.message || t("panchang.loadError");
      state.jatakView.panchang.errorKey = error.messageKey || "panchang.loadError";
    } finally {
      state.jatakView.panchang.loading = false;
      render();
    }
  }

  async function loadChartLayout() {
    try {
      const response = await fetch("./src/data/chart_layout.json");
      if (!response.ok) return null;
      const layout = await response.json();
      const draft = localStorage.getItem("ej_vedic_chart_layout_draft");
      return normalizeChartLayoutPlanetSlots(draft ? JSON.parse(draft) : layout);
    } catch {
      return null;
    }
  }

  async function loadTwoDChartLayout() {
    try {
      const response = await fetch("./src/data/2d_chart_layout.json");
      const layout = response.ok ? await response.json() : defaultTwoDChartLayout();
      return normalizeTwoDChartLayout(layout);
    } catch {
      return normalizeTwoDChartLayout(defaultTwoDChartLayout());
    }
  }

  async function loadJaiminiChartLayout() {
    try {
      const response = await fetch("./src/data/jaimini_chart_layout.json");
      const layout = response.ok ? await response.json() : defaultJaiminiChartLayout();
      const draft = localStorage.getItem("ej_vedic_jaimini_chart_layout_draft");
      return normalizeJaiminiChartLayout(draft ? JSON.parse(draft) : layout);
    } catch {
      return normalizeJaiminiChartLayout(defaultJaiminiChartLayout());
    }
  }

  function normalizeChartLayoutPlanetSlots(layout) {
    Object.values(layout?.north?.houses || {}).forEach((house) => {
      house.planets = Array.isArray(house.planets) ? house.planets.slice(0, CHART_LAYOUT_PLANET_SLOT_COUNT) : [];
      while (house.planets.length < CHART_LAYOUT_PLANET_SLOT_COUNT) {
        house.planets.push({ x: 50, y: 50 });
      }
    });
    return layout;
  }

  function defaultTwoDChartLayout() {
    return {
      north_2d: {
        image: "double_blank_chart.png",
        layers: {
          inner: { label: "Natal D1", houses: {} },
          outer: { label: "Transit", houses: {} },
        },
      },
    };
  }

  function defaultJaiminiChartLayout() {
    return {
      jaimini: {
        image: "blank_kundali.jpg",
        houses: {},
      },
    };
  }

  function normalizeTwoDChartLayout(layout) {
    const normalized = layout?.north_2d ? layout : defaultTwoDChartLayout();
    normalized.north_2d.layers = normalized.north_2d.layers || {};
    ["inner", "outer"].forEach((layer) => {
      normalized.north_2d.layers[layer] = normalized.north_2d.layers[layer] || { houses: {} };
      normalized.north_2d.layers[layer].houses = normalized.north_2d.layers[layer].houses || {};
      for (let house = 1; house <= 12; house += 1) {
        ensureTwoDLayoutHouse(layer, house, normalized);
      }
    });
    return normalized;
  }

  function normalizeJaiminiChartLayout(layout) {
    const normalized = layout?.jaimini ? layout : defaultJaiminiChartLayout();
    normalized.jaimini.image = normalized.jaimini.image || "blank_kundali.jpg";
    normalized.jaimini.houses = normalized.jaimini.houses || {};
    for (let house = 1; house <= 12; house += 1) {
      ensureJaiminiLayoutHouse(house, normalized);
    }
    return normalized;
  }

  function ensureTwoDLayoutHouse(layer, house, layout = state.twoDChartLayout) {
    const targetLayout = layout || defaultTwoDChartLayout();
    targetLayout.north_2d = targetLayout.north_2d || defaultTwoDChartLayout().north_2d;
    targetLayout.north_2d.layers = targetLayout.north_2d.layers || {};
    targetLayout.north_2d.layers[layer] = targetLayout.north_2d.layers[layer] || { houses: {} };
    targetLayout.north_2d.layers[layer].houses = targetLayout.north_2d.layers[layer].houses || {};
    const key = String(house);
    const fallback = twoDDefaultPosition(layer, house);
    if (!targetLayout.north_2d.layers[layer].houses[key]) {
      targetLayout.north_2d.layers[layer].houses[key] = {
        sign: { x: fallback.x, y: fallback.y },
        planets: Array.from({ length: CHART_LAYOUT_PLANET_SLOT_COUNT }, (_, index) => ({
          x: fallback.x,
          y: fallback.y + index * (layer === "inner" ? 3 : 4),
        })),
      };
    }
    const layoutHouse = targetLayout.north_2d.layers[layer].houses[key];
    layoutHouse.sign = layoutHouse.sign || { x: fallback.x, y: fallback.y };
    layoutHouse.planets = Array.isArray(layoutHouse.planets) ? layoutHouse.planets.slice(0, CHART_LAYOUT_PLANET_SLOT_COUNT) : [];
    while (layoutHouse.planets.length < CHART_LAYOUT_PLANET_SLOT_COUNT) {
      layoutHouse.planets.push({ x: fallback.x, y: fallback.y });
    }
    return layoutHouse;
  }

  function twoDDefaultPosition(layer, house) {
    const base = northDiamondSlots().find((slot) => slot.house === house) || { x: 50, y: 50 };
    const factor = layer === "inner" ? 0.58 : 1.0;
    return {
      x: 50 + (base.x - 50) * factor,
      y: 50 + (base.y - 50) * factor,
    };
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

  async function optionalBrowserCoordinates() {
    if (state.hora.location) return state.hora.location;
    try {
      return await currentBrowserCoordinates();
    } catch (error) {
      return null;
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
      error.status = response.status;
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
      error.status = response.status;
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
      error.status = response.status;
      throw error;
    }
    return response.json();
  }

  async function deleteJson(path, errorKey = "common.saveError") {
    const response = await fetch(API_BASE_URL + path, { method: "DELETE" });
    if (!response.ok) {
      const error = new Error(t(errorKey));
      error.messageKey = errorKey;
      error.status = response.status;
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
    state.headerActiveMenu = "new-kundali";
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
    state.headerActiveMenu = "open-kundali";
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

  async function loadSearchKundaliRecords(options = {}) {
    if (state.searchKundali.loading) return;
    state.searchKundali.loading = true;
    state.searchKundali.error = "";
    state.searchKundali.errorKey = "";
    let autoOpenJatakId = "";
    render();
    try {
      const page = Math.max(1, Number(state.searchKundali.page) || 1);
      const recordsPerPage = 10;
      const params = searchKundaliQueryParams(page, recordsPerPage);
      const data = await getJson(`/jatak/page?${params.toString()}`, "searchKundali.loadError");
      const totalRecords = Number(data?.total_records) || 0;
      const totalPages = Math.max(1, Number(data?.total_pages) || Math.ceil(totalRecords / recordsPerPage));
      state.searchKundali.records = Array.isArray(data?.items) ? data.items : [];
      state.searchKundali.suggestions = state.searchKundali.records.slice(0, 10);
      state.searchKundali.suggestionOpen = options.openSuggestions === true && searchKundaliActiveQuery().length >= 3;
      state.searchKundali.rowsPerPage = recordsPerPage;
      state.searchKundali.totalRecords = totalRecords;
      state.searchKundali.totalPages = totalPages;
      state.searchKundali.page = Math.min(page, totalPages);
      const latestRecord = state.searchKundali.records[0] || null;
      autoOpenJatakId = options.autoOpenLatest === true ? String(latestRecord?.jatak_id || latestRecord?.id || "") : "";
    } catch (error) {
      state.searchKundali.error = error.message || t("searchKundali.loadError");
      state.searchKundali.errorKey = error.messageKey || "searchKundali.loadError";
      state.searchKundali.suggestionOpen = false;
    } finally {
      state.searchKundali.loading = false;
      render();
    }
    if (autoOpenJatakId) {
      loadSearchKundaliPreview(autoOpenJatakId);
    }
  }

  function changeSearchKundaliPage(direction) {
    const totalPages = Math.max(1, Number(state.searchKundali.totalPages) || 1);
    const nextPage = Math.min(totalPages, Math.max(1, (Number(state.searchKundali.page) || 1) + (Number(direction) || 0)));
    if (nextPage === state.searchKundali.page) return;
    state.searchKundali.page = nextPage;
    loadSearchKundaliRecords();
  }

  async function loadSearchKundaliPreview(jatakId) {
    if (!jatakId) return;
    const record = (state.searchKundali.records || []).find((item) => String(item.jatak_id || item.id) === String(jatakId)) || {};
    state.searchKundali.selected = {
      jatakId,
      jatakName: record.jatak_full_name || "",
      dateTimeLabel: `${record.date || ""} ${record.time || ""}`.trim(),
      birthDetails: record,
      d1: null,
      d9: null,
      positions: null,
      jaimini: null,
      jaiminiLoading: false,
      jaiminiError: "",
      jaiminiErrorKey: "",
      d1Chart: "D1",
      d9Chart: "D9",
      d1Loading: false,
      d9Loading: false,
      loading: true,
      error: "",
      errorKey: "",
      dasha: defaultDashaState(),
    };
    render();

    try {
      const [details, d1, d9, positions] = await Promise.all([
        getJson(`/jatak/${encodeURIComponent(jatakId)}`, "basicDetails.loadError"),
        getJson(jatakChartUrl(jatakId, "D1"), "chart.loadError"),
        getJson(jatakChartUrl(jatakId, "D9"), "chart.loadError"),
        getJson(`/jatak/${encodeURIComponent(jatakId)}/positions?include_aprakashita=true`, "chart.loadError"),
      ]);
      state.searchKundali.selected = {
        ...state.searchKundali.selected,
        birthDetails: details || record,
        jatakName: details?.jatak_full_name || record.jatak_full_name || "",
        dateTimeLabel: `${details?.date || record.date || ""} ${details?.time || record.time || ""}`.trim(),
        d1,
        d9,
        positions,
        d1Chart: "D1",
        d9Chart: "D9",
        loading: false,
      };
    } catch (error) {
      state.searchKundali.selected = {
        ...state.searchKundali.selected,
        loading: false,
        error: error.message || t("chart.loadError"),
        errorKey: error.messageKey || "chart.loadError",
      };
    } finally {
      render();
      if (state.searchKundali.activeTool === "jaimini-kundali") {
        loadSearchKundaliJaiminiDetails();
      }
    }
  }

  async function updateSearchKundaliPreviewChart(chartKey, chartCode) {
    const selected = state.searchKundali.selected || {};
    if (!selected.jatakId || !chartKey || !chartCode) return;
    const loadingKey = `${chartKey}Loading`;
    const choiceKey = `${chartKey}Chart`;
    state.searchKundali.selected = {
      ...selected,
      [choiceKey]: chartCode,
      [loadingKey]: true,
      error: "",
      errorKey: "",
    };
    render();

    try {
      const chart = await getJson(jatakChartUrl(selected.jatakId, chartCode), "chart.loadError");
      state.searchKundali.selected = {
        ...state.searchKundali.selected,
        [chartKey]: chart,
        [loadingKey]: false,
      };
    } catch (error) {
      state.searchKundali.selected = {
        ...state.searchKundali.selected,
        [loadingKey]: false,
        error: error.message || t("chart.loadError"),
        errorKey: error.messageKey || "chart.loadError",
      };
    } finally {
      render();
    }
  }

  function searchKundaliQueryParams(page, recordsPerPage) {
    const params = new URLSearchParams({
      page: String(page),
      records_per_page: String(recordsPerPage),
    });
    const nameQuery = state.searchKundali.nameQuery.trim();
    const noteQuery = state.searchKundali.noteQuery.trim();
    if (nameQuery.length >= 3) params.set("name_query", nameQuery);
    if (noteQuery.length >= 3) params.set("note_query", noteQuery);
    return params;
  }

  function resetSearchKundaliView() {
    window.clearTimeout(state.searchKundali.searchTimer);
    state.searchKundali.records = [];
    state.searchKundali.suggestions = [];
    state.searchKundali.loading = false;
    state.searchKundali.error = "";
    state.searchKundali.errorKey = "";
    state.searchKundali.page = 1;
    state.searchKundali.totalRecords = 0;
    state.searchKundali.totalPages = 1;
    state.searchKundali.nameQuery = "";
    state.searchKundali.noteQuery = "";
    state.searchKundali.activeSearchType = "";
    state.searchKundali.suggestionOpen = false;
    state.searchKundali.activeTool = "";
    state.searchKundali.jaiminiInfoTab = "planetary";
    state.searchKundali.selected = {
      jatakId: null,
      jatakName: "",
      dateTimeLabel: "",
      birthDetails: null,
      d1: null,
      d9: null,
      d1Chart: "D1",
      d9Chart: "D9",
      jaimini: null,
      jaiminiLoading: false,
      jaiminiError: "",
      jaiminiErrorKey: "",
      d1Loading: false,
      d9Loading: false,
      positions: null,
      loading: false,
      error: "",
      errorKey: "",
      dasha: defaultDashaState(),
    };
  }

  function searchKundaliActiveQuery() {
    return state.searchKundali.activeSearchType === "note"
      ? state.searchKundali.noteQuery.trim()
      : state.searchKundali.nameQuery.trim();
  }

  function handleSearchKundaliInput(event, type) {
    const value = event.target.value || "";
    if (type === "note") {
      state.searchKundali.noteQuery = value;
    } else {
      state.searchKundali.nameQuery = value;
    }
    state.searchKundali.activeSearchType = type;
    state.searchKundali.page = 1;
    state.searchKundali.suggestionOpen = false;
    state.searchKundali.suggestions = [];
    window.clearTimeout(state.searchKundali.searchTimer);
    const activeLength = value.trim().length;
    const hasAnySearch = state.searchKundali.nameQuery.trim().length > 0 || state.searchKundali.noteQuery.trim().length > 0;
    if (activeLength > 0 && activeLength < 3) return;
    if (hasAnySearch && activeLength < 3) return;
    state.searchKundali.searchTimer = window.setTimeout(() => {
      loadSearchKundaliRecords({ openSuggestions: activeLength >= 3 });
    }, 500);
  }

  function hideSearchKundaliSuggestions() {
    if (!state.searchKundali.suggestionOpen) return;
    state.searchKundali.suggestionOpen = false;
    render();
  }

  function applySearchKundaliSuggestion(jatakId) {
    const selected = (state.searchKundali.suggestions || []).find((record) => String(record.jatak_id || record.id) === String(jatakId));
    if (selected) {
      if (state.searchKundali.activeSearchType === "note") {
        state.searchKundali.noteQuery = selected.note1 || state.searchKundali.noteQuery;
      } else {
        state.searchKundali.nameQuery = selected.jatak_full_name || state.searchKundali.nameQuery;
      }
    }
    state.searchKundali.page = 1;
    state.searchKundali.suggestionOpen = false;
    loadSearchKundaliRecords();
  }

  function clearSearchKundaliField(type) {
    if (type === "note") {
      state.searchKundali.noteQuery = "";
    } else {
      state.searchKundali.nameQuery = "";
    }
    state.searchKundali.activeSearchType = "";
    state.searchKundali.suggestionOpen = false;
    state.searchKundali.suggestions = [];
    state.searchKundali.page = 1;
    window.clearTimeout(state.searchKundali.searchTimer);
    loadSearchKundaliRecords();
  }

  function handleSearchKundaliTool(toolKey) {
    if (!state.searchKundali.selected?.jatakId || !toolKey) return;
    state.searchKundali.activeTool = toolKey === "kundali" ? "" : toolKey;
    if (toolKey === "ashtakvarga") {
      selectDefaultAshtakVarga();
      return;
    }
    if (toolKey === "nakshatra-naadi") {
      state.naadiView = "nakshatra";
      state.chartHeaderChoices.d1.chart = "D1";
      state.chartHeaderChoices.d9.chart = "CHALIT";
      state.searchKundali.selected.d1Chart = "D1";
      state.searchKundali.selected.d9Chart = "CHALIT";
      state.searchKundali.selected.dasha = defaultDashaState();
      render();
      updateSearchKundaliPreviewChart("d9", "CHALIT");
      loadNakshatraNaadi();
      loadDashaLevel("");
      return;
    }
    if (toolKey === "jaimini-kundali") {
      state.searchKundali.jaiminiInfoTab = "planetary";
      state.searchKundali.selected.d1Chart = "D1";
      render();
      loadSearchKundaliJaiminiDetails();
      return;
    }
    render();
  }

  async function loadSearchKundaliJaiminiDetails() {
    const selected = state.searchKundali.selected || {};
    const jatakId = selected.jatakId;
    if (!jatakId || selected.jaiminiLoading) return;
    state.searchKundali.selected = {
      ...selected,
      jaiminiLoading: true,
      jaiminiError: "",
      jaiminiErrorKey: "",
    };
    render();
    try {
      const jaimini = await getJson(`/jatak/${encodeURIComponent(jatakId)}/analysis/jaimini`, "chart.loadError");
      if (String(state.searchKundali.selected?.jatakId || "") !== String(jatakId)) return;
      state.searchKundali.selected = {
        ...state.searchKundali.selected,
        jaimini,
        jaiminiLoading: false,
      };
    } catch (error) {
      if (String(state.searchKundali.selected?.jatakId || "") !== String(jatakId)) return;
      state.searchKundali.selected = {
        ...state.searchKundali.selected,
        jaiminiLoading: false,
        jaiminiError: error.message || t("chart.loadError"),
        jaiminiErrorKey: error.messageKey || "chart.loadError",
      };
    } finally {
      render();
    }
  }

  async function viewOpenKundali(jatakId) {
    const record = state.openKundali.records.find((item) => String(item.jatak_id || item.id) === String(jatakId));
    state.openKundali.open = false;
    render();
    await loadSavedJatakView(jatakId, `${record?.date || ""} ${record?.time || ""}`.trim(), record?.jatak_full_name || "", record || null);
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
      await postJson(
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
      state.kundaliForm.message = t("kundali.saved");
      state.kundaliForm.form = defaultKundaliForm();
      state.kundaliForm.states = [];
      state.kundaliForm.cities = [];
      state.kundaliForm.open = false;
      state.headerActiveMenu = "home";
      resetToDefaultHome();
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
    const rawKey = String(name || "").trim().toLowerCase();
    const aliases = {
      surya: "sun",
      chandra: "moon",
      mangala: "mars",
      mangal: "mars",
      budha: "mercury",
      guru: "jupiter",
      sukra: "venus",
      shukra: "venus",
      sani: "saturn",
      shani: "saturn",
    };
    const key = aliases[rawKey] || rawKey;
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
      dhuma: "Dhuma",
      vyatipata: "Vyatipata",
      parivesha: "Parivesha",
      indrachapa: "Indrachapa",
      upaketu: "Upaketu",
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

  function formatDisplayDateOnly(value) {
    if (!value) return "";
    const directMatch = String(value).match(/(\d{1,2})-([A-Za-z]{3})-(\d{4})/);
    if (directMatch) {
      return `${String(directMatch[1]).padStart(2, "0")}-${toTitleCase(directMatch[2]).slice(0, 3)}-${directMatch[3]}`;
    }
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return String(value);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${String(date.getDate()).padStart(2, "0")}-${months[date.getMonth()]}-${date.getFullYear()}`;
  }

  function apiIsoDate(date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  }

  function panchangApiDateFromJatakDate(value) {
    const text = String(value || "").trim();
    const isoMatch = text.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (isoMatch) return text;
    const match = text.match(/^(\d{1,2})-([A-Za-z]{3})-(\d{4})/);
    if (!match) return "";
    const months = { jan: "01", feb: "02", mar: "03", apr: "04", may: "05", jun: "06", jul: "07", aug: "08", sep: "09", oct: "10", nov: "11", dec: "12" };
    const month = months[match[2].toLowerCase()];
    if (!month) return "";
    return `${match[3]}-${month}-${String(match[1]).padStart(2, "0")}`;
  }

  function apiTimeString(date) {
    return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;
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

  function formatTimeWithSeconds(value) {
    if (!value) return "";
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? String(value) : date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
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

  function panchangTatvaTooltipHtml() {
    const rows = [
      ["panchang.tithi", "tatva.jal"],
      ["panchang.var", "tatva.agni"],
      ["panchang.karan", "tatva.pruthvi"],
      ["panchang.nakshatra", "tatva.vayu"],
      ["panchang.yog", "tatva.akash"],
    ];
    return `
      <span class="section2-fancy-tooltip" role="tooltip">
        ${rows.map(([labelKey, valueKey]) => `
          <span>
            <strong>${t(labelKey)}</strong>
            <em>${t(valueKey)}</em>
          </span>
        `).join("")}
      </span>
    `;
  }

  function iconActionHtml(icon, labelKey, subLabelKey = "", sectionChoice = "", action = "", active = false, tooltipHtml = "") {
    const iconHtml = /\.(png|jpe?g|svg|webp)$/i.test(icon)
      ? `<img src="${icon}" alt="" />`
      : escapeHtml(icon);
    return `
      <button class="section2-icon-action ${tooltipHtml ? "has-fancy-tooltip" : ""} ${active ? "active" : ""}" ${sectionChoice ? `data-section-choice="${sectionChoice}"` : ""} ${action ? `data-action="${action}"` : ""} type="button">
        <span class="section2-icon-symbol" aria-hidden="true">${iconHtml}</span>
        <span class="section2-icon-text">
          <strong>${t(labelKey)}</strong>
          ${subLabelKey ? `<span>${t(subLabelKey)}</span>` : ""}
        </span>
        ${tooltipHtml}
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

  function formatNoteInlineHtml(value) {
    return escapeHtml(value)
      .replace(/\*\*([\s\S]*?)\*\*/g, "<strong>$1</strong>")
      .replace(/(^|[^\*])\*([^\*\n]+)\*(?!\*)/g, '$1<span class="note-green-text">$2</span>');
  }

  function formatNoteBlockHtml(value) {
    return String(value || "")
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => `<p>${formatNoteInlineHtml(line)}</p>`)
      .join("");
  }

  function stripNoteMarkup(value) {
    return String(value || "").replace(/\*\*([\s\S]*?)\*\*/g, "$1");
  }
})();
