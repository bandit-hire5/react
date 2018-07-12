import React from 'react';
import {GameOverBlock} from './Styles';

export default function Square(props) {
    return (
        <GameOverBlock>
            <div>GAME OVER!</div>
            <button onClick={props.onClick}>Restart</button>
        </GameOverBlock>
    );
}