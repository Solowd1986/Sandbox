import React from "react";
import styles from "./empty-order-page.module.scss"
import classNames from "classnames";

const EmptyOrderPage = (props) => {
    return (
        <div className={classNames("wrapper")}>
            <div className={classNames(styles.empty_order)}>
                <h1>Корзина покупок</h1>
                <p>У вас нет товаров для заказа</p>
            </div>
        </div>
    )
};

export default EmptyOrderPage;


