import React from 'react';
import PropTypes from 'prop-types';
import { Platform, ActivityIndicator } from 'react-native';
import { View, Button, Text } from 'native-base';
import { connect } from 'react-redux';
import BlurView from 'BikeShare/components/lib/BlurView';

import {
  getBikeCheckinStatus as getBikeCheckinStatusSelector,
  getBikeCheckinError as getBikeCheckinErrorSelector
} from 'BikeShare/selectors/bikeSelectors';

import {
  checkinCurrentBikeByLocation as checkinCurrentBikeByLocationAction,
  checkinCurrentBikeByBikeRack as checkinCurrentBikeByBikeRackAction
} from 'BikeShare/redux/actions/bikeActions';

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

class CheckinContainer extends React.Component {
  static propTypes = {
    bikeCheckinStatus: PropTypes.oneOf(Object.keys(RequestStatus)),
    bikeCheckinError: PropTypes.string,
    onClose: PropTypes.func,
    checkinCurrentBikeByLocation: PropTypes.func,
    checkinCurrentBikeByBikeRack: PropTypes.func,
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
    const { checkinCurrentBikeByLocation } = this.props;
    checkinCurrentBikeByLocation();
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
    const { bikeCheckinError, bikeCheckinStatus, onClose } = this.props;
    if (bikeCheckinStatus === PENDING) {
      return (
        <View style={style.statusWrapper}>
          <ActivityIndicator size={(Platform.OS === 'ios') ? 'large' : 100} />
          <Text style={style.statusText}>Checking Bike In...</Text>
        </View>
      );
    }

    if (bikeCheckinStatus === FAILED) {
      return (
        <View style={style.statusWrapper}>
          <ErrorView title="Error Checking In Bike" subText={bikeCheckinError} onClose={onClose} />
          <Button style={style.rescanButton} onPress={this.openQRScanner}>
            <Text uppercase={false}>Check in with QR Code</Text>
          </Button>
        </View>
      );
    }

    return (
      <CheckoutSuccess />
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
      <BlurView
        tint="light"
        intensity={80}
        style={{ height: '100%' }}
      >
        {this.renderContent()}
      </BlurView>
    );
  }
}

const mapStateToProps = state => ({
  bikeCheckinStatus: getBikeCheckinStatusSelector(state),
  bikeCheckinError: getBikeCheckinErrorSelector(state)
});

const actions = {
  checkinCurrentBikeByLocation: checkinCurrentBikeByLocationAction,
  checkinCurrentBikeByBikeRack: checkinCurrentBikeByBikeRackAction
};

export default connect(mapStateToProps, actions)(CheckinContainer);
