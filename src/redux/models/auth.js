import { createAsyncAction, createReducer } from 'redux-action-tools'
import { message } from 'antd'
import { unAuthApolloFetch as apolloFetch } from '@/common/request/apolloFetch'
import { getActionTypes } from '@/common/utils/functions'
import { LOGIN as LOGIN_QUERY } from '@/graphqls/login.gpl'
import { setCookieToken, removeCookieToken } from '@/common/cookie/authToken'
import userActions from './user'

export const initialState = {
    token: null,
    isLogined: false
};

export const actionTypes = getActionTypes(
    {
        LOGIN: null,
        CLEAR_AUTH: null,
    },
    'LOGIN'
);

const { LOGIN, CLEAR_AUTH } = actionTypes;

const login = createAsyncAction(
    LOGIN,
    ({ username, password }, dispatch) => {
        const variables = {
            input: { username, password }
        };

        return apolloFetch(LOGIN_QUERY, variables, {
            success: ( resp ) => {
                if (resp.userLogin && resp.userLogin.token) {
                    dispatch(userActions.setUserInfo(resp.userLogin.payload))
                    return resp.userLogin.token
                } else {
                    throw new Error('登录结果错误');
                }
            },
            fail: (err) => {
                message.error(err.message);
            }
        });
    }
);

const setAuth = (state, { payload: token }) => {
    if (token) {
        setCookieToken(token)
    } else {
        removeCookieToken(token)
    }
    return {
        ...state,
        token,
        isLogined: true
    }
};

const clearAuth = () => {
    removeCookieToken();
    return { ...initialState }
};

const reducers = createReducer()
    .when(LOGIN)
    .done(setAuth)
    .failed(clearAuth)
    .when(CLEAR_AUTH, clearAuth)
    .build({ ...initialState });

const actions = {
    login,
};

export { actions as default, reducers }
