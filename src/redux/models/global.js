import { createAction, createReducer } from 'redux-action-tools'
import { getActionTypes } from '@/common/utils/functions'

const initialState = {
    loading: false,
    error: null,
};

const actionTypes = getActionTypes(
    {
        LOADING: null,
        ERROR: null,
        CLEAR_ERROR: null,
    },
    'GLOBAL'
);

const { LOADING, ERROR, CLEAR_ERROR } = actionTypes;

const setLoading = (state, { payload }) => {
    return {
        ...state,
        loading: payload
    }
};

const setError = (state, { payload }) => {
    return {
        ...state,
        error: payload
    }
};

const clearError = (state) => {
    return {
        ...state,
        error: null
    }
};

const reducers = createReducer()
    .when(LOADING, setLoading)
    .when(ERROR, setError)
    .when(CLEAR_ERROR, clearError)
    .build({ ...initialState });

const actions = {
    loading: createAction(LOADING),
    error: createAction(ERROR),
    clearError: createAction(CLEAR_ERROR)
};

export {
    actions as default,
    initialState,
    reducers,
    actionTypes,
}
