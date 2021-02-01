import React from "react";
import styles from "./order_price.module.scss"

const OrderPrice = ({ listOfProducts }) => {

    const calcTotal = () => {
        return listOfProducts.reduce((total, item) => {
            total += (item.price * item.quantity);
            return total;
        }, 0);
    };

    return (
        <>
            <div className={styles.fieldset}>
                <span className={styles.item}>Доставка по Москве:</span>
                <span className={styles.item}>
                     {new Intl.NumberFormat().format(calcTotal() > 100000 ? 0 : 400)} р.</span>
            </div>

            <div className={styles.checkout}>
                <span className={styles.item}>Итого:</span>
                <span className={styles.lg}>
                        {new Intl.NumberFormat().format(calcTotal() > 100000
                            ? calcTotal()
                            : calcTotal() + 400)} р.
                </span>
            </div>
        </>
    )
};


export default OrderPrice;


