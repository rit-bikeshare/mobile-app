import React from 'react';
import PropTypes from 'prop-types';
import { getIn } from '@hs/transmute';
import { View, Button, Text } from 'native-base';
import { connect } from 'react-redux';

import { BikeScanner } from 'BikeShare/scanner';
import { ErrorView } from 'BikeShare/status';

import RequestStatus from 'BikeShare/api/constants/RequestStatus';
import { LoadingView } from 'BikeShare/status';
import {
  lookUpBikeDamageAction,
  clearDamageLookupStatusAction,
} from 'BikeShare/maintenance/actions/damageLookupActions';
import style from './BikeLookupStyles';

const { PENDING, FAILED, SUCCESS } = RequestStatus;

class BikeLookupView extends React.Component {
  static propTypes = {
    damageLookupStatus: PropTypes.oneOf(Object.keys(RequestStatus)),
    damageLookupError: PropTypes.string,
    clearDamageLookupStatus: PropTypes.func,
    lookUpBikeDamage: PropTypes.func,
    onClose: PropTypes.func,
    history: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      scannerVisible: false,
      scannedBike: null,
    };

    this.openScanner = this.openScanner.bind(this);
    this.closeScanner = this.closeScanner.bind(this);
    this.retryScan = this.retryScan.bind(this);
    this.handleScan = this.handleScan.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentWillMount() {
    this.setState({
      scannerVisible: true,
    });
  }

  componentWillReceiveProps(nextProps) {
    const { damageLookupStatus, history } = nextProps;
    const { scannedBike } = this.state;

    if (damageLookupStatus === SUCCESS) {
      history.push(`/maintenance/?bike=${scannedBike}`);
      this.handleClose();
    }
  }

  retryScan() {
    const { clearDamageLookupStatus } = this.props;
    clearDamageLookupStatus();
    this.openScanner();
  }

  closeScanner() {
    this.setState({
      scannerVisible: false,
    });
  }

  openScanner() {
    this.setState({
      scannerVisible: true,
    });
  }

  handleScan(bikeId) {
    const { lookUpBikeDamage } = this.props;
    this.closeScanner();
    this.setState({
      scannedBike: bikeId,
    });
    lookUpBikeDamage(bikeId);
  }

  handleClose() {
    const { clearDamageLookupStatus, onClose } = this.props;
    clearDamageLookupStatus();
    onClose();
  }

  renderContent() {
    const { damageLookupError, damageLookupStatus } = this.props;

    if (damageLookupStatus === PENDING) {
      return <LoadingView text="Looking up Bike Damage..." />;
    }

    if (damageLookupStatus === FAILED) {
      return (
        <View style={style.statusWrapper}>
          <ErrorView
            title="Error Looking Up Bike"
            subText={damageLookupError}
            onClose={this.handleClose}
          />
          <View style={style.actions}>
            <Button style={style.rescanButton} onPress={this.retryScan}>
              <Text>Rescan</Text>
            </Button>
          </View>
        </View>
      );
    }

    if (damageLookupStatus === SUCCESS) {
      return <View />;
    }

    return this.renderBikeScanner();
  }

  renderBikeScanner() {
    const { onClose } = this.props;
    const { scannerVisible } = this.state;

    if (!scannerVisible) return null;

    return (
      <BikeScanner
        manualEntryHeaderText="Bike Lookup"
        manualEntryButtonText="Lookup bike"
        onSubmit={this.handleScan}
        onClose={onClose}
      />
    );
  }

  render() {
    return <View style={style.container}>{this.renderContent()}</View>;
  }
}

const mapStateToProps = state => ({
  damageLookupStatus: getIn(['maintenance', 'damageLookup', 'status'], state),
  damageLookupError: getIn(['maintenance', 'damageLookup', 'error'], state),
});

const actions = {
  lookUpBikeDamage: lookUpBikeDamageAction,
  clearDamageLookupStatus: clearDamageLookupStatusAction,
};

export default connect(mapStateToProps, actions)(BikeLookupView);
