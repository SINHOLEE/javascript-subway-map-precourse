import StationModel from "./Station.js";
import { genUUID } from "./utils";

describe("station Model", () => {
	test("잘 생성되었나?", () => {
		const stationModel = new StationModel();
		expect(stationModel.getStations()).toStrictEqual([]);
	});

	test("잘 추가 되나", () => {
		const stationModel = new StationModel();
		const id = genUUID();
		const newStation = { name: "선릉", id };
		stationModel.addStation(newStation);
		expect(stationModel.getStations()).toStrictEqual([newStation]);
	});
	test("잘 삭제 되나", () => {
		const stationModel = new StationModel();
		const id = genUUID();
		const newStation = { name: "선릉", id };
		stationModel.addStation(newStation);

		stationModel.removeStationById(id);
		expect(stationModel.getStations()).toStrictEqual([]);
	});
	test("없는 id로 삭제하면 잘 삭제가 되나?", () => {
		const stationModel = new StationModel();
		const id = genUUID();
		const newStation = { name: "선릉", id };
		stationModel.addStation(newStation);
		const notExistId = "123";
		stationModel.removeStationById(notExistId);

		expect(stationModel.getStations()).toStrictEqual([newStation]);
	});
});
