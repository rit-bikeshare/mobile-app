import React from 'react';
import PropTypes from 'prop-types';
import { Button, Text, View, Icon } from 'native-base';

import styles from './MaintenanceActionsStyles';

class MaintenanceActions extends React.Component {
  static propTypes = {
    checkOutBike: PropTypes.func,
    checkInBike: PropTypes.func,
    style: PropTypes.number,
  };

  renderCheckoutButton() {
    const { checkOutBike } = this.props;
    return (
      <Button
        style={[{ marginRight: 4 }, styles.checkoutButton]}
        onPress={checkOutBike}
      >
        <Icon name="qrcode" type="MaterialCommunityIcons" />
        <Text style={styles.checkoutText} uppercase={false}>
          Check bike
        </Text>
      </Button>
    );
  }

  renderCheckedInButton() {
    const { checkInBike } = this.props;
    return (
      <Button style={styles.checkoutButton} onPress={checkInBike}>
        <Icon name="map-marker" type="MaterialCommunityIcons" />
        <Text style={styles.checkoutText} uppercase={false}>
          Return to service
        </Text>
      </Button>
    );
  }

  render() {
    const { style } = this.props;
    return (
      <View style={[style, styles.buttonWrapper]}>
        {this.renderCheckoutButton()}
        {this.renderCheckedInButton()}
      </View>
    );
  }
}

export default MaintenanceActions;
