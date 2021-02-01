import React, { Component } from "react";
import styles from "./product-slider.module.scss"

class ProductSlider extends Component {
    constructor(props) {
        super(props);
        this.slideTransitionEnabled = false;
        this.mainImgRef = React.createRef();
        this.listSmallImgRef = React.createRef();
    }

    componentDidMount() {
        Array.from(this.listSmallImgRef.current.children)
            .find(item => item.src === this.mainImgRef.current.src)
            .classList.add(styles.active);
    }


    slider = (evt) => {
        const target = evt.target;
        const mainImg = this.mainImgRef.current;
        if (mainImg.src === target.src || this.slideTransitionEnabled) return;
        this.slideTransitionEnabled = true;

        Array.from(this.listSmallImgRef.current.children).forEach(item => item.classList.remove(styles.active));
        target.classList.add(styles.active);

        mainImg.classList.add("animate__fadeOutLeft", "animate__animated", "animate__faster");
        mainImg.addEventListener("animationend", () => {
            mainImg.src = target.src;
            mainImg.classList.remove("animate__fadeOutLeft", "animate__animated", "animate__faster");
            mainImg.classList.add("animate__fadeIn", "animate__animated", "animate__faster");
            this.slideTransitionEnabled = false;
        });
    };

    render() {
        const { prefix, imgList, alt } = this.props;
        return (
            <div className={styles.order__img_wrapper}>
                <img
                    ref={this.mainImgRef}
                    className={styles.order__img}
                    src={`${prefix}/${imgList[0]}`}
                    alt={alt}
                />

                <div className={styles.slider} ref={this.listSmallImgRef}>
                    {imgList.map(item => (
                        <img key={item} width="60" height="60"
                             onClick={this.slider}
                             className={styles.img}
                             src={`${prefix}/${item}`}
                             alt={alt}
                        />
                    ))}
                </div>
            </div>
        )
    }
}

export default ProductSlider;

