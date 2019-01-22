import React from 'react'
import DevTools from './DevTools'
import '@/common/style/base/base.scss'

class MainDev extends React.Component {
    constructor() {
        super();
        this.state = {isMounted: false}
    }

    componentDidMount() {
        this.setState({isMounted: true})
        console.log('Redux Devtools is now available. Press key "ctrl-h" to toggleVisibility. Press key "ctrl-w" to changePosition.')
    }

    render() {
        const { isMounted } = this.state;
        return (
            <div id="container">
                {this.props.children}
                {isMounted && <DevTools/>}
            </div>
        );
    }
}

export default MainDev;
