import Controllor from "./controllor/Controllor.js";
import StationModel from "./model/Station.js";
import BaseView from "./view/BaseView.js";
import StationView from "./view/StationView.js";

class App {
  $target = null;
  constructor() {
    this.$target = document.getElementById("app");

    new Controllor(this.createModels(), this.createViews());
  }

  createModels() {
    const stationModel = new StationModel();
    const models = { stationModel };
    return models;
  }

  createViews() {
    const baseView = new BaseView(this.$target);
    const stationView = new StationView();
    const views = { baseView, stationView };
    return views;
  }
}

export default new App();
