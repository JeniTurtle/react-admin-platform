import { createAction, createReducer } from 'redux-action-tools'
import { getActionTypes } from '@/common/utils/functions'

const initialState = {
    userInfo: null,
};

const actionTypes = getActionTypes(
    {
        SET_USERINFO: null,
    },
    'USER'
);

const { SET_USERINFO } = actionTypes;

const setUserInfo = (state, { payload }) => {
    return {
        ...state,
        userInfo: payload
    }
};

const reducers = createReducer()
    .when(SET_USERINFO, setUserInfo)
    .build({ ...initialState });

const actions = {
    setUserInfo: createAction(SET_USERINFO),
};

export {
    actions as default,
    initialState,
    reducers,
    actionTypes,
}