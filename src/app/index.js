import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import store from './store'
import { App } from './components/App'

const display = document.querySelector('.container')
const history = syncHistoryWithStore(browserHistory, store)

render(
	<Provider store={store}>
		<Router history={history}>
			<Route path="/" component={App}>
				{/** <IndexRoute component={*?} />
			<Route path="/some-path" component={*?} />
				<Route path="/some-other-path" component={*?} />
				**/}
			</Route>
		</Router>
	</Provider>,
	display)
