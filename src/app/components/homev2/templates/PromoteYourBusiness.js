import React from 'react';
import { Helmet } from 'react-helmet';
import { MainNavView } from '../../views';

const PromoteYourBusiness = () => (
  <MainNavView>
    <Helmet>
      <title>GoRead | Promote Your Business</title>
    </Helmet>
    <div className="container promote-your-business">
      <h1 className="title">
        Promote Your Business
      </h1>
      <p>
        Every day, hundreds of new readers and authors join GoRead.com. It is a social network
        designed for people who love to read. Our demographic is 60% women. There are hundreds of
        thousands of people who spend 20-30 minutes per day on the GoRead website.
      </p>
      <p>
        We have several advertising options for business owners who are looking to connect with
        our audience.
      </p>
      <p>
        If you would like to arrange a quick consultation call with our advertising coordinator,
        please complete this short application:
      </p>
      <form className="promote-form">
        <input
          className="name form-input"
          type="text"
          placeholder="Contact name"
        />
        <input
          className="company form-input"
          type="text"
          placeholder="Company name"
        />
        <input
          className="phone form-input"
          type="text"
          placeholder="Contact phone number"
        />
        <input
          className="url form-input"
          type="text"
          placeholder="Company URL"
        />
        <input
          className="email form-input"
          type="text"
          placeholder="Contact e-mail address"
        />
        <input
          className="empty form-input"
          type="text"
          placeholder=""
        />
        <p className="form-question">
          What would you like to advertise?
        </p>
        <textarea
          className="advertise form-area"
          cols="40"
          rows="5"
          placeholder="Type Something..."
        />
      </form>
      <div className="button-container">
        <a className="submit-button" href="">
          Submit
        </a>
      </div>
    </div>
  </MainNavView>
);

export default PromoteYourBusiness;
