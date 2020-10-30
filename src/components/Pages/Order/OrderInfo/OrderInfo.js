import React, {Component} from "react";
import styles from "./order-info.module.scss";

export default class OrderInfo extends Component {
    render() {
        return (
            <div className="basket-info">
                <section className="basket-delivery">
                    <h2 className="basket-order-title">1. Доставка</h2>
                    <div className="basket-cards-wrapper">
                        <div className="basket-card basket-card--active">
                            <div className="basket-card__info">
                                <span> Доставка по Москве</span>
                                <span className="basket-card__pay">бесплатно</span>
                            </div>
                            <div className="basket-card__extra">сегодня</div>
                        </div>

                        <div className="basket-card">
                            <div className="basket-card__info">
                                <span>Самовывоз</span>
                                <span className="basket-card__pay">бесплатно</span>
                            </div>
                            <div className="basket-card__extra">Москва, Барклая 6, стр. 5, БЦ "Барклай Плаза" (м. Парк Победы)</div>
                        </div>

                        <div className="basket-card">
                            <div className="basket-card__info">
                                <span>Доставка по России</span>
                                <span className="basket-card__pay">бесплатно</span>
                            </div>
                            <div className="basket-card__extra">
                                <img src="/src/assets/img/other/basket-shipping.png" alt="shipping"/>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="basket-customer">
                    <h2 className="basket-order-title">2. Покупатель</h2>
                    <div className="basket-form-user-data">

                        <label className="basket-form__label">
                            <input className="basket-form__input"
                                   name="customer-name"
                                   type="text"
                                   maxLength="255"
                                   minLength="3"
                                   autoComplete="on"
                                   placeholder="Имя"
                                   required/>
                        </label>

                        <label className="basket-form__label">
                            <input className="basket-form__input"
                                   name="customer-phone"
                                   type="text"
                                   maxLength="255"
                                   minLength="3"
                                   autoComplete="on"
                                   placeholder="Телефон"
                                   required/>
                        </label>

                        <label className="basket-form__label">
                            <input className="basket-form__input"
                                   name="customer-email"
                                   type="email"
                                   maxLength="255"
                                   minLength="3"
                                   autoComplete="on"
                                   placeholder="Email"
                                   required/>
                        </label>

                        <label className="basket-form__label basket-form__label--full-width">
                            <input
                                className="basket-form__input"
                                name="customer-address"
                                type="text"
                                maxLength="255"
                                minLength="3"
                                autoComplete="on"
                                placeholder="Адрес"
                                required/>
                        </label>

                        <label className="basket-form__label basket-form__label--full-width">
                                               <textarea
                                                   className="basket-form__input"
                                                   name="customer-comment"
                                                   id="" cols="30"
                                                   rows="10"
                                                   placeholder="Комментарий"/>
                        </label>
                    </div>
                </section>
                <section className="basket-checkout">
                    <h2 className="basket-order-title">3. Оплата</h2>
                    <div className="basket-cards-wrapper">
                        <div className="basket-card basket-card--active">
                            <p className="basket-card__info">
                                <span className="basket-card__title">Оплата наличными</span>
                            </p>
                        </div>
                        <div className="basket-card">
                            <p className="basket-card__info">
                                <span className="basket-card__title">Электронными деньгами</span>
                                <span className="basket-card__pay">бесплатно</span>
                            </p>
                            <span className="basket-card__epayment">
                                                    <img src="/src/assets/img/other/basket-epayment.png" alt="epayment"/>
                                                </span>
                        </div>
                        <div className="basket-card ">
                            <p className="basket-card__info">
                                <span className="basket-card__title">Безналичный расчет (для юр. лиц)</span>
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}


