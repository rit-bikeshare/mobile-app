import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { View, Button, Text } from 'native-base';
import { connect } from 'react-redux';

import {
  getCheckInStatus as getCheckInStatusSelector,
  getCheckInError as getCheckInErrorSelector,
} from 'BikeShare/check-in/selectors/checkInStatusSelectors';
import { getBikeRackNameMap as getBikeRackNameMapSelector } from 'BikeShare/bike-rack/selectors/bikeRackSelectors';
import getRentalBikeId from 'BikeShare/rental/selectors/getRentalBikeId';
import {
  checkInCurrentRentalByLocation as checkInCurrentRentalByLocationAction,
  checkInCurrentRentalByBikeRack as checkInCurrentRentalByBikeRackAction,
  clearCheckInStatus as clearCheckInStatusAction,
} from 'BikeShare/check-in/actions/checkInActions';

import { QRScanner, ManualInputModal } from 'BikeShare/scanner';
import { ErrorView } from 'BikeShare/status';

import RequestStatus from 'BikeShare/api/constants/RequestStatus';
import parseQRData from 'BikeShare/utils/parseQRData';
import { reportDamage } from 'BikeShare/constants/urls';

import CheckInSuccess from '../CheckInSuccess';
import style from './CheckInStyles';
import { LoadingView } from 'BikeShare/status';

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
    currentRentalId: PropTypes.number,
    history: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      qrScannerVisible: false,
      manualInputOpen: false,
      checkedInBikeId: null,
    };

    this.handleQRCodeScan = this.handleQRCodeScan.bind(this);
    this.openQRScanner = this.openQRScanner.bind(this);
    this.handleManualCheckoutSubmit = this.handleManualCheckoutSubmit.bind(
      this
    );
    this.openManualCheckout = this.openManualCheckout.bind(this);
    this.closeManualCheckout = this.closeManualCheckout.bind(this);
    this.retryScan = this.retryScan.bind(this);
    this.reportDamage = this.reportDamage.bind(this);
  }

  componentWillMount() {
    const { checkInCurrentRentalByLocation } = this.props;
    checkInCurrentRentalByLocation();
  }

  componentWillUnmount() {
    const { clearCheckInStatus } = this.props;
    clearCheckInStatus();
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

  checkBikeIn(bikerackId) {
    const { checkInCurrentRentalByBikeRack, currentRentalId } = this.props;
    this.setState({
      checkedInBikeId: currentRentalId,
    });
    checkInCurrentRentalByBikeRack(bikerackId);
  }

  handleManualCheckoutSubmit(bikerackId) {
    this.checkBikeIn(bikerackId);
    this.setState({
      manualInputOpen: false,
    });
  }

  handleQRCodeScan(data) {
    const [action, bikerackId] = parseQRData(data);
    if (action === 'check-in') {
      this.checkBikeIn(bikerackId);
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

  reportDamage() {
    const { checkedInBikeId } = this.state;
    const { history } = this.props;
    history.push(`${reportDamage}?bikeId=${checkedInBikeId}`);
  }

  renderStatusMessage() {
    const {
      checkInCurrentRentalByLocation,
      bikeCheckInError,
      bikeCheckInStatus,
      onClose,
    } = this.props;

    if (bikeCheckInStatus === PENDING) {
      return <LoadingView text="Checking Bike In..." />;
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
      return (
        <CheckInSuccess onClose={onClose} reportDamage={this.reportDamage} />
      );
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
  currentRentalId: getRentalBikeId(state),
});

const actions = {
  checkInCurrentRentalByLocation: checkInCurrentRentalByLocationAction,
  checkInCurrentRentalByBikeRack: checkInCurrentRentalByBikeRackAction,
  clearCheckInStatus: clearCheckInStatusAction,
};

export default connect(mapStateToProps, actions)(CheckinContainer);
