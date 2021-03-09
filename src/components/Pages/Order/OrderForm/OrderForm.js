import React, { Component } from "react";
import styles from "./order-form.module.scss";

import OrderInfo from "./OrderInfo/OrderInfo";
import OrderSummary from "./OrderSummary/OrderSummary";
import InputText from "@components/Other/Form/Input/Input";

import Confirm from "@components/Pages/Order/Confirm/Confirm";
import withDelay from "@components/Helpers/Hoc/withDelay/withDelay";
import withModal from "@components/Helpers/Hoc/withModal/withModal";
import { ErrorMessage, Field, Form, Formik } from "formik";


const Basic = () => (
    <div>

        <h1>Sign Up</h1>
        <Formik
            initialValues={{ email: '', password: '' }}
            validate={values => {
                const errors = {};
                if (!values.email) {
                    errors.email = 'Required';
                } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                    errors.email = 'Invalid email address';
                }
                return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                }, 100);
            }}
        >
            {({ isSubmitting }) => (
                <Form className={styles.formik}>

                    <Field type="email" name="email"/>
                    <ErrorMessage name="email" component="div"/>
                    <Field type="password" name="password"/>
                    <ErrorMessage name="password" component="div"/>
                    <button type="submit" disabled={isSubmitting}>Submit</button>
                </Form>
            )}
        </Formik>

    </div>
);

class OrderForm extends Component {
    constructor(props) {
        super(props);
        this.form = React.createRef();
        this.state = { isUserConfirmOrder: false };
    }

    confirmOrder = (evt) => {
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

        evt.preventDefault();

        //return
        console.dir(this.form);
        const form = new FormData(this.form.current);
        const formDataObject = {};
        for (let [key, value] of form.entries()) {
            formDataObject[key] = value;
        }
        console.dir(formDataObject);
        this.setState({ isUserConfirmOrder: true });
    };



    render() {

        //  ВЫВЕДИ МОДАЛКУ ОПИРАЯСЬ НА ВВЕДЕННОЕ В ФОРМУ ИМЯ ИЛИ ВАРИАНТ С JOHN DOE

        const ConfirmModalWindow = withDelay(withModal(Confirm));
        return (
            <>
                {this.state.isUserConfirmOrder ? <ConfirmModalWindow/> : null}
                <Basic/>
                <form
                    ref={this.form}
                    onSubmit={this.confirmOrder}
                    className={styles.form}
                    name="order-form"
                    method="POST"
                    noValidate>
                    <OrderInfo/>
                    <OrderSummary/>
                </form>
            </>
        )
    }
}


export default OrderForm;
