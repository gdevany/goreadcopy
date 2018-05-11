import React from 'react';
import { MainNavView } from '../../views';

const Investors = () => (
  <MainNavView>
    <div className="container investors">
      <h1 className="title center-text">
        Investor Relations
      </h1>
      <p>
        If you are interested in using your investment money to make a difference then investing
        in our Series A2, may help you to accomplish that goal!
      </p>
      <p>
        GoRead is a market-place that serves readers and authors.
      </p>
      <div className="for-readers">
        <div className="left-section">
          <img className="section-image" src="http://via.placeholder.com/200x200" alt="" />
        </div>
        <div className="right-section">
          <h3 className="subtitle">
            For Readers
          </h3>
          <p>
            It could very well be the first successful combination of a world-caliber social media
            community & an e-commerce platform. We&#39;ve coined the phrase
            &#34;social-commerce&#34;. Readers join for the social experience, but when they
            realize that buying their books here will help childen, they redirect their spending
            to our book storem rather than other online book retailers.
          </p>
          <p>
            GoRead earns revenue with 4 different SaaS streams & 4 unique traditional revenue
            streams.
          </p>
        </div>
      </div>
      <hr className="divider" />
      <div className="for-authors">
        <div className="left-section">
          <h3 className="subtitle">
            For Authors
          </h3>
          <p>
            GoRead has successfully brought every part of an author&#39;s experience to one
            platform. From creating their books, to publishing, marketing, printing and
            selling, GoRead is a true &#34;one-stop shop&#34;. With the added value of
            knowing that every time they sell a book on GoRead, we give a book to a child in
            that author&#39;s name, authors tell is that &#34;it just feels good&#34;.
          </p>
          <p>
            For a copy of our Series A2 4,5M investor package, please email us at
            investorinfo@goread.com.
          </p>
        </div>
        <div className="right-section">
          <img className="section-image" src="http://via.placeholder.com/200x200" alt="" />
        </div>
      </div>
    </div>
  </MainNavView>
);

export default Investors;
