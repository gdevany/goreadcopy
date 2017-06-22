import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './components/App'
import { SignUpFlow } from './components/readerOnboarding'
import IncomingRedirect from './components/incomingRedirect/IncomingRedirect'
import { HomeWrapper } from './components/home'
import { Profile } from './components/profile'
import { ReferralHome } from './components/referral'
import { Settings } from './components/settings'
import { Auth } from './services'

const isUserLoggedIn = Auth.currentUserExists()

const Routes = (
  <Route path='/' component={App}>
    <IndexRoute isUserLoggedIn={isUserLoggedIn} component={HomeWrapper} />
    <Route path='/vid' isUserLoggedIn={isUserLoggedIn} component={HomeWrapper} />
    <Route path='/profile/settings' component={Settings} />
    <Route path='/profile/:slug' component={Profile} />
    <Route path='/me/:slug' component={ReferralHome} />
    <Route path='/signup' component={SignUpFlow} />
    <Route path='/redirect' component={IncomingRedirect} />
  </Route>
)

export default Routes
