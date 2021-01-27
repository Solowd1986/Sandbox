import React from "react";
import styles from "./sort-products.module.scss";

/**
 *                 Сортировать:
 по популярности

 по популярности

 по новинкам

 по возрастанию цены

 по убыванию цены

 по скидкам

 по отзывам

 с быстрой доставкой
 Товаров на странице:
 * @param props
 * @returns {*}
 * @constructor
 */
const SortPorducts = props => {
    return (
        <>
            <div>
                <span className={styles.sort_title}>Сортировать: </span>
                <span className={styles.sort_type}>по популярности
                    <svg
                        width={"9px"}
                        height={"9px"}
                        className={styles.sort_icon}
                        viewBox="0 0 451.847 451.847">
                        <path
                            d="M225.923 354.706c-8.098 0-16.195-3.092-22.369-9.263L9.27 151.157c-12.359-12.359-12.359-32.397 0-44.751 12.354-12.354 32.388-12.354 44.748 0l171.905 171.915 171.906-171.909c12.359-12.354 32.391-12.354 44.744 0 12.365 12.354 12.365 32.392 0 44.751L248.292 345.449c-6.177 6.172-14.274 9.257-22.369 9.257z"/>
                    </svg>
                </span>
            </div>

            {/*<div className={styles.filters_list}>*/}
            {/*    <span>Сортировать по </span>*/}
            {/*    <button onClick={() => props.changeFilter("popularity")}>Популярности</button>*/}
            {/*    <button onClick={() => props.changeFilter("priceHigh")}>Сначала дороже</button>*/}
            {/*    <button onClick={() => props.changeFilter("priceLow")}>Сначала дешевле</button>*/}
            {/*</div>*/}
        </>

    )
};

export default SortPorducts;


