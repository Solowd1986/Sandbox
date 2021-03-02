import React, { Component } from "react";


const withHoc = (Component) => (

    class extends Component {
        calc = () => {
            console.log('calc from HOC');
        };

        componentDidMount() {
            console.log('props', this.props);

            console.log('hello from HOC');

        }

        render() {

            return (
                <Component {...this.props}/>

            )
        }
    }
);


class Base extends Component {
    componentDidMount() {
        console.log('hello from Base');
    }

    render() {
        console.log(this.props);

        return (
            <div>hello from baase</div>
        )
    }
}

export default withHoc(Base);


