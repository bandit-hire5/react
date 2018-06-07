import React, {Component} from 'react';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import Figure from '../components/Figure';
import * as gameSelectors from "../store/game/reducer";
import * as gameActions from "../store/game/actions";
import * as constants from '../figures/const';

class FigureWrapper extends Component {
    constructor(props) {
        super(props);

        autoBind(this);
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handlerKeyDown, false);

        setTimeout(() => {
            this.props.dispatch(gameActions.figureMove());
        }, 1000);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handlerKeyDown, false);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.figure.top !== this.props.figure.top) {
            setTimeout(() => {
                if (this.props.figure.top <= (constants.SQUARE_COUNT_VERTICAL - 1) * constants.SQUARE_SIZE) {
                    this.props.dispatch(gameActions.figureMove());
                } else {
                    this.props.dispatch(gameActions.figureRemove());
                }
            }, 1000);
        }
    }

    handlerKeyDown(event) {
        const keyCode = event.keyCode;

        switch (keyCode) {
            case 37:
                this.props.dispatch(gameActions.figureMoveLeft());
                break;

            case 39:
                this.props.dispatch(gameActions.figureMoveRight());
                break;

            case 32:
                this.props.dispatch(gameActions.figureChangeState());
                break;
        }
    }

    render() {
        return (
            <Figure figure={this.props.figure} />
        );
    }
}

function mapStateToProps(state) {
    return {
        figure: gameSelectors.getFigure(state),
    };
}

export default connect(mapStateToProps)(FigureWrapper);