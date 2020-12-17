const fs = require("fs");
const {run1, run2} = require("./index.js");

describe("day12 run1", () => {
    test("run", () => {
        const data = [
            "F10",
            "N3",
            "F7",
            "R90",
            "F11"
        ];

        const response = run1(data);

        expect(response).toBe(25);
    });
    test("full run", () => {
        const input = fs.readFileSync(__dirname + "/input.txt", "utf8");
        const data = input.toString().split("\r\n");
        data.splice(-1, 1);

        const response = run1(data);

        console.log(response);
    });
});

describe("day12 run2", () => {
    test("run test", () => {
        const data = [
            "F10",
            "N3",
            "F7",
            "R90",
            "F11"
        ];

        const response = run2(data);

        expect(response).toBe(286);
    });
    test("full run", () => {
        const input = fs.readFileSync(__dirname + "/input.txt", "utf8");
        const data = input.toString().split("\r\n");
        data.splice(-1, 1);

        const response = run2(data);

        console.log(response);
    });
});
