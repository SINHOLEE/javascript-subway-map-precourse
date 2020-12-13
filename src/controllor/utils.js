export function parseFormData(form) {
	const res = Array.from(form.querySelectorAll("input")).reduce(
		(acc, input) => ({ ...acc, [input.id]: input.value }),
		{}
	);
	return res;
}
