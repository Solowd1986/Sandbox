import React, { Component } from "react";
import styles from "./block-overlay.module.scss"
import Spinner from "../Spinner/Spinner";
import * as util from "../helpers/functions";

class BlockOverlay extends Component {

    constructor(props) {
        super(props);
        util.addScrollbarOffset();
    }

    componentWillUnmount() {
        util.removeScrollbarOffset()
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
