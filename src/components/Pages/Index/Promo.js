import React, {Component} from "react";
import common from "~scss/common.module.scss";
import styles from "./promo.module.scss";
import {connect} from "react-redux";
import ProductCard from "../ProductCart/ProductCard";
import Overlay from "../../Core/Overlay/Overlay";
import CartModal from "../../CartModal/CartModal";


class Promo extends Component {

    // ДОПИШИ ЭТО КАК УНВИЕРСАЛЬНУЮ ФУНЦИЮ ДЛЯ СМЕНЫ ОБЬЕКТА ИЗ МАССИВА STATE
    // вернет массив и уже его можно использовать в setSate
    // пример:
    /**
     * this.setState(({ users }) => {
     *     users: this.togglePropert(users, 1, name, "stan 2")
     * });
     *
     *
     * */

        // допиши тут смену value
    togglePropert = (array, id, prop, value) => {

        const index = users.find(user => user.id === id);
        const name = users[index].name + " 2";
        const user = { ...users[index], name };


        const result = [
            ...users.slice(0, index),
            user,
            ...users.slice(index + 1)
        ];

        return result;
    };

    render() {
        //console.log(this.props);
        const [phones, accessoires, gadgets] = this.props.db.category;

        return (
            <section className={`${common.container} ${styles.promo_wrapper}`}>
                <main className={`${common.wrapper} ${styles.promo}`}>

                    {
                        this.props.cart.modals.showModal
                        &&
                        !this.props.cart.defaultSettings.buttonsDisabled
                        &&
                        !this.props.cart.modals.isOfferGoToCartBeenShown
                        &&
                        <Overlay coloredBg={true} delay={false}>
                            <CartModal products={this.props.cart.products}/>
                        </Overlay>
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


export default connect(getProps)(Promo);

