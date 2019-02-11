import React, { PureComponent } from "react";
import AuthorsAlbums from "./AuthorsAlbums";
import AuthorsPhotos from "./AuthorsPhotos";

class AuthorPagePhotos extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      photosOrAlbumsSelected: "photos",
      albumSelectedCounter: 0
    };
  }

  renderPhotosOrAlbums = () => {
    const { photosOrAlbumsSelected } = this.state;
    const selected = "author-page-photos-button-selected";
    const notSelected = "author-page-photos-button-notSelected";
    return (
      <div className="author-page-photos-pageSelector row">
        <a
          href="#"
          className={`${
            photosOrAlbumsSelected === "photos" ? selected : notSelected
          }`}
          onClick={e => this.handlePageSelector("photos", e)}
        >
          Photos
        </a>
        <a
          href="#"
          className={`author-page-photos-padLeft ${
            photosOrAlbumsSelected === "albums" ? selected : notSelected
          }`}
          onClick={e => this.handlePageSelector("albums", e)}
        >
          Albums
        </a>
      </div>
    );
  };

  handlePageSelector = (pOrA, e) => {
    e.preventDefault();
    const { photosOrAlbumsSelected } = this.state;
    pOrA === "albums" &&
      photosOrAlbumsSelected === "albums" &&
      this.renderAlbumsRerender();
    this.setState({ photosOrAlbumsSelected: pOrA });
  };

  renderAlbumsRerender = () => {
    let count = this.state.albumSelectedCounter + 1;
    this.setState({ albumSelectedCounter: count });
  };

  render() {
    const { photosOrAlbumsSelected, albumSelectedCounter } = this.state;
    return (
      <div className="author-photos-container">
        {this.renderPhotosOrAlbums()}
        {photosOrAlbumsSelected === "albums" ? (
          <AuthorsAlbums counter={albumSelectedCounter} />
        ) : (
          <AuthorsPhotos />
        )}
      </div>
    );
  }
}

export default AuthorPagePhotos;
