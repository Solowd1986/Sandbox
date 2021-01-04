import React from "react";
import styles from "./sort-products.module.scss";

const SortPorducts = props => {
    return (
        <>

            <div className={styles.filters_list}>
                <span>Сортировать по </span>
                <button onClick={() => props.changeFilter("popularity")}>Популярности</button>
                <button onClick={() => props.changeFilter("priceHigh")}>Сначала дороже</button>
                <button onClick={() => props.changeFilter("priceLow")}>Сначала дешевле</button>
            </div>

            {/*<button onClick={() => props.changeFilter("popularity")} className={styles.sort_btn_default}>*/}
            {/*    По популярности*/}
            {/*    <svg*/}
            {/*        viewBox="0 0 12 12"*/}
            {/*        width={16}*/}
            {/*        height={16}*/}
            {/*        fill="none"*/}
            {/*        xmlns="http://www.w3.org/2000/svg">*/}
            {/*        <path*/}
            {/*            fillRule="evenodd"*/}
            {/*            clipRule="evenodd"*/}
            {/*            d="M5.22 8.024a1 1 0 001.56 0l1.92-2.4A1 1 0 007.92 4H4.08a1 1 0 00-.78 1.625l1.92 2.399z"*/}
            {/*            fill="currentColor"*/}
            {/*        />*/}
            {/*    </svg>*/}
            {/*</button>*/}

            {/*<ul className={styles.list}>*/}

            {/*    <li onClick={() => props.changeFilter("priceHigh")}>Сначала дорогие</li>*/}
            {/*    <li onClick={() => props.changeFilter("priceLow")}>Сначала дешевые</li>*/}
            {/*</ul>*/}

        </>

    )
};

export default SortPorducts;


