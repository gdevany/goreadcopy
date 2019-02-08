import React, { PureComponent } from 'react'



const temp = {
  articles: [
    {
      image: "https://placeimg.com/640/480/animals",
      title: "Great article with Really Long Title Takes Up Two Lines",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vitae massa laoreet, aliquam tellus quis, ullamcorper arcu. Pellentesque dignissim vel augue sed dictum. Etiam eros nibh, semper vel ex eu, dictum tristique dui. Suspendisse maximus ex in lacus feugiat viverra. Pellentesque eleifend mi ut ante luctus, ut laoreet elit consequat. Duis ligula augue, cursus sed dictum at, cursus fermentum dui. Praesent facilisis viverra mauris sodales porttitor.",
      descTrunced: false,
      id: 1,
      month: "January",
      day: "1",
      year: "2011",
      category: "animals"
    },
    {
      image: "https://placeimg.com/640/480/architecture",
      title: "Great article with Really Long Title Takes Up Two Lines",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vitae massa laoreet, aliquam tellus quis, ullamcorper arcu. Pellentesque dignissim vel augue sed dictum. Etiam eros nibh, semper vel ex eu, dictum tristique dui. Suspendisse maximus ex in lacus feugiat viverra. Pellentesque eleifend mi ut ante luctus, ut laoreet elit consequat. Duis ligula augue, cursus sed dictum at, cursus fermentum dui. Praesent facilisis viverra mauris sodales porttitor.",
      descTrunced: false,
      id: 2,
      month: "January",
      day: "2",
      year: "2012",
      category: "architecture"
    },
    {
      image: "https://placeimg.com/640/480/nature",
      title: "Great article with Really Long Title Takes Up Two Lines",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vitae massa laoreet, aliquam tellus quis, ullamcorper arcu. Pellentesque dignissim vel augue sed dictum. Etiam eros nibh, semper vel ex eu, dictum tristique dui. Suspendisse maximus ex in lacus feugiat viverra. Pellentesque eleifend mi ut ante luctus, ut laoreet elit consequat. Duis ligula augue, cursus sed dictum at, cursus fermentum dui. Praesent facilisis viverra mauris sodales porttitor.",
      descTrunced: false,
      id: 3,
      month: "January",
      day: "3",
      year: "2013",
      category: "nature"
    },
    {
      image: "https://placeimg.com/640/480/people",
      title: "Great article with Really Long Title Takes Up Two Lines",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vitae massa laoreet, aliquam tellus quis, ullamcorper arcu. Pellentesque dignissim vel augue sed dictum. Etiam eros nibh, semper vel ex eu, dictum tristique dui. Suspendisse maximus ex in lacus feugiat viverra. Pellentesque eleifend mi ut ante luctus, ut laoreet elit consequat. Duis ligula augue, cursus sed dictum at, cursus fermentum dui. Praesent facilisis viverra mauris sodales porttitor.",
      descTrunced: false,
      id: 4,
      month: "January",
      day: "4",
      year: "2014",
      category: "people"
    },
  ]
}

class AuthorsArticles extends PureComponent {

  renderArticles = () => {
    let articleRendered = temp.articles.map(art => {
      return (
        <div className="author-article-box small-12 medium-6 columns" key={art.id}>
          <img src={art.image} alt="image" />
          <h2>{art.title}</h2>
          <div>{art.category}</div>
          <div>{art.month}{" "}{art.day}{","}{art.year}</div>
          <div>{art.desc}</div>
        </div>
      )
    })
    return articleRendered
  }

  render() {
    return (
      <div className="author-articles-wrapper">
        {this.renderArticles()}
      </div>
    )
  }
}

export default AuthorsArticles
