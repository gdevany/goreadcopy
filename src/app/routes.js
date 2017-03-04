import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './components/App'
import { Home } from './components/home'
import { SignUpFlow } from './components/readerOnboarding'
import { ReadFeed } from './components/readFeed'
import IncomingRedirect from './components/incomingRedirect/IncomingRedirect'
import { Auth } from './services'
const isUserLoggedIn = Auth.currentUserExists()

const Routes = (
  <Route path='/' component={App}>
    <IndexRoute component={isUserLoggedIn ? ReadFeed : Home} />
    <Route path='/signup' component={SignUpFlow} />
    <Route path='/redirect' component={IncomingRedirect} />
  </Route>
)

export default Routes
