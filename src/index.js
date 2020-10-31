import React from 'react';
import ReactDOM from 'react-dom';


import "normalize.css";
// Общие стили для проекта, все специфические - в папках компонентов.
import "./assets/scss/main.scss"

import App from './App';
import {BrowserRouter} from "react-router-dom";


// dev-server start with just npm start
ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);


