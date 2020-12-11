export default class StationView {
	$app = null;
	constructor($app) {
		this.$app = $app;
		this.createForm();
	}

	createForm() {
		const form = document.createElement("form");

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

		form.appendChild(label);
		form.appendChild(input);
		form.appendChild(addButton);

		this.$app.appendChild(form);
	}
}
