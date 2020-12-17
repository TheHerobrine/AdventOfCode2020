const fs = require("fs");
const {run1, run2} = require("./index.js");

describe("day02 run1", () => {
    test("run", () => {
        const data = [
            "1-3 a: abcde",
            "1-3 b: cdefg",
            "2-9 c: ccccccccc"
        ];

        const validPasswords = run1(data);

        expect(validPasswords).toBe(2);
    });
    test("full run", () => {
        const input = fs.readFileSync(__dirname + "/input.txt", "utf8");
        const data = input.toString().split("\r\n");
        data.splice(-1, 1);

        const validPasswords = run1(data);

        console.log(validPasswords);
    });
});

describe("day02 run2", () => {
    test("run", () => {
        const data = [
            "1-3 a: abcde",
            "1-3 b: cdefg",
            "2-9 c: ccccccccc"
        ];

        const validPasswords = run2(data);

        expect(validPasswords).toBe(1);
    });
    test("full run", () => {
        const input = fs.readFileSync(__dirname + "/input.txt", "utf8");
        const data = input.toString().split("\r\n");
        data.splice(-1, 1);

        const validPasswords = run2(data);

        console.log(validPasswords);
    });
});
