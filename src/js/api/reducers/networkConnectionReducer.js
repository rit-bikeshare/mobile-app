import { handleActions } from 'redux-actions';

import { SET_NETWORK_CONNECTION_STATUS } from '../constants/NetworkActionTypes';

export default handleActions(
  {
    [SET_NETWORK_CONNECTION_STATUS](state, action) {
      return action.payload;
    },
  },
  'online'
);
