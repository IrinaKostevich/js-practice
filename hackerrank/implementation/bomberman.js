function initiateGridMatrix(gridString) {
    return gridString.map(string => string.split(''));
}

function getCurrentBombs(grid) {
    const currentBombs = [];

    for (let row = 0; row < grid.length; row += 1) {
        for (let column = 0; column < grid[row].length; column += 1) {
            if (grid[row][column] === 'O') {
                currentBombs.push([row, column]);
            }
        }
    }

    return currentBombs;
}

function fillGridWithBombs(grid) {
    grid.forEach(row => row.fill('O'));
}

function mapHas(map, key) {
    return map.has(JSON.stringify(key));
}

function mapAddUnique(map, key) {
    if (mapHas(map, key)) return;

    map.set(JSON.stringify(key), 1);
}

function getCellsToDestroy(bombsCoordinates, gridRows, gridColumns) {
    const cellsToDestroy = new Map();

    for (const [row, column] of bombsCoordinates) {
        mapAddUnique(cellsToDestroy, [row, column]);

        // Bottom
        if (row + 1 < gridRows) {
            mapAddUnique(cellsToDestroy, [row + 1, column]);
        }
        // Top
        if (row - 1 >= 0) {
            mapAddUnique(cellsToDestroy, [row - 1, column]);
        }
        // Right
        if (column + 1 < gridColumns) {
            mapAddUnique(cellsToDestroy, [row, column + 1]);
        }
        // Left
        if (column - 1 >= 0) {
            mapAddUnique(cellsToDestroy, [row, column - 1]);
        }
    }

    return cellsToDestroy;
}

function detonate(grid, cellsToDestroy) {
    for (const [row, column] of cellsToDestroy) {
        grid[row][column] = '.';
    }
}

// Main function
function bomberMan(n, gridString) {
    // return initial gridString
    if (n === 0 || n === 1) {
        return gridString;
    }

    const gridMatrix = initiateGridMatrix(gridString);

    // return grid full of bombs
    if (n % 2 === 0) {
        fillGridWithBombs(gridMatrix);
        return gridMatrix.map(row => row.join(''));
    }

    // calculate seconds to go
    let seconds = n % 4;
    if (seconds === 1) seconds += 4;

    let currentBombs = [];
    const rows = gridMatrix.length;
    const columns = gridMatrix[0].length;

    for (let i = 2; i <= seconds; i += 1) {
        if (i % 2 === 0) {
            currentBombs = getCurrentBombs(gridMatrix);
            fillGridWithBombs(gridMatrix);
        } else {
            const cellsToDestroy = getCellsToDestroy(currentBombs, rows, columns);
            const cellsCoordinates = Array.from(cellsToDestroy.keys()).map(JSON.parse);

            detonate(gridMatrix, cellsCoordinates);
        }
    }

    return gridMatrix.map(row => row.join(''));
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
