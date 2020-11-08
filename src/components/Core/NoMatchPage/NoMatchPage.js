import React from "react";
import styles from "./no-match-page.module.scss";
import img from "~img/other/404-3.png"
import {NavLink} from "react-router-dom";

const NoMatchPage = props => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.controls}>
                <img src={img} alt="image-error"/>
                <NavLink className={styles.btn} to={"/"}>Вернуться</NavLink>
            </div>
        </div>
    )
};

export default NoMatchPage;


