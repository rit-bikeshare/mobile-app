import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch, BackButton } from 'react-router-native';
import { NetInfo } from 'react-native';
import createHistory from 'history/createMemoryHistory';
import { ConnectedRouter } from 'react-router-redux';

import createStore from 'BikeShare/utils/createStore';
import AppContainer from 'BikeShare/containers/AppContainer';
import LoginContainer from 'BikeShare/containers/LoginContainer';
import { networkConnectionChange } from 'BikeShare/redux/actions/networkActions';

const history = createHistory();
const store = createStore({}, history);

/*
 * So react router v4 is kinda dumb and doesn't allow nested routes.
 * In order to match that functionality, their recomendation is to make a wrapper
 * component, in this case AppContainer, and add your child routes there.
 * So becasuse of this, most of the routing for the app is in AppContainer.
 */

const handleConnectivityChange = isConnected =>
  store.dispatch(networkConnectionChange(isConnected));

export default class Router extends React.component {
  componentWillMount() {
    NetInfo.isConnected.addEventListener(
      'change',
      handleConnectivityChange
    );
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      'change',
      handleConnectivityChange
    );
  }

  render() {
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
  }
}
