const input1 = [[1, 1], [1, 3], [3, 1], [3, 3], [2, 2]];
const input2 = [[1, 1], [1, 3], [3, 1], [3, 3], [4, 1], [4, 3]];

function createPointsSet(pointsArray) {
    const set = new Set();

    pointsArray.forEach(point => set.add(JSON.stringify(point)));

    return set;
}

function canPointsCreateRect([x1, y1], [x2, y2], pointsSet) {
    if (x1 === x2 || x1 === y2) return false;
    if (y1 === x2 || y1 === y2) return false;

    const leftTop = JSON.stringify([x1, y2]);
    const rightBottom = JSON.stringify([x2, y1]);

    if (!pointsSet.has(leftTop) || !pointsSet.has(rightBottom)) return false;

    return true;
}

function calculateRectSquare([x1, y1], [x2, y2]) {
    return Math.abs((x1 - x2) * (y1 - y2));
}

function minAreaRect(pointsArray) {
    const pointsSet = createPointsSet(pointsArray);
    let minArea = 0;

    for (const [x1, y1] of pointsArray) {
        for (const [x2, y2] of pointsArray) {
            if (!canPointsCreateRect([x1, y1], [x2, y2], pointsSet)) continue;

            const currentArea = calculateRectSquare([x1, y1], [x2, y2]);

            if (minArea === 0 || currentArea < minArea) {
                minArea = currentArea;
            }
        }
    }

    return minArea;
}

console.log(minAreaRect(input1));
console.log(minAreaRect(input2));
