function run1(data) {
    const memory = {};
    const maxTurn = 2020;
    let turn = 1;
    let lastNumber = -1;

    for (const number of data) {
        memory[lastNumber] = turn++;
        lastNumber = number;
    }

    while(turn <= maxTurn)
    {
        if (memory[lastNumber])
        {
            //console.log({lastNumber});
            const number = turn-memory[lastNumber];
            memory[lastNumber] = turn++;
            lastNumber = number;
        }
        else
        {
            const number = 0;
            memory[lastNumber] = turn++;
            lastNumber = number;
        }

        //console.log(lastNumber);
    }

    return lastNumber;
}

function run2(data) {
    const memory = {};
    const maxTurn = 30000000;
    let turn = 1;
    let lastNumber = -1;

    for (const number of data) {
        memory[lastNumber] = turn++;
        lastNumber = number;
    }

    while(turn <= maxTurn)
    {
        if (turn%1000000 === 0)
        {
            console.log((turn/maxTurn*100) + "%");
        }
        if (memory[lastNumber])
        {
            const number = turn-memory[lastNumber];
            memory[lastNumber] = turn++;
            lastNumber = number;
        }
        else
        {
            const number = 0;
            memory[lastNumber] = turn++;
            lastNumber = number;
        }
    }

    return lastNumber;
}

module.exports = {run1, run2};
