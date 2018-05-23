import React, {PureComponent} from "react";
import {ButtonMoving, GameStatus, ButtonSort} from './styles/game';
import Board from "./Board";
import {calculateWinner} from "./Winner";
import getPosition from "./Position";

class Game extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            history: [{
                sort: 0,
                squares: Array(9).fill(null),
                position: null,
            }],
            sortHistory: 'asc',
            stepNumber: 0,
            xIsNext: true,
            endDraw: false,
        };
    }

    render() {
        let history = this.state.history.slice();

        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        if (this.state.sortHistory === 'desc') {
            history = history.reverse();
        }

        const moves = this.getMoves(history);

        let status;

        if (this.state.endDraw) {
            status = 'Result: draw';
        } else if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>

                <div className="game-info">
                    <GameStatus>{status}</GameStatus>
                    <div>
                        <ButtonSort onClick={() => this.sortHistory()}>Sort</ButtonSort>
                    </div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }

    getMoves(history) {
        return history.map((step) => {
            const move = step.sort;

            const desc = move ?
                'Go to move #' + move + ' (position: ' + step.position + ')' :
                'Go to game start';

            return (
                <li key={move}>
                    <ButtonMoving current={move === this.state.stepNumber} onClick={() => this.jumpTo(move)}>{desc}</ButtonMoving>
                </li>
            );
        });
    }

    jumpTo(step) {
        const history = this.state.history;
        const current = history[step];
        const squares = current.squares.slice();

        let endDraw = squares.every((value) => {
            return value;
        });

        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
            endDraw: endDraw,
        });
    }

    sortHistory() {
        this.setState({
            sortHistory: this.state.sortHistory === 'asc' ? 'desc' : 'asc',
        });
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        squares[i] = this.state.xIsNext ? 'X' : 'O';

        const endDraw = squares.every((value) => {
            return value;
        });

        this.setState({
            history: history.concat([{
                sort: current.sort + 1,
                squares: squares,
                position: getPosition(i),
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
            endDraw: endDraw,
        });
    }
}

export default Game;