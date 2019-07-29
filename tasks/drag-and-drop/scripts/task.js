// draggable/draggable.js
/**
 * Makes an element draggable within specified boundaries using the Strategy design pattern.
 * 
 * @see https://www.dofactory.com/javascript/strategy-design-pattern
 * @see https://medium.com/better-programming/javascript-design-patterns-25f0faaaa15 (Section "Strategy Pattern")
 * 
 * @param {HTMLElement} element A draggable element.
 * @param {Function} boundaryStrategy A strategy to dermine boundaries within which
 *  the element can be dragged. By default `withinScreen` is used.
 */
function makeDraggable(element, { boundaryStrategy = withinScreen } = { }) {}


// draggable/boundary-strategies/within-screen.js
/**
 * A boundary strategy which makes an element draggable only within its viewport.
 * 
 * @note The function is what `inRange` currently does. However, minor changes are needed
 * to comply with the boundary strategy interface.
 *
 * @param {HTMLElement} element A draggable element.
 * @param {[number, number]} position Current position of an element within a viewport.
 * @param {[number, number]} captureOffset Offset, at which the element has been captured for dragging.
 * @return {boolean} A flag indicating whether the element can be dragged further.
 */
function withinScreen({ element, position, captureOffset }) {}


// draggable/boundary-strategies/within-parent.js
/**
 * A boundary strategy which makes an element draggable only within its parent.
 *
 * @param {HTMLElement} element A draggable element.
 * @param {[number, number]} position Current position of an element within a viewport.
 * @param {[number, number]} captureOffset Offset, at which the element has been captured for dragging.
 * @return {boolean} A flag indicating whether the element can be dragged further.
 */
function withinParent({ element, position, captureOffset }) { }


// draggable/boundary-strategies/horizontal-only.js
/**
 * A boundary strategy which makes an element draggable only within the X axis.
 *
 * @param {HTMLElement} element A draggable element.
 * @param {[number, number]} position Current position of an element within a viewport.
 * @param {[number, number]} captureOffset Offset, at which the element has been captured for dragging.
 * @return {boolean} A flag indicating whether the element can be dragged further.
 */
function horizontalOnly({ element, position, captureOffset }) { }

