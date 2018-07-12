import Square from './Square';
import * as constants from './const';

class Field {
    constructor(options) {
        this.width = options.width || constants.DEFAULT_WIDTH;
        this.height = options.height || constants.DEFAULT_HEIGHT;
        this.squares = [];

        let color = "#ffffff";

        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                this.squares.push(
                    new Square({
                        color: color,
                        y: y,
                        x: x,
                    })
                );
            }
        }
    }

    getSquares() {
        return this.squares;
    }
}

export default Field;