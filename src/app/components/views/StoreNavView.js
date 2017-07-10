import React, { PureComponent } from 'react'
import {
  Auth as AuthComponents,
  BookStoreNavBar,
  Chat,
  SocketHandler
} from '../common'

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
      </AuthWrapper>
    )
  }
}

export default StoreNavView
