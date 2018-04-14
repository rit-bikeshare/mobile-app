import { handleActions } from 'redux-actions';

import UserData from '../records/UserData';
import {
  SET_USER_DATA,
  USER_FETCH_SUCCESS,
  SET_USER_TOKEN,
  CLEAR_USER_DATA,
} from '../constants/AuthActionTypes';

const initialState = new UserData();

function mergeUserData(oldVal, newVal) {
  if (newVal === null && oldVal !== null) return oldVal;
  return newVal;
}

export default handleActions(
  {
    [SET_USER_DATA](state, action) {
      const newUserData = new UserData(action.payload);
      return state.mergeWith(mergeUserData, newUserData);
    },
    [USER_FETCH_SUCCESS](state, action) {
      const newUserData = new UserData(action.payload);
      return state.mergeWith(mergeUserData, newUserData);
    },
    [SET_USER_TOKEN](state, action) {
      return state.set('authToken', action.payload);
    },
    [CLEAR_USER_DATA]() {
      return new UserData();
    },
  },
  initialState
);
