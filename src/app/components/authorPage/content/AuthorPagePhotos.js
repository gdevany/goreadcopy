import React, { PureComponent } from "react";
import AuthorsAlbums from "./AuthorsAlbums";
import AuthorsPhotos from "./AuthorsPhotos";
import Dialog from "material-ui/Dialog";
import TextField from "material-ui/TextField";
import { tempPhotoInfo } from "./AuthorPageTempPhotoInfo";
import { modalStyles } from "./AuthorPageModalStyling";

class AuthorPagePhotos extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      photoOrAlbumSelected: "photos",
      albumSelectedCounter: 0, //This is a generic counter to re-render AuthorsAlbums when album button selected
      allImages: [],
      isUserLoggedIn: true,
      open: false,
      addPhotoOrAlbum: "Upload Photos"
    };
  }

  componentDidMount = () => {
    let allImages = [];
    tempPhotoInfo.albums.map(album => {
      album.content.map(image => {
        allImages.push(image);
      });
    });
    tempPhotoInfo.images.map(image => {
      allImages.push(image);
    });
    this.setState({ allImages });
  };

  renderPhotoOrAlbumButtons = () => {
    const { photoOrAlbumSelected } = this.state;
    const selected = "author-page-photos-button-selected";
    const notSelected = "author-page-photos-button-notSelected";
    return (
      <reactFragment>
        <a
          href="#"
          className={`${
            photoOrAlbumSelected === "photos" ? selected : notSelected
          }`}
          onClick={e => this.handlePageSelector("photos", e)}
        >
          {this.state.isUserLoggedIn ? "Your Photos" : "Photos"}
        </a>
        <a
          href="#"
          className={`author-page-photos-padLeft ${
            photoOrAlbumSelected === "albums" ? selected : notSelected
          }`}
          onClick={e => this.handlePageSelector("albums", e)}
        >
          Albums
        </a>
      </reactFragment>
    );
  };

  renderAddPhotoOrAlbumButtons = () => {
    const allowUserToAdd = this.state.isUserLoggedIn && (
      <div className="hide-for-small-only">
        <button
          className="author-page-photos-addPhotoButton"
          onClick={e => {
            this.handleOpen("Upload Photos", e);
          }}
        >
          Add Photos
        </button>
        <button
          className="author-page-photos-addPhotoButton"
          onClick={e => {
            this.handleOpen("Create Album", e);
          }}
        >
          Create Album
        </button>
      </div>
    );
    return allowUserToAdd;
  };

  // Toggle photos or albums.
  // If currently on album, it adds a counter to state,...
  // which then changes props sent to AuthorsAlbums.
  handlePageSelector = (pORa, e) => {
    e.preventDefault();
    const { photoOrAlbumSelected } = this.state;
    pORa === "albums" &&
      photoOrAlbumSelected === "albums" &&
      this.renderAlbumsRerender();
    this.setState({ photoOrAlbumSelected: pORa });
  };

  // This counter changes state, which is needed to change props sent to AuthorsAlbums
  // if you are currently viewing AuthorsAlbum and click 'albums' button.
  renderAlbumsRerender = () => {
    let count = this.state.albumSelectedCounter + 1;
    this.setState({ albumSelectedCounter: count });
  };

  // TODO: move this to it's own component after Material-ui -v update
  handleAddAlbumOrPhotoModal = () => {
    return (
      <div>
        <Dialog
          bodyClassName="author-page-photos-modalDialogBox"
          title={this.state.addPhotoOrAlbum}
          modal={false}
          open={this.state.open}
          titleClassName="author-page-photos-modalTitle"
          paperClassName="author-page-photos-modalPaper"
          onRequestClose={this.handleClose}
          contentStyle={modalStyles.contentStyle}
        >
          <div className="author-page-photos-modalInput">
            {this.state.addPhotoOrAlbum === "Create Album" && (
              <TextField
                id="author-page-photos-addAlbumName"
                fullWidth={true}
                hintText="Album Name"
                hintStyle={modalStyles.hintStyleAlbumName}
                underlineStyle={modalStyles.underlineStyleAlbumName}
                inputStyle={modalStyles.inputStyleAlbumName}
              />
            )}
            <TextField
              hintText="What would you like to say"
              multiLine={true}
              rows={6}
              rowsMax={6}
              fullWidth={true}
              hintStyle={modalStyles.hintStyleDesc}
              underlineStyle={modalStyles.underlineStyleDesc}
              inputStyle={modalStyles.inputStyleDesc}
              className="author-page-photos-modalTextAreaInput"
            />
          </div>
          <div className="author-page-photos-modalAddPhoto">
            <div className="author-page-photos-modalPlusSign">+</div>
            <div className="author-page-photos-modalAddPhotoText">
              Add Photo
            </div>
          </div>
        </Dialog>
      </div>
    );
  };

  handleOpen = (pORa, e) => {
    e.preventDefault();
    this.setState({ open: true, addPhotoOrAlbum: pORa });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { photoOrAlbumSelected, albumSelectedCounter } = this.state;
    return (
      <div className="author-page-photos-container">
        <div className="author-page-photos-UserLoggedAddAlbumsPhotos-wrapper row">
          {this.renderAddPhotoOrAlbumButtons()}
          {this.handleAddAlbumOrPhotoModal()}
        </div>
        <div className="author-page-photos-pageSelector-wrapper row">
          {this.renderPhotoOrAlbumButtons()}
        </div>

        {photoOrAlbumSelected === "albums" ? (
          <AuthorsAlbums
            counter={albumSelectedCounter}
            albumContent={tempPhotoInfo}
            isUserLoggedIn={this.state.isUserLoggedIn}
            photosORalbum="Create Albums"
          />
        ) : (
          <div className="author-page-photos-wrapper">
            <AuthorsPhotos
              payload={this.state.allImages}
              isUserLoggedIn={this.state.isUserLoggedIn}
              photosORalbum="Add Photos"
            />
          </div>
        )}
      </div>
    );
  }
}

export default AuthorPagePhotos;
