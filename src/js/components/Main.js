import React from 'react';
import { StyleProvider, View, Root, Tabs, Tab, TabHeading } from 'native-base';

import Icon from 'BikeShare/components/lib/Icon';
import MapContainer from 'BikeShare/containers/MapContainer';
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
        <Root>
          <Tabs initialPage={0}>
            <Tab heading={this.renderTabHeading('bike', 'MaterialCommunityIcons')}>
              <MapContainer />
            </Tab>
            <Tab heading={this.renderTabHeading('more-horiz', 'MaterialIcons')}>
              <View />
            </Tab>
          </Tabs>
        </Root>
      </StyleProvider>
    );
  }
}
