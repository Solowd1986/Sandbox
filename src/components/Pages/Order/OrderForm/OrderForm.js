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
import { connect } from "react-redux";


const val = yup.object().shape({
    name:
        yup.string().matches(/^[а-яА-Я]+$/, "Имя должно состоять из кириллицы").min(3, "Имя должно включать не менее 3 символов").max(15, "Имя должно включать не более 15 символов").required("Данное поле обязательно name"),
    phone:
        yup.string().min(18, "Телефон должен включать не менее 11 символов").max(18, "Телефон должен включать не более 11 символов").required("Данное поле обязательно phone"),
});



class OrderForm extends Component {
    constructor(props) {
        super(props);
        this.form = React.createRef();
        this.formSm = React.createRef();

        this.state = {
            isUserConfirmOrder: false,
            fields: {
                name: {
                    touched: false,
                    error: false,
                    msg: ""
                },
                phone: {
                    touched: false,
                    error: false,
                    msg: ""
                }
            }
        };
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


    handleSub = (evt) => {
        evt.preventDefault();


        const form = new FormData(this.form.current);
        const formDataObject = {};
        for (let [key, value] of form.entries()) {
            formDataObject[key] = value;
            //console.log(val.isValidSync({[key]: value}));
        }

        //console.log(val.isValidSync({name: "ыфвфыв"}));

        //console.log(formDataObject);


        console.dir(Object.keys(formDataObject));

        const result = [];
        this.props.listOfProducts.map(item => {
            if (Object.keys(formDataObject).includes(item.title)) result.push(item);
        });
        //console.log(result);

        //console.dir(evt);


        evt.target.reset();
    };


    // state = {
    //     fields: {
    //         name: {
    //             touched: false
    //         }
    //     }
    //
    // };

    submitForm = (evt) => {

    };

    handleChangeer = (evt) => {
        //console.dir(evt);
        if (!Object.keys(this.state.fields).includes(evt.target.name)) return;

        const value = evt.target.value;
        const title = evt.target.name;

        //console.log(title);


        yup.reach(val, title).validate(value).then(s => {
            console.log('suc', s);
            this.setState(state => ({
                fields: {
                    ...state.fields,
                    [evt.target.name]: {
                        touched: state.fields[evt.target.name].touched,
                        error: false,
                        msg: ""
                    }
                }
            }))
        }).catch(e => {
            //console.dir(e);
            if (e.message === this.state.fields[evt.target.name].msg) return;


            console.dir(e);
            console.log('error', e.message);
            //return
            this.setState(state => ({
                fields: {
                    ...state.fields,
                    [evt.target.name]: {
                        touched: state.fields[evt.target.name].touched,
                        error: true,
                        msg: e.message
                    }
                }
            }));

        });
    };


    handleFocus = (evt) => {
        if (!Object.keys(this.state.fields).includes(evt.target.name)) return;
        //console.dir(evt.target.name);
        //return
        this.setState(state => ({
            fields: {
                ...state.fields,
                [evt.target.name]: {
                    touched: true,
                    error: state.fields[evt.target.name].error,
                    msg: state.fields[evt.target.name].msg
                }
            }
        }));
    };



    render() {
        //console.log(this.props);

        const fields = {
            name: {
                touched: false,
                error: false,
                msg: ""
            }
        };

        //  ВЫВЕДИ МОДАЛКУ ОПИРАЯСЬ НА ВВЕДЕННОЕ В ФОРМУ ИМЯ ИЛИ ВАРИАНТ С JOHN DOE
        const ConfirmModalWindow = withDelay(withModal(Confirm));
        const validationSchema = yup.object().shape({
            name:
                yup.string().matches(/^[а-яА-Я]+$/, "Имя должно состоять из кириллицы").min(3, "Имя должно включать не менее 3 символов").max(15, "Имя должно включать не более 15 символов").required("Данное поле обязательно"),
            email:
                yup.string().email("Введите корректный email").required("Данное поле обязательно"),
            phone:
                yup.string().min(18, "Телефон должен включать не менее 11 символов").max(18, "Телефон должен включать не более 11 символов").required("Данное поле обязательно"),
            address:
                yup.string().matches(/^[а-яА-Яa-zA-Z0-9\.\:\-\,\s]+$/, "Введите корректный адрес").max(200, "Адрес должен включать не более 200 символов").required("Данное поле обязательно"),
            comment:
                yup.string().min(3, "Комментарий должен включать не менее 3 символов").max(300, "Комментарий должен включать не более 300 символов")
        });


        //validationSchema.validate({name: "авпуцк"}).then(res => console.log('res', res)).catch(res => console.log('resr -',res));

        const rebr = (arr) => {
            const res = {};
            arr.forEach(item => {
                res[item.title] = item.qnt
            });
            return res;
        };

        const listOfProducts = this.props.listOfProducts;
        //console.dir(listOfProducts);

        return (
            <>
                {this.state.isUserConfirmOrder ? <ConfirmModalWindow/> : null}
                <form
                    ref={this.form}
                    onSubmit={this.handleSub}
                    className={styles.form}
                    name="order-form"
                    method="POST">
                    <OrderInfo
                        handleChange={this.handleChangeer}
                        handleFocus={this.handleFocus}
                        fields={this.state.fields}
                    />
                    <OrderSummary/>
                </form>
            </>
        )
    }
}

function mapStateToProps(state) {
    return {
        listOfProducts: state.cart.products,
    }
}

export default connect(mapStateToProps)(OrderForm);
