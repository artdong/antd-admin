import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Form, Input, DatePicker, Select, Button, Icon } from 'antd';
import moment from 'moment';

import { formItemLayout } from '../../common/const';
import { getEnumsArray } from '../../common/tool';
import UserEnums from '../../enums/user';

const FormItem = Form.Item;
const Option = Select.Option;

const { RangePicker } = DatePicker;

class UserListSearchForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            moreOption: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        const { onSubmit, form } = this.props;
        if(e) e.preventDefault();
        form.validateFields((err, values) => {
            if (err) return;            
            onSubmit(values);
        });
    }

    render() {
        const { form, defaultValue } = this.props;
        const { getFieldDecorator } = form;
        const { moreOption } = this.state;
        return (
            <Form onSubmit={this.handleSubmit} className="user-search-group">
                <Row className="m-b">
                    <Col span={8}>
                        <FormItem
                            label='用户ID'
                            {...formItemLayout}
                        >
                            {getFieldDecorator('userId', {
                                initialValue: defaultValue.userId ? defaultValue.userId : ''
                            })(
                                <Input allowClear/>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label='用户昵称'
                            {...formItemLayout}
                        >
                            {getFieldDecorator('userName', {
                                initialValue: defaultValue.userName ? defaultValue.userName : ''
                            })(
                                <Input allowClear/>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label='性别'
                            {...formItemLayout}
                        >
                            {getFieldDecorator('gender', {
                                initialValue: defaultValue.gender ? defaultValue.gender : ''
                            })(
                                <Select allowClear>
                                    <Option value="">全部</Option>
                                    {getEnumsArray(UserEnums.gender).map((data, index) => {
                                        return (<Option value={data.value} key={index}>{data.text}</Option>);
                                    })}
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row className="m-b">
                    <Col span={8}>
                        <FormItem
                            label='角色'
                            {...formItemLayout}
                        >
                            {getFieldDecorator('role', {
                                initialValue: defaultValue.role ? defaultValue.role : ''
                            })(
                                <Select allowClear>
                                    <Option value="">全部</Option>
                                    {getEnumsArray(UserEnums.roles).map((data, index) => {
                                        return (<Option value={data.value} key={index}>{data.text}</Option>);
                                    })}
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label='年龄'
                            {...formItemLayout}
                        >
                            {getFieldDecorator('age', {
                                initialValue: defaultValue.age ? defaultValue.age : ''
                            })(
                                <Input allowClear/>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label='手机号'
                            {...formItemLayout}
                        >
                            {getFieldDecorator('tel', {
                                initialValue: defaultValue.tel ? defaultValue.tel : ''
                            })(
                                <Input allowClear/>
                            )}
                        </FormItem>
                    </Col>
                </Row>
                {
                    moreOption ? <Row className="m-b">
                        <Col span={8}>
                            <FormItem
                                label='创建时间'
                                {...formItemLayout}
                            >
                                {getFieldDecorator('createTime', {
                                    initialValue: defaultValue.createTime ? defaultValue.createTime : ''
                                })(
                                    <RangePicker
                                        className="wd-ten-percent" 
                                        allowClear
                                        showTime={{
                                            hideDisabledOptions: true,
                                            defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')],
                                        }}
                                    />
                                )}
                            </FormItem>
                        </Col>
                    </Row> : null
                }
                <Row>
                    <div className="pull-right">
                        <Button className="m-r-sm" onClick={() => {
                            this.setState({
                                moreOption: !moreOption
                            });
                        }}><span className="p-r-sm">更多筛选条件</span>{moreOption ? <Icon type="up" /> : <Icon type="down" />}</Button>
                        <Button className="m-l" type="primary" htmlType="submit" loading={false}>查询</Button>
                    </div>
                </Row>
            </Form>
        );
    }
}

UserListSearchForm.propTypes = {
    form: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
    defaultValue: PropTypes.object
};

export default Form.create()(UserListSearchForm);