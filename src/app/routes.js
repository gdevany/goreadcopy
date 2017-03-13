import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './components/App'
import { SignUpFlow } from './components/readerOnboarding'
import IncomingRedirect from './components/incomingRedirect/IncomingRedirect'
import { HomeWrapper } from './components/home'
import { Profile } from './components/profile'
import { Auth } from './services'

const isUserLoggedIn = Auth.currentUserExists()

const Routes = (
  <Route path='/' component={App}>
    <IndexRoute isUserLoggedIn={isUserLoggedIn} component={HomeWrapper} />
    {/** when current_reader viewing their own profile **/}
    <Route path='/my_profile' component={Profile} />
    {/** when current_reader is viewing someone else's profile **/}
    <Route path='/profile/:slug' component={Profile} />
    <Route path='/signup' component={SignUpFlow} />
    <Route path='/redirect' component={IncomingRedirect} />
  </Route>
)

export default Routes
