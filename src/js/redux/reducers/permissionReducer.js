import { handleActions } from 'redux-actions';

import ActionTypes from 'BikeShare/redux/ActionTypes';

import Permissions from 'BikeShare/data/records/Permissions';

export default handleActions({
  [ActionTypes.SET_CAMERA_PERMISSION](state, action) {
    return state.set('camera', action.payload);
  },
  [ActionTypes.SET_LOCATION_PERMISSION](state, action) {
    return state.set('location', action.payload);
  }
}, new Permissions());
