import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route } from 'react-router-native';

import MainContainer from 'BikeShare/containers/MainContainer';

import UserData, { isEmpty } from 'BikeShare/data/records/UserData';
import { login } from 'BikeShare/constants/urls';

class AppContainer extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    userData: PropTypes.instanceOf(UserData)
  }

  componentWillMount() {
    const { history, userData } = this.props;
    if (isEmpty(userData)) {
      history.replace(login);
    }
  }

  render() {
    return (
      <Route path="/" component={MainContainer} />
    );
  }
}

const stateSelectors = state => {
  return {
    userData: state.userData
  };
};

export default connect(stateSelectors, {})(AppContainer);
