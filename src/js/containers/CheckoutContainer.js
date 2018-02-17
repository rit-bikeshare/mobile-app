import React from 'react';
import PropTypes from 'prop-types';
import { Platform, ActivityIndicator } from 'react-native';
import { View, Button, Text } from 'native-base';
import { connect } from 'react-redux';

import {
  getBikeCheckoutStatus as getBikeCheckoutStatusSelector,
  getBikeCheckoutError as getBikeCheckoutErrorSelector
} from 'BikeShare/selectors/bikeSelectors';

import { checkoutBike as checkoutBikeAction } from 'BikeShare/redux/actions/bikeActions';

import QRScanner from 'BikeShare/components/scanner/QRScanner';
import ErrorView from 'BikeShare/components/status/ErrorView';
import CheckoutSuccess from 'BikeShare/components/status/CheckoutSuccess';

import RequestStatus from 'BikeShare/constants/RequestStatus';
import parseDeepLink from 'BikeShare/utils/parseDeepLink';
import style from 'BikeShare/styles/checkout';

const {
  PENDING,
  FAILED
} = RequestStatus;

class CheckoutContainer extends React.Component {
  static propTypes = {
    bikeCheckoutStatus: PropTypes.oneOf(Object.keys(RequestStatus)),
    bikeCheckoutError: PropTypes.string,
    checkoutBike: PropTypes.func,
    onClose: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {
      qrScannerVisible: false
    };

    this.handleQRCodeScan = this.handleQRCodeScan.bind(this);
    this.openQRScanner = this.openQRScanner.bind(this);
  }

  componentWillMount() {
    this.setState({
      qrScannerVisible: true
    });
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
          <ActivityIndicator size={(Platform.OS === 'ios') ? 'large' : 100} />
          <Text style={style.statusText}>Checking Bike Out...</Text>
        </View>
      );
    }

    if (bikeCheckoutStatus === FAILED) {
      return (
        <View style={style.statusWrapper}>
          <ErrorView title="Error Checking Out Bike" subText={bikeCheckoutError} onClose={onClose} />
          <Button style={style.rescanButton} onPress={this.openQRScanner}>
            <Text>Rescan</Text>
          </Button>
        </View>
      );
    }

    return (
      <CheckoutSuccess onClose={onClose} />
    );
  }

  renderContent() {
    const { onClose } = this.props;
    const { qrScannerVisible } = this.state;

    if (!qrScannerVisible) {
      return this.renderStatusMessage();
    }

    return <QRScanner onQRCodeScan={this.handleQRCodeScan} onClose={onClose} />;
  }

  render() {
    return (
      <View style={style.container}>
        {this.renderContent()}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  bikeCheckoutStatus: getBikeCheckoutStatusSelector(state),
  bikeCheckoutError: getBikeCheckoutErrorSelector(state)
});

const actions = {
  checkoutBike: checkoutBikeAction
};

export default connect(mapStateToProps, actions)(CheckoutContainer);
