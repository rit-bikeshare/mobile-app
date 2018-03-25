import { StyleSheet } from 'react-native';
import variables from 'theme/variables/commonColor';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection: 'column',
  },
  button: {
    height: 50,
    marginBottom: 12,
    alignSelf: 'center',
  },
  subtext: {
    fontSize: 12,
    color: '#a7a7a9',
    backgroundColor: 'transparent',
  },
  loginButtonWrapper: {
    marginTop: '60%',
  },
  logo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: '25%',
  },
  bikeLogo: {
    fontSize: 40,
    color: variables.brandPrimary,
    backgroundColor: 'transparent',
  },
  shareLogo: {
    fontSize: 40,
    backgroundColor: 'transparent',
  },
  footer: {
    width: '100%',
    alignSelf: 'flex-end',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
    opacity: 0,
  },
  bike: {
    minHeight: 126,
    minWidth: 195,
    marginBottom: -25,
    marginRight: -25,
  },
  dash: {
    transform: [{ translateY: 20 }],
    height: 5,
    width: '52%',
    backgroundColor: variables.brandPrimary,
  },
});
