import { handleActions } from 'redux-actions';

import UserData from '../records/UserData';
import {
  SET_USER_DATA,
  USER_FETCH_SUCCESS,
} from '../constants/AuthActionTypes';

const initialState = new UserData();

export default handleActions(
  {
    [SET_USER_DATA](state, action) {
      return new UserData(action.payload);
    },
    [USER_FETCH_SUCCESS](state, action) {
      return new UserData(action.payload);
    },
  },
  initialState
);
