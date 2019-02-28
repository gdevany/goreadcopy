import React, { PureComponent } from "react";
import Dialog from "material-ui/Dialog";
import TextField from "material-ui/TextField";
import { mobileModalStyles } from "./AuthorPageModalStylingCopy";

class AddArticleMobileModal extends PureComponent {
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
          bodyClassName="addArticleMobileModal-modalDialogBox"
          modal={false}
          open={this.props.open}
          paperClassName="addArticleMobileModal-modalPaper"
          onRequestClose={this.renderCloseModal}
          contentStyle={mobileContentStyle}
          autoScrollBodyContent={true}
        >
          <div className="addArticleMobileModal-modalInputBox">
            <TextField
              fullWidth={true}
              hintText="Article Title"
              hintStyle={mobileHintStyleAlbumName}
              underlineStyle={mobileUnderlineStyleAlbumName}
              inputStyle={mobileInputStyleAlbumName}
            />
          </div>
          <div className="addArticleMobileModal-modalTextAreaBox">
            <TextField
              hintText="Description"
              multiLine={true}
              rows={5}
              rowsMax={5}
              fullWidth={true}
              hintStyle={mobileHintStyleDesc}
              underlineStyle={mobileUnderlineStyleDesc}
              inputStyle={mobileInputStyleDesc}
              className="addArticleMobileModal-modalTextAreaInput"
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
        className="addArticleMobileModal-modalInputBox"
        onClick={() => this.handleVideoTypeDropdownSelected()}
      >
        <div className="addArticleMobileModal-modalText">
          Video Type
          <span className="addArticleMobileModal-dropdownArrow">
            <i className="addArticleMobileModal-downArrow" />
          </span>
        </div>
      </div>
    );
  };

  renderVideoTypeChoices = () => {
    return (
      <reactFragment>
        <div
          className="addArticleMobileModal-modalInputBox addArticleMobileModal-modalInputBoxButton"
          onClick={() => this.handleUploadSelected()}
        >
          <div className="addArticleMobileModal-modalText">Upload Video</div>
        </div>

        <div
          className="addArticleMobileModal-modalInputBox addArticleMobileModal-modalInputBoxButton"
          onClick={() => this.handlePasteUrlSelected()}
        >
          <div className="addArticleMobileModal-modalText">Paste Video URL</div>
        </div>
      </reactFragment>
    );
  };

  renderUploadSelected = () => {
    return (
      <reactFragment>
        <div
          className="addArticleMobileModal-modalInputBox addArticleMobileModal-modalInputBoxButton"
          onClick={() => this.handleUpload()}
        >
          <div className="addArticleMobileModal-modalText">Upload</div>
        </div>
        <div
          className="addArticleMobileModal-modalInputBox addArticleMobileModal-modalInputBoxButton"
          onClick={() => this.handleChooseVideo()}
        >
          <div className="addArticleMobileModal-modalText">Choose Video</div>
        </div>
        <div className="addArticleMobileModal-addVideoUrlButton-wrapper">
          <button
            className="addArticleMobileModal-addVideoUrlButton text-center"
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
          className="addArticleMobileModal-modalInputBox"
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
          className="addArticleMobileModal-modalInputBox"
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
        <div className="addArticleMobileModal-addVideoUrlButton-wrapper">
          <button
            className="addArticleMobileModal-addVideoUrlButton text-center"
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

export default AddArticleMobileModal;
