import React, { PureComponent } from "react";
import Dialog from "material-ui/Dialog";
import TextField from "material-ui/TextField";
import { mobileModalStyles } from "./AuthorPageModalStyling";

//TODO: Convert TextFields to custom inputs
class AddPhotoAlbumMobileModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      genericImage: "https://placeimg.com/640/480/architecture",
      addPhotoSelected: false,
      userGivenTitle: "",
      userGivenDesc: ""
    };
  }
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
          {/* <div
            className="addPhotoAlbumMobileModal-modalInputBox"
            onClick={() => this.addImage()}
          >
            <div className="addPhotoAlbumMobileModal-modalPlusSign">+</div>
            <div className="addPhotoAlbumMobileModal-modalAddPhotoText">
              Add Photo
            </div>
          </div> */}
          {this.renderAddPhoto()}

          {/* {this.props.addPhotoOrAlbum === "Create Album" && (
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
          )} */}
          {this.props.addPhotoOrAlbum === "Create Album" &&
            this.renderAddAlbumTitle()}

          {/* <div className="addPhotoAlbumMobileModal-modalTextAreaBox">
            <TextField
              hintText="Description"
              multiLine={true}
              rows={5}
              rowsMax={5}
              fullWidth={true}
              hintStyle={mobileHintStyleDesc}
              underlineStyle={mobileUnderlineStyleDesc}
              inputStyle={mobileInputStyleDesc}
              className="addPhotoAlbumMobileModal-modalTextAreaInput"
            />
          </div> */}
          {this.renderAddDesc()}
        </Dialog>
      </div>
    );
  };

  renderAddPhoto = () => {
    return (
      <reactFragment>
        <div
          className="addArticleMobileModal-modalInputBox"
          onClick={() => this.handleAddPhotoSelected()}
        >
          {this.state.addPhotoSelected === false ? (
            <div className="addArticleMobileModal-modalflex">
              <div className="addArticleMobileModal-modalPlusSign">+</div>
              <div className="addArticleMobileModal-modalAddPhotoText">
                Add Photo
              </div>
            </div>
          ) : (
            <div className="addArticleMobileModal-modalflex">
              Choose a different photo
            </div>
          )}
        </div>
        {this.state.addPhotoSelected === true && this.renderTheAddedPhoto()}
      </reactFragment>
    );
  };

  //TODO:
  renderTheAddedPhoto = () => {
    return (
      <div className="row">
        <div className="addPhotoMobileModal-imageBox small-12 medium-6 columns">
          <img src={this.state.genericImage} alt="image" />
        </div>
      </div>
    );
  };

  renderAddAlbumTitle = () => {
    return (
      <reactFragment>
        <div className="addArticleMobileModal-modalInputBox">
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
        <div className="addArticleMobileModal-modalInputBox addPhotoAlbumMobileModal-modalTextArea">
          <textarea
            className="addArticleMobileModal-modalInputBoxText addArticleModal-normalTextColor"
            rows={5}
            onChange={e => this.handleUserDescTyped(e)}
            value={this.state.userGivenDesc}
            placeholder="Description"
          />
        </div>
      </reactFragment>
    );
  };

  addImage = () => {
    alert("TODO: connect ADD IMAGE");
  };

  handleAddPhotoSelected = () => {
    this.setState({ addPhotoSelected: !this.state.addPhotoSelected });
  };

  handleUserTitleTyped = e => {
    this.setState({ userGivenTitle: e.target.value });
  };

  handleUserDescTyped = e => {
    this.setState({ userGivenDesc: e.target.value });
  };

  render() {
    return (
      <reactFragment>{this.renderAddPhotoAlbumMobileModal()}</reactFragment>
    );
  }
}

export default AddPhotoAlbumMobileModal;
