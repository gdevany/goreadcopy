import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

const BootstrapApp = ({ children }) => (
  <div className="app">
    <Helmet>
      <link rel="stylesheet" href="/styles/bootstrap/bootstrap.min.css" />
    </Helmet>
    { React.cloneElement(children) }
  </div>
);

BootstrapApp.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

BootstrapApp.defaultProps = {
  children: null,
};

BootstrapApp.contextTypes = {
  router: PropTypes.object.isRequired,
};

export default BootstrapApp;
