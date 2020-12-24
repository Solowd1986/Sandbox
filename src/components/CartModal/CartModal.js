import React, {Component} from "react";
import styles from "./cart-modal.module.scss";
import img from "../Pages/Order/OrderSummary/img/thankssir.png";
import {NavLink} from "react-router-dom";
import actions from "../../redux/actions";
import {connect} from "react-redux";

class CartModal extends Component {
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
                <span className={styles.continue} onClick={this.props.disableOverlay}>Продолжить покупки</span>
            </div>
        )
    }
}

function setDispatch(dispatch) {
    return {
        disableOverlay: () => {
            dispatch(actions.cart.disableOverlay());
        },
    }
}

export default connect(null, setDispatch)(CartModal);
