import { genUUID, parseFormData } from "../../utils.js";

export default class Controllor {
	constructor(models, views) {
		this.models = models;
		this.views = views;
		this.$mainContainer = null; 
		this.init();
		// this.$mainContainer = null; // 와.... init 밑에있다고 개꼬이네...
		// 소름 
	}
	setMainContainer($mainContainer){
		this.$mainContainer = $mainContainer
	}
	init() {
		const { baseView } = this.views;
		baseView.render(this.setMainContainer.bind(this));
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
		const index = e.target.dataset.index
		const tagName = e.target.tagName.toLowerCase()
		if (tagName != "button") {
			return;
		}
		const tabs = this.$mainContainer.querySelectorAll('.tab');
		const targetTabEl = tabs[index]
		// console.log(tabs[index])
		if (e.target.dataset.index === "0") {
			const { stationView } = this.views;
			const stations = this.models.stationModel.getStations();

			stationView.render(stations);
			stationView.bindOnClickSubmit(this.onStationSubmit.bind(this));
		}
	}
}
