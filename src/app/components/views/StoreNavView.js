import React, { PureComponent } from 'react';
import { SnackBarAlert } from '../common/alerts';
import { AuthWrapper, AuthView } from '../common/auth';
import { ChatTabWrapper } from '../common/chat';
import { StoreNavMenu } from '../common/navs';
import { SocketHandler } from '../common';

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
    );
  }
}

export default StoreNavView;
