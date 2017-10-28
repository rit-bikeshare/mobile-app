import {
  applyMiddleware,
  createStore as createReduxStore,
  compose,
} from 'redux';

import { persistStore, autoRehydrate } from 'redux-persist';

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
    whitelist: ['authReducer']
  });

  return store;
}
