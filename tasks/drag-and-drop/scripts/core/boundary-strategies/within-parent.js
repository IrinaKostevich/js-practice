export function withinParent({ element, position, captureOffset }) {
    const [positionX, positionY] = position;
    const [offsetX, offsetY] = captureOffset;

    const borders = element.getBoundingClientRect();
    const parent = element.parentElement;

    const [parentWidth, parentHeight] = [parent.clientWidth, parent.clientHeight];

    const diffTop = positionY;
    const diffLeft = positionX;
    const diffRight = parentWidth - positionX;
    const diffBottom = parentHeight - positionY;

    if (diffTop < offsetY) return false;
    if (diffLeft < offsetX) return false;
    if (diffRight < borders.width - offsetX) return false;
    if (diffBottom < borders.height - offsetY) return false;

    return true;
}
