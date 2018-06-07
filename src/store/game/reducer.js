import Immutable from 'seamless-immutable';
import * as types from './actionTypes';

const initialState = Immutable({
    figure: false,
});

export default function reduce(state = initialState, action = {}) {
    switch (action.type) {
        case types.GAME_NEW_FIGURE:
        case types.GAME_FIGURE_MOVE:
        case types.GAME_FIGURE_REMOVE:
            return state.merge({
                figure: action.figure,
            });

        default:
            return state;
    }
}

export function getIsNewFigure(state) {
    return !!state.game.figure;
}

export function getFigure(state) {
    return state.game.figure;
}