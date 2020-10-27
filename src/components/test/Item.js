import React from "react";
//import S from "./Item.module.scss";

const Item = props => {
    //console.log(props.match.params);

    return (
    <div className={"style"}>
        <h2>Product:</h2>
        <h3>{props.match.params.name}</h3>
    </div>
    )
};

export default Item;


