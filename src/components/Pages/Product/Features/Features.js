import React from "react";
import styles from "./features.module.scss";

const Features = ({ prefix, promo }) => {
    return (
        <>
            {promo.map(item => {
                return (
                    <div key={item.title} className={styles.wrapper}>
                        <h2 className={styles.title}>{item.title}</h2>
                        <p className={styles.desc}>{item.desc}</p>
                        <img
                            className={styles.img}
                            src={`${prefix}/${item.imgPath}`}
                            alt={item.imgAlt}
                        />
                    </div>
                )
            })}
        </>
    )
};

export default Features;

