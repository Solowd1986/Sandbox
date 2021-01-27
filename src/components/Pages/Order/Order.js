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

    submit = (evt) => {
        if (!evt.currentTarget.checkValidity()) {
            for (const formElement of evt.currentTarget.elements) {
                if (formElement.nodeName === "INPUT" && formElement.type === "text" || formElement.type === "email") {
                    if (!formElement.checkValidity()) {
                        for (const key in formElement.validity) {
                            if (formElement.validity[key] === true) {
                                //console.log(key);
                            }
                        }
                    }
                }

            }
        }
        evt.preventDefault();
    };


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

                            <form
                                onSubmit={this.submit}
                                className={styles.form}
                                action=""
                                name="basket-form"
                                method="POST"
                                noValidate={true}
                            >
                                <OrderInfo/>
                                <OrderSummary orderedItems={this.props.cart.products}/>
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


function mapStateToProps(state) {
    return { ...state }
}


export default connect(mapStateToProps)(Order);
