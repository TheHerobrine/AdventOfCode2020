function run1(data) {
    const memoryLength = 25;
    const memory = [];

    for (let index = 0; index < memoryLength; index++) {
        const currentNumber = parseInt(data[index]);
        memory.push(currentNumber);
    }

    for (let index = memoryLength; index < data.length; index++) {
        const currentNumber = parseInt(data[index]);
        if (isValidNumber(currentNumber, [...memory])) {
            memory.shift();
            memory.push(currentNumber);
        } else {
            return currentNumber;
        }
    }
}

function run2(data) {
    const target = 36845998;
    let sum = 0;
    let frontIndex = 0;
    let backIndex = 0;

    while (sum !== target && backIndex < data.length) {
        if (sum < target) {
            const currentNumber = parseInt(data[backIndex++]);
            sum += currentNumber;
        } else if (sum > target) {
            const currentNumber = parseInt(data[frontIndex++]);
            sum -= currentNumber;
        }
    }

    console.log({frontIndex, backIndex});

    let maxNumber = data[frontIndex];
    let minNumber = data[frontIndex];

    for (let index = frontIndex; index < backIndex; index++) {
        const currentNumber = parseInt(data[index]);
        maxNumber = Math.max(maxNumber, currentNumber);
        minNumber = Math.min(minNumber, currentNumber);
    }

    return maxNumber+minNumber;
}

function isValidNumber(target, memory) {
    memory.sort((a, b) => a - b);
    const cursor = {start: 0, end: memory.length - 1};

    let sum = memory[cursor.start] + memory[cursor.end];

    while (sum !== target) {
        if (sum > target) {
            cursor.end--;
            if (cursor.end === cursor.offset) {
                cursor.end--;
            }
        }
        if (sum < target) {
            cursor.start++;
            if (cursor.start === cursor.offset) {
                cursor.start++;
            }
        }
        if (cursor.start > cursor.end) {
            break;
        }
        sum = memory[cursor.start] + memory[cursor.end];
    }

    return sum === target;
}

module.exports = {run1, run2};
