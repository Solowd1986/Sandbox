import React, {Component} from "react";
import styles from "./lazy-load.module.scss"
import Overlay from "../Overlay/Overlay";
import actions from "../../../redux/actions";
import {connect} from "react-redux";
import {func} from "prop-types";


class LazyLoad extends Component {
    constructor(props) {
        super(props);
        //this.uri = "";
        //this.numberOfElements = 3;
        //this.parentElement = this.props.parent;
        //this.innerElementType = this.props.element || "li";
        //this.innerElementClassList = this.props.classList || [];
    }

    initRequest = (getDataBtn) => {
        let timeoutExceeded = false;
        const controller = new AbortController();
        const signal = controller.signal;

        /**
         * timeoutExceeded переводится в true по истечении таймера, так как controller.abort() приведет б лок catch
         * Там, если время истекло, а не просто пользователь отменил, то выведем ошибку об ответе сервера
         */
        setTimeout(() => {
            timeoutExceeded = true;
            controller.abort()
        }, 5000);

        let overlay = new Overlay();
        overlay.node.addEventListener("click", function (evt) {
            controller.abort();
        });

        fetch(
            `api/${this.props.categoryName}/id/${this.props.lastIndex}/amount/${this.props.amountOfElements}`,
            { signal })
            .then((res) => res.json().then(responce => {
                getDataBtn.classList.remove(styles.active);
                overlay.destroy();

                if (responce.length === 0) {
                    getDataBtn.remove();
                }
                const div = document.createElement("div");
                div.innerHTML = "Block";
                div.classList.add(styles.data_block);
                const parentElement = document.querySelector(`.${styles.data_wrapper}`);
                parentElement.append(div);


                const category = this.props.db.find(category => category.categoryAlias === this.props.categoryName);


                // длина массива не больше максимума, так как если максимальное количество элементов равно 4, то длина
                // результирующего массива не 4, а 3, из-за индексации, то есть проверка length пойдет как:
                // 0 -> add el1 -> 1 -> add el2 -> 2 -> add el3 -> 3 -> add el4 -> exit

                function getRandom(array, maxAmount) {
                    const result = [];
                    while (result.length < maxAmount) {
                        const index = Math.trunc(Math.random() * array.length);
                        !result.includes(array[index]) && result.push(array[index]);
                    }
                    return result;
                }

                const result = getRandom(category.productList, this.props.amountOfElements);
                result.forEach(item => item.key = Math.floor(Math.random() * 10000));
                //console.log(result);


                const lastIndex = Math.floor(Math.random() * 10);
                const cat = this.props.categoryName;
                this.props.setServerData({ arrayOfElements: result, cat, lastIndex });

            })).catch(err => {
            overlay.destroy();
            getDataBtn.classList.remove(styles.active);
            timeoutExceeded && getDataBtn.classList.add(styles.error);
            console.log("abort from catch");
        });
    };

    loadHandler = (evt) => {
        const getDataBtn = evt.currentTarget;
        getDataBtn.classList.add(styles.active);
        getDataBtn.classList.remove(styles.error);
        this.initRequest(getDataBtn);
    };

    render() {
        //console.log(this.props);

        return (
            <div className={styles.data_wrapper}>
                {this.props.children}
                <button onClick={this.loadHandler} className={styles.more}>
                    <svg
                        className={styles.loader}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 489.711 489.711"
                        width={28}
                        height={28}>
                        <g fill="#c51abb">
                            <path
                                d="M112.156 97.111c72.3-65.4 180.5-66.4 253.8-6.7l-58.1 2.2c-7.5.3-13.3 6.5-13 14 .3 7.3 6.3 13 13.5 13h.5l89.2-3.3c7.3-.3 13-6.2 13-13.5v-1-.6l-3.3-88.2c-.3-7.5-6.6-13.3-14-13-7.5.3-13.3 6.5-13 14l2.1 55.3c-36.3-29.7-81-46.9-128.8-49.3-59.2-3-116.1 17.3-160 57.1-60.4 54.7-86 137.9-66.8 217.1 1.5 6.2 7 10.3 13.1 10.3 1.1 0 2.1-.1 3.2-.4 7.2-1.8 11.7-9.1 9.9-16.3-16.8-69.6 5.6-142.7 58.7-190.7zM462.456 195.511c-1.8-7.2-9.1-11.7-16.3-9.9-7.2 1.8-11.7 9.1-9.9 16.3 16.9 69.6-5.6 142.7-58.7 190.7-37.3 33.7-84.1 50.3-130.7 50.3-44.5 0-88.9-15.1-124.7-44.9l58.8-5.3c7.4-.7 12.9-7.2 12.2-14.7s-7.2-12.9-14.7-12.2l-88.9 8c-7.4.7-12.9 7.2-12.2 14.7l8 88.9c.6 7 6.5 12.3 13.4 12.3.4 0 .8 0 1.2-.1 7.4-.7 12.9-7.2 12.2-14.7l-4.8-54.1c36.3 29.4 80.8 46.5 128.3 48.9 3.8.2 7.6.3 11.3.3 55.1 0 107.5-20.2 148.7-57.4 60.4-54.7 86-137.8 66.8-217.1z"/>
                        </g>
                    </svg>
                    <span>Показать больше товаров</span>
                </button>
            </div>
        )
    }
}

function getProps(state) {
    return {
        lastIndex: state.lazyload.indexOfLastAddedElement,
        amountOfElements: state.lazyload.numberOfRequestedElements,
        db: state.db.category
    }
}


function setDispatch(dispatch) {
    return {
        setServerData: (data) => {
            dispatch(actions.lazyload.setServerData(data));
        },
    }
}


export default connect(getProps, setDispatch)(LazyLoad);






