import { setLocalStorage, getLocalStorageByKey } from "./utils.js";

export default class StationModel {
	constructor(stations = []) {
		setLocalStorage("stations", stations);
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
	addStation(station) {
		const stations = this.getStations();
		const newStations = [...stations, { ...station }];
		setLocalStorage("stations", newStations);
	}
	/**
	 * @param id uuid
	 * **/
	removeStationById(id) {
		const stations = this.getStations();
		const newStations = stations.filter((station) => station.id !== id);
		setLocalStorage("stations", newStations);
	}
}
