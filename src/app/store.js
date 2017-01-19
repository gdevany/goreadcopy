import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware, } from 'react-router-redux'
import { browserHistory, } from 'react-router'
import initialState from './initialState'
import reducers from './redux/reducers/rootReducer'
import thunk from 'redux-thunk'

const routeMiddleware = routerMiddleware(browserHistory)
const enhancer = compose(applyMiddleware(thunk, routeMiddleware))
const store = createStore(reducers, initialState, enhancer, window.devToolsExtension && window.devToolsExtension())

export default store
