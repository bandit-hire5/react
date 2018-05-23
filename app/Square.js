import React from "react";
import {ButtonSquare} from './styles/game';

function Square(props) {
    if (props.isWinner) {
        return (
            <ButtonSquare winner onClick={props.onClick}>{props.value}</ButtonSquare>
        );
    }

    return (
        <ButtonSquare onClick={props.onClick}>{props.value}</ButtonSquare>
    );
}

export default Square;