/* eslint-disable react/no-unescaped-entities */

import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import { Text, View, Button, H2, H1, Icon } from 'native-base';
import helmets from 'img/helmets.png';

import styles from './CheckOutSuccessStyles';

const CheckoutSuccess = ({ onClose }) => {
  return (
    <View style={styles.container}>
      <Button
        transparent={true}
        dark={true}
        onPress={onClose}
        style={styles.backButton}
      >
        <Icon
          name="close"
          type="MaterialCommunityIcons"
          style={{ fontSize: 30 }}
        />
      </Button>
      <View style={styles.paddedView}>
        <View style={styles.icon}>
          <Icon
            type="Ionicons"
            name="md-checkmark-circle-outline"
            style={styles.checkmark}
          />
          <H1 style={styles.iconHeader}>Success</H1>
        </View>
        <H2 style={styles.header}>Before you go</H2>
        <Text style={{ textAlign: 'center', paddingBottom: 32 }}>
          Please read through the information below.
        </Text>
        <H2 style={styles.header}>Safety Tips</H2>
        <Text style={{ textAlign: 'center', paddingBottom: 24 }}>
          Follow the illustrations below on how to properly wear a bike helmet.
          If you have a helmet, wear it!
        </Text>
      </View>
      <View style={styles.helmetsWrapper}>
        <Image resizeMode="contain" style={styles.helmets} source={helmets} />
      </View>
      <View style={styles.actions}>
        <Button onPress={onClose}>
          <Text uppercase={false}>OK, I'm ready to go</Text>
        </Button>
      </View>
    </View>
  );
};

CheckoutSuccess.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default CheckoutSuccess;