import ReactDOM from 'react-dom'
import React from 'react'
import { Provider } from 'react-redux'
import App from './router'
import { IS_PRODUCTION } from '@/config'
import configureStore from './redux/store/configureStore'

const store = window.__APP_STORE_ = configureStore({});

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
