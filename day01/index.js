const fs = require("fs");

function run() {
    const input = fs.readFileSync(__dirname + "/input.txt", "utf8");
    const data = input.toString().split("\r\n");
    data.splice(-1, 1);
    data.sort();

    const cursor = {
        start: 0,
        end: data.length - 1,
        offset: 0
    };

    const target = 2020;

    let sum;

    for (cursor.offset = 0; cursor.offset < data.length; cursor.offset++) {

        cursor.start = 0;
        cursor.end = data.length - 1;

        sum = getSum();
        while (sum !== target) {
            if (sum > target) {
                cursor.end--;
                if (cursor.end === cursor.offset)
                {
                    cursor.end--;
                }
            }
            if (sum < target) {
                cursor.start++
                if (cursor.start === cursor.offset)
                {
                    cursor.start++;
                }
            }
            if (cursor.start > cursor.end) {
                break;
            }
            sum = getSum();
        }

        if (sum === target) {
            break;
        }
    }

    console.log(cursor);
    console.log(getProduct());

    function getSum() {
        return parseInt(data[cursor.start]) + parseInt(data[cursor.end]) + parseInt(data[cursor.offset]);
    }

    function getProduct() {
        return parseInt(data[cursor.start]) * parseInt(data[cursor.end]) * parseInt(data[cursor.offset]);
    }
}

module.exports = {run};
