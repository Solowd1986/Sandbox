import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import styles from "./error-500.module.scss";
import { withRouter } from "react-router";

class Error500 extends Component {

    reload = () => {
        this.props.history.go(0);
    };

    render() {
        console.log('err', this.props);
        return (
            <div className={styles.wrapper}>
                <div className={styles.content}>
                    <div id={styles.error}>
                        <div id={styles.box}/>
                        <h3>ОШИБКА 500</h3>
                        <p>Дела на стороне сервера немного <span>нестабильны</span>...</p>
                        <p onClick={this.reload} className={styles.link}>
                            ПОПРОБОВАТЬ ЕЩЕ РАЗ
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Error500);
