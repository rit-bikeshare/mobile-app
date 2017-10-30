import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { Image } from 'react-native';
import { Container, Button, Text, H1, Content } from 'native-base';

import { setUserData as setUserDataAction } from 'BikeShare/redux/actions/userDataActions';

import styles from 'BikeShare/styles/login';
import { index } from 'BikeShare/constants/urls';

import bikeClipArt from 'img/BikeClipArt.png';

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
    return (
      <Container>
        <Content contentContainerStyle={styles.container}>
          <Image
            source={bikeClipArt}
            style={styles.logo}
          />
          <H1 style={styles.title}>RIT Bike Share</H1>
          <Button style={styles.button} onPress={this.clickLogin}>
            <Text>Login</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

export default connect(null, {
  setUserData: setUserDataAction
})(LoginContainer);