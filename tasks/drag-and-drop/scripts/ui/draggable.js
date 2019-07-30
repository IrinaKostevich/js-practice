import { getPointerPosition, getOffset, adjustPositionWithOffset, moveElementToPosition} from './utils.js';

export function makeDraggable(element, boundaryStrategy) {
    element.addEventListener('mousedown', onMouseDown);

    let offset = null;

    function onMouseDown(event) {
        const pointerPosition = getPointerPosition(event);
        offset = getOffset(element, pointerPosition);
    
        document.body.addEventListener('mousemove', onMouseMove);
        document.body.addEventListener('mouseup', onMouseUp);
    }
    
    function onMouseUp() {
        document.body.removeEventListener('mousemove', onMouseMove);
    }
    
    function onMouseMove(event) {
        const pointerPosition = getPointerPosition(event);
        const adjustedPosition = adjustPositionWithOffset(pointerPosition, offset);
    
        if (boundaryStrategy({ element, position: pointerPosition, captureOffset: offset })) {
            moveElementToPosition(element, adjustedPosition);
        }
    }
}
