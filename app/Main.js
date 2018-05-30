import React from "react";
import {Switch, Route} from 'react-router-dom';
import Home from "./modules/home/Main";
import Game from "./modules/game/Main";
import StarWars from "./modules/starwars/Main";

function Main() {
    return (
        <main>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/game' component={Game} />
                <Route path='/star-wars' component={StarWars} />
            </Switch>
        </main>
    );
}

export default Main;