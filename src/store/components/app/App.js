import React from "react";
import ReactDom from "react-dom";
import styled from 'styled-components';
import Navbar from "../navbar/Navbar";
import Checkbox from "../checkbox/Checkbox";
import MobileIcon from "../mobile-icon/MobileIcon";
import LoaderIndicator from "../loader-indicator/LoaderIndicator";
import Overlay from "../overlay/Overlay";

export default class App extends React.Component {

    render() {
        return (
            <>
                <MobileIcon/>
                <LoaderIndicator/>
                <Navbar/>
            </>
        )
    }
}


