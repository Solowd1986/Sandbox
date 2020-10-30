import React, {Component} from "react";
import styles from "./order-summary.module.scss";

export default class OrderSummary extends Component {
    render() {
        return (
            <div className="basket-summary">
                <h2 className="basket-summary__caption">Ваш заказ</h2>
                <div className="basket-summary__item">
                    <div className="basket-summary__info">
                        <img className="basket-summary__img-sm" src="assets/img/oneplus_7pro-basket.png" alt="image"/>
                        <div className="basket-summary__info-inner-wrapper">
                            <p className="basket-summary__product-title">Oneplus 7 Pro 12GB + 256GB (туманный синий)</p>
                        </div>
                        <span className="basket-summary__price--sm">44 000 р.</span>
                    </div>

                    <div className="basket-summary__counter-block">
                        <span className="basket-summary__counter basket-summary__counter-minus"/>
                        <label><input className="basket-summary__counter-value" type="text" name="customer-product-count" value="1"/></label>
                        <span className="basket-summary__counter basket-summary__counter-plus"/>
                    </div>
                </div>
                <div className="basket-summary__item">
                    <div className="basket-summary__info">
                        <img className="basket-summary__img-sm" src="assets/img/oneplus_8pro-basket.png" alt="image"/>
                        <div className="basket-summary__info-inner-wrapper">
                            <p className="basket-summary__product-title">Oneplus 8 Pro 12GB + 256GB (ледяной зеленый)</p>
                        </div>
                        <span className="basket-summary__price--sm">74 000 р.</span>
                    </div>
                    <div className="basket-summary__counter-block">
                        <span className="basket-summary__counter basket-summary__counter-minus"/>
                        <label><input className="basket-summary__counter-value" type="text" name="customer-product-count" value="1"/></label>
                        <span className="basket-summary__counter basket-summary__counter-plus"/>
                    </div>
                </div>

                <div className="basket-summary__delivery-block">
                    <div className="basket-summary__delivery-fieldset">
                        <span className="basket-summary__delivery-item">Сумма:</span>
                        <span className="basket-summary__delivery-item">44 000 р.</span>
                    </div>
                    <div className="basket-summary__delivery-fieldset">
                        <span className="basket-summary__delivery-item">Доставка по Москве:</span>
                        <span className="basket-summary__delivery-item">0 р.</span>
                    </div>
                </div>
                <div className="basket-summary__checkout">
                    <span className="basket-summary__delivery-item">Итого:</span>
                    <span className="basket-summary__price--lg">44 000 р.</span>
                </div>
                <button className="btn btn-basket-order">Оформить заказ</button>
            </div>

        )
    }
}


