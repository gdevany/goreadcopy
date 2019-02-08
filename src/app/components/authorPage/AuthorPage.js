import React, { PureComponent } from 'react';
import { BaseNavView } from '../views';
import {
  AuthorTabMenu,
  AuthorPageContent,
  AuthorBackground,
  AuthorMainContainer,
} from './';

class AuthorPage extends PureComponent {
  render() {
    return (
      <BaseNavView>
        <div className="author-page-container row">
          <AuthorTabMenu />
          <AuthorBackground />
          <AuthorMainContainer>
            <AuthorPageContent />
          </AuthorMainContainer>
        </div>
      </BaseNavView>
    );
  }
}

export default AuthorPage;
