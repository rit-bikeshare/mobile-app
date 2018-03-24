import React from 'react';
import PropTypes from 'prop-types';
import { BarCodeScanner } from 'expo';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
import { View, Button, Text, Container, Icon } from 'native-base';

import { askForCameraPermission as askForCameraPermissionAction } from 'BikeShare/permissions/actions/permissionActions';
import permissionSelectors from 'BikeShare/permissions/selectors/permissionSelectors';

import styles from './QRScannerStyles';

const {
  cameraPermissionGranted: cameraPermissionGrantedSelector,
  cameraPermissionPending: cameraPermissionPendingSelector,
} = permissionSelectors;

class QRScanner extends React.Component {
  static propTypes = {
    askForCameraPermission: PropTypes.func,
    cameraPermissionGranted: PropTypes.bool,
    cameraPermissionPending: PropTypes.bool,
    onQRCodeScan: PropTypes.func,
    onClose: PropTypes.func.isRequired,
    onClickManualSubmit: PropTypes.func,
  };

  static defaultProps = {
    onQRCodeScan: () => null,
    onClose: () => null,
  };

  constructor(props, defaultProps) {
    super(props, defaultProps);
    this.state = {
      torchActive: false,
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
      torchActive: !torchActive,
    });
  }

  renderTorchButton() {
    return (
      <Button bordered={true} light={true} onPress={this.toggleTorch}>
        <Icon name="md-flash" type="Ionicons" />
      </Button>
    );
  }

  renderManualCheckoutButton() {
    const { onClickManualSubmit } = this.props;

    if (typeof onClickManualSubmit !== 'function') return null;

    return (
      <Button
        bordered={true}
        light={true}
        onPress={onClickManualSubmit}
        style={{ marginRight: 12 }}
      >
        <Icon name="keyboard" type="MaterialIcons" />
      </Button>
    );
  }

  renderBarcodeScanner() {
    const { torchActive } = this.state;
    return (
      <View style={StyleSheet.absoluteFill}>
        <BarCodeScanner
          barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
          onBarCodeRead={this.handleBarCodeRead}
          style={StyleSheet.absoluteFill}
          torchMode={torchActive ? 'on' : 'off'}
        />
        <View style={styles.actions}>
          {this.renderManualCheckoutButton()}
          {this.renderTorchButton()}
        </View>
      </View>
    );
  }

  renderContent() {
    const {
      cameraPermissionGranted,
      cameraPermissionPending,
      askForCameraPermission,
    } = this.props;

    if (cameraPermissionGranted) {
      return this.renderBarcodeScanner();
    }

    if (cameraPermissionPending) {
      return <View />;
    }

    return (
      <Button onPress={askForCameraPermission}>
        <Text>We need your permission to use the camera</Text>
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
        <Icon
          name="close"
          type="MaterialCommunityIcons"
          style={{ fontSize: 30 }}
        />
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
  cameraPermissionGranted: cameraPermissionGrantedSelector(state),
});

export default connect(mapStateToProps, {
  askForCameraPermission: askForCameraPermissionAction,
})(QRScanner);
