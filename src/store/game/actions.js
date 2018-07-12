import GamePlaying from '../../libs/GamePlaying';

export function startGame(options) {
    return (dispatch) => {
        new GamePlaying(options, dispatch);
    };
}