import React from 'react';
import Expo from 'expo';
import { StatusBar } from 'react-native';
import { StyleProvider, Container, View } from 'native-base';

import Router from 'BikeShare/Router';
import getTheme from 'theme/components';
import commonColor from 'theme/variables/commonColor';
import { isIOS } from 'BikeShare/utils/platform';

const {
  brandPrimary
} = commonColor;

export default class App extends React.Component {
  constructor(args) {
    super(args);
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
      'Material Design Icons': require('@expo/vector-icons/fonts/MaterialCommunityIcons.ttf'),
    });

    this.setState({ isReady: true });
  }

  renderStatusBarPadding() {
    if (!isIOS()) return <View />;

    return (
      <View
        style={{
          backgroundColor: brandPrimary,
          height: Expo.Constants.statusBarHeight,
          width: '100%'
        }}
      />
    );
  }

  render() {
    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }

    return (
      <StyleProvider style={getTheme(commonColor)}>
        <Container>
          {this.renderStatusBarPadding()}
          <StatusBar
            backgroundColor={brandPrimary}
            barStyle="light-content"
          />
          <Router />
        </Container>
      </StyleProvider>
    );
  }
}
