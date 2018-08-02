import React, { PureComponent } from 'react';
import { Link } from 'react-router';
import { PrimaryButton } from '../common';

class ReferralCallToActionTop extends PureComponent {
  render() {
    const { referrerName, slug } = this.props;
    return (
      <div className="center-text header">
        <div className="slide-up text-on-landing-container">
          <h1>
            Where readers and authors come together
          </h1>
          <h2 className="first-h2-on-landing">
            Joining Is Free, It’s A Social Media Website!
          </h2>
          <span className="middle-small-text">For a limited time:</span>
          <h2>
            Get Your First Book Free, Just For Creating An Account!
          </h2>
          <h1 className="referrer-message">
            {referrerName} has invited you to join GoRead.
          </h1>
          <Link to={`/accounts/signup?slug=${slug}`}>
            <PrimaryButton
              label="Sign Up"
            />
          </Link>
        </div>
      </div>
    );
  }
}

export default ReferralCallToActionTop;
