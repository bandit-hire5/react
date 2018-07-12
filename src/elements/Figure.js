import Square from './Square';
import * as constants from './const';

const colorList = [
    "#00FFFD",
    "#2117F8",
    "#FFA834",
    "#FEFE6C",
    "#00FF45",
    "#A215F3",
    "#FF001D",
    "#181818",
    "#AB4642",
];

const defaultMatrix = [
    [
        [1, 0, 0, 0], [1, 0, 0, 0], [1, 0, 0, 0], [1, 0, 0, 0]
    ],
    [
        [1, 1], [1, 1]
    ],
    [
        [1, 0, 0], [1, 1, 0], [1, 0, 0]
    ],
    [
        [1, 0, 0], [1, 0, 0], [1, 1, 0]
    ],
    [
        [1, 1, 0], [0, 1, 1], [0, 0, 0]
    ],
];

class Figure {
    constructor(options) {
        this.startX = options.startX || constants.DEFAULT_START_X;

        this.x = 0;
        this.y = 0;
        this.color = null;
        this.matrix = [];

        this.nextMatrix = [];
        this.nextColor = null;
    }

    generateNew() {
        this.matrix = this.nextMatrix.length ? this.nextMatrix : this.generateRandomMatrix();
        this.color = this.nextColor || this.generateRandomColor();
        this.x = this.startX;
        this.y = 0;

        this.nextMatrix = this.generateRandomMatrix();
        this.nextColor = this.generateRandomColor();
    }

    applyAction(action, field, fallen) {
        if (action == null) {
            throw new Error("action is null");
        }

        switch(action) {
            case constants.FIGURE_MOVE_DOWN:
                this.moveDownFigure();
                break;

            case constants.FIGURE_MOVE_LEFT:
                this.moveLeftFigure();
                break;

            case constants.FIGURE_MOVE_RIGHT:
                this.moveRightFigure();
                break;

            case constants.FIGURE_ROTATE:
                this.rotateFigure();
                break;

            case constants.FIGURE_DROP:
                this.dropFigure(field, fallen);
                break;

            default:
        }
    }

    isNextStep(action, field, fallen) {
        let y = this.y;
        let x = this.x;
        let color = this.color;
        let matrix = this.matrix;

        switch (action) {
            case constants.FIGURE_MOVE_DOWN:
                y++;
                break;

            case constants.FIGURE_MOVE_LEFT:
                x--;
                break;

            case constants.FIGURE_MOVE_RIGHT:
                x++;
                break;

            case constants.FIGURE_ROTATE:
                matrix = this.rotateMatrix(matrix);
                break;

            case constants.FIGURE_DROP:
                return true;

            default:
        }

        let newFigureSquares = this.squareSet(matrix, x, y, color);

        let {isFallenTouchingFigure, isTheFigureContainedInTheField} = this.getCollisions(newFigureSquares, field, fallen);

        return !isFallenTouchingFigure && isTheFigureContainedInTheField;
    }

    getDropCoordinate(y, field, fallen) {
        let x = this.x;
        let color = this.color;
        let matrix = this.matrix;

        let newFigureSquares = this.squareSet(matrix, x, y, color);

        let {isFallenTouchingFigure, isTheFigureContainedInTheField} = this.getCollisions(newFigureSquares, field, fallen);

        if (!isFallenTouchingFigure && isTheFigureContainedInTheField) {
            return this.getDropCoordinate(y + 1, field, fallen);
        }

        return y - 1;
    }

    getCollisions(newFigureSquares, field, fallen) {
        let fallenSquares = fallen.getSquares();
        let fieldSquares = field.getSquares();

        let isFallenTouchingFigure =
            newFigureSquares.filter(figureElem => {
                let intersectingElements = fallenSquares.filter(
                    fallenElem => fallenElem.getX() === figureElem.getX() && fallenElem.getY() === figureElem.getY()
                );

                return intersectingElements.length > 0;
            }).length > 0;

        let elementNotInFigureNotInField = newFigureSquares.filter(figureElem => {
            let outsideElem = fieldSquares.filter(
                fieldElem => fieldElem.getX() === figureElem.getX() && fieldElem.getY() === figureElem.getY()
            );

            return outsideElem.length === 0;
        });

        let isTheFigureContainedInTheField = elementNotInFigureNotInField.length === 0;

        return {
            isFallenTouchingFigure,
            isTheFigureContainedInTheField,
        };
    }

    getSquares() {
        return this.squareSet(
            this.matrix,
            this.x,
            this.y,
            this.color,
        );
    }

    getNextSquares() {
        return this.squareSet(
            this.nextMatrix,
            0,
            0,
            this.nextColor,
        );
    }

    rotateFigure() {
        this.matrix = this.rotateMatrix(this.matrix);
    }

    dropFigure(field, fallen) {
        this.y = this.getDropCoordinate(this.y + 1, field, fallen);
    }

    moveDownFigure() {
        this.y++;
    }

    moveRightFigure() {
        this.x++;
    }

    moveLeftFigure() {
        this.x--;
    }

    squareSet(matrix, x, y, color) {
        let squareSet = [];

        for (let j = 0; j < matrix.length; j++) {
            for (let i = 0; i < matrix[j].length; i++) {
                if (matrix[j][i] === 1) {
                    squareSet.push(
                        new Square({
                            color: color,
                            y: j + y,
                            x: i + x,
                        })
                    );
                }
            }
        }

        return squareSet;
    }

    rotateMatrix(matrix) {
        matrix = this.transpose(matrix);
        matrix = this.reverseRows(matrix);

        return matrix;
    }

    randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    transpose(matrix) {
        let result = new Array(matrix[0].length);

        for (let i = 0; i < matrix[0].length; i++) {
            result[i] = new Array(matrix.length - 1);

            for (let y = matrix.length - 1; y > -1; y--) {
                result[i][y] = matrix[y][i];
            }
        }

        return result;
    }

    reverseRows(matrix) {
        return matrix.reverse();
    }

    transposeRnd(m) {
        return this.randomInt(0, 2) === 1 ? this.transpose(m) : m;
    }

    generateRandomMatrix() {
        return this.transposeRnd(defaultMatrix[this.randomInt(0, 4)]);
    }

    generateRandomColor() {
        return colorList[this.randomInt(0, 8)];
    }
}

export default Figure;