import Table from "../components/Table.js";

export default class StationView {
	constructor() {
		// lazy load??
		this.$stationsTab = null;
		this.$form = null;
		this.$table = null;
		this.$input = null;
	}
	setStationsTab($stationsTab) {
		this.$stationsTab = $stationsTab;
	}
	clearInputValue() {
		if (this.$input) {
			this.$input.value = "";
		}
	}
	_clearTable() {
		if (this.$table) {
			this.$table.remove();
		}
	}
	_clearStationsTab() {
		if (this.$stationsTab) {
			this.$stationsTab.innerHTML = "";
		}
	}
	_createInput($form) {
		const $label = document.createElement("label");
		$label.htmlFor = "station-name-input";
		$label.innerText = "역 이름";

		const $input = document.createElement("input");
		$input.id = "station-name-input";
		$input.name = "name";
		$input.placeholder = "역 이름을 입력해 주세요.";
		this.$input = $input;

		$form.append($label);
		$form.append($input);
	}

	_createAddButton($form) {
		const $addButton = document.createElement("button");
		$addButton.id = "station-add-button";
		$addButton.innerText = "역 추가";
		$addButton.type = "submit";

		$form.append($addButton);
	}
	_createForm() {
		const $form = document.createElement("form");
		$form.id = "station-form";
		this.$form = $form;

		this._createInput($form);
		this._createAddButton($form);

		this.$stationsTab.append($form);
	}
	_createTitle() {
		const title = document.createElement("h1");
		title.innerText = "지하철 역 목록";
		this.$stationsTab.append(title);
	}

	_createTable() {
		this.$table = document.createElement("table");
	}
	trTemplate(station) {
		return `
		<tr data-id='${station.id}'>
			<td>${station.name}</td>
			<td><button>삭제</button></td>
		</tr>
		`;
	}
	showStationsTab() {
		this.$stationsTab.style.display = "block";
	}
	render(stations, onClickRemove) {
		this._clearStationsTab();
		this._createForm();
		this._createTitle();
		this.$table = new Table(this.$stationsTab);
		this.$table.createHeaders(["역 이름", "설정"]);
		this.$table.render(stations, this.trTemplate, onClickRemove);
	}
	// 사실 컨트롤러 단에서, tr객체를  넘겨줄 수도 있었다.
	// 그렇게 하지 않은 이유는 컨트롤러는 데이터만 다루어야 하기 때문이라고 생각해서 이다.
	// 하지만 그냥 tr객체를 보내서 지워도 된다면? 어떻게 해야할까.
	removeTrByStationId(stationId) {
		console.log(stationId);
		const tr = this.$table.findTrById(stationId);
		if (tr) {
			tr.remove();
			// 왜 remove는 자기자신이 사라지는건가? yes -> 객체지향적인 동작.
			//   this.$tbody.remove(tr);
		}
	}

	// 여기서 제일 헷갈리는 파트는, bind시점에서 this.$form, this.$table이 없던 시점일지라도,
	// 이벤트리스너가 잘 붙는다는 점이다. 왜지?
	bindOnClickSubmit(onClickSubmit) {
		// const form = document.getElementById("station-name-form");
		// 이렇게 하면... 이벤트 리스너는 객체주소에 붙는건가?
		this.$form.addEventListener("submit", onClickSubmit);
	}
}
