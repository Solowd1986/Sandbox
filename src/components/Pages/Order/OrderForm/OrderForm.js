import React, { Component } from "react";
import styles from "./order-form.module.scss";

import OrderInfo from "./OrderInfo/OrderInfo";
import OrderSummary from "./OrderSummary/OrderSummary";
import InputText from "@components/Other/Form/Input/Input";

import Confirm from "@components/Pages/Order/Confirm/Confirm";
import withDelay from "@components/Helpers/Hoc/withDelay/withDelay";
import withModal from "@components/Helpers/Hoc/withModal/withModal";

import { Formik } from "formik";
import IMask from 'imask';
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
            showed: false,
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


    // componentDidUpdate(prevProps, prevState) {
    //     if (this.state.isUserConfirmOrder) {
    //         this.setState(state => ({isUserConfirmOrder: false}) );
    //     }
    // }


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


    handleSubmit = (evt) => {
        evt.preventDefault();
        //console.log('st');
        //console.dir(this.form.current);
        if (this.state.isUserConfirmOrder) this.setState(state => ({ isUserConfirmOrder: false }));

        const fields = {};
        Array.from(this.form.current.elements).forEach(item => {
            if (Object.keys(this.state.fields).includes(item.name)) {
                fields[item.name] = item.value;
                yup.reach(val, item.name).validate(item.value).then((sucess) => this.validateSuccess(sucess, item.name)).catch((error) => this.validateError(error, item.name));
            }
        });


        //val.isValidSync();

        if (!val.isValidSync(fields)) return;


        console.log('all ok');

        //
        // const form = new FormData(this.form.current);
        // const formDataObject = {};
        // for (let [key, value] of form.entries()) {
        //     formDataObject[key] = value;
        //     //console.log(val.isValidSync({[key]: value}));
        // }


        evt.target.reset();
        this.setState({ isUserConfirmOrder: true });


        //
        // const form = new FormData(this.form.current);
        // const formDataObject = {};
        // for (let [key, value] of form.entries()) {
        //     formDataObject[key] = value;
        //     //console.log(val.isValidSync({[key]: value}));
        // }




        //console.log(val.isValidSync({name: "ыфвфыв"}));

        //console.log(formDataObject);


        // console.dir(Object.keys(formDataObject));
        //
        // const result = [];
        // this.props.listOfProducts.map(item => {
        //     if (Object.keys(formDataObject).includes(item.title)) result.push(item);
        // });
        //console.log(result);

        //console.dir(evt);


        //evt.target.reset();

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

    phone = target => {
        //console.log(target);
        const maskOptions = { mask: '+{7} (000) 000-00-00' };
        const mask = IMask(target, maskOptions);
    };


    validateSuccess = (success, inputName) => {
        this.setState(state => ({
            fields: {
                ...state.fields,
                [inputName]: {
                    touched: state.fields[inputName].touched,
                    error: false,
                    msg: ""
                }
            }
        }));

    };


    validateError = (error, inputName) => {
        //console.log(error);
        //console.log(inputName);

        if (error.message === this.state.fields[inputName].msg) return;


        this.setState(state => ({
            fields: {
                ...state.fields,
                [inputName]: {
                    touched: state.fields[inputName].touched,
                    error: true,
                    msg: error.message
                }
            }
        }));
    };


    phoneKey = (evt) => {
        console.dir(evt);
    };


    handleChange = (evt) => {
        const { target, target: { name: inputName, value: inputValue } } = evt;
        //console.dir(evt);
        if (this.state.isUserConfirmOrder) this.setState(state => ({ isUserConfirmOrder: false }));
        if (!Object.keys(this.state.fields).includes(inputName)) return;
        //console.log(inputValue);

        if (inputName === "phone") this.phone(target);

        //console.dir(evt);
        if (inputName === "phone") {


            //console.log(evt.target.value.length);

            //console.log(/^[0-9]+$/.test(evt.target.value));

            //if (!(/^[0-9]+$/.test(evt.target.value))) return;
            //if (evt.target.value.length === 6) evt.target.value += ") ";
            //if (evt.target.value.length === 11) evt.target.value += "-";
            //if (evt.target.value.length === 14) evt.target.value += "-";

        }


        yup.reach(val, inputName).validate(inputValue).then(s => {
            //console.log('suc', s);
            this.setState(state => ({
                fields: {
                    ...state.fields,
                    [inputName]: {
                        touched: state.fields[inputName].touched,
                        error: false,
                        msg: ""
                    }
                }
            }))
        }).catch(e => {
            //console.dir(e);
            if (e.message === this.state.fields[inputName].msg) return;


            //console.dir(e);
            //console.log('error', e.message);
            //return
            this.setState(state => ({
                fields: {
                    ...state.fields,
                    [inputName]: {
                        touched: state.fields[inputName].touched,
                        error: true,
                        msg: e.message
                    }
                }
            }));

        });
    };


    phoneFocus = (evt) => {
        evt.target.value = "+7(";
    };


    // handleFocus = ({ target: { name: inputName } }) => {
    //     if (!Object.keys(this.state.fields).includes(inputName)) return;
    //     //console.dir(evt.target.name);
    //     //return
    //     this.setState(state => ({
    //         fields: {
    //             ...state.fields,
    //             [inputName]: {
    //                 touched: true,
    //                 error: state.fields[inputName].error,
    //                 msg: state.fields[inputName].msg
    //             }
    //         }
    //     }));
    // };


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
                    onSubmit={this.handleSubmit}
                    className={styles.form}
                    name="order-form"
                    method="POST">
                    <OrderInfo
                        handleChange={this.handleChange}
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
