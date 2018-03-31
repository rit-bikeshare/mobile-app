import {
  applyMiddleware,
  createStore as createReduxStore,
  compose,
} from 'redux';

import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';

import reducer from 'BikeShare/rootReducer';
import api from 'BikeShare/api';

import { setUserToken as setUserTokenAction } from 'BikeShare/auth/actions/userDataActions';
import getUserTokenSelector from 'BikeShare/auth/selectors/getUserToken';

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

  let store;
  const getUserToken = () => getUserTokenSelector(store.getState());
  const setUserToken = userToken =>
    store.dispatch(setUserTokenAction(userToken));

  const apiInstance = api(getUserToken, setUserToken);
  const createStoreWithMiddleware = composeEnhancers(
    applyMiddleware(
      thunk.withExtraArgument(apiInstance),
      routerMiddleware(history)
    )
  )(createReduxStore);

  store = createStoreWithMiddleware(reducer, initialState);

  return store;
}
