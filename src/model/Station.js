import {setLocalStorage, getLocalStorageByKey} from "../../utils.js";

export default class StationModel {
	constructor() {
		const stations = getLocalStorageByKey("stations");
		if (!stations) {
			setLocalStorage("stations", []);
		}
		this.stations = stations;
	}
	isExistInStation(stationName) {
		return this.getStations().find((station) => station.name === stationName);
	}

	getStations() {
		console.log("in getStations, ", this);
		return getLocalStorageByKey("stations");
	}
	/**
	 * station = {
	 * @param name string
	 * @param id uuid
	 * }
	 * **/
	getStationsByIds(stationIds) {
		const stations = this.getStations();
		return stations.filter((station) => !!~stationIds.indexOf(station.id));
	}

	findStationById(stationId) {
		const stations = this.getStations();

		return stations.find((station) => station.id === stationId);
	}

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
