import React from 'react';
import { Link } from 'react-router';
import { PrimaryButton } from '../common';

const styles = {
  ctaContainer: {
    position: 'relative',
  },
};

const CallToActionBottom = () => (
  <div style={styles.ctaContainer} className="center-text call-to-action-wrapper">
    <h1 className="general-font">
      Ready to join?
    </h1>
    <br />
    <Link to="/accounts/signup">
      <PrimaryButton
        label="Sign Up"
      />
    </Link>
    <br />
  </div>
);

export default CallToActionBottom;
