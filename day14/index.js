const bigInt = require("big-integer");

function run1(data) {
    const memory = {};
    let mask = [];

    for (const line of data) {
        if (line.startsWith("mask")) {
            readMask(line);
        } else {
            readMemory(line);
        }
    }

    return Object.values(memory).reduce((a, b) => a + b);

    function readMemory(memoryLine) {
        memoryLine = memoryLine.split(" ");
        const value = applyMask(parseInt(memoryLine[2]));
        const index = parseInt(memoryLine[0].split("[")[1]);

        memory[index] = value;
    }


    function readMask(maskLine) {
        const maskString = maskLine.split(" ")[2];
        mask = maskString.split("");
    }

    function applyMask(value) {
        const binary = value.toString(2).split("");
        const result = [...mask];
        for (let i = 0; i < result.length; i++) {
            const binaryValue = binary[binary.length - 1 - i];
            if (result[result.length - 1 - i] === "X") {
                result[result.length - 1 - i] = binaryValue ? binaryValue : 0;
            }
        }
        return parseInt(result.join(""), 2);
    }
}

function run2(data) {
    const memory = {};
    let mask = [];

    for (const line of data) {
        if (line.startsWith("mask")) {
            readMask(line);
        } else {
            readMemory(line);
        }
    }

    return Object.values(memory).reduce((a, b) => a + b);

    function readMemory(memoryLine) {
        memoryLine = memoryLine.split(" ");
        const value = parseInt(memoryLine[2]);
        const index = parseInt(memoryLine[0].split("[")[1]);

        const binaryIndex = applyMask(index);
        memoryWrite(binaryIndex, value);
    }


    function readMask(maskLine) {
        const maskString = maskLine.split(" ")[2];
        mask = maskString.split("");
    }

    function applyMask(value) {
        const binary = value.toString(2).split("");
        const result = [...mask];
        for (let i = 0; i < result.length; i++) {
            const binaryValue = binary[binary.length - 1 - i];
            const maskValue = result[result.length - 1 - i];
            if (maskValue === "0") {
                result[result.length - 1 - i] = binaryValue ? binaryValue : 0;
            }
        }
        return result;
    }

    function memoryWrite(binaryIndex, value, index = 0) {
        const length = binaryIndex.length;
        if (length > 0) {
            const head = binaryIndex.shift();
            if (head === "X") {
                memoryWrite([...binaryIndex], value, index);
                index += Math.pow(2, length - 1);
                memoryWrite(binaryIndex, value, index);
            } else {
                if (head === "1") {
                    index += Math.pow(2, length - 1);
                }
                memoryWrite(binaryIndex, value, index);
            }
        } else {
            //console.log(index.toString(2));
            memory[index] = value;
        }
    }
}

module.exports = {run1, run2};
