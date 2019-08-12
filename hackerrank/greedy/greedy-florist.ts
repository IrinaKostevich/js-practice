type ArrayOfArrays = Array<Array<any>>;

function parseArrayIntoChunks(array: any[], chunkSize: number): ArrayOfArrays {
    const source: any[] = [...array.sort((a, b) => a - b)];
    const chucnkedArray: ArrayOfArrays = [];

    while (source.length > 0) {
        // set first value to chunkedArray
        if (chucnkedArray.length === 0) {
            chucnkedArray.push([source.pop()]);
            continue;
        }

        if (chucnkedArray[chucnkedArray.length - 1].length < chunkSize) {
            chucnkedArray[chucnkedArray.length - 1].push(source.pop());
        } else {
            chucnkedArray.push([source.pop()]);
        }
    }

    return chucnkedArray;
}

function getMinimumCost(buyers: number, priceList: number[]) {
    const chunkedPriceList: ArrayOfArrays = parseArrayIntoChunks(priceList, buyers);
    let totalSum: number = 0;

    for (let i = 0; i < chunkedPriceList.length; i += 1) {
        totalSum += chunkedPriceList[i].reduce((acc, item) => acc + item, 0) * (i + 1);
    }

    return totalSum;
}

const array = [390225, 426456, 688267, 800389, 990107, 439248, 240638, 15991, 874479, 568754, 729927, 980985, 132244,
    488186, 5037, 721765, 251885, 28458, 23710, 281490, 30935, 897665, 768945, 337228, 533277, 959855, 927447, 941485, 24242,
    684459, 312855, 716170, 512600, 608266, 779912, 950103, 211756, 665028, 642996, 262173, 789020, 932421, 390745, 433434,
    350262, 463568, 668809, 305781, 815771, 550800];

console.log(getMinimumCost(3, array));
