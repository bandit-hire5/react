import React, {Component} from "react";
import Square from "./Square";
import {BoardRow} from './styles/game';
import {calculateWinner, getWinner} from "./Winner";

class Board extends Component {
    getWinners() {
        const squares = this.props.squares.slice();

        if (calculateWinner(squares)) {
            const winnerList = getWinner();

            return squares.map((item, i) => {
                return winnerList.indexOf(i) >= 0;
            });
        }

        return Array(9).fill(false);
    }

    renderSquare(i, winners) {
        return (
            <Square
                key={i}
                value={ this.props.squares[i] }
                isWinner={winners[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {
        const winners = this.getWinners();

        return (
            <div>
                {Array(3).fill(null).map((row, i) => {
                    return (
                        <BoardRow key={i}>
                            {Array(3).fill(null).map((square, y) => {
                                return this.renderSquare(i * 3 + y, winners);
                            })}
                        </BoardRow>
                    );
                })}
            </div>
        );
    }
}

export default Board;