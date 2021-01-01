export default class Table {
	constructor($target) {
		this.$target = $target;
		this.$table = document.createElement("table");
		this.$target.appendChild(this.$table);
		this.$thead = document.createElement("thead");
		this.$table.appendChild(this.$thead);
		this.$tbody = document.createElement("tbody");
		this.$table.appendChild(this.$tbody);
	}

	createHeaders(headers) {
		const $tr = document.createElement("tr");
		const textHeaders = headers
			.map((header) => {
				return `<th>${header}</th>`;
			})
			.join("");
		$tr.innerHTML = textHeaders;
		this.$thead.appendChild($tr);
	}

	render(data, renderer, onClickRemove) {
		const textTbody = data.map(renderer).join("");
		this.$tbody.innerHTML = textTbody;
		if (onClickRemove) {
			this.$tbody.addEventListener("click", onClickRemove);
		}
	}

	// findTr
	// 1. selector에 line, station, section 등 선택자를 string값으로 인자에 명시적
	// 으로 관리하는 방법 vs 2. 추상화 정도를 높여 data-id로 모든 table삭제 로직을 관리
	// findTrByIdAndSelector(id, selector) {
	// 	const tr = this.$tbody.querySelector(`[data-${selector}-id='${id}']`);
	//     return tr;
	// }
	findTrById(id) {
		const tr = this.$tbody.querySelector(`[data-id='${id}']`);
		return tr;
	}
}
