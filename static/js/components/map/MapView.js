import React from 'react';
import { MapView } from 'expo';
import { Container, Text, Button } from 'native-base';

import mapStyle from 'BikeShare/styles/map';
import { PROVIDER_GOOGLE } from 'BikeShare/constants/MapProviders';

export default class Main extends React.Component {
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
  }

  render() {
    return (
      <Container>
        <MapView
          style={{ flex: 1 }}
          initialRegion={this.state.region}
          provider={PROVIDER_GOOGLE}
          customMapStyle={mapStyle}
        />
        <Button full={true}>
          <Text>Primary</Text>
        </Button>
      </Container>
    );
  }
}
