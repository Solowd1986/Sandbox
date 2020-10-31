import React, {Component} from "react";
import styles from "./slider.module.scss";

import $ from "jquery";
import "slick-carousel/slick/slick.min";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


export default class Slider extends Component {

    // Инициализация слайдера после отрисовки компонента. Была ошибка "cant' call add", это из-за
    // двойной инициализации, поэтому тут проверка - not('.slick-initialized'), и только потом инициализация
    componentDidMount() {
        $(document).ready(function () {
            $('.slider-slick').not('.slick-initialized').slick({
                arrows: false,
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
                variableWidth: true,
                variableHeight: true
            });

        });
    }

    render() {
        return (
            <div className={styles.slider}>
                <div className="slider-slick">
                    <div>
                        <a className="" href="#">
                            <img className={styles.slider__slider_img} src="img/slider/slider-1-lg-1920_600.jpg" alt="image"/>
                        </a>
                    </div>
                    <div>
                        <a className="" href="#">
                            <img className={styles.slider__slider_img} src="img/slider/slider-2-lg-1920_600.jpg" alt="image"/>
                        </a>
                    </div>
                    <div>
                        <a className="" href="#">
                            <img className={styles.slider__slider_img} src="img/slider/slider-3-lg-1920_600.jpg" alt="image"/>
                        </a>
                    </div>
                    <div>
                        <a className="" href="#">
                            <img className={styles.slider__slider_img} src="img/slider/slider-4-lg-1920_600.jpg" alt="image"/>
                        </a>
                    </div>
                    <div>
                        <a className="" href="#">
                            <img className={styles.slider__slider_img} src="img/slider/slider-5-lg-1920_600.jpg" alt="image"/>
                        </a>
                    </div>
                </div>
            </div>
        )
    }
};




