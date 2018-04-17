import React from 'react';
import PropTypes from 'prop-types';

const BaseView = ({ children }) => (
  <div>
    { children }
  </div>
);

BaseView.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

BaseView.defaultProps = {
  children: null,
};

export default BaseView;
