import React, { PureComponent } from 'react';
import Dialog from "material-ui/Dialog";
import TextField from "material-ui/TextField";
import { modalStyles } from "./AuthorPageModalStyling";

class AddPhotoAlbumModal extends PureComponent {

  renderAddPhotoAlbumModal = () => {
    return (
      <div className="hide-for-small-only">
        <Dialog
          bodyClassName="author-page-photos-modalDialogBox"
          title={this.props.addPhotoOrAlbum}
          modal={false}
          open={this.props.open}
          titleClassName="author-page-photos-modalTitle"
          paperClassName="author-page-photos-modalPaper"
          onRequestClose={this.props.handleModalClose}
          contentStyle={modalStyles.contentStyle}
        >
          <div className="author-page-photos-modalInput">
            {this.props.addPhotoOrAlbum === "Create Album" && (
              <TextField
                id="author-page-photos-addAlbumName"
                fullWidth={true}
                hintText="Album Name"
                hintStyle={modalStyles.hintStyleAlbumName}
                underlineStyle={modalStyles.underlineStyleAlbumName}
                inputStyle={modalStyles.inputStyleAlbumName}
              />
            )}
            <TextField
              hintText="What would you like to say"
              multiLine={true}
              rows={5}
              rowsMax={5}
              fullWidth={true}
              hintStyle={modalStyles.hintStyleDesc}
              underlineStyle={modalStyles.underlineStyleDesc}
              inputStyle={modalStyles.inputStyleDesc}
              className="author-page-photos-modalTextAreaInput"
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
    )
  }
  render() {
    return (
    <reactFragment>
      {this.renderAddPhotoAlbumModal()}
    </reactFragment>
    )
  }
}

export default AddPhotoAlbumModal;
