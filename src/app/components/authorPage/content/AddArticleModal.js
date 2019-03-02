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
      categories: ["Fiction", "Non-Fiction", "Sports", "Health"],
      categorySelected: "Choose your category"
    };
  }

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
            <div className="addArticleModal-subTitle">
              {`You are allowed to post 1 article every 7 days. You can post your next article on ${this.state.ableToPost.toLocaleDateString()}.`}
            </div>
            <div className="addArticleModal-subTitle">
              You can save your article as draft and come back to it later.
            </div>
            <div className="addArticleModal-modalInputBox">
              <TextField
                fullWidth={true}
                hintText="Add your article title here"
                hintStyle={mobileHintStyleAlbumName}
                underlineStyle={mobileUnderlineStyleAlbumName}
                inputStyle={mobileInputStyleAlbumName}
              />
            </div>
            <div className="addArticleModal-modalAddPhotoText">
              Add Your Photo
            </div>
            <div className="addArticleModal-uploadPhotoButton-wrapper">
              <button
                className="addArticleModal-button addArticleModal-uploadPhotoButton text-center"
                onClick={e => {
                  this.handleUploadPhoto(e);
                }}
              >
                Upload Photo
              </button>
            </div>
            {this.renderSelectArticleType()}
            <div className="addArticleModal-articleTextBox-wrapper">
              <div className="addArticleModal-articleTitle">
                Write Your Article
              </div>
            </div>
            <div className="addArticleModal-draftOrSubmitButton-wrapper">
              <button
                className="addArticleModal-button addArticleModal-draftOrSubmitButton text-center"
                onClick={e => {
                  this.handleSaveDraft(e);
                }}
              >
                Save Draft
              </button>
              <button
                className="addArticleModal-button addArticleModal-draftOrSubmitButton text-center"
                onClick={e => {
                  this.handleSubmit(e);
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </Dialog>
      </div>
    );
  };

  renderSelectArticleType = () => {
    return (
      <reactFragment>
        <div
          className="addArticleMobileModal-modalInputBox addArticleModal-modalCategoryTextBox"
          onClick={e => this.handleCategoryDropdownToggle(e)}
        >
          <div className="addArticleMobileModal-modalInputBoxText">
            {this.state.categorySelected}
          </div>
          <span className="addArticleMobileModal-dropdownArrow">
            <i className="addArticleMobileModal-downArrow" />
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
          className="addArticleMobileModal-modalInputBox addArticleMobileModal-modalInputBoxButton"
          onClick={() => this.handleUploadSelected(category)}
          key={category}
        >
          <div className="addArticleMobileModal-modalText">{category}</div>
        </div>
      );
    });
    return mappedCategories;
  };

  //initialize state when handleModalClose() because closing modal doesn't really
  //  close the modal, it just moves it off the screen (left position -10000px)
  renderCloseModal = () => {
    this.setState({
      categoryDropdownClicked: false,
      categories: ["Fiction", "Non-Fiction", "Sports", "Health"],
      categorySelected: "Choose your category"
    });
    this.props.handleModalClose();
  };

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
      categoryDropdownClicked: false
    });
  };

  handleSaveDraft = e => {
    e.preventDefault();
    alert("TODO: connect Save Draft");
  };

  handleSubmit = e => {
    e.preventDefault();
    alert("TODO: connect Submit");
  };

  render() {
    console.log(this.state.categoryDropdownClicked);
    return <reactFragment>{this.renderAddVideoModal()}</reactFragment>;
  }
}

export default AddArticleModal;
