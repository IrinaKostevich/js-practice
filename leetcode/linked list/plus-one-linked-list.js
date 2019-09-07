function ListNode(val) {
    this.val = val;
    this.next = null;
}

/**
 * @param {ListNode} head
 * @return {ListNode}
 */


function traverseList(node) {
    let currentSum = 0;
    let carry = null;

    if (node.next === null) {
        carry = 1;
    } else {
        carry = traverseList(node.next);
    }

    if (carry) {
        currentSum = node.val + carry;
        node.val = currentSum % 10;
    }

    return Math.trunc(currentSum / 10);
}

function plusOne(head) {
    const carry = traverseList(head);

    if (carry) {
        const newHead = new ListNode(1);
        newHead.next = head;

        return newHead;
    }

    return head;
}

const a = new ListNode(9);
const b = new ListNode(9);
const c = new ListNode(9);

const list = a;
a.next = b;
b.next = c;

console.log(plusOne(list));
