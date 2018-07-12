import React, {Component} from 'react';
import Game from './containers/Game';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.widthGame = 10;
        this.heightGame = 22;
    }

    render() {
        return (
            <div className="App">
                <Game width={this.widthGame} height={this.heightGame} />
            </div>
        );
    }
}

export default App;
