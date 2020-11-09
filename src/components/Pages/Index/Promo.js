import React, {Component} from "react";
import common from "~scss/common.module.scss";
import styles from "./promo.module.scss";
import {NavLink} from "react-router-dom";
import ModalOverlay from "../../Core/ModalOverlay/ModalOverlay";

//import img from "../../../store/img/all/main-page/phone-main-page/oneplus_7pro_6gb_128gb_grey_275_1.png";

//require.context('../../../store/img/', true, /\.jpe?g$|.png$|.svg$|.gif$/);


export default class Promo extends Component {
    constructor(props) {
        super(props);
        // get data from server

        this.state = {
            modal: false,
            promo: {
                phones: [
                    {
                        id: 1,
                        title: "Oneplus 6T 6GB + 128GB",
                        color: "(черный оникс)",
                        price: 44500,
                        rest: 100,
                        imgPath: "main-page/phone-main-page/oneplus_6t_6gb_128gb_black_275_1.png",
                        imgAlt: "promo-phone-image",
                        discount: true
                    },
                    {
                        id: 2,
                        title: "Oneplus 6T 8GB + 128GB",
                        color: "(синий ультрамарин)",
                        price: 61000,
                        rest: 60,
                        imgPath: "main-page/phone-main-page/oneplus_6t_8gb_128gb_purple_275_1.png",
                        imgAlt: "promo-phone-image",
                        discount: false
                    },
                    {
                        id: 3,
                        title: "Oneplus 7 Pro 8GB + 256GB",
                        color: "(дымчато красный)",
                        price: 51000,
                        rest: 34,
                        imgPath: "main-page/phone-main-page/oneplus_7_8gb_256gb_red_275_1.png",
                        imgAlt: "promo-phone-image",
                        discount: true
                    },
                    {
                        id: 4,
                        title: "Oneplus 7 Pro 12GB + 256GB",
                        color: "(зеркальный серый)",
                        price: 76000,
                        rest: 32,
                        imgPath: "main-page/phone-main-page/oneplus_7_12gb_256gb_grey_275_1.png",
                        imgAlt: "promo-phone-image",
                        discount: true
                    },
                ],
                gadgets: [
                    {
                        id: 566,
                        title: "Зубная электрощетка Soocas X3 Sonic Electric ToothBrush",
                        price: 7900,
                        rest: 32,
                        imgPath: "main-page/gadgets-main-page/electric_tooth_brush_275_1.png",
                        imgAlt: "promo-gadgets-image",
                        discount: false
                    },
                    {
                        id: 766,
                        title: "Робот-пылесос Roborock Sweep One",
                        price: 17200,
                        rest: 52,
                        imgPath: "main-page/gadgets-main-page/roborock_sweep_one_275_1.png",
                        imgAlt: "promo-gadgets-image",
                        discount: true
                    },
                    {
                        id: 567,
                        title: "Автомобильное зарядное устройство ZMI Car Charger AP821",
                        price: 11500,
                        rest: 78,
                        imgPath: "main-page/gadgets-main-page/digital_display_car_charger_275_1.png",
                        imgAlt: "promo-gadgets-image",
                        discount: false
                    },
                    {
                        id: 311,
                        title: "Зеркало для макияжа Amiro Lux High Color",
                        price: 15000,
                        rest: 7,
                        imgPath: "main-page/gadgets-main-page/amiro_lux_high_color_275_1.png",
                        imgAlt: "promo-gadgets-image",
                        discount: false
                    },
                ],
                accessoires: [
                    {
                        id: 11,
                        title: "Беспроводные наушники OnePlus Bullets Wireless",
                        price: 12000,
                        rest: 12,
                        imgPath: "main-page/accessoires-main-page/oneplus_bullets_wireless_275_1.png",
                        imgAlt: "promo-accessoires-image",
                        discount: false
                    },
                    {
                        id: 21,
                        title: "Адаптер OnePlus Dash Power",
                        price: 6000,
                        rest: 42,
                        imgPath: "main-page/accessoires-main-page/oneplus_dash_charger_275_1.png",
                        imgAlt: "promo-accessoires-image",
                        discount: false
                    },
                    {
                        id: 34,
                        title: "Автомобильное зарядное устройство OnePlus Warp Charge",
                        price: 9800,
                        rest: 17,
                        imgPath: "main-page/accessoires-main-page/oneplus_warp_charge_30_275_1.png",
                        imgAlt: "promo-accessoires-image",
                        discount: true
                    },
                    {
                        id: 151,
                        title: "Адаптер OnePlus Type-C - 3.5мм",
                        price: 2000,
                        rest: 52,
                        imgPath: "main-page/accessoires-main-page/oth_cable_oneplus_type_c_275_1.png",
                        imgAlt: "promo-accessoires-image",
                        discount: false
                    }
                ]
            }
        }
    }


    addToCart = (id) => {
        // find in data from server needed object and add to cart state
        // change state of cart component
        // change header cart icon
        this.setState({ modal: true });
    };

    closeModal = () => {
        this.setState({ modal: false })
    };

    render() {
        return (
            <section className={`${common.container} ${styles.promo_wrapper}`}>
                <main className={`${common.wrapper} ${styles.promo}`}>

                    {this.state.modal && <ModalOverlay setModalStatus={this.closeModal}>
                        <div style={{ backgroundColor: "grey", width: "30%", height: "200px" }}>
                            <NavLink to={"/order"} style={{ backgroundColor: "red", padding: "10px" }}>Order</NavLink>
                        </div>
                    </ModalOverlay>
                    }


                    <h2 className={styles.promo_section_title}>Рекомендуем</h2>
                    <ul className={styles.promo_list}>
                        {this.state.promo.phones.map((item) => {
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
                                    <button onClick={() => this.addToCart(item.id)} className={`${common.btn} ${styles.promo_list__btn}`}>Купить</button>
                                </li>
                            )
                        })}
                    </ul>

                    <h2 className={styles.promo_section_title}>Популярные гаджеты</h2>

                    <ul className={styles.promo_list}>
                        {this.state.promo.gadgets.map((item) => {
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
                                    <button onClick={() => this.addToCart(item.id)} className={`${common.btn} ${styles.promo_list__btn}`}>Купить</button>
                                </li>
                            )
                        })}
                    </ul>

                    <h2 className={styles.promo_section_title}>Аксессуары</h2>
                    <ul className={styles.promo_list}>
                        {this.state.promo.accessoires.map((item) => {
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
                                    <button onClick={() => this.addToCart(item.id)} className={`${common.btn} ${styles.promo_list__btn}`}>Купить</button>
                                </li>
                            )
                        })}
                    </ul>
                </main>
            </section>
        )
    }
};



