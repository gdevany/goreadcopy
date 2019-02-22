import React, { PureComponent } from "react";
import AuthorsPhotos from "./AuthorsPhotos";

class AuthorsAlbum extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <reactFragment>
        <div className="authors-album-title">{this.props.album.title}</div>
        <p className="authors-album-desc">{this.props.album.desc}</p>
        <AuthorsPhotos payload={this.props.album.content} {...this.props} />
      </reactFragment>
    );
  }
}

export default AuthorsAlbum;
