import React from "react";
import styles from "./error-404.module.scss";
import img from "~img/other/error-404.png"
import {NavLink} from "react-router-dom";

const Error404 = props => {
    return (
        <div className={styles.wrapper}>
            <NavLink to={"/"}>
                <img className={styles.img} src={img} alt="image-error"/>
            </NavLink>
        </div>
    )
};

export default Error404;


