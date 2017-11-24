import { createAction } from 'redux-actions';
import ActionTypes from 'BikeShare/redux/ActionTypes';

export const setSetting = createAction(
  ActionTypes.SET_SETTING,
  (key, value) => ({ key, value })
);
