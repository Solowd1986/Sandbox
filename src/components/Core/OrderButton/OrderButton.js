import React, {Component} from "react";
import common from "~scss/common.module.scss";
import styles from "./order-button.module.scss";
import classNames from "classnames";
import { connect } from "react-redux";

class OrderButton extends Component {
    constructor(props) {
        super(props);
        this.delayAddingItem = null;
    }

    onClick = (evt) => {
        evt.target.classList.add(styles.disabled);
        evt.target.disabled = true;
        this.delayAddingItem = setTimeout(() => {
            evt.target.classList.remove(styles.disabled);
            evt.target.disabled = false;
            this.props.onClick(evt);
        }, 1000)
    };

    componentWillUnmount() {
        clearTimeout(this.delayAddingItem);
    }

    render() {
        const isProductInCart = this.props.cart.find((item) => item.title === this.props.product.title);
        const isProductInStock = this.props.product.rest !== 0;
        const isButtonStatusInactive = isProductInCart || !isProductInStock;
        const isButtonDisabled = this.props.disabled === true || !isProductInStock;

        /**
         *  1. Записываем стандартные классы кнопки: база + кнопка заказа (уточнение)
         *  2. Ставим кнопке сриый фон, если товара нет или кнопка содержит текст "Убрать из заказа"
         *  3. Если пришли доп. классы  и свойство classList не undefined - ставим их.
         */
        const classList = classNames(common.btn, styles.order__btn, {
            [styles.btn_remove_item]: isButtonStatusInactive,
            [this.props.classList]: this.props.classList !== undefined,
        });


        // Проверяем, нужно ли показывать иконку корзины, ведь она не нужна при исключения товара из заказа, и в случае
        // его отсутствия в целом
        let svg = null;
        if (!isButtonStatusInactive) {
            svg =
                <svg className={styles.btn_img} xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 1000 1000">
                    <path
                        d="M412.5 836.5c-41.8 0-75.8 32.2-75.8 71.8s34 71.8 75.8 71.8 75.8-32.2 75.8-71.8-34-71.8-75.8-71.8zm0 102.8c-19.3 0-35-13.9-35-31s15.7-31 35-31 35 13.9 35 31-15.7 31-35 31zM800.4 836.5c-41.8 0-75.8 32.2-75.8 71.8s34 71.8 75.8 71.8 75.8-32.2 75.8-71.8-33.9-71.8-75.8-71.8zm0 102.8c-19.3 0-35-13.9-35-31s15.7-31 35-31 35 13.9 35 31-15.7 31-35 31zM887.4 657.5l102.1-428.7c1.4-6.1 0-12.5-3.8-17.4-3.9-4.9-9.8-7.8-16-7.8H173.3c-3.3 0-6.3 1-9.1 2.4l-51-186.1H10v40.8h72.1l207.1 755.4h598.7v-40.8H320.4l-28-102.1h575.1c9.4 0 17.7-6.5 19.9-15.7zM452.9 509.8l-13.6-102.1h231.8l-13.6 102.1H452.9zm199.2 40.9l-10.9 81.7H469.3l-10.9-81.7h193.7zM219.6 407.8h178.5l13.6 102.1H247.6l-28-102.1zm214.3-40.9l-16.3-122.5H693l-16.3 122.5H433.9zm278.4 40.9h192.5l-24.3 102.1H698.7l13.6-102.1zm202.3-40.9H717.8l16.3-122.5h209.6l-29.1 122.5zM376.3 244.4l16.3 122.5H208.4l-33.6-122.5h201.5zM258.8 550.7h158.4l10.9 81.7H281.2l-22.4-81.7zm423.6 81.6l10.9-81.7h177.5l-19.4 81.7h-169z"/>
                </svg>
        }

        return (
            <button className={classList} onClick={this.onClick} disabled={isButtonDisabled}>
                {/*Иконка корзины, появление по условию*/}
                {svg}
                {/*Спиннер ожидании ответа от сервера, появится при состоянии :disabled у кнопки*/}
                <span className={styles.loader}/>
                {/*Текстовое содержимое кнопки*/}
                {this.props.children}
            </button>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cart: state.cart.products
    }
};


export default connect(mapStateToProps)(OrderButton);









