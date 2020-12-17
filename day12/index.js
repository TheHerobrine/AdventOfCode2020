const directions = {
    E: 0,
    S: 1,
    W: 2,
    N: 3
};

const offsets = {
    [directions.E]: {x: 1, y: 0},
    [directions.S]: {x: 0, y: -1},
    [directions.W]: {x: -1, y: 0},
    [directions.N]: {x: 0, y: 1},
};

function run1(data) {
    let direction = directions.E;
    const position = {x: 0, y: 0};

    for (const instruction of data) {
        const action = instruction[0];
        const value = parseInt(instruction.match(/\d+/)[0]);

        if (["N", "S", "E", "W"].includes(action)) {
            const offset = offsets[directions[action]];
            position.x += offset.x * value;
            position.y += offset.y * value;
            continue;
        }

        if (action === "R") {
            direction = (direction + value / 90) % 4;
            continue;
        }

        if (action === "L") {
            direction = (direction - value / 90 + 4) % 4;
            continue;
        }

        if (action === "F") {
            const offset = offsets[direction];
            position.x += offset.x * value;
            position.y += offset.y * value;
        }
    }

    return Math.abs(position.x) + Math.abs(position.y);
}

function run2(data) {
    let direction = directions.E;
    const wayPoint = {x: 10, y: 1};
    const position = {x: 0, y: 0};

    for (const instruction of data) {
        const action = instruction[0];
        const value = parseInt(instruction.match(/\d+/)[0]);

        if (["N", "S", "E", "W"].includes(action)) {
            const offset = offsets[directions[action]];
            wayPoint.x += offset.x * value;
            wayPoint.y += offset.y * value;
        }

        if (action === "R" || action === "L") {

            let rotation = value / 90;
            rotation *= action === "L" ? -1 : 1;
            rotation = (rotation + 4) % 4;

            for (let r=0; r<rotation; r++)
            {
                const newX =  wayPoint.y;
                const newY =  -wayPoint.x;
                wayPoint.x = newX;
                wayPoint.y = newY;
            }
        }


        if (action === "F") {
            position.x += wayPoint.x * value;
            position.y += wayPoint.y * value;
        }

        //console.log({wayPoint, position});
    }

    return Math.abs(position.x) + Math.abs(position.y);
}

module.exports = {run1, run2};
