import React, {Component} from "react";
import common from "~scss/common.module.scss";
import styles from "./promo.module.scss";
import {NavLink} from "react-router-dom";
import ModalOverlay from "../../Core/ModalOverlay/ModalOverlay";
import {connect} from "react-redux";


//import img from "../../../store/img/all/main-page/phone-main-page/oneplus_7pro_6gb_128gb_grey_275_1.png";

//require.context('../../../store/img/', true, /\.jpe?g$|.png$|.svg$|.gif$/);
//require.context('~img/', true, /\.jpe?g$|.png$|.svg$|.gif$/);


class Promo extends Component {

    addToCart = (id) => {
        // find in data from server needed object and add to cart state
        // change state of cart component
        // change header cart icon

        console.log(id);

        //this.setState({ modal: true });
    };

    closeModal = () => {
        this.setState({ modal: false })
    };

    show = () => {
        console.log(this.props);

    };

    render() {


        return (
            <section className={`${common.container} ${styles.promo_wrapper}`}>

                <main className={`${common.wrapper} ${styles.promo}`}>

                    <button style={{ padding: "10px" }} onClick={this.show}>show</button>

                    {this.props.modal && <ModalOverlay setModalStatus={this.closeModal}>
                        <div style={{ backgroundColor: "grey", width: "30%", height: "200px" }}>
                            <NavLink to={"/order"} style={{ backgroundColor: "red", padding: "10px" }}>Order</NavLink>
                        </div>
                    </ModalOverlay>
                    }

                    <h2 className={styles.promo_section_title}>Рекомендуем</h2>
                    <ul className={styles.promo_list}>
                        {this.props.promo.phones.map((item) => {
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
                                            src={`img/${item.imgPath}`}
                                            alt={item.imgAlt}/>
                                    </NavLink>
                                    <div className={styles.promo_list__title}>
                                        <span>{item.title}</span>
                                        <span>{item.color}</span>
                                    </div>
                                    <span className={styles.promo_list__price}>
                                        {item.discount && <span className={styles.promo_list__price__old}>{item.price} р.</span>}
                                        {item.discount ? item.price - 4000 : item.price} р.
                                    </span>

                                    <button onClick={() => this.props.productAddToCart(item.id, "phones")} className={`${common.btn} ${styles.promo_list__btn}`}>Купить</button>
                                </li>
                            )
                        })}
                    </ul>

                    <h2 className={styles.promo_section_title}>Популярные гаджеты</h2>

                    <ul className={styles.promo_list}>
                        {this.props.promo.gadgets.map((item) => {
                            return (
                                <li key={item.id} className={styles.promo_list__item}>
                                    <span className={
                                        item.rest > 0
                                            ? `${styles.promo_list__tag}`
                                            : `${styles.promo_list__tag} ${styles.promo_list__tag__not_in_stock}`}>
                                        В наличии
                                    </span>
                                    <NavLink to={`/product/gadgets/${item.id}`} className={styles.promo_list__link}>
                                        <img
                                            className={styles.promo_list__img}
                                            // path from public folder
                                            src={`img/${item.imgPath}`}
                                            alt={item.imgAlt}/>
                                    </NavLink>
                                    <div className={styles.promo_list__title}>
                                        <span>{item.title}</span>
                                    </div>
                                    <span className={styles.promo_list__price}>
                                        {item.discount && <span className={styles.promo_list__price__old}>{item.price} р.</span>}
                                        {item.discount ? item.price - 4000 : item.price} р.
                                    </span>
                                    <button onClick={() => this.props.productAddToCart(item.id, "gadgets")} className={`${common.btn} ${styles.promo_list__btn}`}>Купить</button>
                                </li>
                            )
                        })}
                    </ul>

                    <h2 className={styles.promo_section_title}>Аксессуары</h2>
                    <ul className={styles.promo_list}>
                        {this.props.promo.accessoires.map((item) => {
                            return (
                                <li key={item.id} className={styles.promo_list__item}>
                                    <span className={
                                        item.rest > 0
                                            ? `${styles.promo_list__tag}`
                                            : `${styles.promo_list__tag} ${styles.promo_list__tag__not_in_stock}`}>
                                        В наличии
                                    </span>
                                    <NavLink to={`/product/accessoires/${item.id}`} className={styles.promo_list__link}>
                                        <img
                                            className={styles.promo_list__img}
                                            src={`img/${item.imgPath}`}
                                            alt={item.imgAlt}/>
                                    </NavLink>
                                    <div className={styles.promo_list__title}>
                                        <span>{item.title}</span>
                                    </div>
                                    <span className={styles.promo_list__price}>
                                        {item.discount && <span className={styles.promo_list__price__old}>{item.price} р.</span>}
                                        {item.discount ? item.price - 4000 : item.price} р.
                                    </span>
                                    <button onClick={() => this.props.productAddToCart(item.id, "accessoires")} className={`${common.btn} ${styles.promo_list__btn}`}>Купить
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


function getProps(state) {
    return state
}


function setDispatch(dispatch) {
    return {
        modalShow: () => dispatch({ type: "onModalShow" }),
        productAddToCart: (id, cat) => {
            dispatch({ type: "onProductAdd", id, cat });
        }
    }
}


export default connect(getProps, setDispatch)(Promo);

