import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo';
import { Button, Text } from 'native-base';

import { askForCameraPermission as askForCameraPermissionAction } from 'BikeShare/redux/actions/permissionActions';
import permissionSelectors from 'BikeShare/selectors/permissionSelectors';

const {
  cameraPermissionGranted: cameraPermissionGrantedSelector,
  cameraPermissionPending: cameraPermissionPendingSelector
} = permissionSelectors;

const QR_BARCODE_TYPE = BarCodeScanner.Constants.BarCodeType.qr;

class BarcodeScanner extends React.Component {
  static propTypes = {
    askForCameraPermission: PropTypes.func,
    cameraPermissionGranted: PropTypes.bool,
    cameraPermissionPending: PropTypes.bool
  };

  componentWillMount() {
    const { askForCameraPermission } = this.props;
    askForCameraPermission();
  }

  renderBarcodeScanner() {
    return (
      <BarCodeScanner
        barCodeTypes={[QR_BARCODE_TYPE]}
        onBarCodeRead={this.handleBarCodeRead}
        style={StyleSheet.absoluteFill}
      />
    );
  }

  renderContent() {
    const {
      cameraPermissionGranted,
      cameraPermissionPending,
      askForCameraPermission
    } = this.props;

    if (cameraPermissionGranted) {
      return this.renderBarcodeScanner();
    }

    if (cameraPermissionPending) {
      return null;
    }

    return (
      <Button onPress={askForCameraPermission}>
        <Text>
          We need your permission to use the camera
        </Text>
      </Button>
    );
  }

  render() {
    return this.renderContent();
  }
}

const mapStateToProps = state => ({
  cameraPermissionPending: cameraPermissionPendingSelector(state),
  cameraPermissionGranted: cameraPermissionGrantedSelector(state)
});

const mapDispatchToProps = () => ({
  askForCameraPermission: askForCameraPermissionAction
});

export default connect(mapStateToProps, mapDispatchToProps)(BarcodeScanner);
