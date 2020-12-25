const fs = require("fs");
const {run1, run2} = require("./index.js");

describe("day25 run1", () => {
    test("run", () => {
        const data = [
            5764801,
            17807724
        ];

        const response = run1(data);

        expect(response).toBe(14897079);
    });
    test("full run", () => {
        const data = [
            19774466,
            7290641
        ];

        const response = run1(data);

        console.log(response);
    });
});
