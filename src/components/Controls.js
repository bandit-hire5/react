import React from 'react';

export default function Controls(props) {
    return (
        <div className="Controls">
            <ul>
                <li>
                    <span className="action">SPACE</span>
                    <span className="description">
                                drop the figure
                            </span>
                </li>
                <li>
                    <span className="action">&#8593;</span>
                    <span className="description">rotate the figure</span>
                </li>
                <li>
                    <span className="action">&#8592;</span>
                    <span className="description">move figure to left</span>
                </li>
                <li>
                    <span className="action">&#8594;</span>
                    <span className="description">move figure to right</span>
                </li>
                <li>
                    <span className="action">Speed</span>
                    <span className="description">{props.speed}</span>
                </li>
            </ul>
        </div>
    );
}