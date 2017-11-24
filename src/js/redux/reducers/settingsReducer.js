import { handleActions } from 'redux-actions';

import ActionTypes from 'BikeShare/redux/ActionTypes';
import SettingsData from 'BikeShare/data/records/SettingsData';

export default handleActions({
  [ActionTypes.SET_SETTING](state, action) {
    const {
      key,
      value
    } = action.payload;
    return state.set(key, value);
  }
}, new SettingsData());
