import Line from '../figures/line';

const figureList = {
    'I': Line,
    'J': Line,
    'L': Line,
    'O': Line,
    'S': Line,
    'T': Line,
    'Z': Line,
};

export default function(type) {
    if (figureList[type] === undefined) {
        return new figureList['I']();
    }

    return new figureList[type]();
}