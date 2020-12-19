import { genUUID, parseFormData } from "../../utils.js";

export default class Controllor {
	constructor(models, views) {
		this.models = models;
		this.views = views;
		this.init();
		this.$that = this;
	}
	init() {
		const { baseView } = this.views;
		baseView.render();
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
		console.log(e.target);
		if (e.target.tagName != "button") {
			return;
		}

		if (e.target.dataset.index === "0") {
			const { stationView } = this.views;
			const stations = this.models.stationModel.getStations();

			stationView.render(stations);
			stationView.bindOnClickSubmit(this.onStationSubmit.bind(this));
		}
	}
}
