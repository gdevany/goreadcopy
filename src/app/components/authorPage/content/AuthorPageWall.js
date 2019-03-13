import React, { PureComponent } from 'react';
import AuthorsWall from './AuthorsWall';


class AuthorPageWall extends PureComponent {
  render() {
    return (
      <div className="author-wall-container">
        <AuthorsWall userLoggedIn={true} />
      </div>
    );
  }
}

export default AuthorPageWall;
