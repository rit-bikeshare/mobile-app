import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { MapView as ExpoMapView } from 'expo';
import { Container } from 'native-base';
import { connect } from 'react-redux';
import { push as pushAction } from 'react-router-redux';

import RentalTimer from './RentalTimer';
import { getMapMarkers } from 'BikeShare/selectors/mapSelectors';
import { PROVIDER_GOOGLE } from 'BikeShare/constants/MapProviders';
import { checkout } from 'BikeShare/constants/urls';
import BikeRackMarker from 'BikeShare/components/map/BikeRackMarker';
import BikeRentalActions from 'BikeShare/components/BikeRentalActions';
import style from 'BikeShare/styles/mapView';

class MapView extends React.Component {
  static propTypes = {
    push: PropTypes.func,
    markers: PropTypes.instanceOf(Map)
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
    this.routeToCheckout = this.routeToCheckout.bind(this);
  }

  routeToCheckout() {
    const { push } = this.props;
    push(checkout);
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
      <Container>
        <RentalTimer />
        <ExpoMapView
          style={{ flex: 1 }}
          initialRegion={this.state.region}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
        >
          {this.renderMarkers()}
        </ExpoMapView>
        <BikeRentalActions
          style={style.actionsWrapper}
          checkoutBike={this.routeToCheckout}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  markers: getMapMarkers(state),
});

export default connect(mapStateToProps, {
  push: pushAction
})(MapView);
