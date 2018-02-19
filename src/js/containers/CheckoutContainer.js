import React from 'react';
import PropTypes from 'prop-types';
import { Platform, ActivityIndicator } from 'react-native';
import { View, Button, Text } from 'native-base';
import { connect } from 'react-redux';

import {
  getBikeCheckoutStatus as getBikeCheckoutStatusSelector,
  getBikeCheckoutError as getBikeCheckoutErrorSelector
} from 'BikeShare/selectors/bikeSelectors';

import {
  checkoutBike as checkoutBikeAction,
  clearCheckoutStatus as clearCheckoutStatusAction
} from 'BikeShare/redux/actions/bikeActions';

import QRScanner from 'BikeShare/components/scanner/QRScanner';
import ErrorView from 'BikeShare/components/status/ErrorView';
import CheckoutSuccess from 'BikeShare/components/status/CheckoutSuccess';
import ManualInputModal from 'BikeShare/components/scanner/ManualInputModal';

import RequestStatus from 'BikeShare/constants/RequestStatus';
import parseDeepLink from 'BikeShare/utils/parseDeepLink';
import style from 'BikeShare/styles/checkout';

const { PENDING, FAILED, SUCCESS } = RequestStatus;

class CheckoutContainer extends React.Component {
  static propTypes = {
    bikeCheckoutStatus: PropTypes.oneOf(Object.keys(RequestStatus)),
    bikeCheckoutError: PropTypes.string,
    clearCheckoutStatus: PropTypes.func,
    checkoutBike: PropTypes.func,
    onClose: PropTypes.func
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
    this.setState({
      qrScannerVisible: true
    });
  }

  retryScan() {
    const { clearCheckoutStatus } = this.props;
    clearCheckoutStatus();
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

  handleManualCheckoutSubmit(bikeId) {
    const { checkoutBike } = this.props;

    this.setState({
      manualInputOpen: false
    });
    checkoutBike(bikeId);
  }

  handleQRCodeScan(data) {
    const { checkoutBike } = this.props;
    const [action, bikeId] = parseDeepLink(data);
    if (action === 'check-out') {
      checkoutBike(bikeId);
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
    const { bikeCheckoutError, bikeCheckoutStatus, onClose } = this.props;

    if (bikeCheckoutStatus === PENDING) {
      return (
        <View style={style.statusWrapper}>
          <ActivityIndicator size={Platform.OS === 'ios' ? 'large' : 100} />
          <Text style={style.statusText}>Checking Bike Out...</Text>
        </View>
      );
    }

    if (bikeCheckoutStatus === FAILED) {
      return (
        <View style={style.statusWrapper}>
          <ErrorView
            title="Error Checking Out Bike"
            subText={bikeCheckoutError}
            onClose={onClose}
          />
          <View style={style.actions}>
            <Button style={style.rescanButton} onPress={this.retryScan}>
              <Text>Rescan</Text>
            </Button>
          </View>
        </View>
      );
    }

    if (bikeCheckoutStatus === SUCCESS) {
      return <CheckoutSuccess onClose={onClose} />;
    }

    return null;
  }

  renderManualModal() {
    const { manualInputOpen } = this.state;

    return (
      <ManualInputModal
        open={manualInputOpen}
        onClose={this.closeManualCheckout}
        text="The bike id is listed under the QR code on the bike"
        placeholder="Bike Id"
        buttonText="Check-out"
        headerText="Manual Check-Out"
        onSubmit={this.handleManualCheckoutSubmit}
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
  bikeCheckoutStatus: getBikeCheckoutStatusSelector(state),
  bikeCheckoutError: getBikeCheckoutErrorSelector(state)
});

const actions = {
  checkoutBike: checkoutBikeAction,
  clearCheckoutStatus: clearCheckoutStatusAction
};

export default connect(mapStateToProps, actions)(CheckoutContainer);
