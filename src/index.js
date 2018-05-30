import React from "react";
import ReactDOM from "react-dom";
import App from "../app/App";
import 'babel-core/register';
import 'babel-polyfill';
import {BrowserRouter} from 'react-router-dom';

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById("root")
);