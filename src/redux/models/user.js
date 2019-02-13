import { createAsyncAction, createReducer } from 'redux-action-tools'
import { message } from 'antd'
import { apolloFetch } from '@/common/request/apolloFetch'
import { getActionTypes, deepGet } from '@/common/utils/functions'
import { QUERY_USER_LIST_GPL, QUERY_USER_INFO_AND_GROUPS_GPL, ADD_USER_GPL } from '@/graphqls/user.gpl'

const initialState = {
    userList: null,
    userInfo: {},
    groupList: [],
};

const actionTypes = getActionTypes(
    {
        GET_USER_LIST: null,
        GET_USER_INFO_AND_GROUPS: null,
        ADD_USER: null,
    },
    'USER'
);

const { GET_USER_LIST, GET_USER_INFO_AND_GROUPS, ADD_USER } = actionTypes;

const getUserList = (variables = {}) => {
    return apolloFetch(QUERY_USER_LIST_GPL, variables, {
        success: ({ userList }) => {
            if (userList && userList.pageInfo) {
                userList.pageInfo.currentPage = variables.currentPage || 1;
                return userList;
            } else {
                throw new Error('用户列表获取失败');
            }
        },
        fail: (err) => {
            message.error(err.message);
        }
    });
};

const getUserInfoAndGroups = (variables = {}) => {
    return apolloFetch(QUERY_USER_INFO_AND_GROUPS_GPL, variables);
};

const addUser = ({ input, callback }) => {
    return apolloFetch(ADD_USER_GPL, { input }, {
        success: ({ userRegisterUser }) => {
            if (deepGet(userRegisterUser, 'payload.id')) {
                callback && callback(userRegisterUser)
            }
        },
        fail: (err) => {
            message.error(err.message);
        }
    });
};

const setUserList = (state, { payload }) => {
    return {
        ...state,
        userList: payload,
    }
};

const setUserInfoAndGroup = (state, { payload }) => {
    const { userUserInfo, groupList } = payload;
    return {
        ...state,
        userInfo: userUserInfo,
        groupList
    }
};

const reducers = createReducer()
    .when(ADD_USER)
    .when(GET_USER_LIST)
    .done(setUserList)
    .when(GET_USER_INFO_AND_GROUPS)
    .done(setUserInfoAndGroup)
    .failed((err) => message.error(err.message))
    .build({ ...initialState });

const actions = {
    getUserList: createAsyncAction(GET_USER_LIST, getUserList),
    getUserInfoAndGroups: createAsyncAction(GET_USER_INFO_AND_GROUPS, getUserInfoAndGroups),
    addUser: createAsyncAction(ADD_USER, addUser),
};

export {
    actions as default,
    initialState,
    reducers,
    actionTypes,
}