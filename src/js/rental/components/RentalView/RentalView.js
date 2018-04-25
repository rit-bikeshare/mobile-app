import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { Modal, ActivityIndicator } from 'react-native';
import { MapView as ExpoMapView } from 'expo';
import { View } from 'native-base';
import { connect } from 'react-redux';

import CheckoutContainer from 'BikeShare/check-out/components/CheckOutView';
import CheckInContainer from 'BikeShare/check-in/components/CheckInView';
import { StatusBanner } from 'BikeShare/status';
import getCheckOutAvailable from 'BikeShare/status/selectors/getCheckOutAvailable';

import { fetchBikeRacks as fetchBikeRacksAction } from 'BikeShare/bike-rack/actions/bikeRackActions';
import { fetchCurrentRentalIfNotAlready as fetchCurrentRentalIfNotAlreadyAction } from 'BikeShare/rental/actions/rentalActions';
import BikeRackMarker from 'BikeShare/svg/BikeRackMarker';
import MapView from 'BikeShare/lib/components/MapView';

import { getMapMarkers } from '../../selectors/mapSelectors';
import BikeRentalActions from '../BikeRentalActions';
import RentalTimer from '../RentalTimer';
import style from './RentalViewStyles';

class MapContainer extends React.Component {
  static propTypes = {
    history: PropTypes.object,
    fetchBikeRacks: PropTypes.func,
    fetchCurrentRentalIfNotAlready: PropTypes.func,
    allowCheckout: PropTypes.bool,
    markers: PropTypes.instanceOf(Map),
    showCheckInAreas: PropTypes.bool,
    bikeRacks: PropTypes.instanceOf(Map),
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

  renderMarkers() {
    const { markers } = this.props;
    return markers
      .map(marker => (
        <ExpoMapView.Marker
          key={marker.get('id')}
          coordinate={{
            latitude: marker.get('latitude'),
            longitude: marker.get('longitude'),
          }}
        >
          <BikeRackMarker availableBikes={marker.get('data')} />
        </ExpoMapView.Marker>
      ))
      .toList()
      .toJS();
  }

  renderBikeRackCheckinAreas() {
    const { bikeRacks, showCheckInAreas } = this.props;
    if (!showCheckInAreas) {
      return null;
    }
    const bikeRacksMap = Map(bikeRacks);
    return bikeRacksMap
      .map(bikeRack => {
        const coords = bikeRack.checkInArea.geometry.coordinates[0];
        const formattedCoords = coords.map(coord => {
          return {
            latitude: coord[1],
            longitude: coord[0],
          };
        });
        return (
          <ExpoMapView.Polygon
            fillColor="rgba(243,110,31,0.25)"
            strokeColor="rgba(243,110,31,0.5)"
            key={bikeRack.get('id')}
            coordinates={formattedCoords}
          />
        );
      })
      .toList()
      .toJS();
  }

  render() {
    return (
      <View style={{ flexGrow: 1 }}>
        {this.renderModal()}
        <StatusBanner />
        <RentalTimer />
        <MapView>
          {this.renderBikeRackCheckinAreas()}
          {this.renderMarkers()}
        </MapView>
        <BikeRentalActions
          style={style.actionsWrapper}
          checkOutBike={this.handleClickCheckout}
          checkInBike={this.handleClickCheckin}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  allowCheckout: getCheckOutAvailable(state),
  markers: getMapMarkers(state),
  bikeRacks: state.bikeRacks,
  showCheckInAreas: state.settings.showCheckInAreas,
});

export default connect(mapStateToProps, {
  fetchBikeRacks: fetchBikeRacksAction,
  fetchCurrentRentalIfNotAlready: fetchCurrentRentalIfNotAlreadyAction,
})(MapContainer);
