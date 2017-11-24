import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { MapView as ExpoMapView } from 'expo';

import { connect } from 'react-redux';

import { getMapMarkers } from 'BikeShare/selectors/mapSelectors';
import { PROVIDER_GOOGLE } from 'BikeShare/constants/MapProviders';
import BikeRackMarker from 'BikeShare/components/svg/BikeRackMarker';


class MapView extends React.Component {
  static propTypes = {
    markers: PropTypes.instanceOf(Map),
  };

  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 43.08447438334887,
        latitudeDelta: 0.00900991980918775,
        longitude: -77.67920080572367,
        longitudeDelta: 0.007426701486110687,
      },
    };
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

  render() {
    return (
      <ExpoMapView
        style={{ flex: 1 }}
        initialRegion={this.state.region}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        {this.renderMarkers()}
      </ExpoMapView>
    );
  }
}

const mapStateToProps = state => ({
  markers: getMapMarkers(state),
});

export default connect(mapStateToProps)(MapView);
