import React, {Component} from "react";

import Slider from "./Slider";
import Promo from "./Promo";
import BrandStory from "./BrandStory";
import Announcements from "./Announcements";
import About from "./About";
import PromoBadge from "../../PromoBadge/PromoBadge";
import Evaluate from "../../test/Evaluate";

import Layout from "../../Core/Layout/Layout";

export default class MainPage extends Component {
    render() {
        return (
            <Layout>
                <Slider/>

                {/*<Evaluate/>*/}

                <Promo/>
                <BrandStory/>
                <Announcements/>
                <About/>
                <PromoBadge/>
            </Layout>
        )
    }
}





