import { Map } from 'immutable';
import { handleActions } from 'redux-actions';
import RequestStatus from 'BikeShare/api/constants/RequestStatus';

import {
  DAMAGE_REPORT,
  DAMAGE_REPORT_SUCCESS,
  DAMAGE_REPORT_FAILED,
  DAMAGE_REPORT_RESET,
  FETCH_DAMAGE_TYPES,
  FETCH_DAMAGE_TYPES_SUCCESS,
  FETCH_DAMAGE_TYPES_FAILED,
} from '../constants/DamageActionTypes';

const { SUCCESS, PENDING, FAILED, UNINITIALIZED } = RequestStatus;

export default handleActions(
  {
    [DAMAGE_REPORT](state) {
      return state.set('damageReportStatus', PENDING);
    },
    [DAMAGE_REPORT_SUCCESS](state) {
      return state.set('damageReportStatus', SUCCESS);
    },
    [DAMAGE_REPORT_FAILED](state) {
      return state.set('damageReportStatus', FAILED);
    },
    [DAMAGE_REPORT_RESET](state) {
      return state.set('damageReportStatus', UNINITIALIZED);
    },

    [FETCH_DAMAGE_TYPES](state) {
      return state.set('damageTypesFetchStatus', PENDING);
    },
    [FETCH_DAMAGE_TYPES_SUCCESS](state) {
      return state.set('damageTypesFetchStatus', SUCCESS);
    },
    [FETCH_DAMAGE_TYPES_FAILED](state) {
      return state.set('damageTypesFetchStatus', FAILED);
    },
  },
  Map({
    damageReportStatus: UNINITIALIZED,
    damageTypesFetchStatus: UNINITIALIZED,
  })
);
