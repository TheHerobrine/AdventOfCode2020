const fs = require("fs");
const {run1, run2} = require("./index.js");

describe("day05 run1", () => {
    test("run", () => {
        const data = [
            "BFFFBBFRRR",
            "FFFBBBFRRR",
            "BBFFBBFRLL",
        ];

        const response = run1(data);

        expect(response).toBe(820);
    });
    test("full run", () => {
        const input = fs.readFileSync(__dirname + "/input.txt", "utf8");
        const data = input.toString().split("\r\n");
        data.splice(-1, 1);

        const response = run1(data);

        console.log(response);
    });
});

describe("day05 run2", () => {
    test("full run", () => {
        const input = fs.readFileSync(__dirname + "/input.txt", "utf8");
        const data = input.toString().split("\r\n");
        data.splice(-1, 1);

        const response = run2(data);

        console.log(response);
    });
});
