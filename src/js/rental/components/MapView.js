import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { MapView as ExpoMapView } from 'expo';
import { connect } from 'react-redux';

import BikeRackMarker from 'BikeShare/svg/BikeRackMarker';
import { PROVIDER_GOOGLE } from 'BikeShare/constants/MapProviders';

import { getMapMarkers } from '../selectors/mapSelectors';

const initialRegion = {
  latitude: 43.07965672891953,
  latitudeDelta: 0.021126917078568397,
  longitude: -77.67793480306864,
  longitudeDelta: 0.01609325408935547,
};

class MapView extends React.Component {
  static propTypes = {
    markers: PropTypes.instanceOf(Map),
    showCheckInAreas: PropTypes.bool,
    bikeRacks: PropTypes.instanceOf(Map),
  };

  constructor(props) {
    super(props);
    this.state = {
      region: initialRegion,
    };

    this.moveToInitial = this.moveToInitial.bind(this);
    this.registerMapRef = this.registerMapRef.bind(this);
  }

  registerMapRef(ref) {
    this.mapRef = ref;
  }

  moveToInitial() {
    if (this.mapRef) {
      this.mapRef.animateToRegion(initialRegion, 1);
    }
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
      <ExpoMapView
        ref={this.registerMapRef}
        key="default"
        style={{ flexGrow: 1 }}
        customMapStyle={null}
        onMapReady={this.moveToInitial}
        initialRegion={initialRegion}
        minZoomLevel={10}
        maxZoomLevel={20}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        showsMyLocationButton={true}
        showsIndoors={false}
      >
        {this.renderMarkers()}
        {this.renderBikeRackCheckinAreas()}
      </ExpoMapView>
    );
  }
}

const mapStateToProps = state => ({
  markers: getMapMarkers(state),
  bikeRacks: state.bikeRacks,
  tigerMode: state.settings.tigerMode,
  showCheckInAreas: state.settings.showCheckInAreas,
});

export default connect(mapStateToProps)(MapView);
