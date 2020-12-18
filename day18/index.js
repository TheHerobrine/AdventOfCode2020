function computeOperation(operation) {
    while (sanitizeOperation(operation)) {
    }

    const numbers = (operation.length - 1) / 2;
    let result = parseInt(operation[0]);
    for (let index = 1; index <= numbers; index++) {
        const operator = operation[index * 2 - 1];

        if (operator === "+") {
            result += parseInt(operation[index * 2]);
        }

        if (operator === "*") {
            result *= parseInt(operation[index * 2]);
        }
    }

    return result;
}

function computeSubOperation(operation) {
    let lastSubIndex = -1;
    let closeSubIndex = -1;

    for (let index = 0; index <= operation.length; index++) {
        if (operation[index] === "(") {
            lastSubIndex = index;
            closeSubIndex = -1;
        }
        if (operation[index] === ")" && closeSubIndex === -1) {
            closeSubIndex = index;
        }
    }

    if (lastSubIndex >= 0) {
        const subOperation = operation.splice(lastSubIndex, (closeSubIndex - lastSubIndex) + 1);
        subOperation.splice(0, 1);
        subOperation.splice(-1, 1);
        operation.splice(lastSubIndex, 0, computeSubOperation(subOperation));
        return computeSubOperation(operation);
    } else {
        return computeOperation(operation);
    }
}

function run1(data) {
    let result = 0;

    for (const line of data) {
        const operation = line.split("").filter(e => e !== " ");
        result += computeSubOperation(operation);
    }

    return result;
}

function sanitizeOperation(operation) {
    for (let i = 0; i < operation.length; i++) {
        if (operation[i] === "+") {
            operation.splice(i - 1, 3, parseInt(operation[i - 1]) + parseInt(operation[i + 1]));
            return true;
        }
    }
    return false;
}

function run2(data) {
    let result = 0;

    for (const line of data) {
        const operation = line.split("").filter(e => e !== " ");
        result += computeSubOperation(operation);
    }

    return result;
}

module.exports = {run1, run2};
