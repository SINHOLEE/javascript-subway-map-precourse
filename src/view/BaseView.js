export default class BaseView {
	$app = null;
	constructor($app) {
		this.$app = $app;
		this.$buttonContainer = null;
	}
	render() {
		const $buttonContainer = document.createElement("div");
		this.$buttonContainer = $buttonContainer;
		this.$buttonContainer.classList.add("btn-container");

		const buttons = [
			{ name: "역 관리", id: "station-manager" },
			{ name: "노선 관리", id: "line-manager" },
			{ name: "구간 관리", id: "section-manager" },
			{ name: "지하철 노선도 출력", id: "map-print-manager" },
		];

		const buttonEls = buttons
			.map(
				(button, index) =>
					`<button type='button' data-index=${index} id='${button.id}-button'>${
						index + 1
					}. ${button.name}</buttopn>`
			)
			.join("");

		this.$buttonContainer.innerHTML = buttonEls;
		this.$app.appendChild($buttonContainer);

		const mainContainer = document.createElement("div");
		mainContainer.classList.add("container");
		this.$app.appendChild(mainContainer);
	}

	bindOnClickButton(onClickButton) {
		this.$buttonContainer.addEventListener("click", onClickButton);
	}
}
