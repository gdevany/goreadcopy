import React, { PureComponent } from "react";
import Dialog from "material-ui/Dialog";
import TextField from "material-ui/TextField";
import { modalStyles } from "./AuthorPageModalStyling";

class AddVideoModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      uploadSelected: true
    };
  }
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
          <div className="addVideoModal-uploadOrURLButtons">
            <div
              className={`addVideoModal-uploadButton text-center ${this.state
                .uploadSelected === true && "addVideoModalBlueBack"}`}
              onClick={() => this.setState({ uploadSelected: true })}
            >
              Upload
            </div>
            <div
              className={`addVideoModal-pasteURLButton text-center ${this.state
                .uploadSelected === false && "addVideoModalBlueBack"}`}
              onClick={() => this.setState({ uploadSelected: false })}
            >
              Paste a URL
            </div>
          </div>
          <div
            className="addPhotoAlbumModal-modalAddPhoto"
            onClick={() => this.addImage()}
          >
            <div className="addPhotoAlbumModal-modalPlusSign">+</div>
            <div className="addPhotoAlbumModal-modalAddPhotoText">
              Add Video
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

export default AddVideoModal;
