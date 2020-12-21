const _ = require("lodash");

function readData(data) {
    const memory = {};

    for (let line of data) {
        line = line.slice(0, -1);
        line = line.split(" (contains ");
        const ingredients = line[0].split(" ");
        const allergens = line[1].split(", ");

        for (let allergen of allergens) {
            if (memory.hasOwnProperty(allergen)) {
                memory[allergen].push(ingredients);
            } else {
                memory[allergen] = [ingredients];
            }
        }
    }

    return memory;
}

function computeIntersection(memory) {
    for (const allergen of Object.keys(memory)) {
        memory[allergen] = _.intersection(...memory[allergen]);
    }
}

function computeAllergen(memory) {
    let endFlag = true;
    const alreadyFound = [];
    while (endFlag) {
        endFlag = false;
        for (const allergen of Object.keys(memory)) {
            if (typeof memory[allergen] === "object") {
                if (memory[allergen].length === 1) {
                    memory[allergen] = memory[allergen][0];
                    alreadyFound.push(memory[allergen]);
                } else {
                    memory[allergen] = memory[allergen].filter((element) => !alreadyFound.includes(element));
                    endFlag = true;
                }
            }
        }
    }
}

function getCount(memory, data) {
    const allergens = Object.values(memory);

    let count = 0;

    for (let line of data) {
        line = line.slice(0, -1);
        line = line.split(" (contains ");
        const ingredients = line[0].split(" ");

        count += ingredients.filter((element) => !allergens.includes(element)).length;
    }

    return count;
}

function run1(data) {
    const memory = readData(data);
    computeIntersection(memory);
    computeAllergen(memory);
    return getCount(memory, data);
}


function run2(data) {
    const memory = readData(data);
    computeIntersection(memory);
    computeAllergen(memory);

    let result = "";

    for (const ingredient of Object.keys(memory).sort()) {
        result += memory[ingredient] + ",";
    }

    return result.slice(0, -1);
}

module.exports = {run1, run2};
