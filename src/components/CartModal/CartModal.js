import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import actions from "../../redux/actions";
import styles from "./cart-modal.module.scss";

class CartModal extends Component {

    disableCartModal = () => {
        this.props.toggleOfferGoToCartBeenShown();
        this.props.disableOverlay();
    };

    render() {
        return (
            <div className={styles.cart}>
                <h3>Ваш заказ</h3>
                <ul>
                    {
                        this.props.products.map((item, i) => {
                            return (
                                <li key={i}>
                                    <img width={82} height={82} src={`${item.imgFullPath}`} alt="image-cart"/>
                                    <p>{item.title}</p>
                                    <span>{new Intl.NumberFormat().format(item.price)} р.</span>
                                </li>
                            )
                        })
                    }
                </ul>
                <NavLink className={styles.link} to={"/order"}>Перейти в корзину</NavLink>
                <span className={styles.continue} onClick={this.disableCartModal}>Продолжить покупки</span>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        disableOverlay: () => {
            dispatch(actions.cart.disableOverlay());
        },
        toggleOfferGoToCartBeenShown: () => {
            dispatch(actions.cart.toggleOfferGoToCartBeenShown());
        },
    }
}

export default connect(null, mapDispatchToProps)(CartModal);
