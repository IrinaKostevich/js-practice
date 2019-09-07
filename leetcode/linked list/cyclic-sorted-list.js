/**
 * // Definition for a Node.
 * function Node(val,next) {
 *    this.val = val;
 *    this.next = next;
 * };
 */
/**
 * @param {Node} head
 * @param {number} insertVal
 * @return {Node}
 */

function Node(val, next) {
    this.val = val;
    this.next = next;
}

function addNewNodeAfter(node, value) {
    const newNode = new Node(value);
    const nextNode = node.next;

    node.next = newNode;
    newNode.next = nextNode;
}

function insert(head, insertVal) {
    // If linked list does not exist
    if (!head) {
        const list = new Node(insertVal);
        list.next = list;
        return list;
    }

    // Set for tracking traversed nodes
    // const set = new Set();
    let isInserted = false;
    let previousNode = head;
    let nextNode = head.next;

    do {
        if (insertVal === previousNode.val) {
            addNewNodeAfter(previousNode, insertVal);
            // set.add(insertVal);
            isInserted = true;
            break;
        }

        if (previousNode.val <= nextNode.val) {
            if (previousNode.val <= insertVal && insertVal <= nextNode.val) {
                addNewNodeAfter(previousNode, insertVal);
                // set.add(insertVal);
                isInserted = true;
                break;
            }
        } else if (insertVal > previousNode.val || insertVal < nextNode.val) {
            addNewNodeAfter(previousNode, insertVal);
            // set.add(insertVal);
            isInserted = true;
            break;
        }

        // set.add(previousNode.val);
        [previousNode, nextNode] = [nextNode, nextNode.next];
    } while (previousNode !== head);

    if (!isInserted) {
        addNewNodeAfter(previousNode, insertVal);
    }

    return head;
}

const a = new Node(3);
const b = new Node(3);
const c = new Node(5);

const list = a;
a.next = b;
b.next = c;
c.next = a;

console.log(insert(list, 0));
