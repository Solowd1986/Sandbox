import React, {Component} from "react";
import styles from "./order-summary.module.scss";
import {connect} from "react-redux";
import actions from "../../../../redux/actions";
import OverlayComp from "../../../Core/OverlayComp/OverlayComp";

import img from "./img/thankssir.png";

class OrderSummary extends Component {

    static defaultProps = {
        orderedItems: []
    };

    /**
     *
     * 1. Ход работы такой:
     * 1. Заходим в компонент, в пропсах пришли данные, записываем их в стейт, но выводим пропсы, стейт для промежуточных значений
     * 2. Вывоим все в просах, кроме поля ввода, оно осовано на стейте, чтобы пропускать любой ввод, даже некорректный.
     * 3. На каждом действии, то есть клик +/- или блюр поля ввода мы синхронизируем оба хранилища
     * 4. То есть, выполняется првоверка и на блюре оба хранилища получаюь одно, верное значение или откат к предыдущему.
     *
     * 5. Как я понял, свой стейт заполняется просами при создании компонента, а при ререндере код ние уже не выполняется
     * 6. Видимо, именно поэтому нужно всегда явно апдейтить стейт, иначе пропсы изменятся и то, что опиарется на пропсы тоже, но
     * вот код на стейтахъ сохрант то, что был ов стейте, а если стейт не апдейтить, то он не поменяется.
     *
     * То есть, твоя задача узнать, когда стейт заполняется данными, и повторяется ли это.
     *
     * Каждый метод, кроме transitionalValueHandler просто берет значение, и записывает его в оба обьекта, стейт и пропс.
     * Так они синхронны, корретны и всегда при рендере выводятся свойства для нужных комопнетов, так ка у нас используются оба
     *, часть от пропсов, часть отейта, ну, чтобы получать значение от свободного ввода и хранить его где-то. На этапе transitionalValueHandler
     * корретность не провертся а просто пишется как ест ьв стейт. А вот при блюре - проверятся и результат пишется уже нормальный
     * в оба зранилища. Аналогично при inc/dec - апдейтим оба, так как нужно отражать плюс/минус и в поел ввода, а за это у нас
     * отвечает кусок данных в стейте. Доступ мы к ним получаем просто по айди из пропсов, поскольку в стейте копия массива из пропосв,
     * то по этому айди и есть нужные данные. Еще раз - именно поле ввода мы и храним в стейте, вместе с прочей инфой, что может пригодиться.
     * Это нужно, чтобы можно было где-то хранить некорреткную инфу до блюра.
     * */


    state = {
        show: false,
        orderedItems: [...this.props.orderedItems]
    };


    transitionalValueHandler = (evt, id) => {

        console.log(1);
        const value = evt.target.value;

        const temporary = [...this.state.orderedItems];
        const currentProduct = { ...temporary.find(item => item.id === id) };
        currentProduct.quantity = value;
        temporary[temporary.indexOf(temporary.find(item => item.id === id))] = currentProduct;

        this.setState({
            orderedItems: [...temporary]
        });


        // const temporary = [...this.state.transitionalValue];
        // const currentProduct = temporary.find(item => item.id === id);
        // console.log('curr', currentProduct);
        //
        // currentProduct.value = evt.target.value;
        // temporary[temporary.indexOf(temporary.find(item => item.id === id))] = currentProduct;
        //
        //
        // this.setState({
        //     transitionalValue: [...temporary]
        // })


        // const temporary = [...this.state.temporary];
        // const currentProduct = {...this.state.temporary.find(item => item.id === id)};
        // currentProduct.quantity = evt.target.value;
        // temporary[temporary.indexOf(temporary.find(item => item.id === id))] = currentProduct;
        //
        // this.setState({
        //     temporary
        // })


        //this.props.onChangeAmountOfProduct(evt, id, value);
    };


    onBlurHandler = (evt, id, quantity) => {


        const value = Math.abs(parseInt(quantity));

        if (isNaN(value)) {
            const temporary = [...this.props.orderedItems];
            this.setState({
                orderedItems: [...temporary]
            });
        } else {

            const temporary = [...this.state.orderedItems];
            const currentProduct = { ...temporary.find(item => item.id === id) };

            currentProduct.quantity = Math.max(1, Math.min(currentProduct.rest, value));

            temporary[temporary.indexOf(temporary.find(item => item.id === id))] = currentProduct;

            this.setState({
                orderedItems: [...temporary]
            });

            this.props.onChangeAmountOfProduct(evt, id, value);


        }


        //this.props.onChangeAmountOfProduct(evt, id, quantity);


        // if (isNaN(Math.abs(parseInt(quantity)))) {
        //
        //     const temporary = [...this.state.orderedItems];
        //     this.setState({
        //         orderedItems: [...temporary]
        //     });
        // }

        // const temporary = [...this.state.orderedItems];
        // const currentProduct = temporary.find(item => item.id === id);
        // currentProduct.quantity = value;
        // temporary[temporary.indexOf(temporary.find(item => item.id === id))] = currentProduct;
        //
        // this.setState({
        //     orderedItems: [...temporary]
        // });


    };


    dec = (evt, id, value) => {
        const temporary = [...this.state.orderedItems];
        const currentProduct = { ...temporary.find(item => item.id === id) };

        currentProduct.quantity = Math.max(1, Math.min(currentProduct.rest, value));
        temporary[temporary.indexOf(temporary.find(item => item.id === id))] = currentProduct;

        this.setState({
            orderedItems: [...temporary]
        });

        this.props.onChangeAmountOfProduct(evt, id, value);
    };


    inc = (evt, id, value) => {
        const temporary = [...this.state.orderedItems];
        const currentProduct = { ...temporary.find(item => item.id === id) };


        currentProduct.quantity = value;
        temporary[temporary.indexOf(temporary.find(item => item.id === id))] = currentProduct;

        this.setState({
            orderedItems: [...temporary]
        });


        this.props.onChangeAmountOfProduct(evt, id, value);
    };



    calcTotal = () => {
        return this.props.orderedItems.reduce((total, item) => {
            total += (item.price * item.quantity);
            return total;
        }, 0);
    };

    checkout = () => {
        this.props.delayOrderAsync();
        this.props.enableOverlay();
    };

    render() {
        //console.log(this.props);
        //console.log(this.state);
        return (
            <section className={styles.summary}>

                {
                    this.props.state.cart.modals.showCheckoutModal
                    &&
                    <OverlayComp
                        disableOverlay={this.props.disableOverlay}
                        orderIsProcessed={this.props.state.cart.orderIsProcessed}
                        coloredBg={true}
                        delay={true}>

                        <div className={styles.checkout_modal}>
                            <img src={img} alt="image"/>
                            <h3>Спасибо за заказ</h3>
                            <p>Наш менеджер свяжется с вами в ближайшее время</p>
                        </div>
                    </OverlayComp>
                }

                <h2 className={styles.caption}>Ваш заказ</h2>
                {this.props.orderedItems.map(item => {
                    return (
                        <div key={item.title} className={styles.item}>
                            <div className={styles.info}>
                                <img
                                    width={82} height={82} className={styles.img_sm}
                                    src={item.imgFullPath}
                                    alt={item.imgAlt}
                                />
                                <div className={styles.info_inner_wrapper}>
                                    <p className={styles.product_title}>
                                        <span>{item.title}</span>
                                        {item.specifications !== undefined && <span>({item.specifications.color})</span>}
                                    </p>
                                    <div className={styles.counter_block}>
                                        <span onClick={(evt) => this.dec(evt, item.id, item.quantity - 1)}
                                              className={`${styles.counter} ${styles.counter_minus}`}/>

                                        <label>
                                            <input
                                                type="text" name="customer-product-count"
                                                onChange={(evt) => this.transitionalValueHandler(evt, item.id)}
                                                onBlur={(evt) => this.onBlurHandler(evt, item.id, evt.target.value)}
                                                value={this.state.orderedItems.find(citem => citem.id === item.id).quantity}
                                            />
                                        </label>

                                        <span onClick={(evt) => this.inc(evt, item.id, item.quantity + 1)}
                                              className={`${styles.counter} ${styles.counter_plus}`}/>
                                    </div>
                                </div>
                                <span className={styles.price__sm}>{item.price * item.quantity} р.</span>
                                <div>
                                    <span className={styles.delete} onClick={(evt) => this.props.onDeleteProductFromCart(evt, item.id)}>&times;</span>
                                </div>
                            </div>
                        </div>
                    )
                })}


                <div className={styles.delivery_fieldset}>
                    <span className={styles.delivery_item}>Доставка по Москве:</span>
                    <span className={styles.delivery_item}>{this.calcTotal() > 100000 ? 0 : 400} р.</span>
                </div>

                <div className={styles.checkout}>
                    <span className={styles.delivery_item}>Итого:</span>
                    <span className={styles.price__lg}>{this.calcTotal() > 100000 ? this.calcTotal() : this.calcTotal() + 400} р.</span>
                </div>
                <button onClick={this.checkout} className={`${styles.order_btn}`} disabled={false}>Оформить заказ</button>
            </section>
        )
    }
}


function getProps(state) {
    return {
        state
    }
}


function setDispatch(dispatch) {
    return {
        onDecreaseeProductsAmount: (evt, id) => {
            dispatch(actions.cart.decreaseeProductsAmount(evt, id));
        },
        onIncreaseProductsAmount: (evt, id) => {
            dispatch(actions.cart.increaseProductsAmount(evt, id))
        },
        onChangeAmountOfProduct: (evt, id, quantity) => {
            dispatch(actions.cart.changeAmountOfProduct(evt, id, quantity))
        },
        onDeleteProductFromCart: (evt, id) => {
            dispatch(actions.cart.removeItem(evt, id))
        },
        delayOrderAsync: () => {
            dispatch(actions.cart.delayOrderAsync());
        },
        enableOverlay: () => {
            dispatch(actions.cart.enableOverlay());
        },
        disableOverlay: () => {
            dispatch(actions.cart.disableOverlay());
        }
    }
}


export default connect(getProps, setDispatch)(OrderSummary);
