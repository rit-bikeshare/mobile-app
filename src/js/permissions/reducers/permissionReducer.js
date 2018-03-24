import { handleActions } from 'redux-actions';

import {
  SET_CAMERA_PERMISSION,
  SET_LOCATION_PERMISSION,
} from '../constants/PermissionActionTypes';
import Permissions from '../records/Permissions';

export default handleActions(
  {
    [SET_CAMERA_PERMISSION](state, action) {
      return state.set('camera', action.payload);
    },
    [SET_LOCATION_PERMISSION](state, action) {
      return state.set('location', action.payload);
    },
  },
  new Permissions()
);
