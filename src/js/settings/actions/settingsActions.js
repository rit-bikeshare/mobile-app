import { createAction } from 'redux-actions';
import { SET_SETTING } from '../constants/SettingsActionTypes';

export const setSetting = createAction(SET_SETTING, (key, value) => ({
  key,
  value,
}));
