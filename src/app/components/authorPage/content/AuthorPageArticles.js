import React, { PureComponent } from 'react';
import AuthorsArticles from './AuthorsArticles';

class AuthorPageArticles extends PureComponent {
  render() {
    return (
      <div className="author-articles-container">
        <AuthorsArticles />
      </div>
    );
  }
}

export default AuthorPageArticles;
