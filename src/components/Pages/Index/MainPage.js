import React, { Component } from "react";

import Slider from "./Slider";
import Promo from "./Promo";
import BrandStory from "./BrandStory";
import Announcements from "./Announcements";
import About from "./About";
import PromoBadge from "../../Partials/PromoBadge/PromoBadge";

import withModal from "@components/Helpers/Hoc/withModal/withModal";
import Spinner from "@components/Partials/Spinner/Spinner";

import * as serverActions from "@redux/entities/server/actions";
import * as serverSelectors from "@redux/entities/server/selectors/serverSelectors";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class MainPage extends Component {
    componentDidMount() {
        this.props.fetchPageData(this.props);
    }

    render() {
        const SpinnerModal = withModal(Spinner, { bg: false, interactionsDisabled: true, fixed: true });
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
        index: serverSelectors.serverIndexSelector(state),
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchPageData: (params) => {
            dispatch(serverActions.fetchPageData(params));
        },
    }
}

//const mapDispatchToProps = (dispatch) => ({ ...bindActionCreators(serverActions.fetchPageData, dispatch) });
export default connect(mapStateToProps, mapDispatchToProps)(MainPage);





