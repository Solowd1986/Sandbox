import React from "react";
import Style from "./input.module.scss";
import styles from "../../Pages/Order/order.module.scss";


{/*<Input*/
}
{/*    options=*/
}
{/*        {{*/
}
{/*            label: {title: "label"},*/
}
{/*            input: {type: "text", className: `${styles.line}`}*/
}
{/*        }}*/
}

{/*    type={"text"}*/
}
{/*    wrapperStyle={`${styles.container_checkout_bg}`}*/
}
{/*    label={"This"}*/
}
{/*    onChange={() => {}}>*/
}
{/*    Name*/
}
{/*</Input>*/
}

const Input = props => {
    console.log(props.options);

    const inputType = props.type || "text";
    const inputName = props.name || `input${(+new Date).toString(26).slice(-5)}`;
    const inputValue = props.value || "";

    const labelTitle = props.label || "Label Title";
    const randomLabelId = `${inputType}-id-${(+new Date).toString(36).slice(-5)}`;


    return (
        <div className={props.options.wrapper}>
            <label {...props.options.label} {...{ htmlFor: randomLabelId }}>{props.children}</label>
            <input {...props.options.input} {...{ id: randomLabelId }}/>

            {/*<label htmlFor={randomLabelId}>{labelTitle}</label>*/}
            {/*<input*/}
            {/*    //type={inputType}*/}
            {/*    id={randomLabelId}*/}
            {/*    name={inputName}*/}
            {/*    value={inputValue}*/}
            {/*    onChange={props.onChange}*/}
            {/*/>*/}
        </div>
    )
};

export default Input;




