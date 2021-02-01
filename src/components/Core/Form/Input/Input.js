import React, {Component} from "react";
import styles from "./input.module.scss";

export default class Input extends Component {

    render() {

        // <Input options={label: {...}, input: {...}}> Login </Input>
        const randomLabelId = `${this.props.options.input.type || "text"}-id-${Math.random().toString(34).slice(2)}`;

        return (
            <>
                <label
                    {...this.props.options.label}
                    {...{ htmlFor: randomLabelId }}>
                    {this.props.children}
                </label>
                <input
                    {...this.props.options.input}
                    {...{ id: randomLabelId }}
                />
            </>

        );
    };
};





