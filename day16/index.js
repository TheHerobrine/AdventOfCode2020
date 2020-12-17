function run1(data) {
    let lineIndex = 0;

    const memory = {};
    const invalidValues = [];

    while (data[lineIndex] !== "") {
        const line = data[lineIndex].split(": ");
        const typeName = line[0];
        const values = line[1].split(" or ");
        const firstValues = values[0].split("-");
        const secondValues = values[1].split("-");
        memory[typeName] = [
            {min: parseInt(firstValues[0]), max: parseInt(firstValues[1])},
            {min: parseInt(secondValues[0]), max: parseInt(secondValues[1])}
        ];
        lineIndex++;
    }

    lineIndex += 5;

    while (data[lineIndex]) {
        const line = data[lineIndex].split(",");
        isValidTicket(line);
        lineIndex++;
    }

    return invalidValues.reduce((a, b) => a + b);

    function isValidTicket(line) {
        for (let value of line) {
            value = parseInt(value);
            if (!isValidValue(value)) {
                invalidValues.push(value);
            }
        }
    }

    function isValidValue(value) {
        for (const type of Object.values(memory)) {
            if (isValidType(value, type)) {
                return true;
            }
        }
        return false;
    }

    function isValidType(value, type) {
        return isBetween(value, type[0]) || isBetween(value, type[1]);
    }

    function isBetween(value, bounds) {
        return value >= bounds.min && value <= bounds.max;
    }
}

function run2(data) {
    let lineIndex = 0;

    const memory = {};

    while (data[lineIndex] !== "") {
        const line = data[lineIndex].split(": ");
        const typeName = line[0];
        const values = line[1].split(" or ");
        const firstValues = values[0].split("-");
        const secondValues = values[1].split("-");
        memory[typeName] = {
            ranges: [
                {min: parseInt(firstValues[0]), max: parseInt(firstValues[1])},
                {min: parseInt(secondValues[0]), max: parseInt(secondValues[1])}
            ]
        };
        lineIndex++;
    }

    lineIndex += 2;
    const myTicket = data[lineIndex].split(",");
    const possiblePositions = [];

    for (let i = 0; i < myTicket.length; i++) {
        possiblePositions.push(i);
    }

    for (const typeName of Object.keys(memory)) {
        memory[typeName].possiblePositions = [...possiblePositions];
    }

    lineIndex += 3;
    const takenPositions = [];

    while (data[lineIndex]) {
        const line = data[lineIndex].split(",");
        if (isValidTicket(line)) {
            for (let i = 0; i < line.length; i++) {
                for (const type of Object.values(memory)) {
                    if (type.possiblePositions.includes(i)) {
                        if (!isValidType(line[i], type)) {
                            type.possiblePositions = type.possiblePositions.filter(position => position !== i);
                        }
                    }
                }
            }
        }
        lineIndex++;
    }

    let severalPosition = true;

    while (severalPosition) {
        severalPosition = false;
        for (const type of Object.values(memory)) {
            if (type.possiblePositions.length === 1) {
                takenPositions.push(type.possiblePositions[0]);
            } else {
                type.possiblePositions = type.possiblePositions.filter(position => !takenPositions.includes(position));
                severalPosition = true;
            }
        }
    }

    let result = 1;

    for (const typeName of Object.keys(memory)) {
        if (typeName.startsWith("departure")) {
            result *= myTicket[memory[typeName].possiblePositions[0]];
        }
    }

    return result;

    function isValidTicket(line) {
        for (let value of line) {
            value = parseInt(value);
            if (!isValidValue(value)) {
                return false;
            }
        }
        return true;
    }

    function isValidValue(value) {
        for (const type of Object.values(memory)) {
            if (isValidType(value, type)) {
                return true;
            }
        }
        return false;
    }

    function isValidType(value, type) {
        return isBetween(value, type.ranges[0]) || isBetween(value, type.ranges[1]);
    }

    function isBetween(value, bounds) {
        return value >= bounds.min && value <= bounds.max;
    }
}

module.exports = {run1, run2};
