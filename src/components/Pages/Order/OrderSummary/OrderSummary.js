import React, {Component} from "react";
import styles from "./order-summary.module.scss";
import {connect} from "react-redux";
import actions from "../../../../redux/actions";

class OrderSummary extends Component {

    static defaultProps = {
        orderedItems: []
    };

    /**
     *
     * Проблема:
     * 1. Нам приходят пропсы, мы в цикле выводим блок товаров из них, количество их в корзине
     * 2. Клик на +/- вызывает метод смены общего стейта, что вызывает переририсовку тещкуего компонента и смену количествоа товара выбранного
     * 3. Если, пытаться создать локальный стейт, который будет держат ьв себе любое значение, даже неверное, до момента блюра
     * 4. После блюра, вызывается опять же, метод общего стора, который по id меняет количество или ничего не делает, если переданное количество
     * оказалось некорректным. На этом этапе опять же, меняется внешний сто ри все ок.
     * 5. Сложность в том, чтобы после блюра отразить изменения в поле потерявшем фокус. То есть, синхронизировать общий стейт
     * с локальным стейстом, который держит в себе значение до момента блюра и после. Нам нужно, после блюра, прийти с новыми данныи
     * и поменять локальынй стейт на них, что отразится на самом поел ввода. Само это поле, соответственно, тоже изначально опирается на стейт
     * 6. То есть, в общем, связь локального промежутого стейта, который принимает любые данные, со внешним стором, который данные после блюра
     * проверяем и использует или нет, после чего пропсы опять приходят и локальный стейт должен это как-то обработать.
     * Само поел ввода опирается на этот самый промежуточный стейт в плане value
     *
     *
     * */



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


    onBlurHandler = (evt, id, quantity) => {
        this.props.onChangeAmountOfProduct(evt, id, quantity);
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
                                                onBlur={(evt) => this.onBlurHandler(evt, item.id, evt.target.value)}
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