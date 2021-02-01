import React, { Component } from "react";
import styles from "./modal-content.module.scss";
import classNames from "classnames";

class ModalContent extends Component {
    render() {
        const { children = null } = this.props;
        const classList = classNames("animate__animated animate__bounceInRight");
        return (
            <div className={classList}>
                <span className={styles.close}/>
                <div onClick={(evt) => evt.stopPropagation()}>
                    {children}
                </div>
            </div>
        )
    }
}

export default ModalContent;

