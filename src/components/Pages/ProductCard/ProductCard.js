import React, {Component} from "react";
import common from "~scss/common.module.scss";
import styles from "./product-card.module.scss";

import {connect} from "react-redux";
import {NavLink} from "react-router-dom";

import ProductPrice from "../../Core/ProductPrice/ProductPrice";
import OrderButton from "../../Core/OrderButton/OrderButton";
import PromoProductCard from "./PromoProductCard";

import * as actions from "../../../redux/entities/cart/actions";


class ProductCard extends Component {

    isProductInCart = (products, id) => products.find(item => item.id === id);
    render() {
        const { cart, category, item, classList } = this.props;

        return (
            <li key={item.id} className={`${styles.item} ${classList ? classList : ''}`}>
                <span className={item.rest > 0 ? `${styles.tag}` : `${styles.tag} ${styles.tag__not_in_stock}`}>
                    В наличии
                </span>

                <NavLink to={`/product/${category.alias}/${item.id}`} className={styles.link}>
                    <img className={styles.img}
                        // path from public folder
                         src={item.img.md}
                        //src={`${category.imgPrefix}/${item.img.md}`}
                         alt={item.img_alt}
                    />
                </NavLink>

                <div className={styles.title}>
                    <span>{item.title}</span>
                    <span className={styles.color}>
                        {item.specifications && `"${(item.specifications.color)}"`}
                    </span>
                </div>

                <PromoProductCard item={item} category={category}/>
                <ProductPrice product={item}/>


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
                    this.isProductInCart(cart.products, item.id)
                        ?
                        <OrderButton
                            product={item}
                            onClick={(evt) => this.props.onDeleteFromCart(evt, item.id)}>
                            Убрать из заказа
                        </OrderButton>
                        :
                        <OrderButton
                            product={item}
                            onClick={(evt) => {
                                // данная связка методов используется только в компонентах Promo/Category. В Product - нет,
                                // модалка с корзиной не нужна
                                this.props.onAddToCart(evt, item);
                            }}>
                            {item.rest === 0 ? "Нет в наличии" : "Добавить в заказ"}
                        </OrderButton>
                }
            </li>
        )
    }
}


function mapStateToProps(state) {
    return {
        db: state.db,
        cart: state.cart
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onAddToCart: (evt, item) => {
            dispatch(actions.addItemToCart(evt, item))
        },
        onDeleteFromCart: (evt, id) => {
            dispatch(actions.removeItemFromCart(evt, id))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);




