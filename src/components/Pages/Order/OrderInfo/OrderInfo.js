import React, {Component} from "react";
import styles from "./order-info.module.scss";

export default class OrderInfo extends Component {
    render() {
        return (
            <section className={styles.info}>
                {/*Delivery*/}
                <div>
                    <h2 className={styles.order_title}>1. Доставка</h2>
                    <div className={styles.cards_wrapper}>
                        <div className={`${styles.card} ${styles.card__active}`}>
                            <div className={styles.card__info}>
                                <span> Доставка по Москве</span>
                                <span className={styles.card__pay}>бесплатно</span>
                            </div>
                            <div className={styles.card__extra}>сегодня</div>
                        </div>

                        <div className={styles.card}>
                            <div className={styles.card__info}>
                                <span>Самовывоз</span>
                                <span className={styles.card__pay}>бесплатно</span>
                            </div>
                            <div className={styles.card__extra}>Москва, Барклая 6, стр. 5, БЦ "Барклай Плаза" (м. Парк Победы)</div>
                        </div>

                        <div className={styles.card}>
                            <div className={styles.card__info}>
                                <span>Доставка по России</span>
                                <span className={styles.card__pay}>бесплатно</span>
                            </div>
                            <div className={styles.card__extra}>
                                <img src="img/other/basket-shipping.png" alt="shipping"/>
                            </div>
                        </div>
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
                        <div className={`${styles.card} ${styles.card__active}`}>
                            <p className={styles.card__info}>
                                <span className={styles.card__title}>Оплата наличными</span>
                            </p>
                        </div>
                        <div className={styles.card}>
                            <p className={styles.card__info}>
                                <span className={styles.card__title}>Электронными деньгами</span>
                                <span className={styles.card__pay}>бесплатно</span>
                            </p>
                            <span>
                                <img src="img/other/basket-epayment.png" alt="epayment"/>
                            </span>
                        </div>
                        <div className={styles.card}>
                            <p className={styles.card__info}>
                                <span className={styles.card__title}>Безналичный расчет (для юр. лиц)</span>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}


