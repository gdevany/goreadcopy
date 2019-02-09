import React, { PureComponent } from 'react';
import AuthorsAlbums from './AuthorsAlbums'

class AuthorPagePhotos extends PureComponent {
  render() {
    return (
      <div className="author-photos-container">
        <AuthorsAlbums />
      </div>
    );
  }
}

export default AuthorPagePhotos;
