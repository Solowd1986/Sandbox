import React, { Component } from "react";
import common from "~scss/common.module.scss";
import styles from "./category.module.scss";
import Layout from "~components/Core/Layout/Layout";
import { connect } from "react-redux";
import * as utils from "../../Core/Modal/helpers/functions";
import * as server from "../../../redux/entities/db/actions";
import CategoryProductsList from "./CategoryProductsList";
import BlockOverlay from "../../Core/Modal/BlockOverlay/BlockOverlay";
import { List } from "immutable";


class Category extends Component {
    constructor(props) {
        super(props);
        //console.log(this.props);
        this.state = {
            categoryProductsList: null,
            lastIndex: 0
        };

        this.props.fetchPageData(this.props);
    }


    static getDerivedStateFromProps(props, state) {
        // это нужно чтобы при переходе по мольному скроллу как при создании компонента категории так и при обновлении
        // при переходам по сссылкам, кажыдй раз сбрасывался отступ и запрет прокрутки.
        utils.removeScrollbarOffset();
        return null
    }


    sortDataList = (evt, dataList = this.state.categoryProductsList.data, sortType = this.props.sortType) => {
        if (!dataList) return;
        const cloneDeep = require('lodash.clonedeep');
        let data = cloneDeep(dataList);

        switch (sortType) {
            case "по популярности": {
                break;
            }
            case "по возрастанию цены": {
                data.sort((a, b) => a.price - b.price);
                break;
            }
            case "по убыванию цены": {
                data.sort((a, b) => b.price - a.price);
                break;
            }
            case "по новизне": {
                break;
            }
            case "по скидкам": {
                break;
            }
        }
        this.setState(state => ({ categoryProductsList: { ...this.state.categoryProductsList, data } }));
    };

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        if (prevProps.sortType !== this.props.sortType) {
            this.sortDataList();
        }

        const isThisInitialSetState = !this.state.categoryProductsList;

        const currentCategoryAlias = !isThisInitialSetState && this.state.categoryProductsList.main.alias;
        const nextCategoryAlias = !isThisInitialSetState && this.props.category.main.alias;

        const currentRoute = prevProps.match.params.type;
        const nextRoute = this.props.match.params.type;



        if (isThisInitialSetState) {
            this.setState({
                categoryProductsList: this.props.category
            })
        }


        //ADD SMOOTH SCROLL BOTTOM
        if (this.props.lastIndex > 0 && this.state.lastIndex !== this.props.lastIndex) {
            //console.log(1);

            //window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
            //window.scrollTo(20000, 20000);
        }

        // lazy load
        if (!isThisInitialSetState && this.props.lazy && this.state.lastIndex !== this.props.lastIndex) {
            const cloneDeep = require('lodash.clonedeep');
            let data = cloneDeep(this.props.lazy);

            this.setState({
                lastIndex: this.props.lastIndex,
                categoryProductsList: {
                    main: this.state.categoryProductsList.main,
                    data: [...this.state.categoryProductsList.data, ...data]
                }
            })
        }


        if (currentRoute !== nextRoute) {

            const { match: { path: route, params: data }, history } = this.props;
            console.log(route);
            console.log(data);
            console.log(history);

            this.props.fetchPageData(this.props);
            //this.props.fetchCategoryProducts(nextRoute);
        }


        // Такая проверка потому:
        // 1. isThisInitialSetState - проверяем, не первый ли это вход в компонент
        // 2. currentCategoryAlias - это alias для стейта, на основе него и рисуется содержимое
        // 3. Он не доложен быть равен руту следующему, который приходит по клику в пропсах
        // Еслии првоерку остановить тут, пока будет идти запрос на сервер, тут условие все еще будет выполняться
        /**
         * И это вызовет переполнение стека. Поэтому идет вторая проверка: алиас со стейта должен стать равен алиса с пропсов
         * ЭЭто укажет, что стейет был установлен по факту.
         * это сработает когда свреху заданный запрос спровоцирует оотвт и он придет, и вот этих просах пришедних алиас
         * не будет равен текущшему алис из стейт и это вызовет смену. А потмо еще раз суюда придем и в это условие
         * уже не попадем
         * ловим омент когда категория уже пришла, до тэого категория остается той же что была для текущей версии, той что видим
         *
         */

        if (currentCategoryAlias !== nextRoute && currentCategoryAlias !== nextCategoryAlias) {
            this.setState({
                categoryProductsList: this.props.category
            })
        }
    }

    componentWillUnmount() {
        this.setState((state) => {
            return {
                ...state,
                categoryProductsList: null,
                lastIndex: 0
            }
        })
    }


    render() {
        /**
         *
         * 1. Как только пришли, конструктор создает запрос и формирует начальный state
         * 2. В рендер стейт пуст, значит выводим спиннер.
         * 3. Данные пришли, рендер, стейт все еще пуст, но в DidUpdate меняет стейт
         *
         *
         * Тут выполняются три проверки:
         * 1. Первый рендер компонента: спиннер показывает пока стейт пуст, а потом показывается категория
         * 2. Второй рендер это получение свойств. Стейст уже есть.
         * Человек нажал на ссылку, пришли пропсы, перед првоеркой забрали алиас стейста, например phones
         * Сравниил: алисас стейста равен пропсам - нет, значит спиннер. А в дидапдейт вызвали запрос данных.
         * Данные пришли, сравниваем: алисас стейста все еще не равен пропсам. Потому что новые данные покатегории пришли
         * но еещ не записаны в стейст, опять спиннер. В дидапдейст ставим новый стейст и вызываем ре-рендер
         * Приходитм опять сюда: алиас стейста равен пропсам пути (пута) - проверка пройдена, отрисовываем категоирю
         *
         */

        const isProductsListEmpty = !this.state.categoryProductsList;
        const alias = isProductsListEmpty ? null : this.state.categoryProductsList.main.alias;

        if (isProductsListEmpty || alias !== this.props.match.params.type) {
            return <BlockOverlay/>;
        } else {
            const { main: category, data: products } = this.state.categoryProductsList;
            return <CategoryProductsList category={category} products={products}/>;
        }
    }
}


const mapStateToProps = (state) => {
    return {
        category: state.db.category,
        sortType: state.sort.sortType,
        lazy: state.db.lazy,
        lastIndex: state.db.lastIndex
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPageData: (params) => {
            dispatch(server.fetchPageData(params));
        },
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Category);



