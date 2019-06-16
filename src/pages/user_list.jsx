/**
 * 英雄列表
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col, Spin } from 'antd';
import { push } from 'react-router-redux';

import UserListSearchForm from './../components/form/user_list_search_form.jsx';
import UserListTable from './../components/table/user_list_table.jsx';
import { getQuery, isObjEmpty, getPath, serialize, getPageData } from './../common/tool';

function propMap(state, ownProps) {
    return {
        modal: state.modal,
        routing: ownProps,
        users: []
    };
}

let users = [{
    key: 0,
    userId: 1,
    userName: '诸葛亮',
    gender: '男',
    age: 26,
    createTime: '2019-06-16'
},
{
    key: 1,
    userId: 2,
    userName: '妲己',
    gender: '女',
    age: 18,
    createTime: '2019-06-16'
},
{
    key: 2,
    userId: 3,
    userName: '赵云',
    gender: '男',
    age: 23,
    createTime: '2019-06-16'
},
{
    key: 3,
    userId: 4,
    userName: '甄姬',
    gender: '女',
    age: 16,
    createTime: '2019-06-16'
},
{
    key: 4,
    userId: 5,
    userName: '张飞',
    gender: '男',
    age: 25,
    createTime: '2019-06-16'
},
{
    key: 5,
    userId: 6,
    userName: '蔡文姬',
    gender: '女',
    age: 18,
    createTime: '2019-06-16'
},
{
    key: 6,
    userId: 7,
    userName: '阿轲',
    gender: '男',
    age: 23,
    createTime: '2019-06-16'
},
{
    key: 7,
    userId: 8,
    userName: '嫦娥',
    gender: '女',
    age: 18,
    createTime: '2019-06-16'
},
{
    key: 8,
    userId: 9,
    userName: '吕布',
    gender: '男',
    age: 23,
    createTime: '2019-06-16'
},
{
    key: 9,
    userId: 10,
    userName: '芈月',
    gender: '女',
    age: 18,
    createTime: '2019-06-16'
},
{
    key: 10,
    userId: 11,
    userName: '凯',
    gender: '男',
    age: 23,
    createTime: '2019-06-16'
},
{
    key: 11,
    userId: 12,
    userName: '公孙离',
    gender: '女',
    age: 18,
    createTime: '2019-06-16'
},
{
    key: 12,
    userId: 13,
    userName: '孙悟空',
    gender: '男',
    age: 23,
    createTime: '2019-06-16'
}];

class UserList extends Component {
    constructor(props) {
        super(props);
        this.handleGetList = this.handleGetList.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleTableChange = this.handleTableChange.bind(this);
    }

    componentDidMount() {
        this.handleGetList();
    }

    handleGetList(filters) { // 第二个参数为了确保选择其他业务线的时候清空查询参数避免参数冲突
        const {dispatch, routing} = this.props;
        const query = Object.assign({}, getQuery(routing), filters);
        // dispatch(getStrictSelectionChanceList(query));
        if(!isObjEmpty(filters)) dispatch(push(getPath('/user/?' + serialize(query))));
    }

    handleSearch(data) {
        this.handleGetList(Object.assign({}, data, {
            page: 1,
            pageNum: 10
        }));
    }

    handleTableChange(page, filters) {
        this.handleGetList(Object.assign( page ? {
            page: page.current,
            pageSize: page.pageSize
        } : {}, filters));
    }

    render() {
        const { routing, modal } = this.props;
        const { loadingForm } = modal;
        return (
            <Spin spinning={loadingForm}>
                <Row className="m-b">
                    <Col span={24}>
                        <h1 className="pull-left">英雄列表</h1>
                    </Col>
                </Row>
                <UserListSearchForm onSubmit={this.handleSearch} defaultValue={getQuery(routing)}/>
                <UserListTable 
                    className="m-t-lg"
                    dataSource={users}
                    onChange={this.handleTableChange}
                />
            </Spin>
        );
    }
}

UserList.propTypes = {
    dispatch: PropTypes.func.isRequired,
    routing: PropTypes.object.isRequired,
    modal: PropTypes.object.isRequired
};

export default connect(propMap)(UserList);
