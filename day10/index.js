function run1(data) {

    const adapters = [];
    let output = 0;

    for (let adapter of data) {
        adapter = parseInt(adapter);
        output = Math.max(output, adapter);
        adapters.push(adapter);
    }

    adapters.sort((a, b) => a - b);

    let voltage = 0;
    const memory = {1: 0, 2: 0, 3: 0, order: []};

    const resultMemory = searchAdaptersOrder(voltage, adapters, memory);
    console.log(resultMemory);
    return resultMemory[1] * (resultMemory[3] + 1);

    function searchAdaptersOrder(voltage, adapters, memory) {
        if (voltage === output) {
            return memory;
        }

        const nextAdapters = findNextAdapters(voltage, adapters);

        if (nextAdapters.length === 0) {
            return false;
        }

        for (let index = 0; index < nextAdapters.length; index++) {
            const nextAdapter = nextAdapters[index];
            const newAdapters = adapters.filter(item => item !== nextAdapter);
            const newMemory = {...memory};
            newMemory.order = [...memory.order, nextAdapter];
            newMemory[Math.abs(nextAdapter - voltage)]++;
            const result = searchAdaptersOrder(nextAdapter, newAdapters, newMemory);

            if (result) {
                return result;
            }
        }
    }

    function findNextAdapters(voltage, adapters) {
        const nextAdapters = [];

        for (let adapter of adapters) {
            if (Math.abs(adapter - voltage) <= 3) {
                if (output === adapter) {
                    if (adapters.length === 1) {
                        nextAdapters.push(adapter);
                    }
                } else {
                    nextAdapters.push(adapter);
                }
            }
        }

        return nextAdapters;


    }
}

function run2(data) {
    const adapters = [];

    for (let adapter of data) {
        adapter = parseInt(adapter);
        adapters.push(adapter);
    }

    adapters.push(0);
    adapters.sort((a, b) => a - b);
    adapters.push(adapters[adapters.length - 1] + 3);

    let count = [];

    console.log(adapters);

    let segmentStart = 0;
    for (let index = 1; index < adapters.length - 1; index++) {
        if (adapters[index + 1] - adapters[index] === 3) {
            let variations = computeVariation({start: segmentStart + 1, end: index}, segmentStart);
            console.log(variations, {start: segmentStart + 1, end: index});
            count.push(variations);
            segmentStart = index;
        }
    }

    console.log(count);

    return count.reduce((a, b) => a * b, 1);

    //2824;


    function computeVariation({start, end}, previousIndex) {
        if (start === end) {
            //console.log("end");
            return 1;
        }

        let total = 0;

        if (adapters[start + 1] - adapters[previousIndex] <= 3) {
            //console.log({previousIndex}, {start, end}, "delete");
            total += computeVariation({start: start + 1, end}, previousIndex);
        }
        if (adapters[start] - adapters[previousIndex] <= 3) {
            //console.log({previousIndex}, {start, end}, "keep");
            total += computeVariation({start: start + 1, end}, start);
        }
        return total;
    }
}

module.exports = {run1, run2};
