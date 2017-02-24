import React from 'react'
import { connect } from 'react-redux'

import Home from './Home'
import { ReadFeed } from '../readFeed'

const { PureComponent } = React

class HomeWrapper extends PureComponent {
  render() {
    return this.props.isLogged ? (<ReadFeed />) : (<Home />)
  }
}

const mapStateToProps = (state) => {
  return {
    isLogged: state.currentReader.token
  }
}

export default connect(mapStateToProps, null)(HomeWrapper)
