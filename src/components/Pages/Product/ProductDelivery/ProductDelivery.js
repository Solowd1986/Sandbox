import React from "react";
import styles from "./delivery.module.scss";

const ProductDelivery = props => {
    return (
        <>
            {/*Блок доставки*/}
            <div className={`${styles.delivery_rules} ${styles.tab}`} id="tab-delivery">

                <h2 className={styles.delivery_rules__shipping_title}>Доставка</h2>
                <h3 className={styles.delivery_rules__shipping_city}>Доставка по Москве</h3>
                <p className={styles.delivery_rules__shipping_conditions}>Самовывоз из магазина - сегодня, м. Парк Победы</p>
                <h3 className={styles.delivery_rules__shipping_country}>Доставка по России</h3>
                <p className={styles.delivery_rules__shipping_conditions}>Доставка транспортными компаниями: СДЭК, PickPoint, Boxberry, 390 р.</p>

                <h2 className={styles.delivery_rules__payment_title}>Оплата</h2>
                <p className={styles.delivery_rules__payment_options}>Наличными</p>
                <p className={styles.delivery_rules__payment_options}>Банковской картой</p>
                <p className={styles.delivery_rules__payment_options}>WebMoney, Яндекс.Деньги, QIWI</p>

                <h2 className={styles.delivery_rules__shipping_title}>Доставка</h2>
                <h3 className={styles.delivery_rules__shipping_city}>Доставка по Москве</h3>
                <p className={styles.delivery_rules__shipping_conditions}>Самовывоз из магазина - сегодня, м. Парк Победы</p>
                <h3 className={styles.delivery_rules__shipping_country}>Доставка по России</h3>
                <p className={styles.delivery_rules__shipping_conditions}>Доставка транспортными компаниями: СДЭК, PickPoint, Boxberry, 390 р.</p>

                <h2 className={styles.delivery_rules__payment_title}>Оплата</h2>
                <p className={styles.delivery_rules__payment_options}>Наличными</p>
                <p className={styles.delivery_rules__payment_options}>Банковской картой</p>
                <p className={styles.delivery_rules__payment_options}>WebMoney, Яндекс.Деньги, QIWI</p>
            </div>

        </>
    )
};

export default ProductDelivery;


