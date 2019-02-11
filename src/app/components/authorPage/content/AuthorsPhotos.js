import React, { PureComponent } from "react";

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

  // TODO: create <openImageModal /> and take out alert
  openImageModal = (image, e) => {
    e.preventDefault();
    alert("TODO: create openImageModal");
  };

  render() {
    return <reactFragment>{this.renderImages()}</reactFragment>;
  }
}

export default AuthorsPhotos;
