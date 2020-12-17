export default class StationView {
	constructor() {
		// lazy load??
		this.$container = null;
	}
	// 여기서 $container를 선언해서 사용하고 싶은데...
	// 생성시점에는 baseView가 render하기 전이라서
	// 매 함수마다 const $container = document.querySelector(".container");
	// 위와같은 선언을 해야한다... 맘에 안든다 어떻게 해야할까?

	_setContainer() {
		if (this.$container) {
			return;
		}
		const $container = document.querySelector(".container");
		this.$container = $container;
	}
	_clear() {
		this.$container.innerHTML = "";
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
		$input.name = "station-name-input";
		$input.placeholder = "역 이름을 입력해 주세요.";

		$form.appendChild($label);
		$form.appendChild($input);
	}

	_createAddButton($form) {
		const $addButton = document.createElement("button");
		$addButton.id = "station-add-button";
		$addButton.innerText = "역 추가";
		$addButton.type = "submit";

		$form.appendChild($addButton);
	}
	_createForm() {
		const $form = document.createElement("form");
		$form.id = "station-name-form";

		this._createInput($form);
		this._createAddButton($form);

		this.$container.appendChild($form);
	}
	showTable(stations) {
		// 아.. 이부분도 맘에 안듬... 흠..
		this._clearTableContainer();
		const tableContainer = document.createElement("div");
		tableContainer.id = "table-container";

		const title = document.createElement("h1");
		title.innerText = "지하철 역 목록";
		tableContainer.appendChild(title);

		const table = document.createElement("table");

		let tableHTML = "";
		const header = "<thead><tr><th>역 이름</th><th>설정</th></tr></thead>";
		const body = stations.map((station) => {
			return `<tr><td>${station.name}</td><td><button>삭제</button></td></tr>`;
		});
		tableHTML += header;
		tableHTML += `<tbody>` + body.join("") + `</tbody>`;
		table.innerHTML = tableHTML;

		tableContainer.appendChild(table);
		this.$container.appendChild(tableContainer);
	}

	render(stations) {
		this._setContainer(); // 아... 진짜 그냥 새로 index.html 에 작성해놓을까;
		this._clear();
		// 이러면 안대....ㅠㅠㅠㅠ아놔
		// this._clear();
		// this._setContainer(); // 아... 진짜 그냥 새로 index.html 에 작성해놓을까;
		this._createForm();
		this.showTable(stations);
	}
	bindOnClickSubmit(onClickSublit) {
		const form = document.getElementById("station-name-form");
		form.addEventListener("submit", onClickSublit);
	}
}
