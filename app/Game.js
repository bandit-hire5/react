import React, {PureComponent} from "react";
import "./Game.css";
import Board from "./Board.js";
import {calculateWinner, getWinner} from "./Winner.js";
import getPosition from "./Position.js";

class Game extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            history: [{
                squares: Array(9).fill(null),
                position: null,
            }],
            winners: Array(9).fill(false),
            sortHistory: 'asc',
            stepNumber: 0,
            xIsNext: true,
            endDraw: false,
        };
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        const endDraw = this.state.endDraw;

        const moves = history.map((step, move) => {
            const desc = move ?
                'Go to move #' + move + ' (position: ' + step.position + ')' :
                'Go to game start';
            const buttonStyle = {
                fontWeight: move === this.state.stepNumber ? 'bold' : 'normal',
            };

            return (
                <li key={move}>
                    <button style={buttonStyle} onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        const sortBtn = (
            <button onClick={() => this.sortHistory()}>Sort</button>
        );

        let status;

        if (endDraw) {
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
                        winners={this.state.winners}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>

                <div className="game-info">
                    <div>{status}</div>
                    <ol>{sortBtn}</ol>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
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

        let winners = this.state.winners.slice();

        if (calculateWinner(squares)) {
            const winnerList = getWinner();

            winners = squares.map((item, i) => {
                return winnerList.indexOf(i) >= 0;
            });
        }

        let endDraw = squares.every((value) => {
            return value;
        });

        this.setState({
            history: history.concat([{
                squares: squares,
                position: getPosition(i),
            }]),
            winners: winners,
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
            endDraw: endDraw,
        });
    }
}

export default Game;