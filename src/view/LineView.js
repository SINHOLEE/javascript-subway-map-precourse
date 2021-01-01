export default class LineView {
	constructor() {
		this.$linesTab = null;
		this.$input = null;
		this.$table = document.createElement("table");
		this.$tbody = null;
		this.$form = null;
	}
	//공통
	setLinesTab($linesTab) {
		this.$linesTab = $linesTab;
	}
	//공통
	clearInputValue() {
		if (this.$input) {
			this.$input.value = "";
		}
	}
	//공통
	_clearTable() {
		if (this.$table) {
			this.$table.remove();
		}
	}
	//공통
	_clearLinesTab() {
		if (this.$linesTab) {
			this.$linesTab.innerHTML = "";
		}
	}
	showTab() {
		this.$linesTab.style.display = "block";
	}

	//공통
	_createInput() {
		const $label = this._createLabel("line-name-input", "노선 이름");
		const $input = document.createElement("input");
		$input.id = "line-name-input";
		$input.name = "name";
		$input.placeholder = "노선 이름을 입력해 주세요.";
		this.$input = $input;
		const div = document.createElement("div");
		div.append($label);
		div.append($input);
		return div;
	}
	_createLabel(tagId, labelInnerText) {
		const $label = document.createElement("label");
		$label.htmlFor = tagId;
		$label.innerText = labelInnerText;
		return $label;
	}

	_createSelectBox(prefix, innerLabelText, stations) {
		const $label = this._createLabel(
			`${prefix}-station-select`,
			innerLabelText
		);
		const $slectBox = document.createElement("select");
		$slectBox.name = `${prefix}StationId`;
		$slectBox.id = `${prefix}-station-select`;
		const optionsHTML = stations
			.map(
				(station) => `<option value='${station.id}'>${station.name}</option>`
			)
			.join("");

		$slectBox.innerHTML = optionsHTML;

		const div = document.createElement("div");
		div.append($label);
		div.append($slectBox);
		return div;
	}

	//공통
	_createAddButton() {
		const $addButton = document.createElement("button");
		$addButton.id = "line-add-button";
		$addButton.innerText = "노선 추가";
		$addButton.type = "submit";

		return $addButton;
	}

	_createForm(stations) {
		const $form = document.createElement("form");
		$form.id = "line-form";

		const inputDiv = this._createInput();
		const startSelectBox = this._createSelectBox(
			"start",
			"상행 노선",
			stations
		);
		const endSelectBox = this._createSelectBox("end", "하행 노선", stations);
		const submitButton = this._createAddButton();

		$form.append(inputDiv);
		$form.append(startSelectBox);
		$form.append(endSelectBox);
		$form.append(submitButton);
		this.$form = $form;

		return $form;
	}
	_createTHead() {
		const $thead = document.createElement("thead");
		const $tr = document.createElement("tr");
		const headers = ["노선이름", "상행 종점역", "하행 종점역", "설정"];
		const textHeaders = headers
			.map((header) => {
				return `<td>${header}</td>`;
			})
			.join("");
		$tr.innerHTML = textHeaders;
		$thead.appendChild($tr);
		return $thead;
	}

	_createTBody(lines) {
		const $tbody = document.createElement("tbody");
		const textTbody = lines
			.map((line) => {
				const { sections } = line;
				return `<tr data-line-id='${line.id}'>
			<td>${line.name}</td>
			<td>${sections[0].name}</td>
			<td>${sections[sections.length - 1].name}</td>
			<td><button>삭제</button></td>
			</tr>`;
			})
			.join("");
		$tbody.innerHTML = textTbody;
		this.$tbody = $tbody;
		return $tbody;
	}
	_createTable(lines) {
		const $table = document.createElement("table");
		this.$table = $table;
		const $thead = this._createTHead();
		const $tbody = this._createTBody(lines);
		this.$table.appendChild($thead);
		this.$table.appendChild($tbody);
		return this.$table;
	}
	render(stations, lines, onClickSubmit, onClickRemove) {
		this._clearLinesTab();
		const $form = this._createForm(stations);
		this.$linesTab.append($form);
		this._clearTable();
		this._createTable(lines);
		this.$linesTab.append(this.$table);
		if (onClickSubmit) {
			this.$form.addEventListener("submit", onClickSubmit);
		}
		if (onClickRemove) {
			this.$tbody.addEventListener("click", onClickRemove);
		}
	}

	removeTrByLineId(lineId) {
		const tr = this.$tbody.querySelector(`[data-line-id='${lineId}']`);
		if (tr) {
			tr.remove();
		}
	}
}
