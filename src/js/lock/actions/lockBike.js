import { createAction } from 'redux-actions';
import getRentalBikeId from 'BikeShare/rental/selectors/getRentalBikeId';
import { BIKE_LOCKED, BIKE_LOCK_FAILED } from '../constants/LockActionTypes';

export const bikeLocked = createAction(BIKE_LOCKED);
const bikeLockFailed = createAction(BIKE_LOCK_FAILED);

export default function lockLock() {
  return (dispatch, getState, api) => {
    const currentBikeId = getRentalBikeId(getState());
    api.lock
      .lock(currentBikeId)
      .then(() => dispatch(bikeLocked()), () => dispatch(bikeLockFailed()))
      .done();
  };
}
