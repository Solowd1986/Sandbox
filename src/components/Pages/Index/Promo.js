import React, {Component} from "react";
import common from "~scss/common.module.scss";
import styles from "./promo.module.scss";
import {NavLink} from "react-router-dom";
import ModalOverlay from "../../Core/ModalOverlay/ModalOverlay";

import {connect} from "react-redux";
import actions from "../../../redux/actions/index"

import OrderButton from "../../Core/OrderButton/OrderButton"
import ProductPrice from "../../Core/ProductPrice/ProductPrice";
import LazyLoad from "../../Core/LazyLoad/LazyLoad";
import OverlayComp from "../../Core/OverlayComp/OverlayComp";
import img from "../Order/OrderSummary/img/thankssir.png";

class Promo extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        modal: false
    };

    closeModal = () => {
        this.setState({ modal: false })
    };

    show = () => {
        this.setState({ modal: true });
        console.log(this.props);
    };

    btn = (i, data) => {
        console.log(i);
        console.log(data);
    };


    isProductInCart = (products, id) => products.find(item => item.id === id);


    getRandomProducts = (list, amount = 4) => {
        const result = [];
        while (result.length < 4) {
            const index = Math.trunc(Math.random() * list.length);
            !result.includes(list[index]) && result.push(list[index]);
        }
        if (!result.some(item => item.rest === 0) && list.some(item => item.rest === 0)) {
            const itemWithDiscount = list.find(item => item.rest === 0);
            const index = Math.trunc(Math.random() * result.length);
            result.splice(index, 1, itemWithDiscount);
        }
        return result;
    };


    render() {
        //console.log(this.props);
        const [phones, accessoires, gadgets] = this.props.db.category;
        return (
            <section className={`${common.container} ${styles.promo_wrapper}`}>
                <main className={`${common.wrapper} ${styles.promo}`}>

                    {/*{*/}
                    {/*    this.props.cart.modals.showCheckoutModal*/}
                    {/*    &&*/}
                    {/*    <OverlayComp*/}
                    {/*        toggleOverlay={this.props.toggleOverlay}*/}
                    {/*        orderIsProcessed={this.props.cart.orderIsProcessed}*/}
                    {/*        delay={false}*/}
                    {/*        coloredBg={true}>*/}

                    {/*        <div className={styles.go_cart_modal}>*/}
                    {/*            <NavLink to={`/order`}>*/}
                    {/*                <h3 onClick={this.goToCart}>Перейти в корзину</h3>*/}
                    {/*            </NavLink>*/}
                    {/*        </div>*/}
                    {/*    </OverlayComp>*/}
                    {/*}*/}



                    <h2 className={styles.promo_section_title}>Рекомендуем</h2>
                    <ul className={styles.promo_list}>
                        {/*ограничиваем вывод четырьмя элементами на странице promo*/}
                        {phones.productList.slice(0, 4).map((item, i) => {
                            return (
                                <li key={item.id} className={styles.promo_list__item}>
                                    <span className={
                                        item.rest > 0
                                            ? `${styles.promo_list__tag}`
                                            : `${styles.promo_list__tag} ${styles.promo_list__tag__not_in_stock}`}>
                                        В наличии
                                    </span>

                                    <NavLink to={`/product/${phones.categoryAlias}/${item.id}`} className={styles.promo_list__link}>
                                        <img
                                            className={styles.promo_list__img}
                                            // path from public folder
                                            src={`${phones.imgPrefix}/${phones.categoryAlias}/${item.imgPath.md}`}
                                            alt={item.imgAlt}
                                        />
                                    </NavLink>

                                    <div className={styles.promo_list__title}>
                                        <span>{item.title}</span>
                                        <span>({item.specifications.color})</span>
                                    </div>

                                    {item.rest > 0 && item.discount && <div className={styles.installment}>Рассрочка 0-0-12</div>}
                                    {item.rest > 0 && !item.discount && <div className={styles.most_endorsed}>Хит продаж</div>}
                                    {
                                        item.rest > 0 && (!item.discount || item.discount)
                                        &&
                                        <div className={styles.sim}>
                                            <span>SIM</span>
                                            в подарок</div>
                                    }


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
                                                onClick={(evt) => {
                                                    this.props.onAddToCart(evt, item.id, phones);

                                                }
                                                }>
                                                {item.rest === 0 ? "Нет в наличии" : "Добавить в заказ"}
                                            </OrderButton>
                                    }
                                </li>
                            )
                        })}
                    </ul>

                    <h2 className={styles.promo_section_title}>Популярные гаджеты</h2>

                    <ul className={styles.promo_list}>
                        {gadgets.productList.slice(0, 4).map((item, i) => {
                            return (
                                <li key={item.id} className={styles.promo_list__item}>
                                    <span className={
                                        item.rest > 0
                                            ? `${styles.promo_list__tag}`
                                            : `${styles.promo_list__tag} ${styles.promo_list__tag__not_in_stock}`}>
                                        В наличии
                                    </span>
                                    <NavLink to={`/product/${gadgets.categoryAlias}/${item.id}`} className={styles.promo_list__link}>
                                        <img
                                            className={styles.promo_list__img}
                                            // path from public folder
                                            src={`${gadgets.imgPrefix}/${gadgets.categoryAlias}/${item.imgPath.md}`}
                                            alt={item.imgAlt}/>
                                    </NavLink>
                                    <div className={styles.promo_list__title}>
                                        <span>{item.title}</span>
                                    </div>

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
                                                onClick={(evt) => this.props.onAddToCart(evt, item.id, gadgets)}>
                                                {item.rest === 0 ? "Нет в наличии" : "Добавить в заказ"}
                                            </OrderButton>
                                    }
                                </li>
                            )
                        })}
                    </ul>

                    <h2 className={styles.promo_section_title}>Аксессуары</h2>
                    <ul className={styles.promo_list}>
                        {accessoires.productList.slice(0, 4).map((item, i) => {
                            return (
                                <li key={item.id} className={styles.promo_list__item}>
                                    <span className={
                                        item.rest > 0
                                            ? `${styles.promo_list__tag}`
                                            : `${styles.promo_list__tag} ${styles.promo_list__tag__not_in_stock}`}>
                                        В наличии
                                    </span>
                                    <NavLink to={`/product/${accessoires.categoryAlias}/${item.id}`} className={styles.promo_list__link}>
                                        <img
                                            className={styles.promo_list__img}
                                            src={`${accessoires.imgPrefix}/${accessoires.categoryAlias}/${item.imgPath.md}`}
                                            alt={item.imgAlt}/>
                                    </NavLink>
                                    <div className={styles.promo_list__title}>
                                        <span>{item.title}</span>
                                    </div>

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
                                                onClick={(evt) => this.props.onAddToCart(evt, item.id, accessoires)}>
                                                {item.rest === 0 ? "Нет в наличии" : "Добавить в заказ"}
                                            </OrderButton>
                                    }
                                </li>
                            )
                        })}
                    </ul>
                </main>
            </section>
        )
    }
}


// wrap in obj give you double invoke
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
        toggleOverlay: () => {
            dispatch(actions.cart.toggleOverlay());
        },
    }
}


export default connect(getProps, setDispatch)(Promo);

