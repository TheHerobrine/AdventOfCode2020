function run1(data) {
    data.push("");

    let currentResponses = new Set();
    let count = 0;

    for (const line of data) {
        if (line === "") {
            count += currentResponses.size;
            currentResponses = new Set();
        } else {
            currentResponses = new Set([...currentResponses, ...line]);
        }
    }

    return count;
}

function run2(data) {
    data.push("");

    let currentResponses = {};
    let currentNumber = 0;
    let count = 0;

    for (const line of data) {
        if (line === "") {
            for (const response in currentResponses) {
                if (currentResponses[response] === currentNumber) {
                    count++;
                }
            }
            currentResponses = {};
            currentNumber = 0;
        } else {
            currentNumber++;
            for (const answer of line) {
                if (!currentResponses[answer]) {
                    currentResponses[answer] = 1;
                } else {
                    currentResponses[answer]++;
                }
            }
        }
    }

    return count;
}


module.exports = {run1, run2};
