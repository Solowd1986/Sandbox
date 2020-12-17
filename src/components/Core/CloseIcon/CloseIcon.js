import React, {Component} from "react";
import styles from "./close-icon.module.scss";

export default class CloseIcon extends Component {
    render() {
        return (
            <span onClick={this.props.clickHandler} className={styles.close}/>
        )
    }
}


