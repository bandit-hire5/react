import * as constants from './const';

class Figure {
    constructor() {
        this.state = 0;
    }

    setPosition(x, y) {
        this.left = x;
        this.top = y;
    }

    moveToBottom() {
        this.top += constants.SQUARE_SIZE;
        return true;
    }

    moveToLeft() {
        if (this.left <= 0) {
            this.left = 0;

            return false;
        }

        this.left -= constants.SQUARE_SIZE;

        return true;
    }

    moveToRight() {
        const maxRight = constants.SQUARE_COUNT_HORIZONTAL * constants.SQUARE_SIZE - this.wrapperWidthSquares * constants.SQUARE_SIZE;

        if (this.left >= maxRight) {
            this.left = maxRight;

            return false;
        }

        this.left += constants.SQUARE_SIZE;

        return true;
    }

    changeState() {
        if (this.state === 3) {
            this.state = 0;
        } else {
            this.state++;
        }
    }

    getData() {
        return {...this};
    }

    setData(data) {
        const {left, top, state} = data;

        this.left = left;
        this.top = top;
        this.state = state;
    }
}

export default Figure;