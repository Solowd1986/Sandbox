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
                            <img className={styles.features__img} src={`${props.imgPrefix}/${item.imgPath}`} alt={item.imgAlt}/>
                        </div>
                    )
                })}

                {/*<div className={styles.features__wrapper}>*/}
                {/*    <h2 className={styles.features__title}>Освободите свою музыку</h2>*/}
                {/*    <p className={styles.features__desc}>*/}
                {/*        Откройте для себя мягкие высокие частоты и низкие басы, которые вы никогда не слышали раньше, благодаря новым и улучшенным аудио технологиям в*/}
                {/*        наушниках OnePlus*/}
                {/*        Bullets Wireless.*/}
                {/*    </p>*/}
                {/*    <img className={styles.features__img} src="/static/media/accessoires/oneplus_bullets_wireless_2_promo.jpg" alt="img"/>*/}
                {/*</div>*/}

                {/*<div className={styles.features__wrapper}>*/}
                {/*    <h2 className={styles.features__title}>Чистый, мощный, превосходный звук</h2>*/}
                {/*    <p className={styles.features__desc}>*/}
                {/*        С двумя сбалансированными арматурными драйверами и одним 10-миллиметровым динамическим драйвером в каждом наушнике вам гарантировано*/}
                {/*        превосходное*/}
                {/*        качество*/}
                {/*        прослушивания при каждом нажатии кнопки воспроизведения.*/}
                {/*    </p>*/}
                {/*    <img className={styles.features__img} src="/static/media/accessoires/oneplus_bullets_wireless_3_promo.jpg" alt="img"/>*/}

                {/*</div>*/}

                {/*<div className={styles.features__wrapper}>*/}
                {/*    <h2 className={styles.features__title}>Магнитный контроль</h2>*/}
                {/*    <p className={styles.features__desc}>*/}
                {/*        Вы с легкостью можете приостановить воспроизведение музыки. Просто соедините наушники вместе и благодаря магнитному креплению они выключатся*/}
                {/*        автоматически. Когда вы*/}
                {/*        решите возобновить воспроизведение музыки, просто разделите их. Это очень просто!*/}
                {/*    </p>*/}
                {/*    <img className={styles.features__img} src="/static/media/accessoires/oneplus_bullets_wireless_4_promo.jpg" alt="img"/>*/}
                {/*</div>*/}



            </div>
        </>
    )
};

export default Features;

