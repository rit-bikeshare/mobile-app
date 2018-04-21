import { createAction } from 'redux-actions';
import getRentalBikeId from 'BikeShare/rental/selectors/getRentalBikeId';
import Toast from 'BikeShare/lib/Toast';
import { BIKE_LOCKED, BIKE_LOCK_FAILED } from '../constants/LockActionTypes';

export const bikeLocked = createAction(BIKE_LOCKED);
const bikeLockFailedAction = createAction(BIKE_LOCK_FAILED);

function bikeLockFailed() {
  return dispatch => {
    dispatch(bikeLockFailedAction());
    Toast.show('Could not connect to bike lock', Toast.LONG);
  };
}

export default function lockLock() {
  return (dispatch, getState, api) => {
    const currentBikeId = getRentalBikeId(getState());
    api.lock
      .lock(currentBikeId)
      .then(() => dispatch(bikeLocked()), () => dispatch(bikeLockFailed()))
      .done();
  };
}
