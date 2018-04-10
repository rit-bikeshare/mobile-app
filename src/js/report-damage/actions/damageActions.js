import { createAction } from 'redux-actions';
import {
  DAMAGE_REPORT,
  DAMAGE_REPORT_SUCCESS,
  DAMAGE_REPORT_FAILED,
  FETCH_DAMAGE_TYPES,
  FETCH_DAMAGE_TYPES_SUCCESS,
  FETCH_DAMAGE_TYPES_FAILED,
  DAMAGE_REPORT_RESET,
} from '../constants/DamageActionTypes';

const damageReport = createAction(DAMAGE_REPORT);
const damageReportSuccess = createAction(DAMAGE_REPORT_SUCCESS);
const damageReportFailed = createAction(DAMAGE_REPORT_FAILED);
export const resetDamageReportStatus = createAction(DAMAGE_REPORT_RESET);

export function reportDamage({ bikeId, damageType, comments, critical }) {
  return (dispatch, getState, api) => {
    dispatch(damageReport());
    return api.bike
      .reportDamage({ bikeId, damageType, comments, critical })
      .then(
        () => dispatch(damageReportSuccess()),
        error => dispatch(damageReportFailed(error))
      );
  };
}

const damageTypesFetch = createAction(FETCH_DAMAGE_TYPES);
const damageTypesFetchSuccess = createAction(FETCH_DAMAGE_TYPES_SUCCESS);
const damageTypesFetchFailed = createAction(FETCH_DAMAGE_TYPES_FAILED);

export function fetchDamageTypes() {
  return (dispatch, getState, api) => {
    dispatch(damageTypesFetch());
    return api.bike
      .fetchDamageTypes()
      .then(
        response => dispatch(damageTypesFetchSuccess(response)),
        error => dispatch(damageTypesFetchFailed(error))
      );
  };
}
