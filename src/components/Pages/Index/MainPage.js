import React, { Component } from "react";
import styles from "@components/Pages/Index/promo.module.scss";

import Slider from "./Slider";
import Promo from "./Promo";
import BrandStory from "./BrandStory";
import Announcements from "./Announcements";
import About from "./About";
import PromoBadge from "../../Partials/PromoBadge/PromoBadge";

import withModal from "@components/Helpers/Hoc/withModal/withModal";
import Spinner from "@components/Partials/Spinner/Spinner";

import * as serverActions from "@redux/entities/db/actions";
import { connect } from "react-redux";

class MainPage extends Component {
    componentDidMount() {
        this.props.fetchPageData(this.props);
    }

    render() {
        const SpinnerModal = withModal(Spinner, { bg: false, interactionsDisabled: true });
        if (!this.props.index) return <SpinnerModal/>;
        return (
            <>
                <Slider/>
                <Promo index={this.props.index}/>
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
        index: state.db.index,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchPageData: (params) => {
            dispatch(serverActions.fetchPageData(params));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);





