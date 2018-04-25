import { createAction } from 'redux-actions';
import {
  DAMAGE_LOOKUP_SUCCESS,
  DAMAGE_LOOKUP_ERROR,
  CLEAR_DAMAGE_LOOKUP_STATUS,
} from '../constants/MaintenanceActionTypes';

const damageLookupSuccess = createAction(DAMAGE_LOOKUP_SUCCESS);
const damageLookupError = createAction(DAMAGE_LOOKUP_ERROR);

export const clearDamageLookupStatusAction = createAction(
  CLEAR_DAMAGE_LOOKUP_STATUS
);

export function lookUpBikeDamageAction(bikeId) {
  return (dispatch, getState, api) => {
    api.maintenance
      .lookupBikeDamage(bikeId)
      .then(
        response => dispatch(damageLookupSuccess(response)),
        error => dispatch(damageLookupError(error))
      )
      .done();
  };
}
