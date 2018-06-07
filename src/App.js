import React, {Component} from 'react';
import Game from './containers/Game';
import Square from './components/Square';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Game />

                {Array(22).fill(null).map((row, i) => {
                    return (
                        <div className="GameRow" key={i}>
                            {Array(10).fill(null).map((square, y) => {
                                return this.renderSquare(i * 10 + y);
                            })}
                        </div>
                    );
                })}
            </div>
        );
    }

    renderSquare(i) {
        return (
            <Square
                key={i}
            />
        );
    }
}

export default App;
