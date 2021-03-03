import React, { Component } from "react";
import styles from "./confirm.module.scss";
import img from "./img/thanks_sir.png";

class Confirm extends Component {
    render() {
        return (
            <div className={styles.checkout_modal}>
                <img src={img} alt="image-checkout"/>
                <h3>Спасибо за заказ</h3>
                <p>Наш менеджер свяжется с вами в ближайшее время</p>
            </div>
        )
    }
}

export default Confirm;

