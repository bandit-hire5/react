import styled from 'styled-components';

const SquareBlock = styled.div.attrs({
    style: props => {
        let styles = {
            backgroundColor: props.color,
            top: (props.y * 34) + 'px',
            left: (props.x * 34) + 'px',
        };

        if (props.color === '#ffffff') {
            if (props.x === 9) {
                styles.borderRight = '1px solid #999999';
            }

            if (props.y === 21) {
                styles.borderBottom = '1px solid #999999';
            }
        } else {
            styles.boxShadow = '0 0 5px rgba(0, 0, 0, .6) inset';
        }

        return styles;
    }
})`
    position: absolute;
    border-left: 1px solid #999999;
    border-top: 1px solid #999999;
    box-sizing: border-box;
    width: 34px;
    height: 34px;
`;

const GameOverBlock = styled.div`
    text-align: center;
    width: 200px;
    position: absolute;
    top: 40%;
    left: 50%;
    margin-left: -100px;
    color: red;
`;

export {
    SquareBlock,
    GameOverBlock,
};