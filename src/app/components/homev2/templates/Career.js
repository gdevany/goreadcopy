import React from 'react';
import { MainNavView } from '../../views';

const Career = () => (
  <MainNavView>
    <div className="container career" >
      <img className="title-image" src="/image/join-our-team.jpg" alt="" />
      <h4 className="subtitle center-text">
        We want you to join our team!
      </h4>
      <p>
        GoRead is a company on a mission. By serving authors and readers, we are building a
        community of like-minded folks who are helping us to eliminate illiteracy in children.
      </p>
      <p>
        If you are at a point in your career, where being mission-oriented is important to you,
        then take a look at the opportunities that we have. We are a fast-paced environmet full
        of reading - addicts.
      </p>
      <p className="subtitle">
        What we offer:
      </p>
      <div className="offer">
        <div className="right-offer">
          <div className="offer-section">
            <img className="offer-icon" src="http://via.placeholder.com/100x100" alt="" />
            Competitive Salaries
          </div>
          <div className="offer-section">
            <img className="offer-icon" src="http://via.placeholder.com/100x100" alt="" />
            Medical and Dental Benefits
          </div>
          <div className="offer-section">
            <img className="offer-icon" src="http://via.placeholder.com/100x100" alt="" />
            Reading Time
          </div>
          <div className="offer-section">
            <img className="offer-icon" src="http://via.placeholder.com/100x100" alt="" />
            Free Books
          </div>
        </div>
        <div className="left-offer">
          <div className="offer-section">
            <img className="offer-icon" src="http://via.placeholder.com/100x100" alt="" />
            Occasional Breakfast and Lunch
          </div>
          <div className="offer-section">
            <img className="offer-icon" src="http://via.placeholder.com/100x100" alt="" />
            Paid Sick Days & Vacation
          </div>
          <div className="offer-section">
            <img className="offer-icon" src="http://via.placeholder.com/100x100" alt="" />
            Employee Assistance Program
          </div>
        </div>
      </div>
      <p>
        If you see a position below that interest you, simply send your Resume and Cover letter to
        careers@goread.com.
      </p>
      <a className="check-button" href="#">
        Check out openings and apply online
      </a>
      <div className="career-opening">
        <div className="left-section">
          <img className="section-image" src="http://via.placeholder.com/200x200" alt="" />
        </div>
        <div className="right-section">
          <h4 className="subtitle">
            Publishing Coach
          </h4>
          <p>
            A publishing coach works in our acquisitions department. We are a full-service book
            publisher. Every month, hundreds of new authors come to us for information on
            publishing with Rebel Press (our publishing company).
          </p>
          <p>
            The publishing coach works in a fun-filled call center environmet. Daily Training
            quickly helps publishing coaches to develop expertise, so they can offer the most
            value to authors, on the phone.
          </p>
          <p>
            There are daily targets that lead to free lunches and cash bonuses. If we exceed
            monthly targets, we go on weekend &#34;training trips&#34;.
          </p>
          <p>
            If you love to work on the phone, and are a hunter by nature, then this is a dream
            job for you!
          </p>
        </div>
      </div>
      <hr className="divider" />
      <div className="career-opening">
        <div className="left-section">
          <img className="section-image" src="http://via.placeholder.com/200x200" alt="" />
        </div>
        <div className="right-section">
          <h4 className="subtitle">
            Writing Coach
          </h4>
          <p>
            If you are an experienced book editor, and have published a book or two, this may very
            well be your dream-job. Every month dozens of new authors trust GoRead to help them
            to write their books. We have created a very unique technology that allows non-fiction
            authors to write books that are guaranteed to sell in less than 30 days, in less than
            10 minutes per day.
          </p>
          <p>
            We need specially training coaches to &#34;hold their hands&#34;, through the process.
          </p>
        </div>
      </div>
    </div>
  </MainNavView>
);

export default Career;
