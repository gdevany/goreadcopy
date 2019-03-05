import React, { PureComponent } from "react";
import Dialog from "material-ui/Dialog";
import TextField from "material-ui/TextField";
import { mobileModalStyles } from "./AuthorPageModalStylingCopy";

class AddVideoMobileModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      pastedURL: "",
      videoURL: "",
      videoTypeDropdownSelected: false,
      videoTypeSelected: false,
      uploadOrPasteUrlSelected: ""
    };
  }
  renderAddVideoMobileModal = () => {
    const {
      mobileContentStyle,
      mobileHintStyleAlbumName,
      mobileUnderlineStyleAlbumName,
      mobileInputStyleAlbumName,
      mobileHintStyleDesc,
      mobileUnderlineStyleDesc,
      mobileInputStyleDesc
    } = mobileModalStyles;
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
          <div className="addVideoMobileModal-modalInputBox">
            <TextField
              fullWidth={true}
              hintText="Video Title"
              hintStyle={mobileHintStyleAlbumName}
              underlineStyle={mobileUnderlineStyleAlbumName}
              inputStyle={mobileInputStyleAlbumName}
            />
          </div>
          <div className="addVideoMobileModal-modalTextAreaBox">
            <TextField
              hintText="Description"
              multiLine={true}
              rows={5}
              rowsMax={5}
              fullWidth={true}
              hintStyle={mobileHintStyleDesc}
              underlineStyle={mobileUnderlineStyleDesc}
              inputStyle={mobileInputStyleDesc}
              className="addVideoMobileModal-modalTextAreaInput"
            />
          </div>

          {this.state.videoTypeDropdownSelected === false
            ? this.renderSelectVideoType()
            : this.state.videoTypeSelected === false
            ? this.renderVideoTypeChoices()
            : null}

          {this.state.uploadOrPasteUrlSelected === "uploadSelected" &&
            this.renderUploadSelected()}

          {this.state.uploadOrPasteUrlSelected === "pasteUrlSelected" &&
            this.renderPasteUrlSelected()}
        </Dialog>
      </div>
    );
  };

  //initialize state when handleModalClose() because closing modal doesn't really
  //  close the modal, it just moves it off the screen (left position -10000px)
  renderCloseModal = () => {
    this.setState({
      pastedURL: "",
      videoURL: "",
      videoTypeDropdownSelected: false,
      videoTypeSelected: false,
      uploadOrPasteUrlSelected: ""
    });
    this.props.handleModalClose();
  };

  renderSelectVideoType = () => {
    return (
      <div
        className="addVideoMobileModal-modalInputBox"
        onClick={() => this.handleVideoTypeDropdownSelected()}
      >
        <div className="addVideoMobileModal-modalText">
          Video Type
          <span className="addVideoMobileModal-dropdownArrow">
            <i className="addVideoMobileModal-downArrow" />
          </span>
        </div>
      </div>
    );
  };

  renderVideoTypeChoices = () => {
    return (
      <reactFragment>
        <div
          className="addVideoMobileModal-modalInputBox addVideoMobileModal-modalInputBoxButton"
          onClick={() => this.handleUploadSelected()}
        >
          <div className="addVideoMobileModal-modalText">Upload Video</div>
        </div>

        <div
          className="addVideoMobileModal-modalInputBox addVideoMobileModal-modalInputBoxButton"
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
    const {
      mobileHintStyleAlbumName,
      mobileUnderlineStyleAlbumName,
      mobileInputStyleAlbumName
    } = mobileModalStyles;
    return (
      <reactFragment>
        <div
          className="addVideoMobileModal-modalInputBox"
          onChange={e =>
            this.setState({ pastedURL: e.target.value, videoURL: "" })
          }
        >
          <TextField
            fullWidth={true}
            hintText="Paste a URL"
            hintStyle={mobileHintStyleAlbumName}
            underlineStyle={mobileUnderlineStyleAlbumName}
            inputStyle={mobileInputStyleAlbumName}
            value={this.state.pastedURL}
          />
        </div>
        <div
          className="addVideoMobileModal-modalInputBox"
          onChange={e =>
            this.setState({ videoURL: e.target.value, pastedURL: "" })
          }
        >
          <TextField
            fullWidth={true}
            hintText="Video URL"
            hintStyle={mobileHintStyleAlbumName}
            underlineStyle={mobileUnderlineStyleAlbumName}
            inputStyle={mobileInputStyleAlbumName}
            value={this.state.videoURL}
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

  handleVideoTypeDropdownSelected = () => {
    this.setState({ videoTypeDropdownSelected: true });
  };

  handleUploadSelected = () => {
    this.setState({
      uploadOrPasteUrlSelected: "uploadSelected",
      videoTypeSelected: true
    });
  };

  handlePasteUrlSelected = () => {
    this.setState({
      uploadOrPasteUrlSelected: "pasteUrlSelected",
      videoTypeSelected: true
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
