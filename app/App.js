import React, {PureComponent} from 'react';
import PersonRow from './Person';
import ShipRow from './Ship.js';
import {
    BlockDiv,
    StatusDiv,
    ActionDiv,
    PageButton,
    PersonList,
} from './styles/app';

class App extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            isLoadingPeople: false,
            isLoadingShips: false,
            loadingShipStatus: false,
            people: [],
            ships: [],
        };

        this.page = 1;
        this.maxPage = 0;
    }

    componentDidMount() {
        this.loadPeople(this.page);
    }

    render() {
        return (
            <div>
                <BlockDiv>
                    <StatusDiv show={this.state.isLoadingPeople}><span>Loading...</span></StatusDiv>

                    <PersonList>
                        {this.state.people.map(person => (
                            <PersonRow key={person.name} person={person} update={this.update.bind(this)} />
                        ))}
                    </PersonList>

                    <ActionDiv>
                        <PageButton onClick={() => this.handlePrevious()} left disabled={this.page === 1}>Previous</PageButton>
                        <PageButton onClick={() => this.handleNext()} right disabled={this.maxPage && this.page >= this.maxPage}>Next</PageButton>
                    </ActionDiv>
                </BlockDiv>

                <BlockDiv>
                    <StatusDiv show={this.state.isLoadingShips}><span>Loading...</span></StatusDiv>

                    <StatusDiv show={this.state.loadingShipStatus}>
                        <span>{this.state.loadingShipStatus}</span>
                    </StatusDiv>

                    <ol>
                        {this.state.ships.map(ship => (
                            <ShipRow key={ship.name} ship={ship} />
                        ))}
                    </ol>
                </BlockDiv>
            </div>
        );
    }

    async loadPeople(page) {
        if (this.maxPage && page > this.maxPage) {
            return;
        }

        this.setState({
            ships: [],
            isLoadingPeople: true,
        });

        const response = await fetch(`https://swapi.co/api/people?page=${page}`);
        const json = await response.json();

        this.maxPage = Math.ceil(json.count / 10);

        this.setState({
            people: [...json.results],
            isLoadingPeople: false,
            loadingShipStatus: 'Select a person to find their starships',
        });
    }

    handlePrevious() {
        this.loadPeople(--this.page);
    }

    handleNext() {
        this.loadPeople(++this.page);
    }

    update(config) {
        this.setState(config);
    }
}

export default App;