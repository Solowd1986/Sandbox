import React, {Component} from "react";
import Slider from "./Slider";
import Promo from "./Promo";
import BrandStory from "./BrandStory";
import Announcements from "./Announcements";
import About from "./About";
import PromoBadge from "../../Core/PromoBadge/PromoBadge";
import { connect } from "react-redux";

class MainPage extends Component {
    constructor(props) {
        super(props);
        //console.log('con');
        //console.log(this.props);
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {
        if (!this.props.initialData) return null;
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
    }
}

export default connect(mapStateToProps)(MainPage);




