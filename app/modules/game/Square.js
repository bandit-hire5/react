import React from "react";
import {ButtonSquare} from './styles/game';

function Square(props) {
    return (
        <ButtonSquare winner={props.isWinner} onClick={props.onClick}>{props.value}</ButtonSquare>
    );
}

export default Square;