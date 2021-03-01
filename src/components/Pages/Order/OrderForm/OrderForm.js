import React, { Component } from "react";
import styles from "./order-form.module.scss";
import classNames from "classnames";

import OrderInfo from "../OrderInfo/OrderInfo";
import OrderSummary from "../OrderSummary/OrderSummary";

class OrderForm extends Component {
    constructor(props) {
        super(props);
        this.form = React.createRef();
        this.state = null;
    }

    componentDidMount() {
        this.setState({
            //shippingPrice:
        });
    }


    submit = (evt) => {
        //
        // if (!evt.currentTarget.checkValidity()) {
        //     for (const formElement of evt.currentTarget.elements) {
        //         if (formElement.nodeName === "INPUT" && formElement.type === "text" || formElement.type === "email") {
        //             if (!formElement.checkValidity()) {
        //                 for (const key in formElement.validity) {
        //                     if (formElement.validity[key] === true) {
        //                         //console.log(key);
        //                     }
        //                 }
        //             }
        //         }
        //
        //     }
        // }

        console.dir(this.form);
        const form = new FormData(this.form.current);
        const formDataObject = {};
        for (let [key, value] of form.entries()) {
            formDataObject[key] = value;
        }
        console.dir(formDataObject);

        evt.preventDefault();
    };

    render() {

        //  ВЫВЕДИ МОДАЛКУ ОПИРАЯСЬ НА ВВЕДЕННОЕ В ФОРМУ ИМЯ ИЛИ ВАРИАНТ С JOHN DOE

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

                    <form
                        ref={this.form}
                        onSubmit={this.submit}
                        className={styles.form}
                        action=""
                        name="order-form"
                        method="POST"
                        noValidate={true}>
                        <OrderInfo/>
                        <OrderSummary/>
                    </form>
                </div>
            </div>
        )
    }
}


export default OrderForm;
