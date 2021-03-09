import React, { Component } from "react";
import styles from "./order-form.module.scss";

import OrderInfo from "./OrderInfo/OrderInfo";
import OrderSummary from "./OrderSummary/OrderSummary";
import InputText from "@components/Other/Form/Input/Input";

import Confirm from "@components/Pages/Order/Confirm/Confirm";
import withDelay from "@components/Helpers/Hoc/withDelay/withDelay";
import withModal from "@components/Helpers/Hoc/withModal/withModal";

import { Formik } from "formik";
import * as yup from "yup";


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
            // login:
            //     yup.string().
            //     matches(/^\w+$/, "Логин должен состоять из латинницы и цифр").
            //     matches(/^[a-z]/, "Логин не должен начинаться с числа").
            //     min(4, "Логин должен включать не менее 4 символов").
            //     max(15, "Логин должен включать не более 15 символов").
            //     required("Данное поле обязательно"),
            name:
                yup.string().matches(/[а-яА-Я]+/, "Имя должно состоять из кириллицы").matches(/^[а-яА-Я]/, "Имя должно начинаться с буквы").min(3, "Имя должно включать не менее 3 символов").max(15, "Имя должно включать не более 15 символов").required("Данное поле обязательно"),
            email: yup.string().email("Введите корректный email").required("Данное поле обязательно"),
            phone:
                yup.string().min(18, "Телефон должен включать не менее 11 символов").max(18, "Телефон должен включать не более 11 символов").required("Данное поле обязательно"),
            address:
                yup.string().matches(/^[а-яА-Яa-zA-Z0-9\.\:\-\,\s]+$/, "Введите корректный адрес").max(200, "Адрес должен включать не более 200 символов").required("Данное поле обязательно"),
            comment:
                yup.string().min(3, "Комментарий должен включать не менее 3 символов").max(300, "Комментарий должен включать не более 300 символов")
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
                    initialValues={{ name: "", email: "", phone: "", address: "", comment: "" }}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                            alert(JSON.stringify(values, null, 2));
                            setSubmitting(false);
                        }, 40);
                    }}
                >
                    {(formik) => (
                        <form
                            ref={this.form}
                            onSubmit={formik.handleSubmit}
                            className={styles.form}
                            name="order-form"
                            method="POST">
                            <OrderInfo formik={formik}/>
                            <OrderSummary formik={formik}/>
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
