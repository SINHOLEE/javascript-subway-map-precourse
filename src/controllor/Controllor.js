export default class Controllor {
	constructor(models, views) {
		this.models = models;
		this.views = views;
		this.init();
	}

	init() {
		const { baseView } = this.views;
		baseView.render();
		baseView.bindOnClickButton(this.onClickButton.bind(this));
	}

	onClickButton(e) {
		console.log(e.target.dataset);
		if (e.target.dataset.index === "0") {
			this.views.stationView.render();
		}
	}
}
