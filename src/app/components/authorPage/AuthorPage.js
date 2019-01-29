import React, { PureComponent } from 'react';
import { BaseNavView } from '../views';
import { AuthorTabMenu, AuthorPageContainer } from './';

class AuthorPage extends PureComponent {
  render() {
    return (
      <BaseNavView>
        <div className="author-page-container row">
          <AuthorTabMenu />
          <AuthorPageContainer />
        </div>
      </BaseNavView>
    );
  }
}

export default AuthorPage;
