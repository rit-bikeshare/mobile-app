import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import { Container, Button, Text, H1, Content } from 'native-base';
import styles from 'BikeShare/styles/login';
import bikeClipArt from 'img/BikeClipArt.png';

const Login = ({ handleLogin }) => {
  return (
    <Container>
      <Content contentContainerStyle={styles.container}>
        <Image
          source={bikeClipArt}
          style={styles.logo}
        />
        <H1 style={styles.title}>RIT Bike Share</H1>
        <Button style={styles.button} onPress={handleLogin}>
          <Text>Login</Text>
        </Button>
      </Content>
    </Container>
  );
};

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired
};

export default Login;
