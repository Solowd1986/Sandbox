import React, {Component} from "react";
import common from "~scss/common.module.scss";
import styles from "./promo.module.scss";
import {connect} from "react-redux";
import ProductCard from "../ProductCart/ProductCard";
import OverlayComp from "../../Core/OverlayComp/OverlayComp";
import {NavLink, useHistory} from "react-router-dom";
import actions from "../../../redux/actions";
import img from "../Order/OrderSummary/img/thankssir.png";


class Promo extends Component {

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

                    {
                        this.props.cart.modals.showModal && !this.props.cart.defaultSettings.buttonsDisabled
                        &&
                        <OverlayComp coloredBg={true} delay={false}>
                            <div className={styles.cart}>
                                <h3>Ваш заказ</h3>
                                <ul>
                                    {
                                        this.props.cart.products.map((item, i) => {
                                            return (
                                                <li key={i}>
                                                    <img width={82} height={82} src={`${item.imgFullPath}`} alt="image-cart"/>
                                                    <p>{item.title}</p>
                                                    <span>{new Intl.NumberFormat().format(item.price)} р.</span>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                                <NavLink className={styles.link} to={"/order"}>Перейти в корзину</NavLink>
                                <span className={styles.continue} onClick={this.props.disableOverlay}>Продолжить покупки</span>
                            </div>
                        </OverlayComp>
                    }


                    <h2 className={styles.promo_section_title}>Рекомендуем</h2>
                    <ul className={styles.promo_list}>
                        {/*ограничиваем вывод четырьмя элементами на странице promo*/}
                        {phones.productList.slice(0, 4).map((item, i) => {
                            return (
                                <ProductCard key={i} item={item} category={phones}/>
                            )
                        })}
                    </ul>

                    <h2 className={styles.promo_section_title}>Популярные гаджеты</h2>

                    <ul className={styles.promo_list}>
                        {gadgets.productList.slice(0, 4).map((item, i) => {
                            return (
                                <ProductCard key={i} item={item} category={gadgets}/>
                            )
                        })}
                    </ul>

                    <h2 className={styles.promo_section_title}>Аксессуары</h2>
                    <ul className={styles.promo_list}>
                        {accessoires.productList.slice(0, 4).map((item, i) => {
                            return (
                                <ProductCard key={i} item={item} category={accessoires}/>
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
        disableOverlay: () => {
            dispatch(actions.cart.disableOverlay());
        },
    }
}

export default connect(getProps, setDispatch)(Promo);

