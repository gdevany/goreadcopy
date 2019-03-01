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
      categories: ["Fiction", "Non-Fiction", "Sports", "Health"]
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
          onRequestClose={this.props.handleModalClose}
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
            <div className="addArticleModal-modalCategoryTextBox">
              <div className="addArticleMobileModal-modalCategoryText">
                Choose a category
              </div>
              <span
                className="addArticleMobileModal-dropdownArrow"
                onClick={e => this.handleCategoryDropdownToggle(e)}
              >
                <i className="addArticleMobileModal-downArrow" />
              </span>
              {this.state.categoryDropdownClicked === true && (
                this.renderCategoryList()
              )}
            </div>
            <div className="addArticleMobileModal-articleTextBox-wrapper">
              <div className="addArticleMobileModal-articleTitle">
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

  renderCategoryList = () => {
    return (
      <li className="">
        {this.state.categories.map(item => {
          return <ul className="">{item}</ul>;
        })}
      </li>
    );
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

  handleSaveDraft = e => {
    e.preventDefault();
    alert("TODO: connect Save Draft");
  };

  handleSaveDraft = e => {
    e.preventDefault();
    alert("TODO: connect Submit");
  };

  render() {
    console.log(this.state.categoryDropdownClicked);
    return <reactFragment>{this.renderAddVideoModal()}</reactFragment>;
  }
}

export default AddArticleModal;
