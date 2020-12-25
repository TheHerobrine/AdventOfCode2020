function transform(number, loopSize) {
    let value = 1;

    for (let i = 0; i < loopSize; i++) {
        value *= number;
        value %= 20201227;
    }

    return value;
}

function findLoop(number, result) {
    let value = 1;
    let loopSize = 0;

    while (value !== result) {
        value *= number;
        value %= 20201227;
        loopSize++;
    }

    return loopSize;
}


function run1(data) {

    let cardLoopSize = findLoop(7, data[0]);
    let doorLoopSize = findLoop(7, data[1]);

    if (cardLoopSize > doorLoopSize) {
        return transform(data[0], doorLoopSize);
    } else {
        return transform(data[1], cardLoopSize);
    }
}

module.exports = {run1};
