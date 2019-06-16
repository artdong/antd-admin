/**
 * 用户列表
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table } from 'antd';

class UserListTable extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let columns = [
            {
                title: '用户ID',
                dataIndex: 'userId',
                key: 'userId'
            },
            {
                title: '用户昵称',
                dataIndex: 'userName',
                key: 'userName'
            },
            {
                title: '性别',
                dataIndex: 'gender',
                key: 'gender'
            },
            {
                title: '年龄',
                dataIndex: 'age',
                key: 'age'
            },
            {
                title: '手机号',
                dataIndex: 'tel',
                key: 'tel'
            },
            {
                title: '创建时间',
                dataIndex: 'createTime',
                key: 'createTime'
            }
        ];

        return (
            <div>
                <Table
                    columns={columns}
                    {...this.props}
                >
                </Table>
            </div>
        );
    }

}

UserListTable.propTypes = {
    dataSource: PropTypes.array
};
export default connect()(UserListTable);
