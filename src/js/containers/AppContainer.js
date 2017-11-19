import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-native';

import {
  fetchBikeRacksIfEmpty as fetchBikeRacksIfEmptyAction
} from 'BikeShare/redux/actions/bikeRackActions';

import MainContainer from 'BikeShare/containers/MainContainer';
import CheckoutContainer from 'BikeShare/containers/CheckoutContainer';

import UserData, { isEmpty } from 'BikeShare/data/records/UserData';
import { login } from 'BikeShare/constants/urls';

class AppContainer extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    userData: PropTypes.instanceOf(UserData),
    fetchBikeRacksIfEmpty: PropTypes.func
  }

  componentWillMount() {
    const { history, userData } = this.props;
    const { fetchBikeRacksIfEmpty } = this.props;

    fetchBikeRacksIfEmpty();
    if (isEmpty(userData)) {
      history.replace(login);
    }
  }

  render() {
    return (
      <Switch>
        <Route exact={true} path="/" component={MainContainer} />
        <Route path="/checkout" component={CheckoutContainer} />
      </Switch>
    );
  }
}

const stateSelectors = state => {
  return {
    userData: state.userData
  };
};

export default connect(stateSelectors, {
  fetchBikeRacksIfEmpty: fetchBikeRacksIfEmptyAction
})(AppContainer);
