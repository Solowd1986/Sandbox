import React, { Component } from "react";
import styles from "./order-form.module.scss";

import OrderInfo from "./OrderInfo/OrderInfo";
import OrderSummary from "./OrderSummary/OrderSummary";
import InputText from "@components/Other/Form/Input/Input";

import Confirm from "@components/Pages/Order/Confirm/Confirm";
import withDelay from "@components/Helpers/Hoc/withDelay/withDelay";
import withModal from "@components/Helpers/Hoc/withModal/withModal";

import setValidateSchema from "@components/Helpers/Validation/validateSchema/validateSchema"
import * as yup from "yup";

import { connect } from "react-redux";

import Inputmask from "inputmask";


class OrderForm extends Component {
    constructor(props) {
        super(props);
        this.form = React.createRef();
        this.validationSchema = setValidateSchema(["name", "phone"]);

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


    handleSubmit = (evt) => {
        evt.preventDefault();
        //console.log('st');
        //console.dir(this.form.current);
        //if (this.state.isUserConfirmOrder) this.setState(state => ({ isUserConfirmOrder: false }));

        const fields = {};
        Array.from(this.form.current.elements).forEach(item => {
            if (Object.keys(this.state.fields).includes(item.name)) {
                fields[item.name] = item.value;
                this.handleValidation(item.name, item.value);
            }
        });


        if (!this.validationSchema.isValidSync(fields)) return;

        console.log('all ok');

        const list = this.props.listOfProducts;

        //console.log(list);


        // const formDataObject = {};
        // for (let [key, value] of form.entries()) {
        //     formDataObject[key] = value;
        // }


        const form = new FormData(this.form.current);
        const userOrderInfo = {
            userInfo: {},
            userOrder: []
        };

        for (const [key, value] of form.entries()) {
            (list.some(item => item.title === key))
                ? userOrderInfo.userOrder.push(list.find(item => item.title === key))
                : userOrderInfo.userInfo[key] = value;
        }


        console.log(userOrderInfo);


        return




        evt.target.reset();
        alert(JSON.stringify(formDataObject, null, 2))

        //this.setState({ isUserConfirmOrder: true });

    };


    //<editor-fold desc="handleValidation">
    handleValidation = (inputName, inputValue) => {
        if (!(inputName in this.validationSchema.fields)) return;
        yup.reach(this.validationSchema, inputName).validate(inputValue).then(success => {
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
        }).catch(error => {
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
        });
    };
    //</editor-fold>

    handleChange = (evt) => {
        const { target, target: { name: inputName, value: inputValue } } = evt;
        if (this.state.isUserConfirmOrder) this.setState(state => ({ isUserConfirmOrder: false }));
        if (!Object.keys(this.state.fields).includes(inputName)) return;
        if (inputName === "phone") new Inputmask("+7 (999) 999-99-99").mask(target);
        this.handleValidation(inputName, inputValue);
    };


    render() {

        const ConfirmModalWindow = withDelay(withModal(Confirm));
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
