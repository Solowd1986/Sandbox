import React, { Component } from "react";
import styles from "./order-form.module.scss";

import OrderInfo from "./OrderInfo/OrderInfo";
import OrderSummary from "./OrderSummary/OrderSummary";
import InputText from "@components/Other/Form/Input/Input";

import Confirm from "@components/Pages/Order/Confirm/Confirm";
import withDelay from "@components/Helpers/Hoc/withDelay/withDelay";
import withModal from "@components/Helpers/Hoc/withModal/withModal";

import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from "yup";


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

        const validationSchema = yup.object().shape({
            name:
                yup.string().matches(/^\w+$/, "Логин должен состоять из латинницы и цифр").matches(/^[a-z]/, "Логин не должен начинаться с числа").min(4, "Логин должен включать не менее 4 символов").max(15, "Логин должен включать не более 15 символов").required("Данное поле обязательно"),
            email: yup.string().email("Введите корректный email").required("Данное поле обязательно"),
        });

        const rebr = (arr) => {
            const res = {};
            arr.forEach(item => {
                res[item.title] = item.qnt
            });
            return res;
        };

        return (
            <>
                {this.state.isUserConfirmOrder ? <ConfirmModalWindow/> : null}
                <Formik
                    initialValues={{ email: "sam@ya.ru", password: "1234", name: "", }}

                    //validationSchema={validationSchema}

                    // validate={values => {
                    //     const errors = {};
                    //     if (!values.email) {
                    //         errors.email = 'Email Is Required';
                    //     } else if (
                    //         !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                    //     ) {
                    //         errors.email = 'Invalid email address';
                    //     }
                    //     return errors;
                    // }}

                    onSubmit={(values, { setSubmitting }) => {
                        //console.log('loggg');

                        setTimeout(() => {
                            alert(JSON.stringify(values, null, 2));
                            setSubmitting(false);
                        }, 40);
                    }}
                >

                    {(formikProps) => (
                        <form
                            ref={this.form}
                            onSubmit={formikProps.handleSubmit}
                            className={styles.form}
                            name="order-form"
                            method="POST">
                            <OrderInfo formikProps={formikProps}/>
                            <OrderSummary formikProps={formikProps}/>
                        </form>

                    )}
                </Formik>
            </>
        )
    }
}

// {
//     values,
//         errors,
//         touched,
//         handleChange,
//         handleBlur,
//         handleSubmit,
//         isSubmitting,
//         isValid,
//         dirty
// }

export default OrderForm;
