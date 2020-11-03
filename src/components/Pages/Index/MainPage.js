import React, {Component, useState} from "react";

import Slider from "./Slider";
import Promo from "./Promo";
import BrandStory from "./BrandStory";
import Announcements from "./Announcements";
import About from "./About";
import PromoBadge from "../../PromoBadge/PromoBadge";
import Evaluate from "../../test/Evaluate";
import PropTypes from 'prop-types';


class DataSet extends Component {

    state = {
        users: [
            { name: 'bob' }
        ],
        products: [
            {
                id: 1,
                title: "Samsung",
                price: 12000,
                quantity: 2,
                total: 21
            },
            {
                id: 2,
                title: "IPhone",
                price: 56000,
                quantity: 4,
                total: 15
            },
            {
                id: 3,
                title: "Nokia",
                price: 34110,
                quantity: 1,
                total: 50
            },
        ]
    };

    changer = (obj) => {
        console.log(obj);
        const index = this.state.products.indexOf(obj);

        const base = this.state;
        base.products[index] = obj;

        this.setState(base);
        console.log(this.state);


        //return this.state.products;
    };


    render() {
        return (
            <Comp title={'order'} min={1} max={10} products={this.state.products} changer={this.changer}/>
        )
    }
}


class Comp extends Component {

    static propTypes = {
        title: PropTypes.string.isRequired
    };


    handleChanger = (e) => {
        console.log(e.target.value);
    };

    dec = (e, i) => {
        //console.log('e -', e);
        //console.log('i -', i);

        const obj = this.props.products.find(item => item.id === i);
        //obj.quantity = obj.quantity - 1;
        obj.quantity = Math.max(this.props.min, Math.min(this.props.max, obj.quantity - 1));
        this.props.changer(obj);
    };

    inc = (e, i) => {
        const obj = this.props.products.find(item => item.id === i);
        //obj.quantity = obj.quantity + 1;
        obj.quantity = Math.max(this.props.min, Math.min(this.props.max, obj.quantity + 1));
        this.props.changer(obj);
    };

    render() {

        const styleLi = { display: 'flex', padding: '10px', marginRight: '15px' };
        const styleP = { marginRight: '15px' };
        const styleInput = { padding: "5px 10px" };

        const list = this.props.products.map((item, i) => {
            return (
                <div key={i}>
                    <li style={i % 2 !== 0 ? { backgroundColor: 'lightgrey', ...styleLi } : { backgroundColor: 'white', ...styleLi }}>
                        <p style={styleP}>title: {item.title}|</p>
                        <p style={styleP}>quantity: {item.quantity}|</p>

                        <button onClick={(evt) => this.dec(evt, item.id)} style={{ padding: "5px 10px" }}>-</button>
                        <input onChange={this.handleChanger} style={styleInput} type="text" value={item.quantity}/>
                        <button onClick={(evt) => this.inc(evt, item.id)} style={{ padding: "5px 10px" }}>+</button>

                        <p style={styleP}>total price: {item.price * item.quantity}</p>
                    </li>
                    <hr/>
                </div>
            )
        });

        return (
            <>
                {this.props.title}
                <ul>
                    {list}
                </ul>
                <p>Total:</p>
            </>
        )
    }
}


export default class MainPage extends Component {

    render() {
        return (
            <>
                <Slider/>

                <DataSet/>

                <Evaluate/>

                <Promo/>
                <BrandStory/>
                <Announcements/>
                <About/>
                <PromoBadge/>
            </>
        )
    }
}





