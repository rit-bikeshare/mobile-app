import {
  applyMiddleware,
  createStore as createReduxStore,
  compose,
} from 'Redux';

import thunk from 'redux-thunk';

import reducer from 'BikeShare/redux/reducers/root';

export default function createStore(initialState) {
  const composeEnhancers
    = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const createStoreWithMiddleware = composeEnhancers(
    applyMiddleware(thunk)
  )(createReduxStore);

  return createStoreWithMiddleware(reducer, initialState);
}
