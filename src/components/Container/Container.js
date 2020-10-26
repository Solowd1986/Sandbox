import React from "react";
import S from "./container.module.scss";

const Container = props => (
    <div className={S.container}>
        {props.children}
    </div>
);

export default Container;







