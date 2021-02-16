import React, { Component } from "react";
import Slider from "./Slider";
import Promo from "./Promo";
import BrandStory from "./BrandStory";
import Announcements from "./Announcements";
import About from "./About";
import PromoBadge from "../../Core/PromoBadge/PromoBadge";
import Spinner from "../../Core/Modal/Spinner/Spinner";
import { connect } from "react-redux";
import * as server from "../../../redux/entities/db/actions";


class MainPage extends Component {
    constructor(props) {
        super(props);
        //console.log('con');
        //console.log(this.props);
        //this.props.getData();
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {
        //console.log(this.props);
        //if (!this.props.index) return <Spinner/>;
        return (
            <>
                <Slider/>
                <Promo/>
                <BrandStory/>
                <Announcements/>
                <About/>
                <PromoBadge/>
            </>
        )
    }
}


function mapStateToProps(state) {
    return {
        initialData: state.db.index,
        index: state.db.index,
    }
}


export default connect(mapStateToProps)(MainPage);




