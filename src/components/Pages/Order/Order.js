import React, {Component} from "react";
import styles from "./order.module.scss";
import OrderInfo from "./OrderInfo/OrderInfo";
import OrderSummary from "./OrderSummary/OrderSummary";
import Layout from "~components/Core/Layout/Layout";


export default class Order extends Component {

    // always on top of page, without smooth scroll
    componentDidMount() {
        window.scrollTo({ top: 0 })
    }

    render() {
        return (
            <Layout>
                <div className={`container ${styles.container_checkout_bg}`}>
                    <div className={`wrapper ${styles.order}`}>
                        <div className={styles.line}>
                            <span className={styles.line_stage}>Ваша корзина</span>
                            <span className={styles.line_stage}>Оплата и доставка</span>
                            <span className={`${styles.line_stage} ${styles.line_stage__unactive}`}>Успешное оформление</span>
                        </div>

                        <form className={styles.form} action="" name="basket-form" method="POST">
                            <OrderInfo/>
                            <OrderSummary/>
                        </form>
                    </div>
                </div>
            </Layout>
        )
    }
}
