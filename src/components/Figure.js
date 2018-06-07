import React, {Component} from 'react';
import {FigureBlock, FigureSquare} from './FigureStyles';

export default class Figure extends Component {
    render() {
        const hSquares = this.props.figure.wrapperHeightSquares;
        const wSquares = this.props.figure.wrapperWidthSquares;
        const currentPositionsByState = this.props.figure.statePositions[this.props.figure.state];

        return (
            <FigureBlock figure={this.props.figure}>
                {Array(hSquares).fill(null).map((row, i) => {
                    return (
                        <div key={i}>
                            {Array(wSquares).fill(null).map((square, y) => {
                                return this.renderSquare(i * wSquares + y, currentPositionsByState);
                            })}
                        </div>
                    );
                })}
            </FigureBlock>
        );
    }

    renderSquare(i, currentPositionsByState) {
        const selected = currentPositionsByState.indexOf(i + 1) >= 0;

        return (
            <FigureSquare
                key={i}
                selected={selected}
            />
        );
    }
}