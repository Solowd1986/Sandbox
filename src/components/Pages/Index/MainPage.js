import React, {Component} from "react";
import Slider from "./Slider";
import Promo from "./Promo";
import BrandStory from "./BrandStory";
import Announcements from "./Announcements";
import About from "./About";
import PromoBadge from "../../Core/PromoBadge/PromoBadge";
import Layout from "../../Core/Layout/Layout";
import { connect } from "react-redux";

class MainPage extends Component {
    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {
        if (!this.props.initialData) return null;
        return (
            <Layout>
                <Slider/>
                <Promo/>
                <BrandStory/>
                <Announcements/>
                <About/>
                <PromoBadge/>
            </Layout>
        )
    }
}


function mapStateToProps(state) {
    return {
        initialData: state.db.index,
    }
}

export default connect(mapStateToProps)(MainPage);




