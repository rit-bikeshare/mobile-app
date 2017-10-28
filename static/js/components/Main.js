import React from 'react';
import PropTypes from 'prop-types';

import { MapView } from 'expo';
import { Container, Text, Button, Header, Body, Title, Left, Right, Icon, Drawer } from 'native-base';

import mapStyle from 'BikeShare/styles/map';
import { checkout } from 'BikeShare/constants/urls';
import { PROVIDER_GOOGLE } from 'BikeShare/constants/MapProviders';

import SideBar from 'BikeShare/components/Sidebar';

export default class Main extends React.Component {
  static propTypes = {
    history: PropTypes.object
  };

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
    this.onRegionChange = this.onRegionChange.bind(this);
    this.openDrawer = this.openDrawer.bind(this);
    this.routeToCheckout = this.routeToCheckout.bind(this);
  }

  routeToCheckout() {
    const { history } = this.props;
    history.push(checkout);
  }

  onRegionChange(region) {
    this.setState({ region });
  }

  closeDrawer() {
    this.drawer._root.close();
  }

  openDrawer() {
    this.drawer._root.open();
  }

  render() {
    return (
      <Drawer
        ref={ref => { this.drawer = ref; }}
        content={<SideBar />}
        onClose={() => this.closeDrawer()}
      >
        <Container>
          <Header>
            <Left>
              <Button
                transparent={true}
                onPress={this.openDrawer}
              >
                <Icon name="menu" />
              </Button>
            </Left>
            <Body>
              <Title>RIT BikeShare</Title>
            </Body>
            <Right />
          </Header>
          <MapView
            style={{ flex: 1 }}
            initialRegion={this.state.region}
            onRegionChange={this.onRegionChange}
            provider={PROVIDER_GOOGLE}
            customMapStyle={mapStyle}
          />
          <Button full={true} info={true} onPress={this.routeToCheckout}>
            <Text>Checkout a bike</Text>
          </Button>
        </Container>
      </Drawer>
    );
  }
}
