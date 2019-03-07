import React, { PureComponent } from "react";
import Dialog from "material-ui/Dialog";

class AddVideoModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      genericImage: "https://placeimg.com/640/480/architecture",
      uploadSelected: true,
      userGivenTitle: "",
      userGivenDesc: "",
      userGivenUrl: "",
      addPhotoSelected: false
    };
  }
  renderAddVideoModal = () => {
    const contentStyle = {
      width: "80%",
      maxWidth: "none"
    };

    return (
      <div className="">
        <Dialog
          bodyClassName="addVideoModal-modalDialogBox"
          title="Add Video"
          modal={false}
          open={this.props.open}
          titleClassName="addVideoModal-modalTitle"
          paperClassName="addVideoModal-modalPaper"
          onRequestClose={this.renderCloseModal}
          contentStyle={contentStyle}
          autoScrollBodyContent={true}
        >
          <div className="addPhotoAlbumModal-modalInputWrapper">
            {this.renderAddAlbumTitle()}
            {this.renderAddDesc()}
          </div>

          {this.renderUploadOrPasteButtons()}
          {this.state.uploadSelected === true
            ? this.renderAddVideoBox()
            : this.renderPasteUrl()}
        </Dialog>
      </div>
    );
  };

  //initialize state when handleModalClose() because closing modal doesn't really
  //  close the modal, it just moves it off the screen (left position -10000px)
  renderCloseModal = () => {
    this.setState({
      uploadSelected: true,
      userGivenTitle: "",
      userGivenDesc: "",
      userGivenUrl: "",
      addPhotoSelected: false
    });
    this.props.handleModalClose();
  };

  renderAddAlbumTitle = () => {
    return (
      <reactFragment>
        <div className="addVideoModal-modalMultiInputBox boldIt">
          <input
            className="addVideoModal-modalInputBoxText"
            type="text"
            onChange={e => this.handleUserTitleTyped(e)}
            value={this.state.userGivenTitle}
            placeholder="Video Title"
          />
        </div>
      </reactFragment>
    );
  };

  renderAddDesc = () => {
    return (
      <reactFragment>
        <div className="addVideoModal-modalMultiInputBox addVideoModal-modalTextArea">
          <textarea
            className="addVideoModal-modalInputBoxText"
            rows={3}
            onChange={e => this.handleUserDescTyped(e)}
            value={this.state.userGivenDesc}
            placeholder="What would you like to say"
          />
        </div>
      </reactFragment>
    );
  };

  renderUploadOrPasteButtons = () => {
    return (
      <div className="addVideoModal-modalUploadOrUrlButtons-wrapper">
        <div
          className={`addVideoModal-uploadOrUrlButton addVideoModal-uploadButton ${this
            .state.uploadSelected === true && "blueBack"}`}
          onClick={() => this.setState({ uploadSelected: true })}
        >
          Upload
        </div>
        <div
          className={`addVideoModal-uploadOrUrlButton addVideoModal-pasteUrlButton ${this
            .state.uploadSelected === false && "blueBack"}`}
          onClick={() => this.setState({ uploadSelected: false })}
        >
          Paste a URL
        </div>
      </div>
    );
  };

  renderAddVideoBox = () => {
    return (
      <reactFragment>
        <div
          className="addVideoModal-modalAddPhoto"
          onClick={() => this.handleAddPhotoSelected()}
        >
          {this.state.addPhotoSelected === false ? (
            <reactFragment>
              <div className="addPhotoAlbumModal-modalPlusSign text-center">
                +
              </div>
              <div className="addVideoModal-modalAddPhotoText text-center">
                Add Photo
              </div>
            </reactFragment>
          ) : (
            <div className="modalflex">Click to choose different photo</div>
          )}
          {this.state.addPhotoSelected === true && this.renderTheAddedPhoto()}
        </div>
        {this.state.addPhotoSelected === true && this.renderAddVideoButton()}
      </reactFragment>
    );
  };

  //TODO:
  renderTheAddedPhoto = () => {
    return (
      <div className="row">
        <div className="addPhotoAlbumModal-imageBox">
          <img src={this.state.genericImage} alt="image" />
        </div>
      </div>
    );
  };

  renderPasteUrl = () => {
    return (
      <reactFragment>
        <div className="addArticleModal-modalInputBox">
          <input
            className="addPhotoAlbumModal-modalInputBoxText"
            type="text"
            onChange={e => this.handleUserUrlTyped(e)}
            value={this.state.userGivenUrl}
            placeholder="Add a YouTube or Vimeo URL"
          />
        </div>
        {this.state.userGivenUrl.length > 3 && this.renderAddVideoButton()}
      </reactFragment>
    );
  };

  renderAddVideoButton = () => {
    return (
      <div className="addVideoModal-addVideoUrlButton-wrapper">
        <button
          className="addVideoModal-addVideoUrlButton text-center"
          onClick={e => {
            this.handleAddVideoURL(e);
          }}
        >
          Add Video
        </button>
      </div>
    );
  };

  handleUserTitleTyped = e => {
    this.setState({ userGivenTitle: e.target.value });
  };

  handleUserDescTyped = e => {
    this.setState({ userGivenDesc: e.target.value });
  };

  handleUserUrlTyped = e => {
    this.setState({ userGivenUrl: e.target.value });
  };

  handleAddPhotoSelected = () => {
    this.setState({ addPhotoSelected: !this.state.addPhotoSelected });
  };

  //TODO:
  handleAddVideoURL = e => {
    e.preventDefault();
    alert("TODO: connect ADD VIDEO URL");
  };

  render() {
    return <reactFragment>{this.renderAddVideoModal()}</reactFragment>;
  }
}

export default AddVideoModal;
