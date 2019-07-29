export function horizontalOnly({ element, position, captureOffset }, ) {
    const [positionX, positionY] = position;
    const [offsetX, offsetY] = captureOffset;

    const borders = element.getBoundingClientRect();
    const screenWidth = window.innerWidth;

    const diffTop = positionY;
    const diffLeft = positionX;
    const diffRight = screenWidth - positionX;
    const diffBottom = borders.height - positionY;

    if (diffTop < offsetY) return false;
    if (diffLeft < offsetX) return false;
    if (diffRight < borders.width - offsetX) return false;
    if (diffBottom < borders.height - offsetY) return false;

    return true;
}
