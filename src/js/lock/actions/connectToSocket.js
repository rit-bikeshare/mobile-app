import { createAction } from 'redux-actions';
import { bikeUnlocked } from './unlockBike';
import { bikeLocked } from './lockBike';
import {
  CONNECTED_TO_SOCKET,
  BIKE_LOCK_LOCKING,
  BIKE_LOCK_UNLOCKING,
} from '../constants/LockActionTypes';

const socketConnected = createAction(CONNECTED_TO_SOCKET);
const bikeLockLocking = createAction(BIKE_LOCK_LOCKING);
const bikeLockUnlocking = createAction(BIKE_LOCK_UNLOCKING);

export default function connectToSocket(rentalId) {
  return dispatch => {
    const webSocket = new WebSocket(
      `wss://bikesharedev.rit.edu/api/ws/lock-state/${rentalId}`
    );
    webSocket.addEventListener('message', message => {
      const data = JSON.parse(message.data);
      switch (data.state) {
        case 'locking':
          dispatch(bikeLockLocking());
          break;
        case 'unlocking':
          dispatch(bikeLockUnlocking());
          break;
        case 'locked':
          dispatch(bikeLocked());
          break;
        case 'unlocked':
          dispatch(bikeUnlocked());
          break;
        default:
          break;
      }
    });
    dispatch(socketConnected(webSocket));
  };
}
