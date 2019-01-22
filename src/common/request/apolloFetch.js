import { createApolloFetch } from 'apollo-fetch';
import { HEAD_GT_KEY, GRAPHQL_URI, UNAUTH_GRAPHQL_URI } from '@/config'
import { getCookieToken } from '@/common/cookie/authToken'

const initialApolloFetch = (uri, requireAuth=false) => {
    let protocol = 'http:';
    if (typeof location !== 'undefined' && location.protocol) {
        protocol = location.protocol
    }

    const apolloFetch = createApolloFetch({ uri: `${protocol}${uri}` });

    apolloFetch.use(({ request, options }, next) => {
        const token = getCookieToken(requireAuth);

        if (!options.headers) {
            options.headers = {}
        }
        options.headers[HEAD_GT_KEY] = token ? `'JWT ${token}` : '';
        next();
    });

    apolloFetch.useAfter(({ response }, next) => {
        if (response.status === 401) {
            // 退出登录操作, 这里留空, 回来写
        }
        next();
    });

    return (query, variables, { success, fail, final }) => {
        return new Promise((resolve, reject) => {
            apolloFetch({ query, variables })
                .then(resp => {
                    if (resp.errors && resp.errors[0].message) {
                        throw new Error(resp.errors[0].message)
                    } else {
                        const ret = success && success(resp.data);
                        resolve(ret)
                    }
                })
                .catch(err => {
                    reject(err, fail && fail(err))
                })
                .finally(() => {
                    final && final();
                })
        })
    };
};

const apolloFetch = initialApolloFetch(GRAPHQL_URI, true),
    unAuthApolloFetch = initialApolloFetch(UNAUTH_GRAPHQL_URI);

export default {
    apolloFetch,
    unAuthApolloFetch
}
