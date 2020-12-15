import StationModel from "./Station.js";
import {genUUID} from "../../utils.js";

describe("station Model", () => {
	beforeEach(() => {
		localStorage.clear();
	});
	it("잘 생성되었나?", () => {
		const stationModel = new StationModel();
		expect(stationModel.getStations()).toStrictEqual([]);
	});

	it("잘 추가 되나", () => {
		const stationModel = new StationModel();
		const id = genUUID();
		const newStation = {name: "선릉", id};
		stationModel.addStation(newStation);
		expect(stationModel.getStations()).toStrictEqual([newStation]);
	});
	it("잘 추가 되나2", () => {
		const stationModel = new StationModel();
		const id = genUUID();
		const newStation = {name: "선릉", id};
		stationModel.addStation(newStation);
		const id1 = genUUID();
		const newStation1 = {name: "시흥", id1};
		stationModel.addStation(newStation1);
		expect(stationModel.getStations()).toStrictEqual([newStation, newStation1]);
	});
	it("잘 삭제 되나", () => {
		const stationModel = new StationModel();
		const id = genUUID();
		const newStation = {name: "선릉", id};
		stationModel.addStation(newStation);

		stationModel.removeStationById(id);
		expect(stationModel.getStations()).toStrictEqual([]);
	});
	it("없는 id로 삭제하면 잘 삭제가 되나?", () => {
		const stationModel = new StationModel();
		const id = genUUID();
		const newStation = {name: "선릉", id};
		stationModel.addStation(newStation);
		const notExistId = "123";
		stationModel.removeStationById(notExistId);

		expect(stationModel.getStations()).toStrictEqual([newStation]);
	});
});
