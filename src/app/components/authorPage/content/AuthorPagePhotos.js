import React, { PureComponent } from "react";
import AuthorsAlbums from "./AuthorsAlbums";
import AuthorsPhotos from "./AuthorsPhotos";

import AddAlbumsPhotosModal from "./AddAlbumsPhotosModal";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
import { grey100, grey700 } from "material-ui/styles/colors";

const temp = {
  albums: [
    {
      id: 1,
      poster: "https://picsum.photos/640/480/?random",
      title: "Long Title Ellipsis Effect For This Awesome Vacation",
      desc:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nec sollicitudin risus. Phasellus rutrum blandit faucibus. Mauris porta, dolor quis vehicula hendrerit, est massa sollicitudin magna, ac congue sem ipsum.",
      content: [
        {
          id: 1.1,
          image: "https://picsum.photos/640/480/?random"
        },
        {
          id: 1.2,
          image: "https://picsum.photos/480/600/?random"
        },
        {
          id: 1.3,
          image: "https://picsum.photos/300/?random"
        },
        {
          id: 1.4,
          image: "https://picsum.photos/200/300/?random"
        }
      ]
    },
    {
      id: 2,
      poster: "https://picsum.photos/480/600/?random",
      title: "Awesome Vacation2",
      desc:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nec sollicitudin risus. Phasellus rutrum blandit faucibus. Mauris porta, dolor quis vehicula hendrerit, est massa sollicitudin magna, ac congue sem ipsum.",
      content: [
        {
          id: 2.1,
          image: "https://picsum.photos/640/480/?random"
        },
        {
          id: 2.2,
          image: "https://picsum.photos/480/600/?random"
        },
        {
          id: 2.3,
          image: "https://picsum.photos/300/?random"
        },
        {
          id: 2.4,
          image: "https://picsum.photos/200/300/?random"
        }
      ]
    },
    {
      id: 3,
      poster: "https://picsum.photos/300/?random",
      title: "Awesome Vacation3",
      desc:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nec sollicitudin risus. Phasellus rutrum blandit faucibus. Mauris porta, dolor quis vehicula hendrerit, est massa sollicitudin magna, ac congue sem ipsum.",
      content: [
        {
          id: 3.1,
          image: "https://picsum.photos/640/480/?random"
        },
        {
          id: 3.2,
          image: "https://picsum.photos/480/600/?random"
        },
        {
          id: 3.3,
          image: "https://picsum.photos/300/?random"
        },
        {
          id: 3.4,
          image: "https://picsum.photos/200/300/?random"
        }
      ]
    },
    {
      id: 4,
      poster: "https://picsum.photos/200/300/?random",
      title: "Awesome Vacation4",
      desc:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nec sollicitudin risus. Phasellus rutrum blandit faucibus. Mauris porta, dolor quis vehicula hendrerit, est massa sollicitudin magna, ac congue sem ipsum.",
      content: [
        {
          id: 4.1,
          image: "https://picsum.photos/640/480/?random"
        },
        {
          id: 4.2,
          image: "https://picsum.photos/480/600/?random"
        },
        {
          id: 4.3,
          image: "https://picsum.photos/300/?random"
        },
        {
          id: 4.4,
          image: "https://picsum.photos/200/300/?random"
        }
      ]
    }
  ],
  images: [
    {
      id: 5,
      image: "https://picsum.photos/300/?random"
    },
    {
      id: 6,
      image: "https://picsum.photos/640/480/?random"
    },
    {
      id: 7,
      image: "https://picsum.photos/200/300/?random"
    },
    {
      id: 8,
      image: "https://picsum.photos/480/600/?random"
    },
    {
      id: 9,
      image: "https://picsum.photos/300/?random"
    },
    {
      id: 10,
      image: "https://picsum.photos/300/?random"
    }
  ]
};

const modalStyles = {
  contentStyle: {
    width: "80%",
    maxWidth: "none"
  },
  hintStyleAlbumName: {
    color: grey700,
    fontSize: "1.5em",
    fontWeight: "bold",
    paddingLeft: "25px",
    bottom: 0
  },
  hintStyleDesc: {
    paddingLeft: "25px",
    bottom: "unset",
    fontSize: "24px",
    top: 30
  },
  underlineStyleAlbumName: {
    borderBottom: 0,
    borderColor: grey100,
    borderStyle: "dotted",
    bottom: "0 !important"
  },
  underlineStyleDesc: {
    border: "none"
  },
  inputStyleAlbumName: {
    color: grey700,
    fontSize: "1.5em",
    fontWeight: "bold",
    paddingLeft: "25px"
  },
  inputStyleDesc: {
    width: "100%",
    paddingLeft: "25px",
    border: "none"
  }
};

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
    temp.albums.map(album => {
      album.content.map(image => {
        allImages.push(image);
      });
    });
    temp.images.map(image => {
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
    console.log(this.state.addPhotoOrAlbum);

    return (
      <div>
        <Dialog
          title={this.state.addPhotoOrAlbum}
          // actions={actions}
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
                // fullWidth={true}
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
              className="author-page-photos-textAreaModal"
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
            albumContent={temp}
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
