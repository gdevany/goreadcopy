import React, { PureComponent } from "react";
import Dialog from "material-ui/Dialog";
import TextField from "material-ui/TextField";
import { mobileModalStyles } from "./AuthorPageModalStylingCopy";

class AddVideoMobileModal extends PureComponent {
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
          onRequestClose={this.props.handleModalClose}
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
          <div
            className="addVideoMobileModal-modalInputBox"
            onClick={e => {
              this.handleVideoType(e);
            }}
          >
            <TextField
              fullWidth={true}
              hintText="Video Type v"
              hintStyle={mobileHintStyleAlbumName}
              underlineStyle={mobileUnderlineStyleAlbumName}
              inputStyle={mobileInputStyleAlbumName}
            />
          </div>
          <div
            className="addVideoMobileModal-modalInputBox"
            onClick={() => this.handleUploadSelected()}
          >
            <div className="addVideoMobileModal-modalText">
              Upload Video
            </div>
          </div>
          <div
            className="addVideoMobileModal-modalInputBox"
            onClick={() => this.handlePasteUrlSelected()}
          >
            <div className="addVideoMobileModal-modalText">
              Paste Video URL
            </div>
          </div>
        </Dialog>
      </div>
    );
  };

  handleVideoType = e => {
    e.preventDefault();
    alert("video type clicked");
  };

  handleUploadSelected = () => {
    alert("Upload clicked")
  }

  handlePasteUrlSelected = () => {
    alert("Paste URL clicked")
  }

  render() {
    return (
      <reactFragment>{this.renderAddVideoMobileModal()}</reactFragment>
    );
  }
}

export default AddVideoMobileModal;
