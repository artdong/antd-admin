import React, { Component } from 'react';
import PropTypes from 'prop-types';

//子组件
class Child1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '子组件1',
            parentName: props.parentName
        };
        this.props.triggerRef(this);
    }

    componentDidMount() {
    }

    // 这是子组件的方法
    getValuefromChild() {
        global.console.log('child1 method called by parent.');
    } 

    render() {
        const { name, parentName } = this.state;
        // const { parentName } = this.props;

        return <div>I am {name}, parent is {parentName}</div>;
    }

    changeName(name) {
        this.setState({
            name
        });
    }
}

Child1.propTypes = {
    parentName: PropTypes.string,
    triggerRef: PropTypes.func,
};

export default Child1;