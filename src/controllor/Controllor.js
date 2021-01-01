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
	setMainContainer($mainContainer) {
		this.$mainContainer = $mainContainer;
	}
	init() {
		const { baseView, stationView, lineView } = this.views;
		baseView.render(($tabEls) => {
			// this.setMainContainer.bind(this)($mainContainer);

			stationView.setStationsTab($tabEls[0]);
			lineView.setLinesTab($tabEls[1]);
		});
		baseView.bindOnClickButton(this.onClickButton.bind(this));
	}
	getDatasetIdFromTarget(node) {
		if (node.dataset.id) {
			return node.dataset.id;
		}
		return this.getDatasetIdFromTarget(node.parentNode);
	}
	onLineRemove(e) {
		if (e.target.tagName !== "BUTTON") {
			return;
		}
		const lineId = this.getDatasetIdFromTarget(e.target);
		const { lineView } = this.views;
		const { lineModel } = this.models;
		lineModel.removeLineById(lineId, () => {
			lineView.removeTrByLineId(lineId);
		});
	}

	onStationRemove(e) {
		if (e.target.tagName !== "BUTTON") {
			return;
		}
		// 맘에 안드는 파트 하지만 일단 당장해야하니까 넘어간다...
		const selectedStationId = this.getDatasetIdFromTarget(e.target);
		const { stationModel } = this.models;
		const { stationView } = this.views;

		stationModel.removeStationById(selectedStationId, () => {
			stationView.removeTrByStationId(selectedStationId);
		});
	}
	onLineSubmit(e) {
		e.preventDefault();
		const { stationModel, lineModel } = this.models;
		function reRender() {
			const { lineView } = this.views;
			lineView.render(
				stationModel.getStations(),
				lineModel.getLines(),
				this.onLineSubmit.bind(this),
				this.onLineRemove.bind(this)
			);
			// lineView.bindOnClickSubmit(this.onLineSubmit.bind(this));
			// lineView.bindOnClickRemove(this.onLineRemove.bind(this));
		}
		const { name, startStationId, endStationId } = parseFormData(e.target);

		const newLine = {
			name,
			sections: stationModel.getStationsByIds([startStationId, endStationId]),
			id: genUUID(),
		};
		lineModel.addLine(newLine, reRender.bind(this));
	}

	onStationSubmit(e) {
		e.preventDefault();
		function reRender() {
			stationView.render(
				stationModel.getStations(),
				this.onStationRemove.bind(this)
			);
		}

		const { name } = parseFormData(e.target);
		const { stationModel } = this.models;
		const { stationView } = this.views;
		const newStation = {
			name,
			id: genUUID(),
		};
		stationModel.addStation(newStation, reRender.bind(this));
	}

	_renderStationsTab() {
		const { stationView } = this.views;
		const stations = this.models.stationModel.getStations();

		stationView.showStationsTab();
		stationView.render(stations, this.onStationRemove.bind(this));
		// 이 바인드가 비동기 적인가?
		stationView.bindOnClickSubmit(this.onStationSubmit.bind(this));
	}

	_renderLinesTab() {
		const { lineView } = this.views;
		const stations = this.models.stationModel.getStations();
		const lines = this.models.lineModel.getLines();
		lineView.showTab();

		lineView.render(
			stations,
			lines,
			this.onLineSubmit.bind(this),
			this.onLineRemove.bind(this)
		);
	}
	onClickButton(e) {
		const index = e.target.dataset.index;
		const tagName = e.target.tagName.toLowerCase();
		if (tagName != "button") {
			return;
		}
		const { baseView } = this.views;
		baseView.hideAllTabs();
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
