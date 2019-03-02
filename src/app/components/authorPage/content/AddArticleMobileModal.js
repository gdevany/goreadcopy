import React, { PureComponent } from "react";
import Dialog from "material-ui/Dialog";
import TextField from "material-ui/TextField";
import { mobileModalStyles } from "./AuthorPageModalStylingCopy";

class AddArticleMobileModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      categoryDropdownClicked: false,
      categoryHasBeenSelected: false,
      categories: ["Fiction", "Non-Fiction", "Sports", "Health"],
      categorySelected: "Choose your category"
    };
  }
  renderAddArticleMobileModal = () => {
    const {
      mobileContentStyle,
      mobileHintStyleAlbumName,
      mobileUnderlineStyleAlbumName,
      mobileInputStyleAlbumName
    } = mobileModalStyles;
    return (
      <div>
        <Dialog
          bodyClassName="addArticleMobileModal-modalDialogBox"
          modal={false}
          open={this.props.open}
          paperClassName="addArticleMobileModal-modalPaper"
          onRequestClose={this.renderCloseModal}
          contentStyle={mobileContentStyle}
          autoScrollBodyContent={true}
        >
          <div className="addArticleMobileModal-modalInputBox">
            <TextField
              fullWidth={true}
              hintText="Article Title"
              hintStyle={mobileHintStyleAlbumName}
              underlineStyle={mobileUnderlineStyleAlbumName}
              inputStyle={mobileInputStyleAlbumName}
            />
          </div>
          {this.renderSelectArticleType()}
          {this.renderAddPhoto()}
          {this.renderAddArticleTextBox()}
          {this.renderDraftOrSubmitButtons()}
        </Dialog>
      </div>
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

  renderSelectArticleType = () => {
    return (
      <reactFragment>
        <div
          className="addArticleMobileModal-modalInputBox"
          onClick={e => this.handleCategoryDropdownToggle(e)}
        >
          <div
            className={`addArticleMobileModal-modalInputBoxText ${this.state
              .categoryHasBeenSelected === true &&
              "addArticleModal-normalTextColor"}`}
          >
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
          onClick={() => this.handleCategorySelected(category)}
          key={category}
        >
          <div className="addArticleMobileModal-modalText">{category}</div>
        </div>
      );
    });
    return mappedCategories;
  };

  renderAddPhoto = () => {
    return (
      <div
        className="addArticleMobileModal-modalInputBox"
        onClick={() => this.handleAddImage()}
      >
        <div className="addArticleMobileModal-modalPlusSign">+</div>
        <div className="addArticleMobileModal-modalAddPhotoText">Add Photo</div>
      </div>
    );
  };

  renderAddArticleTextBox = () => {
    return (
      <div className="addArticleMobileModal-articleTextBox-wrapper">
        <div className="addArticleMobileModal-articleTitle">
          Write Your Article
        </div>
      </div>
    );
  };

  renderDraftOrSubmitButtons = () => {
    return (
      <div className="addArticleMobileModal-draftOrSubmitButton-wrapper">
        <button
          className="addArticleMobileModal-button addArticleMobileModal-draftOrSubmitButton text-center"
          onClick={e => {
            this.handleSaveDraft(e);
          }}
        >
          Save Draft
        </button>
        <button
          className="addArticleMobileModal-button addArticleMobileModal-draftOrSubmitButton text-center"
          onClick={e => {
            this.handleSubmit(e);
          }}
        >
          Submit
        </button>
      </div>
    );
  };

  handleCategoryDropdownToggle = e => {
    e.preventDefault();
    this.setState({
      categoryDropdownClicked: !this.state.categoryDropdownClicked
    });
  };

  handleCategorySelected = category => {
    this.setState({
      categorySelected: category,
      categoryHasBeenSelected: true,
      categoryDropdownClicked: false
    });
  };

  //TODO:
  handleAddImage = () => {
    alert("TODO: add image");
  };

  render() {
    return <reactFragment>{this.renderAddArticleMobileModal()}</reactFragment>;
  }
}

export default AddArticleMobileModal;
