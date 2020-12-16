import { setLocalStorage, getLocalStorageByKey } from "../../utils";

export default class LineModel {
	constructor() {
		const lines = getLocalStorageByKey("lines");
		if (!lines) {
			setLocalStorage("lines", []);
		}
		this.lines = lines;
	}
	getLines() {
		return getLocalStorageByKey("lines");
	}
	/**
	 * line = {
	 * @param name string
	 * @param id uuid
	 * @param sections [startStationId, endStationId]
	 * }
	 * **/
	addLine(line, callback) {
		const lines = this.getLines();
		const newLines = [...lines, { ...line }];
		setLocalStorage("lines", newLines);

		if (callback) callback();
	}
	/**
	 * @param id uuid
	 * **/
	removeLineById(id, callback) {
		const lines = this.getLines();
		const newLines = lines.filter((line) => line.id !== id);
		setLocalStorage("lines", newLines);
		if (callback) callback();
	}

	findLineById(id) {
		const lines = this.getLines();
		return lines.find((line) => line.id === id);
	}

	insertSectionAt(lineId, stationId, index, callback) {
		const lines = this.getLines()
		const line = this.findLineById(lineId);
		const { sections } = line

		const newSections = [...sections.slice(0, index), stationId, ...sections.slice(index)]
		const newLine = { ...line, sections: newSections }
		const newLines = lines.map(currentLine => currentLine.id === newLine.id ? newLine : currentLine)
		setLocalStorage('lines', newLines)
		if (callback) {
			callback()
		}
	}
	removeSectionByStationId(lineId, stationId, callback) {
		const lines = this.getLines()
		const line = this.findLineById(lineId);
		const { sections } = line

		const newSections = sections.filter(sectionId => sectionId !== stationId)
		const newLine = { ...line, sections: newSections }
		const newLines = lines.map(currentLine => currentLine.id === newLine.id ? newLine : currentLine)
		setLocalStorage('lines', newLines)
		if (callback) {
			callback()
		}
	}


}
