import React, { Component } from "react";
import styles from "./order-info.module.scss";
import * as PropTypes from "prop-types";

import basketEpayment from "./img/basket-epayment.png";
import basketShipping from "./img/basket-shipping.png";

import * as cartActions from "@redux/entities/cart/actions";
import { connect } from "react-redux";

class OrderInfo extends Component {

    static propTypes = {
        formikProps: PropTypes.object
    };

    state = {
        shippingMethod: "moscow",
        paymentMethod: "cash"
    };

    handlerShipping = (evt) => {
        if (evt.target.name === "shippingMethod") this.props.changeShippingPrice(evt.target.value);
        this.props.formikProps.handleChange(evt);
        this.setState({ [evt.target.name]: evt.target.id });
    };

    render() {
        return (
            <section className={styles.info}>
                {/*Delivery*/}
                <div>
                    <h2 className={styles.order_title}>1. Доставка</h2>
                    <div className={styles.cards_wrapper}>
                        <input
                            checked={this.state.shippingMethod === "moscow"}
                            onChange={this.handlerShipping}
                            id="moscow"
                            type="radio"
                            name="shippingMethod"
                            value={400}
                            data-delivery={true}
                        />
                        <label htmlFor="moscow" className={styles.card}>
                            <div className={styles.card__info}>
                                <span> Доставка по Москве</span>
                                <span className={styles.card__pay}>400 р.</span>
                            </div>
                            <div className={styles.card__extra}>сегодня</div>
                        </label>

                        <input id="pickup"
                               checked={this.state.shippingMethod === "pickup"}
                               onChange={this.handlerShipping}
                               type="radio"
                               name="shippingMethod"
                               value={0}
                               data-delivery={true}
                        />
                        <label htmlFor="pickup" className={styles.card}>
                            <div className={styles.card__info}>
                                <span>Самовывоз</span>
                                <span className={styles.card__pay}>бесплатно</span>
                            </div>
                            <div className={styles.card__extra}>Москва, Барклая 6, стр. 5, БЦ "Барклай Плаза" (м. Парк Победы)</div>
                        </label>

                        <input id="russia"
                               checked={this.state.shippingMethod === "russia"}
                               onChange={this.handlerShipping}
                               type="radio"
                               name="shippingMethod"
                               value={450}
                               data-delivery={true}
                        />
                        <label htmlFor="russia" className={styles.card}>
                            <div className={styles.card__info}>
                                <span>Доставка по России</span>
                                <span className={styles.card__pay}>450 р.</span>
                            </div>
                            <div className={styles.card__extra}>
                                <img src={basketEpayment} alt="shipping"/>
                            </div>
                        </label>
                    </div>
                </div>

                {/*Customer*/}
                <div className={styles.customer}>
                    <h2 className={styles.order_title}>2. Покупатель</h2>
                    <div className={styles.form_user_data}>
                        <label className={styles.form__label}>
                            <input className={styles.form__input}
                                   name="customer-name"
                                   type="text"
                                   maxLength="255"
                                   minLength="3"
                                   autoComplete="on"
                                   placeholder="Имя"
                                // required
                            />
                        </label>

                        <label className={styles.form__label}>
                            <input className={styles.form__input}
                                   name="customer-phone"
                                   type="text"
                                   maxLength="255"
                                   minLength="3"
                                   autoComplete="on"
                                   placeholder="Телефон"
                                //required
                            />
                        </label>

                        <label className={styles.form__label}>
                            <input className={styles.form__input}
                                   name="email"
                                   type="email"
                                   maxLength="255"
                                   minLength="3"
                                   autoComplete="on"
                                   placeholder="Email"
                                //required
                            />
                        </label>

                        <label className={`${styles.form__label} ${styles.form__label__full_width}`}>
                            <input className={styles.form__input}
                                   name="customer-address"
                                   type="text"
                                   maxLength="255"
                                   minLength="3"
                                   autoComplete="on"
                                   placeholder="Адрес"
                                //required
                            />
                        </label>

                        <label className={`${styles.form__label} ${styles.form__label__full_width}`}>
                            <textarea className={styles.form__input}
                                      name="customer-comment"
                                      id="" cols="30"
                                      rows="10"
                                      placeholder="Комментарий"/>
                        </label>
                    </div>
                </div>

                {/*Checkout*/}
                <div>
                    <h2 className={styles.order_title}>3. Оплата</h2>
                    <div className={styles.cards_wrapper}>
                        <input
                            id="cash"
                            checked={this.state.paymentMethod === "cash"}
                            onChange={this.handlerShipping}
                            type="radio"
                            name="paymentMethod"
                            value="cash"
                            data-payment={true}
                        />
                        <label htmlFor={"cash"} className={`${styles.card}`}>
                            <div data-payment={true}>
                                <p className={styles.card__info}>
                                    <span className={styles.card__title}>Оплата наличными</span>
                                </p>
                            </div>
                        </label>

                        <input
                            id="emoney"
                            checked={this.state.paymentMethod === "emoney"}
                            onChange={this.handlerShipping}
                            type="radio"
                            name="paymentMethod"
                            value="emoney"
                            data-payment={true}
                        />
                        <label htmlFor={"emoney"} className={styles.card}>
                            <div>
                                <p className={styles.card__info}>
                                    <span className={styles.card__title}>Электронными деньгами</span>
                                </p>
                                <span>
                                <img src={basketShipping} alt="epayment"/>
                            </span>
                            </div>
                        </label>

                        <input
                            id="card"
                            checked={this.state.paymentMethod === "card"}
                            onChange={this.handlerShipping}
                            type="radio"
                            name="paymentMethod"
                            value="card"
                            data-payment={true}
                        />
                        <label htmlFor={"card"} className={styles.card}>
                            <div>
                                <p className={styles.card__info}>
                                    <span className={styles.card__title}>Безналичный расчет (для юр. лиц)</span>
                                </p>
                            </div>
                        </label>
                    </div>
                </div>
            </section>
        )
    }
}


function mapDispatchToProps(dispatch) {
    return {
        changeShippingPrice: (price) => {
            dispatch(cartActions.changeShippingPrice(price));
        },
    }
}

export default connect(null, mapDispatchToProps)(OrderInfo);

