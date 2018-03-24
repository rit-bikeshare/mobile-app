import React from 'react';
import PropTypes from 'prop-types';
import { Platform, ActivityIndicator } from 'react-native';
import { View, Button, Text } from 'native-base';
import { connect } from 'react-redux';

import { QRScanner, ManualInputModal } from 'BikeShare/scanner';
import { ErrorView } from 'BikeShare/status';

import RequestStatus from 'BikeShare/api/constants/RequestStatus';
import parseDeepLink from 'BikeShare/utils/parseDeepLink';

import {
  getCheckOutStatus as getCheckOutStatusSelector,
  getCheckOutError as getCheckOutErrorSelector,
} from '../../selectors/checkOutStatusSelectors';
import {
  checkOutBike as checkOutBikeAction,
  clearCheckOutStatus as clearCheckOutStatusAction,
} from '../../actions/checkOutActions';
import CheckoutSuccess from '../CheckOutSuccess';
import style from './CheckOutStyles';

const { PENDING, FAILED, SUCCESS } = RequestStatus;

class CheckoutContainer extends React.Component {
  static propTypes = {
    bikeCheckOutStatus: PropTypes.oneOf(Object.keys(RequestStatus)),
    bikeCheckOutError: PropTypes.string,
    clearCheckOutStatus: PropTypes.func,
    checkOutBike: PropTypes.func,
    onClose: PropTypes.func,
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
    this.setState({
      qrScannerVisible: true,
    });
  }

  retryScan() {
    const { clearCheckOutStatus } = this.props;
    clearCheckOutStatus();
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

  handleManualCheckoutSubmit(bikeId) {
    const { checkOutBike } = this.props;

    this.setState({
      manualInputOpen: false,
    });
    checkOutBike(bikeId);
  }

  handleQRCodeScan(data) {
    const { checkOutBike } = this.props;
    const [action, bikeId] = parseDeepLink(data);
    if (action === 'check-out') {
      checkOutBike(bikeId);
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
    const { bikeCheckOutError, bikeCheckOutStatus, onClose } = this.props;

    if (bikeCheckOutStatus === PENDING) {
      return (
        <View style={style.statusWrapper}>
          <ActivityIndicator size={Platform.OS === 'ios' ? 'large' : 100} />
          <Text style={style.statusText}>Checking Bike Out...</Text>
        </View>
      );
    }

    if (bikeCheckOutStatus === FAILED) {
      return (
        <View style={style.statusWrapper}>
          <ErrorView
            title="Error Checking Out Bike"
            subText={bikeCheckOutError}
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

    if (bikeCheckOutStatus === SUCCESS) {
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
  bikeCheckOutStatus: getCheckOutStatusSelector(state),
  bikeCheckOutError: getCheckOutErrorSelector(state),
});

const actions = {
  checkOutBike: checkOutBikeAction,
  clearCheckOutStatus: clearCheckOutStatusAction,
};

export default connect(mapStateToProps, actions)(CheckoutContainer);
