import React, {Component} from "react";
import styles from "./cart-modal.module.scss";

export default class CartModal extends Component {
    render() {
        return (
            <div className={styles.cart}>
                <span className={styles.close_modal}>&times</span>
                <h2 className={styles.cart__title}>Товар добавлен в корзину</h2>
                <div className={styles.shopping_list}>
                    <div className={styles.shopping_list__img_wrapper}>
                        <img className={styles.shopping_list__img} src="https://fakeimg.pl/100x79/282828/?text=IMG" alt="generic_img"/>
                    </div>
                    <div className={styles.shopping_list__items}>
                        <div>
                            <span className={styles.shopping_list__item_title}>Товар: </span>
                            <span className={styles.shopping_list__item_price}>OnePlus 8 Pro 8GB + 128GB</span>
                        </div>
                        <div>
                            <span className={styles.shopping_list__item_title}>Цена: </span>
                            <span className={styles.shopping_list__item_price}>62 990 р.</span>
                        </div>
                        <div>
                            <span className={styles.shopping_list__item_title}>Цвет: </span>
                            <span className={styles.shopping_list__item_price}>Ледяной зеленый</span>
                        </div>
                        <div>
                            <span className={styles.shopping_list__item_title}>Количество: </span>
                            <span className={styles.shopping_list__item_price}>1 шт.</span>
                        </div>
                    </div>
                </div>
                <div className={styles.cart__controls}>
                    <a className={styles.cart__btn_proceed} href="#">Продолжить покупки</a>
                    <a className={`btn ${styles.cart__btn_arrange}`} href="#">Оформить заказ</a>
                </div>
            </div>
        )
    }
}
