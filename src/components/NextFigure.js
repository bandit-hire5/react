import React from 'react';
import Square from './Square';

export default function NextFigure(props) {
    return (
        <div className="nextFigure">
            {props.isGameOver ?
                null :
                props.nextFigure ?
                    props.nextFigure.map((row) => {
                        return (
                            <Square {...row} />
                        );
                    }) :
                    null
            }
        </div>
    );
}