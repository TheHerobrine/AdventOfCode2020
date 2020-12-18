const fs = require("fs");
const {run1, run2} = require("./index.js");

describe("day18 run1", () => {
    test("run", () => {
        const data = [
            "1 + 2 * 3 + 4 * 5 + 6"
        ];

        const response = run1(data);

        expect(response).toBe(71);
    });
    test("run2", () => {
        const data = [
            "1 + (2 * 3) + (4 * (5 + 6))"
        ];

        const response = run1(data);

        expect(response).toBe(51);
    });
    test("run3", () => {
        const data = [
            "2 * 3 + (4 * 5)",
            "5 + (8 * 3 + 9 + 3 * 4 * 3)",
            "5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))",
            "((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2"
        ];

        const response = run1(data);

        expect(response).toBe(26 + 437 + 12240 + 13632);
    });
    test("full run", () => {
        const input = fs.readFileSync(__dirname + "/input.txt", "utf8");
        const data = input.toString().split("\r\n");
        data.splice(-1, 1);

        const response = run1(data);

        console.log(response);
    });
});

describe("day18 run2", () => {
    test("run test", () => {
        const data = [
            "2 * 3 + (4 * 5)"
        ];

        const response = run2(data);

        expect(response).toBe(46);
    });
    test("full run", () => {
        const input = fs.readFileSync(__dirname + "/input.txt", "utf8");
        const data = input.toString().split("\r\n");
        data.splice(-1, 1);

        const response = run2(data);

        console.log(response);
    });
});
