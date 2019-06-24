// import { message } from 'antd';
import { modalUpdate } from './modal';
export const CLEAN_USERLIST = 'CLEAN_USERLIST';
export const UPDATE_USERLIST = 'UPDATE_USERLIST';

let users = [{
    key: 0,
    userId: 1,
    userName: '诸葛亮',
    gender: 0,
    role: 0,
    age: 26,
    tel: 15023712789,
    createTime: '2019-06-16 10:10:10'
},
{
    key: 1,
    userId: 2,
    userName: '妲己',
    gender: 1,
    role: 0,
    age: 17,
    tel: 123456789,
    createTime: '2019-06-16 10:10:10'
},
{
    key: 2,
    userId: 3,
    userName: '赵云',
    gender: 0,
    role: 3,
    age: 23,
    tel: 13523712789,
    createTime: '2019-06-16 10:10:10'
},
{
    key: 3,
    userId: 4,
    userName: '甄姬',
    gender: 1,
    age: 16,
    role: 0,
    tel: 17723712789,
    createTime: '2019-06-16 10:10:10'
},
{
    key: 4,
    userId: 5,
    userName: '张飞',
    gender: 0,
    role: 4,
    age: 25,
    tel: 19223712789,
    createTime: '2019-06-16 10:10:10'
},
{
    key: 5,
    userId: 6,
    userName: '蔡文姬',
    gender: 1,
    role: 4,
    age: 18,
    tel: 15123712789,
    createTime: '2019-06-16 10:10:10'
},
{
    key: 6,
    userId: 7,
    userName: '阿轲',
    gender: 0,
    role: 3,
    age: 23,
    tel: 111123712789,
    createTime: '2019-06-16 10:10:10'
},
{
    key: 7,
    userId: 8,
    userName: '嫦娥',
    gender: 1,
    role: 3,
    age: 16,
    tel: 11923712789,
    createTime: '2019-06-16 10:10:10'
},
{
    key: 8,
    userId: 9,
    userName: '吕布',
    gender: 0,
    role: 2,
    age: 23,
    tel: 11023712789,
    createTime: '2019-06-16 10:10:10'
},
{
    key: 9,
    userId: 10,
    userName: '芈月',
    gender: 1,
    role: 4,
    age: 19,
    tel: 17923712789,
    createTime: '2019-06-16 10:10:10'
},
{
    key: 10,
    userId: 11,
    userName: '凯',
    gender: 0,
    role: 5,
    age: 23,
    tel: 19923712789,
    createTime: '2019-06-16 10:10:10'
},
{
    key: 11,
    userId: 12,
    userName: '公孙离',
    gender: 1,
    role: 1,
    age: 15,
    tel: 19023712789,
    createTime: '2019-06-16 10:10:10'
},
{
    key: 12,
    userId: 13,
    userName: '孙悟空',
    gender: 0,
    role: 3,
    age: 23,
    tel: 18823712789,
    createTime: '2019-06-16 10:10:10'
}];

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
        let createTime = condition.createTime;
        let createTimeBegin = createTime && createTime[0] ? createTime[0] : '';
        let createTimeEnd = createTime && createTime[1] ? createTime[1] : '';
        delete condition.pageNum;
        delete condition.page;
        delete condition.createTime;
        let userList = filter(condition, users);
        if(createTimeBegin !== '' && createTimeEnd !== '') {
            userList = userList.filter(item => {
                return Date.parse(item.createTime.replace(/-/g, '/')) >= createTimeBegin && Date.parse(item.createTime.replace(/-/g, '/')) <= createTimeEnd;
            });
        }
 
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
        userList.unshift(query);
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
        users = userList;
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
        users = newUserList;
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
