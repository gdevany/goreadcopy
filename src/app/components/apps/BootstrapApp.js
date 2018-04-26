import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleRoot } from 'radium';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import 'bootstrap/dist/css/bootstrap.min.css';

class BootstrapApp extends Component {
  static propTypes = {
    children: PropTypes.node,
  }

  static childContextTypes = {
    muiTheme: PropTypes.object,
  }

  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  }

  componentWillMount() {
    this.setState({
      muiTheme: getMuiTheme(),
    });
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({
      muiTheme: newMuiTheme,
    });
  }

  render() {
    return (
      <div className="app BootstrapCSS">
        <StyleRoot>
          { React.cloneElement(this.props.children) }
        </StyleRoot>
      </div>
    );
  }
}

BootstrapApp.childContextTypes = {
  muiTheme: PropTypes.object.isRequired,
};

export default BootstrapApp;
