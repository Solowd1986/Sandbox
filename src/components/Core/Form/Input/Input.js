import React, { Component } from "react";
import styles from "./input.module.scss";

class Input extends Component {
    render() {
        const { type, classList } = this.props;
        const id = `${this.props.type || "text"}-id-${Math.random().toString(34).slice(2)}`;

        return (
            <>
                <input id={id}/>
                <label htmlFor={id}>
                    <span/>
                </label>
            </>
        )
    }
}

export default Input;



