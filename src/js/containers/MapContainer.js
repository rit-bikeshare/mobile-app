import React from 'react';
import { Modal, ActivityIndicator } from 'react-native';
import { Container, View } from 'native-base';

import CheckoutContainer from 'BikeShare/containers/CheckoutContainer';
import CheckinContainer from 'BikeShare/containers/CheckinContainer';
import MapView from 'BikeShare/components/map/MapView';
import RentalTimer from 'BikeShare/components/map/RentalTimer';
import BikeRentalActions from 'BikeShare/components/map/BikeRentalActions';
import style from 'BikeShare/styles/mapView';

class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCheckout: false,
      showCheckin: false,
      loading: false
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
      showCheckin: false
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
    const { showCheckout, showCheckin } = this.state;

    if (showCheckout) {
      return <CheckoutContainer onClose={this.closeModal} />;
    }

    if (showCheckin) {
      return <CheckinContainer onClose={this.closeModal} />;
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
      <Container>
        {this.renderModal()}
        <RentalTimer />
        <MapView tigerMode={true} />
        <BikeRentalActions
          style={style.actionsWrapper}
          checkoutBike={this.handleClickCheckout}
          checkinBike={this.handleClickCheckin}
        />
      </Container>
    );
  }
}

export default MapContainer;
