import React, {Component} from "react";
import common from "~scss/common.module.scss";
import styles from "./product-card.module.scss";

import {connect} from "react-redux";
import {NavLink} from "react-router-dom";

import ProductPrice from "../../Core/ProductPrice/ProductPrice";
import OrderButton from "../../Core/OrderButton/OrderButton";
import PromoProductCard from "./PromoProductCard";

import actions from "../../../redux/actions";


class ProductCard extends Component {
    isProductInCart = (products, id) => products.find(item => item.id === id);

    render() {
        return (
            <li key={this.props.item.id} className={styles.item}>
                <span className={this.props.item.rest > 0 ? `${styles.tag}` : `${styles.tag} ${styles.tag__not_in_stock}`}>
                    В наличии
                </span>

                <NavLink to={`/product/${this.props.category.categoryAlias}/${this.props.item.id}`} className={styles.link}>
                    <img className={styles.img}
                        // path from public folder
                         src={`${this.props.category.imgPrefix}/${this.props.item.imgPath.md}`}
                         alt={this.props.item.imgAlt}
                    />
                </NavLink>

                <div className={styles.title}>
                    <span>{this.props.item.title}</span>
                    <span>{this.props.item.specifications && (this.props.item.specifications.color)}</span>
                </div>

                <PromoProductCard item={this.props.item} category={this.props.category}/>
                <ProductPrice product={this.props.item} classList={{ main: `${styles.price}`, discount: `${styles.price__discount}` }}/>

                {
                    this.isProductInCart(this.props.cart.products, this.props.item.id)
                        ?
                        <OrderButton
                            product={this.props.item}
                            onClick={(evt) => this.props.onDeleteFromCart(evt, this.props.item.id)}>
                            Убрать из заказа
                        </OrderButton>
                        :
                        <OrderButton
                            product={this.props.item}
                            onClick={(evt) => {
                                this.props.onAddToCart(evt, this.props.item.id, this.props.category);
                            }}>
                            {this.props.item.rest === 0 ? "Нет в наличии" : "Добавить в заказ"}
                        </OrderButton>
                }
            </li>
        )
    }
}


function getProps(state) {
    return {
        db: state.db,
        cart: state.cart
    }
}

function setDispatch(dispatch) {
    return {
        onAddToCart: (evt, id, category) => {
            dispatch(actions.cart.disableButton(evt));
            dispatch(actions.cart.addItemAsync(evt, id, category));
        },
        onDeleteFromCart: (evt, id) => {
            dispatch(actions.cart.disableButton(evt));
            dispatch(actions.cart.removeItemAsync(evt, id))
        },
    }
}

export default connect(getProps, setDispatch)(ProductCard);




