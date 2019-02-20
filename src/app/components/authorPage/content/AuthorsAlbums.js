import React, { PureComponent } from "react";
import AuthorsAlbum from "./AuthorsAlbum";
import AddPhotoAlbumMobileButton from "./AddPhotoAlbumMobileButton";

//NOTE !! : AuthorPageContent (switch) default changed to AuhorsPagePhotos
//NOTE !! : Change default back to AuthorPageWall

class AuthorsAlbums extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      albumSelected: []
    };
  }

  // If props.counter changes (by clicking the 'albumx' button)...
  // reset the albumSelected array to empty.
  componentDidUpdate(prevProps) {
    if (this.props.counter !== prevProps.counter) {
      this.setState({ albumSelected: [] });
    }
  }

  renderAlbums = () => {
    const { albumContent } = this.props;
    let mapAlbums =
      albumContent &&
      albumContent.albums.map(album => {
        return (
          <div
            className="authors-albums-poster small-6 columns"
            key={album.id}
            onClick={e => this.renderAlbumSelected(album, e)}
          >
            <img
              className="authors-albums-img"
              src={album.poster}
              alt="album poster"
            />
            <div className="authors-albums-title-wrapper text-left">
              <div className="authors-albums-AlbumsTitle">{album.title}</div>
              <div className="authors-albums-AlbumsItems">
                {album.content.length}
                {" items"}
              </div>
            </div>
          </div>
        );
      });
    return mapAlbums;
  };

  // Sets the album selected
  renderAlbumSelected = (album, e) => {
    e.preventDefault();
    this.setState({
      albumSelected: [...this.state.albumSelected, album]
    });
  };

  render() {
    return (
      <div className="authors-albums-wrapper">
        {this.state.albumSelected.length > 0 ? (
          <AuthorsAlbum album={this.state.albumSelected[0]} />
        ) : (
          <div className="row">
            {this.props.isUserLoggedIn && (
              <AddPhotoAlbumMobileButton {...this.props} />
            )}
            {this.renderAlbums()}
          </div>
        )}
      </div>
    );
  }
}

export default AuthorsAlbums;
