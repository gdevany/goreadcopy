import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import PromiseMiddleware from 'redux-promise-middleware';
import initialState from './initialState';
import reducers from './redux/reducers/rootReducer';


const routeMiddleware = routerMiddleware(browserHistory);
let composeEnhancers;
const middlewares = [
  thunk,
  routeMiddleware,
  new PromiseMiddleware(),
];

if (process.env.NODE_ENV === 'production') {
  composeEnhancers = compose;
} else {
  middlewares.push(logger);
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const store = createStore(
  reducers,
  initialState,
  composeEnhancers(applyMiddleware(...middlewares)),
);

export default store;
