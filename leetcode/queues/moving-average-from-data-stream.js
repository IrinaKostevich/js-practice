/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/**
 * Initialize your data structure here.
 * @param {number} size
 */
class Node {
    constructor(value) {
        this.val = value;
        this.next = null;
    }
}

class MovingAverage {
    constructor(size) {
        this.size = size;
        this._currentCount = 0;
        this._queueFirst = null;
        this._queueLast = null;
    }

    next(value) {
        this._addNode(value);

        if (this._currentCount === this.size) {
            this._makeShift();
        } else {
            this._currentCount += 1;
        }

        const averageSum = this._calculateAverage();

        return averageSum;
    }

    _addNode(value) {
        if (!this._queueFirst) {
            this._queueFirst = new Node(value);
            this._queueLast = this._queueFirst;
        } else {
            this._queueLast.next = new Node(value);
            this._queueLast = this._queueLast.next;
        }
    }

    _makeShift() {
        this._queueFirst = this._queueFirst.next;
    }

    _calculateAverage() {
        let sum = 0;
        let node = this._queueFirst;

        while (node) {
            sum += node.val;
            node = node.next;
        }

        return sum / this._currentCount;
    }
};

/**
 * @param {number} val
 * @return {number}
 */

/**
 * Your MovingAverage object will be instantiated and called as such:
 * var obj = new MovingAverage(size)
 * var param_1 = obj.next(val)
 */
