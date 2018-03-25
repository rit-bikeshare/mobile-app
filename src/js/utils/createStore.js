import {
  applyMiddleware,
  createStore as createReduxStore,
  compose,
} from 'redux';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import immutableTransform from 'redux-persist-transform-immutable';

import SettingsData from 'BikeShare/settings/records/SettingsData';
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

  const config = {
    key: 'root',
    storage,
    whitelist: ['authReducer', 'settings'],
    transforms: [immutableTransform({ records: [SettingsData] })],
  };

  const reducers = persistReducer(config, reducer);

  const createStoreWithMiddleware = composeEnhancers(
    applyMiddleware(thunk.withExtraArgument(api), routerMiddleware(history))
  )(createReduxStore);

  const store = createStoreWithMiddleware(reducers, initialState);

  persistStore(store);

  return store;
}
