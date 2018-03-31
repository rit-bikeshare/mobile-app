import Expo from 'expo';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch, BackButton } from 'react-router-native';
import { NetInfo } from 'react-native';
import { ConnectedRouter } from 'react-router-redux';

import RequestStatus from 'BikeShare/api/constants/RequestStatus';

import AppContainer from 'BikeShare/app/AppContainer';
import LoginContainer from 'BikeShare/login/components/Login';
import { networkConnectionChange as networkConnectionChangeAction } from 'BikeShare/api/actions/networkActions';
import { getUserFetchStatus } from 'BikeShare/auth/selectors/userFetchStatusSelectors';
import { fetchUserData as fetchUserDataAction } from 'BikeShare/auth/actions/userDataActions';

/*
 * So react router v4 is kinda dumb and doesn't allow nested routes.
 * In order to match that functionality, their recommendation is to make a wrapper
 * component, in this case AppContainer, and add your child routes there.
 * So because of this, most of the routing for the app is in AppContainer.
 */

const { PENDING, UNITIALIZED } = RequestStatus;

class Router extends React.Component {
  static propTypes = {
    fetchUserData: PropTypes.func,
    doLogin: PropTypes.func,
    userDataFetchStatus: PropTypes.oneOf(Object.keys(RequestStatus)),
    networkConnectionChange: PropTypes.func,
    history: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.handleConnectivityChange = this.handleConnectivityChange.bind(this);
  }

  componentWillMount() {
    const { fetchUserData } = this.props;
    fetchUserData();
    NetInfo.isConnected.addEventListener(
      'connectionChange',
      this.handleConnectivityChange
    );
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      'connectionChange',
      this.handleConnectivityChange
    );
  }

  handleConnectivityChange(isConnected) {
    const { networkConnectionChange } = this.props;
    networkConnectionChange(isConnected);
  }

  render() {
    const { doLogin, userDataFetchStatus, history } = this.props;

    if (
      userDataFetchStatus === PENDING ||
      userDataFetchStatus === UNITIALIZED
    ) {
      return <Expo.AppLoading />;
    }

    return (
      <ConnectedRouter history={history}>
        <BackButton>
          <Switch>
            <Route
              path="/login"
              render={props => <LoginContainer doLogin={doLogin} {...props} />}
            />
            <Route component={AppContainer} />
          </Switch>
        </BackButton>
      </ConnectedRouter>
    );
  }
}

const mapStateToProps = state => ({
  userDataFetchStatus: getUserFetchStatus(state),
});

export default connect(mapStateToProps, {
  fetchUserData: fetchUserDataAction,
  networkConnectionChange: networkConnectionChangeAction,
})(Router);
