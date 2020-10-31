import React from "react";
import styles from "./brandstory.module.scss";

const BrandStory = props => {
    return (
        <section className="brand-story">
            <div className="brand-story__item milestone-item">
                <div className="brand-story__info">
                    <h2 className="brand-story__title">Новые <br/> вершины</h2>
                    <div className="brand-story__text-slide">
                        <h4 className="brand-story__subtitle">Завораживающий <br/> 90 Гц экран</h4>
                        <p className="brand-story__desc">
                            Мы представили в OnePlus 7 Pro лидирующий в отрасли
                            жидкостный жидкокристаллический дисплей с частотой 90 Гц.
                        </p>
                        <a className="brand-story__link" href="#">Узнать больше...</a>
                    </div>
                </div>
            </div>
            <div className="brand-story__item achivments-item">
                <div className="brand-story__info">
                    <h2 className="brand-story__title">Достижения <br/> компании</h2>
                    <div className="brand-story__text-slide">
                        <h4 className="brand-story__subtitle">Игровой режим <br/> «Fnatic Mode»</h4>
                        <p className="brand-story__desc">
                            В сотрудничестве с профессиональной киберспортивной командой Fnatic был
                            создан режим OnePlus Gaming
                        </p>
                        <a className="brand-story__link" href="#">Узнать больше...</a>
                    </div>
                </div>
            </div>
            <div className="brand-story__item our-people-item">
                <div className="brand-story__info">
                    <h2 className="brand-story__title">Наше <br/> сообщество</h2>
                    <div className="brand-story__text-slide">
                        <h4 className="brand-story__subtitle">Создаем наши устройства <br/>вместе с вами!</h4>
                        <p className="brand-story__desc">
                            Мы провели множество глобальных ивентов и митапов в 11 странах и 26 городах,
                            с более чем 15 000 участников
                        </p>
                        <a className="brand-story__link" href="#">Узнать больше...</a>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default BrandStory;

