import React from 'react';
import PropTypes from 'prop-types';
import { Button, H1, View, Text, Icon } from 'native-base';

import styles from 'BikeShare/styles/error';

const ErrorView = ({ title, subText, onClose }) => {
  return (
    <View style={styles.container}>
      <Button transparent={true} dark={true} onPress={onClose} style={styles.backButton}>
        <Icon name="close" type="MaterialCommunityIcons" style={{ fontSize: 30 }} />
      </Button>
      <Icon style={styles.errorIcon} name="error-outline" type="MaterialIcons" />
      <H1>{title}</H1>
      <Text style={styles.subtext}>{subText}</Text>
    </View>
  );
};

ErrorView.propTypes = {
  title: PropTypes.string.isRequired,
  subText: PropTypes.string,
  onClose: PropTypes.func.isRequired
};

export default ErrorView;
