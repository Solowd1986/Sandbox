import React from "react";
import styles from "../Index/promo.module.scss";

const Price = (props) => {
    return (
        <span className={styles.promo_list__price}>
            {
                props.item.rest === 0 || !props.item.discount
                    ?
                    <>
                        {new Intl.NumberFormat().format(props.item.price)} р.
                    </>
                    :
                    <>
                        <span className={styles.promo_list__price__old}>{new Intl.NumberFormat().format(props.item.price)} р.</span>
                        {new Intl.NumberFormat().format(props.item.price - (props.item.price * 10 / 100))} р.
                    </>
            }
        </span>
    )

};

export default Price;
