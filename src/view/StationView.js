import { stringToDomElement } from "../../utils.js";

export default class StationView {
  constructor() {
    // lazy load??
    this.$container = null;
    this.$stationsTab = null;
    this.$form = null;
    this.$input = null;
    this.$table = document.createElement("table");
    this.$tbody = null;
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
      this.$table.innerHTML = "";
    }
  }
  _clearStationsTab() {
    if (this.$stationsTab) {
      this.$stationsTab.innerHTML = "";
    }
  }
  _clearTableContainer() {
    const $tableContainer = document.getElementById("table-container");
    if ($tableContainer) {
      $tableContainer.remove();
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
    $form.id = "station-name-form";
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

  _createTHead() {
    let tableHTML = "";
    const header = "<thead><tr><th>역 이름</th><th>설정</th></tr></thead>";
    tableHTML += header;
    this.$table.innerHTML = tableHTML;
  }
  _createTBody(stations) {
    const body = stations.map((station) => {
      return `<tr data-station-id='${station.id}'><td>${station.name}</td><td><button>삭제</button></td></tr>`;
    });
    const HTMLTbodyString = `<tbody>` + body.join("") + `</tbody>`.trim();

    // text to dom trick
    this.$tbody = stringToDomElement(HTMLTbodyString);

    this.$table.append(this.$tbody);
  }
  showTable(stations) {
    this._clearTable();
    this._createTHead();
    this._createTBody(stations);
    this.$stationsTab.append(this.$table);
  }
  showStationsTab() {
    this.$stationsTab.style.display = "block";
  }
  render(stations) {
    this._clearStationsTab();
    this._createForm();
    this._createTitle();
    this.showTable(stations);
  }
  // 사실 컨트롤러 단에서, tr객체를  넘겨줄 수도 있었다.
  // 그렇게 하지 않은 이유는 컨트롤러는 데이터만 다루어야 하기 때문이라고 생각해서 이다.
  // 하지만 그냥 tr객체를 보내서 지워도 된다면? 어떻게 해야할까.
  removeTrByStationId(stationId) {
    const tr = this.$tbody.querySelector(`[data-station-id='${stationId}']`);
    if (tr) {
      tr.remove();
      // 왜 remove는 자기자신이 사라지는건가? yes -> 객체지향적인 동작.
      //   this.$tbody.remove(tr);
    }
  }

  // 여기서 제일 헷갈리는 파트는, bind시점에서 this.$form, this.$table이 없던 시점일지라도,
  // 이벤트리스너가 잘 붙는다는 점이다. 왜지?
  bindOnClickSubmit(onClickSublit) {
    // const form = document.getElementById("station-name-form");
    // 이렇게 하면... 이벤트 리스너는 객체주소에 붙는건가?
    this.$form.addEventListener("submit", onClickSublit);
  }
  bindOnClickRemove(onClickRemove) {
    this.$table.addEventListener("click", onClickRemove);
  }
}
