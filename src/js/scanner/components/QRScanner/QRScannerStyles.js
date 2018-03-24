import { StyleSheet } from 'react-native';

import variables from 'theme/variables/commonColor';

export default StyleSheet.create({
  closeButton: {
    position: 'absolute',
    top: variables.isIphoneX ? 30 : 10,
    left: 10,
    backgroundColor: 'transparent',
  },
  actions: {
    position: 'absolute',
    bottom: variables.isIphoneX ? 30 : 10,
    right: 10,
    flexDirection: 'row',
  },
});
