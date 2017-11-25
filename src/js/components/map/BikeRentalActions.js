import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Text, View } from 'native-base';

import { lockBike as lockBikeAction } from 'BikeShare/redux/actions/bikeActions';
import BikeRental, { isCurrentlyRented } from 'BikeShare/data/records/BikeRental';
import Icon from 'BikeShare/components/lib/Icon';
import styles from 'BikeShare/styles/bikeRentalActions';

import 'moment-duration-format';

class BikeRentalActions extends React.Component {
  static propTypes = {
    checkoutBike: PropTypes.func,
    checkinBike: PropTypes.func,
    currentBike: PropTypes.instanceOf(BikeRental),
    style: PropTypes.number
  }

  renderCheckoutButton() {
    const { checkoutBike } = this.props;
    return (
      <Button
        style={styles.checkoutButton}
        onPress={checkoutBike}
      >
        <Icon name="qrcode" iconFamily="MaterialCommunityIcons" />
        <Text style={styles.checkoutText} uppercase={false}>Check out</Text>
      </Button>
    );
  }

  renderCheckedOutView() {
    const { checkinBike } = this.props;
    return (
      <Button
        style={styles.checkoutButton}
        onPress={checkinBike}
      >
        <Icon name="map-marker" iconFamily="MaterialCommunityIcons" />
        <Text style={styles.checkoutText} uppercase={false}>Return</Text>
      </Button>
    );
  }

  renderContent() {
    const { currentBike } = this.props;
    if (isCurrentlyRented(currentBike)) {
      return this.renderCheckedOutView();
    }
    return this.renderCheckoutButton();
  }

  render() {
    const { style } = this.props;
    return (
      <View style={style}>
        {this.renderContent()}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  currentBike: state.currentBike
});

export default connect(mapStateToProps, {
  lockBike: lockBikeAction
})(BikeRentalActions);
