const fs = require("fs");
const {run1, run2} = require("./index.js");

describe("day17 run1", () => {
    test("run", () => {
        const data = [
            ".#.",
            "..#",
            "###"
        ];

        const response = run1(data);

        expect(response).toBe(112);
    });
    test("full run", () => {
        const input = fs.readFileSync(__dirname + "/input.txt", "utf8");
        const data = input.toString().split("\r\n");
        data.splice(-1, 1);

        const response = run1(data);

        console.log(response);
    });
});

describe("day17 run2", () => {
    test("run test", () => {
        const data = [
            ".#.",
            "..#",
            "###"
        ];

        const response = run2(data);

        expect(response).toBe(848);
    });
    test("full run", () => {
        const input = fs.readFileSync(__dirname + "/input.txt", "utf8");
        const data = input.toString().split("\r\n");
        data.splice(-1, 1);

        const response = run2(data);

        console.log(response);
    });
});
