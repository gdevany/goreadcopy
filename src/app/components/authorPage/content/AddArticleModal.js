import React, { PureComponent } from "react";
import Dialog from "material-ui/Dialog";
import TextField from "material-ui/TextField";
import { modalStyles, mobileModalStyles } from "./AuthorPageModalStylingCopy";

class AddArticleModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      dateOfLastPost: new Date(), //TODO: set this date
      ableToPost: new Date(),
      categoryDropdownClicked: false,
      categoryHasBeenSelected: false,
      categories: ["Fiction", "Non-Fiction", "Sports", "Health"],
      categorySelected: "Choose your category"
    };
  }

  //Take last post date, add 7 days, and return new Date() format to state.ableToPost
  componentDidMount = () => {
    const targetDate = this.state.dateOfLastPost;
    targetDate.setDate(targetDate.getDate() + 7);
    let dd = targetDate.getDate();
    let mm = targetDate.getMonth() + 1; // 0 is January, so we must add 1
    let yyyy = targetDate.getFullYear();
    let dateString = mm + "/" + dd + "/" + yyyy;
    this.setState({ ableToPost: new Date(dateString) });
  };

  renderAddVideoModal = () => {
    const { contentStyle } = modalStyles;

    const {
      mobileHintStyleAlbumName,
      mobileUnderlineStyleAlbumName,
      mobileInputStyleAlbumName
    } = mobileModalStyles;

    return (
      <div className="">
        <Dialog
          bodyClassName="addArticleModal-modalDialogBox"
          title="Add Article"
          modal={false}
          open={this.props.open}
          titleClassName="addArticleModal-modalTitle"
          paperClassName="addArticleModal-modalPaper"
          onRequestClose={this.renderCloseModal}
          contentStyle={contentStyle}
          autoScrollBodyContent={true}
        >
          <div>
            {this.renderSubHeading()}
            <div className="addArticleModal-modalInputBox">
              <TextField
                fullWidth={true}
                hintText="Add your article title here"
                hintStyle={mobileHintStyleAlbumName}
                underlineStyle={mobileUnderlineStyleAlbumName}
                inputStyle={mobileInputStyleAlbumName}
              />
            </div>
            {this.renderAddPhotoButton()}
            {this.renderSelectArticleType()}
            {this.renderArticleBox()}
            {this.renderDraftOrSubmitButtons()}
          </div>
        </Dialog>
      </div>
    );
  };

  renderSubHeading = () => {
    return (
      <reactFragment>
        <div className="addArticleModal-subTitle">
          {`You are allowed to post 1 article every 7 days. You can post your next article on ${this.state.ableToPost.toLocaleDateString()}.`}
        </div>
        <div className="addArticleModal-subTitle">
          You can save your article as draft and come back to it later.
        </div>
      </reactFragment>
    );
  };

  renderAddPhotoButton = () => {
    return (
      <reactFragment>
        <div className="addArticleModal-modalAddPhotoText">Add Your Photo</div>
        <div className="addArticleModal-uploadPhotoButton-wrapper">
          <button
            className="addArticleModal-modalMediumButton text-center"
            onClick={e => {
              this.handleUploadPhoto(e);
            }}
          >
            Upload Photo
          </button>
        </div>
      </reactFragment>
    );
  };

  renderSelectArticleType = () => {
    return (
      <reactFragment>
        <div
          className="addArticleModal-modalInputBox addArticleModal-modalCategoryTextBox"
          onClick={e => this.handleCategoryDropdownToggle(e)}
        >
          <div className="addArticleModal-modalInputBoxText">
            {this.state.categorySelected}
          </div>
          <span className="addArticleModal-downArrow-wrapper">
            <i className="addArticleModal-downArrow" />
          </span>
        </div>
        {this.state.categoryDropdownClicked === true &&
          this.renderArticleTypeChoices()}
      </reactFragment>
    );
  };

  renderArticleTypeChoices = () => {
    let mappedCategories = this.state.categories.map(category => {
      return (
        <div
          className="addArticleModal-modalInputBox blueBack"
          onClick={() => this.handleUploadSelected(category)}
          key={category}
        >
          <div className="addArticleModal-modalText">{category}</div>
        </div>
      );
    });
    return mappedCategories;
  };

  renderArticleBox = () => {
    return (
      <reactFragment>
        <div className="addArticleModal-articleTextBox-wrapper">
          <div className="addArticleModal-articleTitle">Write Your Article</div>
        </div>
      </reactFragment>
    );
  };

  renderDraftOrSubmitButtons = () => {
    return (
      <reactFragment>
        <div className="addArticleModal-draftOrSubmitButton-wrapper">
          <button
            className="addArticleModal-modalMediumButton addArticleModal-draftOrSubmitButton text-center"
            onClick={e => {
              this.handleSaveDraft(e);
            }}
          >
            Save Draft
          </button>
          <button
            className="addArticleModal-modalMediumButton addArticleModal-draftOrSubmitButton text-center"
            onClick={e => {
              this.handleSubmit(e);
            }}
          >
            Submit
          </button>
        </div>
      </reactFragment>
    );
  };

  //initialize state when handleModalClose() because closing modal doesn't really
  //  close the modal, it just moves it off the screen (left position -10000px)
  renderCloseModal = () => {
    this.setState({
      categoryDropdownClicked: false,
      categoryHasBeenSelected: false,
      categories: ["Fiction", "Non-Fiction", "Sports", "Health"],
      categorySelected: "Choose your category"
    });
    this.props.handleModalClose();
  };

  //TODO:
  handleUploadPhoto = e => {
    e.preventDefault();
    alert("TODO: connect Upload Photo");
  };

  handleCategoryDropdownToggle = e => {
    e.preventDefault();
    this.setState({
      categoryDropdownClicked: !this.state.categoryDropdownClicked
    });
  };

  handleUploadSelected = category => {
    this.setState({
      categorySelected: category,
      categoryDropdownClicked: false,
      categoryHasBeenSelected: true
    });
  };

  //TODO:
  handleSaveDraft = e => {
    e.preventDefault();
    alert("TODO: connect Save Draft");
  };

  //TODO:
  handleSubmit = e => {
    e.preventDefault();
    alert("TODO: connect Submit");
  };

  render() {
    return <reactFragment>{this.renderAddVideoModal()}</reactFragment>;
  }
}

export default AddArticleModal;
