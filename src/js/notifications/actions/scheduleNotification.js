import { createAction } from 'redux-actions';
import { Notifications } from 'expo';
import { SCHEDULE_NOTIFICATION } from '../constants/ActionTypes';

const scheduleNotificationAction = createAction(SCHEDULE_NOTIFICATION);

export default function scheduleNotification(id, notificationData, time) {
  return async dispatch => {
    const notificationId = await Notifications.scheduleLocalNotificationAsync(
      {
        ...notificationData,
        data: {
          type: 'delayed',
        },
        ios: {
          sound: true,
        },
        android: {
          sound: true,
          vibrate: true,
        },
      },
      { time }
    );
    dispatch(
      scheduleNotificationAction({
        id,
        notificationId,
      })
    );
  };
}
