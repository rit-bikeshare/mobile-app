import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { MapView as ExpoMapView } from 'expo';
import { connect } from 'react-redux';

import { getMapMarkers } from 'BikeShare/selectors/mapSelectors';
import { PROVIDER_GOOGLE } from 'BikeShare/constants/MapProviders';
import BikeRackMarker from 'BikeShare/components/svg/BikeRackMarker';
import rit from 'BikeShare/styles/rit';
import tiger from 'img/tiger.png';

class MapView extends React.Component {
  static propTypes = {
    markers: PropTypes.instanceOf(Map),
    tigerMode: PropTypes.bool,
    debug: PropTypes.bool,
    bikeRacks: PropTypes.instanceOf(Map)
  };

  renderMarkers() {
    const { markers, tigerMode } = this.props;
    return markers
      .map(marker => (
        <ExpoMapView.Marker
          key={marker.get('id')}
          coordinate={{
            latitude: marker.get('latitude'),
            longitude: marker.get('longitude')
          }}
          image={tigerMode ? tiger : null}
        >
          <BikeRackMarker useTiger={tigerMode} availableBikes={marker.get('data')} />
        </ExpoMapView.Marker>
      ))
      .toList()
      .toJS();
  }

  renderBikeRackCheckinAreas() {
    const { bikeRacks, debug } = this.props;
    if (!debug) {
      return null;
    }
    const bikeRacksMap = Map(bikeRacks);
    return bikeRacksMap
      .map(bikeRack => {
        const coords = bikeRack.checkInArea.geometry.coordinates[0];
        const formattedCoords = coords.map(coord => {
          return {
            latitude: coord[1],
            longitude: coord[0]
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
    const { tigerMode } = this.props;
    return (
      <ExpoMapView
        key={tigerMode ? 'tigerMode' : 'default'}
        style={{ flexGrow: 1 }}
        customMapStyle={tigerMode ? rit : null}
        initialRegion={{
          latitude: 43.08447438334887,
          latitudeDelta: 0.00900991980918775,
          longitude: -77.67920080572367,
          longitudeDelta: 0.007426701486110687
        }}
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
  debug: state.settings.debug
});

export default connect(mapStateToProps)(MapView);
