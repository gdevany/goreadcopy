import React, { PureComponent } from "react";
import Dialog from "material-ui/Dialog";
import TextField from "material-ui/TextField";
import { modalStyles } from "./AuthorPageModalStyling";

class AddPhotoAlbumModal extends PureComponent {
  renderAddPhotoAlbumModal = () => {
    const {
      contentStyle,
      hintStyleAlbumName,
      underlineStyleAlbumName,
      inputStyleAlbumName,
      hintStyleDesc,
      underlineStyleDesc,
      inputStyleDesc
    } = modalStyles;
    return (
      <div className="">
        <Dialog
          bodyClassName="addPhotoAlbumModal-modalDialogBox"
          title={this.props.addPhotoOrAlbum}
          modal={false}
          open={this.props.open}
          titleClassName="addPhotoAlbumModal-modalTitle"
          paperClassName="addPhotoAlbumModal-modalPaper"
          onRequestClose={this.props.handleModalClose}
          contentStyle={contentStyle}
          autoScrollBodyContent={true}
        >
          <div className="addPhotoAlbumModal-modalInputWrapper">
            {this.props.addPhotoOrAlbum === "Create Album" && (
              <div className="addPhotoAlbumModal-modalInputBox">
                <TextField
                  id="addPhotoAlbumModal-addAlbumName"
                  fullWidth={true}
                  hintText="Album Name"
                  hintStyle={hintStyleAlbumName}
                  underlineStyle={underlineStyleAlbumName}
                  inputStyle={inputStyleAlbumName}
                />
              </div>
            )}
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
    );
  };

  addImage = () => {
    alert("TODO: connect ADD IMAGE");
  };

  render() {
    return <reactFragment>{this.renderAddPhotoAlbumModal()}</reactFragment>;
  }
}

export default AddPhotoAlbumModal;
