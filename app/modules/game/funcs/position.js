import React from "react";

const matrix = [
    [0, 0],
    [0, 1],
    [0, 2],
    [1, 0],
    [1, 1],
    [1, 2],
    [2, 0],
    [2, 1],
    [2, 2],
];

function getPosition(i) {
    if (matrix[i] === undefined) {
        return 'Bad position';
    }

    return matrix[i];
}

export default getPosition;