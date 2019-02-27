import React, { PureComponent } from "react";
import Dialog from "material-ui/Dialog";
import TextField from "material-ui/TextField";
import { modalStyles, mobileModalStyles } from "./AuthorPageModalStylingCopy";

class AddVideoModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      uploadSelected: true
    };
  }
  renderAddVideoModal = () => {
    const {
      contentStyle,
      hintStyleAlbumName,
      underlineStyleAlbumName,
      inputStyleAlbumName,
      hintStyleDesc,
      underlineStyleDesc,
      inputStyleDesc
    } = modalStyles;

    const {
      mobileHintStyleAlbumName,
      mobileUnderlineStyleAlbumName,
      mobileInputStyleAlbumName
    } = mobileModalStyles;

    return (
      <div className="">
        <Dialog
          bodyClassName="addPhotoAlbumModal-modalDialogBox"
          title="Add Video"
          modal={false}
          open={this.props.open}
          titleClassName="addPhotoAlbumModal-modalTitle"
          paperClassName="addPhotoAlbumModal-modalPaper"
          onRequestClose={this.props.handleModalClose}
          contentStyle={contentStyle}
          autoScrollBodyContent={true}
        >
          <div className="addPhotoAlbumModal-modalInputWrapper">
            <div className="addPhotoAlbumModal-modalInputBox">
              <TextField
                id="addPhotoAlbumModal-addAlbumName"
                fullWidth={true}
                hintText="Video Title"
                hintStyle={hintStyleAlbumName}
                underlineStyle={underlineStyleAlbumName}
                inputStyle={inputStyleAlbumName}
              />
            </div>
            <div className="addPhotoAlbumModal-modalTextAreaBox">
              <TextField
                hintText="What would you like to say"
                multiLine={true}
                rows={4}
                rowsMax={4}
                fullWidth={true}
                hintStyle={hintStyleDesc}
                underlineStyle={underlineStyleDesc}
                inputStyle={inputStyleDesc}
                className="addPhotoAlbumModal-modalTextAreaInput"
              />
            </div>
          </div>
          <div className="addVideoModal-uploadOrUrlButtons-wrapper">
            <div
              className={`addVideoModal-uploadOrUrlButton addVideoModal-uploadButton ${this
                .state.uploadSelected === true && "addVideoModalBlueBack"}`}
              onClick={() => this.setState({ uploadSelected: true })}
            >
              Upload
            </div>
            <div
              className={`addVideoModal-uploadOrUrlButton addVideoModal-pasteUrlButton ${this
                .state.uploadSelected === false && "addVideoModalBlueBack"}`}
              onClick={() => this.setState({ uploadSelected: false })}
            >
              Paste a URL
            </div>
          </div>
          {this.state.uploadSelected === true ? (
            <div
              className="addPhotoAlbumModal-modalAddPhoto"
              onClick={() => this.handleAddVideoUpload()}
            >
              <div className="addPhotoAlbumModal-modalPlusSign">+</div>
              <div className="addPhotoAlbumModal-modalAddPhotoText">
                Add Video
              </div>
            </div>
          ) : (
            <div>
              <div className="addVideoModal-modalInputBox">
                <TextField
                  fullWidth={true}
                  hintText="Add a YouTube or Vimeo URL"
                  hintStyle={mobileHintStyleAlbumName}
                  underlineStyle={mobileUnderlineStyleAlbumName}
                  inputStyle={mobileInputStyleAlbumName}
                />
              </div>
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
            </div>
          )}
        </Dialog>
      </div>
    );
  };

  handleAddVideoUpload = () => {
    alert("TODO: connect ADD VIDEO");
  };

  handleAddVideoURL = e => {
    e.preventDefault();
    alert("TODO: connect ADD VIDEO URL");
  };

  render() {
    return <reactFragment>{this.renderAddVideoModal()}</reactFragment>;
  }
}

export default AddVideoModal;
