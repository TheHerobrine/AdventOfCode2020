class CircularBuffer {
    constructor(data) {
        this.buffer = data.split("");
        this.buffer = this.buffer.map((e) => parseInt(e));
        this.currentIndex = 0;
    }

    setMax(max) {
        this.max = max;
    }

    get(index) {
        return this.buffer[(this.currentIndex + index) % this.buffer.length];
    }

    remove(index) {
        if (this.currentIndex + index >= this.buffer.length) {
            this.buffer.splice(this.currentIndex + index - this.buffer.length, 1);
            this.currentIndex--;
        } else {
            this.buffer.splice(this.currentIndex + index, 1);
        }
    }

    select() {
        this.selection = [this.get(1), this.get(2), this.get(3)];
        this.remove(3);
        this.remove(2);
        this.remove(1);
    }

    computeTarget() {
        this.target = this.get(0) - 1;
        if (this.target === 0) {
            this.target = this.max;
        }

        while (this.selection.includes(this.target)) {
            this.target--;
            if (this.target === 0) {
                this.target = this.max;
            }
        }
    }

    moveSelectToTarget() {
        const targetPosition = this.buffer.indexOf(this.target);
        this.buffer.splice(targetPosition + 1, 0, ...this.selection);
        if (targetPosition < this.currentIndex) {
            this.currentIndex += 3;
        }
        this.currentIndex++;
        this.currentIndex %= this.buffer.length;
    }

    getOrder() {
        const startIndex = this.buffer.indexOf(1);
        const order = [];
        for (let i = 1; i < 9; i++) {
            order.push(this.buffer[(startIndex + i) % this.buffer.length]);
        }
        return order.join("");
    }

    getAfterOne() {
        const startIndex = this.buffer.indexOf(1);
        let result = 1;
        for (let i = 1; i < 3; i++) {
            result *= this.buffer[(startIndex + i) % this.buffer.length];
        }
        return result;
    }
}

function run1(data) {
    const buffer = new CircularBuffer(data[0]);
    buffer.setMax(9);

    for (let i = 0; i < 100; i++) {
        buffer.select();
        buffer.computeTarget();
        buffer.moveSelectToTarget();
    }

    return parseInt(buffer.getOrder());
}

class LinkedList {
    constructor(size) {
        this.size = size;
        this.buffer = {};
        for (let i = 1; i <= size; i++) {
            this.buffer[i] = {value: i};
        }

        for (let i = 1; i <= size; i++) {
            this.buffer[i].next = this.buffer[(i + 1) % (size + 1)];
        }
    }

    setStart(data) {
        let start = data.split("");
        start = start.map((e) => parseInt(e));

        for (let i = 0; i < start.length - 1; i++) {
            this.buffer[start[i]].next = this.buffer[start[i + 1]];
        }

        this.buffer[start[start.length - 1]].next = this.buffer[start.length + 1];

        if (start.length === this.size) {
            this.buffer[start[start.length - 1]].next = this.buffer[start[0]];
        } else {
            this.buffer[this.size].next = this.buffer[start[0]];
        }


        this.cursor = this.buffer[start[0]];
    }

    step() {
        let destination = this.cursor.value;

        do {
            destination = (destination - 1 + (this.size + 1)) % (this.size + 1);
            if (destination === 0) {
                destination = this.size;
            }
        } while (destination === this.cursor.next.value
        || destination === this.cursor.next.next.value
        || destination === this.cursor.next.next.next.value);

        const temp = this.cursor.next.next.next.next;

        this.cursor.next.next.next.next = this.buffer[destination].next;
        this.buffer[destination].next = this.cursor.next;

        this.cursor.next = temp;
        this.cursor = this.cursor.next;
    }

    log() {
        const result = [];
        let cursor = this.buffer[1];
        for (let i = 0; i <= this.size; i++) {
            result.push(cursor.value);
            cursor = cursor.next;
        }
        console.log(result);
    }
}

function run2(data) {
    const list = new LinkedList(1000000);

    list.setStart(data[0]);

    for(let i=0; i< 10000000; i++)
    {
        list.step();
    }

    return list.buffer[1].next.value * list.buffer[1].next.next.value;
}

module.exports = {run1, run2};
