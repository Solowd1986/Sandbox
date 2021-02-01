import React, { Component } from "react";
import styles from "./order_item.module.scss"
import actions from "../../../../redux/actions";
import * as modalActions from "../../../../redux/entities/modal/actions";
import { connect } from "react-redux";


// пример метода для смены state нормальной
function changeState(id, property, value, storage) {
    const elem = storage.find(item => item.id === id);
    const list = [...storage];
    const cloneDeep = require('lodash.clonedeep');
    const tempElem = cloneDeep(elem);
    tempElem[property] = value;
    list[list.indexOf(elem)] = tempElem;
    return list;
}


const users1 = [
    { id: 1, name: "bob" },
    { id: 2, name: "glen" },
    { id: 3, name: "john" },
];

const users2 = changeState(2, "name", "stan", users1);
// console.dir(users1);
// console.dir(users2);
// console.log(users1[0] === users2[0]);
// console.log(users1[1] === users2[1]);
// console.log(users1[2] === users2[2]);


class OrderItem extends Component {

    static defaultProps = {
        orderedItems: []
    };

    /**
     *
     * 1. Ход работы такой:
     * 1. Заходим в компонент, в пропсах пришли данные, записываем их в стейт, но выводим пропсы, стейт для
     *    промежуточных значений
     *
     * 2. Вывоим все данные для полей из пропсов, кроме поля ввода, оно основано на стейте,
     *    чтобы пропускать любой ввод, даже некорректный.
     *
     * 3. На каждом действии, то есть клик +/- или блюр поля ввода мы синхронизируем оба хранилища
     * 4. То есть, выполняется првоверка и на блюре оба хранилища получаюь одно, верное значение или откат к предыдущему.
     *
     * 5. Как я понял, свой стейт заполняется просами при создании компонента, а при ререндере код ние уже не
     *    выполняется
     *
     * 6. Видимо, именно поэтому нужно всегда явно апдейтить стейт, иначе пропсы изменятся и то, что опиарется на
     *    пропсы тоже, но
     *    вот код на стейтахъ сохрант то, что был ов стейте, а если стейт не апдейтить, то он не поменяется.
     *
     *    То есть, твоя задача узнать, когда стейт заполняется данными, и повторяется ли это.
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
        orderedItems: [...this.props.orderedItems]
    };


    transitionalValueHandler = (evt, id) => {
        const value = evt.target.value;
        const temporary = [...this.state.orderedItems];
        const currentProduct = { ...temporary.find(item => item.id === id) };
        currentProduct.quantity = value;
        temporary[temporary.indexOf(temporary.find(item => item.id === id))] = currentProduct;

        this.setState({
            orderedItems: [...temporary]
        });
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
        const cloneDeep = require('lodash.clonedeep');
        const orderedItems = cloneDeep(this.state.orderedItems);
        orderedItems.find(item => item.id === id).quantity = value;
        this.setState({
            orderedItems
        });
        this.props.onChangeAmountOfProduct(evt, id, value);
    };


    // проблема - при получении новых пропсов переписывать state локалный
    changeAmountWithClick = (evt, id, value) => {
        this.props.onChangeAmountOfProduct(evt, id, value);
    };


    changeAmountWithEdit = () => {

    };


    render() {
        const { item } = this.props;
        return (
            <div key={item.title} className={styles.item}>
                <div className={styles.info}>
                    <img
                        width={82} height={82} className={styles.img_sm}
                        // that from reducer addItemToCart
                        src={item.imgFullPath}
                        alt={item.imgAlt}
                    />
                    <div className={styles.info_inner_wrapper}>
                        <p className={styles.product_title}>
                            <span>{item.title}</span>
                            {item.specifications !== undefined && <span>({item.specifications.color})</span>}
                        </p>
                        <div className={styles.counter_block}>
                                        <span onClick={(evt) => this.changeAmountWithClick(evt, item.id, item.quantity - 1)}
                                              className={`${styles.counter} ${styles.counter_minus}`}/>

                            <label>
                                <input
                                    type="text" name="customer-product-count"
                                    onChange={(evt) => this.transitionalValueHandler(evt, item.id)}
                                    onBlur={(evt) => this.onBlurHandler(evt, item.id, evt.target.value)}
                                    value={this.state.orderedItems.find(citem => citem.id === item.id).quantity}
                                />
                            </label>

                            <span onClick={(evt) => this.changeAmountWithClick(evt, item.id, item.quantity + 1)}
                                  className={`${styles.counter} ${styles.counter_plus}`}/>
                        </div>
                    </div>
                    <span className={styles.price__sm}>
                                    {new Intl.NumberFormat().format(item.price * item.quantity)} р.</span>
                    <div>
                        <span className={styles.delete} onClick={(evt) => this.props.onDeleteProductFromCart(evt, item.id)}>&times;</span>
                    </div>
                </div>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        isModalActive: state.modal.isModalActive,
        listOfProducts: state.cart.products
    }
}


function mapDispatchToProps(dispatch) {
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
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(OrderItem);




