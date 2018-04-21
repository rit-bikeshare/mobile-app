import { createAction } from 'redux-actions';
import getSocket from '../selectors/getSocket';
import { LOCK_CONNECTION_CLOSED } from '../constants/LockActionTypes';

const socketClosed = createAction(LOCK_CONNECTION_CLOSED);

export default function disconnectFromSocket() {
  return (dispatch, getState) => {
    const socket = getSocket(getState());
    socket.close();
    dispatch(socketClosed());
  };
}
