import React from 'react';
import { Link } from 'react-router';
import { PrimaryButton, SoldBookCounter } from '../common';

const CallToActionTop = () => (
  <div className="center-text header">
    <div className="slide-up text-on-landing-container">
      <h1>
        Buy A Book, We Give A Book!
      </h1>
      <h2 className="second-h2-on-landing medium-sized-text">
        Total Books Given To Kids:&nbsp;
        <SoldBookCounter />
      </h2>
      <Link to="/accounts/signup">
        <PrimaryButton
          label="Sign Up"
        />
      </Link>
    </div>
    <br /> <br />
  </div>
);

export default CallToActionTop;
