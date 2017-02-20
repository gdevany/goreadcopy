import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './components/App'
import MyProfile from './components/myProfile/myProfile'
import { Home } from './components/home'
import { SignUpFlow } from './components/readerOnboarding'
import { ReadFeed } from './components/readFeed'
import IncomingRedirect from './components/incomingRedirect/IncomingRedirect'

const Routes = (
  <Route path='/' component={App}>
    <IndexRoute component={ReadFeed} />
    <Route path='/home' component={Home} />
    <Route path='/signup' component={SignUpFlow} />
    <Route path='/my-profile' component={MyProfile} />
    <Route path='/redirect' component={IncomingRedirect} />
  </Route>
)

export default Routes
