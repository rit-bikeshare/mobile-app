import { createAction } from 'redux-actions';
import { List } from 'immutable';
import {
  DAMAGE_LOOKUP_SUCCESS,
  DAMAGE_LOOKUP_ERROR,
  CLEAR_DAMAGE_LOOKUP_STATUS,
} from '../constants/MaintenanceActionTypes';
import DamageReport from '../records/DamageReport';

const damageLookupSuccess = createAction(DAMAGE_LOOKUP_SUCCESS);
const damageLookupError = createAction(DAMAGE_LOOKUP_ERROR);

export const clearDamageLookupStatusAction = createAction(
  CLEAR_DAMAGE_LOOKUP_STATUS
);

function parseData(reportData) {
  reportData = reportData.filter(report => report.resolvedBy == null);
  const reports = reportData.map(report => new DamageReport(report));
  return reports;
}

export function lookUpBikeDamageAction(bikeId) {
  return (dispatch, getState, api) => {
    api.maintenance
      .lookupBikeDamage(bikeId)
      .then(
        response => {
          const reports = parseData(List(response));
          if (reports.size === 0) {
            dispatch(
              damageLookupError({ message: 'No reports for this bike' })
            );
          } else {
            dispatch(damageLookupSuccess(reports));
          }
        },
        error => dispatch(damageLookupError(error))
      )
      .done();
  };
}
