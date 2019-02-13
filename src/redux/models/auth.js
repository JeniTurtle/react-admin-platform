import React from 'react'
import { Redirect } from 'react-router-dom'
import { createAsyncAction, createReducer, createAction } from 'redux-action-tools'
import { message } from 'antd'
import { unAuthApolloFetch as apolloFetch } from '@/common/request/apolloFetch'
import { getActionTypes } from '@/common/utils/functions'
import { LOGIN_GPL, REFRESH_TOKEN_GPL } from '@/graphqls/auth.gpl'
import { setCookieToken, removeCookieToken } from '@/common/cookie/authToken'
import globalActions from './global'

const initialState = {
    token: null,
    isLogined: false,
    userInfo: {},
    redirectLogin: null,
};

const actionTypes = getActionTypes(
    {
        LOGIN: null,
        CLEAR_AUTH: null,
        SET_USERINFO: null,
        REFRESH_TOKEN: null,
    },
    'AUTH'
);

const { LOGIN, CLEAR_AUTH, SET_USERINFO, REFRESH_TOKEN } = actionTypes;

const login = ({ username, password }, dispatch) => {
    const variables = {
        input: { username, password }
    };

    return apolloFetch(LOGIN_GPL, variables, {
        success: ( resp ) => {
            if (resp.userLogin && resp.userLogin.payload && resp.userLogin.token) {
                return resp.userLogin
            } else {
                throw new Error('登录结果错误');
            }
        },
        fail: (err) => {
            message.error(err.message);
        }
    });
};

const refreshToken = (token , dispatch) => {
    const variables = {
        input: { token }
    };

    return apolloFetch(REFRESH_TOKEN_GPL, variables, {
        success: ( resp ) => {
            if (resp.userRefreshToken && resp.userRefreshToken.payload && resp.userRefreshToken.token) {
                return resp.userRefreshToken
            } else {
                throw new Error('登录失效');
            }
        },
        fail: (err) => {
            message.error(err.message);
            dispatch(globalActions.redirect('/login'));
        }
    });
};

const setUserInfo = (state, { payload }) => {
    setCookieToken(payload.token);
    return {
        ...state,
        token: payload.token,
        userInfo: payload.payload,
        isLogined: true
    }
};

const clearAuth = () => {
    removeCookieToken();

    return {
        ...initialState,
        redirectLogin: <Redirect to={{ pathname: '/login' }}/>
    }
};

const reducers = createReducer()
    .when(LOGIN)
    .done(setUserInfo)
    .failed(clearAuth)
    .when(REFRESH_TOKEN)
    .done(setUserInfo)
    .failed(clearAuth)
    .when(SET_USERINFO, setUserInfo)
    .when(CLEAR_AUTH, clearAuth)
    .build({ ...initialState });

const actions = {
    login: createAsyncAction(LOGIN, login),
    refreshToken: createAsyncAction(REFRESH_TOKEN, refreshToken),
    clearAuth: createAction(CLEAR_AUTH),
    setUserInfo: createAction(SET_USERINFO)
};

export {
    actions as default,
    reducers,
    initialState,
    actionTypes
}
