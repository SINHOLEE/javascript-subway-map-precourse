export default class StationModel {
	stations = null;
	constructor(stations = []) {
		localStorage.setItem("stations", stations);
		this.stations = stations;
	}
	getStations() {
		return localStorage.getItem("stations");
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
		localStorage.setItem("stations", newStations);
	}
	/**
	 * @param id uuid
	 * **/
	removeStationById(id) {
		const stations = this.getStations();
		const newStations = stations.fillter((station) => station.id !== id);
		localStorage.setItem("stations", newStations);
	}
}
