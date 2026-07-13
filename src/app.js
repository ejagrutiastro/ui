(function () {
  const API_BASE_URL = "http://127.0.0.1:8000";

  const state = {
    language: localStorage.getItem("ej_vedic_language") || "en",
    headingChoice: "home",
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
          <div class="header-jatak-name">${state.jatakView.active && state.jatakView.jatakName ? escapeHtml(state.jatakView.jatakName) : ""}</div>
          <label class="language-picker">
            <select id="languageSelect">
              <option value="en" ${state.language === "en" ? "selected" : ""}>${t("language.english")}</option>
              <option value="mr" ${state.language === "mr" ? "selected" : ""}>${t("language.marathi")}</option>
            </select>
          </label>
        </section>

        <section class="section section2" aria-label="section2">
          <div class="section2-icons">
            ${iconActionHtml("H", "nav.home", "", "home")}
            ${state.headingChoice === "home" && state.jatakView.active ? iconActionHtml("P", "homeIcon.todaysPanchanga") : ""}
            ${state.headingChoice === "home" ? iconActionHtml("O", "homeIcon.openKundali", "", "", "open-kundali") : ""}
            ${state.headingChoice === "home" ? iconActionHtml("N", "homeIcon.newKundali", "", "", "new-kundali") : ""}
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
        state.headingChoice = option.dataset.headingChoice;
        render();
        if (state.headingChoice === "home") {
          loadHomeGocharChart();
          loadHomePanchang();
        }
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
      });
    });

    document.querySelectorAll("[data-chart-choice]").forEach((button) => {
      button.addEventListener("click", () => {
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
    state.jatakView = {
      active: false,
      jatakId: null,
      jatakName: "",
      dateTimeLabel: "",
      d1: null,
      d9: null,
      positions: null,
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

  function sectionMiddleHtml() {
    if (state.headingChoice === "home") {
      return `
        <div class="home-middle-layout">
          <div class="home-middle-left">
            <div class="home-left-top">
              <div class="home-left-top-part1">${state.jatakView.active ? chartHeaderHtml("d1", "chart.d1Chart", state.jatakView.dateTimeLabel, "D1") : gocharChartHeaderHtml()}</div>
              <div class="home-left-top-part2">${state.jatakView.active ? jatakChartHtml("d1") : gocharChartHtml()}</div>
            </div>
            <div class="home-left-bottom">${state.jatakView.active ? jatakChartWithHeaderHtml("d9", "chart.d9Chart", "D9") : panchangTilesHtml()}</div>
          </div>
          <div class="home-middle-right">
            <div class="home-right-top">${t("chart.planetaryDetail")}</div>
            <div class="home-right-bottom">${planetaryDetailHtml()}</div>
          </div>
        </div>
      `;
    }

    return `<div class="generic-middle-layout"></div>`;
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
        <td>${escapeHtml(record.gender || "")}</td>
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
        ${chartMiniPickerHtml(chartKey, "chart", selectedChart, chartPickerOptions(), "chart.selectChart")}
        <span class="chart-heading-spacer" aria-hidden="true"></span>
        ${dateTimeLabel ? `<span>${escapeHtml(dateTimeLabel)}</span>` : ""}
      </div>
    `;
  }

  function chartMiniPickerHtml(chartKey, type, selectedValue, options, labelKey) {
    const selectedLabel = chartPickerLabel(selectedValue, options);
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
    return `<text class="diamond-house-number" x="${position[0]}" y="${position[1]}" data-rotate-chart="${escapeHtml(chartKey)}" data-sign-index="${houseNumber}">${houseNumber}</text>`;
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
    return `
      <div class="chart-cell">
        <span class="chart-house-number">${house.house}</span>
        <strong>${shortSign(house.sign_index)}</strong>
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
      sign_index: house.sign_index,
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
    const key = String(name || "").toLowerCase();
    const value = t(`planet.${key}`);
    return value === `planet.${key}` ? key : value;
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

  function localizedSignName(signIndex) {
    if (state.language !== "mr") return t(`sign.${signIndex}`);
    return state.messages.mr[`sign.${signIndex}`] || shortSign(signIndex);
  }

  function localizedNakshatraName(name) {
    if (state.language !== "mr") return name || "-";
    const key = String(name || "").trim().toLowerCase();
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

  function iconActionHtml(icon, labelKey, subLabelKey = "", sectionChoice = "", action = "") {
    return `
      <button class="section2-icon-action" ${sectionChoice ? `data-section-choice="${sectionChoice}"` : ""} ${action ? `data-action="${action}"` : ""} type="button">
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
