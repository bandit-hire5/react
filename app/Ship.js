import React, {Component} from 'react';
import {ShipLi} from './styles/app';

class Ship extends Component {
    shouldComponentUpdate(nextProps) {
        return this.props.ship.name !== nextProps.ship.name;
    }

    render() {
        return (
            <ShipLi>
                {this.props.ship.name}
            </ShipLi>
        );
    }
}

export default Ship;