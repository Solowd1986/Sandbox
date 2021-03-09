import React, { Component } from "react";
import styles from "./order-summary.module.scss";

import OrderPrice from "@components/Pages/Order/OrderForm/OrderSummary/OrderPrice/OrderPrice";
import OrderItem from "@components/Pages/Order/OrderForm/OrderSummary/OrderItem/OrderItem";

import { connect } from "react-redux";

class OrderSummary extends Component {

    render() {
        const { listOfProducts, shippingPrice, formik: { isValid, dirty } } = this.props;
        return (
            <section className={styles.summary}>
                <h2 className={styles.caption}>Ваш заказ</h2>
                {listOfProducts.map(item => <OrderItem key={item.title} item={item}/>)}
                <OrderPrice listOfProducts={listOfProducts} shippingPrice={shippingPrice}/>
                <button type="submit" onClick={(evt) => evt.target.dataset.touched = true} disabled={!isValid} className={styles.order_btn}>
                    Оформить заказ
                </button>
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        listOfProducts: state.cart.products,
        shippingPrice: state.cart.shippingPrice
    }
}

export default connect(mapStateToProps)(OrderSummary);
