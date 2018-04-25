import React from 'react';
import PropTypes from 'prop-types';
import { MapView as ExpoMapView } from 'expo';

import { PROVIDER_GOOGLE } from 'BikeShare/constants/MapProviders';
import initialRegion from 'BikeShare/constants/initialMapRegion';

class MapView extends React.Component {
  static propTypes = {
    children: PropTypes.node,
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

  render() {
    const { children } = this.props;
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
        {children}
      </ExpoMapView>
    );
  }
}

export default MapView;
