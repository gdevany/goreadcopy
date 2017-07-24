import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import { browserHistory } from 'react-router'
import initialState from './initialState'
import reducers from './redux/reducers/rootReducer'
import thunk from 'redux-thunk'

const routeMiddleware = routerMiddleware(browserHistory)
let composeEnhancers

if (process.env.NODE_ENV === 'production') {
  composeEnhancers = compose
} else {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
}
const store = createStore(reducers, initialState,
  composeEnhancers(
    applyMiddleware(
      routeMiddleware,
      thunk,
    )
  )
)

export default store
