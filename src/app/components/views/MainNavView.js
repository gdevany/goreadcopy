import React from 'react';
import PropTypes from 'prop-types';
import { BaseView } from './';
import { NavMenuV2 } from '../common/navs';
import MainFooter from '../common/footer/MainFooter';

const MainNavView = ({ children, showFooter }) => (
  <BaseView>
    <NavMenuV2 />
    { children }
    {
      showFooter ?
        <MainFooter /> :
        null
    }
  </BaseView>
);

MainNavView.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  showFooter: PropTypes.bool,
};

MainNavView.defaultProps = {
  children: null,
  showFooter: true,
};

export default MainNavView;
