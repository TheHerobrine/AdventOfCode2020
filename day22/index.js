function readData(data) {
    const memory = [[], []];

    let index = 0;
    let player = -1;

    while (data[index] !== undefined) {
        const line = data[index];
        if (line.startsWith("Player")) {
            player++;
        } else if (line !== "") {
            memory[player].push(parseInt(line));
        }
        index++;
    }

    return memory;
}

function round(memory) {
    const cards = [
        memory[0].shift(),
        memory[1].shift()
    ];

    if (cards[0] > cards[1]) {
        memory[0].push(cards[0], cards[1]);
    } else {
        memory[1].push(cards[1], cards[0]);
    }
}


function run1(data) {
    const memory = readData(data);

    while (memory[0].length && memory[1].length) {
        round(memory);
    }

    const winner = memory[0].length ? 0 : 1;
    let score = 0;

    for (let i = 0; i < memory[winner].length; i++) {
        score += memory[winner][i] * (memory[winner].length - i);
    }

    return score;
}

function recursiveGame(memory) {
    const configurationSave = [];

    while (memory[0].length && memory[1].length) {
        recursiveRound(memory, configurationSave);
    }

    const winner = memory[0].length ? 1 : 2;

    //console.log("Winner of subgame: " + winner);

    return winner;
}

function recursiveRound(memory, configurationSave) {

    const cardsPrint = memory[0].join(",") + ";" + memory[1].join(",");

    if (configurationSave.includes(cardsPrint)) {
        memory[1].length = 0;
        return;
    }

    configurationSave.push(cardsPrint);

    const cards = [
        memory[0].shift(),
        memory[1].shift()
    ];

    //console.log(cards);

    let winner;






    if (memory[0].length >= cards[0] && memory[1].length >= cards[1]) {
        //console.log("Recursive");
        winner = recursiveGame([[...memory[0].slice(0, cards[0])], [...memory[1].slice(0, cards[1])]]);
        memory[winner - 1].push(cards[winner-1], cards[1-(winner-1)]);
    } else {
        winner = cards[0] > cards[1] ? 1 : 2;
        cards.sort((a, b) => b - a);
        memory[winner - 1].push(...cards);
    }

    //console.log("Winner: " + winner, memory);
}


function run2(data) {
    const memory = readData(data);
    let configurationSave = [];

    while (memory[0].length && memory[1].length) {
        recursiveRound(memory, configurationSave);
    }

    const winner = memory[0].length ? 0 : 1;
    let score = 0;

    for (let i = 0; i < memory[winner].length; i++) {
        score += memory[winner][i] * (memory[winner].length - i);
    }

    return score;

}

module.exports = {run1, run2};
