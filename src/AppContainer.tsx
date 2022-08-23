import React, { Component } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'

interface AppContainerProps extends RouteComponentProps { }
class AppContainer extends Component<AppContainerProps, {}> {
    componentDidMount() {
        const windowObj = window as any
        const { ethereum } = windowObj
        console.log('ethereum', ethereum)
    }

    render() {
        const { children } = this.props
        return <>{children}</>

    }
}
export default withRouter(AppContainer);