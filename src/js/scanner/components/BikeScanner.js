import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'native-base';

import { QRScanner, ManualInputModal } from 'BikeShare/scanner';

import parseDeepLink from 'BikeShare/utils/parseDeepLink';

const containerStyles = {
  position: 'relative',
  height: '100%',
  backgroundColor: '#fff',
};
class BikeScanner extends React.Component {
  static propTypes = {
    onClose: PropTypes.func,
    onSubmit: PropTypes.func,
    manualEntryText: PropTypes.string,
    manualEntryButtonText: PropTypes.string,
    manualEntryHeaderText: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      manualInputOpen: false,
    };

    this.handleQRCodeScan = this.handleQRCodeScan.bind(this);
    this.handleManualCheckoutSubmit = this.handleManualCheckoutSubmit.bind(
      this
    );

    this.openManualCheckout = this.openManualCheckout.bind(this);
    this.closeManualCheckout = this.closeManualCheckout.bind(this);
  }

  closeManualCheckout() {
    this.openQRScanner();
    this.setState({
      manualInputOpen: false,
    });
  }

  openManualCheckout() {
    this.setState({
      manualInputOpen: true,
    });
  }

  handleManualCheckoutSubmit(bikeId) {
    const { onSubmit } = this.props;

    this.setState({
      manualInputOpen: false,
    });
    onSubmit(bikeId);
  }

  handleQRCodeScan(data) {
    const { onSubmit } = this.props;
    const [action, bikeId] = parseDeepLink(data);
    if (action === 'check-out') {
      onSubmit(bikeId);
    }
  }

  renderContent() {
    const {
      onClose,
      manualEntryText,
      manualEntryButtonText,
      manualEntryHeaderText,
    } = this.props;
    const { manualInputOpen } = this.state;

    if (manualInputOpen) {
      return (
        <ManualInputModal
          open={manualInputOpen}
          onClose={this.closeManualCheckout}
          text={manualEntryText}
          placeholder="Bike ID"
          buttonText={manualEntryButtonText}
          headerText={manualEntryHeaderText}
          onSubmit={this.handleManualCheckoutSubmit}
        />
      );
    }

    return (
      <QRScanner
        onQRCodeScan={this.handleQRCodeScan}
        onClickManualSubmit={this.openManualCheckout}
        onClose={onClose}
      />
    );
  }

  render() {
    return <View style={containerStyles}>{this.renderContent()}</View>;
  }
}

BikeScanner.defaultProps = {
  manualEntryText: 'The bike ID is listed under the QR code on the bike',
  manualEntryButtonText: 'Check-out',
  manualEntryHeaderText: 'Manual Check-Out',
};

export default BikeScanner;
