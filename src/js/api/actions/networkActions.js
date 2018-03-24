import { createAction } from 'redux-actions';

import { SET_NETWORK_CONNECTION_STATUS } from '../constants/NetworkActionTypes';

export const networkConnectionChange = createAction(
  SET_NETWORK_CONNECTION_STATUS
);
