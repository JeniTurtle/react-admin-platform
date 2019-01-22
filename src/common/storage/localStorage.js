/**
 * 本地数据存储或读取
 * @param {any} key
 * @param {any} value
 * @returns
 */
export const localItem = (key, value) => {
    if(arguments.length == 1) {
        return localStorage.getItem(key) && localStorage.getItem(key) !== 'null' ? localStorage.getItem(key) : null;
    } else {
        return localStorage.setItem(key, value);
    }
};

/**
 * 删除本地数据
 * @param {any} k
 * @returns
 */
export const removeLocalItem = (key) => {
    if(arguments.length == 1) {
        return localStorage.removeItem(key);
    } else {
        return localStorage.clear();
    }
};
