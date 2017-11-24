/* eslint-disable react/no-unescaped-entities */

import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, Button, H2, H1 } from 'native-base';
import styles from 'BikeShare/styles/checkoutSuccess';
import Icon from 'BikeShare/components/lib/Icon';

const CheckinSuccess = ({ onClose, reportDamage }) => {
  return (
    <View style={styles.container}>
      <Button
        transparent={true}
        dark={true}
        onPress={onClose}
        style={styles.backButton}
      >
        <Icon name="close" iconFamily="MaterialCommunityIcons" style={{ fontSize: 30 }} />
      </Button>
      <View style={styles.paddedView}>
        <View style={styles.icon}>
          <Icon name="md-checkmark-circle-outline" style={styles.checkmark} />
          <H1 style={styles.iconHeader}>Success</H1>
        </View>
        <H2 style={styles.header}>Before you go</H2>
        <Text style={{ textAlign: 'center', paddingBottom: 32 }}>
          Please read through the information below.
        </Text>
        <H2 style={styles.header}>Bike Damage</H2>
        <Text style={{ textAlign: 'center', paddingBottom: 24 }}>
          Inspect the bike for any damage that may have occured during your trip.
          If there is any, please report it with the "Report Damage" button below.
        </Text>
      </View>
      <View style={styles.actions}>
        <Button onPress={reportDamage} transparent={true}>
          <Text uppercase={false}>Report Damage</Text>
        </Button>
        <Button onPress={onClose} style={{ marginLeft: 12 }}>
          <Text uppercase={false}>OK, Looks good</Text>
        </Button>
      </View>
    </View>
  );
};

CheckinSuccess.propTypes = {
  onClose: PropTypes.func.isRequired,
  reportDamage: PropTypes.func.isRequired
};

export default CheckinSuccess;
