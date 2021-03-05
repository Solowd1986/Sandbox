import React, { Component } from "react";

import CategoryProductsList from "./CategoryProductsList/CategoryProductsList";
import Spinner from "@components/Partials/Spinner/Spinner";
import withModal from "@components/Helpers/Hoc/withModal/withModal";

import * as utils from "@components/Helpers/Functions/functions";
import * as serverActions from "@redux/entities/db/actions";
import { connect } from "react-redux";

import { List } from "immutable";


class Category extends Component {

    state = {
        categoryProductsList: null,
        lastIndex: 0
    };


    // static getDerivedStateFromProps(props, state) {
    //     // это нужно чтобы при переходе по мольному скроллу как при создании компонента категории так и при обновлении
    //     // при переходам по сссылкам, кажыдй раз сбрасывался отступ и запрет прокрутки.
    //     //utils.removeScrollbarOffset();
    //     return null
    // }


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
        // так мы сохраняем блок main и заменяем блок data, в state categoryProductsList состоит из двух полей
        this.setState(state => ({ categoryProductsList: { ...this.state.categoryProductsList, data } }));
    };


    componentDidMount() {
        this.props.fetchPageData(this.props);
    }



    componentDidUpdate(prevProps, prevState, snapshot) {

        // блок сортировки
        if (prevProps.sortType !== this.props.sortType) {
            this.sortDataList();
        }


        const isThisInitialSetState = !this.state.categoryProductsList;

        const currentCategoryAlias = !isThisInitialSetState && this.state.categoryProductsList.main.alias;
        const nextCategoryAlias = !isThisInitialSetState && this.props.category.main.alias;

        const currentRoute = prevProps.match.params.type;
        const nextRoute = this.props.match.params.type;


        // блок первого выставления стейт
        if (isThisInitialSetState) {
            this.setState({
                categoryProductsList: this.props.category
            })
        }


        // если индекс изменялся и стейт уравнялся с пропсами, то есть данные показаны и отрендерены - тогда проматываем
        if (this.props.lastIndex > 0 && this.state.lastIndex === this.props.lastIndex) {
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
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


        // блок запуска запроса данных при разных рутах
        if (currentRoute !== nextRoute) {

            const { match: { path: route, params: data }, history } = this.props;
            //console.log(route);
            //console.log(data);
            //console.log(history);

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
        this.setState({
            categoryProductsList: null,
            lastIndex: 0
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
            //console.log('ren');
        const isProductsListEmpty = !this.state.categoryProductsList;
        const alias = isProductsListEmpty ? null : this.state.categoryProductsList.main.alias;

        if (isProductsListEmpty || alias !== this.props.match.params.type) {
            const SpinnerModal = withModal(Spinner, { bg: false, interactionsDisabled: true });
            return <SpinnerModal/>;
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
            dispatch(serverActions.fetchPageData(params));
        },
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Category);



