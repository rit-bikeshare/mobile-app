/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import { Button, View, Text, Content } from 'native-base';

import logo from 'img/logo.png';

import styles from './LoginStyles';

const Login = ({ handleLogin }) => {
  return (
    <Content contentContainerStyle={styles.container}>
      <View style={styles.logo}>
        <Image
          resizeMode="contain"
          source={logo}
          style={{ width: 330, height: 75 }}
        />
      </View>
      <View style={styles.loginButtonWrapper}>
        <Button style={styles.button} onPress={handleLogin}>
          <Text uppercase={false}>Log in with RIT</Text>
        </Button>
        <Text style={styles.subtext}>
          This will redirect you to login with shibboleth.
        </Text>
      </View>
    </Content>
  );
};

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
};

export default Login;
