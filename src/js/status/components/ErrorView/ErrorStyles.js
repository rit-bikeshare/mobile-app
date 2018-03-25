import { StyleSheet } from 'react-native';

import variables from 'theme/variables/commonColor';

export default StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  errorIcon: {
    color: variables.brandDanger,
    fontSize: 100,
    marginBottom: 8,
  },
  subtext: {
    fontSize: 18,
    color: '#bfc1c1',
  },
});
