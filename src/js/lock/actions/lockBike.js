import { createAction } from 'redux-actions';
import getRentalBikeId from 'BikeShare/rental/selectors/getRentalBikeId';
import Toast from 'BikeShare/lib/Toast';
import { BIKE_LOCKED, BIKE_LOCK_FAILED } from '../constants/LockActionTypes';

export const bikeLocked = createAction(BIKE_LOCKED);
const bikeLockFailedAction = createAction(BIKE_LOCK_FAILED);

function bikeLockFailed(error) {
  return dispatch => {
    dispatch(bikeLockFailedAction());
    const message = error.message || 'Could not connect to bike lock';
    Toast.show(message, Toast.LONG);
  };
}

export default function lockLock() {
  return (dispatch, getState, api) => {
    const currentBikeId = getRentalBikeId(getState());
    api.lock
      .lock(currentBikeId)
      .then(
        () => dispatch(bikeLocked()),
        error => dispatch(bikeLockFailed(error))
      )
      .done();
  };
}
