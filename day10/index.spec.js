const fs = require("fs");
const {run1, run2} = require("./index.js");

describe("day10 run1", () => {
    test("run", () => {
        const data = [
            "16",
            "10",
            "15",
            "5",
            "1",
            "11",
            "7",
            "19",
            "6",
            "12",
            "4"
        ];

        const response = run1(data);

        expect(response).toBe(35);
    });
    test("run2", () => {
        const data = [
            "28",
            "33",
            "18",
            "42",
            "31",
            "14",
            "46",
            "20",
            "48",
            "47",
            "24",
            "23",
            "49",
            "45",
            "19",
            "38",
            "39",
            "11",
            "1",
            "32",
            "25",
            "35",
            "8",
            "17",
            "7",
            "9",
            "4",
            "2",
            "34",
            "10",
            "3"
        ];

        const response = run1(data);

        expect(response).toBe(220);
    });
    test("full run", () => {
        const input = fs.readFileSync(__dirname + "/input.txt", "utf8");
        const data = input.toString().split("\r\n");
        data.splice(-1, 1);

        const response = run1(data);

        console.log(response);
    });
});

describe("day10 run2", () => {
    test("run test", () => {
        const data = [
            1,2,3,4,5
        ];

        const response = run2(data);

        expect(response).toBe(7);
    });
    test("run test2", () => {
        const data = [
            1,2,3,5,6,7
        ];

        const response = run2(data);

        expect(response).toBe(7);
    });
    test("run test3", () => {
        const data = [
            1,2,3,4,7,8,9,10
        ];

        const response = run2(data);

        expect(response).toBe(7);
    });
    test("run", () => {
        const data = [
            "16",
            "10",
            "15",
            "5",
            "1",
            "11",
            "7",
            "19",
            "6",
            "12",
            "4"
        ];

        const response = run2(data);

        expect(response).toBe(8);
    });
    test("run2", () => {
        const data = [
            "28",
            "33",
            "18",
            "42",
            "31",
            "14",
            "46",
            "20",
            "48",
            "47",
            "24",
            "23",
            "49",
            "45",
            "19",
            "38",
            "39",
            "11",
            "1",
            "32",
            "25",
            "35",
            "8",
            "17",
            "7",
            "9",
            "4",
            "2",
            "34",
            "10",
            "3"
        ];

        const response = run2(data);

        expect(response).toBe(19208);
    });
    test("full run", () => {
        const input = fs.readFileSync(__dirname + "/input.txt", "utf8");
        const data = input.toString().split("\r\n");
        data.splice(-1, 1);

        const response = run2(data);

        console.log(response);
    });
});
