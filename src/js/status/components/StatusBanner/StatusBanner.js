import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text } from 'native-base';

import SystemStatus from '../../records/SystemStatus';
import fetchSystemStatusAction from '../../actions/fetchSystemStatus';
import styles from './StatusBarStyles';

class StatusBanner extends React.Component {
  static propTypes = {
    systemStatus: PropTypes.instanceOf(SystemStatus),
    fetchSystemStatus: PropTypes.func,
  };

  componentWillMount() {
    const { fetchSystemStatus } = this.props;
    fetchSystemStatus();
  }

  renderClosedCheckOutBanner() {
    const { systemStatus } = this.props;

    const showBanner = !systemStatus.ALLOW_CHECKOUT;
    if (!showBanner) return null;

    const statusText = systemStatus.CHECKOUT_DISALLOWED_MESSAGE;
    return (
      <View style={[styles.banner, { backgroundColor: '#ff4e00' }]}>
        <Text style={styles.bannerText}>{statusText}</Text>
      </View>
    );
  }

  renderMaintenanceBanner() {
    const { systemStatus } = this.props;

    const showBanner = systemStatus.MAINTENANCE_MODE;
    if (!showBanner) return null;

    const statusText = systemStatus.MAINTENANCE_MESSAGE;
    return (
      <View style={[styles.banner, { backgroundColor: '#f5bd00' }]}>
        <Text style={styles.bannerText}>{statusText}</Text>
      </View>
    );
  }

  render() {
    return (
      <View>
        {this.renderMaintenanceBanner()}
        {this.renderClosedCheckOutBanner()}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  systemStatus: state.systemStatus,
});

export default connect(mapStateToProps, {
  fetchSystemStatus: fetchSystemStatusAction,
})(StatusBanner);
