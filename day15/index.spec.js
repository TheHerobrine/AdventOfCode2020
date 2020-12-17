const fs = require("fs");
const {run1, run2} = require("./index.js");

describe("day14 run1", () => {
    test("run", () => {
        const data = [
            0,3,6
        ];

        const response = run1(data);

        expect(response).toBe(436);
    });
    test("full run", () => {
        const data = [
            0,12,6,13,20,1,17
        ];

        const response = run1(data);

        console.log(response);
    });
});

describe("day14 run2", () => {
    test("run test", () => {
        const data = [
            0,3,6
        ];

        const response = run2(data);

        expect(response).toBe(175594);
    });
    test("full run", () => {
        const data = [
            0,12,6,13,20,1,17
        ];

        const response = run2(data);

        console.log(response);
    });
});
