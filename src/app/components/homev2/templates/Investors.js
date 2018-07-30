import React from 'react';
import { Link } from 'react-router';
import { Helmet } from 'react-helmet';
import { MainNavView } from '../../views';

const Investors = () => (
  <MainNavView>
    <Helmet>
      <title>GoRead | Investor Relations</title>
    </Helmet>
    <div className="container investors">
      <img className="title-image" src="/image/investor-relations.jpg" alt="" />
      <p>
        If you are interested in using your investment money to make a difference then investing
        in our Series A2, may help you to accomplish that goal!
      </p>
      <p>
        GoRead is a market-place that serves readers and authors.
      </p>
      <div className="for-readers">
        <h3 className="mobile-subtitle">
          <Link href="/accounts/signup">
            For Readers
          </Link>
        </h3>
        <div className="left-section">
          <img className="section-image" src="/image/a-woman-reading-a-book-CIRCLE.png" alt="" />
        </div>
        <div className="right-section">
          <h3 className="subtitle">
            <Link href="/accounts/signup">
              For Readers
            </Link>
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
            <a href="http://Go.EarnMoneyByWriting.com​" target="_blank" rel="noopener noreferrer">
              For Authors
            </a>
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
          <img className="section-image" src="/image/author-pic-CIRCLE.png" alt="" />
        </div>
        <h3 className="mobile-subtitle">
          <a href="http://Go.EarnMoneyByWriting.com​" target="_blank" rel="noopener noreferrer">
            For Authors
          </a>
        </h3>
      </div>
    </div>
  </MainNavView>
);

export default Investors;
