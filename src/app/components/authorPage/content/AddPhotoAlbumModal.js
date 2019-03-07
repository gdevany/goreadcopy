import React, { PureComponent } from "react";
import Dialog from "material-ui/Dialog";

class AddPhotoAlbumModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      genericImage: "https://placeimg.com/640/480/architecture",
      addPhotoSelected: false,
      userGivenTitle: "",
      userGivenDesc: ""
    };
  }
  renderAddPhotoAlbumModal = () => {
    const contentStyle = {
      width: "80%",
      maxWidth: "none"
    };

    return (
      <div className="">
        <Dialog
          bodyClassName="addPhotoAlbumModal-modalDialogBox"
          title={this.props.addPhotoOrAlbum}
          modal={false}
          open={this.props.open}
          titleClassName="addPhotoAlbumModal-modalTitle"
          paperClassName="addPhotoAlbumModal-modalPaper"
          onRequestClose={this.renderCloseModal}
          contentStyle={contentStyle}
          autoScrollBodyContent={true}
        >
          <div className="addPhotoAlbumModal-modalInputWrapper">
            {this.props.addPhotoOrAlbum === "Create Album" &&
              this.renderAddAlbumTitle()}
            {this.renderAddDesc()}
          </div>
          {this.renderAddPhoto()}
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

  renderAddAlbumTitle = () => {
    return (
      <reactFragment>
        <div className="addPhotoAlbumModal-modalMultiInputBox boldIt">
          <input
            className="addPhotoAlbumModal-modalInputBoxText"
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
        <div className="addPhotoAlbumModal-modalMultiInputBox addPhotoAlbumModal-modalTextArea">
          <textarea
            className="addPhotoAlbumModal-modalInputBoxText"
            rows={3}
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
        onClick={() => this.handleAddPhotoSelected()}
      >
        {this.state.addPhotoSelected === false ? (
          <reactFragment>
            <div className="addPhotoAlbumModal-modalPlusSign text-center">
              +
            </div>
            <div className="addPhotoAlbumModal-modalAddPhotoText text-center">
              Add Photo
            </div>
          </reactFragment>
        ) : (
          <div className="addPhotoAlbumMobileModal-modalflex">
            Click to choose different photo
          </div>
        )}
        {this.state.addPhotoSelected === true && this.renderTheAddedPhoto()}
      </div>
    );
  };

  //TODO:
  renderTheAddedPhoto = () => {
    return (
      <div className="row">
        <div className="addPhotoAlbumModal-imageBox">
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

  handleAddPhotoSelected = () => {
    this.setState({ addPhotoSelected: !this.state.addPhotoSelected });
  };

  render() {
    return <reactFragment>{this.renderAddPhotoAlbumModal()}</reactFragment>;
  }
}

export default AddPhotoAlbumModal;
