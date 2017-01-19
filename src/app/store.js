import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware, } from 'react-router-redux'
import { browserHistory, } from 'react-router'
import initialState from './initialState'
import reducers from './reducers/rootReducer'
import thunk from 'redux-thunk'
import persistState from 'redux-localstorage';

const routerMiddleware = routerMiddleware(browserHistory)
const enhancer = compose(applyMiddleware(thunk, routerMiddleware))
const store = createStore(reducers, initialState, enhancer, window.devToolsExtension && window.devToolsExtension())

export default store
