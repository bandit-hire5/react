import React from 'react';

export default function Square(props) {
    return (
        <div className={props.selected ? "GameSquare selected" : "GameSquare"}></div>
    );
}