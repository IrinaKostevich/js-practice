function findStartIndexes(string, subString) {
    const indexes = [];

    for (let i = 0; i < string.length; i += 1) {
        if (subString[0] === string[i]) {
            const tempString = string.slice(i);

            if (tempString.startsWith(subString)) {
                indexes.push(i);
            }
        }
    }

    return indexes;
}

function findStartPoints(grid, pattern) {
    const firstPatternString = pattern[0];

    const startRowsIndexes = grid
        .map((row, index) => row.includes(firstPatternString) ? index : null)
        .filter(el => el != null);

    if (!startRowsIndexes) return null;

    const startPoints = startRowsIndexes
        .map((rowIndex) => {
            const columnIndexes = findStartIndexes(grid[rowIndex], firstPatternString);
            return columnIndexes.map(columnIndex => [rowIndex, columnIndex]);
        })
        .flat()
        .filter(el => el != null);

    return startPoints;
}

function findEndPoint(patternSize, startPoint) {
    const [patternWidth, patternHeight] = patternSize;
    const [startRow, startColumn] = startPoint;

    return [startRow + patternHeight - 1, startColumn + patternWidth - 1];
}

function getSubGrid(grid, rowsRange, columnsRange) {
    const [startRow, endRow] = rowsRange;
    const [startColumn, endColumn] = columnsRange;

    const subGrid = [];

    for (let row = startRow; row <= endRow; row += 1) {
        const tempRow = grid[row].slice(startColumn, endColumn + 1);
        subGrid.push(tempRow);
    }

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

    const startPoints = findStartPoints(grid, pattern);
    const verifiedPoints = startPoints.filter(startPoint => inRange(grid, pattern, startPoint));

    const subGridsDimentions = verifiedPoints.map((startPoint) => {
        const [startRow, startColumn] = startPoint;
        const [endRow, endColumn] = findEndPoint([patternWidth, patternHeight], startPoint);
        return [[startRow, endRow], [startColumn, endColumn]];
    });

    const result = subGridsDimentions
        .map(dimentions => getSubGrid(grid, ...dimentions))
        .some(subGrid => compareGrids(subGrid, pattern));

    return result ? 'YES' : 'NO';
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
