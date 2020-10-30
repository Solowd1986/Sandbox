import React, {Component} from "react";
import Style from "./index.module.scss";

import Slider from "./Slider";
import Promo from "./Promo";
import BrandStory from "./BrandStory";
import Announcements from "./Announcements";
import About from "./About";
import PromoBadge from "../../PromoBadge/PromoBadge";
import Evaluate from "../../test/Evaluate";

export default class MainPage extends Component {
    render() {
        return (
            <>
                <Slider/>
                <Evaluate/>
                <Promo/>
                <BrandStory/>
                <Announcements/>
                <About/>
            </>
        )
    }
}




