import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import styles from "./error-500.module.scss";

export default class Error500 extends Component {
    render() {
        return (
            <div className={styles.wrapper}>
                <div className={styles.content}>

                    <div id={styles.error}>
                        <div id={styles.box}/>
                        <h3>ОШИБКА 500</h3>
                        <p>Дела на стороне сервера немного <span>нестабильны</span>...</p>
                        <p><NavLink to={"/"} className={styles.link}>
                            Вернуться на главную страницу
                        </NavLink>
                        </p>
                    </div>

                    {/*<h1>Сервер не ответил вовремя, попробуйте еще раз</h1>*/}

                </div>

            </div>
        )
    }
}


