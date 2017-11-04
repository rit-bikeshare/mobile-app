import { createAction } from 'redux-actions';

import ActionTypes from 'BikeShare/redux/ActionTypes';

export const networkConnectionChange = createAction(
  ActionTypes.SET_NETWORK_CONNECTION_STATUS
);
