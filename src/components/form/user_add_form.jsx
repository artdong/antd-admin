import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Form, Input, Select, Button, Spin } from 'antd';

import { formItemLayout } from '../../common/const';

const FormItem = Form.Item;
const Option = Select.Option;
const TextArea = Input.TextArea;

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
        const { form, onCloseModal, loading, userInfo } = this.props;
        const { getFieldDecorator } = form;
        return (
            <Spin spinning={loading}>
                <Form onSubmit={this.handleSubmit}>
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
                                    initialValue: userInfo && userInfo.gender || ''
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
                                label='年龄'
                                {...formItemLayout}
                            >
                                {getFieldDecorator('age', {
                                    initialValue: userInfo && userInfo.age || 0
                                })(
                                    <Input/>
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
                                    initialValue: userInfo && userInfo.tel || ''
                                })(
                                    <Input/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row className="m-b">
                        <div className="text-right">
                            <Button className="m-l" onClick={() => {onCloseModal();}}>取消</Button>
                            <Button className="m-l" type="primary" htmlType="submit" loading={false}>确定</Button>
                        </div>    
                    </Row>
                </Form>
            </Spin>
        );
    }
}

UserAdd.propTypes = {
    form: PropTypes.object.isRequired,
    onCloseModal: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    userInfo: PropTypes.object
};

export default Form.create()(UserAdd);