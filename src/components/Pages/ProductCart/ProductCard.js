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
            <li key={this.props.item.id} className={`animate__animated animate__fadeIn ${styles.item}`}>
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

                {/*
                    Вид кнопки зависит от isProductInCart: если такой товар есть - то можно убрать. Иначе - добавить.
                    Передаваемый в компонент текст кнопки (props.children) зависит от количества товара: "Нет в наличии"/"Добавить в заказ"
                    Если же товар уже в корзине, то текст один: "Убрать"
                    При клике выполняется метод onAddToCart. Он состоит из двух action: disableButton и addItemAsync
                    Суть такова:
                    1. При клике на кнопку в cart ставится buttonsDisabled = true и кнопки зависящие от этого - отключаются
                    2. Это можно увидеть в блоке OrderButton - атрибут disabled (не путать с data-disabled) зависит от:
                       состояния buttonsDisabled, от остатка товара - чтоб нельзя добавить в корзину, если товара нет, или
                       просто от передачи disabled={true} конкретному компоненту кнопки.
                    3. Также, нужно дать кнопке класс визуализирующий ее отключение и визуализацию запроса к серверу.
                    4. Имя этого класса передается в атрибуте data-disabled. В action disableButton этот класс добавляется
                    5. Кому добавлять понятно из evt - обращаемся к evt.target, так класс получит только кнопка, по которой был клик
                    6. Этот процесс продолжается, пока buttonsDisabled не перейдет в false, это происходит в функции addItem
                    7. Эта функция вызывается не сразу, через 1 секунду, для имитации запроса, она обернута в addItemAsync для этого
                    8. Когда секунда проходит, в числе прочего buttonsDisabled переводится в false, и важно: в addItem удаляется
                       класс из атрибута data-disabled, чтобы пропал спиннер и стили "ожидания овтета от сервера".
                */}
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
                                this.props.enableOverlay();
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
        enableOverlay: () => {
            dispatch(actions.cart.enableOverlay());
        },
    }
}

export default connect(getProps, setDispatch)(ProductCard);




