import React from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';

const BootstrapApp = ({ children }) => (
  <div className="app">
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
