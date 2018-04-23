/* eslint-disable react/no-unescaped-entities */

import React from 'react';
import { getIn } from '@hs/transmute';
import { List } from 'immutable';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Text, View, Button, H2, Icon } from 'native-base';

import styles from './CheckOutSuccessStyles';

class CheckoutSuccess extends React.Component {
  static propTypes = {
    onClose: PropTypes.func,
    damageReports: PropTypes.instanceOf(List),
    acknowlegeReports: PropTypes.func,
  };

  renderReportItem(text, value) {
    return (
      <View key={text} style={{ paddingBottom: 12 }}>
        <H2 style={{ paddingBottom: 4 }}>{text}</H2>
        <Text>{value}</Text>
      </View>
    );
  }

  renderDamageReport(report) {
    const { damageType, comments, critical, id } = report;
    const iconName = critical ? 'cancel' : 'check';
    const iconColor = critical ? 'red' : 'green';
    const criticalIcon = (
      <Icon
        style={{ color: iconColor }}
        name={iconName}
        type="MaterialCommunityIcons"
      />
    );
    return (
      <View key={id}>
        {this.renderReportItem('Damage Type', damageType)}
        {this.renderReportItem('Comments', comments)}
        {this.renderReportItem('Bike can function', criticalIcon)}
      </View>
    );
  }

  renderReports() {
    const { damageReports } = this.props;

    return damageReports.map(report => this.renderDamageReport(report));
  }

  render() {
    const { onClose, acknowlegeReports } = this.props;
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
        <View>{this.renderReports()}</View>
        <View style={styles.actions}>
          <Button onPress={onClose} transparent={true}>
            <Text uppercase={false}>Close</Text>
          </Button>
          <Button onPress={acknowlegeReports}>
            <Text uppercase={false}>Acknowledge and Unlock</Text>
          </Button>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  damageReports: getIn(['maintenance', 'damageLookup', 'reports'], state),
});

export default connect(mapStateToProps, {
  acknowlegeReports: () => null,
})(CheckoutSuccess);
