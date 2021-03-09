import React, { Component } from "react";
import styles from "./order_item.module.scss"

import * as cart from "@redux/entities/cart/actions";
import { connect } from "react-redux";


class OrderItem extends Component {
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

    deleteFromOrder = () => {
        this.props.onDeleteProductFromCart(this.props.item)
    };

    normalizeValue = (value) => {
        return Math.max(1, Math.min(this.props.item.rest, Math.abs(parseInt(value))));
    };

    render() {
        //console.log(this.props);

        const { item, item: { img_alt: alt, img } } = this.props;
        const discount = item.discount ? item.price - (item.price * 10 / 100) : item.price;
        const price = new Intl.NumberFormat().format(discount * item.quantity) + " р.";


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
        onDeleteProductFromCart: (item) => {
            dispatch(cart.removeItemFromCart(item))
        }
    }
}


export default connect(null, mapDispatchToProps)(OrderItem);




