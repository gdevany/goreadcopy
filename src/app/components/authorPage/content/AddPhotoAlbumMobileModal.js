import React, { PureComponent } from "react";
import Dialog from "material-ui/Dialog";

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
    const mobileContentStyle = {
      width: "100%",
      maxWidth: "none"
    };

    return (
      <div>
        <Dialog
          bodyClassName="addPhotoAlbumMobileModal-modalDialogBox"
          modal={false}
          open={this.props.open}
          paperClassName="addPhotoAlbumMobileModal-modalPaper"
          onRequestClose={this.renderCloseModal}
          contentStyle={mobileContentStyle}
          autoScrollBodyContent={true}
        >
          {this.renderAddPhoto()}
          {this.props.addPhotoOrAlbum === "Create Album" &&
            this.renderAddAlbumTitle()}
          {this.renderAddDesc()}
        </Dialog>
      </div>
    );
  };

  //initialize state when handleModalClose() because closing modal doesn't really
  //  close the modal, it just moves it off the screen (left position -10000px)
  renderCloseModal = () => {
    this.setState({
      addPhotoSelected: false,
      userGivenTitle: "",
      userGivenDesc: ""
    });
    this.props.handleModalClose();
  };

  renderAddPhoto = () => {
    return (
      <reactFragment>
        <div
          className="addPhotoAlbumMobileModal-modalInputBox"
          onClick={() => this.handleAddPhotoSelected()}
        >
          {this.state.addPhotoSelected === false ? (
            <div className="modalflex">
              <div className="modalPlusSign">+</div>
              <div className="addPhotoText">Add Photo</div>
            </div>
          ) : (
            <div className="modalflex">Choose a different photo</div>
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
        <div className="small-12 columns">
          <img src={this.state.genericImage} alt="image" />
        </div>
      </div>
    );
  };

  renderAddAlbumTitle = () => {
    return (
      <reactFragment>
        <div className="addPhotoAlbumMobileModal-modalInputBox">
          <input
            className="addPhotoAlbumMobileModal-modalInputBoxText"
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
        <div className="addPhotoAlbumMobileModal-modalInputBox modalTextArea">
          <textarea
            className="addPhotoAlbumMobileModal-modalInputBoxText"
            rows={3}
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
