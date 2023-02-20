import React, {Component} from 'react';
import { Button, Row } from 'antd';

import Child1 from './../components/view/child_1.jsx';
import Child2 from './../components/view/child_2.jsx';

// 父组件
export default class Parent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '父组件A'
        };
        this.bindRef = this.bindRef.bind(this);
        this.btnClick = this.btnClick.bind(this);
        this.btnClick2 = this.btnClick2.bind(this);
        this.btnClick3 = this.btnClick3.bind(this);
        this.btnClick4 = this.btnClick4.bind(this);
        this.btnClick5 = this.btnClick5.bind(this);
        this.changeName = this.changeName.bind(this);
    }

    componentDidMount() {
    }

    render() {
        const { name } = this.state;
        return(
            <div>
                <p>I am {name}</p>
                <p>正在操作的子组件名称：{this.child.state.name || ''}</p>
                <Child1 triggerRef={this.bindRef} parentName={name}/>
                <Child2 parentName={name}/>
                <Row className="m-t">
                    <Button type="primary" onClick={this.btnClick} >调用子组件1的方法</Button>
                </Row>
                <Row className="m-t-lg">
                    <Button type="primary" onClick={this.btnClick2} >获取子组件1的属性</Button>
                </Row>
                <Row className="m-t-lg">
                    <Button type="primary" onClick={this.btnClick3} >更改子组件的名称为child1</Button>
                </Row>
                <Row className="m-t-lg">
                    <Button type="primary" onClick={this.btnClick5} >更改子组件的名称为child2</Button>
                </Row>
                <Row className="m-t-lg">
                    <Button type="primary" onClick={this.btnClick4} >更改父组件的名称为父组件B</Button>
                </Row>
            </div>
        );
    }

    bindRef(ref) { 
        this.child = ref;
    }

    btnClick() {
        this.child.getValuefromChild();
    }

    btnClick2() {
        let name = this.child.state.name;
        global.console.log('my name is ' + name);
    }

    btnClick3() {
        this.changeName('child1');
    }

    btnClick4() {
        this.setState({
            name: '父组件B'
        });
        this.child.setState({
            parentName: '父组件B'
        });
    }

    btnClick5() {
        this.child.changeName('child2');
    }

    changeName(name) {
        this.child.setState({
            name: name
        });
    }
}