import React from "react";
import styles from "./product.module.scss";

const Features = props => {
    console.log(props);
    return (
        <>
            {/*Блок особенностей*/}
            <div className={`${styles.tab} ${styles.tab_active}`} id="tab-features">
                {props.promo.map(item => {
                    return (
                        <div key={item.title} className={styles.features__wrapper}>
                            <h2 className={styles.features__title}>{item.title}</h2>
                            <p className={styles.features__desc}>{item.desc}</p>
                            {item.imgPath && <img className={styles.features__img} src={`${props.imgPrefix}/${item.imgPath}`} alt={item.imgAlt}/>}
                        </div>
                    )
                })}
            </div>
        </>
    )
};

export default Features;

