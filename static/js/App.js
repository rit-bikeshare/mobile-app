import React from 'react';
import { Provider } from 'react-redux';
import { NativeRouter, Route, } from 'react-router-native';

import createStore from 'BikeShare/utils/createStore';
import MainContainer from 'BikeShare/containers/MainContainer';

const store = createStore();
export default () => {
  return (
    <Provider store={store}>
      <NativeRouter>
        <Route path="/" component={MainContainer} />
      </NativeRouter>
    </Provider>
  );
};
