import axios from 'axios'
import JsonP from 'jsonp'

/**
 * 封装好的get和post接
 */
const axiosGet = axios.create({
    // baseURL: API_URL, //设置默认api路径
    timeout: 10000, //设置超时时间
    headers: {'X-Custom-Header': 'foobar'}
});

const axiosPost = axios.create({
    // baseURL: API_URL, //设置默认api路径
    timeout: 10000, //设置超时时间
    headers: {'content-type': 'application/json'},
});

/**
 * redux-action-tools生成async action的时候, 需要设置一个promise对象,
 * 这样它就自动创建请求发起、成功、失败的三个action type,
 * 并且可以在redux中间件中对状态进行监控
 * @param url
 * @param params
 * @param method
 * @param success
 * @param fail
 * @returns {Promise}
 */
export const axiosFetch = (url, params, { method, success, fail }) => {
    return new Promise((resolve, reject) => {
        axiosSync(url, params , method)
            .then(resp => {
                const ret = success && success(resp);
                resolve(ret)
            })
            .catch(err => {
                reject(err, fail && fail(err))
            })
    })
};

export const axiosSync = (
    url, params = {}, method = 'get',
) => {
    const instance = method === 'get' ? axiosGet : axiosPost;
    return instance[method](url, { params })
};

/**
 * axios本版本不支持jsonp 自己拓展一个
 * @param url
 * @returns {Promise}
 */
export const jsonp = (url, { success, fail }) => {
    if (!url) {
        throw new Error('Axios.JSONP 至少需要一个url参数!')
    }
    return new Promise((resolve, reject) => {
        JsonP(url, {
            param: 'callback'
        }, (err, resp) => {
            if (err) {
                reject(err, fail && fail(err))
            } else {
                resolve(success && success(resp))
            }
        })
    })
};