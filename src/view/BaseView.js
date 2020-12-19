import { CONSTANTS } from "../../config.js";

export default class BaseView {
	$app = null;
	constructor($app) {
		this.$app = $app;
		this.$buttonContainer = null;
		this.$mainContainer = null;
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
		this.$mainContainer = mainContainer
		this.$mainContainer.classList.add("container");
		
		const tabs = ['stations-tab', 'lines-tab', 'sections-tab', 'map-tap']
		const tabEls = tabs.map(tab=>`<div class='tab' style='display:none' id='${tab}'></div>`).join("")

		this.$mainContainer.innerHTML = tabEls
		this.$app.appendChild(this.$mainContainer);
	}
	render(callback) {
		this._createButtons();
		this._createMainContainer();
		if (callback){
			callback(this.$mainContainer)
		}
	}

	bindOnClickButton(onClickButton) {
		this.$buttonContainer.addEventListener("click", onClickButton);
	}
}
