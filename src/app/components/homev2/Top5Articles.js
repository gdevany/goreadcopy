import React from 'react';
import { Link } from 'react-router';

const ArticleListItem = ({ image, category, title, author, url }) => (
  <div className="top-article">
    <div className="d-flex flex-row justify-content-start">
      <Link to={url}>
        <img className="top-article-image" src={image} alt="Article Main" />
      </Link>
      <div className="d-flex flex-column justify-content-start align-items-start">
        <span className="top-article-category">{category}</span>
        <span className="top-article-title">{title}</span>
        <span className="top-article-author">{author}</span>
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

export default Top5Articles;
