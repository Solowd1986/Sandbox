import React from "react";
import styles from "./error-404.module.scss";
import { NavLink } from "react-router-dom";

const Error404 = props => {
    return (
        <div className={styles.wrapper}>
            <NavLink to={"/"}/>
        </div>
    )
};

export default Error404;


