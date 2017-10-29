import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { StyleSheet, Alert } from 'react-native';
import { BarCodeScanner } from 'expo';
import { View, Button, Text, Icon } from 'native-base';

import { askForCameraPermission as askForCameraPermissionAction } from 'BikeShare/redux/actions/permissionActions';
import permissionSelectors from 'BikeShare/selectors/permissionSelectors';

const {
  cameraPermissionGranted: cameraPermissionGrantedSelector,
  cameraPermissionPending: cameraPermissionPendingSelector
} = permissionSelectors;

const QR_BARCODE_TYPE = BarCodeScanner.Constants.BarCodeType.qr;

class QRScanner extends React.Component {
  static propTypes = {
    askForCameraPermission: PropTypes.func,
    cameraPermissionGranted: PropTypes.bool,
    cameraPermissionPending: PropTypes.bool,
    handleQRCodeScan: PropTypes.func
  }

  static defaultProps = {
    handleQRCodeScan: () => null
  }

  constructor(props, defaultProps) {
    super(props, defaultProps);
    this.state = {
      torchActive: false
    };
    this.handleBarCodeRead = this.handleBarCodeRead.bind(this);
    this.toggleTorch = this.toggleTorch.bind(this);
  }

  componentDidMount() {
    const { askForCameraPermission } = this.props;
    askForCameraPermission();
  }

  handleBarCodeRead({ data }) {
    const { handleQRCodeScan } = this.props;
    Alert.alert(
      'QR code read',
      data
    );
    handleQRCodeScan(data);
  }

  toggleTorch() {
    const { torchActive } = this.state;
    this.setState({
      torchActive: !torchActive
    });
  }

  renderBarcodeScanner() {
    const { torchActive } = this.state;
    return (
      <View style={StyleSheet.absoluteFill}>
        <BarCodeScanner
          barCodeTypes={[QR_BARCODE_TYPE]}
          onBarCodeRead={this.handleBarCodeRead}
          style={StyleSheet.absoluteFill}
          torchMode={torchActive ? 'on' : 'off'}
        />
        <Button
          bordered={true}
          light={true}
          active={false}
          onPress={this.toggleTorch}
          style={{ position: 'absolute', bottom: 10, right: 10 }}
        >
          <Icon name="md-flash" />
          <Text>Torch</Text>
        </Button>
      </View>
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

export default connect(mapStateToProps, {
  askForCameraPermission: askForCameraPermissionAction
})(QRScanner);
