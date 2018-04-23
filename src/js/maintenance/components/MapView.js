import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { MapView as ExpoMapView } from 'expo';
import { connect } from 'react-redux';

import { PROVIDER_GOOGLE } from 'BikeShare/constants/MapProviders';
import initialRegion from 'BikeShare/constants/initialMapRegion';

import { getMapMarkers } from '../selectors/mapSelectors';

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
        />
      ))
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
