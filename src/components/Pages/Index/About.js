import React from "react";
import styles from "./about.module.scss";

const About = props => {
    return (
        <div className="container promo-about">
            <section className="wrapper">
                <h1 className="promo-about__main-title">Интернет-магазин OnePlus</h1>
                <p className="promo-about__desc">
                    Модельный ряд девайсов OnePlus – это прежде всего высокотехнологичные флагманские смартфоны. Даже спустя несколько лет они не потеряют актуальность. Будучи
                    оснащенными современными процессорами и графическими картами, они показывают достойный показатель производительности. Эргономичность корпуса, высокий уровень
                    сборки, а также продуманный до мелочей дизайн, гарантируют пользователю удобство и комфорт при использовании.
                </p>

                <p className="promo-about__desc">
                    Камеры, установленные на смартфонах, выделяются качеством съемки, отличной четкостью и цветопередачей. В аппаратах Ван Плас используют модули с матрицей от
                    Sony. С
                    большим дисплеем работать станет гораздо приятнее. Его неотъемлемые составляющие это прежде всего: высокое разрешение, яркость, глубина цвета, хороший угол
                    обзора.
                    Автономность позволит спокойно работать с мобильным телефоном на протяжении всего дня. Функция быстрой зарядки Dash Charge или Warp Charge – это новинка в
                    индустрии, она зарядит Ваш девайс до комфортного уровня за 30 минут. Интуитивно простая операционная система на базе Android – OxygenOS, позволит Вам
                    наслаждаться
                    каждой минутой использования смартфона, даже если вы работаете с ним в первый раз.
                </p>

                <p className="promo-about__desc">
                    Наш интернет-магазин занимается продажей только оригинальной продукции. Наши специалисты помогут Вам принять рациональное решение в подборе товара. Мы дорожим
                    каждым клиентом и стараемся широко освящать события компании, чтобы каждый, кто следит за брендом, смог получать информацию из единого качественного источника.
                    Основным критерием нашего магазина можно назвать следующее: консультация покупателей должна производиться не только до момента покупки, но и после нее. Каждый
                    пользователь – это частичка огромного сообщества, в этом отношении исключительный подход к каждому является необходимым. Наша цель – это прежде всего развитие
                    данного бренда в России, и мы будем и дальше знакомить Вас с этой замечательной фирмой. Только при тесном контакте с аудиторией можно создать действительно
                    полезное
                    устройство, которое будет отражать вклад каждого, кто не остался в стороне!
                </p>
            </section>
        </div>

    )
};

export default About;

