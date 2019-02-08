import React, { PureComponent } from "react";

//NOTE !! : AuthorPageContent (switch) default changed to AuhorsPageArticle
//NOTE !! : Change default back to AuthorPageWall

const temp = {
  articles: [
    {
      image: "https://placeimg.com/640/480/animals",
      title: "Great article with Really Long Title Takes Up Two Lines",
      desc:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vitae massa laoreet, aliquam tellus quis, ullamcorper arcu. Pellentesque dignissim vel augue sed dictum. Etiam eros nibh, semper vel ex eu, dictum tristique dui. Suspendisse maximus ex in lacus feugiat viverra. Pellentesque eleifend mi ut ante luctus, ut laoreet elit consequat. Duis ligula augue, cursus sed dictum at, cursus fermentum dui. Praesent facilisis viverra mauris sodales porttitor.",
      descTrunced: false,
      id: 1,
      month: "January",
      day: "1",
      year: "2011",
      category: "Animals"
    },
    {
      image: "https://placeimg.com/640/480/architecture",
      title: "Great article",
      desc:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vitae massa laoreet, aliquam tellus quis, ullamcorper arcu. Pellentesque dignissim vel augue sed dictum. Etiam eros nibh, semper vel ex eu, dictum tristique dui. Suspendisse maximus ex in lacus feugiat viverra. Pellentesque eleifend mi ut ante luctus, ut laoreet elit consequat. Duis ligula augue, cursus sed dictum at, cursus fermentum dui. Praesent facilisis viverra mauris sodales porttitor.",
      descTrunced: false,
      id: 2,
      month: "January",
      day: "2",
      year: "2012",
      category: "Architecture"
    },
    {
      image: "https://placeimg.com/640/480/nature",
      title: "Great article with Really Long Title Takes Up Two Lines",
      desc:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vitae massa laoreet, aliquam tellus quis, ullamcorper arcu. Pellentesque dignissim vel augue sed dictum. Etiam eros nibh, semper vel ex eu, dictum tristique dui. Suspendisse maximus ex in lacus feugiat viverra. Pellentesque eleifend mi ut ante luctus, ut laoreet elit consequat. Duis ligula augue, cursus sed dictum at, cursus fermentum dui. Praesent facilisis viverra mauris sodales porttitor.",
      descTrunced: false,
      id: 3,
      month: "January",
      day: "3",
      year: "2013",
      category: "Nature"
    },
    {
      image: "https://placeimg.com/640/480/people",
      title: "Great article with Really Long Title Takes Up Two Lines",
      desc:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vitae massa laoreet, aliquam tellus quis, ullamcorper arcu. Pellentesque dignissim vel augue sed dictum. Etiam eros nibh, semper vel ex eu, dictum tristique dui. Suspendisse maximus ex in lacus feugiat viverra. Pellentesque eleifend mi ut ante luctus, ut laoreet elit consequat. Duis ligula augue, cursus sed dictum at, cursus fermentum dui. Praesent facilisis viverra mauris sodales porttitor.",
      descTrunced: false,
      id: 4,
      month: "January",
      day: "4",
      year: "2014",
      category: "People"
    }
  ]
};

class AuthorsArticles extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      descLimit: 250,
      isDescTrunced: true,
      isTitleTrunced: false,
      articleIDClicked: 0
    };
  }

  renderArticles = () => {
    let articleRendered = temp.articles.map(art => {
      return (
        <div
          className="author-article-box small-12 medium-6 columns"
          key={art.id}
        >
          <img src={art.image} alt="image" />
          <div className="author-article-infoBox">
            {this.renderTitle(art.title)}
            <div className="author-articles-category">{art.category}</div>
            {this.renderDate(art.month, art.day, art.year)}
            <div className="author-articles-desc">
              {this.renderDesc(art.desc, art.id)}
            </div>
          </div>
        </div>
      );
    });
    return articleRendered;
  };

  renderTitle = title => {
    return <div className="author-article-title">{title}</div>;
  };

  renderDate = (month, day, year) => {
    return (
      <div className="author-articles-date">
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
          className="author-articles-a-span"
          onClick={() => this.handleReadMoreLess(id)}
        >
          {articleIDClicked === id && isDescTrunced !== true ? (
            <span>{"   "}Read less</span>
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
      <div className="author-articles-wrapper">{this.renderArticles()}</div>
    );
  }
}

export default AuthorsArticles;
