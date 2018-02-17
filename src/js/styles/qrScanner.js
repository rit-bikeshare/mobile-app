import { StyleSheet } from 'react-native';

import variables from 'theme/variables/commonColor';

export default StyleSheet.create({
  torchButton: {
    position: 'absolute',
    bottom: variables.isIphoneX ? 30 : 10,
    right: 10
  },
  closeButton: {
    position: 'absolute',
    top: variables.isIphoneX ? 30 : 10,
    left: 10,
    backgroundColor: 'transparent'
  }
});
