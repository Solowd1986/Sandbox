import React, {Component} from "react";
import Style from "./index.module.scss";

import Slider from "./Slider";
import Promo from "./Promo";
import BrandStory from "./BrandStory";
import Announcements from "./Announcements";
import About from "./About";
import Wrapper from "../../Core/Wrapper/Wrapper";

export default class MainPage extends Component {
    render() {
        return (
            <>
                <Wrapper type={"section"}/>
                <Slider/>
                <Promo/>
                <BrandStory/>
                <Announcements/>
                <About/>
            </>
        )
    }
}




