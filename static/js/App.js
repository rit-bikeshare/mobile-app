import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch, BackButton } from 'react-router-native';
import createHistory from 'history/createMemoryHistory';
import { ConnectedRouter } from 'react-router-redux';
import createStore from 'BikeShare/utils/createStore';
import AppContainer from 'BikeShare/containers/AppContainer';
import LoginContainer from 'BikeShare/containers/LoginContainer';

const history = createHistory();
const store = createStore({}, history);

/*
 * So react router v4 is kinda dumb and doesn't allow nested routes.
 * In order to match that functionality, their recomendation is to make a wrapper
 * component, in this case AppContainer, and add your child routes there.
 * So becasuse of this, most of the routing for the app is in AppContainer.
 */

export default () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <BackButton>
          <Switch>
            <Route path="/login" component={LoginContainer} />
            <Route component={AppContainer} />
          </Switch>
        </BackButton>
      </ConnectedRouter>
    </Provider>
  );
};
