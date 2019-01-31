import React, { PureComponent } from 'react';
import AuthorsBooks from './AuthorsBooks'


class AuthorPageStore extends PureComponent {
  render() {
    return (
      <div className="author-store-container">
        <AuthorsBooks />
      </div>
    );
  }
}

export default AuthorPageStore;
