import React from "react";
import styles from "./no-match-page.module.scss";
import img from "~img/other/404-error.png"
import {NavLink} from "react-router-dom";

const NoMatchPage = props => {
    return (
        <div className={styles.wrapper}>
            <NavLink to={"/"}>
                <img className={styles.img} src={img} alt="image-error"/>
            </NavLink>
        </div>
    )
};

export default NoMatchPage;


