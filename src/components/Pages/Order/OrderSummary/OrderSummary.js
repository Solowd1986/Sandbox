import React, { Component } from "react";
import styles from "./order-summary.module.scss";

import { connect } from "react-redux";
import * as modalActions from "../../../../redux/entities/modal/actions";

import Modal from "../../../Partials/Modal/Modal";
import OrderPrice from "../OrderPrice/OrderPrice";
import OrderItem from "../OrderItem/OrderItem";
import Confirm from "../Confirm/Confirm";

class OrderSummary extends Component {

    confirmOrder = () => {
        this.props.enableModal();
    };

    render() {
        const { isModalActive, listOfProducts } = this.props;
        const confirmOrderModal = isModalActive ? <Modal delay={true}><Confirm/></Modal> : null;

        return (
            <section className={styles.summary}>
                {confirmOrderModal}
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
        isModalActive: state.modal.isModalActive,
        listOfProducts: state.cart.products
    }
}

function mapDispatchToProps(dispatch) {
    return {
        enableModal: () => {
            dispatch(modalActions.enableModal());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderSummary);
