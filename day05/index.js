function run1(data) {
    let maxSeat = -1;
    let minSeat = 1025;

    for (const seat of data) {
        const binarySeat = seat
            .replace(/[BR]/g, "1")
            .replace(/[FL]/g, "0");

        const seatId = parseInt(binarySeat, 2);

        maxSeat = Math.max(maxSeat, seatId);
        minSeat = Math.min(minSeat, seatId);
    }

    //return {maxSeat, minSeat};
    return maxSeat;
}

function run2(data) {

    const seatArray = [];

    for (const seat of data) {
        const binarySeat = seat
            .replace(/[BR]/g, "1")
            .replace(/[FL]/g, "0");

        const seatId = parseInt(binarySeat, 2);

        seatArray.push(seatId);
    }

    seatArray.sort((a, b) => a - b);

    console.log(seatArray);

    for (let i = 1; i < seatArray.length; i++) {
        if (seatArray[i] - seatArray[i - 1] > 1) {
            return seatArray[i] - 1;
        }
    }
}


module.exports = {run1, run2};
