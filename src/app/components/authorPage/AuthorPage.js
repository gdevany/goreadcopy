import React, { PureComponent } from 'react';
import { BaseNavView } from '../views';
import { AuthorTabMenu, AuthorPageContent } from './';

class AuthorPage extends PureComponent {
  render() {
    return (
      <BaseNavView>
        <div className="author-page-container row">
          <AuthorTabMenu />
          <AuthorPageContent />
        </div>
      </BaseNavView>
    );
  }
}

export default AuthorPage;
