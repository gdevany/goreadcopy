import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './components/App'
import { SignUpFlow } from './components/readerOnboarding'
import IncomingRedirect from './components/incomingRedirect/IncomingRedirect'
import HomeWrapper from './components/home/HomeWrapper'

const Routes = (
  <Route path='/' component={App}>
    <IndexRoute component={HomeWrapper} />
    <Route path='/signup' component={SignUpFlow} />
    <Route path='/redirect' component={IncomingRedirect} />
  </Route>
)

export default Routes
