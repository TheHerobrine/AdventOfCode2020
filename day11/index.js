function run1(data) {

    let map = [];
    for (let line of data) {
        map.push(line.split(""));
    }

    let change = true;

    while (change) {
        let result = step(map);
        change = result.change;
        map = result.map;

        //printMap(map);
    }


    //console.log(map);
    //console.log(step(map));

    return countSeat(map);

    function step(map) {
        let change = false;
        let newMap = JSON.parse(JSON.stringify(map));

        const cursor = {x: 0, y: 0};
        for (cursor.y = 0; cursor.y < map.length; cursor.y++) {
            for (cursor.x = 0; cursor.x < map[0].length; cursor.x++) {
                const state = updateState(cursor, map);
                if (state !== map[cursor.y][cursor.x]) {
                    change = true;
                    newMap[cursor.y][cursor.x] = state;
                }
            }
        }

        return {change, map: newMap};
    }

    function updateState(cursor, map) {
        const currentState = map[cursor.y][cursor.x];

        if (currentState === ".") {
            return ".";
        }

        let count = 0;

        for (let y = -1; y <= 1; y++) {
            for (let x = -1; x <= 1; x++) {
                if (x === 0 && y === 0) {
                    continue;
                }
                if (map[cursor.y + y] && map[cursor.y + y][cursor.x + x] === "#") {
                    count++;
                }
            }
        }

        if ((currentState === "L") && (count === 0)) {
            return "#";
        }

        if ((currentState === "#") && (count >= 4)) {
            return "L";
        }

        return currentState;
    }

    function printMap(map) {
        let newMap = JSON.parse(JSON.stringify(map));

        for (let i = 0; i < map.length; i++) {
            newMap[i] = newMap[i].join("");
        }

        console.log(newMap.join("\n"));
    }

    function countSeat(map) {
        let count = 0;
        const cursor = {x: 0, y: 0};
        for (cursor.y = 0; cursor.y < map.length; cursor.y++) {
            for (cursor.x = 0; cursor.x < map[0].length; cursor.x++) {
                if (map[cursor.y][cursor.x] === "#") {
                    count++;
                }
            }
        }

        return count;
    }
}

function run2(data) {
    let map = [];
    for (let line of data) {
        map.push(line.split(""));
    }

    let change = true;

    while (change) {
        let result = step(map);
        change = result.change;
        map = result.map;

        //printMap(map);
    }


    //console.log(map);
    //console.log(step(map));

    return countSeat(map);

    function step(map) {
        let change = false;
        let newMap = JSON.parse(JSON.stringify(map));

        const cursor = {x: 0, y: 0};
        for (cursor.y = 0; cursor.y < map.length; cursor.y++) {
            for (cursor.x = 0; cursor.x < map[0].length; cursor.x++) {
                const state = updateState(cursor, map);
                if (state !== map[cursor.y][cursor.x]) {
                    change = true;
                    newMap[cursor.y][cursor.x] = state;
                }
            }
        }

        return {change, map: newMap};
    }

    function updateState(cursor, map) {
        const currentState = map[cursor.y][cursor.x];

        if (currentState === ".") {
            return ".";
        }

        let count = 0;

        for (let y = -1; y <= 1; y++) {
            for (let x = -1; x <= 1; x++) {
                if (x === 0 && y === 0) {
                    continue;
                }

                const sightCursor = {x:cursor.x, y:cursor.y};

                do
                {
                    sightCursor.x+=x;
                    sightCursor.y+=y;

                    if (!map[sightCursor.y] || !map[sightCursor.y][sightCursor.x])
                    {
                        break;
                    }

                    if (map[sightCursor.y][sightCursor.x] === "#") {
                        count++;
                        break;
                    }
                } while (map[sightCursor.y][sightCursor.x] === ".");
            }
        }

        if ((currentState === "L") && (count === 0)) {
            return "#";
        }

        if ((currentState === "#") && (count >= 5)) {
            return "L";
        }

        return currentState;
    }

    function printMap(map) {
        let newMap = JSON.parse(JSON.stringify(map));

        for (let i = 0; i < map.length; i++) {
            newMap[i] = newMap[i].join("");
        }

        console.log(newMap.join("\n"));
    }

    function countSeat(map) {
        let count = 0;
        const cursor = {x: 0, y: 0};
        for (cursor.y = 0; cursor.y < map.length; cursor.y++) {
            for (cursor.x = 0; cursor.x < map[0].length; cursor.x++) {
                if (map[cursor.y][cursor.x] === "#") {
                    count++;
                }
            }
        }

        return count;
    }
}

module.exports = {run1, run2};
