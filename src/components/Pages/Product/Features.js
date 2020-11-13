import React from "react";
import styles from "./product.module.scss";

const Features = props => {
    return (
        <>
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
                        С двумя сбалансированными арматурными драйверами и одним 10-миллиметровым динамическим драйвером в каждом наушнике вам гарантировано
                        превосходное
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
        </>
    )
};

export default Features;

