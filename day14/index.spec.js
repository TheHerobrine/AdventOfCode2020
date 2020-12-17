const fs = require("fs");
const {run1, run2} = require("./index.js");

describe("day14 run1", () => {
    test("run", () => {
        const data = [
            "mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X",
            "mem[8] = 11",
            "mem[7] = 101",
            "mem[8] = 0"
        ];

        const response = run1(data);

        expect(response).toBe(165);
    });
    test("full run", () => {
        const input = fs.readFileSync(__dirname + "/input.txt", "utf8");
        const data = input.toString().split("\r\n");
        data.splice(-1, 1);

        const response = run1(data);

        console.log(response);
    });
});

describe("day14 run2", () => {
    test("run test", () => {
        const data = [
            "mask = 000000000000000000000000000000X1001X",
            "mem[42] = 100",
            "mask = 00000000000000000000000000000000X0XX",
            "mem[26] = 1"
        ];

        const response = run2(data);

        expect(response).toBe(208);
    });
    test("full run", () => {
        const input = fs.readFileSync(__dirname + "/input.txt", "utf8");
        const data = input.toString().split("\r\n");
        data.splice(-1, 1);

        const response = run2(data);

        console.log(response);
    });
});
