import { createAction } from 'redux-actions';
import getRentalBikeId from 'BikeShare/rental/selectors/getRentalBikeId';
import Toast from 'BikeShare/lib/Toast';
import {
  BIKE_UNLOCKED,
  BIKE_UNLOCK_FAILED,
} from '../constants/LockActionTypes';

export const bikeUnlocked = createAction(BIKE_UNLOCKED);
const bikeUnlockFailedAction = createAction(BIKE_UNLOCK_FAILED);

function bikeUnlockFailed(error) {
  return dispatch => {
    dispatch(bikeUnlockFailedAction());
    const message = error.message || 'Could not connect to bike lock';
    Toast.show(message, Toast.LONG);
  };
}

export default function unlockLock() {
  return (dispatch, getState, api) => {
    const currentBikeId = getRentalBikeId(getState());
    api.lock
      .unlock(currentBikeId)
      .then(
        () => dispatch(bikeUnlocked()),
        error => dispatch(bikeUnlockFailed(error))
      )
      .done();
  };
}
