import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setUserData as setUserDataAction } from 'BikeShare/redux/actions/userDataActions';
import { index } from 'BikeShare/constants/urls';
import Login from 'BikeShare/components/Login';

class LoginContainer extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    setUserData: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.clickLogin = this.clickLogin.bind(this);
  }

  clickLogin() {
    const { history, setUserData } = this.props;
    setUserData({
      username: 'test',
      authToken: 'test',
      firstName: 'test',
      lastName: 'test'
    });
    history.replace(index);
  }

  render() {
    return <Login handleLogin={this.clickLogin} />;
  }
}

export default connect(null, {
  setUserData: setUserDataAction
})(LoginContainer);
