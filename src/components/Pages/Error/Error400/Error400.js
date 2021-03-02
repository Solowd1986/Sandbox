import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import styles from "./error-400.module.scss";
import { withRouter } from "react-router";
import img from "./img/error-400.png";

class Error400 extends Component {

    reload = () => {
        this.props.history.go("/");
    };

    render() {
        return (
            <div className={styles.wrapper}>
                <div className={styles.content}>
                    <img src={img} alt="image"/>
                    <h3 className={styles.title}>Что-то пошло не так!</h3>
                    <p onClick={this.reload} className={styles.btn}>
                        НА ГЛАВНУЮ
                    </p>
                </div>
            </div>
        )
    }
}

export default withRouter(Error400);



