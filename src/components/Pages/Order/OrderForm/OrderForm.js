import React, { Component } from "react";
import styles from "./order-form.module.scss";
import update from 'immutability-helper';

import OrderInfo from "./OrderInfo/OrderInfo";
import OrderSummary from "./OrderSummary/OrderSummary";

import Confirm from "@components/Pages/Order/Confirm/Confirm";
import withDelay from "@components/Helpers/Hoc/withDelay/withDelay";
import withModal from "@components/Helpers/Hoc/withModal/withModal";

import setValidateSchema from "@components/Helpers/Validation/validateSchema/validateSchema"
import Inputmask from "inputmask";
import * as yup from "yup";


import { connect } from "react-redux";

class OrderForm extends Component {
    constructor(props) {
        super(props);
        this._confirmModalVisible = false;
        this.isFormTouched = false;
        this.form = React.createRef();
        this.validationSchema = setValidateSchema(["name", "phone", "email", "address", "comment"]);
        this.state = {
            isUserConfirmOrder: false,
            isFormValid: true,
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
                },
                email: {
                    touched: false,
                    error: false,
                    msg: ""
                },
                address: {
                    touched: false,
                    error: false,
                    msg: ""
                },
                comment: {
                    touched: false,
                    error: false,
                    msg: ""
                },
                shipping: "moscow",
                payment: "cash",
            }
        };
    }


    shouldComponentUpdate(nextProps, nextState) {
        // console.log(nextState.fields);
        // console.log(this.state.fields);
        // console.log('--------------');
        //console.log('should');
        //console.log('shw', this.isFormTouched );

        return this.isFormTouched && !this.state.isUserConfirmOrder;

    }

    componentDidUpdate(prevProps, prevState) {
        if (!this.isFormTouched && this.state.isUserConfirmOrder) {
            this.setState({ isUserConfirmOrder: false });
        }
    }


    checkFieldsErrors = () => {
        const verifyFields = Object.values(this.state.fields).filter(item => item.error !== undefined);
        if (!this.state.isFormValid && verifyFields.every(item => !item.error)) {
            this.setState({ isFormValid: true });
        }
    };

    handleSubmit = (evt) => {
        evt.preventDefault();
        const fields = {};
        Array.from(this.form.current.elements).forEach(item => {
            if (Object.keys(this.state.fields).includes(item.name)) {
                fields[item.name] = item.value;
                this.handleValidation(item.name, item.value);
            }
        });
        this.isFormTouched = true;


        if (!this.validationSchema.isValidSync(fields)) {
            this.setState({ isFormValid: false });
            return
        }

        const form = new FormData(this.form.current);
        const userOrderInfo = {
            userInfo: {},
            userOrder: []
        };

        for (const [key, value] of form.entries()) {
            //console.log(key);
            //console.log(value);
            (this.props.listOfProducts.some(item => item.title === key))
                ? userOrderInfo.userOrder.push(this.props.listOfProducts.find(item => item.title === key))
                : userOrderInfo.userInfo[key] = value
        }

        evt.target.reset();
        //alert(JSON.stringify(userOrderInfo, null, 2));
        //console.log('set shw');
        this.setState({ isUserConfirmOrder: true });
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

    handleChange = ({ target, target: { name: inputName, value: inputValue } }) => {
        this.isFormTouched = true;
        if (!Object.keys(this.state.fields).includes(inputName)) return;
        if (inputName === "phone") new Inputmask("+7 (999) 999-99-99").mask(target);
        if (inputName === "shipping") this.setState(state => ({ ...state, fields: { ...state.fields, shipping: inputValue } }));
        //if (inputName === "shipping") this.setState(state => update(state, {shipping: {$set: inputValue}}));
        if (inputName === "payment") this.setState(state => ({ ...state, fields: { ...state.fields, payment: inputValue } }));
        this.handleValidation(inputName, inputValue);
        this.checkFieldsErrors();
    };

    render() {
        //console.log('in render');

        //const ConfirmModalWindow = withDelay(withModal(Confirm));

        let ConfirmModalWindow = null;

        if (this.state.isUserConfirmOrder && this.isFormTouched) {
            //console.log('cond redy');
            ConfirmModalWindow = withDelay(withModal(Confirm));
            //console.log(ConfirmModalWindow);
            this.isFormTouched = false;
        }

        //{this.state.isUserConfirmOrder ? <ConfirmModalWindow/> : null}
        return (
            <>
                {ConfirmModalWindow ? <ConfirmModalWindow/> : null}
                <form
                    ref={this.form}
                    onSubmit={this.handleSubmit}
                    className={styles.form}
                    name="order-form"
                    method="POST">
                    <OrderInfo
                        handleChange={this.handleChange}
                        fields={this.state.fields}
                        shipping={this.state.fields.shipping}
                        payment={this.state.fields.payment}
                    />
                    <OrderSummary isFormValid={this.state.isFormValid} shipping={this.state.fields.shipping}/>
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
