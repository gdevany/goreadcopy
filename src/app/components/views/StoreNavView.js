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
      <div>
        <AuthWrapper>
          <StoreNavMenu />
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

export default StoreNavView
