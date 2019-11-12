/**
 * 学生列表
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';

import CustomTable from './../components/table/custom_table.jsx';

class CustomTableList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalType: '', 
            curUser: {}
        };
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <div>
                <Row className="m-b">
                    <Col span={24}>
                        <h1 className="pull-left">学生列表</h1>
                    </Col>
                </Row>
                <CustomTable/>
                <div className="custom-table">
                    <table>
                        <thead>
                            <tr>
                                <th>序号</th>
                                <th>姓名</th>
                                <th>性别</th>
                                <th>年龄</th>
                                <th colSpan="2">班级</th>
                                <th>手机号</th>
                                <th>入学时间</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>张三</td>
                                <td>男</td>
                                <td>18</td>
                                <td>大一</td>
                                <td>3班</td>
                                <td>18015678679</td>
                                <td>2019-11-11</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>李四</td>
                                <td>男</td>
                                <td>18</td>
                                <td>大一</td>
                                <td>3班</td>
                                <td>18015678679</td>
                                <td>2019-11-11</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>王五</td>
                                <td>男</td>
                                <td>18</td>
                                <td>大一</td>
                                <td>3班</td>
                                <td></td>
                                <td>2019-11-11</td>
                            </tr>
                            <tr>
                                <td>4</td>
                                <td>赵六</td>
                                <td>男</td>
                                <td>18</td>
                                <td>大一</td>
                                <td>3班</td>
                                <td>18015678679</td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

CustomTableList.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

export default connect()(CustomTableList);
