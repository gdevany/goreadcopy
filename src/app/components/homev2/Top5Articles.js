import React from 'react';
import { Link } from 'react-router';
import withArticles from '../containers/Top5ArticlesContainer';

const ArticleListItem = ({ article }) => (
  <div className="top-article">
    <div className="d-flex flex-row justify-content-start">
      <a href={article.link}>
        <img className="top-article-image" src={article.imageUrl} alt="Article Main" />
      </a>
      <div className="d-flex flex-column justify-content-start align-items-start">
        { article.category ? <span className="top-article-category">{article.category}</span> : null }
        <span className="top-article-title"><a href={article.link}>{article.title}</a></span>
        <span className="top-article-author"><a href={article.owner.url}>{article.owner.fullname}</a></span>
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
                <hr className="divider home-page-section d-block d-sm-none" /> :
                null
            }
          </div>
        ))
      }
    </div>
  </div>
);

export default withArticles(Top5Articles);
