import { IS_PRODUCTION } from '@/config'

/**
 * 用户名正则效验，1到16位（字母，数字，下划线，减号）
 * @param {string} str
 * @returns
 */
export const checkUsernameFormat = (str) => {
    var reg = new RegExp(/^[a-zA-Z0-9_-]{1,16}$/);
    return str && reg.test(str);
};

/**
 * 按path来取对象的值，参考loadsh.get
 * @param object
 * @param path
 * @param defaultValue
 * @returns {*}
 */
export const deepGet = (object, path, defaultValue) => {
    return (!Array.isArray(path) ? path.replace(/\[/g, '.').replace(/\]/g, '').split('.') : path)
            .reduce((o, k) => (o || {})[k], object) || defaultValue;
};

/**
 * 可以设置前缀来批量生成actionType, 方便设置复杂的type名
 * @param types
 * @param prefix
 * @returns {{}}
 */
export const getActionTypes = (types, prefix = '') => {
    const hasPrefix = !!prefix;
    const dict = {};

    Object.keys(types).forEach(key => {
        dict[key] = hasPrefix ? `@@${prefix}/${key}` : key
    });

    return dict
};

/**
 * 获取url hash路径
 * @returns
 */
export const getHashPath = (defaultPath="/home") => {
    const hashPath = (location.hash || "").replace(/^\#/, '');
    return hashPath || defaultPath
};

/**
 * 日期格式化
 * @param fmt
 * @param date
 * @returns {*}
 */
export const formateDate = (fmt, date) => {
    var o = {
        "M+" : date.getMonth()+1,     //月份
        "d+" : date.getDate(),     //日
        "h+" : date.getHours(),     //小时
        "m+" : date.getMinutes(),     //分
        "s+" : date.getSeconds(),     //秒
        "q+" : Math.floor((date.getMonth()+3)/3), //季度
        "S" : date.getMilliseconds()    //毫秒
    };
    if(/(y+)/.test(fmt))
        fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)
        if(new RegExp("("+ k +")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    return fmt;
};
