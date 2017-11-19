import React from 'react';
import PropTypes from 'prop-types';
import { Button, H1, View, Text } from 'native-base';

import styles from 'BikeShare/styles/error';
import Icon from 'BikeShare/components/lib/Icon';

const ErrorView = ({ title, subText, onBack }) => {
  return (
    <View style={styles.container}>
      <Button style={styles.backButton} transparent={true} onPress={onBack}>
        <Icon name="arrow-back" />
        <Text>Back</Text>
      </Button>
      <Icon style={styles.errorIcon} name="error-outline" iconFamily="MaterialIcons" />
      <H1>{title}</H1>
      <Text>{subText}</Text>
    </View>
  );
};

ErrorView.propTypes = {
  title: PropTypes.string.isRequired,
  subText: PropTypes.string,
  onBack: PropTypes.func.isRequired
};

export default ErrorView;
