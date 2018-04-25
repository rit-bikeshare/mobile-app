import React from 'react';
import PropTypes from 'prop-types';
import { Modal, ActivityIndicator } from 'react-native';
import { View } from 'native-base';

import CheckOutView from '../CheckOut';
import CheckInContainer from '../CheckIn';

import MaintenanceActions from '../MaintenanceActions';
import MapView from '../MapView';
import style from './MaintenanceViewStyles';

class MaintenanceView extends React.Component {
  static propTypes = {
    history: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      showCheckout: false,
      showCheckin: false,
      loading: false,
    };
    this.handleClickCheckout = this.handleClickCheckout.bind(this);
    this.handleClickCheckin = this.handleClickCheckin.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  handleClickCheckout() {
    this.setState({ showCheckout: true });
  }

  handleClickCheckin() {
    this.setState({ showCheckin: true });
  }

  closeModal() {
    this.setState({
      showCheckout: false,
      showCheckin: false,
    });
  }

  renderLoading() {
    const { loading } = this.state;
    if (!loading) {
      return null;
    }

    return <ActivityIndicator />;
  }

  renderModalContent() {
    const { history } = this.props;
    const { showCheckout, showCheckin } = this.state;

    if (showCheckout) {
      return <CheckOutView onClose={this.closeModal} />;
    }

    if (showCheckin) {
      return <CheckInContainer history={history} onClose={this.closeModal} />;
    }

    return <View />;
  }

  renderModal() {
    const { showCheckout, showCheckin } = this.state;
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={showCheckout || showCheckin}
        onRequestClose={this.closeModal}
      >
        {this.renderModalContent()}
      </Modal>
    );
  }

  render() {
    return (
      <View style={{ flexGrow: 1 }}>
        {this.renderModal()}
        <MapView tigerMode={true} />
        <MaintenanceActions
          style={style.actionsWrapper}
          checkOutBike={this.handleClickCheckout}
          checkInBike={this.handleClickCheckin}
        />
      </View>
    );
  }
}

export default MaintenanceView;
