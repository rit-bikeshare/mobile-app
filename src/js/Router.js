import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch, BackButton } from 'react-router-native';
import { NetInfo } from 'react-native';
import createHistory from 'history/createMemoryHistory';
import { ConnectedRouter } from 'react-router-redux';

import createStore from 'BikeShare/utils/createStore';
import AppContainer from 'BikeShare/app/AppContainer';
import LoginContainer from 'BikeShare/login/components/Login';
import { networkConnectionChange } from 'BikeShare/api/actions/networkActions';

const history = createHistory();
const store = createStore({}, history);

/*
 * So react router v4 is kinda dumb and doesn't allow nested routes.
 * In order to match that functionality, their recommendation is to make a wrapper
 * component, in this case AppContainer, and add your child routes there.
 * So because of this, most of the routing for the app is in AppContainer.
 */

const handleConnectivityChange = isConnected =>
  store.dispatch(networkConnectionChange(isConnected));

class Router extends React.Component {
  componentWillMount() {
    NetInfo.isConnected.addEventListener(
      'connectionChange',
      handleConnectivityChange
    );
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      'connectionChange',
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

export default Router;
