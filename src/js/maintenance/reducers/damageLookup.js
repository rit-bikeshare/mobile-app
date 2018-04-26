import { Map } from 'immutable';
import { handleActions } from 'redux-actions';
import RequestStatusTypes from 'BikeShare/api/constants/RequestStatus';

import {
  DAMAGE_LOOKUP,
  DAMAGE_LOOKUP_SUCCESS,
  DAMAGE_LOOKUP_ERROR,
  CLEAR_DAMAGE_LOOKUP_STATUS,
  DAMAGE_REPORT_UPDATED,
} from '../constants/MaintenanceActionTypes';
import DamageReport from '../records/DamageReport';

const initialState = Map({
  error: null,
  status: null,
  reports: Map(),
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
      const data = Map(
        action.payload.map(report => [report.id, new DamageReport(report)])
      );
      return state.set('status', SUCCESS).set('reports', data);
    },

    [DAMAGE_REPORT_UPDATED](state, action) {
      const report = new DamageReport(action.payload);
      return state.setIn(['reports', report.id], report);
    },

    [DAMAGE_LOOKUP_ERROR](state, action) {
      return state.set('status', FAILED).set('error', action.payload.message);
    },
  },
  initialState
);
