import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import styles from "./error-400.module.scss";
import { withRouter } from "react-router";

class Error400 extends Component {

    reload = () => {
        this.props.history.go(0);
    };

    render() {
        return (
            <div className={styles.wrapper}>
                <div className={styles.content}>
                    <div id={styles.error}>
                        <div id={styles.box}/>
                        <h3>ОШИБКА 400. Что-то пошло не так!</h3>
                        <p onClick={this.reload} className={styles.link}>
                            ПОПРОБОВАТЬ ЕЩЕ РАЗ
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Error400);



