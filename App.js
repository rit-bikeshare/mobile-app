import React from 'react';
import Index from 'BikeShare/App';
import Expo from 'expo';

export default class App extends React.Component {
  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      'Ionicons': require('@expo/vector-icons/fonts/Ionicons.ttf'),
    });
  }

  render() {
    return (
      <Index />
    );
  }
}
