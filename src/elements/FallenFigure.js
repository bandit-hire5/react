import Square from './Square';
import * as constants from './const';

class FallenFigure {
    constructor(options) {
        this.sizeCompletedRow = options.rowWidth || constants.DEFAULT_WIDTH;
        this.squares = [];
        this.empty = "empty";
    }

    getSquares() {
        let self = this;
        return self.squares;
    }

    aggregateFigure(figure) {
        let figureSquares = figure.getSquares();
        let fallenSquares = this.squares;

        this.squares = [...fallenSquares, ...figureSquares];

        let tempMatrix = FallenFigure.squareSetToMatrix(
            this.squares,
            this.sizeCompletedRow,
            this.empty
        );

        let completedRow = FallenFigure.countCompletedLine(
            tempMatrix,
            this.sizeCompletedRow,
            this.empty
        );

        let newMatrix = FallenFigure.removeCompleteLine(
            tempMatrix,
            this.sizeCompletedRow,
            this.empty
        );

        newMatrix = FallenFigure.translateFallenToTheBack(
            newMatrix,
            this.sizeCompletedRow,
            this.empty,
            completedRow
        );

        this.squares = FallenFigure.castMatrixToSquareSet(newMatrix, this.empty);
    }

    isFallenOnTop() {
        return this.squares.filter(b => b.getY() === 0).length > 0;
    }

    static squareSetToMatrix(squareSet, sizeCompletedRow, emptyElement) {
        let maxY = 0;

        squareSet.map(b => {
            if (b.getY() > maxY) {
                maxY = b.getY();
            }

            return false;
        });

        let matrix = [];

        for (let y = 0; y < maxY + 1; y++) {
            let row = [];

            for (let i = 0; i < sizeCompletedRow + 1; i++) {
                row.push(emptyElement);
            }

            matrix.push(row);
        }

        squareSet.map(b => {
            matrix[b.getY()][b.getX()] = b.getColor();

            return false;
        });

        return matrix;
    }

    static castMatrixToSquareSet(matrix, emptyElement) {
        let squareSet = [];

        for (let y = 0; y < matrix.length; y++) {
            for (let i = 0; i < matrix[y].length; i++) {
                if (matrix[y][i] !== emptyElement) {
                    squareSet.push(
                        new Square({
                            x: i,
                            y: y,
                            color: matrix[y][i],
                        })
                    );
                }
            }
        }

        return squareSet;
    }

    static countCompletedLine(matrix, widthCompleteLine, emptyElement) {
        return matrix.filter(line =>
            line.reduce((total, y) => {
                if (y != null && y !== emptyElement) {
                    total = total + 1;
                }

                return total;
            }, 0) === widthCompleteLine
        ).length;
    }

    static removeCompleteLine(matrix, widthCompleteLine, emptyElement) {
        return matrix.filter(line =>
            line.reduce((total, y) => {
                if (y != null && y !== emptyElement) {
                    total = total + 1;
                }

                return total;
            }, 0) < widthCompleteLine
        );
    }

    static translateFallenToTheBack(matrix, widthCompleteLine, emptyElement, nbCompletedLine) {
        for (let y = 0; y < nbCompletedLine; y++) {
            let row = [];

            for (let i = 0; i <= widthCompleteLine; i++) {
                row.push(emptyElement);
            }

            matrix = [row, ...matrix];
        }

        return matrix;
    }
}

export default FallenFigure;