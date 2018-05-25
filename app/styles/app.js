import styled, {css} from 'styled-components';

const ButtonSquare = styled.button`
    background: #fff;
    border: 1px solid #999;
    float: left;
    font-size: 24px;
    font-weight: bold;
    line-height: 34px;
    height: 34px;
    margin-right: -1px;
    margin-top: -1px;
    padding: 0;
    text-align: center;
    width: 34px;
    
    ${props => props.winner && css`
        background: #00ff00;
    `}
`;

const BoardRow = styled.div`
    &:after {
        clear: both;
        content: "";
        display: table;
    }
`;

const ButtonMoving = styled.button`
    border-radius: 3px;
    padding: 0.25em 1em;
    margin: 0.1em 1em;
    background: transparent;
    color: palevioletred;
    border: 2px solid palevioletred;
    cursor: pointer;
    
    ${props => props.current && css`
        background: palevioletred;
        color: white;
    `}
`;

const ButtonSort = styled.button`
    border-radius: 3px;
    padding: 0.25em 1em;
    margin: 0.1em 1em;
    background: transparent;
    color: palevioletred;
    border: 2px solid palevioletred;
    cursor: pointer;
    
    ${props => props.current && css`
        background: palevioletred;
        color: white;
    `}
`;

const GameStatus = styled.div`
    margin: 10px 0;
`;

export {
    ButtonSquare,
    ButtonMoving,
    ButtonSort,
    BoardRow,
    GameStatus,
};