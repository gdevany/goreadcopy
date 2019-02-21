import React, { PureComponent } from "react";
import Dialog from "material-ui/Dialog";
import TextField from "material-ui/TextField";
import { mobileModalStyles } from "./AuthorPageModalStyling";

class AddPhotoAlbumMobilModal extends PureComponent {
  renderAddPhotoAlbumMobileModal = () => {
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
          bodyClassName="addPhotoAlbumMobileModal-modalDialogBox"
          modal={false}
          open={this.props.open}
          paperClassName="addPhotoAlbumMobileModal-modalPaper"
          onRequestClose={this.props.handleModalClose}
          contentStyle={mobileContentStyle}
          autoScrollBodyContent={true}
        >
          <div
            className="addPhotoAlbumMobileModal-modalInputBox"
            onClick={() => this.addImage()}
          >
            <div className="addPhotoAlbumMobileModal-modalPlusSign">+</div>
            <div className="addPhotoAlbumMobileModal-modalAddPhotoText">
              Add Photo
            </div>
          </div>
          {this.props.addPhotoOrAlbum === "Create Album" && (
            <div className="addPhotoAlbumMobileModal-modalInputBox">
              <TextField
                id="addPhotoAlbumModal-addAlbumName"
                fullWidth={true}
                hintText="Album Name"
                hintStyle={mobileHintStyleAlbumName}
                underlineStyle={mobileUnderlineStyleAlbumName}
                inputStyle={mobileInputStyleAlbumName}
              />
            </div>
          )}
          <div className="addPhotoAlbumMobileModal-modalTextAreaBox">
            <TextField
              hintText="Description"
              multiLine={true}
              rows={5}
              rowsMax={5}
              fullWidth={true}
              hintStyle={mobileHintStyleDesc}
              underlineStyle={mobileUnderlineStyleDesc}
              inputStyle={mobileInputStyleDesc}
              className="addPhotoAlbumMobilModal-modalTextAreaInput"
            />
          </div>
        </Dialog>
      </div>
    );
  };

  addImage = () => {
    alert("TODO: connect ADD IMAGE");
  };

  render() {
    return (
      <reactFragment>{this.renderAddPhotoAlbumMobileModal()}</reactFragment>
    );
  }
}

export default AddPhotoAlbumMobilModal;
