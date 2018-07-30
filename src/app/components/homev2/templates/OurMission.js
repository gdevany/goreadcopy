import React from 'react';
import { Helmet } from 'react-helmet';
import { MainNavView } from '../../views';

const OurMission = () => (
  <MainNavView>
    <Helmet>
      <title>GoRead | Our Misson</title>
    </Helmet>
    <div className="container our-mission">
      <img className="title-image" src="/image/our-mission.jpg" alt="" />
      <p className="center-text">
        We are driven by a goal to help authors, inspire readers and give every child the gift of
        reading! Our mission statement is clear:
      </p>
      <h5 className="sub-paragraph center-text">
        To Change The Way That People Write, Read and Experience Books!
      </h5>
      <div className="for-authors">
        <h3 className="mobile-subtitle">
          For Authors
        </h3>
        <div className="left-section">
          <img className="section-image" src="/image/author-pic-CIRCLE.png" alt="" />
        </div>
        <div className="right-section">
          <h3 className="subtitle">
            For Authors
          </h3>
          <p>
            Every year there are millions of books published around the world. 75% of these books
            are self-published. Annually, millions of self-published authors spend between $3,000
            USD & $5,000 USD to write, publish and print their books. Sadly, almost 90% of these
            authors fail to sell enough books to recoup their initial investment, losing thousands
            of dollars in the experience.
          </p>
          <p>
            GoRead has created a technology that allows authors to write, publish and print their
            books, 60% cheaper than any other alternative. In doing so, we have turned a losing
            proposition into a positive experience for millions of authors, every year!
          </p>
        </div>
      </div>
      <hr className="divider" />
      <div className="for-readers">
        <div className="left-section">
          <h3 className="subtitle">
            For Readers
          </h3>
          <p>
            People who love to read, are passionate about it. They deserve their own community
            where they can connect with other like-minded folks. When readers join our
            community they become part of a global force that is determined to give every child
            the gift of reading.
          </p>
        </div>
        <div className="right-section">
          <img className="section-image" src="/image/a-woman-reading-a-book-CIRCLE.png" alt="" />
        </div>
        <h3 className="mobile-subtitle">
          For Readers
        </h3>
      </div>
      <hr className="divider" />
      <div className="for-children">
        <h3 className="mobile-subtitle">
          For Children
        </h3>
        <div className="left-section">
          <img className="section-image" src="/image/kid-reading-circle.png" alt="" />
        </div>
        <div className="right-section">
          <h3 className="subtitle">
            For Children
          </h3>
          <p>
            The children&#39;s illiteracy statistics are scary. They have not changed in the past
            15 years. Change (elimination) is only going to occur when &#34;grass-roots&#34;
            movement leads this cause. We are that movement.
          </p>
          <p>
            Through the GoRead Children&#39;s Literacy Foundation, we will put in place a system
            that will, one-day, give every Child the gift of reading.
          </p>
        </div>
      </div>
    </div>
  </MainNavView>
);

export default OurMission;
