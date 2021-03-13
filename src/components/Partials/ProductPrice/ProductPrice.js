import React from "react";
import styles from "./product-price.module.scss";
import classNames from "classnames";

const ProductPrice = ({ product: { price, discount, rest }, classList = null }) => {
    let previousPrice = null;
    let finalPrice = null;

    let previousPriceClassList = classNames(styles.discount);
    let finalPriceClassList = classNames(styles.price);

    if (classList) {
        previousPriceClassList = classNames(styles.discount, classList.discount);
        finalPriceClassList = classNames(styles.price, classList.main);
    }

    if (rest === 0 || !discount) {
        finalPrice = new Intl.NumberFormat().format(price) + "р.";
    } else {
        previousPrice = <span className={previousPriceClassList}>{new Intl.NumberFormat().format(price)} р.</span>;
        finalPrice = new Intl.NumberFormat().format(price - (price * 10 / 100)) + "р.";
    }

    if (rest === 0) return null;
    return (
        <span className={finalPriceClassList}>
            {previousPrice}
            {finalPrice}
        </span>
    )
};


export default ProductPrice;









