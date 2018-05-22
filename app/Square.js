import React from "react";

function Square(props) {
    return (
        <button className={props.isWinner ? 'square winner' : 'square'} onClick={props.onClick}>
            {props.value}
        </button>
    );
}

export default Square;