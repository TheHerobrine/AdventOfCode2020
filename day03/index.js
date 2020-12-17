function run1(data) {
    return numberOfTree(data, {x: 3, y: 1});
}

function run2(data) {
    const a = numberOfTree(data, {x: 1, y: 1});
    const b = numberOfTree(data, {x: 3, y: 1});
    const c = numberOfTree(data, {x: 5, y: 1});
    const d = numberOfTree(data, {x: 7, y: 1});
    const e = numberOfTree(data, {x: 1, y: 2});

    return a * b * c * d * e;
}

function numberOfTree(data, move) {
    const location = {x: 0, y: 0};
    const height = data.length;
    const width = data[0].length;

    let treeNumber = 0;

    while (location.y < height) {
        if (isOnTree()) {
            treeNumber++;
        }
        nextMove();
    }

    return treeNumber;

    function nextMove() {
        location.x += move.x;
        location.y += move.y;
    }

    function isOnTree() {
        return data[location.y][location.x % width] === "#";
    }
}

module.exports = {run1, run2};
