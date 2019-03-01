import React, { PureComponent } from 'react';
import {
  AuthorPageWall,
  AuthorPageStore,
  AuthorPageVideos,
  AuthorPageArticles,
  AuthorPagePhotos,
  AuthorPageEvents,
  AuthorPageContact,
} from './';

class AuthorPageContent extends PureComponent {
  handlePageContent() {
    const { content, author } = this.props;
    let result;
    switch (content) {
      case 'wall':
        result = (<AuthorPageWall />);
        break;
      case 'store':
        result = (<AuthorPageStore />);
        break;
      case 'videos':
        result = (<AuthorPageVideos />);
        break;
      case 'articles':
        result = (<AuthorPageArticles />);
        break;
      case 'photos':
        result = (<AuthorPagePhotos />);
        break;
      case 'events':
        result = (<AuthorPageEvents />);
        break;
      case 'contact':
        result = (<AuthorPageContact name={author.title} />);
        break;
      default:
        result = (<AuthorPageWall />);
        break;
    }
    return result;
  }

  render() {
    return (
      <div className="author-page-content-container">
        {this.handlePageContent()}
      </div>
    );
  }
}

export default AuthorPageContent;
