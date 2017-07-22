import React, { PureComponent } from 'react'
import {
  Auth as AuthComponents,
  Alerts,
  Navs,
  Chat,
  SocketHandler
} from '../common'

const { SnackBarAlert } = Alerts
const { ChatTabWrapper } = Chat
const { AuthWrapper, AuthView } = AuthComponents
const { StoreNavMenu } = Navs

class StoreNavView extends PureComponent {
  render() {
    return (
      <AuthWrapper>
        <StoreNavMenu />
        {this.props.children}
        <AuthView>
          <ChatTabWrapper />
        </AuthView>
        <AuthView>
          <SocketHandler />
        </AuthView>
        <SnackBarAlert />
      </AuthWrapper>
    )
  }
}

export default StoreNavView
