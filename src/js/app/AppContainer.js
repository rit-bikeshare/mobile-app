import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-native';

import RequestStatus from 'BikeShare/api/constants/RequestStatus';
import { fetchBikeRacksIfEmpty as fetchBikeRacksIfEmptyAction } from 'BikeShare/bike-rack/actions/bikeRackActions';
import { fetchCurrentRentalIfNotAlready as fetchCurrentRentalIfNotAlreadyAction } from 'BikeShare/rental/actions/rentalActions';
import { getUserFetchStatus } from 'BikeShare/auth/selectors/userFetchStatusSelectors';

import Main from './Main';
import { CheckoutView } from 'BikeShare/check-out';
import ReportDamageView from 'BikeShare/report-damage/components/ReportDamageView';

import UserData, { isEmpty } from 'BikeShare/auth/records/UserData';
import { login } from 'BikeShare/constants/urls';

const { FAILED, SUCCESS } = RequestStatus;

class AppContainer extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    userData: PropTypes.instanceOf(UserData),
    fetchBikeRacksIfEmpty: PropTypes.func,
    fetchCurrentRentalIfNotAlready: PropTypes.func,
    userDataFetchStatus: PropTypes.oneOf(Object.keys(RequestStatus)),
  };

  componentWillMount() {
    const {
      userDataFetchStatus,
      fetchBikeRacksIfEmpty,
      fetchCurrentRentalIfNotAlready,
      userData,
      history,
    } = this.props;

    if (isEmpty(userData) && userDataFetchStatus === FAILED) {
      history.replace(login);
    }

    if (userDataFetchStatus === SUCCESS) {
      fetchBikeRacksIfEmpty();
      fetchCurrentRentalIfNotAlready();
    }
  }

  render() {
    return (
      <Switch>
        <Route exact={true} path="/" component={Main} />
        <Route path="/checkout" component={CheckoutView} />
        <Route path="/report-damage" component={ReportDamageView} />
      </Switch>
    );
  }
}

const stateSelectors = state => {
  return {
    userData: state.userData,
    userDataFetchStatus: getUserFetchStatus(state),
  };
};

export default connect(stateSelectors, {
  fetchBikeRacksIfEmpty: fetchBikeRacksIfEmptyAction,
  fetchCurrentRentalIfNotAlready: fetchCurrentRentalIfNotAlreadyAction,
})(AppContainer);
