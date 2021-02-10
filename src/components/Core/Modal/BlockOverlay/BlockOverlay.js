import React, { Component } from "react";
import styles from "./block-overlay.module.scss"
import Spinner from "../Spinner/Spinner";

class BlockOverlay extends Component {
    render() {
        return (
            <div className={styles.wrapper}>
                <div className={styles.overlay}>
                </div>
                {/*<Spinner/>*/}
                {this.props.children}
            </div>
        )
    }
}

export default BlockOverlay;
