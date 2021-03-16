import React, { Component } from "react";

import styles from "./category-products-list.module.scss";
import classNames from "classnames";

import SortPorducts from "@components/Other/SortProducts/SortProducts";
import LazyLoad from "@components/Other/LazyLoad/LazyLoad";
import ProductCard from "@components/Partials/ProductCard/ProductCard";


class CategoryProductsList extends Component {
    render() {
        const { category, products } = this.props;

        return (
            <div className={styles.category_wrapper}>
                <div className={styles.sign_bg}>
                    <img
                        className={`${styles.sign_bg__img} ${category.alias === "gadgets" && styles.img_fit}`}
                        src={category.img.path}
                        alt={category.img.alt}/>
                    <h3 className={styles.sign_bg__title}>{category.title}</h3>
                </div>
                <div className={classNames("wrapper", styles.filters_wrapper)}>
                    <SortPorducts/>
                </div>
                <div className={classNames("wrapper", styles.list_wrapper)}>
                    <LazyLoad categoryName={category.alias}>
                        <ul className={styles.list}>
                            {products.map((item, i) => <ProductCard key={i} item={item} category={category}/>)}
                        </ul>
                    </LazyLoad>
                </div>
            </div>
        )
    }
}

export default CategoryProductsList;







