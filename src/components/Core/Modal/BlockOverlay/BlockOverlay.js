import React, { Component } from "react";
import styles from "./block-overlay.module.scss"
import Spinner from "../Spinner/Spinner";
import * as util from "../helpers/functions";

class BlockOverlay extends Component {

    constructor(props) {
        super(props);
        this.addScrollbarOffset();
    }

    addScrollbarOffset = () => {
        if (util.calcScrollBarWidth() > 0) {
            document.body.style.cssText = `width: ${document.body.clientWidth}px; overflow: hidden`;
            document.querySelector("header").style.cssText = `width: ${document.body.clientWidth}px`;
        }
    };

    removeScrollbarOffset = () => {
        document.body.style.removeProperty("width");
        document.body.style.removeProperty("overflow");
        document.querySelector("header").style.removeProperty("width");
    };


    componentWillUnmount() {
        this.removeScrollbarOffset()
    }

    render() {
        return (
            <div className={styles.overlay_wrapper}>
                <div className={styles.overlay}>
                    <Spinner/>
                </div>
            </div>
        )
    }
}

export default BlockOverlay;
