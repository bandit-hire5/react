import React, {PureComponent} from "react";
import Square from "./Square";
import {BoardRow} from './styles/game';

class Board extends PureComponent {
    renderSquare(i) {
        return (
            <Square
                key={i}
                value={ this.props.squares[i] }
                isWinner={this.props.winners[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {
        return (
            <div>
                {Array(3).fill(null).map((row, i) => {
                    return (
                        <BoardRow key={i}>
                            {Array(3).fill(null).map((square, y) => {
                                return this.renderSquare(i * 3 + y);
                            })}
                        </BoardRow>
                    );
                })}
            </div>
        );
    }
}

export default Board;