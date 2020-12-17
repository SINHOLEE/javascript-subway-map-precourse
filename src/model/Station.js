import {setLocalStorage, getLocalStorageByKey} from "../../utils.js";

export default class StationModel {
	constructor() {
		const stations = getLocalStorageByKey("stations");
		if (!stations) {
			setLocalStorage("stations", []);
		}
		this.stations = stations;
	}

	getStations() {
		return getLocalStorageByKey("stations");
	}
	/**
	 * station = {
	 * @param name string
	 * @param id uuid
	 * }
	 * **/

	addStation(station, callback) {
		const stations = this.getStations();
		const newStations = [...stations, {...station}];
		setLocalStorage("stations", newStations);

		if (callback) callback();
	}
	/**
	 * @param id uuid
	 * **/
	removeStationById(id, callback) {
		const stations = this.getStations();
		const newStations = stations.filter((station) => station.id !== id);
		setLocalStorage("stations", newStations);
		if (callback) callback();
	}
}
