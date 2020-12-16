export default class StationView {
  constructor() { }
  // 여기서 $container를 선언해서 사용하고 싶은데...
  // 생성시점에는 baseView가 render하기 전이라서
  // 매 함수마다 const $container = document.querySelector(".container");
  // 위와같은 선언을 해야한다... 맘에 안든다 어떻게 해야할까?

  _clear() {
    const $container = document.querySelector(".container");
    $container.innerHTML = "";
  }
  render(stations) {
    const $container = document.querySelector(".container");
    this._clear();
    const form = document.createElement("form");
    form.id = "station-name-form";

    const label = document.createElement("label");
    label.htmlFor = "station-name-input";
    label.innerText = "역 이름";

    const input = document.createElement("input");
    input.id = "station-name-input";
    input.name = "station-name-input";
    input.placeholder = "역 이름을 입력해 주세요.";

    const addButton = document.createElement("button");
    addButton.id = "station-add-button";
    addButton.innerText = "역 추가";
    addButton.type = "submit";

    form.appendChild(label);
    form.appendChild(input);
    form.appendChild(addButton);

    $container.appendChild(form);

    const tableContainer = document.createElement("div");

    const title = document.createElement("h1");
    title.innerText = "지하철 역 목록";

    const table = document.createElement("table");
    tableContainer.appendChild(title);
    tableContainer.appendChild(table);

    $container.appendChild(tableContainer);
    console.log(stations);
    let tableHTML = "";
    const header = "<thead><tr><th>역 이름</th><th>설정</th></tr></thead>";
    const body = stations.map((station) => {
      return `<tr><td>${station.name}</td><td><button>삭제</button></td></tr>`;
    });
    tableHTML += header;
    console.log(body.join(""));
    tableHTML += `<tbody>` + body.join("") + `</tbody>`;
    table.innerHTML = tableHTML;
  }
  bindOnClickSubmit(onClickSublit) {
    const form = document.getElementById("station-name-form");
    form.addEventListener("submit", onClickSublit);
  }
}
