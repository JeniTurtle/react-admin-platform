import React from 'react'
import { createAction, createReducer } from 'redux-action-tools'
import { Redirect } from 'react-router-dom'
import { getActionTypes } from '@/common/utils/functions'

const initialState = {
    loading: false,
    error: null,
    redirect: null,
};

const actionTypes = getActionTypes(
    {
        LOADING: null,
        ERROR: null,
        CLEAR_ERROR: null,
        REDIRECT: null,
    },
    'GLOBAL'
);

const { LOADING, ERROR, CLEAR_ERROR, REDIRECT } = actionTypes;

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

const redirect = (state, { payload }) => {
    const redirectDom = <Redirect to={{ pathname: payload }}/>
    return {
        ...state,
        redirect: redirectDom
    }
};

const reducers = createReducer()
    .when(LOADING, setLoading)
    .when(ERROR, setError)
    .when(CLEAR_ERROR, clearError)
    .when(REDIRECT, redirect)
    .build({ ...initialState });

const actions = {
    loading: createAction(LOADING),
    error: createAction(ERROR),
    clearError: createAction(CLEAR_ERROR),
    redirect: createAction(REDIRECT),
};

export {
    actions as default,
    initialState,
    reducers,
    actionTypes,
}
