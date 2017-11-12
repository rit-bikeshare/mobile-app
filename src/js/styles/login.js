import { StyleSheet } from 'react-native';
import variables from 'theme/variables/commonColor';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignSelf: 'center'
  },
  logo: {
    marginBottom: 32,
    maxWidth: 309,
    maxHeight: 69
  },
  bike: {
    position: 'absolute',
    right: -25,
    bottom: -25
  },
  dash: {
    height: 5,
    width: '52%',
    position: 'absolute',
    left: 0,
    bottom: 20,
    backgroundColor: variables.brandPrimary
  }
});
