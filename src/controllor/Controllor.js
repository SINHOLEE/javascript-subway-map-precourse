import { parseFormData } from "./utils";

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
	onClickSubmit(e) {
		console.log(this);
		e.preventDefault();
		const res = parseFormData(e.target);
		console.log({ res });
		console.log();
		console.log("123");
		console.log("1234");
	}

	onClickButton(e) {
		console.log(e.target.dataset);
		if (e.target.dataset.index === "0") {
			this.views.stationView.render();
			this.views.stationView.bindOnClickSubmit(this.onClickSubmit.bind(this));
		}
	}
}
