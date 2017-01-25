import React from 'react'
import { Route, IndexRoute } from 'react-router'
import { App } from './components/App'
import { Home } from './components/Home'

export const Routes = (
  <Route path='/' component={App}>
    <IndexRoute component={Home} />
    {/**<Route path="/some-path" component={*?} />
    <Route path="/some-other-path" component={*?} />
    **/}
  </Route>
)

export default Routes
