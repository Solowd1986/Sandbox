import React from "react";
import S from "./wrapper.module.scss";

const Wrapper = (props) => {
    return (
        <div className={S.wrapper}>
            {props.children}
        </div>
    )
};

export default Wrapper;

