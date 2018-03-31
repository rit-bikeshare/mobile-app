import { handleActions } from 'redux-actions';

import UserData from '../records/UserData';
import {
  SET_USER_DATA,
  USER_FETCH_SUCCESS,
  SET_USER_TOKEN,
} from '../constants/AuthActionTypes';

const initialState = new UserData();

export default handleActions(
  {
    [SET_USER_DATA](state, action) {
      return state.merge(action.payload);
    },
    [USER_FETCH_SUCCESS](state, action) {
      return state.merge(action.payload);
    },
    [SET_USER_TOKEN](state, action) {
      return state.set('authToken', action.payload);
    },
  },
  initialState
);
