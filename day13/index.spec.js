const fs = require("fs");
const {run1, run2} = require("./index.js");

describe("day13 run1", () => {
    test("run", () => {
        const data = [
            "939",
            "7,13,x,x,59,x,31,19"
        ];

        const response = run1(data);

        expect(response).toBe(295);
    });
    test("full run", () => {
        const input = fs.readFileSync(__dirname + "/input.txt", "utf8");
        const data = input.toString().split("\r\n");
        data.splice(-1, 1);

        const response = run1(data);

        console.log(response);
    });
});

describe("day13 run2", () => {
    test("run test", () => {
        const data = [
            "939",
            "17,x,13,19"
        ];

        const response = run2(data);

        expect(response).toBe(3417);
    });
    test("full run", () => {
        const input = fs.readFileSync(__dirname + "/input.txt", "utf8");
        const data = input.toString().split("\r\n");
        data.splice(-1, 1);

        const response = run2(data);

        console.log(response);
    });
});
