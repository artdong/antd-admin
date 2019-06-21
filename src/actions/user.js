// import { message } from 'antd';
import { modalUpdate } from './modal';
import { users } from './../common/db';
export const CLEAN_USERLIST = 'CLEAN_USERLIST';
export const UPDATE_USERLIST = 'UPDATE_USERLIST';

/**
 * 获取用户列表
 */
export function getUserList(query) {
    return function(dispatch) {
        dispatch(modalUpdate({
            loadingTable: true
        }));
        //@param condition 过滤条件
        //@param data 需要过滤的数据
        const filter = (condition, data)=>{
            return data.filter(item => {
                return Object.keys(condition).every(key => {
                    return String(item[key]).toLowerCase().includes(
                        String(condition[key]).trim().toLowerCase());
                });
            } );
        };
        let condition = query;
        delete condition.pageNum;
        delete condition.page;
        const userList = filter(condition, users);
 
        dispatch(updateUserList(userList));
        dispatch(modalUpdate({
            loadingTable: false
        }));
        // fetch('get-users', query)
        //     .then(function(res) {
        //         dispatch(updateUserList(res.data));
        //         dispatch(modalUpdate({
        //             loadingTable: false
        //         }));
        //     }).catch(function(err) {
        //         dispatch(modalUpdate({
        //             pageWarn: err.message,
        //             loadingTable: false
        //         }));
        //     });
    };
}

/**
 * 新增用户
 */
export function addUser(query, callback) {
    return function(dispatch) {
        dispatch(modalUpdate({
            loadingTable: true
        }));
        let userList = users;
        query.key = userList.length;
        query.userId = userList.length + 1;
        userList.push(query);
        dispatch(updateUserList(userList));
        dispatch(modalUpdate({
            loadingTable: false
        }));
        callback && callback();
        // fetch('add-user', query, 'POST')
        //     .then(function(res) {
        //         dispatch(modalUpdate({
        //             loadingForm: false
        //         }));
        //         if(res.data) {
        //             message.success('操作成功！');
        //             callback && callback();
        //         } else message.error('操作失败！');
        //     }).catch(function(err) {
        //         message.error(err.message);
        //         dispatch(modalUpdate({
        //             loadingForm: false
        //         }));
        //     });
    };
}

/**
 * 编辑用户
 */
export function updateUser(query, callback) {
    return function(dispatch) {
        dispatch(modalUpdate({
            loadingTable: true
        }));
        let userList = users.filter(item => {
            return item.userId !== query.userId;
        });
        let user = users.filter((p) => {
            return p.userId === query.userId;
        });
        user = Object.assign({}, user, query);
        userList.unshift(user);
        dispatch(updateUserList(userList));
        dispatch(modalUpdate({
            loadingTable: false
        }));
        callback && callback();
    };
}

/**
 * 删除用户
 */
export function delUser(query, callback) {
    return function(dispatch) {
        dispatch(modalUpdate({
            loadingTable: true
        }));
        let userList = users;
        let newUserList = userList.filter(item => {
            return item.userId !== query.userId;
        });
        dispatch(updateUserList(newUserList));
        dispatch(modalUpdate({
            loadingTable: false
        }));
        callback && callback();
    };
}


/**
 * 更新用户列表
 * @param  {Object} data 列表数据
 * @return {Object}      action数据
 */
export function updateUserList(data) {
    return {
        type: UPDATE_USERLIST,
        data
    };
}

/**
 * 清空用户列表
 * @return {Object}      action数据
 */
export function cleanUserList() {
    return {
        type: CLEAN_USERLIST
    };
}
