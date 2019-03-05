import React, { PureComponent } from "react";
import Dialog from "material-ui/Dialog";
import TextField from "material-ui/TextField";
import { modalStyles } from "./AuthorPageModalStyling";

class AddPhotoAlbumModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      genericImage: "https://placeimg.com/640/480/architecture",
      userGivenTitle: "",
      userGivenDesc: "",
    }
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
            {this.props.addPhotoOrAlbum === "Create Album" &&
              // <div className="addPhotoAlbumModal-modalInputBox">
              //   <TextField
              //     fullWidth={true}
              //     hintText="Album Name"
              //     hintStyle={hintStyleAlbumName}
              //     underlineStyle={underlineStyleAlbumName}
              //     inputStyle={inputStyleAlbumName}
              //   />
              // </div>
              this.renderAddAlbumTitle()}
            {/* <div className="addPhotoAlbumModal-modalTextAreaBox">
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
            </div> */}
            {this.renderAddDesc()}
          </div>
          {/* <div
            className="addPhotoAlbumModal-modalAddPhoto"
            onClick={() => this.addImage()}
          >
            <div className="addPhotoAlbumModal-modalPlusSign">+</div>
            <div className="addPhotoAlbumModal-modalAddPhotoText">
              Add Photo
            </div>
          </div> */}
          {this.renderAddPhoto()}
        </Dialog>
      </div>
    );
  };

  renderAddAlbumTitle = () => {
    return (
      <reactFragment>
        <div className="addPhotoAlbumModal-modalMultiInputBox">
          <input
            className="addArticleMobileModal-modalInputBoxText addArticleModal-normalTextColor"
            type="text"
            onChange={e => this.handleUserTitleTyped(e)}
            value={this.state.userGivenTitle}
            placeholder="Album Title"
          />
        </div>
      </reactFragment>
    );
  };

  renderAddDesc = () => {
    return (
      <reactFragment>
        <div className="addPhotoAlbumModal-modalMultiInputBox addPhotoAlbumMobileModal-modalTextArea">
          <textarea
            className="addArticleMobileModal-modalInputBoxText addArticleModal-normalTextColor"
            rows={5}
            onChange={e => this.handleUserDescTyped(e)}
            value={this.state.userGivenDesc}
            placeholder="What would you like to say"
          />
        </div>
      </reactFragment>
    );
  };

  renderAddPhoto = () => {
    return (
      <div
        className="addPhotoAlbumModal-modalAddPhoto"
        onClick={() => this.renderTheAddedPhoto()}
      >
        <div className="addPhotoAlbumModal-modalPlusSign">+</div>
        <div className="addPhotoAlbumModal-modalAddPhotoText">Add Photo</div>
      </div>
    );
  };

   //TODO:
   renderTheAddedPhoto = () => {
    return (
      <div className="row">
        <div className="addPhotoAlbumMobileModal-imageBox small-12 medium-6 columns">
          <img src={this.state.genericImage} alt="image" />
        </div>
      </div>
    );
  };

  addImage = () => {
    alert("TODO: connect ADD IMAGE");
  };

  handleUserTitleTyped = e => {
    this.setState({ userGivenTitle: e.target.value });
  };

  handleUserDescTyped = e => {
    this.setState({ userGivenDesc: e.target.value });
  };

  render() {
    return <reactFragment>{this.renderAddPhotoAlbumModal()}</reactFragment>;
  }
}

export default AddPhotoAlbumModal;
