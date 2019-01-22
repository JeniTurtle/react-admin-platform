import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import asyncLoading from '../middlewares/asyncLoading'
import rootReducers from '../models'

export default (defaultState) => {
    return createStore(
        rootReducers,
        defaultState || {},
        applyMiddleware(
            thunk,
            asyncLoading
        ),
    )
}
