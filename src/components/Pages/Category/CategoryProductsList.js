import React, { Component } from "react";
import common from "~scss/common.module.scss";
import styles from "./category.module.scss";
import SortPorducts from "../../Core/SortProducts/SortProducts";
import LazyLoad from "../../Core/LazyLoad/LazyLoad";
import ProductCard from "../ProductCard/ProductCard";

export default class CategoryProductsList extends Component {
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

                <div className={`${common.wrapper} ${styles.filters_wrapper}`}>
                    <SortPorducts changeFilter={this.changeFilter}/>
                </div>

                <div className={`${common.wrapper} ${styles.list_wrapper}`}>
                    <LazyLoad categoryName={category.categoryAlias}>
                        <ul className={styles.list}>

                            {
                                products.map((item, i) => {
                                    return (<div key={i}>
                                        <ProductCard item={item} category={category}/>
                                    </div>)
                                })
                            }

                        </ul>
                    </LazyLoad>
                </div>
            </div>
        )
    }
}


