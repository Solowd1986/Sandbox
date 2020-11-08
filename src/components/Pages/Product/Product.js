import React, {Component} from "react";
import styles from "./product.module.scss";
import {NavLink} from "react-router-dom";
import Layout from "~components/Core/Layout/Layout";

export default class Product extends Component {
    tabsHandler = () => {

    };

    render() {
        //console.log(this.props);

        return (
            <Layout>
                <section className={`container ${styles.item_bg}`}>
                    <div className={`wrapper ${styles.order}`}>
                        <div className={styles.order__img_wrapper}>
                            <img className={styles.order__img} src="/img/product/oneplus_bullets_wireless_600_1.png" alt="image"/>
                            <div className={styles.order__slider}>
                                <img className="" width="60" height="60" src="/img/product/oneplus_bullets_wireless_600_1-sm.png" alt="generic_img"/>
                                <img className="" width="60" height="60" src="/img/product/oneplus_bullets_wireless_600_2-sm.png" alt="generic_img"/>
                            </div>
                        </div>

                        <div className={styles.order__info_wrapper}>
                            <h1 className={styles.order__title}>Беспроводные наушники OnePlus Bullets Wireless</h1>
                            <p className={styles.order__desc}>OnePlus Bullets Wireless дают Вам ту свободу и удобство, которой Вам так не хватало.</p>
                            <span className={styles.order__price}>
                                <span className={styles.order__price__discount}>46 990 р.</span> 42 990 р.
                            </span>

                            <div className={styles.order__btn_block}>
                                <button className={`btn ${styles.order__btn_add_to_cart}`}>Добавить в корзину</button>
                                <button className={`btn ${styles.order__btn_buy_by_click}`}>Купить в один клик</button>
                            </div>
                            <span>Наличие: В наличии</span>
                        </div>
                    </div>
                </section>

                <section className={`wrapper ${styles.info}`}>
                    <nav className={styles.info__nav}>
                        <a onClick={this.tabsHandler} className={`${styles.info__nav_link} ${styles.info__nav_link__active}`} data-id="#tab-features">Описание</a>
                        <a onClick={this.tabsHandler} className={styles.info__nav_link} data-id="#tab-attributes">Характеристики</a>
                        <a onClick={this.tabsHandler} className={styles.info__nav_link} data-id="#tab-delivery">Доставка и оплата</a>
                    </nav>

                    {/*Блок особенностей*/}
                    <div className={`${styles.tab} ${styles.tab_active}`} id="tab-features">
                        <div className={styles.features__wrapper}>
                            <h2 className={styles.features__title}>Освободите свою музыку</h2>
                            <p className={styles.features__desc}>
                                Откройте для себя мягкие высокие частоты и низкие басы, которые вы никогда не слышали раньше, благодаря новым и улучшенным аудио технологиям в
                                наушниках OnePlus
                                Bullets Wireless.
                            </p>
                            <img className={styles.features__img} src="/img/product/oneplus_bullets_wireless_600_1.jpg " alt="img"/>
                        </div>

                        <div className={styles.features__wrapper}>
                            <h2 className={styles.features__title}>Чистый, мощный, превосходный звук</h2>
                            <p className={styles.features__desc}>
                                С двумя сбалансированными арматурными драйверами и одним 10-миллиметровым динамическим драйвером в каждом наушнике вам гарантировано превосходное
                                качество
                                прослушивания при каждом нажатии кнопки воспроизведения.
                            </p>
                            <img className={styles.features__img} src="/img/product/oneplus_bullets_wireless_600_3.jpg" alt="img"/>

                        </div>

                        <div className={styles.features__wrapper}>
                            <h2 className={styles.features__title}>Магнитный контроль</h2>
                            <p className={styles.features__desc}>
                                Вы с легкостью можете приостановить воспроизведение музыки. Просто соедините наушники вместе и благодаря магнитному креплению они выключатся
                                автоматически. Когда вы
                                решите возобновить воспроизведение музыки, просто разделите их. Это очень просто!
                            </p>
                            <img className={styles.features__img} src="/img/product/oneplus_bullets_wireless_600_2.jpg" alt="img"/>
                        </div>
                    </div>

                    {/*Блок характеристик*/}
                    <div className={`${styles.attributes} ${styles.tab}`} id="tab-attributes">
                        <h2 className={styles.attributes__table_title}>Общие характеристики</h2>
                        <table className={styles.attributes__table_data}>
                            <tbody>
                            <tr>
                                <td>Цвет</td>
                                <td>зеркальный серый</td>
                            </tr>
                            <tr>
                                <td>Тип</td>
                                <td>смартфон</td>
                            </tr>
                            <tr>
                                <td>Тип корпуса</td>
                                <td>классический</td>
                            </tr>
                            <tr>
                                <td>Материал корпуса</td>
                                <td>стекло Gorilla Glass 6 от Corning</td>
                            </tr>
                            <tr>
                                <td>Тип SIM-карты</td>
                                <td> nano SIM</td>
                            </tr>
                            </tbody>
                        </table>

                        <h2 className={styles.attributes__table_title}>Экран</h2>

                        <table className={styles.attributes__table_data}>
                            <tbody>
                            <tr>
                                <td>Тип экрана</td>
                                <td>Fluid AMOLED, сенсорный</td>
                            </tr>
                            <tr>
                                <td>Тип сенсорного экрана</td>
                                <td>мультитач, емкостный</td>
                            </tr>
                            <tr>
                                <td>Диагональ</td>
                                <td>6.67 дюйм.</td>
                            </tr>
                            <tr>
                                <td>Размер изображения</td>
                                <td>3120 x 1440</td>
                            </tr>
                            <tr>
                                <td>Автоматический поворот экрана</td>
                                <td>есть</td>
                            </tr>
                            </tbody>
                        </table>

                        <h2 className={styles.attributes__table_title}>Мультимедийные возможности</h2>
                        <table className={styles.attributes__table_data}>
                            <tbody>
                            <tr>
                                <td>Тыловая фотокамера</td>
                                <td>тройная 8/16/48 МП</td>
                            </tr>
                            <tr>
                                <td>Фотовспышка</td>
                                <td>тыльная, светодиодная</td>
                            </tr>
                            <tr>
                                <td>Функции тыловой фотокамеры</td>
                                <td>автофокус, оптическая стабилизация</td>
                            </tr>
                            <tr>
                                <td>Диафрагма тыловой фотокамеры</td>
                                <td>f/1.6</td>
                            </tr>
                            <tr>
                                <td>Макс. частота кадров видео</td>
                                <td>60 кадров/с</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                    {/*Блок доставки*/}
                    <div className={`${styles.delivery_rules} ${styles.tab}`} id="tab-delivery">

                        <h2 className={styles.delivery_rules__shipping_title}>Доставка</h2>
                        <h3 className={styles.delivery_rules__shipping_city}>Доставка по Москве</h3>
                        <p className={styles.delivery_rules__shipping_conditions}>Самовывоз из магазина - сегодня, м. Парк Победы</p>
                        <h3 className={styles.delivery_rules__shipping_country}>Доставка по России</h3>
                        <p className={styles.delivery_rules__shipping_conditions}>Доставка транспортными компаниями: СДЭК, PickPoint, Boxberry, 390 р.</p>

                        <h2 className={styles.delivery_rules__payment_title}>Оплата</h2>
                        <p className={styles.delivery_rules__payment_options}>Наличными</p>
                        <p className={styles.delivery_rules__payment_options}>Банковской картой</p>
                        <p className={styles.delivery_rules__payment_options}>WebMoney, Яндекс.Деньги, QIWI</p>
                    </div>
                </section>

            </Layout>
        )
    }
}


