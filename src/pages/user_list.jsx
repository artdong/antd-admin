/**
 * 英雄列表
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col, Spin, Button, Modal } from 'antd';
import { push } from 'react-router-redux';

import UserListSearchForm from './../components/form/user_list_search_form.jsx';
import UserAdd from './../components/form/user_add_form.jsx';
import UserListTable from './../components/table/user_list_table.jsx';
import { getQuery, isObjEmpty, getPath, serialize, formatDate, getPageData } from './../common/tool';
import { getUserList, cleanUserList, addUser, updateUser, delUser} from './../actions/user';

import OrgTree from './../components/common/org_tree.jsx';
// import OrgTree from 'react-org-tree';

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
        this.state = {
            modalType: '', 
            curUser: {},
            data: {
                id: 0,
                label: 'XXX科技有限公司',
                children: [{
                    id: 2,
                    label: '产品研发部',
                    children: [{
                        id: 5,
                        label: '研发-前端'
                    }, {
                        id: 6,
                        label: '研发-后端'
                    }, {
                        id: 9,
                        label: 'UI设计'
                    }, {
                        id: 10,
                        label: '产品经理'
                    }]
                }, {
                    id: 3,
                    label: '销售部',
                    children: [{
                        id: 7,
                        label: '销售一部'
                    }, {
                        id: 8,
                        label: '销售二部'
                    }]
                }, {
                    id: 4,
                    label: '财务部'
                }, {
                    id: 11,
                    label: 'HR人事'
                }]
            },
            horizontal: true,
            collapsable: true,
            expandAll: true,
            labelClassName: 'bg-white'
        };
        this.handleGetList = this.handleGetList.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleShowModal = this.handleShowModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleAddUser = this.handleAddUser.bind(this);
        this.handleUpdateUser = this.handleUpdateUser.bind(this);
        this.handleDelUser = this.handleDelUser.bind(this);
        // this.handleTableChange = this.handleTableChange.bind(this);
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
            if (query[inx] === 'undefined' || query[inx] === undefined || query[inx] === null || query[inx] === '' || query[inx].length === 0)
                delete query[inx];
        });
        dispatch(getUserList(query));
        if(!isObjEmpty(filters)) dispatch(push(getPath('/user/?' + serialize(query))));
    }

    // handleTableChange(page, filters) {
    //     this.handleGetList(Object.assign( page ? {
    //         page: page.current,
    //         pageNum: page.pageSize
    //     } : {}, filters));
    // }

    handleSearch(data) {
        this.handleGetList(Object.assign({}, data, {
            page: 1,
            pageNum: 10
        }));
    }

    handleShowModal(type, record) {
        this.setState({
            modalType: type,
            curUser: record
        });
    }

    handleCloseModal() {
        this.setState({
            modalType: ''
        });
    }

    handleAddUser(data) {
        const { dispatch } = this.props;
        const params = data;
        const callback = () => {
            this.setState({ modalType: '' }, () => {
                this.handleGetList();
            }); 
        };
        let createTime = formatDate(new Date());
        params.createTime = createTime;
        dispatch(addUser(params, callback));
    }

    handleUpdateUser(data) {
        const { dispatch } = this.props;
        const params = data;
        const callback = () => {
            this.setState({ modalType: '' }, () => {
                this.handleGetList();
            }); 
        };
        let createTime = formatDate(new Date());
        params.createTime = createTime;
        dispatch(updateUser(params, callback));
    }

    handleDelUser(data) {
        const { dispatch } = this.props;
        const params = data;
        const callback = () => {
            this.setState({ modalType: '' }, () => {
                this.handleGetList();
            }); 
        };
        Modal.confirm({
            title: '删除确认',
            content: '确认要删除吗?',
            onOk: () => {
                dispatch(delUser(params, callback));
            }
        });
    }

    render() {
        const { routing, modal, users } = this.props;
        const { loadingForm } = modal;
        const { modalType, curUser, data, horizontal, collapsable, expandAll, labelClassName } = this.state;
        
        return (
            <Spin spinning={loadingForm}>
                <div className="text-center">
                    <OrgTree
                        data={data}
                        horizontal={horizontal}
                        collapsable={collapsable}
                        labelClassName={labelClassName}
                        expandAll={expandAll}
                        renderContent={(data) => {
                            return data.label;
                        }}
                    >
                    </OrgTree>
                </div>
                <Row className="m-b">
                    <Col span={24}>
                        <h1 className="pull-left">英雄列表</h1>
                        <div className="text-right">
                            <Button type="primary" ghost className="m-l" onClick={() => {this.handleShowModal('addUser');}}>新增英雄</Button>
                        </div>
                    </Col>
                </Row>
                <UserListSearchForm onSubmit={this.handleSearch} defaultValue={getQuery(routing)}/>
                <UserListTable 
                    dataSource={users.content}
                    handleShowModal={this.handleShowModal}
                    handleDelUser={this.handleDelUser}
                    pagination={getPageData(users)}
                />
                <Modal
                    visible={modalType === 'addUser' ? true : false}
                    title='新增英雄'
                    width={700}
                    footer={null}
                    onCancel={this.handleCloseModal}
                >
                    {modalType === 'addUser' 
                        ?   <UserAdd onCloseModal={this.handleCloseModal} onSubmit={this.handleAddUser}/> 
                        : null
                    }
                </Modal>
                <Modal
                    visible={modalType === 'editUser' ? true : false}
                    title='编辑英雄'
                    width={700}
                    footer={null}
                    onCancel={this.handleCloseModal}
                >
                    {modalType === 'editUser' 
                        ?   <UserAdd onCloseModal={this.handleCloseModal} onSubmit={this.handleUpdateUser} userInfo={curUser}/> 
                        : null
                    }
                </Modal>
            </Spin>
        );
    }
}

UserList.propTypes = {
    dispatch: PropTypes.func.isRequired,
    routing: PropTypes.object.isRequired,
    modal: PropTypes.object.isRequired,
    users: PropTypes.object
};

export default connect(propMap)(UserList);
