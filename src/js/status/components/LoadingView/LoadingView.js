import React from 'react';
import PropTypes from 'prop-types';
import { Platform, ActivityIndicator } from 'react-native';
import { View, Text } from 'native-base';
import style from './LoadingStyles';

const LoadingView = ({ text }) => {
  return (
    <View style={style.statusWrapper}>
      <ActivityIndicator size={Platform.OS === 'ios' ? 'large' : 100} />
      <Text style={style.statusText}>{text}</Text>
    </View>
  );
};

LoadingView.propTypes = {
  text: PropTypes.string,
};

export default LoadingView;
