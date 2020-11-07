import React from "react";
import styles from "./up-button.module.scss";

const UpButton = props => {

    const checkScroll = () => {
        return true;
    };

    return (
        checkScroll() && <button className={`${styles.btn}`}>Up</button>
    )
};

export default UpButton;


