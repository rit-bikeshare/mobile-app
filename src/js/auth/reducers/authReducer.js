import { handleActions } from 'redux-actions';

import UserData from '../records/UserData';
import { SET_USER_DATA } from '../constants/AuthActionTypes';

const initialState = new UserData();

export default handleActions(
  {
    [SET_USER_DATA](state, action) {
      return new UserData(action.payload);
    },
  },
  initialState
);
