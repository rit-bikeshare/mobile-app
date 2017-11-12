import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import { View, Button, Text, Content } from 'native-base';
import styles from 'BikeShare/styles/login';
import bikeShareLogo from 'img/bikeShareLogo.png';
import bike from 'img/bike.png';

const Login = ({ handleLogin }) => {
  return (
    <Content contentContainerStyle={styles.container}>
      <Image
        source={bikeShareLogo}
        style={styles.logo}
        />
      <Button style={styles.button} onPress={handleLogin}>
        <Text>Login</Text>
      </Button>
      <Image source={bike} style={styles.bike} />
      <View style={styles.dash} />
    </Content>
  );
};

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired
};

export default Login;
