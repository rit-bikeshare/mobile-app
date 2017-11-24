import { StyleSheet } from 'react-native';

import variables from 'theme/variables/commonColor';

export default StyleSheet.create({
  statusWrapper: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 50,
    paddingTop: variables.isIphoneX ? 20 : 0
  },
  statusText: {
    fontSize: 20,
    paddingTop: 8
  },
  rescanButton: {
    alignSelf: 'center'
  }
});
