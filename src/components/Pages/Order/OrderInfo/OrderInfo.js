import React, { Component } from "react";
import styles from "./order-info.module.scss";

import basketEpayment from "./img/basket-epayment.png";
import basketShipping from "./img/basket-shipping.png";


import ReactDOM from 'react-dom';
import { Formik, Field, Form } from 'formik';


const Basic = () => (
    <div>

        <h1>Sign Up</h1>
        <Formik
            initialValues={{
                picked: "",
            }}
            onSubmit={async (values) => {
                await new Promise((r) => setTimeout(r, 500));
                alert(JSON.stringify(values, null, 2));
            }}>

            {
                ({ values }) => (
                    <Form>
                        <div id="my-radio-group">Picked</div>
                        <div role="group" aria-labelledby="my-radio-group">

                            <div className={styles.cards_wrapper}>
                                <Field id={"moscow"} type="radio" name="shipping" value="moscow"/>
                                <label htmlFor="moscow" className={styles.card}>
                                    <div className={styles.card__info}>
                                        <span> Доставка по Москве</span>
                                        <span className={styles.card__pay}>400 р.</span>
                                    </div>
                                    <div className={styles.card__extra}>сегодня</div>
                                </label>

                                <Field id={"pickup"} type="radio" name="shipping" value="pickup"/>
                                <label htmlFor="pickup" className={styles.card}>
                                    <div className={styles.card__info}>
                                        <span>Самовывоз</span>
                                        <span className={styles.card__pay}>бесплатно</span>
                                    </div>
                                    <div className={styles.card__extra}>Москва, Барклая 6, стр. 5, БЦ "Барклай Плаза" (м. Парк Победы)</div>
                                </label>

                                <Field id={"russia"} type="radio" name="shipping" value="russia"/>
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

                            <label>
                                <Field type="radio" name="picked" value="One"/>
                                One
                            </label>

                            <label>
                                <Field type="radio" name="picked" value="Two"/>
                                Two
                            </label>
                            <div>Picked: {values.picked}</div>
                        </div>

                        <button onSubmit={onSubmit} type="submit">Submit</button>
                    </Form>
                )}
        </Formik>
    </div>
);


export default class OrderInfo extends Component {

    show = (evt) => {
        //console.log(evt.target.value);
    };
    render() {
        return (
            <section className={styles.info}>

                {/*<Basic/>*/}

                {/*Delivery*/}
                <div>
                    <h2 className={styles.order_title}>1. Доставка</h2>
                    <div className={styles.cards_wrapper}>

                        {/*checked={true} */}

                        <input onChange={this.show} checked id={"moscow"} type="radio" name={"shipping"} value={400} data-delivery={true}/>
                        <label htmlFor="moscow" className={styles.card}>
                            <div className={styles.card__info}>
                                <span> Доставка по Москве</span>
                                <span className={styles.card__pay}>400 р.</span>
                            </div>
                            <div className={styles.card__extra}>сегодня</div>
                        </label>

                        <input id={"pickup"} type="radio" name={"shipping"} value={0} data-delivery={true}/>
                        <label htmlFor="pickup" className={styles.card}>
                            <div className={styles.card__info}>
                                <span>Самовывоз</span>
                                <span className={styles.card__pay}>бесплатно</span>
                            </div>
                            <div className={styles.card__extra}>Москва, Барклая 6, стр. 5, БЦ "Барклай Плаза" (м. Парк Победы)</div>
                        </label>

                        <input id={"russia"} type="radio" name={"shipping"} value={450} data-delivery={true}/>
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
                                   required/>
                        </label>

                        <label className={styles.form__label}>
                            <input className={styles.form__input}
                                   name="customer-phone"
                                   type="text"
                                   maxLength="255"
                                   minLength="3"
                                   autoComplete="on"
                                   placeholder="Телефон"
                                   required/>
                        </label>

                        <label className={styles.form__label}>
                            <input className={styles.form__input}
                                   name="customer-email"
                                   type="email"
                                   maxLength="255"
                                   minLength="3"
                                   autoComplete="on"
                                   placeholder="Email"
                                   required/>
                        </label>

                        <label className={`${styles.form__label} ${styles.form__label__full_width}`}>
                            <input className={styles.form__input}
                                   name="customer-address"
                                   type="text"
                                   maxLength="255"
                                   minLength="3"
                                   autoComplete="on"
                                   placeholder="Адрес"
                                   required/>
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
                        <input id={"cash"} type="radio" name={"payment"} value={"cash"} data-payment={true}/>
                        <label htmlFor={"cash"} className={`${styles.card}`}>
                            <div data-payment={true}>
                                <p className={styles.card__info}>
                                    <span className={styles.card__title}>Оплата наличными</span>
                                </p>
                            </div>
                        </label>

                        <input id={"emoney"} type="radio" name={"payment"} value={"emoney"} data-payment={true}/>
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

                        <input id={"card"} type="radio" name={"payment"} value={"card"} data-payment={true}/>
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


