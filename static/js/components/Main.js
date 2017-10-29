import React from 'react';
import { StyleProvider, View, Container, Tabs, Tab, TabHeading, Icon } from 'native-base';

import MapView from 'BikeShare/components/map/MapView';
import getTheme from 'BikeShare/theme/components';
import materialIcons from 'BikeShare/theme/variables/materialIcons';

export default class Main extends React.Component {
  renderTabHeading(icon) {
    return (
      <TabHeading>
        <Icon name={icon} />
      </TabHeading>
    );
  }

  render() {
    return (
      <StyleProvider style={getTheme(materialIcons)}>
        <Container>
          <Tabs initialPage={1}>
            <Tab heading={this.renderTabHeading('bike')}>
              <MapView />
            </Tab>
            <Tab heading="Tab2">
              <View />
            </Tab>
          </Tabs>
        </Container>
      </StyleProvider>
    );
  }
}
