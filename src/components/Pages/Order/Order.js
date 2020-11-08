import React, {Component} from "react";
import styles from "./order.module.scss";
import OrderInfo from "./OrderInfo/OrderInfo";
import OrderSummary from "./OrderSummary/OrderSummary";
import Layout from "~components/Core/Layout/Layout";
import MainPage from "../Index/MainPage";


export default class Order extends Component {

    confirm = () => {
        //this.setState({showModal: false});
        console.log(this.props);
        this.props.history.push("/category/phones");
    };

    render() {
        return (
            <Layout>
                <button onClick={this.confirm}>GO</button>
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
