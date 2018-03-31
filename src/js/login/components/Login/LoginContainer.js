import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchUserData as fetchUserDataAction } from 'BikeShare/auth/actions/userDataActions';
import { doLogin as doLoginAction } from 'BikeShare/auth/actions/loginActions';
import { getUserFetchStatus } from 'BikeShare/auth/selectors/userFetchStatusSelectors';
import { index } from 'BikeShare/constants/urls';
import RequestStatus from 'BikeShare/api/constants/RequestStatus';

import LoginView from './LoginView';

const { SUCCESS } = RequestStatus;

class LoginContainer extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    fetchUserData: PropTypes.func,
    userDataFetchStatus: PropTypes.oneOf(Object.keys(RequestStatus)),
    doLogin: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.clickLogin = this.clickLogin.bind(this);
    this.state = {
      loginError: false,
    };
  }

  componentWillMount() {
    const { history, userDataFetchStatus } = this.props;

    if (userDataFetchStatus === SUCCESS) {
      history.replace(index);
    }
  }

  clickLogin() {
    const { fetchUserData, doLogin } = this.props;

    doLogin().then(result => {
      if (result.type === 'success') {
        const { token } = result.params;
        fetchUserData(token);
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
  doLogin: doLoginAction,
})(LoginContainer);
