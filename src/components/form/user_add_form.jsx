import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Form, Input, Select, Button, InputNumber } from 'antd';

import { formItemLayout } from '../../common/const';
import { getEnumsArray } from '../../common/tool';
import UserEnums from '../../enums/user';

const FormItem = Form.Item;
const Option = Select.Option;

class UserAdd extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        const { form, onSubmit } = this.props;
        if(e) e.preventDefault();
        form.validateFields((err, values) => {
            if (err) return;
            onSubmit(values);
        });
    }

    render() {
        const { form, onCloseModal, userInfo } = this.props;
        const { getFieldDecorator } = form;
        return (
            <Form onSubmit={this.handleSubmit}>
                {
                    userInfo && userInfo.userId ?
                        <Row className="m-b">
                            <Col span={24}>
                                <FormItem
                                    label='用户Id'
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('userId', {
                                        rules: [{ 
                                            required: true, 
                                            message: '用户Id不能为空！'
                                        }],
                                        initialValue: (userInfo && userInfo.userId) || ''
                                    })(
                                        <Input disabled/>
                                    )}
                                </FormItem>
                            </Col>
                        </Row> : null
                }
                
                <Row className="m-b">
                    <Col span={24}>
                        <FormItem
                            label='昵称'
                            {...formItemLayout}
                        >
                            {getFieldDecorator('userName', {
                                rules: [{ 
                                    required: true, 
                                    message: '昵称不能为空！'
                                }],
                                initialValue: (userInfo && userInfo.userName) || ''
                            })(
                                <Input/>
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row className="m-b">
                    <Col span={24}>
                        <FormItem
                            label='性别'
                            {...formItemLayout}
                        >
                            {getFieldDecorator('gender', {
                                initialValue: userInfo && userInfo.gender >= 0 ? userInfo.gender : ''
                            })(
                                <Select>
                                    <Option value=''>请选择</Option>
                                    <Option value={0}>男</Option>
                                    <Option value={1}>女</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row className="m-b">
                    <Col span={24}>
                        <FormItem
                            label='角色'
                            {...formItemLayout}
                        >
                            {getFieldDecorator('role', {
                                initialValue: (userInfo && userInfo.role) >= 0 ? userInfo.role.toString() : ''
                            })(
                                <Select>
                                    <Option value=''>请选择</Option>
                                    {getEnumsArray(UserEnums.roles).map((data, index) => {
                                        return (<Option value={data.value} key={index}>{data.text}</Option>);
                                    })}
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row className="m-b">
                    <Col span={24}>
                        <FormItem
                            label='年龄'
                            {...formItemLayout}
                        >
                            {getFieldDecorator('age', {
                                initialValue: (userInfo && userInfo.age) || 0
                            })(
                                <InputNumber min={0} max={150} className="wd-ten-percent"/>
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row className="m-b">
                    <Col span={24}>
                        <FormItem
                            label='手机号'
                            {...formItemLayout}
                        >
                            {getFieldDecorator('tel', {
                                initialValue: (userInfo && userInfo.tel) || ''
                            })(
                                <Input/>
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row className="m-b">
                    <div className="text-right">
                        <Button className="m-l" onClick={() => {onCloseModal();}}>取消</Button>
                        <Button className="m-l" type="primary" htmlType="submit">确定</Button>
                    </div>    
                </Row>
            </Form>
        );
    }
}

UserAdd.propTypes = {
    form: PropTypes.object.isRequired,
    onCloseModal: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    userInfo: PropTypes.object
};

export default Form.create()(UserAdd);