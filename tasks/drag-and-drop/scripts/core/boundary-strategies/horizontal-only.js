export function horizontalOnly({ element, position, captureOffset }) {
    const [positionX, positionY] = position;
    const [offsetX, offsetY] = captureOffset;

    const boundingRect = element.getBoundingClientRect();
    const screenWidth = window.innerWidth;

    const diffLeft = positionX;
    const diffTop = positionY;
    const diffRight = screenWidth - positionX;
    const diffBottom = boundingRect.height - positionY;

    if (diffTop < offsetY) return false;
    if (diffLeft < offsetX) return false;
    if (diffRight < boundingRect.width - offsetX) return false;
    if (diffBottom < boundingRect.height - offsetY) return false;

    return true;
}
