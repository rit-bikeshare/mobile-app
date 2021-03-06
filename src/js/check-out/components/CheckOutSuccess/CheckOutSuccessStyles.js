import { StyleSheet } from 'react-native';

import variables from 'theme/variables/commonColor';

export default StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 50,
  },
  paddedView: {
    paddingLeft: 50,
    paddingRight: 50,
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: variables.isIphoneX ? 30 : 10,
    left: 10,
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
  helmets: {
    width: 300,
    height: 115,
  },
  helmetsWrapper: {
    alignItems: 'center',
    width: '100%',
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#FAFAFA',
  },
  actions: {
    alignSelf: 'center',
    marginTop: 'auto',
    flexDirection: 'row',
  },
});
