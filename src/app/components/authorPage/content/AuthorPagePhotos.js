import React, { PureComponent } from "react";
import AuthorsAlbums from "./AuthorsAlbums";

class AuthorPagePhotos extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isPhotosSelected: true
    };
  }

  renderPhotosOrAlbums = () => {
    const { isPhotosSelected } = this.state;
    return (
      <div
        className={`author-page-photos-pageSelector small-12 columns ${
          isPhotosSelected ? "text-left" : "text-right"
        }`}
      >
        <a
          href="#"
          className={`${
            isPhotosSelected
              ? "author-page-photos-button-selected"
              : "author-page-photos-button-notSelected"
          }`}
          onClick={this.handlePageSelector}
        >
          Photos
        </a>
        <a
          href="#"
          className={`author-page-photos-padLeft ${
            isPhotosSelected
              ? "author-page-photos-button-notSelected"
              : "author-page-photos-button-selected"
          }`}
          onClick={this.handlePageSelector}
        >
          Albums
        </a>
      </div>
    );
  };

  handlePageSelector = () => {
    this.setState(prevState => ({
      isPhotosSelected: !prevState.isPhotosSelected
    }));
  };

  render() {
    return (
      <div className="author-photos-container">
        {this.renderPhotosOrAlbums()}
        <AuthorsAlbums />
      </div>
    );
  }
}

export default AuthorPagePhotos;
