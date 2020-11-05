import React, {Component} from "react";
import styles from "./modal-overlay.module.scss"

export default class ModalOverlay extends Component {
    render() {
        return (
            <div className={styles.main}>{this.props.children}</div>
        )
    }
}


