import { StyleSheet } from 'react-native';

import variables from 'theme/variables/commonColor';

export default StyleSheet.create({
  statusWrapper: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: variables.isIphoneX ? 20 : 0,
    paddingBottom: variables.isIphoneX ? 20 : 0,
  },
  statusText: {
    fontSize: 20,
    paddingTop: 8,
  },
  rescanButton: {
    alignSelf: 'center',
  },
  container: {
    position: 'relative',
    height: '100%',
    backgroundColor: '#fff',
  },
  actions: {
    alignSelf: 'center',
    marginTop: 'auto',
    flexDirection: 'row',
    marginBottom: variables.isIphoneX ? 80 : 40,
  },
});
