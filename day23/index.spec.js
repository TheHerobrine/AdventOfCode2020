const fs = require("fs");
const {run1, run2} = require("./index.js");

describe("day23 run1", () => {
    test("run", () => {
        const data = ["389125467"];

        const response = run1(data);

        expect(response).toBe(67384529);
    });
    test("full run", () => {
        const data = ["487912365"];

        const response = run1(data);

        console.log(response);
    });
});

describe("day23 run2", () => {
    test("run test", () => {
        const data = ["389125467"];

        const response = run2(data);

        expect(response).toBe(149245887792);
    });
    test("full run", () => {
        const data = ["487912365"];

        const response = run2(data);

        console.log(response);
    });
});
