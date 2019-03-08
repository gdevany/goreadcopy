import React, { PureComponent } from "react";
import AddArticleModal from "./AddArticleModal";
import AddArticleMobileModal from "./AddArticleMobileModal";
import { tempPhotoInfo } from "./AuthorPageTempPhotoInfo";

class AuthorsArticles extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isUserLoggedIn: true,
      openModal: false,
      openMobileModal: false,
      descLimit: 250,
      isDescTrunced: true,
      articleIDClicked: 0
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

  renderArticles = () => {
    const { articles } = tempPhotoInfo;
    let articleRendered = articles.map(art => {
      return (
        <div
          className="authors-article-box small-12 medium-6 columns"
          key={art.id}
        >
          <img src={art.image} alt="image" />
          <div className="authors-article-infoBox">
            {this.renderTitle(art.title)}
            <div className="authors-articles-category">{art.category}</div>
            {this.renderDate(art.month, art.day, art.year)}
            <div className="authors-articles-desc">
              {this.renderDesc(art.desc, art.id)}
            </div>
          </div>
        </div>
      );
    });
    return articleRendered;
  };

  renderTitle = title => {
    let titleLength = title.length;
    return <div className={"authors-article-title"}>{title}</div>;
  };

  renderDate = (month, day, year) => {
    return (
      <div className="authors-articles-date">
        {month} {day}
        {","}
        {year}
      </div>
    );
  };

  renderDesc = (text, id) => {
    const { articleIDClicked, descLimit, isDescTrunced } = this.state;
    return text.length < descLimit ? (
      text
    ) : (
      <reactFragment>
        <span className="">
          {articleIDClicked === id && !isDescTrunced
            ? text
            : this.truncInfo(text, descLimit)}
        </span>
        <a
          className="authors-articles-a-span"
          onClick={() => this.handleReadMoreLess(id)}
        >
          {articleIDClicked === id && isDescTrunced !== true ? (
            <span>__ Read less</span>
          ) : (
            <span>Read more</span>
          )}
        </a>
      </reactFragment>
    );
  };

  truncInfo = (text, limit) => {
    return text.length >= limit ? `${text.slice(0, limit)}...` : text;
  };

  handleReadMoreLess = id => {
    let truncIt = this.state.isDescTrunced;
    this.setState({ isDescTrunced: !truncIt, articleIDClicked: id });
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
      <reactFragment>
        {this.handleAddArticleModal()}
        <div className="authors-articles-UserLoggedAddArticle-wrapper">
          {this.renderAddArticleButton()}
        </div>
        <div className="authors-articles-wrapper">{this.renderArticles()}</div>
      </reactFragment>
    );
  }
}

export default AuthorsArticles;
