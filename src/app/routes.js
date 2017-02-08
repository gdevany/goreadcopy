import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './components/App'
import Home from './components/Home'
import IncomingRedirect from './components/incomingRedirect/IncomingRedirect'
import SignUpFlow from './components/SignUpFlow'

const Routes = (
  <Route path='/' component={App}>
    <IndexRoute component={Home} />
    <Route path='/redirect' component={IncomingRedirect} />
    <Route path='/signup' component={SignUpFlow} />
    {/**<Route path="/some-path" component={*?} />
    <Route path="/some-other-path" component={*?} />
    **/}
  </Route>
)

export default Routes
