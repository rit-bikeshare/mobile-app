import React from 'react';
import PropTypes from 'prop-types';
import { Picker, Item } from 'native-base';

import { isAndroid } from 'BikeShare/utils/platform';

const PickerWithPlaceholder = ({
  placeholder,
  selectedValue,
  children,
  ...props
}) => {
  const getChildren = () => {
    if (isAndroid()) {
      return children.concat(
        <Item key="placeholder" value={null} label={placeholder} />
      );
    }
    return children;
  };

  let style = {};

  if (isAndroid() && selectedValue == null) {
    style.color = '#a7a7a7';
  }

  return (
    <Picker
      {...props}
      iosHeader={placeholder}
      placeholder={placeholder}
      selectedValue={selectedValue}
      style={style}
      headerStyle={{ backgroundColor: '#F36E1F' }}
    >
      {getChildren()}
    </Picker>
  );
};

PickerWithPlaceholder.propTypes = {
  placeholder: PropTypes.string,
  selectedValue: PropTypes.string,
  children: PropTypes.array,
};

export default PickerWithPlaceholder;
