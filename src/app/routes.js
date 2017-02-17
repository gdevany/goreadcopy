import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './components/App'
import MyProfile from './components/myProfile/myProfile'
import { Home } from './components/home'
import { SignUpFlow } from './components/readerOnboarding'
import IncomingRedirect from './components/incomingRedirect/IncomingRedirect'

const Routes = (
  <Route path='/' component={App}>
    <IndexRoute component={Home} />
    <Route path='/redirect' component={IncomingRedirect} />
    <Route path='/signup' component={SignUpFlow} />
    <Route path='/my-profile' component={MyProfile} />
  </Route>
)

export default Routes
