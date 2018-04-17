import React, { Component } from 'react';
import PropTypes from 'prop-types';

class App extends Component {
  render() {
    return (
      <div className="root">
        { React.cloneElement(this.props.children) }
      </div>
    );
  }
}

export default App;
