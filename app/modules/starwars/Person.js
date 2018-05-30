"use strict";

import React, {Component} from 'react';
import {PersonLink} from './styles/app';

class Person extends Component {
    shouldComponentUpdate(nextProps) {
        return this.props.person.name !== nextProps.person.name;
    }

    render() {
        return (
            <li>
                <PersonLink onClick={() => this.click(this.props.person.starships)}>{this.props.person.name}</PersonLink>
            </li>
        );
    }

    async click(links) {
        this.props.update({
            isLoadingShips: true,
        });

        const pArray = links.slice().map(async (link) => {
            return this.loadShip(link);
        });

        const ships = await Promise.all(pArray);

        this.props.update({
            ships: [...ships],
            isLoadingShips: false,
            loadingShipStatus: ships.length ? '' : 'Couldn\'t find starships for ' + this.props.person.name,
        });
    }

    async loadShip(link) {
        const response = await fetch(link);
        const json = await response.json();

        return json;
    }


}

export default Person;