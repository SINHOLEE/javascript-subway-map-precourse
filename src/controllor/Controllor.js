import {genUUID, parseFormData} from "../../utils.js";

export default class Controllor {
	constructor(models, views) {
		this.models = models;
		this.views = views;
		this.init();
		this.$that = this;
	}
	init() {
		const {baseView} = this.views;
		baseView.render();
		baseView.bindOnClickButton(this.onClickButton.bind(this));
	}
	onClickSubmit(e) {
		// console.log(this);
		e.preventDefault();
		// console.log(e.target.id); id로 분기잡아서 로직을 나눠볼까..?

		const res = parseFormData(e.target);

		this.models.stationModel.addStation({name: res["station-name-input"], id: genUUID()});
		console.log(this.models.stationModel.getStations());
		this.views.stationView.render(this.models.stationModel.getStations());
	}

	onClickButton(e) {
		console.log(e.target.dataset);
		if (e.target.dataset.index === "0") {
			this.views.stationView.render(this.models.stationModel.getStations());
			this.views.stationView.bindOnClickSubmit(this.onClickSubmit.bind(this));
		}
	}
}
