import React from "react";
import styled from "styled-components";

export default class MobileIcon extends React.Component {

    show = evt => evt.target.classList.toggle("mobile-icon-component--active");

    render() {
        return (
            <button onClick={this.show} className="mobile-icon-component">
                <span/>
            </button>
        )
    }
}

