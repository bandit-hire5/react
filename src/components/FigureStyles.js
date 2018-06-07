import styled, {css} from 'styled-components';

const FigureBlock = styled.div.attrs({
    width: props => props.figure.wrapperWidth,
    height: props => props.figure.wrapperHeight,
    top: props => props.figure.top || '0px',
    left: props => props.figure.left || '0px',
})`
    position: absolute;
    background: rgba(255, 255, 255, 0);
    
    width: ${props => props.width + 'px'};
    height: ${props => props.height + 'px'};
    top: ${props => props.top + 'px'};
    left: ${props => props.left + 'px'};
`;

const FigureSquare = styled.div`
    /*background: rgba(255, 0, 0, 1);*/
    float: left;
    height: 35px;
    padding: 0;
    text-align: center;
    width: 35px;
    
    ${props => props.selected && css`
        background: rgba(0, 204, 0, 1);
    `}
`;

export {
    FigureBlock,
    FigureSquare,
};