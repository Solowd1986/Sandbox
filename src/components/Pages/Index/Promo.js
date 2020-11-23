import React, {Component} from "react";
import common from "~scss/common.module.scss";
import styles from "./promo.module.scss";
import {NavLink} from "react-router-dom";
import ModalOverlay from "../../Core/ModalOverlay/ModalOverlay";

import {connect} from "react-redux";
import actions from "../../../redux/actions/index"


import OrderButton from "../../Core/OrderButton/OrderButton"


class Promo extends Component {


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

    render() {

        //console.log(this.props);
        const [phones, accessoires, gadgets] = this.props.db.category;

        return (
            <section className={`${common.container} ${styles.promo_wrapper}`}>
                <main className={`${common.wrapper} ${styles.promo}`}>


                    {/*modal*/}
                    <button style={{ padding: "10px" }} onClick={this.show}>show</button>
                    {
                        this.state.modal && <ModalOverlay mod={true} setModalStatus={this.closeModal}>
                            <div style={{ backgroundColor: "grey", height: "200px" }}>
                            <NavLink to={"/order"} style={{ backgroundColor: "red", padding: "10px" }}>Order</NavLink>
                        </div>
                        </ModalOverlay>
                    }


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

                                    <NavLink to={`/product/phones/${item.id}`} className={styles.promo_list__link}>
                                        <img
                                            className={styles.promo_list__img}
                                            // path from public folder
                                            src={`${phones.imgPrefix}/${phones.categoryAlias}/${item.imgPath}`}
                                            alt={item.imgAlt}
                                        />
                                    </NavLink>

                                    <div className={styles.promo_list__title}>
                                        <span>{item.title}</span>
                                        <span>({item.color})</span>
                                    </div>

                                    <span className={styles.promo_list__price}>
                                        {
                                            item.rest === 0 || !item.discount
                                                ?
                                                <>
                                                    {new Intl.NumberFormat().format(item.price)} р.
                                                </>
                                                :
                                                <>
                                                    <span className={styles.promo_list__price__old}>{new Intl.NumberFormat().format(item.price)} р.</span>
                                                    {new Intl.NumberFormat().format(item.price - (item.price * 10 / 100))} р.
                                                </>
                                        }
                                    </span>


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
                                                onClick={(evt) => this.props.onAddToCart(evt, item.id, phones)}>
                                                {item.rest === 0 ? "Нет в наличии" : "Добавить в заказ"}
                                            </OrderButton>
                                    }
                                </li>
                            )
                        })}
                    </ul>

                    <h2 className={styles.promo_section_title}>Популярные гаджеты</h2>

                    <ul className={styles.promo_list}>
                        {gadgets.productList.map((item) => {
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
                                            src={`${gadgets.imgPrefix}/${gadgets.categoryAlias}/${item.imgPath}`}
                                            alt={item.imgAlt}/>
                                    </NavLink>
                                    <div className={styles.promo_list__title}>
                                        <span>{item.title}</span>
                                    </div>
                                    <span className={styles.promo_list__price}>
                                        {item.discount && <span className={styles.promo_list__price__old}>{item.price} р.</span>}
                                        {item.discount ? item.price - 4000 : item.price} р.
                                    </span>
                                    <button onClick={() => this.props.onAddToCart(item.id, "gadgets")} className={`${common.btn} ${styles.promo_list__btn}`}>
                                        В заказ
                                    </button>
                                </li>
                            )
                        })}
                    </ul>

                    <h2 className={styles.promo_section_title}>Аксессуары</h2>
                    <ul className={styles.promo_list}>
                        {accessoires.productList.map((item) => {
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
                                            src={`${accessoires.imgPrefix}/${accessoires.categoryAlias}/${item.imgPath}`}
                                            alt={item.imgAlt}/>
                                    </NavLink>
                                    <div className={styles.promo_list__title}>
                                        <span>{item.title}</span>
                                    </div>
                                    <span className={styles.promo_list__price}>
                                        {item.discount && <span className={styles.promo_list__price__old}>{item.price} р.</span>}
                                        {item.discount ? item.price - 4000 : item.price} р.
                                    </span>
                                    <button onClick={() => this.props.onAddToCart(item.id, "accessoires")} className={`${common.btn} ${styles.promo_list__btn}`}>

                                        В заказ
                                    </button>
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
            dispatch(actions.cart.addItemAsync(evt, id, category))
        },
        onDeleteFromCart: (evt, id) => {
            dispatch(actions.cart.disableButton(evt));
            dispatch(actions.cart.removeItemAsync(evt, id))
        },
    }
}


export default connect(getProps, setDispatch)(Promo);

