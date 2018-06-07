import React, {Component} from 'react';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import * as gameSelectors from '../store/game/reducer';
import * as gameActions from '../store/game/actions';
import './Game.css';
import FigureWrapper from '../containers/FigureWrapper';

class Game extends Component {
    constructor(props) {
        super(props);

        autoBind(this);
    }

    componentDidMount() {
        this.props.dispatch(gameActions.newFigure());
    }

    componentDidUpdate(prevProps) {
        if (prevProps.isNewFigure === true && this.props.isNewFigure === false) {
            this.props.dispatch(gameActions.newFigure());
        }
    }

    render() {
        return (
            <div className="Game">
                {this.props.isNewFigure ?
                    <FigureWrapper /> :
                    null
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isNewFigure: gameSelectors.getIsNewFigure(state),
    };
}

export default connect(mapStateToProps)(Game);