import React from 'react';
import withArticles from '../containers/Top5ArticlesContainer';

const maxLength = 16;

const trimStrings = str => (
  str.length > maxLength ?
    `${str.substring(0, maxLength - 3)}...` :
    str
);

const ArticleListItem = ({ article }) => (
  <div className="top-article">
    <div className="d-flex flex-row justify-content-start">
      <a href={article.link}>
        <img className="top-article-image" src={article.imageUrl} alt="Article Main" />
      </a>
      <div className="d-flex flex-column justify-content-start align-items-start">
        { article.category ? <span className="top-article-category">{article.category}</span> : null }
        <span className="top-article-title">
          <a href={article.link} title={article.title}>
            { trimStrings(article.title) }
          </a>
        </span>
        <span className="top-article-author" title={article.owner.fullname}>
          { 'by ' }
          <a href={article.owner.url}>
            { trimStrings(article.owner.fullname) }
          </a>
        </span>
      </div>
    </div>
  </div>
);

const Top5Articles = ({ articles }) => (
  <div className="top-articles d-flex flex-column justify-content-start">
    <span className="home-page section-title">Top 5 Articles This Week:</span>
    <hr className="divider home-page-section d-none d-sm-block" />
    <div className="d-flex flex-column justify-content-start">
      {
        articles.map((article, idx) => (
          <div key={article.key} className="top-article-wrapper">
            <ArticleListItem {...article} />
            {
              idx < articles.length - 1 ?
                <hr className="divider home-page-section d-block" /> :
                null
            }
          </div>
        ))
      }
    </div>
  </div>
);

export default withArticles(Top5Articles);
