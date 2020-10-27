import React from "react";
import Input from "../Form/Input/Input";
//import S from "./.module.scss";

const Main = props => {

    const getBack = () => {
        props.history.push({
            pathname: "/"
        });
    };

    //console.log(props);
    return (
        <div className={"main"}>
            <button onClick={getBack}>Back</button>
            <Input/>
            {props.children}
            <h3>Main</h3>
        </div>
    )
};

export default Main;


