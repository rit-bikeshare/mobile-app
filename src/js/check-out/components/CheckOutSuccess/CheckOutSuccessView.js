/* eslint-disable react/no-unescaped-entities */

import React from 'react';
import { Permissions } from 'expo';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import { Text, View, Button, H2, H1, Icon } from 'native-base';
import helmets from 'img/helmets.png';

import getCurrentRentalExpirationTime from 'BikeShare/rental/selectors/getCurrentRentalExpirationTime';
import scheduleNotificationAction from 'BikeShare/notifications/actions/scheduleNotification';
import { RENTAL_EXPIRATION_NOTIFICATION } from 'BikeShare/notifications/constants/notificationTypes';

import styles from './CheckOutSuccessStyles';

class CheckoutSuccess extends React.Component {
  static propTypes = {
    rentalExpirationTime: PropTypes.number,
    scheduleNotification: PropTypes.func,
    onClose: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
  }

  componentWillMount() {
    Permissions.askAsync(Permissions.NOTIFICATIONS);
  }

  handleClose() {
    const { onClose, scheduleNotification, rentalExpirationTime } = this.props;
    if (rentalExpirationTime) {
      const localNotification = {
        id: 'return-notification',
        title: 'Bike Overdue',
        body:
          "You've had your bike checked out for more than 24 hours. Please return it.",
      };
      scheduleNotification(
        RENTAL_EXPIRATION_NOTIFICATION,
        localNotification,
        rentalExpirationTime
      );
    }
    onClose();
  }

  render() {
    const { onClose } = this.props;
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
          <H2 style={styles.header}>Check out period</H2>
          <Text style={{ textAlign: 'center', paddingBottom: 24 }}>
            You must return the bike with-in 24 hours. We will send you a
            notification if you run over that time.
          </Text>
          <H2 style={styles.header}>Safety Tips</H2>
          <Text style={{ textAlign: 'center', paddingBottom: 24 }}>
            Follow the illustrations below on how to properly wear a bike
            helmet. If you have a helmet, wear it!
          </Text>
        </View>
        <View style={styles.helmetsWrapper}>
          <Image resizeMode="contain" style={styles.helmets} source={helmets} />
        </View>
        <View style={styles.actions}>
          <Button onPress={this.handleClose}>
            <Text uppercase={false}>OK, I'm ready to go</Text>
          </Button>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  rentalExpirationTime: getCurrentRentalExpirationTime(state),
});

export default connect(mapStateToProps, {
  scheduleNotification: scheduleNotificationAction,
})(CheckoutSuccess);
