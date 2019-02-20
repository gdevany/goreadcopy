import React, { PureComponent } from 'react';
import Dialog from "material-ui/Dialog";
import TextField from "material-ui/TextField";
import { modalStyles } from "./AuthorPageModalStyling";

class AddPhotoAlbumModal extends PureComponent {

  renderAddPhotoAlbumModal = () => {
    return (
      <div className="hide-for-small-only">
        <Dialog
          bodyClassName="addPhotoAlbumModal-modalDialogBox"
          title={this.props.addPhotoOrAlbum}
          modal={false}
          open={this.props.open}
          titleClassName="addPhotoAlbumModal-modalTitle"
          paperClassName="addPhotoAlbumModal-modalPaper"
          onRequestClose={this.props.handleModalClose}
          contentStyle={modalStyles.contentStyle}
          autoScrollBodyContent={true}
        >
          <div className="addPhotoAlbumModal-modalInputWrapper">
            {this.props.addPhotoOrAlbum === "Create Album" && (
              <TextField
                id="addPhotoAlbumModal-addAlbumName"
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
              className="addPhotoAlbumModal-modalTextAreaInput"
            />
          </div>
          <div 
          className="addPhotoAlbumModal-modalAddPhoto"
          onClick={() => this.addImage()}
          >
            <div className="addPhotoAlbumModal-modalPlusSign">+</div>
            <div className="addPhotoAlbumModal-modalAddPhotoText">
              Add Photo
            </div>
          </div>
        </Dialog>
      </div>
    )
  }

  addImage = () => {
    alert("TODO: connect ADD IMAGE")
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
