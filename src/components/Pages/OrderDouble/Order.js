import React, { Component } from "react";

import styles from "@components/Pages/Order/order.module.scss";
import classNames from "classnames";

import EmptyOrderPage from "./EmptyOrderPage/EmptyOrderPage";
import OrderForm from "./OrderForm/OrderForm";

import { connect } from "react-redux";

class Order extends Component {
    render() {
        if (!this.props.amountOfProductsInCart) return <EmptyOrderPage/>;
        return (
            <div className={classNames("container", styles.container_checkout_bg)}>
                <div className={classNames("wrapper", styles.order)}>
                    <div className={styles.line}>
                        <span className={styles.line_stage}>Ваша корзина</span>
                        <span className={styles.line_stage}>Оплата и доставка</span>
                        <span className={classNames(styles.line_stage, styles.line_stage__unactive)}>
                            Успешное оформление
                        </span>
                    </div>
                    <OrderForm/>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        amountOfProductsInCart: state.cart.amountOfProductsInCart,
    }
}

export default connect(mapStateToProps)(Order);
