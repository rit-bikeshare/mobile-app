import PropTypes from 'prop-types';
import * as React from 'react';
import { View, ViewPropTypes } from 'react-native';

export default function BlurView(props) {
  const { tint, intensity, ...rest } = props;

  let backgroundColor;
  if (tint === 'dark') {
    backgroundColor = 'rgba(0,0,0,0.5)';
  } else if (tint === 'light') {
    backgroundColor = 'rgba(255,255,255,1)';
  } else if (intensity) {
    const alpha = intensity / 100;
    backgroundColor = `rgba(255,255,255,${alpha})`;
  } else {
    backgroundColor = 'rgba(255,255,255,0.4)';
  }

  return <View {...rest} style={[props.style, { backgroundColor }]} />;
}

BlurView.propTypes = {
  tint: PropTypes.oneOf(['light', 'default', 'dark']),
  ...ViewPropTypes,
};
