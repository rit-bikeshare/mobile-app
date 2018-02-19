import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { Platform, ActivityIndicator } from 'react-native';
import { View, Button, Text } from 'native-base';
import { connect } from 'react-redux';

import {
  getBikeCheckinStatus as getBikeCheckinStatusSelector,
  getBikeCheckinError as getBikeCheckinErrorSelector
} from 'BikeShare/selectors/bikeSelectors';

import { getBikeRackNameMap as getBikeRackNameMapSelector } from 'BikeShare/selectors/bikeRackSelectors';

import {
  checkinCurrentBikeByLocation as checkinCurrentBikeByLocationAction,
  checkinCurrentBikeByBikeRack as checkinCurrentBikeByBikeRackAction,
  reportDamage as reportDamageAction,
  clearCheckinStatus as clearCheckinStatusAction
} from 'BikeShare/redux/actions/bikeActions';

import QRScanner from 'BikeShare/components/scanner/QRScanner';
import ErrorView from 'BikeShare/components/status/ErrorView';
import CheckinSuccess from 'BikeShare/components/status/CheckinSuccess';
import ManualInputModal from 'BikeShare/components/scanner/ManualInputModal';

import RequestStatus from 'BikeShare/constants/RequestStatus';
import parseDeepLink from 'BikeShare/utils/parseDeepLink';
import style from 'BikeShare/styles/checkout';

const { PENDING, FAILED, SUCCESS } = RequestStatus;

class CheckinContainer extends React.Component {
  static propTypes = {
    bikeCheckinStatus: PropTypes.oneOf(Object.keys(RequestStatus)),
    bikeCheckinError: PropTypes.string,
    clearCheckinStatus: PropTypes.func,
    onClose: PropTypes.func,
    checkinCurrentBikeByLocation: PropTypes.func,
    checkinCurrentBikeByBikeRack: PropTypes.func,
    reportDamage: PropTypes.func,
    bikeRacks: PropTypes.instanceOf(Map)
  };

  constructor(props) {
    super(props);
    this.state = {
      qrScannerVisible: false,
      manualInputOpen: false
    };

    this.handleQRCodeScan = this.handleQRCodeScan.bind(this);
    this.openQRScanner = this.openQRScanner.bind(this);
    this.handleManualCheckoutSubmit = this.handleManualCheckoutSubmit.bind(this);
    this.openManualCheckout = this.openManualCheckout.bind(this);
    this.closeManualCheckout = this.closeManualCheckout.bind(this);
    this.retryScan = this.retryScan.bind(this);
  }

  componentWillMount() {
    const { checkinCurrentBikeByLocation } = this.props;
    checkinCurrentBikeByLocation();
  }

  retryScan() {
    const { clearCheckinStatus } = this.props;
    clearCheckinStatus();
    this.openQRScanner();
  }

  closeManualCheckout() {
    this.openQRScanner();
    this.setState({
      manualInputOpen: false
    });
  }

  openManualCheckout() {
    this.closeQRScanner();
    this.setState({
      manualInputOpen: true
    });
  }

  handleManualCheckoutSubmit(bikerackId) {
    const { checkinCurrentBikeByBikeRack } = this.props;

    this.setState({
      manualInputOpen: false
    });
    checkinCurrentBikeByBikeRack(bikerackId);
  }

  handleQRCodeScan(data) {
    const { checkinCurrentBikeByBikeRack } = this.props;
    const [action, bikeRackId] = parseDeepLink(data);
    if (action === 'check-in') {
      checkinCurrentBikeByBikeRack(bikeRackId);
      this.closeQRScanner();
    }
  }

  closeQRScanner() {
    this.setState({
      qrScannerVisible: false
    });
  }

  openQRScanner() {
    this.setState({
      qrScannerVisible: true
    });
  }

  renderStatusMessage() {
    const {
      checkinCurrentBikeByLocation,
      bikeCheckinError,
      bikeCheckinStatus,
      onClose,
      reportDamage
    } = this.props;

    if (bikeCheckinStatus === PENDING) {
      return (
        <View style={style.statusWrapper}>
          <ActivityIndicator size={Platform.OS === 'ios' ? 'large' : 100} />
          <Text style={style.statusText}>Checking Bike In...</Text>
        </View>
      );
    }

    if (bikeCheckinStatus === FAILED) {
      return (
        <View style={style.statusWrapper}>
          <ErrorView title="Error Checking In Bike" subText={bikeCheckinError} onClose={onClose} />
          <View style={style.actions}>
            <Button
              style={{ marginRight: 12 }}
              onPress={checkinCurrentBikeByLocation}
              transparent={true}
            >
              <Text uppercase={false}>Retry</Text>
            </Button>
            <Button style={style.rescanButton} onPress={this.retryScan}>
              <Text uppercase={false}>Check in with QR code</Text>
            </Button>
          </View>
        </View>
      );
    }

    if (bikeCheckinStatus === SUCCESS) {
      return <CheckinSuccess onClose={onClose} reportDamage={reportDamage} />;
    }

    return null;
  }

  renderManualModal() {
    const { bikeRacks } = this.props;
    const { manualInputOpen } = this.state;

    return (
      <ManualInputModal
        open={manualInputOpen}
        onClose={this.closeManualCheckout}
        text="The bike-rack id is listed under the QR code on the rack"
        placeholder="Bike-rack Id"
        buttonText="Check-in"
        headerText="Manual Check-In"
        onSubmit={this.handleManualCheckoutSubmit}
        values={bikeRacks}
      />
    );
  }

  renderQRScanner() {
    const { onClose } = this.props;
    const { qrScannerVisible } = this.state;

    if (!qrScannerVisible) return null;

    return (
      <QRScanner
        onQRCodeScan={this.handleQRCodeScan}
        onClickManualSubmit={this.openManualCheckout}
        onClose={onClose}
      />
    );
  }

  render() {
    return (
      <View style={style.container}>
        {this.renderStatusMessage()}
        {this.renderQRScanner()}
        {this.renderManualModal()}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  bikeCheckinStatus: getBikeCheckinStatusSelector(state),
  bikeCheckinError: getBikeCheckinErrorSelector(state),
  bikeRacks: getBikeRackNameMapSelector(state)
});

const actions = {
  checkinCurrentBikeByLocation: checkinCurrentBikeByLocationAction,
  checkinCurrentBikeByBikeRack: checkinCurrentBikeByBikeRackAction,
  reportDamage: reportDamageAction,
  clearCheckinStatus: clearCheckinStatusAction
};

export default connect(mapStateToProps, actions)(CheckinContainer);
