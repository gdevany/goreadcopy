import React, { PureComponent } from "react";
import AddVideoModal from "./AddVideoModal";
import AddVideoMobileModal from "./AddVideoMobileModal";
import AuthorsVideos from "./AuthorsVideos";
import { tempPhotoInfo } from "./AuthorPageTempPhotoInfo";

// NOTE: code for like/comment/share pulled in from TileDefault.js
// TODO: convert icons for like/comment/share from react-player to material-ui

class AuthorPageVideos extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isUserLoggedIn: true,
      openModal: false,
      openMobileModal: false
    };
  }

  renderAddVideoButton = () => {
    const allowUserToAdd = this.state.isUserLoggedIn && (
      <reactFragment>
        <button
          className="hide-for-small-only authors-videos-addVideoButton text-center"
          onClick={e => {
            this.handleModalOpen(e);
          }}
        >
          Add Video
        </button>
        <button
          className="show-for-small-only authors-videos-addVideoButton text-center"
          onClick={e => {
            this.handleMobileModalOpen(e);
          }}
        >
          Add Video
        </button>
      </reactFragment>
    );
    return allowUserToAdd;
  };

  handleAddVideoModal = () => {
    return (
      <reactFragment>
        <AddVideoModal
          handleModalClose={this.handleModalClose}
          open={this.state.openModal}
        />
        <AddVideoMobileModal
          handleModalClose={this.handleModalClose}
          open={this.state.openMobileModal}
        />
      </reactFragment>
    );
  };

  handleModalOpen = e => {
    e.preventDefault();
    this.setState({ openModal: true });
  };

  handleMobileModalOpen = e => {
    e.preventDefault();
    this.setState({ openMobileModal: true });
  };

  handleModalClose = () => {
    this.setState({ openModal: false, openMobileModal: false });
  };

  render() {
    return (
      <div className="authors-videos-container">
        {this.handleAddVideoModal()}
        <div className="authors-videos-UserLoggedAddVideo-wrapper">
          {this.renderAddVideoButton()}
        </div>
        <div className="authors-videos-wrapper">
          <AuthorsVideos
            isUserLoggedIn={this.state.isUserLoggedIn}
            videos={tempPhotoInfo.videos}
          />
        </div>
      </div>
    );
  }
}
export default AuthorPageVideos;
