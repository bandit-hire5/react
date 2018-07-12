import Immutable from 'seamless-immutable';
import * as constants from '../../elements/const';

const initialState = Immutable({
    squares: [],
    nextFigure: [],
    isGameOver: false,
    speed: 500,
});

export default function reduce(state = initialState, action = {}) {
    switch (action.type) {
        case constants.GAME_UPDATE:
            return {
                squares: action.squares,
                nextFigure: action.nextFigure,
                isGameOver: false,
                speed: action.speed,
            };

        case constants.GAME_OVER:
            return {
                squares: [],
                nextFigure: [],
                isGameOver: true,
                speed: 500,
            };

        default:
            return state;
    }
}

export function getSquares(state) {
    return state.game.squares;
}

export function getNextSquares(state) {
    return state.game.nextFigure;
}

export function getGameStatus(state) {
    return state.game.isGameOver;
}

export function getGameSpeed(state) {
    return state.game.speed;
}