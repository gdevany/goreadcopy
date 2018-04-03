import React, { PureComponent } from 'react'
import {
  Auth as AuthComponents,
  Alerts,
  Navs,
  Chat,
  SocketHandler
} from '../common'

const { SnackBarAlert } = Alerts
const { AuthWrapper, AuthView } = AuthComponents
const { ChatTabWrapper } = Chat
const { NavMenu } = Navs

class BaseNavView extends PureComponent {
  render() {
    return (
      <div>
        <AuthWrapper>
          <NavMenu />
        </AuthWrapper>
        {this.props.children}
        <AuthView>
          <ChatTabWrapper />
        </AuthView>
        <AuthView>
          <SocketHandler />
        </AuthView>
        <SnackBarAlert />
      </div>
    )
  }
}

export default BaseNavView
