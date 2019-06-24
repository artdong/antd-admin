import {pathPrefix} from './const';

/**
 * 获取当前路由参数
 * @param  {Object} routing 路由对象
 * @return {Object}         返回请求参数
 */
export function getQuery(routing) {
    return routing.location.query || {};
}

/**
 * 获取跳转路径
 * @param  {String} path 路径地址
 * @return {String}      正确路径
 */
export function getPath(path) {
    if(!/^\//.test(path)) {
        path = '/' + path;
    }
    return pathPrefix + path;
}
/**
 * 获取标准分页数据
 * @param  {Object} data 源数据
 * @return {Object}      标准分页数据
 */
export function getPageData(data) {
    return {
        // current: data.page || 1,
        total: data.total,
        pageSize: data.pageSize || 10,
        showSizeChanger: false,
        showTotal: function(total) {
            return `共有 ${total} 条记录`;
        },
        pageSizeOptions: ['10', '50', '100']
    };
}

/**
 * 获取表格过滤项
 * @param  {Object} enumObj 枚举对象
 * @return {Array}          过滤数组
 */
export function getEnumsArray(enumObj) {
    return Object.keys(enumObj).map(function(key) {
        return {
            text: enumObj[key],
            value: key
        };
    });
}

/**
 * 移动端格式枚举值
 * @param  {Object} enumObj 枚举对象
 * @return {Array}          过滤数组
 */
export function getEnumsArrayPicker(enumObj) {
    return Object.keys(enumObj).map(function(key) {
        return {
            label: enumObj[key],
            value: key
        };
    });
}

/**
 * 序列化化数据
 * @param  {Object} data 数据对象
 * @return {String}      URL用数据
 */
export function serialize(data) {
    let str = '';
    for(let key in data) {
        str += key + '=' + encodeURIComponent(data[key]) + '&';
    }
    str = str.replace(/&$/, '');
    return str;
}

/**
 * 查询是否
 * @param  {[type]}  fieldsError [description]
 * @return {Boolean}             [description]
 */
export function formHasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

/**
 * 查询是否为空对象
 * @param  {Object}  obj 查询对象
 * @return {Boolean}     查询结果
 */
export function isObjEmpty(obj) {
    // Speed up calls to hasOwnProperty
    let hasOwnProperty = Object.prototype.hasOwnProperty;

    // null and undefined are "empty"
    if (obj == null) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;

    // If it isn't an object at this point
    // it is empty, but it can't be anything *but* empty
    // Is it empty?  Depends on your application.
    if (typeof obj !== 'object') return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (let key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
}

export function formatDate(date) {//时间转化
    let seperator1 = '-';
    let seperator2 = ':';
    let month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    let strDate = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    let strHours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    let strMinutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    let strSeconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    let currentdate = date.getFullYear() + seperator1  + month  + seperator1  + strDate
			+ ' '  + strHours  + seperator2  + strMinutes
			+ seperator2 + strSeconds;
    return currentdate;
}