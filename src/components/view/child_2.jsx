import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

// import emitter from '../../services/event';
import emitter2 from '../../services/event2';

//子组件
class Child2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '子组件2',
            parentName: props.parentName
        };
        this.props.triggerRef && this.props.triggerRef(this);
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

        return <div>
            <div>I am {name}, parent is {parentName}</div>
            <div className="m-t">
                <Button type="primary" onClick={this.btnClick1} >修改子组件1的名称</Button>
            </div>
        </div>;
    }

    btnClick1() {
        // emitter.emit('changeFirstName', 'child1_1');
        emitter2.emit('changeFirstName', 'child1_2');
    }
}

Child2.propTypes = {
    parentName: PropTypes.string,
    triggerRef: PropTypes.func,
};

export default Child2;