import React, { Component } from "react";
import EmptyOrderPage from "./EmptyOrderPage/EmptyOrderPage";
import OrderForm from "./OrderForm/OrderForm";
import { connect } from "react-redux";

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
