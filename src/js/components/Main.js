import React from 'react';
import { StyleProvider, View, Container, Tabs, Tab, TabHeading } from 'native-base';

import Icon from 'BikeShare/components/lib/Icon';
import MapView from 'BikeShare/components/map/MapView';
import getTheme from 'theme/components';
import materialIcons from 'theme/variables/materialIcons';

export default class Main extends React.Component {
  renderTabHeading(icon, iconFamily) {
    return (
      <TabHeading>
        <Icon name={icon} iconFamily={iconFamily} />
      </TabHeading>
    );
  }

  render() {
    return (
      <StyleProvider style={getTheme(materialIcons)}>
        <Container>
          <Tabs initialPage={0}>
            <Tab heading={this.renderTabHeading('bike', 'MaterialCommunityIcons')}>
              <MapView />
            </Tab>
            <Tab heading={this.renderTabHeading('more-horiz', 'MaterialIcons')}>
              <View />
            </Tab>
          </Tabs>
        </Container>
      </StyleProvider>
    );
  }
}
