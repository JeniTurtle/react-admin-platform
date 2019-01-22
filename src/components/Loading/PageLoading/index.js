import React from 'react'
import { Spin } from 'antd'
import './PageLoading.scss'

/**
 * 按需加载时的loading组件
 * @param isLoading
 * @param error
 * @returns {XML}
 * @constructor
 */
const PageLoading = ({ isLoading, error }) => {
    if (isLoading) {
        return (
            <div className="pageLoading">
                <Spin />
            </div>
        );
    }
    else if (error) {
        return <div className="loadingError">Sorry, there was a problem loading the page.</div>;
    }
}

export default PageLoading