function* findStartIndexes(string, subString) {
    for (let index = 0; index < string.length; index += 1) {
        if (string[index] === subString[0]) {
            const tempString = string.slice(index);

            if (tempString.startsWith(subString)) {
                yield index;
            }
        }
    }
}

function* findStartPoints(grid, pattern) {
    const patternString = pattern[0];

    const startRowsIndexes = grid
        .map((row, index) => row.includes(patternString) ? index : null)
        .filter(el => el != null);

    if (!startRowsIndexes) return null;

    for (const rowIndex of startRowsIndexes) {
        for (const columnIndex of findStartIndexes(grid[rowIndex], patternString)) {
            yield [rowIndex, columnIndex];
        }
    }
}

function findEndPoint(patternSize, startPoint) {
    const [patternWidth, patternHeight] = patternSize;
    const [startRow, startColumn] = startPoint;

    return [startRow + patternHeight - 1, startColumn + patternWidth - 1];
}

function getSubGrid(grid, rowsRange, columnsRange) {
    const [startRow, endRow] = rowsRange;
    const [startColumn, endColumn] = columnsRange;

    const subGrid = grid
        .slice(startRow, endRow + 1)
        .map(row => row.slice(startColumn, endColumn + 1));

    return subGrid;
}

function inRange(grid, pattern, startPoint) {
    const [startRow, startColumn] = startPoint;

    if ((grid.length - startRow) < pattern.length) return false;
    if ((grid[0].length - startColumn) < pattern[0].length) return false;

    return true;
}

function compareGrids(grid1, grid2) {
    const first = JSON.stringify(grid1);
    const second = JSON.stringify(grid2);

    return first === second;
}

function gridSearch(grid, pattern) {
    const gridWidth = grid[0].length;
    const gridHeight = grid.length;
    const patternWidth = pattern[0].length;
    const patternHeight = pattern.length;

    if (gridHeight < patternHeight) return 'NO';
    if (gridWidth < patternWidth) return 'NO';

    for (const startPoint of findStartPoints(grid, pattern)) {
        if (!inRange(grid, pattern, startPoint)) continue;

        const [startRow, startColumn] = startPoint;
        const [endRow, endColumn] = findEndPoint([patternWidth, patternHeight], startPoint);

        const subGrid = getSubGrid(grid, [startRow, endRow], [startColumn, endColumn]);

        if (compareGrids(subGrid, pattern)) return 'YES';
    }

    return 'NO';
}

// const grid = [
//     '1234567890',
//     '0987654321',
//     '1111111111',
//     '1111111111',
//     '2222222222'
// ];

// const pattern = [
//     '876543',
//     '111111',
//     '111111'
// ];

const grid = [
    '123412',
    '561212',
    '123634',
    '781288'
];

const pattern = [
    '12',
    '34'
];

console.log(gridSearch(grid, pattern));
