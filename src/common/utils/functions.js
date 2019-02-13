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

/**
 * 查询指定menu的索引列表, 方便遍历出该menu的整个层级
 * @param obj
 * @param value
 * @param tmp
 * @param deep
 * @returns {*}
 */
export const getMenuIndexList = (obj, value, tmp=[], deep=0) => {
    for (let index in obj) {
        let item = obj[index];
        if (index > 0) {
            tmp.pop()
        }
        tmp.push(index)

        if (item.key === value) {
            return tmp
        } else if (item.children) {
            let ret = getMenuIndexList(item.children, value, tmp, deep+1)
            if (ret) {
                return ret
            } else if (deep == 0) {
                tmp = []
            } else {
                tmp.pop()
            }
        }
    }
};

/**
 * 随机生成16进制颜色
 * @returns {string}
 */
export const getRandomColor = () => {
    const rand = Math.floor(Math.random( ) * 0xFFFFFF).toString(16);
    if (rand.length == 6) {
        return "#" + rand;
    } else {
        return getRandomColor();
    }
};
