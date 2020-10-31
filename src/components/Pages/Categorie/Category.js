
import React, {Component} from "react";
import styles from "./category.module.scss";
import PhonesCategory from "./PhonesCategory";
import OtherCategory from "./OtherCategory";

export default class Category extends Component {
    render() {
        return (
            <>
                {this.props.match.params.type === "phones" ? <PhonesCategory/> : <OtherCategory/>}
            </>
        )
    }
}
