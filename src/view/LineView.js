import Table from "../components/Table.js";
import { CONSTANTS } from "../../config.js";
export default class LineView {
	constructor() {
		this.$linesTab = null;
		this.$input = null;
		this.$table = null;
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

	trTemplate(line) {
		const { sections } = line;
		return `
		<tr data-id='${line.id}'>
			<td>${line.name}</td>
			<td>${sections[0].name}</td>
			<td>${sections[sections.length - 1].name}</td>
			<td><button>삭제</button></td>
		</tr>
		`;
	}

	render(stations, lines, onClickSubmit, onClickRemove) {
		this._clearLinesTab();
		const $form = this._createForm(stations);
		this.$linesTab.append($form);
		if (onClickSubmit) {
			this.$form.addEventListener("submit", onClickSubmit);
		}
		this.$table = new Table(this.$linesTab);
		this.$table.createHeaders(CONSTANTS.LINEHEADERS);
		this.$table.render(lines, this.trTemplate, onClickRemove);
	}

	removeTrByLineId(lineId) {
		const tr = this.$table.findTrById(lineId);
		if (tr) {
			tr.remove();
		}
	}
}
