import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { Platform, ActivityIndicator } from 'react-native';
import { View, Button, Text } from 'native-base';
import { connect } from 'react-redux';

import {
  getCheckInStatus as getCheckInStatusSelector,
  getCheckInError as getCheckInErrorSelector,
} from 'BikeShare/check-in/selectors/checkInStatusSelectors';
import { getBikeRackNameMap as getBikeRackNameMapSelector } from 'BikeShare/bike-rack/selectors/bikeRackSelectors';
import {
  checkInCurrentRentalByLocation as checkInCurrentRentalByLocationAction,
  checkInCurrentRentalByBikeRack as checkInCurrentRentalByBikeRackAction,
  clearCheckInStatus as clearCheckInStatusAction,
} from 'BikeShare/check-in/actions/checkInActions';

import { QRScanner, ManualInputModal } from 'BikeShare/scanner';
import { ErrorView } from 'BikeShare/status';

import RequestStatus from 'BikeShare/api/constants/RequestStatus';
import parseDeepLink from 'BikeShare/utils/parseDeepLink';

import CheckInSuccess from '../CheckInSuccess';
import style from './CheckInStyles';

const { PENDING, FAILED, SUCCESS } = RequestStatus;

class CheckinContainer extends React.Component {
  static propTypes = {
    bikeCheckInStatus: PropTypes.oneOf(Object.keys(RequestStatus)),
    bikeCheckInError: PropTypes.string,
    clearCheckInStatus: PropTypes.func,
    onClose: PropTypes.func,
    checkInCurrentRentalByLocation: PropTypes.func,
    checkInCurrentRentalByBikeRack: PropTypes.func,
    bikeRacks: PropTypes.instanceOf(Map),
  };

  constructor(props) {
    super(props);
    this.state = {
      qrScannerVisible: false,
      manualInputOpen: false,
    };

    this.handleQRCodeScan = this.handleQRCodeScan.bind(this);
    this.openQRScanner = this.openQRScanner.bind(this);
    this.handleManualCheckoutSubmit = this.handleManualCheckoutSubmit.bind(
      this
    );
    this.openManualCheckout = this.openManualCheckout.bind(this);
    this.closeManualCheckout = this.closeManualCheckout.bind(this);
    this.retryScan = this.retryScan.bind(this);
  }

  componentWillMount() {
    const { checkInCurrentRentalByLocation } = this.props;
    checkInCurrentRentalByLocation();
  }

  retryScan() {
    const { clearCheckInStatus } = this.props;
    clearCheckInStatus();
    this.openQRScanner();
  }

  closeManualCheckout() {
    this.openQRScanner();
    this.setState({
      manualInputOpen: false,
    });
  }

  openManualCheckout() {
    this.closeQRScanner();
    this.setState({
      manualInputOpen: true,
    });
  }

  handleManualCheckoutSubmit(bikerackId) {
    const { checkInCurrentRentalByBikeRack } = this.props;

    this.setState({
      manualInputOpen: false,
    });
    checkInCurrentRentalByBikeRack(bikerackId);
  }

  handleQRCodeScan(data) {
    const { checkInCurrentRentalByBikeRack } = this.props;
    const [action, bikeRackId] = parseDeepLink(data);
    if (action === 'check-in') {
      checkInCurrentRentalByBikeRack(bikeRackId);
      this.closeQRScanner();
    }
  }

  closeQRScanner() {
    this.setState({
      qrScannerVisible: false,
    });
  }

  openQRScanner() {
    this.setState({
      qrScannerVisible: true,
    });
  }

  renderStatusMessage() {
    const {
      checkInCurrentRentalByLocation,
      bikeCheckInError,
      bikeCheckInStatus,
      onClose,
    } = this.props;

    if (bikeCheckInStatus === PENDING) {
      return (
        <View style={style.statusWrapper}>
          <ActivityIndicator size={Platform.OS === 'ios' ? 'large' : 100} />
          <Text style={style.statusText}>Checking Bike In...</Text>
        </View>
      );
    }

    if (bikeCheckInStatus === FAILED) {
      return (
        <View style={style.statusWrapper}>
          <ErrorView
            title="Error Checking In Bike"
            subText={bikeCheckInError}
            onClose={onClose}
          />
          <View style={style.actions}>
            <Button
              style={{ marginRight: 12 }}
              onPress={checkInCurrentRentalByLocation}
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

    if (bikeCheckInStatus === SUCCESS) {
      return <CheckInSuccess onClose={onClose} reportDamage={() => null} />;
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
  bikeCheckInStatus: getCheckInStatusSelector(state),
  bikeCheckInError: getCheckInErrorSelector(state),
  bikeRacks: getBikeRackNameMapSelector(state),
});

const actions = {
  checkInCurrentRentalByLocation: checkInCurrentRentalByLocationAction,
  checkInCurrentRentalByBikeRack: checkInCurrentRentalByBikeRackAction,
  clearCheckInStatus: clearCheckInStatusAction,
};

export default connect(mapStateToProps, actions)(CheckinContainer);
