import React, {Component} from "react";
import Style from "./index.module.scss";

import Slider from "./Slider";
import Promo from "./Promo";
import BrandStory from "./BrandStory";
import Announcements from "./Announcements";
import About from "./About";
import PromoBadge from "../../PromoBadge/PromoBadge";

export default class MainPage extends Component {
    render() {
        return (
            <>
                <Slider/>
                <Promo/>
                <BrandStory/>
                <Announcements/>
                <About/>
            </>
        )
    }
}




