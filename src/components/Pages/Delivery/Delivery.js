import React from "react";
import common from "~scss/common.module.scss";
import styles from "./delivery.module.scss";
import deliveryBanner from "./img/_delivery-banner.png";

const Delivery = props => {
    return (
        <>
            <div className={styles.sign_bg}>
                <img className={styles.sign_bg__img} src={deliveryBanner} alt="Доставка"/>
                <h3 className={styles.sign_bg__title}>Доставка и оплата</h3>
            </div>

            <div className={`${common.wrapper} ${styles.delivery_wrapper}`}>

                <h2 className={styles.title}>Доставка</h2>

                <h3>Самовывоз на метро «Парк Победы»</h3>
                <p>Забрать свой заказ Вы можете после подтверждения его оператором.</p>
                <p>Пункт самовывоза находится по адресу:</p>
                <p>Москва, Барклая 6, стр. 5, БЦ "Барклай Плаза".</p>
                <p>График работы: с 10:00 до 20:00 без выходных.</p>
                <p>В пункте самовывоза оплата принимается только наличными.</p>

                <h3>Доставка курьером в пределах МКАД</h3>

                <p>Доставим Вам товар в день заказа, при его оформлении до 14:00, в ином случае, оператор сообщит Вам о ближайшем возможном времени доставки.</p>
                <p>Стоимость услуги «В пределах МКАД», составляет 290 рублей, от 6000р. - бесплатно.</p>
                <p>Обратите внимание, передача курьером товара для проверки осуществляется только после оплаты. Оплата курьеру наличными.</p>

                <h3>Доставка по России</h3>
                <p>Мы сотрудничаем с рядом транспортных компаний.</p>
                <p>Вы можете воспользоваться услугами CDEK, PickPoint и BoxBerry. Вариативность позволит Вам выбрать либо курьерскую доставку до двери, либо доставку до пункта
                    самовывоза выбранной Вами ТК.
                </p>
                <p>Мы отправим Вам трек-номер для отслеживания посылки в день ее отправления.</p>
                <p>Стоимость услуги «Доставка по России», составляет 390 рублей, от 6000р. - бесплатно.</p>
                <p>Обратите внимание, отправка товара по России осуществляется по стопроцентной предоплате.</p>

                <h2 className={styles.title}>Оплата</h2>

                <h3>Возможна оплата следующими способами:</h3>
                <ul className={styles.payment_methods}>
                    <li>Наличными</li>
                    <li>Банковской картой</li>
                    <li>Электронными деньгами: WebMoney, Яндекс.Деньги, QIWI</li>
                </ul>
            </div>
        </>
    )
};

export default Delivery;
