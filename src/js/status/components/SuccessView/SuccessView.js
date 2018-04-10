import React from 'react';
import PropTypes from 'prop-types';
import { View, Icon, H1, H2, Text } from 'native-base';
import styles from './SuccessViewStyles';

const SuccessView = ({ title, text, style }) => {
  return (
    <View style={[style, styles.paddedView]}>
      <View style={styles.icon}>
        <Icon
          type="Ionicons"
          name="md-checkmark-circle-outline"
          style={styles.checkmark}
        />
        <H1 style={styles.iconHeader}>Success</H1>
      </View>
      <H2 style={styles.header}>{title}</H2>
      <Text style={{ textAlign: 'center', paddingBottom: 32 }}>{text}</Text>
    </View>
  );
};

SuccessView.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  style: PropTypes.object,
};

export default SuccessView;
