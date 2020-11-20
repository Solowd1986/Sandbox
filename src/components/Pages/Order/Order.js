import React, {Component} from "react";
import common from "~scss/common.module.scss";
import styles from "./order.module.scss";
import OrderInfo from "./OrderInfo/OrderInfo";
import OrderSummary from "./OrderSummary/OrderSummary";
import Layout from "~components/Core/Layout/Layout";
import {connect} from "react-redux";


class Order extends Component {

    // always on top of page, without smooth scroll
    componentDidMount() {
        window.scrollTo(0, 0)
    }

    /**
     * Опиши логику работы с залержаки от сервера, чтобы кнопки блокировались, нельзя было мультикликать
     */
    render() {
        //console.log('state', this.props);

        return (
            <Layout>
                {this.props.cart.amountOfProductsInCart > 0
                    ?
                    <div className={`${common.container} ${styles.container_checkout_bg}`}>
                        <div className={`${common.wrapper} ${styles.order}`}>
                            <div className={styles.line}>
                                <span className={styles.line_stage}>Ваша корзина</span>
                                <span className={styles.line_stage}>Оплата и доставка</span>
                                <span className={`${styles.line_stage} ${styles.line_stage__unactive}`}>Успешное оформление</span>
                            </div>
                            <form className={styles.form} action="" name="basket-form" method="POST">
                                <OrderInfo/>
                                <OrderSummary orderItems={this.props.cart.products}/>
                            </form>
                        </div>
                    </div>
                    :
                    <>
                        <div className={`${common.container}`}>
                            <div className={`${common.wrapper} ${styles.empty_order}`}>
                                <h1>Корзина покупок</h1>
                                <p>У вас нет товаров для заказа</p>
                            </div>
                        </div>
                    </>
                }

            </Layout>
        )
    }
}


function getProps(state) {
    return { ...state }
}


export default connect(getProps)(Order);
