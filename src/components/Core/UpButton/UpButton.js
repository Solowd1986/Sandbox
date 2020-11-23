import React from "react";
import styles from "./up-button.module.scss";

const UpButton = props => {

    const checkScroll = () => {
        return true;
    };

    const scrollUp = () => {
        window.scrollTo({ "top": 0, behavior: "smooth" });
    };

    return (
        // checkScroll() && <button onClick={scrollUp} className={`${styles.btn}`}>Up</button>

        <div className={styles.up}>

        </div>
        //
        // <div onClick={scrollUp} className={`${styles.btn}`}>
        //     <svg width={20} height={20} viewBox="0 0 16 16">
        //         <path fill="#FFF" d="M8 2.8l8 7.9-2.4 2.4-5.5-5.5-5.6 5.6L0 10.7z"/>
        //     </svg>
        // </div>


    )
};

export default UpButton;


