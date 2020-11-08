import React, {Component} from "react";
import styles from "./order-summary.module.scss";

export default class OrderSummary extends Component {
    render() {
        return (
            <section className={styles.summary}>
                <h2 className={styles.caption}>Ваш заказ</h2>
                <div className={styles.item}>
                    <div className={styles.info}>
                        <img className={styles.img_sm} src="img/oneplus_7pro-basket.png" alt="image"/>
                        <div className={styles.info_inner_wrapper}>
                            <p className={styles.product_title}>Oneplus 7 Pro 12GB + 256GB (туманный синий)</p>
                        </div>
                        <span className={styles.price__sm}>44 000 р.</span>
                    </div>

                    <div className={styles.counter_block}>
                        <span className={`${styles.counter} ${styles.counter_minus}`}/>
                        <label><input type="text" name="customer-product-count" defaultValue="1"/></label>
                        <span className={`${styles.counter} ${styles.counter_plus}`}/>
                    </div>
                </div>

                <div className={styles.item}>
                    <div className={styles.info}>
                        <img className={styles.img_sm} src="img/oneplus_8pro-basket.png" alt="image"/>
                        <div className={styles.info_inner_wrapper}>
                            <p className={styles.product_title}>Oneplus 8 Pro 12GB + 256GB (ледяной зеленый)</p>
                        </div>
                        <span className={styles.price__sm}>74 000 р.</span>
                    </div>

                    <div className={styles.counter_block}>
                        <span className={`${styles.counter} ${styles.counter_minus}`}/>
                        <label><input type="text" name="customer-product-count" defaultValue="1"/></label>
                        <span className={`${styles.counter} ${styles.counter_plus}`}/>
                    </div>
                </div>

                <div className={styles.delivery_fieldset}>
                    <span className={styles.delivery_item}>Сумма:</span>
                    <span className={styles.delivery_item}>44 000 р.</span>
                </div>
                <div className={styles.delivery_fieldset}>
                    <span className={styles.delivery_item}>Доставка по Москве:</span>
                    <span className={styles.delivery_item}>0 р.</span>
                </div>

                <div className={styles.checkout}>
                    <span className={styles.delivery_item}>Итого:</span>
                    <span className={styles.price__lg}>44 000 р.</span>
                </div>
                <button className={`btn ${styles.order_btn}`}>Оформить заказ</button>
            </section>

        )
    }
}


