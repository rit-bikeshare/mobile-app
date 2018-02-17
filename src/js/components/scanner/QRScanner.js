import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo';
import { View, Button, Text, Container } from 'native-base';

import { askForCameraPermission as askForCameraPermissionAction } from 'BikeShare/redux/actions/permissionActions';
import permissionSelectors from 'BikeShare/selectors/permissionSelectors';
import Icon from 'BikeShare/components/lib/Icon';
import styles from 'BikeShare/styles/qrScanner';

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
    onQRCodeScan: PropTypes.func,
    onClose: PropTypes.func.isRequired
  }

  static defaultProps = {
    onQRCodeScan: () => null,
    onClose: () => null
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
    const { onQRCodeScan } = this.props;
    onQRCodeScan(data);
  }

  toggleTorch() {
    const { torchActive } = this.state;
    this.setState({
      torchActive: !torchActive
    });
  }

  renderTorchButton() {
    return (
      <Button
        bordered={true}
        light={true}
        onPress={this.toggleTorch}
        style={styles.torchButton}
      >
        <Icon name="md-flash" iconFamily="Ionicons" />
        <Text>Torch</Text>
      </Button>
    );
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
        {this.renderTorchButton()}
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
      return <View />;
    }

    return (
      <Button onPress={askForCameraPermission}>
        <Text>
          We need your permission to use the camera
        </Text>
      </Button>
    );
  }

  renderBackButton() {
    const { onClose } = this.props;
    return (
      <Button
        transparent={true}
        light={true}
        onPress={onClose}
        style={styles.closeButton}
      >
        <Icon name="close" iconFamily="MaterialCommunityIcons" style={{ fontSize: 30 }} />
      </Button>
    );
  }

  render() {
    return (
      <Container>
        {this.renderContent()}
        {this.renderBackButton()}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  cameraPermissionPending: cameraPermissionPendingSelector(state),
  cameraPermissionGranted: cameraPermissionGrantedSelector(state)
});

export default connect(mapStateToProps, {
  askForCameraPermission: askForCameraPermissionAction
})(QRScanner);
