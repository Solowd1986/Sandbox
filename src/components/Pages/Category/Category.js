import React, {Component} from "react";
import common from "~scss/common.module.scss";
import styles from "./category.module.scss";
import Layout from "~components/Core/Layout/Layout";
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";
import ProductPrice from "../../Core/ProductPrice/ProductPrice";
import OrderButton from "../../Core/OrderButton/OrderButton";
import actions from "../../../redux/actions";

class Category extends Component {

    // always on top of page, without smooth scroll
    componentDidMount() {
        window.scrollTo(0, 0)
    }

    isProductInCart = (products, id) => products.find(item => item.id === id);

    render() {
        const category = this.props.category.find(category => category.categoryAlias === this.props.match.params.type);

        return (
            <Layout>
                <div className={styles.sign_bg}>
                    <img
                        className={styles.sign_bg__img}
                        src={`${category.imgPrefix}/${category.categoryAlias}/${category.categoryTitleImg}`}
                        alt="Категории"/>
                    <h3 className={styles.sign_bg__title}>{category.categoryTitle}</h3>
                </div>

                <div className={styles.title__bg}>
                    <div className={common.wrapper}>
                        {/*<h3 className={styles.title}>{category.categoryTitle}</h3>*/}
                    </div>
                </div>
                <div className={`${common.wrapper} ${styles.list_wrapper}`}>
                    <ul className={styles.list}>
                        {Array.from(Array(3), (e, i) => {
                            return (
                                <React.Fragment key={i}>
                                    {category.productList.map(item => {
                                        return (
                                            <li key={item.id} className={styles.item}>
                                                <span className={
                                                    item.rest > 0
                                                        ? `${styles.tag}`
                                                        : `${styles.tag} ${styles.tag__not_in_stock}`}>
                                                    В наличии
                                                </span>

                                                <NavLink to={`/product/${category.categoryAlias}/${item.id}`} className={styles.list_link}>
                                                    <img
                                                        className={styles.img_centered}
                                                        src={`${category.imgPrefix}/${category.categoryAlias}/${item.imgPath}`}
                                                        //src="/img/categories/accessoires-categorie/oneplus_7t_silicone_red_380_380-crop.png"
                                                        alt="image"
                                                    />
                                                    <div className={styles.item_desc}>
                                                        <span>{item.title}</span>
                                                        {category.categoryAlias === "phones" && <span>Цвет: {item.color}</span>}
                                                    </div>
                                                </NavLink>

                                                <ProductPrice product={item} classList={{ main: `${styles.price}`, discount: `${styles.price__discount}` }}/>

                                                {
                                                    this.isProductInCart(this.props.cart.products, item.id)
                                                        ?
                                                        <OrderButton
                                                            product={item}
                                                            onClick={(evt) => this.props.onDeleteFromCart(evt, item.id)}>
                                                            Убрать из заказа
                                                        </OrderButton>
                                                        :
                                                        <OrderButton
                                                            product={item}
                                                            onClick={(evt) => this.props.onAddToCart(evt, item.id, category)}>
                                                            {item.rest === 0 ? "Нет в наличии" : "Добавить в заказ"}
                                                        </OrderButton>
                                                }




                                            </li>
                                        )
                                    })}
                                </React.Fragment>
                            )
                        })}
                    </ul>
                </div>
            </Layout>
        )
    }
}

const getState = (state) => {
    return {
        category: state.db.category,
        cart: state.cart
    }

};

function setDispatch(dispatch) {
    return {
        onAddToCart: (evt, id, category) => {
            dispatch(actions.cart.disableButton(evt));
            dispatch(actions.cart.addItemAsync(evt, id, category))
        },
        onDeleteFromCart: (evt, id) => {
            dispatch(actions.cart.disableButton(evt));
            dispatch(actions.cart.removeItemAsync(evt, id))
        },
    }
}


export default connect(getState, setDispatch)(Category);



