import {setLocalStorage, getLocalStorageByKey} from "../../utils.js";

export default class Line {
	constructor() {
		const lines = getLocalStorageByKey("lines") | [];
		setLocalStorage("lines", lines);
		this.lines = lines;
	}

	getLines() {
		return getLocalStorageByKey("lines");
	}
	/**
	 * @param line = {
	 * name string
	 * id uuid
	 * section = [startStationId, endStationId]
	 * }
	 * **/
	addLine(line) {
		const lines = this.getLines();
		const newLines = [...lines, {...line}];
		setLocalStorage("lines", newLines);
	}
	removeLineById(id) {
		const lines = this.getLines();
		const newLines = lines.filter((line) => line.id !== id);
		setLocalStorage("lines", newLines);
	}

	findLineById(id) {
		const lines = this.getLines();
		const selectedLine = lines.find((line) => line.id === id);
		return selectedLine;
	}

	modifiyLine(lineId, newLine) {
		const lines = this.getLines();
		const newLines = lines.map((line) => (line.id === lineId ? newLine : line));
		setLocalStorage("lines", newLines);
	}

	insertSectionInto(sectionIndex, stationId, lineId) {
		const line = this.findLineById(lineId);
		const {section} = line;
		const newSection = [...section.slice(0, sectionIndex), stationId, ...section.slice(sectionIndex)];
		const newLine = {...line, section: newSection};
		this.modifiyLine(lineId, newLine);
	}

	removeSectionById(stationId, lineId) {
		const line = this.findLineById(lineId);
		const {section} = line;
		const newSection = section.filter((sectionItem) => sectionItem !== stationId);
		const newLine = {...line, section: newSection};
		this.modifiyLine(lineId, newLine);
	}
}
