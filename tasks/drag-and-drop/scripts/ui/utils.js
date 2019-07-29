export function getPointerPosition(event) {
    return [event.clientX, event.clientY];
}

export function getOffset(element, [positionX, positionY]) {
    const borders = element.getBoundingClientRect()
    const offsetX = positionX - borders.left;
    const offsetY = positionY - borders.top;

    return [offsetX, offsetY];
}

export function adjustPositionWithOffset([positionX, positionY], [offsetX, offsetY]) {
    return [positionX - offsetX, positionY - offsetY];
}

export function moveElementToPosition(element, [left, top]) {
    element.style.position = 'absolute';
    element.style.left = left + 'px';
    element.style.top = top + 'px';
}
