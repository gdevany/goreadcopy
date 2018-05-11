import React from 'react';
import { MainNavView } from '../../views';

const SellYourBooks = () => (
  <MainNavView>
    <div className="container sell-your-books">
      <h1 className="title center-text">
        SELL YOUR BOOKS
      </h1>
      <div className="section">
        <div className="section-item">
          <img className="section-image" src="http://via.placeholder.com/100x100" alt="" />
          <p>
            If you are an author, you have realized how hard it actually is to sell books. With
            millions of new books published every year, how does one author stand out?
          </p>
        </div>
        <img className="arrow" src="http://via.placeholder.com/50x50" alt="" />
        <div className="section-item">
          <img className="section-image" src="http://via.placeholder.com/100x100" alt="" />
          <p>
            GoRead was created to help authors sell more books. Through our propietary technology,
            we match readers with authors who write the books that they like.
          </p>
        </div>
        <img className="arrow" src="http://via.placeholder.com/50x50" alt="" />
        <div className="section-item">
          <img className="section-image" src="http://via.placeholder.com/100x100" alt="" />
          <p>
            Then we show authors how to build meaningful relationships with those readers. By
            increasing the relationship value, more books are sold, every time!
          </p>
        </div>
        <img className="arrow" src="http://via.placeholder.com/50x50" alt="" />
        <div className="section-item">
          <h1 className="image-vector">
            x10
          </h1>
          <p>
            Authors, who use the GoRead system, sell 10X more books to their fans.
          </p>
        </div>
      </div>
      <div className="button-section">
        <a className="learn-more-button" href="">
          Learn More
        </a>
      </div>
    </div>
  </MainNavView>
);

export default SellYourBooks;
