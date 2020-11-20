import React, {Component} from "react";
import common from "~scss/common.module.scss";
import styles from "./promo.module.scss";
import {NavLink} from "react-router-dom";
import ModalOverlay from "../../Core/ModalOverlay/ModalOverlay";

import {connect} from "react-redux";
import actions from "../../../redux/actions/index"


import Button from "../../Core/Button/Button"


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

                    <Button>name</Button>

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
                                        {item.discount && <span className={styles.promo_list__price__old}>{new Intl.NumberFormat().format(item.price)} р.</span>}
                                        {item.discount
                                            ?
                                            new Intl.NumberFormat().format(item.price - (item.price * 10 / 100))
                                            :
                                            new Intl.NumberFormat().format(item.price)
                                        } р.
                                    </span>

                                    {/*<button onClick={() => this.props.onAddToCart(item.id, "phones")} className={`${common.btn} ${styles.promo_list__btn}`}>В заказ</button>*/}


                                    {
                                        this.isProductInCart(this.props.cart.products, item.id)
                                            ?
                                            <Button
                                                outOfStock={item.rest === 0}
                                                className={`${common.btn} ${styles.promo_list__btn} ${styles.btn_remove_item}`}
                                                classToDisableBtn={styles.active}
                                                onClick={(evt) => this.props.onDeleteFromCart(evt, item.id)}>
                                                Убрать из заказа
                                                <svg className={styles.btn_img} xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 1000 1000">
                                                    <path

                                                        d="M412.5 836.5c-41.8 0-75.8 32.2-75.8 71.8s34 71.8 75.8 71.8 75.8-32.2 75.8-71.8-34-71.8-75.8-71.8zm0 102.8c-19.3 0-35-13.9-35-31s15.7-31 35-31 35 13.9 35 31-15.7 31-35 31zM800.4 836.5c-41.8 0-75.8 32.2-75.8 71.8s34 71.8 75.8 71.8 75.8-32.2 75.8-71.8-33.9-71.8-75.8-71.8zm0 102.8c-19.3 0-35-13.9-35-31s15.7-31 35-31 35 13.9 35 31-15.7 31-35 31zM887.4 657.5l102.1-428.7c1.4-6.1 0-12.5-3.8-17.4-3.9-4.9-9.8-7.8-16-7.8H173.3c-3.3 0-6.3 1-9.1 2.4l-51-186.1H10v40.8h72.1l207.1 755.4h598.7v-40.8H320.4l-28-102.1h575.1c9.4 0 17.7-6.5 19.9-15.7zM452.9 509.8l-13.6-102.1h231.8l-13.6 102.1H452.9zm199.2 40.9l-10.9 81.7H469.3l-10.9-81.7h193.7zM219.6 407.8h178.5l13.6 102.1H247.6l-28-102.1zm214.3-40.9l-16.3-122.5H693l-16.3 122.5H433.9zm278.4 40.9h192.5l-24.3 102.1H698.7l13.6-102.1zm202.3-40.9H717.8l16.3-122.5h209.6l-29.1 122.5zM376.3 244.4l16.3 122.5H208.4l-33.6-122.5h201.5zM258.8 550.7h158.4l10.9 81.7H281.2l-22.4-81.7zm423.6 81.6l10.9-81.7h177.5l-19.4 81.7h-169z"/>
                                                </svg>
                                                <span className={styles.loader}/>
                                            </Button>

                                            :
                                            <Button
                                                outOfStock={item.rest === 0}
                                                className={`${common.btn} ${styles.promo_list__btn} ${item.rest === 0 && styles.btn_remove_item}`}
                                                classToDisableBtn={styles.active}
                                                onClick={(evt) => this.props.onAddToCart(evt, item.id, phones)}>
                                                {item.rest === 0 ? "Нет в наличии" : "Добавить в заказ"}
                                                <svg className={styles.btn_img} xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 1000 1000">
                                                    <path

                                                        d="M412.5 836.5c-41.8 0-75.8 32.2-75.8 71.8s34 71.8 75.8 71.8 75.8-32.2 75.8-71.8-34-71.8-75.8-71.8zm0 102.8c-19.3 0-35-13.9-35-31s15.7-31 35-31 35 13.9 35 31-15.7 31-35 31zM800.4 836.5c-41.8 0-75.8 32.2-75.8 71.8s34 71.8 75.8 71.8 75.8-32.2 75.8-71.8-33.9-71.8-75.8-71.8zm0 102.8c-19.3 0-35-13.9-35-31s15.7-31 35-31 35 13.9 35 31-15.7 31-35 31zM887.4 657.5l102.1-428.7c1.4-6.1 0-12.5-3.8-17.4-3.9-4.9-9.8-7.8-16-7.8H173.3c-3.3 0-6.3 1-9.1 2.4l-51-186.1H10v40.8h72.1l207.1 755.4h598.7v-40.8H320.4l-28-102.1h575.1c9.4 0 17.7-6.5 19.9-15.7zM452.9 509.8l-13.6-102.1h231.8l-13.6 102.1H452.9zm199.2 40.9l-10.9 81.7H469.3l-10.9-81.7h193.7zM219.6 407.8h178.5l13.6 102.1H247.6l-28-102.1zm214.3-40.9l-16.3-122.5H693l-16.3 122.5H433.9zm278.4 40.9h192.5l-24.3 102.1H698.7l13.6-102.1zm202.3-40.9H717.8l16.3-122.5h209.6l-29.1 122.5zM376.3 244.4l16.3 122.5H208.4l-33.6-122.5h201.5zM258.8 550.7h158.4l10.9 81.7H281.2l-22.4-81.7zm423.6 81.6l10.9-81.7h177.5l-19.4 81.7h-169z"/>
                                                </svg>
                                                <span className={styles.loader}/>
                                            </Button>
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

