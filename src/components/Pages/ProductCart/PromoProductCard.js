import React, {Component} from "react";
import styles from "./product-card.module.scss";


class PromoProductCard extends Component {
    constructor(props) {
        super(props);
        this.random = this.init();
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return false;
    }

    init = () => Math.floor(Math.random() * 4);

    render() {
        const { item, category } = this.props;
        let promo = [];

        if (category.categoryAlias === "phones" && item.rest > 0) {
            switch (item.adsType) {
                case 0: {
                    promo = [
                        <div className={styles.new}>Новинка</div>,
                        <div className={styles.most_endorsed}>Хит продаж</div>
                    ];
                    break;
                }
                case 1: {
                    promo = [
                        <div className={styles.installment}>Рассрочка 0-0-12</div>,
                        <div className={styles.sim}>
                            <span>SIM </span>
                            в подарок</div>
                    ];
                    break;
                }
                case 2: {
                    promo = [
                        <div className={styles.installment}>Рассрочка 0-0-12</div>,
                        <div className={styles.gift}>
                            <span>Подарок </span>
                            3 500 р.</div>,
                    ];
                    break;
                }
                case 3: {
                    promo = [
                        <div className={styles.new}>Новинка</div>,
                        <div className={styles.sim}>
                            <span>SIM </span>
                            в подарок</div>
                    ];
                    break;
                }
            }

        } else if (item.rest > 0) {
            switch (item.adsType) {
                case 0:
                    promo = [<div className={styles.gift}>
                        <span>Подарок </span>
                        1 500 р.</div>];
                    break;
                case 1:
                    promo = [<div className={styles.most_endorsed}>Хит продаж</div>];
                    break;
                case 2:
                    promo = [<div className={styles.new}>Новинка</div>];
                    break;
                case 3:
                    promo = [<div className={styles.installment}>Рассрочка 0-0-12</div>];
                    break;
            }
        }

        return (
            <>
                {promo.map((item, i) => {
                    return (
                        <React.Fragment key={i}>
                            {item}
                        </React.Fragment>
                    )
                })}
            </>
        )
    }
}

export default PromoProductCard;






