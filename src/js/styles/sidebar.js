import { Dimensions } from 'react-native';

import { isAndroid, isIOS } from 'BikeShare/utils/platform';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  sidebar: {
    flex: 1,
    backgroundColor: '#fff'
  },
  drawerCover: {
    alignSelf: 'stretch',
    // resizeMode: 'cover',
    height: deviceHeight / 3.5,
    width: null,
    position: 'relative',
    marginBottom: 10
  },
  drawerImage: {
    position: 'absolute',
    // left: (Platform.OS === 'android') ? 30 : 40,
    left: isAndroid() ? deviceWidth / 10 : deviceWidth / 9,
    // top: (Platform.OS === 'android') ? 45 : 55,
    top: isAndroid() ? deviceHeight / 13 : deviceHeight / 12,
    width: 210,
    height: 75,
    resizeMode: 'cover'
  },
  listItemContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  iconContainer: {
    width: 37,
    height: 37,
    borderRadius: 18,
    marginRight: 12,
    paddingTop: isAndroid() ? 7 : 5
  },
  sidebarIcon: {
    fontSize: 21,
    color: '#fff',
    lineHeight: isAndroid() ? 21 : 25,
    backgroundColor: 'transparent',
    alignSelf: 'center'
  },
  text: {
    fontWeight: isIOS() ? '500' : '400',
    fontSize: 16,
    marginLeft: 20
  },
  badgeText: {
    fontSize: isIOS() ? 13 : 11,
    fontWeight: '400',
    textAlign: 'center',
    marginTop: isAndroid() ? -3 : null
  }
};
