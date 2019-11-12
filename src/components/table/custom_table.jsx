/**
 * 自定义表格组件
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const columns = [
    {
        title: '序号',
        dataIndex: 'id',
        key: 'id'
    },
    {
        title: '姓名',
        dataIndex: 'name',
        key: 'name'
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
        title: '班级',
        dataIndex: ['grade', 'class'],
        col: 2,
        key: 'grade-class'
    },
    {
        title: '手机号',
        dataIndex: 'tel',
        key: 'tel'
    },
    {
        title: '入学时间',
        dataIndex: 'schoolTime',
        key: 'schoolTime'
    },
];

const dataSource = [
    {
        key: '1',
        id: '1',
        name: '张三',
        gender: '男',
        age: 32,
        grade: '初一',
        class: '3班',
        tel: 18015678679,
        schoolTime: '2019-11-11'
    },
    {
        key: '2',
        id: '2',
        name: '李四',
        gender: '女',
        age: 42,
        grade: '初一',
        class: '4班',
        tel: 18015678679,
        schoolTime: '2019-11-11'
    },
    {
        key: '3',
        id: '3',
        name: '王五',
        gender: '男',
        age: 42,
        grade: '初二',
        class: '1班',
        tel: 18015678679,
        schoolTime: '2019-11-11'
    },
    {
        key: '4',
        id: '4',
        name: '赵六',
        gender: '女',
        age: 42,
        grade: '初二',
        class: '2班',
        // tel: 18015678679,
        schoolTime: '2019-11-11'
    },
    {
        key: '5',
        id: '5',
        name: '田七',
        gender: '女',
        age: 42,
        grade: '初三',
        class: '1班',
        tel: 18015678679,
        // schoolTime: '2019-11-11'
    },
];

class CustomTable extends Component {
    // eslint-disable-next-line
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="custom-table">
                <table>
                    <thead>
                        <tr>
                            {
                                columns.map(item => {
                                    return <th key={item.key} colSpan={item.col || 1}>{item.title}</th>;
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            dataSource.map(item => {
                                return <tr key={item.key}>
                                    {
                                        columns.map(it => {
                                            if(Array.isArray(it.dataIndex)) {
                                                let tdArr = [];
                                                it.dataIndex.map(di => {
                                                    tdArr.push (<td key={di}>{item[di] || ''}</td>); 
                                                    return true;
                                                });
                                                return tdArr; 
                                            } else {
                                                return <td key={it.dataIndex}>{item[it.dataIndex] || ''}</td>;
                                            }
                                        })
                                    }
                                </tr>;
                            })
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

CustomTable.propTypes = {
    handleShowModal: PropTypes.func,
    handleDelUser: PropTypes.func
};
export default connect()(CustomTable);
