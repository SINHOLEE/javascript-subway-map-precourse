import { genUUID, parseFormData } from "../../utils.js";
import StationView from "../view/StationView.js";

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
  // router 역할?
  onStationSubmit(e) {
    // console.log(this);
    e.preventDefault();
    function callback() {
      stationView.showTable(stationModel.getStations());
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

  onClickButton(e) {
    const index = e.target.dataset.index;
    const tagName = e.target.tagName.toLowerCase();
    console.log(this.$stationsTab);
    if (tagName != "button") {
      return;
    }
    const tabs = this.$mainContainer.querySelectorAll(".tab");
    const targetTabEl = tabs[index];
    // console.log(tabs[index])
    if (e.target.dataset.index === "0") {
      const { stationView } = this.views;
      const stations = this.models.stationModel.getStations();

      stationView.render(stations);
      stationView.bindOnClickSubmit(this.onStationSubmit.bind(this));
    }
  }
}
