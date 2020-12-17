import { CONSTANTS } from "../../config.js";

export default class BaseView {
	$app = null;
	constructor($app) {
		this.$app = $app;
		this.$buttonContainer = null;
	}
	_createButtons() {
		const $buttonContainer = document.createElement("div");
		this.$buttonContainer = $buttonContainer;
		this.$buttonContainer.classList.add("btn-container");

		const buttonEls = CONSTANTS.BUTTONS.map(
			(button, index) =>
				`<button type='button' data-index=${index} id='${button.id}-button'>${
					index + 1
				}. ${button.name}</buttopn>`
		).join("");

		this.$buttonContainer.innerHTML = buttonEls;
		this.$app.appendChild($buttonContainer);
	}
	_createMainContainer() {
		const mainContainer = document.createElement("div");
		mainContainer.classList.add("container");
		this.$app.appendChild(mainContainer);
	}
	render() {
		this._createButtons();
		this._createMainContainer();
	}

	bindOnClickButton(onClickButton) {
		this.$buttonContainer.addEventListener("click", onClickButton);
	}
}
