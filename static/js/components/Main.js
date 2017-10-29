import React from 'react';
import { MapView } from 'expo';
import { Container, Text, Button, Header, Body, Title, Left, Right, Icon, Drawer } from 'native-base';

import mapStyle from 'BikeShare/styles/map';
import { PROVIDER_GOOGLE } from 'BikeShare/constants/MapProviders';

import SideBar from 'BikeShare/components/Sidebar';

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

    this.openDrawer = this.openDrawer.bind(this);
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
            provider={PROVIDER_GOOGLE}
            customMapStyle={mapStyle}
          />
          <Button full={true} info={true}>
            <Text>Primary</Text>
          </Button>
        </Container>
      </Drawer>
    );
  }
}
