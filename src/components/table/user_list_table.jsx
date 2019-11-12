/**
 * 用户列表
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table, Divider } from 'antd';
import UserEnums from '../../enums/user';

class UserListTable extends Component {
    // eslint-disable-next-line
    constructor(props) {
        super(props);
    }
    render() {
        const { handleShowModal, handleDelUser } = this.props;
        let columns = [
            {
                title: '序号',
                dataIndex: 'id',
                key: 'id',
                render: (text, record, index) => (
                    <span>{index + 1}</span>
                )
            },
            // {
            //     title: '用户ID',
            //     dataIndex: 'userId',
            //     key: 'userId'
            // },
            {
                title: '用户昵称',
                dataIndex: 'userName',
                key: 'userName'
            },
            {
                title: '性别',
                dataIndex: 'gender',
                key: 'gender',
                render: (value) => {
                    return UserEnums.gender[value];
                }
            },
            {
                title: '角色',
                dataIndex: 'role',
                key: 'role',
                render: (value) => {
                    return UserEnums.roles[value];
                }
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
            },
            {
                title: '操作',
                key: 'action',
                render: (_text, record) => (
                    <span>
                        <a href="javacript:void(0);" rel="noopener noreferrer" onClick={()=>{handleShowModal('editUser', record);}}>编辑 {record.name}</a>
                        <Divider type="vertical" />
                        <a href="javacript:void(0);" rel="noopener noreferrer" onClick={()=>{handleDelUser(record);}}>删除</a>
                    </span>
                ),
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
    handleShowModal: PropTypes.func,
    handleDelUser: PropTypes.func
};
export default connect()(UserListTable);
