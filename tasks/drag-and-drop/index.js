// index.js
document.addEventListener('DOMContentLoaded', () => {
    const rectangular = document.querySelector('.rectangular');

    makeDraggable(rectangular);
});

// draggable.js
function makeDraggable(element) {
    element.addEventListener('mousedown', onMouseDown);

    let offset = null;

    function onMouseDown(event) {
        const pointerPosition = getCurrentPointerPosition(event);
        offset = getOffset(pointerPosition);

        document.body.addEventListener('mousemove', onMouseMove);
        document.body.addEventListener('mouseup', onMouseUp);
    }

    function onMouseUp() {
        document.body.removeEventListener('mousemove', onMouseMove);
    }

    function onMouseMove(event) {
        const pointerPosition = getCurrentPointerPosition(event);
        const adjustedPosition = adjustPosition(pointerPosition, offset);

        if (inRange(pointerPosition, offset)) {
            moveElementToPosition(adjustedPosition);
        }
    }

    function getCurrentPointerPosition(event) {
        return [event.clientX, event.clientY];
    }

    function moveElementToPosition([left, top]) {
        element.style.position = 'absolute';
        element.style.left = left + 'px';
        element.style.top = top + 'px';
    }

    function getOffset([positionX, positionY]) {
        const borders = element.getBoundingClientRect()
        const offsetX = positionX - borders.left;
        const offsetY = positionY - borders.top;

        return [offsetX, offsetY];
    }

    function adjustPosition([positionX, positionY], [offsetX, offsetY]) {
        return [positionX - offsetX, positionY - offsetY];
    }

    function inRange([positionX, positionY], [offsetX, offsetY]) {
        const borders = element.getBoundingClientRect();
        const [screenWidth, screenHeight] = [window.innerWidth, window.innerHeight];

        const diffTop = positionY;
        const diffLeft = positionX;
        const diffRight = screenWidth - positionX;
        const diffBottom = screenHeight - positionY;

        if (diffTop < offsetY) return false;
        if (diffLeft < offsetX) return false;
        if (diffRight < borders.width - offsetX) return false;
        if (diffBottom < borders.heigth - offsetY) return false;

        return true;
    }
}
