import React, { Component } from "react";
import common from "~scss/common.module.scss";
import styles from "./order-button.module.scss";
import classNames from "classnames";
import { connect } from "react-redux";
import * as cart from "../../../redux/entities/cart/actions";
import cartIcon from "./img/cart";

class OrderButton extends Component {
    constructor(props) {
        super(props);
        this.delayAddingItem = null;
    }

    onClick = (evt, product, callback) => {
        evt.target.classList.add(styles.disabled);
        evt.target.disabled = true;
        this.delayAddingItem = setTimeout(() => {
            evt.target.classList.remove(styles.disabled);
            evt.target.disabled = false;
            callback(product);
        }, 1000)
    };


    componentWillUnmount() {
        clearTimeout(this.delayAddingItem);
    }

    isProductInCart = (cart, title, id) => {
        return cart.find(item => item.title === title && item.id === id);
    };


    render() {
        const { cart, product, product: { title, id, rest } } = this.props;

        const isProductInCart = this.isProductInCart(cart, title, id);

        const spinnerIcon = <span className={styles.loader}/>; //Спиннер появится при состоянии :disabled у кнопки
        const innerText = !rest ? "Нет в наличии" : !isProductInCart ? "Добавить в заказ" : "Убрать из заказа";

        const clickHandler = !isProductInCart
            ? (evt) => this.onClick(evt, product, this.props.onAddToCart)
            : (evt) => this.onClick(evt, product, this.props.onDeleteFromCart);

        const classList = classNames(common.btn, styles.order__btn, {
            [styles.btn_grey_bg]: isProductInCart || rest === 0,
            [this.props.classList]: this.props.classList,
        });

        return (
            <button className={classList} onClick={clickHandler} disabled={rest === 0}>
                {cartIcon}
                {spinnerIcon}
                {innerText}
            </button>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cart: state.cart.products
    }
};

function mapDispatchToProps(dispatch) {
    return {
        onAddToCart: (item) => {
            dispatch(cart.addItemToCart(item))
        },
        onDeleteFromCart: (item) => {
            dispatch(cart.removeItemFromCart(item))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderButton);











