import LineModel from "./Line.js";
import { genUUID } from "../../utils.js";

describe("Line Model", () => {
    beforeEach(() => {
        localStorage.clear();
    })
    it("잘 생성되었나?", () => {
        const lineModel = new LineModel();
        expect(lineModel.getLines()).toStrictEqual([]);
    });
    it("잘  추가 되는가?", () => {
        const lineModel = new LineModel();
        const newLine = { name: '1호선', id: genUUID(), sections: [genUUID(), genUUID()] }
        lineModel.addLine(newLine)
        expect(lineModel.getLines()).toStrictEqual([newLine]);
    });
    it("잘  추가 되는가2?", () => {
        const lineModel = new LineModel();
        const newLine = { name: '1호선', id: genUUID(), sections: [genUUID(), genUUID()] }
        const newLine1 = { name: '2호선', id: genUUID(), sections: [genUUID(), genUUID()] }
        lineModel.addLine(newLine)
        lineModel.addLine(newLine1)
        expect(lineModel.getLines()).toStrictEqual([newLine,newLine1]);
    });
    
    it("잘  삭제 되는가?", () => {
        const lineModel = new LineModel();
        const newLine = { name: '1호선', id: genUUID(), sections: [genUUID(), genUUID()] }
        const newLine1 = { name: '2호선', id: genUUID(), sections: [genUUID(), genUUID()] }
        lineModel.addLine(newLine)
        lineModel.addLine(newLine1)

        lineModel.removeLineById(newLine1.id)
        expect(lineModel.getLines()).toStrictEqual([newLine]);
    });
    it("잘  삭제 되는가?2", () => {
        const lineModel = new LineModel();
        const newLine = { name: '1호선', id: genUUID(), sections: [genUUID(), genUUID()] }
        const newLine1 = { name: '2호선', id: genUUID(), sections: [genUUID(), genUUID()] }
        lineModel.addLine(newLine)
        lineModel.addLine(newLine1)
    
        lineModel.removeLineById(newLine.id)
        expect(lineModel.getLines()).toStrictEqual([newLine1]);
    });
})
describe("section part", () => {
    beforeEach(() => {
        localStorage.clear();
    })
    it("구간이 잘 생성 되었나?", () => {
        const lineModel = new LineModel();
        const lineId = genUUID()
        const startStationId = genUUID()
        const endStationId = genUUID()
        const newLine = { name: '1호선', id: lineId, sections: [startStationId, endStationId] }
        lineModel.addLine(newLine)

        const {sections} = lineModel.findLineById(lineId)
        
        expect(sections).toStrictEqual([startStationId,endStationId]);
    });
    it("구간 맨 앞에 새로운 역이 잘 들어 가는가", () => {
        const lineModel = new LineModel();
        const lineId = genUUID()
        const startStationId = genUUID()
        const endStationId = genUUID()

        const newStationId = genUUID()

        const newLine = { name: '1호선', id: lineId, sections: [startStationId, endStationId] }
        lineModel.addLine(newLine)
        lineModel.insertSectionAt(lineId, newStationId, 0)

        const {sections} = lineModel.findLineById(lineId)
        
        expect(sections).toStrictEqual([newStationId,startStationId,endStationId]);
    });
    it("구간  중간에 새로운 역이 잘 들어 가는가", () => {
        const lineModel = new LineModel();
        const lineId = genUUID()
        const startStationId = genUUID()
        const endStationId = genUUID()

        const newStationId = genUUID()

        const newLine = { name: '1호선', id: lineId, sections: [startStationId, endStationId] }
        lineModel.addLine(newLine)
        lineModel.insertSectionAt(lineId, newStationId, 1)

        const {sections} = lineModel.findLineById(lineId)
        
        expect(sections).toStrictEqual([startStationId,newStationId,endStationId]);
    });
    it("3개의 구간 중 맨 앞이 잘 지워 지는가", () => {
        const lineModel = new LineModel();
        const lineId = genUUID()
        const startStationId = genUUID()
        const endStationId = genUUID()

        const newStationId = genUUID()

        const newLine = { name: '1호선', id: lineId, sections: [startStationId, endStationId] }
        
        lineModel.addLine(newLine)
        // 현재 [startStationId,newStationId,endStationId]
        lineModel.insertSectionAt(lineId, newStationId, 1)

        lineModel.removeSectionByStationId(lineId,startStationId)
        const {sections} = lineModel.findLineById(lineId)
        
        expect(sections).toStrictEqual([newStationId,endStationId]);
    });
    it("3개의 구간 중  가운데 역이 잘 지워 지는가", () => {
        const lineModel = new LineModel();
        const lineId = genUUID()
        const startStationId = genUUID()
        const endStationId = genUUID()

        const newStationId = genUUID()

        const newLine = { name: '1호선', id: lineId, sections: [startStationId, endStationId] }
        
        lineModel.addLine(newLine)
        // 현재 [startStationId,newStationId,endStationId]
        lineModel.insertSectionAt(lineId, newStationId, 1)

        lineModel.removeSectionByStationId(lineId,newStationId)
        const {sections} = lineModel.findLineById(lineId)
        
        expect(sections).toStrictEqual([startStationId,endStationId]);
    });
    
    it("3개의 구간 중  마지막 역이 잘 지워 지는가", () => {
        const lineModel = new LineModel();
        const lineId = genUUID()
        const startStationId = genUUID()
        const endStationId = genUUID()

        const newStationId = genUUID()

        const newLine = { name: '1호선', id: lineId, sections: [startStationId, endStationId] }
        
        lineModel.addLine(newLine)
        // 현재 [startStationId,newStationId,endStationId]
        lineModel.insertSectionAt(lineId, newStationId, 1)

        lineModel.removeSectionByStationId(lineId,endStationId)
        const {sections} = lineModel.findLineById(lineId)
        
        expect(sections).toStrictEqual([startStationId,newStationId]);
    });
    
})