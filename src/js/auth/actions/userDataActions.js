import { createAction } from 'redux-actions';

import { SET_USER_DATA } from '../constants/AuthActionTypes';

export const setUserData = createAction(SET_USER_DATA);
