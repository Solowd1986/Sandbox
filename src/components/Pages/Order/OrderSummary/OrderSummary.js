import React, {Component} from "react";
import styles from "./order-summary.module.scss";
import {connect} from "react-redux";
import actions from "../../../../redux/actions";

class OrderSummary extends Component {

    transitionalValueHandler = (evt, id) => {

        const temporary = [...this.state.transitionalValue];
        const currentProduct = temporary.find(item => item.id === id);
        console.log('curr', currentProduct);

        currentProduct.value = evt.target.value;
        temporary[temporary.indexOf(temporary.find(item => item.id === id))] = currentProduct;


        this.setState({
            transitionalValue: [...temporary]
        })


        // const temporary = [...this.state.temporary];
        // const currentProduct = {...this.state.temporary.find(item => item.id === id)};
        // currentProduct.quantity = evt.target.value;
        // temporary[temporary.indexOf(temporary.find(item => item.id === id))] = currentProduct;
        //
        // this.setState({
        //     temporary
        // })


        //this.props.onChangeAmountOfProduct(evt, id, value);
    };


    onBlurHandler = (evt, id) => {
        this.props.onChangeAmountOfProduct(evt, id, this.state.transitionalValue.find(item => item.id === id).value);
    };


    calcTotal = () => {
        return this.props.orderedItems.reduce((total, item) => {
            total += (item.price * item.quantity);
            return total;
        }, 0);
    };


    render() {
        //console.log(this.props);
        //console.log(this.state);
        return (
            <section className={styles.summary}>
                <h2 className={styles.caption}>Ваш заказ</h2>
                {this.props.orderedItems.map(item => {
                    return (
                        <div key={item.title} className={styles.item}>
                            <div className={styles.info}>
                                <img
                                    width={82} height={82} className={styles.img_sm}
                                    src={item.imgFullPath}
                                    alt={item.imgAlt}
                                />
                                <div className={styles.info_inner_wrapper}>
                                    <p className={styles.product_title}>
                                        <span>{item.title}</span>
                                        {item.color && <span>{item.color}</span>}
                                    </p>
                                    <div className={styles.counter_block}>
                                        <span onClick={(evt) => this.props.onChangeAmountOfProduct(evt, item.id, item.quantity - 1)}
                                              className={`${styles.counter} ${styles.counter_minus}`}/>

                                        {/*<label>*/}
                                        {/*    <input*/}
                                        {/*        type="text" name="customer-product-count"*/}
                                        {/*        onChange={this.changer}*/}
                                        {/*        value={item.quantity}*/}
                                        {/*    />*/}
                                        {/*</label>*/}


                                        <label>
                                            <input
                                                type="text" name="customer-product-count"
                                                onChange={(evt) => this.transitionalValueHandler(evt, item.id)}
                                                onBlur={(evt) => this.onBlurHandler(evt, item.id)}
                                                value={item.quantity}
                                            />
                                        </label>

                                        <span onClick={(evt) => this.props.onChangeAmountOfProduct(evt, item.id, item.quantity + 1)}
                                              className={`${styles.counter} ${styles.counter_plus}`}/>
                                    </div>
                                </div>
                                <span className={styles.price__sm}>{item.price * item.quantity} р.</span>
                                <div>
                                    <span className={styles.delete} onClick={(evt) => this.props.onDeleteProductFromCart(evt, item.id)}>&times;</span>
                                </div>
                            </div>
                        </div>
                    )
                })}


                <div className={styles.delivery_fieldset}>
                    <span className={styles.delivery_item}>Доставка по Москве:</span>
                    <span className={styles.delivery_item}>{this.calcTotal() > 100000 ? 0 : 400} р.</span>
                </div>

                <div className={styles.checkout}>
                    <span className={styles.delivery_item}>Итого:</span>
                    <span className={styles.price__lg}>{this.calcTotal() > 100000 ? this.calcTotal() : this.calcTotal() + 400} р.</span>
                </div>

                <button className={`btn ${styles.order_btn}`}>Оформить заказ</button>
            </section>

        )
    }
}


function getProps(state) {
    return {
        state
    }
}


function setDispatch(dispatch) {
    return {
        onDecreaseeProductsAmount: (evt, id) => {
            dispatch(actions.cart.decreaseeProductsAmount(evt, id));
        },
        onIncreaseProductsAmount: (evt, id) => {
            dispatch(actions.cart.increaseProductsAmount(evt, id))
        },
        onChangeAmountOfProduct: (evt, id, quantity) => {
            dispatch(actions.cart.changeAmountOfProduct(evt, id, quantity))
        },

        onDeleteProductFromCart: (evt, id) => {
            dispatch(actions.cart.removeItem(evt, id))
        },
    }
}


export default connect(getProps, setDispatch)(OrderSummary);