import React from 'react';
import PropTypes from 'prop-types';
import { View, Button, Text } from 'native-base';
import { connect } from 'react-redux';

import { BikeScanner } from 'BikeShare/scanner';
import { ErrorView } from 'BikeShare/status';

import RequestStatus from 'BikeShare/api/constants/RequestStatus';
import { LoadingView } from 'BikeShare/status';
import {
  getCheckOutStatus as getCheckOutStatusSelector,
  getCheckOutError as getCheckOutErrorSelector,
} from '../../selectors/checkOutStatusSelectors';
import {
  checkOutBike as checkOutBikeAction,
  clearCheckOutStatus as clearCheckOutStatusAction,
} from '../../actions/checkOutActions';
import CheckoutSuccess from '../CheckOutSuccess';
import style from './CheckOutStyles';

const { PENDING, FAILED, SUCCESS } = RequestStatus;

class CheckoutContainer extends React.Component {
  static propTypes = {
    bikeCheckOutStatus: PropTypes.oneOf(Object.keys(RequestStatus)),
    bikeCheckOutError: PropTypes.string,
    clearCheckOutStatus: PropTypes.func,
    checkOutBike: PropTypes.func,
    onClose: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      scannerVisible: false,
    };

    this.openScanner = this.openScanner.bind(this);
    this.closeScanner = this.closeScanner.bind(this);
    this.retryScan = this.retryScan.bind(this);
  }

  componentWillMount() {
    this.setState({
      scannerVisible: true,
    });
  }

  componentWillUnmount() {
    const { clearCheckOutStatus } = this.props;
    clearCheckOutStatus();
  }

  retryScan() {
    const { clearCheckOutStatus } = this.props;
    clearCheckOutStatus();
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

  renderStatusMessage() {
    const { bikeCheckOutError, bikeCheckOutStatus, onClose } = this.props;

    if (bikeCheckOutStatus === PENDING) {
      return <LoadingView text="Checking Bike Out..." />;
    }

    if (bikeCheckOutStatus === FAILED) {
      return (
        <View style={style.statusWrapper}>
          <ErrorView
            title="Error Checking Out Bike"
            subText={bikeCheckOutError}
            onClose={onClose}
          />
          <View style={style.actions}>
            <Button style={style.rescanButton} onPress={this.retryScan}>
              <Text>Rescan</Text>
            </Button>
          </View>
        </View>
      );
    }

    if (bikeCheckOutStatus === SUCCESS) {
      return <CheckoutSuccess onClose={onClose} />;
    }

    return this.renderBikeScanner();
  }

  renderBikeScanner() {
    const { checkOutBike, onClose } = this.props;
    const { scannerVisible } = this.state;

    if (!scannerVisible) return null;

    return <BikeScanner onSubmit={checkOutBike} onClose={onClose} />;
  }

  render() {
    return <View style={style.container}>{this.renderStatusMessage()}</View>;
  }
}

const mapStateToProps = state => ({
  bikeCheckOutStatus: getCheckOutStatusSelector(state),
  bikeCheckOutError: getCheckOutErrorSelector(state),
});

const actions = {
  checkOutBike: checkOutBikeAction,
  clearCheckOutStatus: clearCheckOutStatusAction,
};

export default connect(mapStateToProps, actions)(CheckoutContainer);
