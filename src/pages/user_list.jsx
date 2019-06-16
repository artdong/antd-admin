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
import { getQuery, isObjEmpty, getPath, serialize } from './../common/tool';
import { getUserList, cleanUserList} from './../actions/user';

function propMap(state, ownProps) {
    return {
        modal: state.modal,
        routing: ownProps,
        users: state.user || []
    };
}

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

    componentWillUnmount() {
        const { dispatch } = this.props;
        dispatch(cleanUserList());
    }

    handleGetList(filters) {
        const {dispatch, routing} = this.props;
        const query = Object.assign({}, getQuery(routing), filters);
        Object.keys(query).forEach((inx) => {
            if (query[inx] === 'undefined' || query[inx] === undefined || query[inx] === null || query[inx] === '' || query[inx].length == 0)
                delete query[inx];
        });
        dispatch(getUserList(query));
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
        const { routing, modal, users } = this.props;
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
                    dataSource={users.content}
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
