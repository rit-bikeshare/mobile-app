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
  text: {
    color: '#ffffff'
  },
  timer: {
    fontSize: 20,
    paddingLeft: 4,
    color: '#ffffff'
  },
  icon: {
    color: '#ffffff',
    fontSize: 20
  }
});
