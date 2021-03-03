import React, { Component } from "react";
import styles from "./block-overlay.module.scss"
import Spinner from "../../Spinner/Spinner";


class BlockOverlay extends Component {

    constructor(props) {
        super(props);

    }

    componentWillUnmount() {

    }

    render() {
        return (
                <div className={styles.overlay}>
                    <Spinner/>
                </div>
        )
    }
}

export default BlockOverlay;
