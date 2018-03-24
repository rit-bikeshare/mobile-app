import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Text, View, Icon } from 'native-base';

import BikeRental, { isCurrentlyRented } from '../../records/BikeRental';

import styles from './BikeRentalActions';

import 'moment-duration-format';

class BikeRentalActions extends React.Component {
  static propTypes = {
    checkOutBike: PropTypes.func,
    checkInBike: PropTypes.func,
    currentRental: PropTypes.instanceOf(BikeRental),
    style: PropTypes.number,
  };

  renderCheckoutButton() {
    const { checkOutBike } = this.props;
    return (
      <Button style={styles.checkoutButton} onPress={checkOutBike}>
        <Icon name="qrcode" iconFamily="MaterialCommunityIcons" />
        <Text style={styles.checkoutText} uppercase={false}>
          Check out
        </Text>
      </Button>
    );
  }

  renderCheckedOutView() {
    const { checkInBike } = this.props;
    return (
      <Button style={styles.checkoutButton} onPress={checkInBike}>
        <Icon name="map-marker" type="MaterialCommunityIcons" />
        <Text style={styles.checkoutText} uppercase={false}>
          Return
        </Text>
      </Button>
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
    const { style } = this.props;
    return <View style={style}>{this.renderContent()}</View>;
  }
}

const mapStateToProps = state => ({
  currentRental: state.currentRental,
});

export default connect(mapStateToProps, {})(BikeRentalActions);