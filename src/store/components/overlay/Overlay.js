import React from "react";
import styled from "styled-components";

export default class Overlay extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const Overlay = styled.div` 
            position: fixed;
            width: 100%;
            height: 100%;
            //visibility: hidden;
            //opacity: 0;
            top: 0;
            left: 0;
            z-index: 1000;
            background: rgba(44,10,10,0.8);
            -webkit-transition: all 0.3s;
            -moz-transition: all 0.3s;
            transition: all 0.3s;
        `;

        return (
            <Overlay>{this.props.children}</Overlay>
        )
    }
}


