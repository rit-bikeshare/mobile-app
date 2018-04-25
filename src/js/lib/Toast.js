import { ToastAndroid } from 'react-native';
import Toast from 'react-native-root-toast';
import { isAndroid } from 'BikeShare/utils/platform';

const LONG = 'LONG';
const SHORT = 'SHORT';

function convertDuration(duration) {
  if (isAndroid())
    return duration === LONG ? ToastAndroid.LONG : ToastAndroid.SHORT;

  return duration === LONG ? Toast.durations.LONG : Toast.durations.SHORT;
}

function showAndroidToast(message, duration) {
  ToastAndroid.showWithGravityAndOffset(
    message,
    convertDuration(duration),
    ToastAndroid.CENTER,
    0,
    500
  );
}

function showIOSToast(message, duration) {
  Toast.show(message, {
    duration: convertDuration(duration),
    position: -100,
    shadow: true,
    animation: true,
    hideOnPress: true,
  });
}

export default {
  LONG: LONG,
  SHORT: SHORT,
  show(message, duration = SHORT) {
    if (isAndroid()) {
      showAndroidToast(message, duration);
      return;
    }
    showIOSToast(message, duration);
  },
};
