import { StationModel } from "./Station.js";
const stationModel = StationModel();

it("잘 생성되었나?", () => {
	expect(stationModel.getStations()).toBe([]);
});
