function run1(data) {
    const containingRules = getContainingRules(data);

    let validContainers = new Set();
    const listToCheck = ["shiny gold"];

    while (listToCheck.length) {
        const containerToCheck = listToCheck.pop();
        const newContainers = getContainers(containerToCheck);
        listToCheck.push(...newContainers);
        validContainers = new Set([...validContainers, ...newContainers]);
    }
    return validContainers.size;

    function getContainers(containing) {
        const containers = [];
        for (const container of Object.keys(containingRules)) {
            if (Object.keys(containingRules[container]).includes(containing)) {
                containers.push(container);
            }
        }
        return containers;
    }
}

function run2(data) {
    const containingRules = getContainingRules(data);

    const containingBags = containingRules["shiny gold"];
    let bagCount = 0;

    replaceWithContent(containingBags);

    function replaceWithContent(containingBags) {
        while (Object.keys(containingBags).length) {
            //console.log(containingBags);
            const containing = Object.keys(containingBags)[0];
            //console.log({containing});
            const numberOfContaining = containingBags[containing];
            bagCount += numberOfContaining;
            delete containingBags[containing];

            for (const newContaining of Object.keys(containingRules[containing])) {
                if (containingBags.hasOwnProperty(newContaining)) {
                    containingBags[newContaining] += containingRules[containing][newContaining] * numberOfContaining;
                } else {
                    containingBags[newContaining] = containingRules[containing][newContaining] * numberOfContaining;
                }
            }
        }
    }

    return bagCount;
}

function getContainingRules(data) {
    const containingRules = {};

    for (const line of data) {
        const description = line.split(" bags contain ");
        const containerName = description[0];
        containingRules[containerName] = {};

        if (description[1].startsWith("no other bags")) {
            continue;
        }

        const listContaining = description[1].split(", ");
        for (const containing of listContaining) {
            const containingSplit = containing.split(" ");
            const containingNumber = parseInt(containingSplit[0]);
            const containingName = containingSplit[1] + " " + containingSplit[2];

            containingRules[containerName][containingName] = containingNumber;
        }
    }
    return containingRules;
}

module.exports = {run1, run2};
