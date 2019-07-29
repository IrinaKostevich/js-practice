import { makeDraggable } from './ui/draggable.js';
import { withinScreen } from '../scripts/core/boundary-strategies/within-screen.js';
import { withinParent } from '../scripts/core/boundary-strategies/within-parent.js';
import { horizontalOnly } from '../scripts/core/boundary-strategies/horizontal-only.js';

document.addEventListener('DOMContentLoaded', () => {
    const rectangular = document.querySelector('.rectangular');

    makeDraggable(rectangular, withinScreen);
});
