import { handleActions } from 'redux-actions';

import ActionTypes from 'BikeShare/redux/ActionTypes';
import UserData from 'BikeShare/data/records/UserData';

const initialState = new UserData();

export default handleActions({
  [ActionTypes.SET_USER_DATA](state, action) {
    return new UserData(action.payload);
  }
}, initialState);
