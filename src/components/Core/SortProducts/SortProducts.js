import React from "react";
import styles from "./sort-products.module.scss";

const SortPorducts = props => {
    return (
        <div className={styles.sort_wrapper}>
            <button className={styles.sort_btn_default}>
                По популярности
                <svg
                    viewBox="0 0 12 12"
                    width={16}
                    height={16}
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.22 8.024a1 1 0 001.56 0l1.92-2.4A1 1 0 007.92 4H4.08a1 1 0 00-.78 1.625l1.92 2.399z"
                        fill="currentColor"
                    />
                </svg>
            </button>

            <ul className={styles.list}>
                <li>
                    <button className={styles.sort_btn}>По новизне</button>
                </li>
                <li>
                    <button className={styles.sort_btn}>Сначала дорогие</button>
                </li>
                <li>
                    <button className={styles.sort_btn}>Сначала дешевые</button>
                </li>
            </ul>
        </div>

    )
};

export default SortPorducts;


