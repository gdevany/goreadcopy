import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { browserHistory, Router } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import store from './store'
import Routes from './routes'
const display = document.querySelector('.container')
const history = syncHistoryWithStore(browserHistory, store)

if (process.env.NODE_ENV === 'production') {
  Raven.config('http://4a0dde6c013a4eb38cf974920fdbf184@logserv.readerslegacy.com/3').install()
}

injectTapEventPlugin()

render(
  <Provider store={store}>
    <MuiThemeProvider>
      <Router history={history}>
        { Routes }
      </Router>
    </MuiThemeProvider>
  </Provider>,
  display
)
