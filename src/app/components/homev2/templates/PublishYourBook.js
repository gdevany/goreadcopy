import React from 'react';
import { Helmet } from 'react-helmet';
import { MainNavView } from '../../views';

const PublishYourBook = () => (
  <MainNavView>
    <Helmet>
      <title>GoRead | Publish Your Book</title>
    </Helmet>
    <div className="container publish-your-book">
      <h1 className="title">
        Publish Your Book
      </h1>
      <div className="intro-container">
        <div className="image-container">
          <img className="rebel-image" src="http://via.placeholder.com/100x100" alt="" />
        </div>
        <div className="paragraph-container">
          <p>
            Every year thousands of authors publish their books with Rebel Press.
          </p>
        </div>
      </div>
      <h4 className="subtitle">
        What is Rebel Press?
      </h4>
      <p>
        Rebel Press is the book publishing division of GoRead.com. If you publish your book with
        Rebel Press, you get exclusive access to the full power of the GoRead system to sell more
        books!
      </p>
      <p>
        Rebel Press has helped thousands of authors to hit best-sellers list on every platform,
        sell 10X more books, create other products and services to spur book sales, set up
        succesful book store signing events and so much more.
      </p>
      <p>
        To learn more about becoming a Rebel, simply click on the link below.
      </p>
      <p>
        One of our experienced publishing coaches will show you how Rebel is different.
      </p>
      <p>
        To arrange your FREE publishing consultation with one of our coaches, click on the link
        below:
      </p>
      <div className="button-container">
        <a className="learn-button" href="">
          Learn More
        </a>
      </div>
    </div>
  </MainNavView>
);

export default PublishYourBook;
