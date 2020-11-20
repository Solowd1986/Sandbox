import React, {Component} from "react";
import common from "~scss/common.module.scss";

import {connect} from "react-redux";
import actions from "../../../redux/actions/index"


const Button = props => {
    //console.log(props);

    return (
        <button onClick={props.onClick}
                className={props.className}
                disabled={props.state.cart.defaultSettings.buttonsDisabled}>
            {props.children}
        </button>
    )
};

function setStateToProps(state) {
    return {
        state
    }
}

export default connect(setStateToProps)(Button);






