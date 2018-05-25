import styled, {css} from 'styled-components';

const StatusDiv = styled.div`
    display: none;
    
    ${props => props.show && css`
        display: flex;
        height: inherit;
        align-items: center;
        justify-content: center;
        
        &>span {
            margin: 0;
        }
    `}
`;

const PersonList = styled.ul`
    list-style: none;
`;

const BlockDiv = styled.div`
    width: 400px;
    overflow: hidden;
    min-height: 300px;
    height: 300px;
    position: relative;
    float: left;
`;

const ActionDiv = styled.div`
    width: 400px;
    overflow: hidden;
`;

const PageButton = styled.button`
    ${props => props.left && css`
        float: left;
        margin-left: 10px;
    `}

    ${props => props.right && css`
        float: right;
        margin-right: 10px;
    `}
`;

const PersonLink = styled.a`
    &:hover {
        font-weight: bold;
        cursor: pointer;
    }
`;

const ShipLi = styled.li`
    &:hover {
        font-weight: bold;
        cursor: pointer;
    }
`;

export {
    PersonList,
    BlockDiv,
    StatusDiv,
    ActionDiv,
    PageButton,
    PersonLink,
    ShipLi,
};