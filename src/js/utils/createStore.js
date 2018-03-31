import {
  applyMiddleware,
  createStore as createReduxStore,
  compose,
} from 'redux';

import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';

import reducer from 'BikeShare/rootReducer';
import api from 'BikeShare/api';

/**
 * creates a redux store from the root reducer given the initialState.
 * This also handles setting up the dev tools, and any middlewares we need.
 * @param  {object} initialState the initial state to give the redux store.
 * @param  {object} history     the history for react router.
 * @return {store}              the created store.
 */
export default function createStore(initialState, history) {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const createStoreWithMiddleware = composeEnhancers(
    applyMiddleware(thunk.withExtraArgument(api), routerMiddleware(history))
  )(createReduxStore);

  const store = createStoreWithMiddleware(reducer, initialState);

  return store;
}
