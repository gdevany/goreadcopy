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
