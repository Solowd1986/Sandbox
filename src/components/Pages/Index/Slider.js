import React, {Component} from "react";
import styles from "./slider.module.scss";
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";

import $ from "jquery";
import "slick-carousel/slick/slick.min";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


class Slider extends Component {

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
                    {this.props.slider.map((item, i) => {
                        return (
                            <div key={i}>
                                <NavLink className="" to={"/category/phones"}>
                                    <img
                                        className={styles.img}
                                        src={`${item.imgPrefix}/slider/${item.imgFullPath}`}
                                        alt={item.imgAlt}/>
                                </NavLink>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        slider: state.db.slider
    }
}

export default connect(mapStateToProps)(Slider)


