
import React, {Component} from "react";
import styles from "./category.module.scss";
import PhonesCategory from "./PhonesCategory";
import OtherCategory from "./OtherCategory";
import Layout from "../../Core/Layout/Layout";

export default class Category extends Component {
    render() {
        return (
            <Layout>
                {this.props.match.params.type === "phones" ? <PhonesCategory/> : <OtherCategory/>}
            </Layout>
        )
    }
}
