import React, {Component} from 'react';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import Square from '../components/Square';
import GameOver from '../components/GameOver';
import NextFigure from '../components/NextFigure';
import Controls from '../components/Controls';

import * as gameSelectors from '../store/game/reducer';
import * as gameActions from '../store/game/actions';
import './Game.css';

class Game extends Component {
    constructor(props) {
        super(props);

        autoBind(this);
    }

    componentDidMount() {
        this.startGame();
    }

    startGame() {
        this.props.dispatch(gameActions.startGame({...this.props}));
    }

    render() {
        return (
            <div>
                <Controls speed={this.props.speed} />
                <div className="Game">
                    {this.props.isGameOver ?
                        <GameOver onClick={() => this.startGame()} /> :
                        this.props.squares ?
                            this.props.squares.map((row) => {
                                return (
                                    <Square {...row} />
                                );
                            }) :
                            null
                    }
                </div>
                <NextFigure isGameOver={this.props.isGameOver} nextFigure={this.props.nextFigure} />
            </div>
        );
    }

    componentWillUnmount() {
        document.removeEventListener('keydown');
    }
}

function mapStateToProps(state) {
    return {
        squares: gameSelectors.getSquares(state),
        nextFigure: gameSelectors.getNextSquares(state),
        isGameOver: gameSelectors.getGameStatus(state),
        speed: gameSelectors.getGameSpeed(state),
    };
}

export default connect(mapStateToProps)(Game);