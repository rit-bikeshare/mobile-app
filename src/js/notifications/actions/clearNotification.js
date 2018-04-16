import { Notifications } from 'expo';
import { createAction } from 'redux-actions';

import { CLEAR_NOTIFICATION } from '../constants/ActionTypes';

const clearNotificationAction = createAction(CLEAR_NOTIFICATION, id => id);

export default function clearNotification(id) {
  return (dispatch, getState) => {
    const notificationId = getState().notifications.get(id);
    if (notificationId) {
      Notifications.cancelScheduledNotificationAsync(notificationId);
      Notifications.dismissNotificationAsync(notificationId);
    }
    dispatch(clearNotificationAction(id));
  };
}
