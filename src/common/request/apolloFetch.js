import { createApolloFetch } from 'apollo-fetch';
import { HEAD_GT_KEY, GRAPHQL_URI, UNAUTH_GRAPHQL_URI } from '@/config'
import { getCookieToken } from '@/common/cookie/authToken'
import authActions from '@/redux/models/auth'

const initialApolloFetch = (uri) => {
    let protocol = 'http:';
    if (typeof location !== 'undefined' && location.protocol) {
        protocol = location.protocol
    }

    const apolloFetch = createApolloFetch({ uri: `${protocol}${uri}` });

    apolloFetch.use(({ request, options }, next) => {
        const token = getCookieToken();

        if (!options.headers) {
            options.headers = {}
        }
        options.headers[HEAD_GT_KEY] = token ? `JWT ${token}` : '';
        next();
    });

    apolloFetch.useAfter(({ response }, next) => {
        if (response.status === 401) {
            // 退出登录操作
            const store = window.__APP_STORE_;
            store.dispatch(authActions.clearAuth());
        }
        next();
    });

    return (query, variables, options={}) => {
        const { success, fail } = options;

        return new Promise((resolve, reject) => {
            apolloFetch({ query, variables })
                .then(resp => {
                    if (resp.errors && resp.errors[0].message) {
                        throw new Error(resp.errors[0].message)
                    } else {
                        const ret = success ? success(resp.data) : resp.data;
                        resolve(ret)
                    }
                })
                .catch(err => {
                    reject(err, fail && fail(err))
                })
        })
    };
};

const apolloFetch = initialApolloFetch(GRAPHQL_URI),
    unAuthApolloFetch = initialApolloFetch(UNAUTH_GRAPHQL_URI);

export default {
    apolloFetch,
    unAuthApolloFetch
}
