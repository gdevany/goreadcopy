import React, { PureComponent } from 'react'
import {
  Auth as AuthComponents,
  Alerts,
  BookStoreNavBar,
  Chat,
  SocketHandler
} from '../common'

const { SnackBarAlert } = Alerts
const { ChatTabWrapper } = Chat
const { AuthWrapper, AuthView } = AuthComponents

class StoreNavView extends PureComponent {
  render() {
    return (
      <AuthWrapper>
        <BookStoreNavBar />
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
