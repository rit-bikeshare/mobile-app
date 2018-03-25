import { createAction } from 'redux-actions';

import {
  SET_USER_DATA,
  USER_FETCH_SUCCESS,
  USER_FETCH_FAILED,
  USER_FETCH,
} from '../constants/AuthActionTypes';

export const setUserData = createAction(SET_USER_DATA);
const fetchDataSuccess = createAction(USER_FETCH_SUCCESS);
const fetchDataFailed = createAction(USER_FETCH_FAILED);
const fetchData = createAction(USER_FETCH);

export function fetchUserData() {
  return (dispatch, getState, api) => {
    dispatch(fetchData());
    api.user
      .fetchUserData()
      .then(
        userData => dispatch(fetchDataSuccess(userData)),
        error => dispatch(fetchDataFailed(error))
      );
  };
}
