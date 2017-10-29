import React from 'react';
import Index from 'BikeShare/App';
import Expo from 'expo';

import { StyleProvider, Container } from 'native-base';

import getTheme from 'BikeShare/theme/components';
import commonColor from 'BikeShare/theme/variables/commonColor';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isReady: false
    };
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      'Ionicons': require('@expo/vector-icons/fonts/Ionicons.ttf'),
      'MaterialCommunityIcons': require('@expo/vector-icons/fonts/MaterialCommunityIcons.ttf'),
    });

    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }

    return (
      <StyleProvider style={getTheme(commonColor)}>
        <Container style={{ marginTop: Expo.Constants.statusBarHeight }}>
          <Index />
        </Container>
      </StyleProvider>
    );
  }
}
