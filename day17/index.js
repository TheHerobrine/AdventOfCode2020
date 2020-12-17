class Vector {
    constructor(x, y, z, w) {
        if (typeof x === "string") {
            const values = x.split(";");
            this.x = parseInt(values[0]);
            this.y = parseInt(values[1]);
            this.z = parseInt(values[2]);
            this.w = parseInt(values[3]);
            return;
        }

        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }

    stringify() {
        return this.x + ";" + this.y + ";" + this.z+ ";" + this.w;
    }

    getSurrounding() {
        const surrounding = [];
        for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
                for (let z = -1; z <= 1; z++) {
                    for (let w = -1; w <= 1; w++) {
                        surrounding.push(new Vector(this.x + x, this.y + y, this.z + z, this.w + w));
                    }
                }
            }
        }
        return surrounding;
    }
}

class Space {
    constructor() {
        this.space = {};
    }

    get(vector) {
        return this.space[vector.stringify()];
    }

    set(vector, value) {
        if (value === true) {
            this.space[vector.stringify()] = true;
        } else {
            delete this.space[vector.stringify()];
        }
    }

    clone() {
        const space = new Space();
        space.space = {...this.space};
        return space;
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
                if (computableCubes[computableCube] === 3 || computableCubes[computableCube] === 4) {
                    this.set(new Vector(computableCube), true);
                }

            } else {
                if (computableCubes[computableCube] === 3) {
                    this.set(new Vector(computableCube), true);
                }
            }
        }
    }

    count() {
        return Object.keys(this.space).length;
    }
}

function run1(data) {
    const maxTurn = 6;
    let space = new Space();

    const xDimStart = data.length;
    const yDimStart = data[0].length;

    for (let x = 0; x < xDimStart; x++) {
        for (let y = 0; y < yDimStart; y++) {
            space.set(new Vector(x, y, 0), data[x][y] === "#");
        }
    }


    for (let turn = 0; turn < maxTurn; turn++) {
        space.generateComputableCubes();
        const newSpace = new Space();
        newSpace.generateCubes(space.computableCubes, space.space);
        space = newSpace;
    }

    return space.count();
}

function run2(data) {
    const maxTurn = 6;
    let space = new Space();

    const xDimStart = data.length;
    const yDimStart = data[0].length;

    for (let x = 0; x < xDimStart; x++) {
        for (let y = 0; y < yDimStart; y++) {
            space.set(new Vector(x, y, 0, 0), data[x][y] === "#");
        }
    }


    for (let turn = 0; turn < maxTurn; turn++) {
        space.generateComputableCubes();
        const newSpace = new Space();
        newSpace.generateCubes(space.computableCubes, space.space);
        space = newSpace;
    }

    return space.count();
}

module.exports = {run1, run2};
