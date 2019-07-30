export function withinParent({ element, position, captureOffset }) {
    const [positionX, positionY] = position;
    const [offsetX, offsetY] = captureOffset;

    const boundingRect = element.getBoundingClientRect();
    const parent = element.parentElement;

    const [parentWidth, parentHeight] = [parent.clientWidth, parent.clientHeight];

    const diffLeft = positionX;
    const diffTop = positionY;
    const diffRight = parentWidth - positionX;
    const diffBottom = parentHeight - positionY;

    if (diffTop < offsetY) return false;
    if (diffLeft < offsetX) return false;
    if (diffRight < boundingRect.width - offsetX) return false;
    if (diffBottom < boundingRect.height - offsetY) return false;

    return true;
}
