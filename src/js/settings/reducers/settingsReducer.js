import { handleActions } from 'redux-actions';

import { SET_SETTING } from '../constants/SettingsActionTypes';
import SettingsData from '../records/SettingsData';

export default handleActions(
  {
    [SET_SETTING](state, action) {
      const { key, value } = action.payload;
      return state.set(key, value);
    },
  },
  new SettingsData()
);
