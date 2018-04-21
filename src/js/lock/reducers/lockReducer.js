import { Map } from 'immutable';
import { handleActions } from 'redux-actions';
import { LOCKED, UNLOCKED, PENDING } from '../constants/LockStates';
import {
  BIKE_UNLOCKED,
  BIKE_LOCKED,
  CONNECTED_TO_SOCKET,
  LOCK_CONNECTION_CLOSED,
  BIKE_LOCK_LOCKING,
  BIKE_LOCK_UNLOCKING,
} from '../constants/LockActionTypes';

const initialState = Map({
  state: LOCKED,
  socket: null,
});

export default handleActions(
  {
    [BIKE_UNLOCKED](state) {
      return state.set('state', UNLOCKED);
    },
    [BIKE_LOCKED](state) {
      return state.set('state', LOCKED);
    },
    [BIKE_LOCK_LOCKING](state) {
      return state.set('state', PENDING);
    },
    [BIKE_LOCK_UNLOCKING](state) {
      return state.set('state', PENDING);
    },
    [CONNECTED_TO_SOCKET](state, action) {
      return state.set('socket', action.payload);
    },
    [LOCK_CONNECTION_CLOSED](state) {
      return state.set('socket', null);
    },
  },
  initialState
);
