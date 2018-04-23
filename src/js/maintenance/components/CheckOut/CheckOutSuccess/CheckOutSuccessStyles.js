import { StyleSheet } from 'react-native';

import variables from 'theme/variables/commonColor';

export default StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    backgroundColor: 'transparent',
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 80,
    paddingBottom: 50,
  },
  backButton: {
    position: 'absolute',
    top: variables.isIphoneX ? 30 : 10,
    left: 10,
  },
  actions: {
    alignSelf: 'center',
    marginTop: 'auto',
    flexDirection: 'row',
  },
});
