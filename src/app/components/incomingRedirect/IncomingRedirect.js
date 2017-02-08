import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { Redirects } from '../../redux/actions'

// This component allows for authenticated redirection to the frontend of the
// app for, e.g., login w/ social providers. After auth between the provider
// and the API server, the API server can redirect to a route on the frontend
// with a token for the now-authenticated user and a new path to redirect to.
//
// This route should looks something like:
//
// /redirect?token=<one-time use token>&redirectPath=<path to redirect to after token refreshe>
//
class IncomingRedirect extends Component {
  componentWillMount() {
    const {
      token,
      redirectPath,
    } = this.props.router.location.query

    this.props.incomingRedirect({ redirectPath, token })
  }

  render() {
    return (
      <div />
    )
  }
}

const mapDispatchToProps = {
  incomingRedirect: Redirects.incoming,
}

export default withRouter(connect(null, mapDispatchToProps)(IncomingRedirect))
