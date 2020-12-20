export default class LineView {
  constructor() {
    this.$linesTab = null;
    this.$form = null;
    this.$input = null;
    this.$table = document.createElement("table");
    this.$tbody = null;
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
    const $label = document.createElement("label");
    $label.htmlFor = "line-name-input";
    $label.innerText = "노선 이름";

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

  _createSelectBox(prefix, labelInnerText, stations) {
    const $label = document.createElement("label");
    $label.htmlFor = `${prefix}-station-select`;
    $label.innerText = labelInnerText;
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
    this.$form = $form;

    const inputDiv = this._createInput();
    const startSelectBox = this._createSelectBox(
      "start",
      "상행 종점",
      stations
    );
    const endSelectBox = this._createSelectBox("end", "하행 종점", stations);
    const submitButton = this._createAddButton();

    this.$form.append(inputDiv);
    this.$form.append(startSelectBox);
    this.$form.append(endSelectBox);
    this.$form.append(submitButton);

    this.$linesTab.append(this.$form);
    return this.$form;
  }

  render(stations) {
    this._clearLinesTab();
    this._createForm(stations);
  }
}
