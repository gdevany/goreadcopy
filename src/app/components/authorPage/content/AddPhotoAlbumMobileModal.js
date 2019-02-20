import React, { PureComponent } from "react";
import Dialog from "material-ui/Dialog";
import TextField from "material-ui/TextField";
import { modalStyles } from "./AuthorPageModalStyling";

class AddPhotoAlbumMobilModal extends PureComponent {
  renderAddPhotoAlbumMobileModal = () => {
    return (
      <div>
        <Dialog
          bodyClassName="addPhotoAlbumMobileModal-modalDialogBox"
          // title={this.props.addPhotoOrAlbum}
          modal={false}
          open={this.props.open}
          // titleClassName="addPhotoAlbumModal-modalTitle"
          paperClassName="addPhotoAlbumMobileModal-modalPaper"
          onRequestClose={this.props.handleModalClose}
          contentStyle={modalStyles.mobileContentStyle}
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
                hintStyle={modalStyles.mobileHintStyleAlbumName}
                underlineStyle={modalStyles.mobileUnderlineStyleAlbumName}
                inputStyle={modalStyles.mobileInputStyleAlbumName}
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
              hintStyle={modalStyles.mobileHintStyleDesc}
              underlineStyle={modalStyles.mobileUnderlineStyleDesc}
              inputStyle={modalStyles.mobileInputStyleDesc}
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
