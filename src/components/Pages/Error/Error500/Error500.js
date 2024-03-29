import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import styles from "./error-500.module.scss";
import cn from "classnames";
import { withRouter } from "react-router";

class Error500 extends Component {

    reload = () => {
        this.props.history.push("/");
    };

    render() {
        return (
            <div className={"overlay"}>
                <div className={styles.content}>
                    <div id={styles.error}>
                        <div id={styles.box}/>
                        <h3>ОШИБКА 500</h3>
                        <p>Дела на стороне сервера немного <span>нестабильны</span>...</p>
                        <p onClick={this.reload} className={styles.link}>
                            ВЕРНУТЬСЯ НА ГЛАВНУЮ
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Error500);
