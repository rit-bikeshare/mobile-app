/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import { MapView as ExpoMapView } from 'expo';
import { Button, View, Text, Content } from 'native-base';

import styles from 'BikeShare/styles/login';
import mapStyle from 'BikeShare/styles/map';

import { PROVIDER_GOOGLE } from 'BikeShare/constants/MapProviders';

const Login = ({ handleLogin }) => {
  return (
    <Content contentContainerStyle={styles.container}>
      <ExpoMapView
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%'
        }}
        initialRegion={{
          latitude: 43.08447438334887,
          latitudeDelta: 0.00900991980918775,
          longitude: -77.67920080572367,
          longitudeDelta: 0.007426701486110687
        }}
        minZoomLevel={20}
        provider={PROVIDER_GOOGLE}
        customMapStyle={mapStyle}
        cacheEnabled={true}
        scrollEnabled={false}
        zoomEnabled={false}
        showsScale={false}
        showsCompass={false}
        pitchEnabled={false}
      />
      <View style={styles.logo}>
        <Text style={styles.bikeLogo}>Bike</Text>
        <Text style={styles.shareLogo}>Share</Text>
      </View>
      <Text style={styles.subtext}>It's free, use it.</Text>
      <View style={styles.loginButtonWrapper}>
        <Button style={styles.button} onPress={handleLogin}>
          <Text uppercase={false}>Log in with RIT</Text>
        </Button>
        <Text style={styles.subtext}>This will redirect you to login with shibboleth.</Text>
      </View>
    </Content>
  );
};

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired
};

export default Login;
