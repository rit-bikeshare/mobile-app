import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import userApi from 'BikeShare/api/clients/userApi';

import { fetchUserData as fetchUserDataAction } from 'BikeShare/auth/actions/userDataActions';
import { getUserFetchStatus } from 'BikeShare/auth/selectors/userFetchStatusSelectors';
import { index } from 'BikeShare/constants/urls';

import LoginView from './LoginView';

class LoginContainer extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    fetchUserData: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.clickLogin = this.clickLogin.bind(this);
    this.state = {
      loginError: false,
    };
  }

  clickLogin() {
    const { history, fetchUserData } = this.props;

    userApi.doLogin().then(result => {
      if (result.type === 'success') {
        history.replace(index);
        fetchUserData();
      } else {
        this.setState({
          loginError: true,
        });
      }
      return result;
    });
  }

  render() {
    return <LoginView handleLogin={this.clickLogin} />;
  }
}

const mapStateToProps = state => ({
  userDataFetchStatus: getUserFetchStatus(state),
});
export default connect(mapStateToProps, {
  fetchUserData: fetchUserDataAction,
})(LoginContainer);
