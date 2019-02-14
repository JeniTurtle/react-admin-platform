import { createAsyncAction, createReducer } from 'redux-action-tools'
import { message } from 'antd'
import { apolloFetch } from '@/common/request/apolloFetch'
import { getActionTypes, deepGet } from '@/common/utils/functions'
import { QUERY_DEPARTMENT_LIST } from '@/graphqls/department.gpl'

const initialState = {
    departmentList: [],
};

const actionTypes = getActionTypes(
    {
        GET_DEPARTMENT_LIST: null,
    },
    'DEPARTMENT'
);

const { GET_DEPARTMENT_LIST } = actionTypes;

const getDepartmentList = (variables = {}) => {
    return apolloFetch(QUERY_DEPARTMENT_LIST, variables);
};

const setDepartmentList = (state, { payload }) => {
    if (!deepGet(payload, 'departmentList.edges')) {
        throw new Error('部门列表获取失败');
    }
    return {
        ...state,
        departmentList: payload.departmentList,
    }
};

const reducers = createReducer()
    .when(GET_DEPARTMENT_LIST)
    .done(setDepartmentList)
    .failed((err) => message.error(err.message))
    .build({ ...initialState });

const actions = {
    getDepartmentList: createAsyncAction(GET_DEPARTMENT_LIST, getDepartmentList),
};

/**
 * 把部门列表转成树状结构
 * @param list
 * @returns {Array}
 */
const buildTree = (list) => {
    let temp = {};
    let tree = [];
    for (let i in list) {
        temp[list[i].node.id] = list[i].node;
    }
    for (let i in temp) {
        if (temp[i].superior) {
            if (!temp[temp[i].superior.id].children) {
                temp[temp[i].superior.id].children = [];
            }
            temp[temp[i].superior.id].children.push(temp[i]);
        } else {
            tree.push(temp[i]);
        }
        temp[i].key = temp[i].id;
        temp[i].value = temp[i].id;
        temp[i].label = temp[i].departmentName;
        delete temp[i].id;
        delete temp[i].departmentName;
        delete temp[i].superior;
    }
    return tree;
};

export {
    actions as default,
    initialState,
    reducers,
    actionTypes,
    buildTree,
}
