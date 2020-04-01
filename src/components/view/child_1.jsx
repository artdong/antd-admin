import React, { Component } from 'react';
import PropTypes from 'prop-types';

// import {EventEmitter2} from 'eventemitter2';
// const emitter = new EventEmitter2();

import emitter from '../../services/event';
import emitter2 from '../../services/event2';

//子组件
class Child1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '子组件1',
            parentName: props.parentName
        };
        this.props.triggerRef(this);
        this.changeName = this.changeName.bind(this);
        
        emitter2.on('changeFirstName', this.changeName);
    }

    componentDidMount() {
        // this.eventEmitter = emitter.addListener('changeFirstName', (msg) => {
        //     global.console.log(msg);
        //     this.changeName(msg);
        // });
    }

    componentWillUnmount() {
        emitter.removeListener(this.eventEmitter);
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