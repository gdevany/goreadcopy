import React, { PureComponent } from "react";
import AddPhotoAlbumMobileButton from "./AddPhotoAlbumMobileButton";

class AuthorsPhotos extends PureComponent {
  renderImages = () => {
    const { payload } = this.props;
    const imagesToBeRendered =
      payload &&
      payload.map(image => {
        return (
          <reactFragment key={image.id}>
            <div
              className="authors-photos-imgBox small-6 medium-4 large-3 columns"
              onClick={e => this.openImageModal(image, e)}
            >
              <img
                className="authors-photos-img"
                src={image.image}
                alt={`album image ${image.id}`}
              />
            </div>
          </reactFragment>
        );
      });
    return imagesToBeRendered;
  };

  openImageModal = (image, e) => {
    e.preventDefault();
    this.props.setAndLoadLightboxModal(image, e);
  };

  render() {
    return (
      <div className="authors-photos-wrapperBox row">
        {this.props.isUserLoggedIn && (
          <AddPhotoAlbumMobileButton {...this.props} />
        )}
        {this.renderImages()}
      </div>
    );
  }
}

export default AuthorsPhotos;
