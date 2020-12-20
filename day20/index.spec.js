const fs = require("fs");
const {run1, run2} = require("./index.js");

describe("day20 run1", () => {
    test("run", () => {
        const input = fs.readFileSync(__dirname + "/input_test.txt", "utf8");
        const data = input.toString().split("\r\n");
        data.splice(-1, 1);

        const response = run1(data);

        expect(response).toBe(20899048083289);
    });
    test("full run", () => {
        const input = fs.readFileSync(__dirname + "/input.txt", "utf8");
        const data = input.toString().split("\r\n");
        data.splice(-1, 1);

        const response = run1(data);

        console.log(response);
    });
});

describe("day20 run2", () => {
    test("run", () => {
        const input = fs.readFileSync(__dirname + "/input_test.txt", "utf8");
        const data = input.toString().split("\r\n");
        data.splice(-1, 1);

        const response = run2(data);

        expect(response).toBe(273);
    });
    test("full run", () => {
        const input = fs.readFileSync(__dirname + "/input.txt", "utf8");
        const data = input.toString().split("\r\n");
        data.splice(-1, 1);

        const response = run2(data);

        console.log(response);
    });
});
