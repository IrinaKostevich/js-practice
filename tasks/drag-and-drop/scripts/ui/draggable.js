import { getPointerPosition, getOffset, adjustPositionWithOffset, moveElementToPosition} from './utils.js';
import { withinScreen } from '../core/boundary-strategies/within-screen.js';

let onMouseMoveHandler = null;

function onMouseDown(element, boundaryStrategy, event) {
    const pointerPosition = getPointerPosition(event);
    const offset = getOffset(element, pointerPosition);

    onMouseMoveHandler = function(event) {
        onMouseMove(element, offset, boundaryStrategy, event);
    };

    document.body.addEventListener('mousemove', onMouseMoveHandler);
    document.body.addEventListener('mouseup', onMouseUp);
}

function onMouseUp() {
    document.body.removeEventListener('mousemove', onMouseMoveHandler);
}

function onMouseMove(element, offset, boundaryStrategy, event) {
    const pointerPosition = getPointerPosition(event);
    const adjustedPosition = adjustPositionWithOffset(pointerPosition, offset);

    if (boundaryStrategy({ element, position: pointerPosition, captureOffset: offset })) {
        moveElementToPosition(element, adjustedPosition);
    }
}

export function makeDraggable(element, boundaryStrategy) {
    element.addEventListener('mousedown', (event) => {
        onMouseDown(element, boundaryStrategy, event);
    });
}
