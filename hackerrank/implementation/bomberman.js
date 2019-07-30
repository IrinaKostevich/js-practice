// utils
function createArray(length, fn) {
    return Array.from(new Array(length), fn);
}

class World {
    constructor(matrix) {
        this._matrix = matrix;
        this._width = this._matrix[0].length;
        this._height = this._matrix.length;
    }

    static createFromString(gridString) {
        const matrix = gridString.map(string => string.split(''));
        return new World(matrix);
    }

    get width() {
        return this._width;
    }

    set width(value) {
        this._width = value;
    }

    get height() {
        return this._height;
    }

    set height(value) {
        this._height = value;
    }

    *getCurrentBombs() {
        for (let row = 0; row < this._matrix.length; row += 1) {
            for (let column = 0; column < this._matrix[row].length; column += 1) {
                if (this._matrix[row][column] === 'O') {
                    yield [row, column];
                }
            }
        }
    }

    fillWorldWithBombs() {
        const createRow = () => createArray(this.width, () => 'O');
        this._matrix = createArray(this.height, createRow);
    }

    getCellsToDestroy(bombsCoordinates) {
        const cellsToDestroy = new Set();

        for (const [row, column] of bombsCoordinates) {
            cellsToDestroy.add(JSON.stringify([row, column]));

            // Bottom
            if (row + 1 < this.height) {
                cellsToDestroy.add(JSON.stringify([row + 1, column]));

            }
            // Top
            if (row - 1 >= 0) {
                cellsToDestroy.add(JSON.stringify([row - 1, column]));

            }
            // Right
            if (column + 1 < this.width) {
                cellsToDestroy.add(JSON.stringify([row, column + 1]));
            }
            // Left
            if (column - 1 >= 0) {
                cellsToDestroy.add(JSON.stringify([row, column - 1]));

            }
        }

        return cellsToDestroy;
    }

    detonate(cellsToDestroy) {
        for (const value of cellsToDestroy) {
            const [row, column] = JSON.parse(value);
            this._matrix[row][column] = '.';
        }
    }

    toString() {
        return this._matrix.map(row => row.join(''));
    }
}

function bomberMan(n, gridString) {
    // return initial gridString
    if (n === 0 || n === 1) {
        return gridString;
    }

    const world = World.createFromString(gridString);

    // return world full of bombs
    if (n % 2 === 0) {
        world.fillWorldWithBombs();
        return world.toString();
    }

    // calculate seconds to go
    let seconds = n % 4;
    if (seconds === 1) seconds += 4;
    let currentBombs = [];

    for (let i = 2; i <= seconds; i += 1) {
        if (i % 2 === 0) {
            currentBombs = [...world.getCurrentBombs()];
            world.fillWorldWithBombs();
        } else {
            const cellsToDestroy = world.getCellsToDestroy(currentBombs);
            world.detonate(cellsToDestroy);
        }
    }

    return world.toString();
}

// Grouping based on pattern
// 1 | 2 | 3 | 4
// 5 | 6 | 7 | 8
// 9 | 10| 11| 12
// 13| 14| 15| 16
// 17| 18| 19| 20

const grid = [
    '.......',
    '...O...',
    '....O..',
    '.......',
    'OO.....',
    'OO.....'
];

console.log(bomberMan(15, grid).join('\n'));
