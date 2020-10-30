import React, {Component} from "react";
import styles from "./confirm.module.scss";

export default class extends Component {
    render() {
        return (
            <div className={styles.modal_confirm}>
                <div className={styles.modal_confirm__wrapper}>
                    <h2>Ваш заказ оформлен!</h2>
                    <p>Наш менеджер свяжется с вами в ближайшее время.</p>
                    <a className={styles.confirm_order_redirect_link} href="/">Продолжить покупки</a>
                </div>
            </div>
        )
    }
}


