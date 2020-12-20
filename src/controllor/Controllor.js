import { genUUID, parseFormData } from "../../utils.js";

export default class Controllor {
  constructor(models, views) {
    this.models = models;
    this.views = views;
    this.$mainContainer = null;
    this.$stationsTab = null;
    this.$linesTab = null;
    this.$sectionsTab = null;
    this.$mapTab = null;

    this.init();
    // this.$mainContainer = null; // 와.... init 밑에있다고 개꼬이네...
    // 소름
  }
  setStationsTab($stationsTab) {
    const { stationView } = this.views;
    this.$stationsTab = $stationsTab;
    stationView.setStationsTab($stationsTab);
  }
  setLinesTab($linesTab) {
    this.$linesTab = $linesTab;
  }
  setSectionsTab($sectionsTab) {
    this.$sectionsTab = $sectionsTab;
  }
  setMapTab($mapTab) {
    this.$mapTab = $mapTab;
  }
  setMainContainer($mainContainer) {
    this.$mainContainer = $mainContainer;
  }
  init() {
    const { baseView } = this.views;
    baseView.render(($mainContainer, $tabEls) => {
      this.setMainContainer.bind(this)($mainContainer);

      this.setStationsTab.bind(this)($tabEls[0]);
      this.setLinesTab.bind(this)($tabEls[1]);
      this.setSectionsTab.bind(this)($tabEls[2]);
      this.setMapTab.bind(this)($tabEls[3]);
    });
    baseView.bindOnClickButton(this.onClickButton.bind(this));
  }
  onStationRemove(e) {
    if (e.target.tagName !== "BUTTON") {
      return;
    }
    // 맘에 안드는 파트 하지만 일단 당장해야하니까 넘어간다...
    const selectedStationId = e.target.parentNode.parentNode.dataset.stationId;
    const { stationModel } = this.models;
    const { stationView } = this.views;

    stationModel.removeStationById(selectedStationId, () => {
      stationView.removeTrByStationId.bind(stationView)(selectedStationId);
    });
  }
  onStationSubmit(e) {
    e.preventDefault();
    function callback() {
      stationView.showTable(stationModel.getStations());
      stationView.clearInputValue();
    }

    const { name } = parseFormData(e.target);
    const { stationModel } = this.models;
    const { stationView } = this.views;
    const newStation = {
      name,
      id: genUUID(),
    };
    stationModel.addStation(newStation, callback.bind(this));
  }

  _renderStationsTab() {
    const { stationView } = this.views;
    const stations = this.models.stationModel.getStations();

    stationView.showStationsTab();
    stationView.render(stations);
    // 이 바인드가 비동기 적인가?
    stationView.bindOnClickSubmit(this.onStationSubmit.bind(this));
    stationView.bindOnClickRemove(this.onStationRemove.bind(this));
  }

  _renderLinesTab() {}
  onClickButton(e) {
    const index = e.target.dataset.index;
    const tagName = e.target.tagName.toLowerCase();
    if (tagName != "button") {
      return;
    }
    const { baseView } = this.views;
    baseView.hideAllTabs();
    // console.log(tabs[index])
    if (index === "0") {
      this._renderStationsTab();
    }
    if (index === "1") {
      this._renderLinesTab();
    }
    if (index === "2") {
      this._renderSectionsTab();
    }
    if (index === "3") {
      this._renderMapTab();
    }
  }
}
