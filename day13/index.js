const bigInt = require("big-integer");

function run1(data) {
    const currentTime = parseInt(data[0]);
    const busArray = data[1].split(",");

    const result = {
        line: -1,
        timeDiff: 100000
    };

    for (const bus of busArray) {
        if (bus === "x") {
            continue;
        }
        const line = parseInt(bus);
        const timeDiff = bus - currentTime % bus;

        if (timeDiff < result.timeDiff) {
            result.timeDiff = timeDiff;
            result.line = line;
        }
    }

    console.log(result);

    return result.timeDiff * result.line;
}

function run2(data) {
    const busArray = data[1].split(",");
    const departure = [];

    let n = 1;

    for (let timeOffset = 0; timeOffset < busArray.length; timeOffset++) {
        if (busArray[timeOffset] === "x") {
            continue;
        }

        const bus = parseInt(busArray[timeOffset]);
        n *= bus;

        departure.push({
            bus: bus,
            timeOffset: (10*bus-timeOffset)%bus
        });
    }

    const e = [];

    for (let i = 0; i < departure.length; i++) {
        const n_i = bigInt(departure[i].bus);
        const np_i = bigInt(n / n_i);
        let ei = bigInt(0);

        for (let j = 1; j < n_i; j++) {
            if ((j * np_i) % n_i === 1) {
                ei = np_i.multiply(j);
                break;
            }
        }
        e.push(ei);
    }

    let solution = bigInt(0);

    for (let i = 0; i < departure.length; i++) {
        console.log(departure[i].timeOffset)
        solution = solution.add(e[i].multiply(departure[i].timeOffset));
        solution = solution.mod(n);
    }

    return solution.mod(n);
}

module.exports = {run1, run2};
