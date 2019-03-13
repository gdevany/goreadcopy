import React, { PureComponent } from "react";

class AuthorsArticles extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      descLimit: 250,
      isDescTrunced: true,
      articleIDClicked: 0
    };
  }

  renderArticles = () => {
    const { articles } = this.props;
    let articleRendered;
    articles &&
      (articleRendered = articles.map(art => {
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
      }));
    return articleRendered;
  };

  renderTitle = title => {
    return <div className={"authors-article-title"}>{title}</div>;
  };

  renderDate = (month, day, year) => {
    return (
      <div className="authors-articles-date">
        {month} {day}
        {", "}
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

  render() {
    return (
      <reactFragment>
        <div>{this.renderArticles()}</div>
      </reactFragment>
    );
  }
}

export default AuthorsArticles;
