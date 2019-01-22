import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import DevTools from '@/components/Layout/Main/DevTools'
import asyncLoading from '../middlewares/asyncLoading'
import rootReducers from '../models'

export default (defaultState) => {
    return createStore(
        rootReducers,
        defaultState || {},
        compose(
            applyMiddleware(
                thunk,
                asyncLoading
            ),
            // 非生产环境打开调试工具, ctrl+h显示, ctrl+w切换方向
            DevTools.instrument()
        )
    )
}
