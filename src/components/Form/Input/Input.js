import React from "react";
import Style from "./input.module.scss";

const Input = props => {
    const inputType = props.type || "text";
    const inputName = props.name || `input${(+new Date).toString(26).slice(-5)}`;
    const inputValue = props.value || "";

    const labelTitle = props.label || "Label Title";
    const randomLabelId = `${inputType}-id-${(+new Date).toString(36).slice(-5)}`;

    return (
        <div>
            <label htmlFor={randomLabelId}>{labelTitle}</label>
            <input
                type={inputType}
                id={randomLabelId}
                name={inputName}
                onChange={props.onChange}
            />
        </div>
    )
};

export default Input;




