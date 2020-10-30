import React from 'react';
import ReactDOM from 'react-dom';


import "normalize.css";
import "./assets/scss/custom-reset.scss"
import "./assets/scss/variables.scss"
import "./assets/scss/fonts.css"
import "./assets/scss/core.scss"

import './index.css';
import App from './App';

import {BrowserRouter} from "react-router-dom";

import $ from "jquery";
import "slick-carousel/slick/slick.min";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

$(document).ready(function () {
    $('.slider-slick').slick({
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        variableWidth: true,
        variableHeight: true
    });
});



//import reportWebVitals from './reportWebVitals';

// dev-server start with just npm start
ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
