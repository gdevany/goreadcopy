import React, { PureComponent } from 'react'
import {
  Auth as AuthComponents,
  Navs,
  Chat,
  SocketHandler
} from '../common'

const { ChatTabWrapper } = Chat
const { NavMenu } = Navs
const { AuthWrapper, AuthView } = AuthComponents

class BaseNavView extends PureComponent {
  render() {
    return (
      <AuthWrapper>
        <NavMenu />
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

export default BaseNavView
