import React, { Component } from "react";
import Error400 from "../../Pages/Error400/Error400";


class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        //logErrorToMyService(error, errorInfo);
        console.log('Catch Bound Error');

    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <Error400/>
        }
        return this.props.children;
    }
}

export default ErrorBoundary;


