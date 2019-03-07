import React, { PureComponent } from "react";
import Dialog from "material-ui/Dialog";
import TextField from "material-ui/TextField";
import { mobileModalStyles } from "./AuthorPageModalStylingCopy";

class AddArticleMobileModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      genericImage: "https://placeimg.com/640/480/architecture",
      userGivenTitle: "",
      addPhotoSelected: false,
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
          {/* <div className="addArticleMobileModal-modalInputBox">
            <TextField
              fullWidth={true}
              hintText="Article Title"
              hintStyle={mobileHintStyleAlbumName}
              underlineStyle={mobileUnderlineStyleAlbumName}
              inputStyle={mobileInputStyleAlbumName}
            />
          </div> */}
          {this.renderAddArticleTitle()}
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
      userGivenTitle: "",
      addPhotoSelected: false,
      categoryDropdownClicked: false,
      categoryHasBeenSelected: false,
      categories: ["Fiction", "Non-Fiction", "Sports", "Health"],
      categorySelected: "Choose your category"
    });
    this.props.handleModalClose();
  };

  renderAddArticleTitle = () => {
    return (
      <reactFragment>
        <div className="addArticleMobileModal-modalInputBox">
          <input
            className="addArticleMobileModal-modalInputBoxText addArticleModal-normalTextColor"
            type="text"
            onChange={e => this.handleUserTitleTyped(e)}
            value={this.state.userGivenTitle}
            placeholder="Article Title"
          />
        </div>
      </reactFragment>
    );
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
          <span className="addArticleMobileModal-downArrow-wrapper">
            <i className="downArrow" />
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
          className="addArticleMobileModal-modalInputBox blueBack"
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
    console.log(this.state.addPhotoSelected);
    return (
      <reactFragment>
        <div
          className="addArticleMobileModal-modalInputBox"
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
  renderAddArticleTextBox = () => {
    return (
      <div className="addArticleMobileModal-articleTextBox-wrapper">
        <div className="articleTitle">Write Your Article</div>
      </div>
    );
  };

  renderDraftOrSubmitButtons = () => {
    return (
      <div className="addArticleMobileModal-draftOrSubmitButton-wrapper">
        <button
          className="addArticleMobileModal-modalButton smallButton text-center"
          onClick={e => {
            this.handleSaveDraft(e);
          }}
        >
          Save Draft
        </button>
        <button
          className="addArticleMobileModal-modalButton smallButton text-center"
          onClick={e => {
            this.handleSubmit(e);
          }}
        >
          Submit
        </button>
      </div>
    );
  };

  //TODO:
  renderTheAddedPhoto = () => {
    return (
      <div className="row">
        <div className="authors-article-box small-12 medium-6 columns">
          <img src={this.state.genericImage} alt="image" />
        </div>
      </div>
    );
  };

  handleAddPhotoSelected = () => {
    this.setState({ addPhotoSelected: !this.state.addPhotoSelected });
  };

  handleUserTitleTyped = e => {
    this.setState({ userGivenTitle: e.target.value });
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

  render() {
    return <reactFragment>{this.renderAddArticleMobileModal()}</reactFragment>;
  }
}

export default AddArticleMobileModal;
