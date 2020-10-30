import React from "react";
import styles from "./slider.module.scss";


const Slider = props => {

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
};

export default Slider;


