import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { List } from 'immutable';
import { connect } from 'react-redux';
import { getIn } from '@hs/transmute';
import { FlatList, ScrollView } from 'react-native';
import { View, Button, Icon, Title, Text, H2, H1 } from 'native-base';

import ListDivider from 'BikeShare/lib/components/ListDivider';
import adminLockBikeAction from 'BikeShare/lock/actions/adminLockBike';
import adminUnlockBikeAction from 'BikeShare/lock/actions/adminUnlockBike';

import styles from './MaintenanceDetailViewStyles';
import ackBikeDamageAction from '../../actions/ackBikeDamage';

class MaintenanceDeailView extends React.Component {
  static propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
    damageReports: PropTypes.instanceOf(List),
    unlockBike: PropTypes.func,
    lockBike: PropTypes.func,
    acknowlegeReports: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
  }

  goBack() {
    const { history } = this.props;
    history.goBack();
  }

  getBikeId() {
    const { location: { search } } = this.props;
    const { bike } = queryString.parse(search);
    return bike;
  }

  renderReportItem(text, value) {
    return (
      <View key={text} style={{ paddingBottom: 12 }}>
        <Text style={{ paddingBottom: 4, fontWeight: '500' }}>{text}</Text>
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
        {this.renderReportItem('ID', id)}
        {this.renderReportItem('Damage Type', damageType)}
        {this.renderReportItem('Comments', comments)}
        {this.renderReportItem('Bike can function', criticalIcon)}
      </View>
    );
  }

  renderOpenDamageReports() {
    const { damageReports } = this.props;
    const openReports = damageReports.filter(report => !report.acknowleged);

    if (openReports.size === 0) return null;

    return (
      <View>
        <H2>Open Reports</H2>
        <FlatList
          style={{ paddingLeft: 12, paddingRight: 12 }}
          data={openReports.toJS()}
          renderItem={({ item }) => this.renderDamageReport(item)}
          ItemSeparatorComponent={ListDivider}
          keyExtractor={item => `${item.id}`}
        />
      </View>
    );
  }

  renderAckedDamageReports() {
    const { damageReports } = this.props;
    const ackedReports = damageReports.filter(report => report.acknowleged);

    if (ackedReports.size === 0) return null;

    return (
      <View>
        <H2>Acked Reports</H2>
        <FlatList
          style={{ paddingLeft: 12, paddingRight: 12 }}
          data={ackedReports.toJS()}
          renderItem={({ item }) => this.renderDamageReport(item)}
          ItemSeparatorComponent={ListDivider}
          keyExtractor={item => `${item.id}`}
        />
      </View>
    );
  }

  renderZeroState() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <H1>All is Good</H1>
        <Text>There are no damage reports for this bike</Text>
      </View>
    );
  }

  renderReports() {
    const { damageReports } = this.props;

    if (damageReports.size === 0) {
      return this.renderZeroState();
    }

    return (
      <ScrollView>
        {this.renderOpenDamageReports()}
        {this.renderAckedDamageReports()}
      </ScrollView>
    );
  }

  renderAckButton() {
    const { damageReports, acknowlegeReports } = this.props;
    if (damageReports.size === 0) return null;

    return (
      <Button onPress={acknowlegeReports} style={styles.button}>
        <Text style={styles.buttonText}>Ack reports</Text>
      </Button>
    );
  }

  renderActions(bikeId) {
    const { unlockBike, lockBike } = this.props;
    const unlock = () => unlockBike(bikeId);
    const lock = () => lockBike(bikeId);

    return (
      <View style={styles.buttonWrapper}>
        <Button onPress={unlock} style={styles.button}>
          <Text style={styles.buttonText}>Unlock</Text>
        </Button>
        <Button onPress={lock} style={styles.button}>
          <Text style={styles.buttonText}>Lock</Text>
        </Button>
        {this.renderAckButton()}
      </View>
    );
  }

  render() {
    const bikeId = this.getBikeId();
    return (
      <View
        style={{
          backgroundColor: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
        }}
      >
        <View
          style={{
            backgroundColor: '#F36E1F',
            flexDirection: 'row',
            alignItems: 'center',
            paddingTop: 5,
            paddingBottom: 5,
          }}
        >
          <Button transparent light onPress={this.goBack}>
            <Icon name="arrow-back" />
          </Button>
          <Title style={{ paddingLeft: 10 }}>Bike #{bikeId} info</Title>
        </View>
        <View
          style={{
            flex: 1,
            paddingLeft: 12,
            paddingRight: 12,
            paddingTop: 12,
            paddingBottom: 20,
          }}
        >
          {this.renderReports()}
          {this.renderActions(bikeId)}
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  damageReports: getIn(
    ['maintenance', 'damageLookup', 'reports'],
    state
  ).toList(),
});

export default connect(mapStateToProps, {
  acknowlegeReports: ackBikeDamageAction,
  lockBike: adminLockBikeAction,
  unlockBike: adminUnlockBikeAction,
})(MaintenanceDeailView);
