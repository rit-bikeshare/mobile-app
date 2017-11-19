import React from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, Modal } from 'react-native';
import { Container, View, Button, Text } from 'native-base';
import { connect } from 'react-redux';

import { goBack as goBackAction } from 'react-router-redux';

import {
  getBikeCheckoutStatus as getBikeCheckoutStatusSelector,
  getBikeCheckoutError as getBikeCheckoutErrorSelector
} from 'BikeShare/selectors/bikeSelectors';

import { checkoutBike as checkoutBikeAction } from 'BikeShare/redux/actions/bikeActions';

import QRScanner from 'BikeShare/components/scanner/QRScanner';
import ErrorView from 'BikeShare/components/error/ErrorView';
import CheckoutSuccess from 'BikeShare/components/CheckoutSuccess';

import RequestStatus from 'BikeShare/constants/RequestStatus';
import parseDeepLink from 'BikeShare/utils/parseDeepLink';

const {
  UNINITIALIZED,
  PENDING,
  FAILED,
  SUCCESS
} = RequestStatus;

class CheckoutContainer extends React.Component {
  static propTypes = {
    bikeCheckoutStatus: PropTypes.oneOf(Object.keys(RequestStatus)),
    bikeCheckoutError: PropTypes.string,
    checkoutBike: PropTypes.func,
    goBack: PropTypes.func
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
    const { bikeCheckoutStatus } = this.props;
    if (bikeCheckoutStatus === UNINITIALIZED) {
      this.setState({
        qrScannerVisible: true
      });
    }
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

  renderQRScanner() {
    const { goBack } = this.props;
    const { qrScannerVisible } = this.state;
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={qrScannerVisible}
        onRequestClose={goBack}
      >
        <QRScanner onQRCodeScan={this.handleQRCodeScan} onClose={goBack} />
      </Modal>
    );
  }

  renderContent() {
    const { bikeCheckoutError, bikeCheckoutStatus } = this.props;

    if (bikeCheckoutStatus === PENDING) {
      return (
        <View>
          <ActivityIndicator />
          <Text>Checking Bike Out...</Text>
        </View>
      );
    }

    if (bikeCheckoutStatus === FAILED) {
      return (
        <View>
          <ErrorView title="Error Checking Out Bike" subText={bikeCheckoutError} />
          <Button onPress={this.openQRScanner}>
            <Text>Rescan</Text>
          </Button>
        </View>
      );
    }

    if (bikeCheckoutStatus === SUCCESS) {
      return (
        <CheckoutSuccess />
      );
    }

    return <View />;
  }

  render() {
    return (
      <Container>
        {this.renderQRScanner()}
        {this.renderContent()}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  bikeCheckoutStatus: getBikeCheckoutStatusSelector(state),
  bikeCheckoutError: getBikeCheckoutErrorSelector(state)
});

const actions = {
  checkoutBike: checkoutBikeAction,
  goBack: goBackAction
};

export default connect(mapStateToProps, actions)(CheckoutContainer);
