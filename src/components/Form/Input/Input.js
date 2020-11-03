import React from "react";
import Style from "./input.module.scss";
import styles from "../../Pages/Order/order.module.scss";


const Input = props => {
    console.log(props.options);

    const randomLabelId = `${props.options.input.type || "text"}-id-${Math.random().toString(34).slice(2)}`;

    // <Input options={label: {...}, input: {...}}> Login </Input>
    return (
        <>
            <label {...props.options.label} {...{ htmlFor: randomLabelId }}>{props.children}</label>
            <input {...props.options.input} {...{ id: randomLabelId }}/>
        </>
    )
};

export default Input;




