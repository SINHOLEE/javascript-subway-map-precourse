import { CONSTANTS } from "../../config.js";

export default class BaseView {
  $app = null;
  constructor($app) {
    this.$app = $app;
    this.$buttonContainer = null;
    this.$mainContainer = null;
    this.$tabEls = null;
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
    const $mainContainer = document.createElement("div");
    this.$mainContainer = $mainContainer;
    this.$mainContainer.classList.add("container");

    const tabs = ["stations-tab", "lines-tab", "sections-tab", "map-tap"];
    const textTabEls = tabs
      .map((tab) => `<div class='tab' style='display:none' id='${tab}'></div>`)
      .join("");

    this.$mainContainer.innerHTML = textTabEls;
    const $tabEls = this.$mainContainer.children;
    // 어ㅏ,..이거 너무 맘에 안드는데
    this.$tabEls = $tabEls;

    this.$app.appendChild(this.$mainContainer);
  }
  render(callback) {
    this._createButtons();
    this._createMainContainer();
    if (callback) {
      callback(this.$mainContainer, this.$tabEls);
    }
  }

  bindOnClickButton(onClickButton) {
    this.$buttonContainer.addEventListener("click", onClickButton);
  }
}

// 현재 내가 느끼는 문제점
// 1. controller에서 사용해야 하는 dom 객체가. baseView에서 랜더링 할때 생성되는 돔 객체들이다.
// 이를 사용하기 위해서는, 생성자에 돔 객체를 선언해놓고, 랜더링 하면서 생성되는 해당 돔(현재 $mainContainer, $tabEls)
// 이 그려질 때 생성해주는 메서드에서 생성자에서 선언된 변수들에 할당하는 방법으로 데이터를 관리하게 된다.
// 컨트롤러에서 callback 함수로 변수를 빼낸다면, 비동기적으로 돔객체 생성 후의 작업을 할 수 있게되는 측면의 장점으로
// 이렇게 설계는 했지만, 너무 로직이 복잡하고, 난잡한 느낌이 든다. 이를 더 깔끔하고 세련되가 만들 수 있지 않을까? 고민이 많다.
