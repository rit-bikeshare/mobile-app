import React from 'react';
import PropTypes from 'prop-types';
import { MapView as ExpoMapView } from 'expo';
import { Container, Text, Button } from 'native-base';
import { connect } from 'react-redux';
import { push as pushAction } from 'react-router-redux';

import mapStyle from 'BikeShare/styles/map';
import { PROVIDER_GOOGLE } from 'BikeShare/constants/MapProviders';
import { checkout } from 'BikeShare/constants/urls';

class MapView extends React.Component {
  static propTypes = {
    push: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 43.08447438334887,
        latitudeDelta: 0.00900991980918775,
        longitude: -77.67920080572367,
        longitudeDelta: 0.007426701486110687
      },
    };
    this.routeToCheckout = this.routeToCheckout.bind(this);
  }

  routeToCheckout() {
    const { push } = this.props;
    push(checkout);
  }

  render() {
    return (
      <Container>
        <ExpoMapView
          style={{ flex: 1 }}
          initialRegion={this.state.region}
          provider={PROVIDER_GOOGLE}
          customMapStyle={mapStyle}
        />
        <Button full={true} info={true} onPress={this.routeToCheckout}>
          <Text>Checkout a bike</Text>
        </Button>
      </Container>
    );
  }
}

export default connect(null, {
  push: pushAction
})(MapView);
