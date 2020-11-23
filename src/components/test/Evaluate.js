import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";


const axios = require('axios').default;

// change path to build
// axios.get('/build/php/app.php').then(function (response) {
//     // handle success
//     console.log(response);
// }).catch(function (error) {
//     // handle error
//     console.log(error);
// })
//     .then(function () {
//         // always executed
//     });


class Cart extends Component {

    state = {
        users: [
            { name: 'bob' }
        ],
        products: [
            {
                id: 1,
                title: "Samsung",
                color: "green",
                price: 12000,
                imgPath: "./photo",
                quantity: 2,
                rest: 21
            },
            {
                id: 2,
                title: "IPhone",
                color: "red",
                price: 56000,
                imgPath: "./photo",
                quantity: 4,
                rest: 15
            },
            {
                id: 3,
                title: "Nokia",
                color: "black",
                price: 34110,
                imgPath: "./photo",
                quantity: 1,
                rest: 50
            },
        ]
    };

    // always on top of page, without smooth scroll
    componentDidMount() {
        window.scrollTo(0, 0)
    }


    changer = (id, quantity) => {

        const obj = this.state.products.find(item => item.id === id);

        if (isNaN(parseInt(quantity))) {
            return false;
        } else {
            obj.quantity = Math.max(1, Math.min(obj.rest, parseInt(quantity)));
            const products = [...this.state.products];
            products[this.state.products.indexOf(obj)] = obj;
            this.setState({ products });
        }
    };


    calcTotal = () => {
        return this.state.products.reduce((total, item) => {
            total += (item.price * item.quantity);
            return total;
        }, 0);
    };

    // 1. Создали копию массива товаров
    // 2. Удалили элемент, для этого узнали его индекс, передав на вход обьект, найденный по id.
    // 3. Заменили в обьекте state конкретный массив
    delete = (id) => {
        const products = [...this.state.products];
        products.splice(this.state.products.indexOf(products.find(item => item.id === id)), 1);
        this.setState({ products });
    };

    render() {

        const styleUl = { padding: "10px", margin: "10px" };


        return (
            <>
                <div style={{ margin: "0 auto" }}>
                    <h3>Links</h3>

                    <NavLink style={{ padding: "10px", backgroundColor: "lightgrey", marginRight: "10px" }}
                             to={"/"}>Main Page</NavLink>

                    <NavLink style={{ padding: "10px", backgroundColor: "lightgrey", marginRight: "10px" }}
                             to={"/category/phones"}>Phones Page</NavLink>

                    <NavLink style={{ padding: "10px", backgroundColor: "lightgrey", marginRight: "10px" }}
                             to={"/product/phones/12"}>Product Page</NavLink>

                    <NavLink style={{ padding: "10px", backgroundColor: "lightgrey", marginRight: "10px" }}
                             to={"/order"}>Order Page</NavLink>

                    <NavLink style={{ padding: "10px", backgroundColor: "lightgrey", marginRight: "10px" }}
                             to={"/error"}>Error Page</NavLink>
                </div>

                <ul style={styleUl}>
                    {this.state.products.map(item => {
                        return (
                            <li key={item.id}>
                                <CartItem
                                    min={1}
                                    max={item.rest}
                                    product={item}
                                    itemHandler={this.changer}
                                    deleteItem={this.delete}
                                />
                            </li>
                        )
                    })}
                </ul>
                <p>Total: {this.calcTotal()}</p>
            </>
        )
    }
}



class CartItem extends Component {

    static propTypes = {
        min: PropTypes.number.isRequired,
        max: PropTypes.number.isRequired,
        itemHandler: PropTypes.func.isRequired
    };
    defaul1tProps = "name";

    handleChanger = (e) => {
        console.log(e.target.value);
    };

    decreaseAmount = (e, id) => {
        this.props.itemHandler(id, this.props.product.quantity - 1);
    };

    increaseAmount = (e, id) => {
        this.props.itemHandler(id, this.props.product.quantity + 1);
    };

    deleteItem = (id) => {
        this.props.deleteItem(id);
    };


    render() {

        const styleLi = { display: 'flex', padding: '10px', marginRight: '15px' };
        const styleP = { marginRight: '15px' };
        const styleInput = { padding: "5px 10px" };

        return (
            <>
                <span style={styleLi}>
                    <p style={styleP}>title: {this.props.product.title}|</p>
                    <p style={styleP}>quantity: {this.props.product.quantity}|</p>





                    <button onClick={(evt) => this.decreaseAmount(evt, this.props.product.id)} style={{ padding: "5px 10px" }}>-</button>


                    <input
                        onChange={(evt) => this.handleChanger(evt)}
                        style={styleInput}
                        type="text"
                        value={this.props.product.quantity}
                    />

                    <button onClick={(evt) => this.increaseAmount(evt, this.props.product.id)} style={{ padding: "5px 10px" }}>+</button>

                    <p style={styleP}>total price: {this.props.product.price * this.props.product.quantity}</p>
                    <button onClick={() => this.deleteItem(this.props.product.id)} style={{ padding: "5px" }}>Delete</button>
                </span>
            </>
        )
    }
}


export default class Evaluate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            res: "none"
        }
    }


    names = { bob: "12" };

    handleChangeField = (e) => {
        //console.log("inp");
    };

    handleblurField = (e) => {
        this.setState({
            res: e.target.value
        })
    };

    handlerSend = (e) => {
        e.preventDefault();
    };

    render() {


        const ErrorState = props => {
            return (
                <p>
                    {props.children}
                </p>
            )
        };





        return (
            <div style={{ minWidth: "600px", margin: "30px auto 30px" }}>

                <ErrorState>Error</ErrorState>

                <Cart/>

                <div>

                    <button onClick={() => {
                        const modal = document.querySelector(".md-modal");

                        function calcScrollBarWidth() {
                            const windowWidth = window.innerWidth;
                            const documentWidth = document.documentElement.clientWidth;
                            return windowWidth - documentWidth;
                        }

                        const offset = calcScrollBarWidth();
                        if (offset > 0) {
                            console.log(12);

                            document.body.style.cssText = `padding-right: ${offset}px`
                        }
                        document.body.style.cssText += "overflow: hidden";

                        modal.classList.add("md-show");
                    }}>show
                    </button>

                    <div className="md-modal md-effect-1" id="modal-1">
                        <div className="md-content">
                            <h3>Модальное окно</h3>
                            <div>
                                <p>Это модальное окно. Вы можете делать следующие вещи с ним:</p>
                                <button className="md-close">Закрыть!</button>
                            </div>
                        </div>
                    </div>

                    <div onClick={() => {
                        const modal = document.querySelector(".md-modal");
                        modal.classList.remove("md-show");
                        document.body.style.removeProperty("padding-right");
                        document.body.style.removeProperty("overflow");
                    }} className="md-overlay"/>
                </div>

                <p>State: {this.state.res}</p>
                <form className="form" action="/" name="auth-form" method="POST">
                    <label style={{ marginRight: "20px" }} htmlFor="login">Login</label>
                    <input

                        onChange={this.handleChangeField}
                        onBlur={this.handleblurField}
                        style={{ padding: "10px", marginRight: "20px", backgroundColor: "lightgrey" }} type="text" name="login"
                        required
                    />

                    <input
                        style={{ padding: "10px" }}
                        onClick={this.handlerSend}
                        type="submit" name="auth-submit" value="Send"
                    />
                </form>
            </div>
        )
    }
}


