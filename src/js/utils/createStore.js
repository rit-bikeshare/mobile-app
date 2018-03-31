import {
  applyMiddleware,
  createStore as createReduxStore,
  compose,
} from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import createSecureStore from 'redux-persist-expo-securestore';

import immutableTransform from 'redux-persist-transform-immutable';

import reducer from 'BikeShare/rootReducer';
import api from 'BikeShare/api';
import SettingsData from 'BikeShare/settings/records/SettingsData';
import UserData from 'BikeShare/auth/records/UserData';
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

  const storage = createSecureStore();
  const config = {
    key: 'root',
    storage,
    whitelist: ['userData', 'settings'],
    transforms: [immutableTransform({ records: [SettingsData, UserData] })],
  };

  const reducers = persistReducer(config, reducer);

  store = createStoreWithMiddleware(reducers, initialState);

  persistStore(store);

  return store;
}
