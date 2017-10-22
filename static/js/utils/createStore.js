import {
  applyMiddleware,
  createStore as createReduxStore,
  compose,
} from 'redux';

import { persistStore, autoRehydrate } from 'redux-persist';
import createSensitiveStorage from 'redux-persist-sensitive-storage';

import thunk from 'redux-thunk';

import reducer from 'BikeShare/redux/reducers/root';

export default function createStore(initialState) {
  const composeEnhancers
    = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const createStoreWithMiddleware = composeEnhancers(
    applyMiddleware(thunk),
    autoRehydrate()
  )(createReduxStore);

  const store = createStoreWithMiddleware(reducer, initialState);

  persistStore(store, {
    whitelist: ['authReducer'],
    storage: createSensitiveStorage({
      keychainService: 'RITBikeShare',
      sharedPreferencesName: 'RITBikeShare'
    })
  });

  return store;
}
