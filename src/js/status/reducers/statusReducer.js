import { handleActions } from 'redux-actions';

import SystemStatus from '../records/SystemStatus';
import { STATUS_FETCH_SUCCESS } from '../constants/StatusActionTypes';

export default handleActions(
  {
    [STATUS_FETCH_SUCCESS](state, action) {
      return new SystemStatus(action.payload);
    },
  },
  new SystemStatus()
);
