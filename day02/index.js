function run1(data) {
    let count = 0;

    for (const line of data) {
        const lineData = parseLine(line);
        const occurrences = countLetter(lineData.password, lineData.letter);
        if (occurrences >= lineData.appearance.min && occurrences <= lineData.appearance.max) {
            count++;
        }
    }

    return count;

    function parseLine(line) {
        const splitLine = line.split(" ");
        const splitTimes = splitLine[0].split("-");
        return {
            letter: splitLine[1][0],
            appearance: {
                min: splitTimes[0],
                max: splitTimes[1]
            },
            password: splitLine[2]
        };
    }

    function countLetter(string, letter) {
        return [...string].filter(char => char === letter).length;
    }
}

function run2(data) {
    let count = 0;

    for (const line of data) {
        const lineData = parseLine(line);

        const appearance = {
            first: (lineData.password[lineData.appearance.first - 1] === lineData.letter),
            second: (lineData.password[lineData.appearance.second - 1] === lineData.letter),
        };
        if (appearance.first ^ appearance.second) {
            count++;
        }
    }

    return count;

    function parseLine(line) {
        const splitLine = line.split(" ");
        const splitTimes = splitLine[0].split("-");
        return {
            letter: splitLine[1][0],
            appearance: {
                first: splitTimes[0],
                second: splitTimes[1]
            },
            password: splitLine[2]
        };
    }
}

module.exports = {run1, run2};
