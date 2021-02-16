import React, { Component } from "react";
import styles from "./spinner.module.scss";
import img from "./img/three-dots.svg"

class Spinner extends Component {
    render() {
        return (
            <>
                <img className={styles.spinner} src={img} alt="spinner"/>
            </>
        )
    }
}

export default Spinner;






