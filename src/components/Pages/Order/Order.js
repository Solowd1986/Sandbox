import React, { Component } from "react";
import common from "~scss/common.module.scss";
import styles from "./order.module.scss";
import OrderInfo from "./OrderInfo/OrderInfo";
import OrderSummary from "./OrderSummary/OrderSummary";
import { connect } from "react-redux";
import Modal from "../../Core/Modal/Modal";
import Confirm from "./Confirm/Confirm";
import { requestIndexData } from "../../../redux/middlware/requestToServer";
import * as modalActions from "../../../redux/entities/modal/actions";

import EmptyOrderPage from "./EmptyOrderPage/EmptyOrderPage";
import OrderForm from "./OrderForm/OrderForm";


class Order extends Component {

    componentDidMount() {
        window.scrollTo(0, 0) // always on top of page, without smooth scroll
    }

    render() {
        return this.props.amountOfProductsInCart > 0 ? <OrderForm/> : <EmptyOrderPage/>;
    }
}


function mapStateToProps(state) {
    return {
        amountOfProductsInCart: state.cart.amountOfProductsInCart,
    }
}

export default connect(mapStateToProps)(Order);
