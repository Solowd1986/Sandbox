import React, {Component} from "react";
import styles from "./product-card.module.scss";


class PromoProductCard extends Component {

    init = () => {

    };

    render() {
        const { item, category } = this.props;
        return (
            <>
                {item.rest > 0 && item.discount && <div className={styles.installment}>Рассрочка 0-0-12</div>}
                {item.rest > 0 && !item.discount && <div className={styles.most_endorsed}>Хит продаж</div>}
                {
                    item.rest > 0 && category.categoryAlias === "phones"
                    &&
                    <div className={styles.sim}>
                        <span>SIM</span>
                        в подарок</div>
                }
            </>
        )
    }
}

export default PromoProductCard;







