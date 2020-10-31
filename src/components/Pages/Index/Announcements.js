import React from "react";
import styles from "./announcements.module.scss";

const Announcements = props => {
    return (
        <section className="announcements">
            <div className="wrapper">
                <h3 className="announcements__title">Предстоящие мероприятия</h3>
                <ul className="announcements__list">
                    <li>
                        <a className="announcements__img-wrapper" href="#">
                            <img src="assets/img/announcement-img-android 11-developer.jpg" alt="announcements-image"/>
                        </a>
                        <div className="announcements__text-wrapper" href="">
                            <span><a href="#">Android 11 Developer Preview 3 с дизайном и функциями OxygenOS 11 для OnePlus 8 Series</a></span>
                            <p>
                                <a href="#">
                                    Пользователи OnePlus 8 и OnePlus 8 Pro теперь могут опробовать Android 11 Developer Preview 3
                                    и впервые ознакомиться с обновленным дизайном и функциями OxygenOS 11.
                                </a>
                            </p>
                            <a className="" href="#">Подробнее</a>
                        </div>
                    </li>
                    <li>
                        <a className="announcements__img-wrapper" href="#">
                            <img src="assets/img/announcement-img-lead-with-speed.jpg" alt="announcements-image"/>
                        </a>
                        <div className="announcements__text-wrapper" href="">
                    <span><a href="#">
                        OnePlus Buds обеспечивают великолепный звук при беспроводной передаче</a></span>
                            <p>
                                <a href="#">
                                    OnePlus Buds, разработанные для удовлетворения самых взыскательных требований к звуку
                                    и упрощения прослушивания, отличаются потрясающим временем автономной работы и
                                    быстрой зарядкой, отличным качеством звука с глубокими басами и удобным дизайном
                                    с простотой использования для всех пользователей.
                                </a>
                            </p>
                            <a className="" href="#">Подробнее</a>
                        </div>
                    </li>
                    <li>
                        <a className="announcements__img-wrapper" href="#">
                            <img src="assets/img/announcement-img-oneplus-buds.jpg" alt="announcements-image"/>
                        </a>
                        <div className="announcements__text-wrapper" href="">
                    <span><a href="#">
                        OnePlus запускает серию OnePlus 8 с передовой технологией Speed OnePlus</a></span>
                            <p>
                                <a href="#">
                                    Сосредоточившись на обеспечении максимально быстрой и плавной работы для своих
                                    технически подкованных пользователей, OnePlus расширяет свое флагманское превосходство,
                                    поднимая свои фирменные дисплеи с высокой частотой обновления до 120 Гц, снова поднимая
                                    отраслевой эталон для флагманских устройств премиум-класса.
                                </a>
                            </p>
                            <a className="" href="#">Подробнее</a>
                        </div>
                    </li>
                </ul>
            </div>
        </section>
    )
};

export default Announcements;
