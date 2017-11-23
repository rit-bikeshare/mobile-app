import { StyleSheet } from 'react-native';
import variables from 'theme/variables/commonColor';

export default StyleSheet.create({
  timerContainer: {
    width: '100%',
    backgroundColor: variables.brandPrimary,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 10,
  },
  timer: {
    fontSize: 20,
    paddingLeft: 8,
    color: '#ffffff'
  },
  icon: {
    color: '#ffffff',
    fontSize: 20
  }
});
