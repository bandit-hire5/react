import * as types from './actionTypes';
import decorator from '../../libs/decorator';

const figureTypes = [
    'I', 'J', 'L', 'O', 'S', 'T', 'Z'
];

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function newFigure() {
    return (dispatch, getState) => {
        try {
            const figure = decorator(figureTypes[getRandomInt(0, 6)]);

            dispatch({
                type: types.GAME_NEW_FIGURE,
                figure: figure,
            }, 1000);
        } catch (error) {
            console.error(error);
        }
    };
}

export function figureMove() {
    return (dispatch, getState) => {
        const state = getState();
        const figure = decorator(state.game.figure.type);

        figure.setData(state.game.figure);
        figure.moveToBottom();

        try {
            dispatch({
                type: types.GAME_FIGURE_MOVE,
                figure: figure.getData(),
            }, 1000);
        } catch (error) {
            console.error(error);
        }
    };
}

export function figureMoveLeft() {
    return (dispatch, getState) => {
        const state = getState();
        const figure = decorator(state.game.figure.type);

        figure.setData(state.game.figure);

        if (!figure.moveToLeft()) {
            return;
        }

        try {
            dispatch({
                type: types.GAME_FIGURE_MOVE,
                figure: figure.getData(),
            }, 1000);
        } catch (error) {
            console.error(error);
        }
    };
}

export function figureMoveRight() {
    return (dispatch, getState) => {
        const state = getState();
        const figure = decorator(state.game.figure.type);

        figure.setData(state.game.figure);

        if (!figure.moveToRight()) {
            return;
        }

        try {
            dispatch({
                type: types.GAME_FIGURE_MOVE,
                figure: figure.getData(),
            }, 1000);
        } catch (error) {
            console.error(error);
        }
    };
}

export function figureChangeState() {
    return (dispatch, getState) => {
        const state = getState();
        const figure = decorator(state.game.figure.type);

        figure.setData(state.game.figure);
        figure.changeState();

        try {
            dispatch({
                type: types.GAME_FIGURE_MOVE,
                figure: figure.getData(),
            }, 1000);
        } catch (error) {
            console.error(error);
        }
    };
}

export function figureRemove() {
    return (dispatch, getState) => {
        try {
            dispatch({
                type: types.GAME_FIGURE_REMOVE,
                figure: false,
            }, 1000);
        } catch (error) {
            console.error(error);
        }
    };
}