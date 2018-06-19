import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../client/styles/app/views/home/index.scss';

class BootstrapApp extends Component {
  static propTypes = {
    children: PropTypes.node,
  }

  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  render() {
    return (
      <div className="app BootstrapCSS">
        { React.cloneElement(this.props.children) }
      </div>
    );
  }
}

export default BootstrapApp;
