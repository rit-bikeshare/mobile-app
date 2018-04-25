import React from 'react';
import PropTypes from 'prop-types';
import { Modal, ActivityIndicator } from 'react-native';
import { View } from 'native-base';
import { connect } from 'react-redux';

import CheckoutContainer from 'BikeShare/check-out/components/CheckOutView';
import CheckInContainer from 'BikeShare/check-in/components/CheckInView';

import { fetchBikeRacks as fetchBikeRacksAction } from 'BikeShare/bike-rack/actions/bikeRackActions';
import { fetchCurrentRentalIfNotAlready as fetchCurrentRentalIfNotAlreadyAction } from 'BikeShare/rental/actions/rentalActions';

import BikeRentalActions from '../BikeRentalActions';
import RentalTimer from '../RentalTimer';
import MapView from '../MapView';
import style from './RentalViewStyles';

class MapContainer extends React.Component {
  static propTypes = {
    history: PropTypes.object,
    fetchBikeRacks: PropTypes.func,
    fetchCurrentRentalIfNotAlready: PropTypes.func,
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

  componentWillUnmount() {
    clearInterval(this.pollInterval);
  }

  componentWillMount() {
    const { fetchBikeRacks, fetchCurrentRentalIfNotAlready } = this.props;
    fetchBikeRacks();
    this.pollInterval = setInterval(() => fetchBikeRacks(), 5000);
    fetchCurrentRentalIfNotAlready();
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
      return <CheckoutContainer onClose={this.closeModal} />;
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
        <RentalTimer />
        <MapView tigerMode={true} />
        <BikeRentalActions
          style={style.actionsWrapper}
          checkOutBike={this.handleClickCheckout}
          checkInBike={this.handleClickCheckin}
        />
      </View>
    );
  }
}

export default connect(null, {
  fetchBikeRacks: fetchBikeRacksAction,
  fetchCurrentRentalIfNotAlready: fetchCurrentRentalIfNotAlreadyAction,
})(MapContainer);
