function readData(data) {
    const memory = {};
    let index = 0;

    while (data[index] !== undefined) {
        const currentTileId = data[index].match(/\d/g).join("");
        const currentTile = [];
        index++;

        while (data[index]) {
            currentTile.push(data[index]);
            index++;
        }
        memory[currentTileId] = {content: currentTile};

        index++;
    }

    return memory;
}

function computeEdges(memory) {
    for (const tile of Object.values(memory)) {
        const northEdgePrints = getEdgePrints(tile.content[0]);
        const southEdgePrints = getEdgePrints(flipString(tile.content[tile.content.length - 1]));
        const westEdgePrints = getEdgePrints(flipString(getColumn(tile.content, 0)));
        const eastEdgePrints = getEdgePrints(getColumn(tile.content, tile.content[0].length - 1));

        tile.edgesPrints = [
            [northEdgePrints[0], eastEdgePrints[0], southEdgePrints[0], westEdgePrints[0]],
            [northEdgePrints[1], eastEdgePrints[1], southEdgePrints[1], westEdgePrints[1]]
        ];
    }

    function getEdgePrints(edge) {
        const binaryEdge = edge
            .replace(/\./g, "1")
            .replace(/#/g, "0");

        const flippedBinaryEdge = flipString(binaryEdge);

        return [
            parseInt(binaryEdge, 2),
            parseInt(flippedBinaryEdge, 2)
        ];
    }

    function getColumn(content, column) {
        return content.map((line) => line[column]).join("");
    }

    function flipString(string) {
        return string.split("").reverse().join("");
    }
}

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

    getSide(rotation) {
        switch (rotation) {
            case 0:
                return new Vector(this.x, this.y - 1);
            case 1:
                return new Vector(this.x + 1, this.y);
            case 2:
                return new Vector(this.x, this.y + 1);
            case 3:
                return new Vector(this.x - 1, this.y);
        }
    }

    stringify() {
        return this.x + ";" + this.y;
    }
}

function flipRotation(rotation) {
    if (rotation === 1) {
        return 3;
    }
    if (rotation === 3) {
        return 1;
    }
    return rotation;
}

function orderImages(memory) {
    let remainingTiles = Object.keys(memory);
    const placedTiles = [];

    const startingTile = remainingTiles[0];
    const result = {};

    placeTile(startingTile, new Vector(0, 0), 0, 0);


    while (remainingTiles.length) {
        for (let i = 0; i < remainingTiles.length; i++) {
            if (findPlaces(remainingTiles[i])) {
                break;
            }
        }
    }

    return result;

    function placeTile(tileId, position, flipped, rotation) {
        memory[tileId].placed = true;
        memory[tileId].flipped = flipped;
        memory[tileId].rotation = rotation;
        memory[tileId].position = position;
        result[position.stringify()] = tileId;
        placedTiles.push(tileId);
        remainingTiles = remainingTiles.filter((tile) => tile !== tileId);
    }

    function findPlaces(tileId) {

        for (let i = 0; i < placedTiles.length; i++) {
            const placedTile = placedTiles[i];
            for (let flipped = 0; flipped <= 1; flipped++) {
                for (let printId = 0; printId <= 4; printId++) {
                    const placedTileEdgesPrints = memory[placedTile].edgesPrints[memory[placedTile].flipped];
                    const tileEdgePrints = memory[tileId].edgesPrints[flipped][printId];

                    if (placedTileEdgesPrints.includes(tileEdgePrints)) {
                        let placedTileRotation = memory[placedTile].rotation;
                        let placedTileFlipped = memory[placedTile].flipped;

                        let placedTileEdgeIndex = (placedTileRotation + placedTileEdgesPrints.indexOf(tileEdgePrints)) % 4;
                        if (placedTileFlipped) {
                            placedTileEdgeIndex = (placedTileRotation + flipRotation(placedTileEdgesPrints.indexOf(tileEdgePrints))) % 4;
                        }

                        let tileFlipped = 1 - flipped;
                        let tileEdgeIndex = printId;
                        if (tileFlipped) {
                            tileEdgeIndex = flipRotation(tileEdgeIndex);
                        }

                        let tileRotation = (placedTileEdgeIndex - tileEdgeIndex + 6) % 4;

                        const newPosition = memory[placedTile].position.getSide(placedTileEdgeIndex % 4);

                        placeTile(tileId, newPosition, tileFlipped, tileRotation);
                        return true;
                    }
                }
            }
        }
    }
}

function computeBounds(result) {
    const startValue = new Vector(0, 0,);
    const corners = [startValue, startValue, startValue, startValue];

    for (let position of Object.keys(result)) {
        const vector = new Vector(position);

        if (corners[0].x <= vector.x && corners[0].y <= vector.y) {
            corners[0] = vector;
        }

        if (corners[1].x >= vector.x && corners[1].y <= vector.y) {
            corners[1] = vector;
        }

        if (corners[2].x >= vector.x && corners[2].y >= vector.y) {
            corners[2] = vector;
        }

        if (corners[3].x <= vector.x && corners[3].y >= vector.y) {
            corners[3] = vector;
        }
    }

    return corners;
}

function run1(data) {
    const memory = readData(data);
    computeEdges(memory);

    const result = orderImages(memory);

    return computeResult();

    function computeResult() {
        const corners = computeBounds(result);
        let total = 1;

        for (const corner of corners) {
            total *= result[corner.stringify()];
        }

        return total;
    }
}

function buildImage(memory, result) {
    const corners = computeBounds(result);
    const tileSize = memory[Object.keys(memory)[0]].content[0].length - 2;

    const image = [];

    const imageSize = (corners[0].x - corners[1].x + 1) * tileSize;

    for (let i = 0; i < imageSize; i++) {
        image.push(Array(imageSize + 1).join(" ").split(""));
    }

    for (const tilePosition of Object.keys(result)) {
        const position = new Vector(tilePosition);
        position.x -= corners[2].x;
        position.y -= corners[2].y;

        const seaPosition = new Vector(0, 0);

        const tile = memory[result[tilePosition]];

        for (seaPosition.x = 0; seaPosition.x < tileSize; seaPosition.x++) {
            for (seaPosition.y = 0; seaPosition.y < tileSize; seaPosition.y++) {
                image[seaPosition.y + position.y * tileSize][seaPosition.x + position.x * tileSize] = getTileContent(tile, seaPosition);
            }
        }
    }

    const print = [];
    for (const line of image) {
        print.push(line.join(""));
    }

    //console.log(print);

    return image;

    function getTileContent(tile, position) {
        const realPosition = new Vector(position.x, position.y);
        for (let r = 0; r < tile.rotation; r++) {
            const temp = realPosition.x;
            realPosition.x = realPosition.y;
            realPosition.y = tileSize - temp - 1;
        }
        if (tile.flipped) {
            realPosition.x = tileSize - realPosition.x - 1;
        }
        return tile.content[realPosition.y + 1][realPosition.x + 1];
    }
}

function countPattern(image, flipped, rotation) {

    let pattern = [
        "                  # ",
        "#    ##    ##    ###",
        " #  #  #  #  #  #   "
    ];

    //pattern = ["#"];

    const imageSize = image.length;

    const position = new Vector(0, 0);
    let result = 0;

    for (position.x = 0; position.x <= imageSize - pattern[0].length; position.x++) {
        for (position.y = 0; position.y <= imageSize - pattern.length; position.y++) {
            if (checkMonster(position))
            {
                result++;
                //console.log("found at ", position);
            }
        }
    }

    return result;

    function checkMonster(position) {
        for (let x = 0; x < pattern[0].length; x++) {
            for (let y = 0; y < pattern.length; y++) {
                if (pattern[y][x] === "#")
                {
                    if (getImagePixel(new Vector(position.x+x,position.y+y)) !== "#")
                    {
                        return false;
                    }
                }
            }
        }

        for (let x = 0; x < pattern[0].length; x++) {
            for (let y = 0; y < pattern.length; y++) {
                if (pattern[y][x] === "#") {
                    setImagePixel(new Vector(position.x + x, position.y + y))
                }
            }
        }
        return true;
    }

    function getImagePixel(position)
    {
        const realPosition = new Vector(position.x, position.y);
        if (flipped) {
            realPosition.x = imageSize - realPosition.x - 1;
        }
        for (let r = 0; r < rotation; r++) {
            const temp = realPosition.x;
            realPosition.x = realPosition.y;
            realPosition.y = imageSize - temp - 1;
        }
        return image[realPosition.y][realPosition.x];
    }

    function setImagePixel(position)
    {
        const realPosition = new Vector(position.x, position.y);
        if (flipped) {
            realPosition.x = imageSize - realPosition.x - 1;
        }
        for (let r = 0; r < rotation; r++) {
            const temp = realPosition.x;
            realPosition.x = realPosition.y;
            realPosition.y = imageSize - temp - 1;
        }
        image[realPosition.y][realPosition.x] = "O";
    }
}

function run2(data) {
    const memory = readData(data);
    computeEdges(memory);

    const result = orderImages(memory);
    const image = buildImage(memory, result);

    for (let flipped = 0; flipped <= 1; flipped++) {
        for (let rotation = 0; rotation <= 3; rotation++) {
            const newMonster = countPattern(image, flipped, rotation);
            if (newMonster)
            {
                printImage(flipped, rotation);

                let totalRough = 0
                for (const line of image)
                {
                    totalRough+=(line.join("").match(/#/g) || []).length;
                }
                return totalRough;
            }
        }
    }

    function printImage(flipped, rotation)
    {
        const print = [];
        for (const line of image) {
            print.push([...line]);
        }

        for (let x=0; x<image.length; x++)
        {
            for (let y=0; y<image.length; y++) {
                const realPosition = new Vector(x, y);
                if (flipped) {
                    realPosition.x = image.length - realPosition.x - 1;
                }
                for (let r = 0; r < rotation; r++) {
                    const temp = realPosition.x;
                    realPosition.x = realPosition.y;
                    realPosition.y = image.length - temp - 1;
                }
                print[y][x] = image[realPosition.y][realPosition.x];
            }
        }

        const print2 = [];
        for (const line of print) {
            print2.push(line.join(""));
        }

        console.log(print2);
    }
}

module.exports = {run1, run2};
