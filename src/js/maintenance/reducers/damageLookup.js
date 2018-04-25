import { Map, List } from 'immutable';
import { handleActions } from 'redux-actions';
import RequestStatusTypes from 'BikeShare/api/constants/RequestStatus';

import {
  DAMAGE_LOOKUP,
  DAMAGE_LOOKUP_SUCCESS,
  DAMAGE_LOOKUP_ERROR,
  CLEAR_DAMAGE_LOOKUP_STATUS,
} from '../constants/MaintenanceActionTypes';

const initialState = Map({
  error: null,
  status: null,
  reports: List([]),
});

const { PENDING, SUCCESS, FAILED, UNINITIALIZED } = RequestStatusTypes;

export default handleActions(
  {
    [CLEAR_DAMAGE_LOOKUP_STATUS](state) {
      return state.set('status', UNINITIALIZED);
    },
    [DAMAGE_LOOKUP](state) {
      return state.set('status', PENDING);
    },
    [DAMAGE_LOOKUP_SUCCESS](state, action) {
      return state.set('status', SUCCESS).set('reports', action.payload);
    },

    [DAMAGE_LOOKUP_ERROR](state, action) {
      return state.set('status', FAILED).set('error', action.payload.message);
    },
  },
  initialState
);
