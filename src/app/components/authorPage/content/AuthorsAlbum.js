import React, { PureComponent } from "react";
import { AvAlbum } from "material-ui/svg-icons";

class AuthorsAlbum extends PureComponent {
  constructor(props) {
    super(props);
  }

  renderAlbumImages = () => {
    const albumImages = this.props.album.content.map(image => {
      return (
        <reactFragment key={image.id}>
          <div
            className="authors-album-imgBox small-6 medium-4 large-3 columns"
            onClick={e => this.openImageModal(image, e)}
          >
            <img
              className="authors-album-img"
              src={image.image}
              alt={`album image ${image.id}`}
            />
          </div>
        </reactFragment>
      );
    });
    return albumImages;
  };

  // TODO: create <openImageModal /> and take out alert
  openImageModal = (image, e) => {
    e.preventDefault();
    alert("TODO: create openImageModal");
  };

  render() {
    return (
      <div>
        <div className="authors-album-title">{this.props.album.title}</div>
        <p className="authors-album-desc">{this.props.album.desc}</p>
        {this.renderAlbumImages()}
      </div>
    );
  }
}

export default AuthorsAlbum;
