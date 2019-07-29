export function withinScreen({ element, position, captureOffset }, ) {
    const [positionX, positionY] = position;
    const [offsetX, offsetY] = captureOffset;

    const borders = element.getBoundingClientRect();
    const [screenWidth, screenHeight] = [window.innerWidth, window.innerHeight];

    const diffTop = positionY;
    const diffLeft = positionX;
    const diffRight = screenWidth - positionX;
    const diffBottom = screenHeight - positionY;

    if (diffTop < offsetY) return false;
    if (diffLeft < offsetX) return false;
    if (diffRight < borders.width - offsetX) return false;
    if (diffBottom < borders.height - offsetY) return false;

    return true;
}
