/**
 * @param {string} s
 * @return {string}
 */
class Stack {
    constructor() {
        this.data = [];
    }

    push(value) {
        if (value !== '#') {
            this.data.push(value);
        } else {
            this.data.pop();
        }
    }

    pop() {
        return this.data.pop();
    }

    peek() {
        return this.data[this.data.length - 1];
    }

    size() {
        return this.data.length;
    }
}

const digitSet = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);

function decodeString(string) {
    const stack = new Stack();

    let number = '';
    let subString = '';

    // Iterate through the string
    for (const char of string) {
        // Digit
        if (digitSet.has(Number(char))) {
            if (subString) {
                stack.push(subString);
                subString = '';
            }

            number += char;
            continue;
        }

        // '['
        if (char === '[') {
            if (number) {
                stack.push(Number(number));
                number = '';
            }

            continue;
        }

        // ']'
        if (char === ']') {
            let accString = subString;

            // Accumulate all subStrings till '['
            while (typeof stack.peek() !== 'number') {
                const storedString = stack.pop();
                accString = storedString + accString;
            }

            // Repeat subString
            const repeatTimes = stack.pop();
            let stringWithRepeats = '';

            for (let i = 1; i <= repeatTimes; i += 1) {
                stringWithRepeats += accString;
            }

            // Add current result
            stack.push(stringWithRepeats);

            subString = '';
            continue;
        }

        // Accumulate subString
        subString += char;
    }

    // Handle letters at the end (after ']')
    if (subString) {
        stack.push(subString);
    }

    // Accumulate all subStrings from stack
    let decodedString = '';

    while (stack.size() > 0) {
        const stringToAdd = stack.pop();

        decodedString = stringToAdd + decodedString;
    }

    return decodedString;
}

console.log(decodeString('100[leetCode]'));
// aaabFFFFcbFFFFc
// aaabFFFFcbFFFFc
