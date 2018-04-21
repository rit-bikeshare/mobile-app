import { createAction } from 'redux-actions';
import getRentalBikeId from 'BikeShare/rental/selectors/getRentalBikeId';
import {
  BIKE_UNLOCKED,
  BIKE_UNLOCK_FAILED,
} from '../constants/LockActionTypes';

export const bikeUnlocked = createAction(BIKE_UNLOCKED);
const bikeUnlockFailed = createAction(BIKE_UNLOCK_FAILED);

export default function unlockLock() {
  return (dispatch, getState, api) => {
    const currentBikeId = getRentalBikeId(getState());
    api.lock
      .unlock(currentBikeId)
      .then(() => dispatch(bikeUnlocked()), () => dispatch(bikeUnlockFailed()))
      .done();
  };
}
