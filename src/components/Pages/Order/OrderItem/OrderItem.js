import React, { Component } from "react";
import styles from "./order_item.module.scss"

import * as cart from "../../../../redux/entities/cart/actions";
import * as modal from "../../../../redux/entities/modal/actions";
import { connect } from "react-redux";


// пример метода для смены state нормальной
function changeState(id, property, value, storage) {
    const elem = storage.find(item => item.id === id);
    const list = [...storage];
    const cloneDeep = require('lodash.clonedeep');
    const tempElem = cloneDeep(elem);
    tempElem[property] = value;
    list[list.indexOf(elem)] = tempElem;
    return list;
}


const users1 = [
    { id: 1, name: "bob" },
    { id: 2, name: "glen" },
    { id: 3, name: "john" },
];

const users2 = changeState(2, "name", "stan", users1);
// console.dir(users1);
// console.dir(users2);
// console.log(users1[0] === users2[0]);
// console.log(users1[1] === users2[1]);
// console.log(users1[2] === users2[2]);


class OrderItem extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        item: this.props.item
    };

    onChangeInput = (evt) => {
        let quantity = Math.abs(parseInt(evt.target.value));
        if (isNaN(quantity)) return;

        this.setState(() => {
            return {
                item: { ...this.state.item, quantity }
            }
        })
    };

    onBlurInput = (evt) => {
        this.props.onChangeAmountOfProduct(evt, this.props.item.id, evt.target.value);
        this.blur = true;
        this.setState({
            item: { ...this.state.item, quantity: this.normalizeValue(evt.target.value) }
        });
    };


    changeAmount = (evt, id, quantity) => {
        this.props.onChangeAmountOfProduct(evt, id, quantity);
        this.setState({
            item: { ...this.state.item, quantity: this.normalizeValue(quantity) }
        })
    };

    deleteFromOrder = (evt) => {
        this.props.onDeleteProductFromCart(evt, this.props.item.id)
    };

    normalizeValue = (value) => {
        return Math.max(1, Math.min(this.props.item.rest, Math.abs(parseInt(value))));
    };

    render() {
        console.log(this.props);

        const { item, item: { img_alt: alt, img } } = this.props;

        const discount = item.discount ? item.price - (item.price * 10 / 100) : item.price;
        const price = new Intl.NumberFormat().format(discount * item.quantity) + " р.";
        //const color = item.color || item.specifications.color;
        const color = null;

        return (
            <div className={styles.info}>
                <img width={82} height={82} className={styles.img_sm} src={img.md} alt={alt}/>
                <div className={styles.info_inner_wrapper}>
                    <p className={styles.product_title}>
                        <span>{item.title}</span>
                        <span>({item.color || item.specifications.color})</span>
                    </p>

                    <div className={styles.counter_block}>

                        <span
                            onClick={(evt) => this.changeAmount(evt, item.id, item.quantity - 1)}
                            className={`${styles.counter} ${styles.counter_minus}`}
                        />

                        <label>
                            <input
                                type="text" name="customer-product-count"
                                onChange={this.onChangeInput}
                                onBlur={this.onBlurInput}
                                value={this.state.item.quantity}
                            />
                        </label>

                        <span
                            onClick={(evt) => this.changeAmount(evt, item.id, item.quantity + 1)}
                            className={`${styles.counter} ${styles.counter_plus}`}
                        />
                    </div>
                </div>
                <span className={styles.price__sm}>{price}</span>
                <span className={styles.delete} onClick={this.deleteFromOrder}>&times;</span>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onChangeAmountOfProduct: (evt, id, quantity) => {
            dispatch(cart.changeAmountOfProduct(evt, id, quantity))
        },
        onDeleteProductFromCart: (evt, id) => {
            dispatch(cart.removeItemFromCart(evt, id))
        }
    }
}


export default connect(null, mapDispatchToProps)(OrderItem);




