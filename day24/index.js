class Vector {
    constructor(x, y) {
        if (typeof x === "string") {
            const values = x.split(";");
            this.x = parseInt(values[0]);
            this.y = parseInt(values[1]);
            return;
        }
        this.x = x;
        this.y = y;
    }

    stringify() {
        return this.x + ";" + this.y;
    }

    getSurrounding() {
        const surrounding = [];
        for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
                if ((x === -1 && y === 1) || (x === 1 && y === -1)) {
                    continue;
                }
                surrounding.push(new Vector(this.x + x, this.y + y));
            }
        }
        return surrounding;
    }
}

class Space {
    constructor() {
        this.space = {};
    }

    set(vector, value) {
        if (value === true) {
            this.space[vector.stringify()] = true;
        } else {
            delete this.space[vector.stringify()];
        }
    }

    generateComputableCubes() {
        this.computableCubes = {};
        for (const cube of Object.keys(this.space)) {
            const surroundingCubes = (new Vector(cube)).getSurrounding();
            for (const surroundingCube of surroundingCubes) {
                const key = surroundingCube.stringify();

                if (this.computableCubes.hasOwnProperty(key)) {
                    this.computableCubes[key]++;
                } else {
                    this.computableCubes[key] = 1;
                }
            }
        }
    }

    generateCubes(computableCubes, previousSpace) {
        for (const computableCube of Object.keys(computableCubes)) {
            if (previousSpace.hasOwnProperty(computableCube)) {
                if (computableCubes[computableCube] === 2 || computableCubes[computableCube] === 3) {
                    this.set(new Vector(computableCube), true);
                }

            } else {
                if (computableCubes[computableCube] === 2) {
                    this.set(new Vector(computableCube), true);
                }
            }
        }
    }

    count() {
        return Object.keys(this.space).length;
    }
}

function readData(data) {
    const memory = [];

    for (const line of data) {
        memory.push(parseLine(line));
    }

    return memory;

    function parseLine(line) {
        const sequence = [];
        let prefix = "";
        for (let i = 0; i < line.length; i++) {
            if (["s", "n"].includes(line[i])) {
                prefix = line[i];
            } else {
                sequence.push(prefix + line[i]);
                prefix = "";
            }
        }
        return sequence;
    }
}

function getLocation(sequence) {
    const position = new Vector(0, 0);

    for (const movement of sequence) {
        switch (movement) {
            case "e":
                position.x++;
                break;
            case "w":
                position.x--;
                break;
            case "se":
                position.y--;
                break;
            case "nw":
                position.y++;
                break;
            case "sw":
                position.y--;
                position.x--;
                break;
            case "ne":
                position.y++;
                position.x++;
                break;
        }
    }

    return position;
}


function run1(data) {
    const memory = readData(data);

    const tiles = {};

    for (let sequence of memory) {
        const location = getLocation(sequence);
        if (tiles.hasOwnProperty(location.stringify())) {
            delete tiles[location.stringify()];
        } else {
            tiles[location.stringify()] = true;
        }
    }

    return Object.values(tiles).length;
}


function run2(data) {
    const maxTurn = 100;
    let space = new Space();

    const memory = readData(data);
    const tiles = {};

    for (let sequence of memory) {
        const location = getLocation(sequence);
        if (tiles.hasOwnProperty(location.stringify())) {
            delete tiles[location.stringify()];
        } else {
            tiles[location.stringify()] = true;
        }
    }

    space.space = tiles;

    for (let turn = 0; turn < maxTurn; turn++) {
        space.generateComputableCubes();
        const newSpace = new Space();
        newSpace.generateCubes(space.computableCubes, space.space);
        space = newSpace;
    }

    return space.count();
}

module.exports = {run1, run2};
