import { StyleSheet } from 'react-native';

import variables from 'theme/variables/commonColor';

export default StyleSheet.create({
  paddedView: {
    width: '100%',
    paddingLeft: 50,
    paddingRight: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconHeader: {
    marginBottom: 8,
    paddingLeft: 8,
  },
  checkmark: {
    fontSize: 40,
    color: variables.brandPrimary,
    marginBottom: 20,
  },
  header: {
    color: variables.brandPrimary,
  },
});
