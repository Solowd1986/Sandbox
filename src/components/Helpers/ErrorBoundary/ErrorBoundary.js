import React, { Component } from "react";
import Error400 from "@components/Pages/Error/Error400/Error400";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.log('Catch Bound Error. \nLog:');
        console.log(errorInfo.componentStack);
    }

    render() {
        if (this.state.hasError) {
            return <Error400/>
        }
        return this.props.children;
    }
}

export default ErrorBoundary;


