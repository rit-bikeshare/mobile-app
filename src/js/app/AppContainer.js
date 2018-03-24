import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-native';

import { fetchBikeRacksIfEmpty as fetchBikeRacksIfEmptyAction } from 'BikeShare/bike-rack/actions/bikeRackActions';
import { fetchCurrentRentalIfNotAlready as fetchCurrentRentalIfNotAlreadyAction } from 'BikeShare/rental/actions/rentalActions';

import Main from './Main';
import { CheckoutView } from 'BikeShare/check-out';

import UserData, { isEmpty } from 'BikeShare/auth/records/UserData';
import { login } from 'BikeShare/constants/urls';

class AppContainer extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    userData: PropTypes.instanceOf(UserData),
    fetchBikeRacksIfEmpty: PropTypes.func,
    fetchCurrentRentalIfNotAlready: PropTypes.func,
  };

  componentWillMount() {
    const { history, userData } = this.props;
    const {
      fetchBikeRacksIfEmpty,
      fetchCurrentRentalIfNotAlready,
    } = this.props;

    fetchBikeRacksIfEmpty();
    fetchCurrentRentalIfNotAlready();
    if (isEmpty(userData)) {
      history.replace(login);
    }
  }

  render() {
    return (
      <Switch>
        <Route exact={true} path="/" component={Main} />
        <Route path="/checkout" component={CheckoutView} />
      </Switch>
    );
  }
}

const stateSelectors = state => {
  return {
    userData: state.userData,
  };
};

export default connect(stateSelectors, {
  fetchBikeRacksIfEmpty: fetchBikeRacksIfEmptyAction,
  fetchCurrentRentalIfNotAlready: fetchCurrentRentalIfNotAlreadyAction,
})(AppContainer);
