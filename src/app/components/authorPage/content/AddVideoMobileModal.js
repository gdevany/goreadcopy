import React, { PureComponent } from "react";
import Dialog from "material-ui/Dialog";

class AddVideoMobileModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      userGivenTitle: "",
      userGivenDesc: "",
      categorySelected: "Video Type",
      categoryHasBeenSelected: false,
      categoryDropdownClicked: false,
      pastedURL: "",
      videoURL: "",
      uploadOrPasteUrlSelected: ""
    };
  }
  renderAddVideoMobileModal = () => {
    const mobileContentStyle = {
      width: "100%",
      maxWidth: "none"
    };

    return (
      <div>
        <Dialog
          bodyClassName="addVideoMobileModal-modalDialogBox"
          modal={false}
          open={this.props.open}
          paperClassName="addVideoMobileModal-modalPaper"
          onRequestClose={this.renderCloseModal}
          contentStyle={mobileContentStyle}
          autoScrollBodyContent={true}
        >
          {this.renderAddVideoTitle()}
          {this.renderAddDesc()}
          {this.renderSelectCategory()}
        </Dialog>
      </div>
    );
  };

  //initialize state when handleModalClose() because closing modal doesn't really
  //  close the modal, it just moves it off the screen (left position -10000px)
  renderCloseModal = () => {
    this.setState({
      userGivenTitle: "",
      userGivenDesc: "",
      categorySelected: "Video Type",
      categoryHasBeenSelected: false,
      categoryDropdownClicked: false,
      pastedURL: "",
      videoURL: "",
      uploadOrPasteUrlSelected: ""
    });
    this.props.handleModalClose();
  };

  renderAddVideoTitle = () => {
    return (
      <reactFragment>
        <div className="addVideoMobileModal-modalInputBox">
          <input
            className="addVideoMobileModal-modalInputBoxText"
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
        <div className="addVideoMobileModal-modalInputBox addVideoModal-modalTextArea">
          <textarea
            className="addVideoMobileModal-modalInputBoxText"
            rows={3}
            onChange={e => this.handleUserDescTyped(e)}
            value={this.state.userGivenDesc}
            placeholder="Description"
          />
        </div>
      </reactFragment>
    );
  };

  renderSelectCategory = () => {
    return (
      <reactFragment>
        <div
          className="addVideoMobileModal-modalInputBox"
          onClick={() => this.handleCategoryDropdownToggle()}
        >
          <div
            className={`addVideoMobileModal-modalInputBoxText ${this.state
              .categoryHasBeenSelected === true &&
              "addVideoMobileModal-normalTextColor"}`}
          >
            {this.state.categorySelected}
          </div>
          <span className="addVideoMobileModal-dropdownArrow">
            <i className="addVideoMobileModal-downArrow" />
          </span>
        </div>
        {this.state.categoryDropdownClicked === true
          ? this.renderVideoTypeChoices()
          : (this.state.categorySelected === "Upload Video" &&
              this.renderUploadSelected()) ||
            (this.state.categorySelected === "Paste Video URL" &&
              this.renderPasteUrlSelected())}
      </reactFragment>
    );
  };

  renderVideoTypeChoices = () => {
    return (
      <reactFragment>
        <div
          className="addVideoMobileModal-modalInputBox addVideoMobileModal-modalInputBoxSelector"
          onClick={() => this.handleUploadSelected()}
        >
          <div className="addVideoMobileModal-modalText">Upload Video</div>
        </div>

        <div
          className="addVideoMobileModal-modalInputBox addVideoMobileModal-modalInputBoxSelector"
          onClick={() => this.handlePasteUrlSelected()}
        >
          <div className="addVideoMobileModal-modalText">Paste Video URL</div>
        </div>
      </reactFragment>
    );
  };

  renderUploadSelected = () => {
    return (
      <reactFragment>
        <div
          className="addVideoMobileModal-modalInputBox addVideoMobileModal-modalInputBoxButton"
          onClick={() => this.handleUpload()}
        >
          <div className="addVideoMobileModal-modalText">Upload</div>
        </div>
        <div
          className="addVideoMobileModal-modalInputBox addVideoMobileModal-modalInputBoxButton"
          onClick={() => this.handleChooseVideo()}
        >
          <div className="addVideoMobileModal-modalText">Choose Video</div>
        </div>
        <div className="addVideoMobileModal-addVideoUrlButton-wrapper">
          <button
            className="addVideoMobileModal-addVideoUrlButton text-center"
            onClick={e => {
              this.handleAddVideoUpload(e);
            }}
          >
            Add Video
          </button>
        </div>
      </reactFragment>
    );
  };

  renderPasteUrlSelected = () => {
    return (
      <reactFragment>
        <div className="addVideoMobileModal-modalInputBox">
          <input
            className="addVideoMobileModal-modalInputBoxText"
            type="text"
            onChange={e => this.handleUserPasteUrlTyped(e)}
            value={this.state.pastedURL}
            placeholder="Paste a URL"
          />
        </div>
        <div className="addVideoMobileModal-modalInputBox">
          <input
            className="addVideoMobileModal-modalInputBoxText"
            type="text"
            onChange={e => this.handleUserTypedUrlTyped(e)}
            value={this.state.videoURL}
            placeholder="Video URL"
          />
        </div>
        <div className="addVideoMobileModal-addVideoUrlButton-wrapper">
          <button
            className="addVideoMobileModal-addVideoUrlButton text-center"
            onClick={e => {
              this.handleAddVideoURL(e);
            }}
          >
            Add Video
          </button>
        </div>
      </reactFragment>
    );
  };

  handleUploadSelected = () => {
    this.setState({
      categorySelected: "Upload Video",
      categoryDropdownClicked: false
    });
  };

  handlePasteUrlSelected = () => {
    this.setState({
      categorySelected: "Paste Video URL",
      categoryDropdownClicked: false
    });
  };

  handleUserTitleTyped = e => {
    this.setState({ userGivenTitle: e.target.value });
  };

  handleUserDescTyped = e => {
    this.setState({ userGivenDesc: e.target.value });
  };

  handleUserPasteUrlTyped = e => {
    this.setState({ pastedURL: e.target.value, videoURL: "" });
  };

  handleUserTypedUrlTyped = e => {
    this.setState({ videoURL: e.target.value, pastedURL: "" });
  };

  handleCategoryDropdownToggle = () => {
    this.setState({
      categoryDropdownClicked: !this.state.categoryDropdownClicked
    });
  };

  handleCategorySelected = category => {
    this.setState({
      categorySelected: category,
      categoryHasBeenSelected: true,
      categoryDropdownClicked: false
    });
  };

  //TODO:
  handleUpload = () => {
    alert("Upload clicked");
  };

  //TODO:
  handleChooseVideo = () => {
    alert("Choose Video clicked");
  };

  //TODO: replace alert with videoURL or pastedURL when submitted
  handleAddVideoUpload = () => {
    alert("TODO: connect video to upload");
  };

  //TODO: replace alert with videoURL or pastedURL when submitted
  handleAddVideoURL = () => {
    this.state.pastedURL.length > 1 &&
      alert(`TODO: connect pasted: ${this.state.pastedURL}`);
    this.state.videoURL.length > 1 &&
      alert(`TODO: connect video: ${this.state.videoURL}`);
  };

  render() {
    return <reactFragment>{this.renderAddVideoMobileModal()}</reactFragment>;
  }
}

export default AddVideoMobileModal;
