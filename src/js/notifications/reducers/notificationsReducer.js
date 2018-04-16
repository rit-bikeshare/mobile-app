import { Map } from 'immutable';
import { handleActions } from 'redux-actions';

import {
  SCHEDULE_NOTIFICATION,
  CLEAR_NOTIFICATION,
} from '../constants/ActionTypes';

export default handleActions(
  {
    [SCHEDULE_NOTIFICATION](state, action) {
      const { id, notificationId } = action.payload;
      return state.set(id, notificationId);
    },
    [CLEAR_NOTIFICATION](state, action) {
      const id = action.payload;
      return state.delete(id);
    },
  },
  Map()
);
