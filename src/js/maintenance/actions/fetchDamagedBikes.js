import { createAction } from 'redux-actions';
import { FETCH_DAMAGED_BIKES_SUCCESS } from '../constants/MaintenanceActionTypes';
import Toast from 'BikeShare/lib/Toast';

const damagedBikeFetchSuccess = createAction(FETCH_DAMAGED_BIKES_SUCCESS);

export default function fetchDamagedBikes() {
  return (dispatch, getState, api) => {
    api.maintenance
      .fetchDamagedBikes()
      .then(
        response => dispatch(damagedBikeFetchSuccess(response)),
        () => Toast.show('Error fetching damaged bikes')
      );
  };
}
