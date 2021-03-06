import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-native';

import RequestStatus from 'BikeShare/api/constants/RequestStatus';
import { getUserFetchStatus } from 'BikeShare/auth/selectors/userFetchStatusSelectors';

import Main from './Main';
import ReportDamageView from 'BikeShare/report-damage/components/ReportDamageView';
import MaintenanceDeailView from 'BikeShare/maintenance/components/MaintenanceDeailView';

import UserData, { isEmpty } from 'BikeShare/auth/records/UserData';
import { login } from 'BikeShare/constants/urls';

const { FAILED } = RequestStatus;

class AppContainer extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    userData: PropTypes.instanceOf(UserData),
    fetchBikeRacksIfEmpty: PropTypes.func,
    fetchCurrentRentalIfNotAlready: PropTypes.func,
    userDataFetchStatus: PropTypes.oneOf(Object.keys(RequestStatus)),
  };

  componentWillMount() {
    const { userDataFetchStatus, userData, history } = this.props;

    if (isEmpty(userData) && userDataFetchStatus === FAILED) {
      history.replace(login);
    }
  }

  render() {
    return (
      <Switch>
        <Route exact={true} path="/" component={Main} />
        <Route path="/report-damage" component={ReportDamageView} />
        <Route path="/maintenance" component={MaintenanceDeailView} />
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

export default connect(stateSelectors, {})(AppContainer);
