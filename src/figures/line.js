import Figure from './figure.js';
import * as constants from './const';

class Line extends Figure {
    constructor() {
        super();

        this.type = 'I';
        this.wrapperWidthSquares = 4;
        this.wrapperHeightSquares = 4;
        this.wrapperWidth = this.wrapperWidthSquares * constants.SQUARE_SIZE;
        this.wrapperHeight = this.wrapperHeightSquares * constants.SQUARE_SIZE;

        this.statePositions = {
            0: [5, 6, 7, 8],
            1: [3, 7, 11, 15],
            2: [9, 10, 11, 12],
            3: [2, 6, 10, 14],
        };

        this.top = -(3 * constants.SQUARE_SIZE);
        this.left = Math.floor((constants.SQUARE_COUNT_HORIZONTAL - this.wrapperWidthSquares) / 2) * constants.SQUARE_SIZE;
    }
}

export default Line;