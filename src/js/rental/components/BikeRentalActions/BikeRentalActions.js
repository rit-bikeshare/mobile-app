import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Text, View, Icon } from 'native-base';

import getCheckOutAvailable from 'BikeShare/status/selectors/getCheckOutAvailable';
import BikeRental, { isCurrentlyRented } from '../../records/BikeRental';

import styles from './BikeRentalActionsStyles';

import 'moment-duration-format';
import BikeLockButton from './BikeLockButton';

class BikeRentalActions extends React.Component {
  static propTypes = {
    checkOutBike: PropTypes.func,
    checkInBike: PropTypes.func,
    currentRental: PropTypes.instanceOf(BikeRental),
    style: PropTypes.number,
    allowCheckout: PropTypes.bool,
  };

  renderCheckoutButton() {
    const { checkOutBike } = this.props;
    return (
      <Button style={styles.checkoutButton} onPress={checkOutBike}>
        <Icon name="qrcode" type="MaterialCommunityIcons" />
        <Text style={styles.checkoutText} uppercase={false}>
          Check out
        </Text>
      </Button>
    );
  }

  renderCheckedOutView() {
    const { checkInBike } = this.props;
    return (
      <View style={{ flexDirection: 'row' }}>
        <BikeLockButton style={{ marginRight: 8 }} />
        <Button style={styles.checkoutButton} onPress={checkInBike}>
          <Icon name="map-marker" type="MaterialCommunityIcons" />
          <Text style={styles.checkoutText} uppercase={false}>
            Return
          </Text>
        </Button>
      </View>
    );
  }

  renderContent() {
    const { currentRental } = this.props;
    if (isCurrentlyRented(currentRental)) {
      return this.renderCheckedOutView();
    }
    return this.renderCheckoutButton();
  }

  render() {
    const { style, allowCheckout } = this.props;

    if (!allowCheckout) return null;

    return (
      <View style={[style, styles.buttonWrapper]}>{this.renderContent()}</View>
    );
  }
}

const mapStateToProps = state => ({
  allowCheckout: getCheckOutAvailable(state),
  currentRental: state.currentRental,
});

export default connect(mapStateToProps, {})(BikeRentalActions);
