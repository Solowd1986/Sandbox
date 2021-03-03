import React, { Component } from "react";
import styles from "./order-summary.module.scss";

import Confirm from "@components/Pages/Order/Confirm/Confirm";
import OrderPrice from "@components/Pages/Order/OrderPrice/OrderPrice";
import OrderItem from "@components/Pages/Order/OrderItem/OrderItem";

import withDelay from "@components/Helpers/Hoc/withDelay/withDelay";
import withModal from "@components/Helpers/Hoc/withModal/withModal";

import { connect } from "react-redux";

class OrderSummary extends Component {
    state = {
        isUserConfirmedOrder: false
    };

    confirmOrder = () => {
        this.setState({ isUserConfirmedOrder: true });
    };

    render() {
        const { listOfProducts } = this.props;
        const ConfirmModalWindow = withDelay(withModal(Confirm));
        return (
            <section className={styles.summary}>
                {this.state.isUserConfirmedOrder ? <ConfirmModalWindow/> : null}
                <h2 className={styles.caption}>Ваш заказ</h2>
                {listOfProducts.map(item => <OrderItem key={item.title} item={item}/>)}
                <OrderPrice listOfProducts={listOfProducts}/>
                <button onClick={this.confirmOrder} className={`${styles.order_btn}`}>
                    Оформить заказ
                </button>
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        listOfProducts: state.cart.products
    }
}

export default connect(mapStateToProps)(OrderSummary);
