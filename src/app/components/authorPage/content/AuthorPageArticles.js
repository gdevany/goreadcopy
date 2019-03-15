import React, { PureComponent } from "react";
import AddArticleModal from "./AddArticleModal";
import AddArticleMobileModal from "./AddArticleMobileModal";
import AuthorsArticles from "./AuthorsArticles";
import { tempPhotoInfo } from "./AuthorPageTempPhotoInfo";

class AuthorPageArticles extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isUserLoggedIn: true,
      openModal: false,
      openMobileModal: false
    };
  }

  renderAddArticleButton = () => {
    const allowUserToAdd = this.state.isUserLoggedIn && (
      <reactFragment>
        <button
          className="hide-for-small-only authors-articles-addArticleButton text-center"
          onClick={e => {
            this.handleModalOpen(e);
          }}
        >
          Add Article
        </button>
        <button
          className="show-for-small-only authors-articles-addArticleButton text-center"
          onClick={e => {
            this.handleMobileModalOpen(e);
          }}
        >
          Add Article
        </button>
      </reactFragment>
    );
    return allowUserToAdd;
  };

  handleModalOpen = e => {
    e.preventDefault();
    this.setState({ openModal: true });
  };

  handleMobileModalOpen = e => {
    e.preventDefault();
    this.setState({ openMobileModal: true });
  };

  handleModalClose = () => {
    this.setState({ openModal: false, openMobileModal: false });
  };

  handleAddArticleModal = () => {
    return (
      <reactFragment>
        <AddArticleModal
          handleModalClose={this.handleModalClose}
          open={this.state.openModal}
        />
        <AddArticleMobileModal
          handleModalClose={this.handleModalClose}
          open={this.state.openMobileModal}
        />
      </reactFragment>
    );
  };

  render() {
    return (
      <div className="author-articles-container">
        {this.handleAddArticleModal()}
        <div className="authors-articles-UserLoggedAddArticle-wrapper">
          {this.renderAddArticleButton()}
        </div>
        <div className="authors-articles-wrapper">
          <AuthorsArticles
            articles={tempPhotoInfo.articles}
            isUserLoggedIn={this.state.isUserLoggedIn}
          />
        </div>
      </div>
    );
  }
}

export default AuthorPageArticles;
