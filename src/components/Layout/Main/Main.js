import React from 'react'
import '@/common/style/base/base.scss'

const Main = (props) => {
    return (
        <div id="container">
            { props.children }
        </div>
    )
};

export default Main;
