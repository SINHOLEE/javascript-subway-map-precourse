function render() {
	const $app = document.getElementById("app");
	const buttonContainer = document.createElement("div");
	buttonContainer.classList.add("btn-container");

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

	buttonContainer.innerHTML = buttonEls;
	buttonContainer.addEventListener("click", (e) => {
		console.log(e.target.dataset);
	});

	app.appendChild(buttonContainer);
}

render();
