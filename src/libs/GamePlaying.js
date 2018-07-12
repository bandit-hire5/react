import Field from "../elements/Field";
import FallenFigure from "../elements/FallenFigure";
import Figure from "../elements/Figure";
import * as constants from '../elements/const';

class GamePlaying {
    constructor(options, dispatch) {
        this.isGameOver = false;
        this.changeSpeedIntervals = [180, 120, 60, 60];
        this.gameSpeed = 500;
        this.changeSpeedTime = Date.now();

        this.dispatch = dispatch;

        this.field = new Field({
            width: options.width,
            height: options.height,
        });

        this.fallen = new FallenFigure({
            rowWidth: options.width,
        });

        this.figure = new Figure({
            startX: Math.floor(options.width / 2) - 1,
        });

        this.initEvents();
        this.play();
    }

    initEvents() {
        document.addEventListener('keydown', (event) => {
                event.preventDefault();

                switch (event.keyCode) {
                    case 37:
                        this.executeNextStep(constants.FIGURE_MOVE_LEFT);
                        this.updateSquares();

                        break;

                    case 39:
                        this.executeNextStep(constants.FIGURE_MOVE_RIGHT);
                        this.updateSquares();

                        break;

                    case 38:
                        this.executeNextStep(constants.FIGURE_ROTATE);
                        this.updateSquares();

                        break;

                    case 32:
                        this.executeNextStep(constants.FIGURE_DROP);
                        this.updateSquares();

                        break;

                    default:
                }
            });
    }

    play() {
        this.figure.generateNew();

        this.startLoop();
    }

    startLoop() {
        setTimeout(() => {
            if (this.isGameOver) {
                return;
            }

            this.executeNextStep(constants.FIGURE_MOVE_DOWN);
            this.updateSquares();

            this.checkForChangeSpeed();

            this.startLoop();
        }, this.gameSpeed);
    }

    executeNextStep(action) {
        if (this.figure.isNextStep(action, this.field, this.fallen)) {
            return this.figure.applyAction(action, this.field, this.fallen);
        }

        if (action !== constants.FIGURE_MOVE_DOWN) {
            return;
        }

        if (this.fallen.isFallenOnTop()) {
            this.isGameOver = true;

            this.dispatch({
                type: constants.GAME_OVER,
            }, 1000);

            return;
        }

        this.fallen.aggregateFigure(this.figure);
        this.figure.generateNew();
    }

    updateSquares() {
        if (this.isGameOver) {
            return;
        }

        let squares = [
            ...this.setParams(this.field.getSquares(), 'field'),
            ...this.setParams(this.fallen.getSquares(), 'fallen'),
            ...this.setParams(this.figure.getSquares(), 'figure'),
        ];

        let nextSquares = this.setParams(this.figure.getNextSquares(), 'figure');

        this.dispatch({
            type: constants.GAME_UPDATE,
            squares: squares,
            nextFigure: nextSquares,
            speed: this.gameSpeed,
        }, 1000);
    }

    checkForChangeSpeed() {
        if (!this.changeSpeedIntervals.length) {
            return;
        }

        const now = Date.now();

        if (now - this.changeSpeedTime >= this.changeSpeedIntervals[0] * 1000) {
            this.changeSpeedTime = now;
            this.changeSpeedIntervals.shift();
            this.gameSpeed -= 100;
        }
    }

    setParams(arr, type) {
        return [...arr].map(item => {
            let x = item.getX();
            let y = item.getY();

            return {
                key: type + '_' + x + '_' + y,
                x: x,
                y: y,
                color: item.getColor(),
            };
        });
    }
}

export default GamePlaying;