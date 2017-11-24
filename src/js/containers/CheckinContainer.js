import React from 'react';
import PropTypes from 'prop-types';
import { Platform, ActivityIndicator } from 'react-native';
import { View, Button, Text } from 'native-base';
import { connect } from 'react-redux';
import { BlurView } from 'expo';

import {
  getBikeCheckinStatus as getBikeCheckinStatusSelector,
  getBikeCheckinError as getBikeCheckinErrorSelector
} from 'BikeShare/selectors/bikeSelectors';

import { checkinBike as checkinBikeAction } from 'BikeShare/redux/actions/bikeActions';

import QRScanner from 'BikeShare/components/scanner/QRScanner';
import ErrorView from 'BikeShare/components/status/ErrorView';
import CheckoutSuccess from 'BikeShare/components/status/CheckoutSuccess';

import RequestStatus from 'BikeShare/constants/RequestStatus';
import parseDeepLink from 'BikeShare/utils/parseDeepLink';

const {
  UNINITIALIZED,
  PENDING,
  FAILED,
  SUCCESS
} = RequestStatus;

class CheckinContainer extends React.Component {
  static propTypes = {
    bikeCheckinStatus: PropTypes.oneOf(Object.keys(RequestStatus)),
    bikeCheckinError: PropTypes.string,
    checkinBike: PropTypes.func,
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
    const { bikeCheckinStatus } = this.props;
    if (bikeCheckinStatus === UNINITIALIZED) {
      this.setState({
        qrScannerVisible: true
      });
    }
  }

  handleQRCodeScan(data) {
    const { checkinBike } = this.props;
    const [action, bikeId] = parseDeepLink(data);
    if (action === 'check-out') {
      checkinBike(bikeId);
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

  renderQRScanner() {
    const { onClose } = this.props;
    const { qrScannerVisible } = this.state;

    if (!qrScannerVisible) {
      return null;
    }

    return <QRScanner onQRCodeScan={this.handleQRCodeScan} onClose={onClose} />;
  }

  renderContent() {
    const { bikeCheckinError, bikeCheckinStatus } = this.props;

    if (bikeCheckinStatus === PENDING) {
      return (
        <View>
          <ActivityIndicator />
          <Text>Checking Bike Out...</Text>
        </View>
      );
    }

    if (bikeCheckinStatus === FAILED) {
      return (
        <View>
          <ErrorView title="Error Checking Out Bike" subText={bikeCheckinError} />
          <Button onPress={this.openQRScanner}>
            <Text>Rescan</Text>
          </Button>
        </View>
      );
    }

    if (bikeCheckinStatus === SUCCESS) {
      return (
        <CheckoutSuccess />
      );
    }

    return (
      <View
        style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent', height: '100%' }}
      >
        <ActivityIndicator size={(Platform.OS === 'ios') ? 'large' : 100} />
        <Text style={{ fontSize: 25, paddingTop: 10 }}>Loading</Text>
      </View>
    );
  }

  render() {
    return (
      <BlurView
        intensity={100}
        style={{ height: '100%' }}
      >
        {/* {this.renderQRScanner()} */}
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
  checkinBike: checkinBikeAction
};

export default connect(mapStateToProps, actions)(CheckinContainer);
